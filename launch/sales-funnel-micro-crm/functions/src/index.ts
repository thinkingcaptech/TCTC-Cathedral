import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

// AI Provider configurations for multi-provider BYOK support
interface AIProvider {
  name: string;
  call: (key: string, prompt: string) => Promise<string>;
}

const AI_PROVIDERS: Record<string, AIProvider> = {
  gemini: {
    name: "Google Gemini",
    call: async (key: string, prompt: string) => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}],
          }),
        }
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${error}`);
      }
      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    },
  },
  openai: {
    name: "OpenAI GPT",
    call: async (key: string, prompt: string) => {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${key}`},
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{role: "user", content: prompt}],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `OpenAI error ${response.status}`);
      return data.choices?.[0]?.message?.content || "";
    },
  },
  anthropic: {
    name: "Anthropic Claude",
    call: async (key: string, prompt: string) => {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2000,
          messages: [{role: "user", content: prompt}],
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Anthropic error ${response.status}`);
      return data.content?.[0]?.text || "";
    },
  },
  grok: {
    name: "xAI Grok",
    call: async (key: string, prompt: string) => {
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${key}`},
        body: JSON.stringify({
          model: "grok-beta",
          messages: [{role: "user", content: prompt}],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Grok error ${response.status}`);
      return data.choices?.[0]?.message?.content || "";
    },
  },
};

// Get user's API keys from Firestore
async function getUserApiKeys(uid: string): Promise<Record<string, string>> {
  try {
    const keysDoc = await db.collection("users").doc(uid).collection("private").doc("keys").get();
    if (keysDoc.exists) {
      return keysDoc.data() as Record<string, string> || {};
    }
  } catch (error) {
    console.error("Error fetching user API keys:", error);
  }
  return {};
}

// Get preferred provider and key
function getPreferredProvider(keys: Record<string, string>): {provider: string; key: string} | null {
  for (const provider of ["gemini", "openai", "anthropic", "grok"]) {
    if (keys[provider]) {
      return {provider, key: keys[provider]};
    }
  }
  // Legacy: check for geminiApiKey
  if (keys.geminiApiKey) {
    return {provider: "gemini", key: keys.geminiApiKey};
  }
  return null;
}

/**
 * Call AI with user's stored API key
 */
async function callUserAI(uid: string, prompt: string): Promise<{text: string; provider: string}> {
  const userKeys = await getUserApiKeys(uid);
  const apiData = getPreferredProvider(userKeys);

  if (!apiData) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "No AI API key configured. Please add your API key in Settings."
    );
  }

  const {provider, key} = apiData;
  const providerConfig = AI_PROVIDERS[provider];

  console.log(`Using ${providerConfig.name} for user ${uid}`);
  const text = await providerConfig.call(key, prompt);
  return {text, provider};
}

/**
 * Score a lead using user's AI provider
 */
export const scoreLead = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead} = data;

  const prompt = `You are a sales AI assistant. Score this sales lead from 1-100 based on the following criteria:
- Higher score for established companies vs individuals
- Higher score for recent engagement
- Higher score for higher estimated value
- Higher score for quality referral sources (LinkedIn, Referral)
- Consider the completeness of information

Lead Details:
Name: ${lead.name}
Company: ${lead.company || "Not specified"}
Email: ${lead.email}
Phone: ${lead.phone || "Not provided"}
Source: ${lead.source}
Stage: ${lead.stage}
Estimated Value: $${lead.estimatedValue || 0}
Notes: ${lead.notes || "No notes"}
Tags: ${lead.tags ? lead.tags.join(", ") : "None"}

Return ONLY a number between 1-100. No explanation, just the number.`;

  try {
    const result = await callUserAI(context.auth.uid, prompt);
    const score = parseInt(result.text.trim());

    if (isNaN(score) || score < 1 || score > 100) {
      return {success: true, score: 50, provider: result.provider}; // Default score
    }

    return {success: true, score, provider: result.provider};
  } catch (error) {
    if (error instanceof functions.https.HttpsError) throw error;
    throw new functions.https.HttpsError("internal", "Failed to score lead");
  }
});

/**
 * Draft personalized email using user's AI provider
 */
export const draftEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead} = data;

  const prompt = `You are a professional sales representative. Write a personalized follow-up email for this lead:

Lead Information:
Name: ${lead.name}
Company: ${lead.company || "their company"}
Stage: ${lead.stage}
Notes: ${lead.notes || "Initial contact"}
Estimated Value: $${lead.estimatedValue || "TBD"}

Write a professional, warm, and personalized email that:
1. References their company and situation
2. Provides value or insight
3. Has a clear call-to-action
4. Is concise (150-200 words)
5. Includes a subject line

Format as:
Subject: [subject line]

[email body]`;

  try {
    const result = await callUserAI(context.auth.uid, prompt);
    return {success: true, email: result.text, provider: result.provider};
  } catch (error) {
    if (error instanceof functions.https.HttpsError) throw error;
    throw new functions.https.HttpsError("internal", "Failed to draft email");
  }
});

/**
 * Get next best action suggestion
 */
export const suggestNextAction = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead, activities} = data;

  const activitySummary = activities.slice(0, 5).map((a: any) =>
    `${a.type}: ${a.description}`
  ).join("\n");

  const prompt = `You are a sales strategy AI. Analyze this lead and suggest the single best next action.

Lead Information:
Name: ${lead.name}
Company: ${lead.company || "Unknown"}
Stage: ${lead.stage}
Score: ${lead.score}/100
Estimated Value: $${lead.estimatedValue || 0}
Last Activity: ${lead.lastActivity}

Recent Activities:
${activitySummary || "No recent activities"}

Provide ONE specific, actionable recommendation in 1-2 sentences. Be direct and practical.`;

  try {
    const result = await callUserAI(context.auth.uid, prompt);
    return {success: true, action: result.text, provider: result.provider};
  } catch (error) {
    if (error instanceof functions.https.HttpsError) throw error;
    throw new functions.https.HttpsError("internal", "Failed to suggest action");
  }
});

/**
 * Generate weekly business insights
 */
export const generateInsights = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated");
  }

  const {leads} = data;

  const totalLeads = leads.length;
  const stages: {[key: string]: number} = {};
  const sources: {[key: string]: number} = {};
  let totalValue = 0;

  leads.forEach((lead: any) => {
    stages[lead.stage] = (stages[lead.stage] || 0) + 1;
    sources[lead.source] = (sources[lead.source] || 0) + 1;
    totalValue += lead.estimatedValue || 0;
  });

  const stageBreakdown = Object.entries(stages)
    .map(([stage, count]) => `${stage}: ${count}`)
    .join(", ");

  const sourceBreakdown = Object.entries(sources)
    .map(([source, count]) => `${source}: ${count}`)
    .join(", ");

  const prompt = `You are a sales analytics AI. Analyze this sales pipeline and provide 3 actionable insights.

Pipeline Overview:
Total Leads: ${totalLeads}
Total Pipeline Value: $${totalValue.toLocaleString()}
Stage Breakdown: ${stageBreakdown}
Source Breakdown: ${sourceBreakdown}

Provide exactly 3 bullet points with:
1. A key observation or trend
2. A specific, actionable recommendation
3. A potential opportunity or risk

Format each insight as:
• [Insight and recommendation]

Keep each bullet point to 2-3 sentences maximum.`;

  try {
    const result = await callUserAI(context.auth.uid, prompt);
    return {success: true, insights: result.text, provider: result.provider};
  } catch (error) {
    if (error instanceof functions.https.HttpsError) throw error;
    throw new functions.https.HttpsError("internal", "Failed to generate insights");
  }
});

/**
 * Analyze lead engagement
 */
export const analyzeEngagement = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead, activities} = data;

  const activityCount = activities.length;
  const emailCount = activities.filter((a: any) => a.type === "email").length;
  const callCount = activities.filter((a: any) => a.type === "call").length;
  const meetingCount = activities.filter((a: any) => a.type === "meeting").length;

  const prompt = `You are a sales engagement analyst. Evaluate this lead's engagement level and provide insights.

Lead: ${lead.name} (${lead.company || "Individual"})
Current Stage: ${lead.stage}
Lead Score: ${lead.score}/100
Total Activities: ${activityCount}
- Emails: ${emailCount}
- Calls: ${callCount}
- Meetings: ${meetingCount}

Provide a brief analysis (3-4 sentences) covering:
1. Overall engagement level (High/Medium/Low)
2. Quality of interactions
3. Likelihood to convert
4. Any red flags or positive signals`;

  try {
    const result = await callUserAI(context.auth.uid, prompt);
    return {success: true, analysis: result.text, provider: result.provider};
  } catch (error) {
    if (error instanceof functions.https.HttpsError) throw error;
    throw new functions.https.HttpsError("internal", "Failed to analyze engagement");
  }
});
