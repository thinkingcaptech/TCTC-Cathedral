/**
 * TCTC Offer Architect - Backend Logic
 * Deployed to Firebase Cloud Functions
 * 
 * AUTH + BYOK: Users log in once, API keys stored in Firestore
 * Supports: Gemini, OpenAI, Anthropic Claude, xAI Grok
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// AI Provider configurations
const AI_PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    detectKey: (key) => key?.startsWith('AIza'),
    endpoint: (key, model = 'gemini-2.0-flash') => 
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    buildRequest: (systemPrompt, userPrompt) => ({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { temperature: 0.7 }
    }),
    extractText: (data) => data?.candidates?.[0]?.content?.parts?.[0]?.text,
    headers: () => ({ 'Content-Type': 'application/json' })
  },
  openai: {
    name: 'OpenAI GPT',
    detectKey: (key) => key?.startsWith('sk-') && !key?.startsWith('sk-ant-'),
    endpoint: () => 'https://api.openai.com/v1/chat/completions',
    buildRequest: (systemPrompt, userPrompt, model = 'gpt-4o-mini') => ({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    }),
    extractText: (data) => data?.choices?.[0]?.message?.content,
    headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` })
  },
  anthropic: {
    name: 'Anthropic Claude',
    detectKey: (key) => key?.startsWith('sk-ant-'),
    endpoint: () => 'https://api.anthropic.com/v1/messages',
    buildRequest: (systemPrompt, userPrompt, model = 'claude-3-5-sonnet-20241022') => ({
      model: model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    }),
    extractText: (data) => data?.content?.[0]?.text,
    headers: (key) => ({
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01'
    })
  },
  grok: {
    name: 'xAI Grok',
    detectKey: (key) => key?.startsWith('xai-'),
    endpoint: () => 'https://api.x.ai/v1/chat/completions',
    buildRequest: (systemPrompt, userPrompt, model = 'grok-beta') => ({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    }),
    extractText: (data) => data?.choices?.[0]?.message?.content,
    headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` })
  }
};

// Detect provider from API key format
function detectProvider(apiKey) {
  if (!apiKey) return null;
  for (const [name, config] of Object.entries(AI_PROVIDERS)) {
    if (config.detectKey(apiKey)) return name;
  }
  return null;
}

// Verify Firebase Auth token and return user ID
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
    console.error('Token verification failed:', error.message);
    return null;
  }
}

// Get user's API keys from Firestore
async function getUserApiKeys(uid) {
  try {
    const keysDoc = await admin.firestore()
      .collection('users')
      .doc(uid)
      .collection('private')
      .doc('keys')
      .get();
    
    if (keysDoc.exists) {
      return keysDoc.data() || {};
    }
  } catch (error) {
    console.error('Error fetching user API keys:', error);
  }
  return {};
}

// Get preferred provider and key from user's stored keys
function getPreferredProvider(keys) {
  // Check multi-provider keys first
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

// Define the System Prompt (The Brain)
const SYSTEM_PROMPT = `
You are the TCTC Offer Architect, an engine that turns raw ideas into structured offers.
You speak in clean, direct statements.
You organize chaos into clarity.
You focus on transformation, not tasks.
You create offers that feel grounded, inevitable, and valuable.

Your response must follow this structure exactly:

1. CORE OFFER STATEMENT
(A single, punchy sentence describing the offer)

2. WHO THIS IS FOR
(Specific avatar definition)

3. THE PAIN THEY FEEL
(3 bullet points on the bleeding neck problem)

4. THE PROMISE
(The specific transformation delivered)

5. WHAT MAKES THIS DIFFERENT
(Why this works when other things failed)

6. DELIVERABLES
(5 bullet points max - tangible assets)

7. PRICING MODEL
(3 tiers: Low/Mid/High)

8. FUNNEL STRATEGY
(4 step simple funnel)

9. LANDING PAGE COPY
(Headline and Subheadline only)

10. THREE HOOKS
(3 scroll-stopping headlines)

Your voice: concise, confident, architectural. Do not use fluff words like "empower" or "unlock" unless strictly necessary. Use heavy, concrete language.
`;

exports.generateOffer = functions.https.onRequest(async (req, res) => {
  // CORS handling
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  // Health check
  if (req.method === "GET") {
    res.json({ healthy: true, byok: true, authRequired: true, providers: Object.keys(AI_PROVIDERS) });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    // Verify user authentication
    const uid = await verifyAuthToken(req);
    if (!uid) {
      res.status(401).json({ 
        error: "Authentication required. Please log in.",
        needsAuth: true 
      });
      return;
    }

    // Get user's API keys from Firestore
    const userKeys = await getUserApiKeys(uid);
    const apiData = getPreferredProvider(userKeys);
    
    if (!apiData) {
      res.status(400).json({ 
        error: "No AI API key configured. Please add your API key in Settings.",
        needsKey: true 
      });
      return;
    }

    const { provider, key: apiKey } = apiData;
    const providerConfig = AI_PROVIDERS[provider];
    console.log(`Using ${providerConfig.name} for user ${uid}`);

    const { niche, pain, transform, strengths, promptType, offerText } = req.body;

    let systemInstruction = SYSTEM_PROMPT;
    let userPrompt = "";

    switch (promptType) {
      case "sigil":
        systemInstruction = "You are an expert Prompt Engineer. Write a highly detailed image generation prompt (for Midjourney or Dall-E 3) to create a high-status, abstract Business Logo. Context: Intricate Golden Line Art on a solid Black background. Use sacred geometry, architectural lines. No text.";
        userPrompt = `Based on this specific Offer Context: ${offerText.substring(0, 500)}... \n\n Return ONLY the raw prompt text.`;
        break;
      case "linkedin":
        systemInstruction = "Ghostwriter for high-status leaders. 'Bro-etry' style: short lines, punchy. No hashtags.";
        userPrompt = `Write a LinkedIn post for this offer:\n\n${offerText}\n\nHook: Contrarian statement.\nBody: Struggle vs success.\nCall to Action: "Comment 'BLUEPRINT' below."`;
        break;
      case "facebook":
        systemInstruction = "Community builder. Personal, vulnerable, long-form story.";
        userPrompt = `Write a Facebook post for this offer:\n\n${offerText}\n\nStructure: Vulnerable opening -> The Turning Point -> The epiphany -> Soft CTA.`;
        break;
      case "curriculum":
        systemInstruction = "You are an expert curriculum designer. Return clear, tactical bullet points.";
        userPrompt = `Create a 12-week delivery blueprint for this offer:\n\n${offerText}\n\nREQUIREMENT: Return EXACTLY this structure:\n\nPHASE 1: FOUNDATION (Weeks 1-4)\n- Week 1: [Topic] - [Outcome]\n- Week 2: [Topic] - [Outcome]\n...\nPHASE 2: IMPLEMENTATION (Weeks 5-8)\n...\nPHASE 3: OPTIMIZATION (Weeks 9-12)...`;
        break;
      case "alchemyScript":
        systemInstruction = `You are the Architect. You follow the principles of "The Alchemy of Influence".
           Use: IGNIS (Internal State), AQUA (Covenant of Clarity), PORTA DOLORIS (The Pain Gate), TERRA (Co-Creation).`;
        userPrompt = `Write a Full Phone Sales Script for this offer:\n\n${offerText}\n\n
           Structure:
           [PHASE 1: IGNIS] (Internal mantra)
           [PHASE 2: AQUA] (Covenant of Clarity & Drill Down to Porta Doloris)
           [PHASE 3: TERRA] (The Blueprint Method & Co-Creation)
           [PHASE 4: THE EXCHANGE] (Price Anchor & Confirmation)`;
        break;
      default:
        userPrompt = `
    Construct an offer based on these parameters:
    Audience: ${niche}
    Pain: ${pain}
    Desired Transformation: ${transform}
    Strengths/Resources: ${strengths}
    `;
    }

    // Call AI using the user's API key
    const endpoint = providerConfig.endpoint(apiKey);
    const headers = providerConfig.headers(apiKey);
    const body = providerConfig.buildRequest(systemInstruction, userPrompt);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const status = response.status;
    const rawText = await response.text();
    let json = null;
    try {
      json = JSON.parse(rawText);
    } catch (e) {
      // Not JSON — keep rawText for debugging
    }

    if (!response.ok) {
      console.error(`${providerConfig.name} HTTP error: ${status}`);
      console.error("Response body (truncated):", rawText?.slice(0, 2000));
      throw new Error(`${providerConfig.name} API HTTP ${status}`);
    }

    if (json && json.error) {
      console.error("API error object:", JSON.stringify(json.error).slice(0, 2000));
      throw new Error(json.error.message || `${providerConfig.name} API error`);
    }

    const offer = providerConfig.extractText(json);
    if (!offer) {
      console.error("No offer returned. Response (truncated):", rawText?.slice(0, 2000));
      throw new Error(`No offer returned from ${providerConfig.name}`);
    }

    res.json({ offer, provider: provider });

  } catch (error) {
    console.error("Architecture Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error during Offer Construction." });
  }
});
