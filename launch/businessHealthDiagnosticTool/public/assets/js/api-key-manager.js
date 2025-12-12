/**
 * API Key Manager
 * Handles storage, retrieval, and validation of multi-provider AI API keys
 * Supports: Gemini, OpenAI, Anthropic Claude, xAI Grok
 */

const API_KEYS_STORAGE = 'api_keys';

// Provider configurations
const PROVIDER_CONFIG = {
    gemini: {
        name: 'Google Gemini',
        prefix: 'AIza',
        minLength: 30,
        testEndpoint: (key) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        testRequest: () => ({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: 'Say OK' }] }] })
        })
    },
    openai: {
        name: 'OpenAI GPT',
        prefix: 'sk-',
        minLength: 40,
        testEndpoint: () => 'https://api.openai.com/v1/chat/completions',
        testRequest: (key) => ({
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
            body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: 'Say OK' }], max_tokens: 5 })
        })
    },
    anthropic: {
        name: 'Anthropic Claude',
        prefix: 'sk-ant-',
        minLength: 40,
        testEndpoint: () => 'https://api.anthropic.com/v1/messages',
        testRequest: (key) => ({
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'x-api-key': key, 
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({ model: 'claude-3-5-sonnet-20241022', max_tokens: 10, messages: [{ role: 'user', content: 'Say OK' }] })
        })
    },
    grok: {
        name: 'xAI Grok',
        prefix: 'xai-',
        minLength: 30,
        testEndpoint: () => 'https://api.x.ai/v1/chat/completions',
        testRequest: (key) => ({
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
            body: JSON.stringify({ model: 'grok-beta', messages: [{ role: 'user', content: 'Say OK' }], max_tokens: 5 })
        })
    }
};

const ApiKeyManager = {
    /**
     * Store API key for a specific provider
     */
    save: (apiKey, provider = 'gemini') => {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('Invalid API key');
        }
        const keys = ApiKeyManager.getAll();
        keys[provider] = apiKey.trim();
        localStorage.setItem(API_KEYS_STORAGE, JSON.stringify(keys));
    },

    /**
     * Get API key for a specific provider (or first available)
     */
    get: (provider = null) => {
        const keys = ApiKeyManager.getAll();
        if (provider) return keys[provider] || null;
        // Return first available key
        for (const p of ['gemini', 'openai', 'anthropic', 'grok']) {
            if (keys[p]) return keys[p];
        }
        return null;
    },

    /**
     * Get all stored API keys
     */
    getAll: () => {
        try {
            const stored = localStorage.getItem(API_KEYS_STORAGE);
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    },

    /**
     * Remove API key for a provider
     */
    remove: (provider = 'gemini') => {
        const keys = ApiKeyManager.getAll();
        delete keys[provider];
        localStorage.setItem(API_KEYS_STORAGE, JSON.stringify(keys));
    },

    /**
     * Check if any API key exists
     */
    exists: () => {
        const keys = ApiKeyManager.getAll();
        return Object.values(keys).some(k => !!k);
    },

    /**
     * Check if a specific provider has a key
     */
    has: (provider) => {
        return !!ApiKeyManager.get(provider);
    },

    /**
     * Get the preferred (first available) provider
     */
    getPreferredProvider: () => {
        const keys = ApiKeyManager.getAll();
        for (const p of ['gemini', 'openai', 'anthropic', 'grok']) {
            if (keys[p]) return p;
        }
        return null;
    },

    /**
     * Detect provider from API key format
     */
    detectProvider: (apiKey) => {
        if (!apiKey) return null;
        const trimmed = apiKey.trim();
        if (trimmed.startsWith('AIza')) return 'gemini';
        if (trimmed.startsWith('sk-ant-')) return 'anthropic';
        if (trimmed.startsWith('sk-')) return 'openai';
        if (trimmed.startsWith('xai-')) return 'grok';
        return null;
    },

    /**
     * Validate API key format
     */
    validate: (apiKey, provider = null) => {
        if (!apiKey || typeof apiKey !== 'string') {
            return { valid: false, error: 'API key is required' };
        }
        
        const trimmed = apiKey.trim();
        const detectedProvider = provider || ApiKeyManager.detectProvider(trimmed);
        
        if (!detectedProvider) {
            return { valid: false, error: 'Could not detect API key format. Supported: Gemini (AIza...), OpenAI (sk-...), Anthropic (sk-ant-...), Grok (xai-...)' };
        }
        
        const config = PROVIDER_CONFIG[detectedProvider];
        if (trimmed.length < config.minLength) {
            return { valid: false, error: `${config.name} API key appears too short` };
        }
        
        return { valid: true, provider: detectedProvider };
    },

    /**
     * Test API key with the provider
     */
    test: async (apiKey, provider = null) => {
        const detectedProvider = provider || ApiKeyManager.detectProvider(apiKey);
        if (!detectedProvider) {
            return { valid: false, error: 'Unknown API key format' };
        }
        
        const config = PROVIDER_CONFIG[detectedProvider];
        try {
            const response = await fetch(
                config.testEndpoint(apiKey),
                config.testRequest(apiKey)
            );

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                return { valid: false, error: data?.error?.message || `API returned status ${response.status}` };
            }

            return { valid: true, provider: detectedProvider };
        } catch (error) {
            return { valid: false, error: `Network error: ${error.message}` };
        }
    }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ApiKeyManager = ApiKeyManager;
    window.PROVIDER_CONFIG = PROVIDER_CONFIG;
}
