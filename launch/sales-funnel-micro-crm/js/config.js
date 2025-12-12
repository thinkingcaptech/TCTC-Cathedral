// Firebase Configuration
// Replace with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyCzI2GyyTcH97kOJm6UsxE7nSi-tD3m-nA",
    authDomain: "sales-funnel-micro-crm.firebaseapp.com",
    projectId: "sales-funnel-micro-crm",
    storageBucket: "sales-funnel-micro-crm.firebasestorage.app",
    messagingSenderId: "28040739246",
    appId: "1:28040739246:web:af7958d9cd307db1f8703f",
    measurementId: "G-Z469LCT7X9"
};

// Multi-Provider AI Configuration (Bring Your Own Key)
// Supports: Gemini, OpenAI, Anthropic Claude, xAI Grok
const aiConfig = {
    // Get stored keys
    getKeys: () => {
        try {
            const stored = localStorage.getItem('api_keys');
            return stored ? JSON.parse(stored) : {};
        } catch { return {}; }
    },
    // Get preferred provider (first available)
    getPreferredProvider: () => {
        const keys = aiConfig.getKeys();
        for (const p of ['gemini', 'openai', 'anthropic', 'grok']) {
            if (keys[p]) return p;
        }
        return null;
    },
    // Provider endpoints and configs
    providers: {
        gemini: {
            name: 'Google Gemini',
            endpoint: (key) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
            buildRequest: (prompt) => ({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
            }),
            extractText: (data) => data?.candidates?.[0]?.content?.parts?.[0]?.text,
            headers: () => ({ 'Content-Type': 'application/json' })
        },
        openai: {
            name: 'OpenAI GPT',
            endpoint: () => 'https://api.openai.com/v1/chat/completions',
            buildRequest: (prompt) => ({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 2048
            }),
            extractText: (data) => data?.choices?.[0]?.message?.content,
            headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` })
        },
        anthropic: {
            name: 'Anthropic Claude',
            endpoint: () => 'https://api.anthropic.com/v1/messages',
            buildRequest: (prompt) => ({
                model: 'claude-3-5-sonnet-20241022',
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
            buildRequest: (prompt) => ({
                model: 'grok-beta',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 2048
            }),
            extractText: (data) => data?.choices?.[0]?.message?.content,
            headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` })
        }
    }
};

// Legacy Gemini config for backwards compatibility
const geminiConfig = {
    get apiKey() {
        const keys = aiConfig.getKeys();
        return keys.gemini || localStorage.getItem('geminiApiKey') || "";
    },
    set apiKey(val) {
        const keys = aiConfig.getKeys();
        keys.gemini = val;
        localStorage.setItem('api_keys', JSON.stringify(keys));
    },
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
};

// App Configuration
const appConfig = {
    name: "Sales Funnel CRM",
    version: "1.0.0",
    stages: [
        "New Lead",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Closed"
    ],
    sources: [
        "Website",
        "Referral",
        "LinkedIn",
        "Cold Call",
        "Event",
        "Other"
    ],
    activityTypes: [
        "email",
        "call",
        "meeting",
        "note"
    ]
};

// Export configurations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig, geminiConfig, appConfig };
}
