/**
 * Unified AI Client
 * Handles direct client-side communication with multiple AI providers
 * Supports: Gemini, OpenAI, Anthropic Claude, xAI Grok
 */

const AIClient = {
    // Provider configurations
    providers: {
        gemini: {
            name: 'Google Gemini',
            endpoint: (key, model = 'gemini-2.0-flash') => 
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
            buildRequest: (prompt) => ({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            }),
            extractText: (data) => data?.candidates?.[0]?.content?.parts?.[0]?.text,
            headers: () => ({ 'Content-Type': 'application/json' })
        },
        openai: {
            name: 'OpenAI GPT',
            endpoint: () => 'https://api.openai.com/v1/chat/completions',
            buildRequest: (prompt, model = 'gpt-4o-mini') => ({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 2048
            }),
            extractText: (data) => data?.choices?.[0]?.message?.content,
            headers: (key) => ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            })
        },
        anthropic: {
            name: 'Anthropic Claude',
            endpoint: () => 'https://api.anthropic.com/v1/messages',
            buildRequest: (prompt, model = 'claude-3-5-sonnet-20241022') => ({
                model: model,
                max_tokens: 2048,
                messages: [{ role: 'user', content: prompt }]
            }),
            extractText: (data) => data?.content?.[0]?.text,
            headers: (key) => ({
                'Content-Type': 'application/json',
                'x-api-key': key,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            })
        },
        grok: {
            name: 'xAI Grok',
            endpoint: () => 'https://api.x.ai/v1/chat/completions',
            buildRequest: (prompt, model = 'grok-beta') => ({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 2048
            }),
            extractText: (data) => data?.choices?.[0]?.message?.content,
            headers: (key) => ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            })
        }
    },

    /**
     * Generate content using any supported AI provider
     */
    generateContent: async (apiKey, prompt, provider = 'gemini', model = null) => {
        if (!apiKey) {
            throw new Error('API key is required');
        }

        const config = AIClient.providers[provider];
        if (!config) {
            throw new Error(`Unknown provider: ${provider}`);
        }

        try {
            const endpoint = config.endpoint(apiKey, model);
            const headers = config.headers(apiKey);
            const body = config.buildRequest(prompt, model);

            console.log(`[AIClient] Calling ${config.name}...`);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.error?.message || `API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const text = config.extractText(data);
            
            if (!text) {
                throw new Error('No content generated');
            }

            return text;
        } catch (error) {
            console.error(`${config.name} API error:`, error);
            throw error;
        }
    },

    /**
     * Get best available API key and provider from localStorage
     */
    getApiKeyWithProvider: () => {
        try {
            const stored = localStorage.getItem('api_keys');
            if (stored) {
                const keys = JSON.parse(stored);
                for (const provider of ['gemini', 'openai', 'anthropic', 'grok']) {
                    if (keys[provider]) {
                        return { key: keys[provider], provider };
                    }
                }
            }
        } catch (e) {
            console.error('Error reading API keys:', e);
        }
        return null;
    },

    /**
     * Generate content using best available provider
     */
    generateWithAnyProvider: async (prompt) => {
        const apiData = AIClient.getApiKeyWithProvider();
        if (!apiData) {
            throw new Error('No AI API key configured. Please add your API key.');
        }
        return await AIClient.generateContent(apiData.key, prompt, apiData.provider);
    },

    /**
     * Build prompt for business diagnostic
     */
    buildDiagnosticPrompt: (answers, scores) => {
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
    },

    /**
     * Calculate business health scores from questionnaire answers
     */
    calculateScores: (answers = {}) => {
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
    },

    /**
     * Find the weakest pillar
     */
    getWeakestPillar: (scores) => {
        return Object.entries(scores)
            .filter(([pillar]) => pillar !== 'total')
            .sort(([, aScore], [, bScore]) => aScore - bScore)[0]?.[0] || null;
    }
};

// Legacy alias for backwards compatibility
const GeminiClient = {
    generateContent: (apiKey, prompt) => AIClient.generateContent(apiKey, prompt, 'gemini'),
    buildDiagnosticPrompt: AIClient.buildDiagnosticPrompt,
    calculateScores: AIClient.calculateScores,
    getWeakestPillar: AIClient.getWeakestPillar
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AIClient = AIClient;
    window.GeminiClient = GeminiClient; // Legacy support
}
