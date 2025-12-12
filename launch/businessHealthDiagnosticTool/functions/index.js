const logger = require("firebase-functions/logger");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { GoogleGenerativeAI } = require("@google/generative-ai");

admin.initializeApp();

const db = admin.firestore();

// AI Provider configurations for multi-provider BYOK support
const AI_PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    call: async (key, prompt) => {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      return result?.response?.text() || null;
    }
  },
  openai: {
    name: 'OpenAI GPT',
    call: async (key, prompt) => {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `OpenAI error ${response.status}`);
      return data.choices?.[0]?.message?.content || null;
    }
  },
  anthropic: {
    name: 'Anthropic Claude',
    call: async (key, prompt) => {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Anthropic error ${response.status}`);
      return data.content?.[0]?.text || null;
    }
  },
  grok: {
    name: 'xAI Grok',
    call: async (key, prompt) => {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Grok error ${response.status}`);
      return data.choices?.[0]?.message?.content || null;
    }
  }
};

// Verify Firebase Auth token
async function verifyAuthToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  try {
    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    logger.error('Token verification failed:', error.message);
    return null;
  }
}

// Get user's API keys from Firestore
async function getUserApiKeys(uid) {
  try {
    const keysDoc = await db.collection('users').doc(uid).collection('private').doc('keys').get();
    if (keysDoc.exists) {
      return keysDoc.data() || {};
    }
  } catch (error) {
    logger.error('Error fetching user API keys:', error);
  }
  return {};
}

// Get preferred provider and key
function getPreferredProvider(keys) {
  for (const provider of ['gemini', 'openai', 'anthropic', 'grok']) {
    if (keys[provider]) {
      return { provider, key: keys[provider] };
    }
  }
  // Legacy: check for geminiApiKey
  if (keys.geminiApiKey) {
    return { provider: 'gemini', key: keys.geminiApiKey };
  }
  return null;
}

const pillarWeights = {
  management: {
    process_maturity: 0.4,
    team_alignment: 0.35,
    kpi_cadence: 0.25,
  },
  marketing: {
    lead_volume: 0.4,
    channel_mix: 0.3,
    roi_tracking: 0.3,
  },
  sales: {
    pipeline_rigor: 0.4,
    enablement_strength: 0.35,
    close_rate: 0.25,
  },
  finances: {
    cashflow_visibility: 0.35,
    margin_health: 0.35,
    scaling_readiness: 0.3,
  },
};

const normalizeScore = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return 0;
  return Math.min(Math.max(numericValue, 1), 5);
};

const calculateScores = (answers = {}) => {
  const results = {};
  const pillarEntries = Object.entries(pillarWeights);

  pillarEntries.forEach(([pillar, weights]) => {
    const answerGroup = answers[pillar] || {};
    let achieved = 0;
    let max = 0;
    Object.entries(weights).forEach(([question, weight]) => {
      const value = normalizeScore(answerGroup[question]);
      achieved += value * weight;
      max += 5 * weight;
    });
    results[pillar] = max ? Math.round((achieved / max) * 100) : 0;
  });

  const pillarScoreValues = pillarEntries.map(([pillar]) => results[pillar]);
  results.total = Math.round(
    pillarScoreValues.reduce((sum, value) => sum + value, 0) /
      pillarScoreValues.length
  );
  return results;
};

const buildPrompt = (answers, scores) => {
  return `You are a master management consultant specializing in diagnosing growth bottlenecks.
Summarize the client's situation and provide 3-5 actionable recommendations that address the lowest-scoring pillar(s).

Scores:
- Management & Operations: ${scores.management}/100
- Marketing & Lead Generation: ${scores.marketing}/100
- Sales & Conversion: ${scores.sales}/100
- Finances & Scalability: ${scores.finances}/100
- Overall Business Health Score: ${scores.total}/100

Answers:
${JSON.stringify(answers, null, 2)}

Format:
1. Brief narrative summary (2 sentences max)
2. Numbered list of 3-5 high-impact recommendations with verbs up front
3. Close with one motivating sentence encouraging implementation.`;
};

const generateRecommendations = async (apiKey, provider, answers, scores) => {
  const providerConfig = AI_PROVIDERS[provider];
  if (!providerConfig) {
    logger.warn("Unknown AI provider. Skipping AI generation.");
    return null;
  }

  const prompt = buildPrompt(answers, scores);
  return await providerConfig.call(apiKey, prompt);
};

exports.analyzeBusiness = onRequest(
  { cors: true, region: "us-central1", invoker: "public" },
  async (req, res) => {
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204).send("");
    return;
  }

  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    // Verify user authentication
    const uid = await verifyAuthToken(req);
    if (!uid) {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(401).json({ error: "Authentication required. Please log in.", needsAuth: true });
      return;
    }

    // Get user's API keys from Firestore
    const userKeys = await getUserApiKeys(uid);
    const apiData = getPreferredProvider(userKeys);
    
    if (!apiData) {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(400).json({ 
        error: "No AI API key configured. Please add your API key in Settings.",
        needsKey: true 
      });
      return;
    }

    const { provider, key: apiKey } = apiData;
    logger.info(`Using ${AI_PROVIDERS[provider].name} for user ${uid}`);

    const { answers } = req.body || {};
    if (!answers) {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(400).json({ error: "Missing answers payload" });
      return;
    }

    try {
      const scores = calculateScores(answers);
      const weakestPillar = Object.entries(scores)
        .filter(([pillar]) => pillar !== "total")
        .sort(([, aScore], [, bScore]) => aScore - bScore)[0]?.[0];

      const documentRef = db.collection("diagnostics").doc();
      const payload = {
        answers,
        scores,
        weakestPillar: weakestPillar || null,
        publicShare: true,
        userId: uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await documentRef.set(payload, { merge: true });

      let recommendations = null;
      try {
        recommendations = await generateRecommendations(apiKey, provider, answers, scores);
      } catch (aiError) {
        logger.error(`${AI_PROVIDERS[provider].name} generation failed`, aiError);
      }

      if (recommendations) {
        await documentRef.update({ recommendations, aiProvider: provider });
      }

      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        reportId: documentRef.id,
        recommendations,
        scores,
        provider,
      });
    } catch (error) {
      logger.error("analyzeBusiness failure", error);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(500).json({ error: "Internal error generating diagnostic" });
    }
  });
});
