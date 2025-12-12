// Multi-Provider AI Integration
// Supports: Gemini, OpenAI, Anthropic Claude, xAI Grok

class GeminiAI {
    constructor() {
        // Will use aiConfig from config.js
    }

    // Update API key for a provider
    setApiKey(key, provider = 'gemini') {
        const keys = aiConfig.getKeys();
        keys[provider] = key;
        localStorage.setItem('api_keys', JSON.stringify(keys));
        // Legacy support
        if (provider === 'gemini') {
            localStorage.setItem('geminiApiKey', key);
        }
    }

    // Get current provider and key
    getCurrentProvider() {
        return aiConfig.getPreferredProvider();
    }

    // Make API call to any supported AI provider
    async callGemini(prompt) {
        try {
            const keys = aiConfig.getKeys();
            const provider = aiConfig.getPreferredProvider();
            
            if (!provider) {
                throw new Error('No AI API key configured. Please add your API key (Gemini, OpenAI, Claude, or Grok) in Settings.');
            }
            
            const apiKey = keys[provider];
            const config = aiConfig.providers[provider];
            
            console.log(`[SalesCRM] Using ${config.name}...`);

            const response = await fetch(config.endpoint(apiKey), {
                method: 'POST',
                headers: config.headers(apiKey),
                body: JSON.stringify(config.buildRequest(prompt))
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
                throw new Error(`${config.name} API error: ${errorMessage}`);
            }

            const data = await response.json();
            const text = config.extractText(data);
            
            if (!text) {
                throw new Error('Unexpected API response structure');
            }
            
            return text;
        } catch (error) {
            console.error('AI API error:', error);
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Network error. Check your internet connection.');
            }
            throw error;
        }
    }

    // Score a lead (1-100)
    async scoreLead(lead) {
        try {
            const prompt = `You are a sales AI assistant. Score this sales lead from 1-100 based on the following criteria:
- Higher score for established companies vs individuals
- Higher score for recent engagement
- Higher score for higher estimated value
- Higher score for quality referral sources (LinkedIn, Referral)
- Consider the completeness of information

Lead Details:
Name: ${lead.name}
Company: ${lead.company || 'Not specified'}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Source: ${lead.source}
Stage: ${lead.stage}
Estimated Value: $${lead.estimatedValue || 0}
Notes: ${lead.notes || 'No notes'}
Tags: ${lead.tags ? lead.tags.join(', ') : 'None'}

Return ONLY a number between 1-100. No explanation, just the number.`;

            const scoreText = await this.callGemini(prompt);
            const score = parseInt(scoreText.trim());
            
            if (isNaN(score) || score < 1 || score > 100) {
                return 50; // Default score if parsing fails
            }
            
            return score;
        } catch (error) {
            console.error('Lead scoring error:', error);
            throw new Error('Failed to score lead with AI');
        }
    }

    // Generate personalized email
    async draftEmail(lead) {
        try {
            const lastContact = lead.lastContact ? 
                new Date(lead.lastContact.toDate()).toLocaleDateString() : 
                'recently';

            const prompt = `You are a professional sales representative. Write a personalized follow-up email for this lead:

Lead Information:
Name: ${lead.name}
Company: ${lead.company || 'their company'}
Stage: ${lead.stage}
Last Contact: ${lastContact}
Notes: ${lead.notes || 'Initial contact'}
Estimated Value: $${lead.estimatedValue || 'TBD'}

Write a professional, warm, and personalized email that:
1. References their company and situation
2. Provides value or insight
3. Has a clear call-to-action
4. Is concise (150-200 words)
5. Includes a subject line

Format as:
Subject: [subject line]

[email body]`;

            const email = await this.callGemini(prompt);
            return email;
        } catch (error) {
            console.error('Email drafting error:', error);
            throw new Error('Failed to draft email with AI');
        }
    }

    // Suggest next best action
    async suggestNextAction(lead, activities) {
        try {
            const activitySummary = activities.slice(0, 5).map(a => 
                `${a.type}: ${a.description}`
            ).join('\n');

            const prompt = `You are a sales strategy AI. Analyze this lead and suggest the single best next action.

Lead Information:
Name: ${lead.name}
Company: ${lead.company || 'Unknown'}
Stage: ${lead.stage}
Score: ${lead.score}/100
Estimated Value: $${lead.estimatedValue || 0}
Last Activity: ${lead.lastActivity}

Recent Activities:
${activitySummary || 'No recent activities'}

Provide ONE specific, actionable recommendation in 1-2 sentences. Be direct and practical.`;

            const action = await this.callGemini(prompt);
            return action;
        } catch (error) {
            console.error('Next action error:', error);
            throw new Error('Failed to suggest next action');
        }
    }

    // Generate weekly insights
    async generateInsights(leads) {
        try {
            const totalLeads = leads.length;
            const stages = {};
            const sources = {};
            let totalValue = 0;

            leads.forEach(lead => {
                stages[lead.stage] = (stages[lead.stage] || 0) + 1;
                sources[lead.source] = (sources[lead.source] || 0) + 1;
                totalValue += lead.estimatedValue || 0;
            });

            const stageBreakdown = Object.entries(stages)
                .map(([stage, count]) => `${stage}: ${count}`)
                .join(', ');

            const sourceBreakdown = Object.entries(sources)
                .map(([source, count]) => `${source}: ${count}`)
                .join(', ');

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

            const insights = await this.callGemini(prompt);
            return insights;
        } catch (error) {
            console.error('Insights generation error:', error);
            throw new Error('Failed to generate insights');
        }
    }

    // Analyze lead engagement
    async analyzeEngagement(lead, activities) {
        try {
            const activityCount = activities.length;
            const emailCount = activities.filter(a => a.type === 'email').length;
            const callCount = activities.filter(a => a.type === 'call').length;
            const meetingCount = activities.filter(a => a.type === 'meeting').length;

            const prompt = `You are a sales engagement analyst. Evaluate this lead's engagement level and provide insights.

Lead: ${lead.name} (${lead.company || 'Individual'})
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

            const analysis = await this.callGemini(prompt);
            return analysis;
        } catch (error) {
            console.error('Engagement analysis error:', error);
            throw new Error('Failed to analyze engagement');
        }
    }

    // Parse CSV lead data and suggest improvements
    async enhanceLeadData(leadData) {
        try {
            const prompt = `You are a data enrichment AI. Review this lead information and suggest any missing or incomplete data that would be valuable for sales.

Current Data:
${JSON.stringify(leadData, null, 2)}

Provide a brief analysis of:
1. Data quality (completeness)
2. Missing critical information
3. Suggestions for additional data to collect

Keep response to 3-4 sentences.`;

            const suggestions = await this.callGemini(prompt);
            return suggestions;
        } catch (error) {
            console.error('Data enhancement error:', error);
            return 'Unable to analyze data at this time.';
        }
    }
}

// Initialize Gemini AI
const geminiAI = new GeminiAI();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.geminiAI = geminiAI;
}
