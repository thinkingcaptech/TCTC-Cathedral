import {onCall, HttpsError, CallableRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

// Gemini API endpoint - using gemini-2.5-flash-lite
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

/**
 * Internal helper function to call Gemini API
 */
async function callGeminiAPI(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new HttpsError(
      "failed-precondition",
      "Gemini API key not configured. Add GEMINI_API_KEY to .env file"
    );
  }

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{
          parts: [{text: prompt}],
        }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      throw new HttpsError(
        "internal",
        `Gemini API error: ${response.status}`
      );
    }

    const result = await response.json();
    return result.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw new HttpsError(
      "internal",
      "Failed to call Gemini API"
    );
  }
}

/**
 * Secure Gemini API proxy - Public endpoint
 */
export const callGemini = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be authenticated");
  }

  const {prompt} = request.data;

  if (!prompt || typeof prompt !== "string") {
    throw new HttpsError("invalid-argument", "Prompt is required and must be a string.");
  }

  const text = await callGeminiAPI(prompt);
  return {success: true, text};
});

/**
 * Score a lead using Gemini AI
 */
export const scoreLead = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead} = request.data;

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
    const text = await callGeminiAPI(prompt);
    const score = parseInt(text.trim());

    if (isNaN(score) || score < 1 || score > 100) {
      return {success: true, score: 50}; // Default score
    }

    return {success: true, score};
  } catch (error) {
    throw new HttpsError("internal", "Failed to score lead");
  }
});

/**
 * Draft personalized email using Gemini AI
 */
export const draftEmail = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead} = request.data;

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
    const email = await callGeminiAPI(prompt);
    return {success: true, email};
  } catch (error) {
    throw new HttpsError("internal", "Failed to draft email");
  }
});

/**
 * Get next best action suggestion
 */
export const suggestNextAction = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead, activities} = request.data;

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
    const action = await callGeminiAPI(prompt);
    return {success: true, action};
  } catch (error) {
    throw new HttpsError("internal", "Failed to suggest action");
  }
});

/**
 * Generate weekly business insights
 */
export const generateInsights = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be authenticated");
  }

  const {leads} = request.data;

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
    const insights = await callGeminiAPI(prompt);
    return {success: true, insights};
  } catch (error) {
    throw new HttpsError("internal", "Failed to generate insights");
  }
});

/**
 * Analyze lead engagement
 */
export const analyzeEngagement = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be authenticated");
  }

  const {lead, activities} = request.data;

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
    const analysis = await callGeminiAPI(prompt);
    return {success: true, analysis};
  } catch (error) {
    throw new HttpsError("internal", "Failed to analyze engagement");
  }
});
