const SimulatorApiKeys = (() => {
  const STORAGE_KEY = 'tctc_api_keys';

  const save = (provider, key) => {
    if (!provider || !key) return;
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    store[provider] = key;
    store[`${provider}_updated`] = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  };

  const remove = (provider) => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    delete store[provider];
    delete store[`${provider}_updated`];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  };

  const get = (provider) => {
    try {
      const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return store[provider] || null;
    } catch (err) {
      console.warn('Invalid API key storage payload', err);
      return null;
    }
  };

  const validate = (key, provider) => {
    const trimmed = (key || '').trim();
    if (!trimmed) return { valid: false, error: 'API key required.' };
    if (trimmed.length < 15) return { valid: false, error: 'API key looks too short.' };
    if (provider === 'gemini' && !trimmed.match(/^AI[z][a]/)) {
      return { valid: false, error: 'Gemini keys typically start with the expected prefix.' };
    }
    if (provider === 'openai' && !trimmed.startsWith('sk-')) {
      return { valid: false, error: 'OpenAI keys start with "sk-".' };
    }
    if (provider === 'anthropic' && !trimmed.startsWith('sk-ant-')) {
      return { valid: false, error: 'Claude keys start with "sk-ant-".' };
    }
    if (provider === 'grok' && !trimmed.startsWith('xai-')) {
      return { valid: false, error: 'Grok keys start with "xai-".' };
    }
    return { valid: true, value: trimmed };
  };

  const getPreferred = () => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const providers = ['gemini', 'openai', 'anthropic', 'grok'];
    return providers.find((p) => store[p]) || null;
  };

  return { save, remove, get, validate, getPreferred };
})();

const SalesSimulatorAI = (() => {
  const providers = {
    gemini: {
      name: 'Google Gemini',
      defaultModel: 'gemini-2.5-flash',
      endpoint: (apiKey, model) =>
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      headers: () => ({ 'Content-Type': 'application/json' }),
      buildRequest: (prompt) => ({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.75, topP: 0.9, maxOutputTokens: 2048 }
      }),
      extract: (json) => json?.candidates?.[0]?.content?.parts?.[0]?.text
    },
    openai: {
      name: 'OpenAI GPT',
      defaultModel: 'gpt-4o-mini',
      endpoint: () => 'https://api.openai.com/v1/chat/completions',
      headers: (key) => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }),
      buildRequest: (prompt, model) => ({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1800,
        temperature: 0.8
      }),
      extract: (json) => json?.choices?.[0]?.message?.content
    },
    anthropic: {
      name: 'Anthropic Claude',
      defaultModel: 'claude-3-5-sonnet-20241022',
      endpoint: () => 'https://api.anthropic.com/v1/messages',
      headers: (key) => ({
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      }),
      buildRequest: (prompt, model) => ({
        model,
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }]
      }),
      extract: (json) => json?.content?.[0]?.text
    },
    grok: {
      name: 'xAI Grok',
      defaultModel: 'grok-4-fast',
      endpoint: () => 'https://api.x.ai/v1/chat/completions',
      headers: (key) => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }),
      buildRequest: (prompt, model) => ({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 1800
      }),
      extract: (json) => json?.choices?.[0]?.message?.content
    }
  };

  const call = async ({ provider, apiKey, prompt, systemPrompt, model }) => {
    const config = providers[provider];
    if (!config) throw new Error('Unsupported provider.');
    const mergedPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
    const body = config.buildRequest(mergedPrompt, model || config.defaultModel);
    const response = await fetch(config.endpoint(apiKey, model || config.defaultModel), {
      method: 'POST',
      headers: config.headers(apiKey),
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Request failed (${response.status}).`);
    }
    const data = await response.json();
    const text = config.extract(data);
    if (!text) throw new Error('No response text received.');
    return text.trim();
  };

  return { call, providers };
})();

const SalesSimulatorPrompts = (() => {
  const personas = {
    skeptic: {
      label: 'Skeptical Operator',
      tone: 'Direct, analytical, asks for proof and ROI.',
      opening: "I've heard big promises before. Why should I believe yours?",
      objections: 'Needs clear ROI, suspicious about hype.'
    },
    busy: {
      label: 'Busy Executive',
      tone: 'Short, pressured, expects concise answers.',
      opening: "This is Jordan—make it quick, I only have a minute.",
      objections: 'No time, wants immediate value.'
    },
    friendly: {
      label: 'Friendly Browser',
      tone: 'Warm but non-committal.',
      opening: "Hey! Appreciate you reaching out. I'm just exploring options.",
      objections: 'Low urgency, just curious.'
    },
    budget: {
      label: 'Budget Hawk',
      tone: 'Financially conservative, looking for discounts.',
      opening: "Before we dive in, we're tightening spend this quarter.",
      objections: 'Price-focused, demands guarantees.'
    }
  };

  const buildScenarioPrompt = (scenario = {}) => {
    const persona = personas[scenario.persona] || personas.skeptic;
    return `You are a roleplay prospect used for advanced sales training.
Persona archetype: ${persona.label}
Tone and interaction style: ${persona.tone}
Conversation pace: ${scenario.pace || 'balanced'}
Difficulty: ${scenario.difficulty || 'medium'} resistance
Offer being pitched: ${scenario.offer || 'High-ticket advisory'}
Deal size or pricing: ${scenario.dealSize || 'Not specified'}
Primary objective for the seller: ${scenario.objective || 'Close for a follow-up'}
Context / background: ${scenario.context || 'Use reasonable assumptions.'}
Objections to emphasize: ${scenario.objections || persona.objections}

Instructions:
- Stay fully in character as the prospect.
- Keep replies conversational (1-3 sentences) and introduce objections organically.
- Reward persuasive logic but do not concede too quickly.
- End the call only when the seller either wins you over or clearly fails.`;
  };

  const buildAnalysisPrompt = (chatLog = [], scenario = {}) => {
    const transcript = formatTranscript(chatLog);
    return `You are an elite revenue coach at TCTC.
Evaluate the following simulated sales conversation for the advisor using The Alchemy of Influence pillars (Ignis, Aqua, Terra).

Scenario:
- Persona: ${(personas[scenario.persona]?.label) || 'Prospect'}
- Offer: ${scenario.offer || 'Not specified'}
- Objective: ${scenario.objective || 'Not specified'}

Transcript:
${transcript}

Provide the analysis in structured HTML with:
1. IGNIS (authority & disruption) evaluation.
2. AQUA (empathy & flow) evaluation.
3. TERRA (logic & close) evaluation.
4. A bolded verdict with one actionable improvement for the next call.`;
  };

  const formatTranscript = (chatLog = []) =>
    chatLog
      .filter((entry) => entry.role !== 'system')
      .map((entry) => `${entry.role === 'user' ? 'Advisor' : 'Prospect'}: ${entry.content}`)
      .join('\n');

  const buildConversationPrompt = (chatLog = []) =>
    `${formatTranscript(chatLog)}\nProspect:`;

  const getOpeningLine = (personaKey) => personas[personaKey]?.opening || personas.skeptic.opening;

  return {
    personas,
    buildScenarioPrompt,
    buildAnalysisPrompt,
    buildConversationPrompt,
    formatTranscript,
    getOpeningLine
  };
})();

const SalesSimulatorStorage = (() => {
  const KEY = 'sales_simulator_sessions';

  const all = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('Invalid simulator history payload', err);
      return [];
    }
  };

  const save = (session) => {
    if (!session?.id) return;
    const history = all();
    history.unshift(session);
    const trimmed = history.slice(0, 25);
    localStorage.setItem(KEY, JSON.stringify(trimmed));
  };

  const clear = () => localStorage.removeItem(KEY);

  const find = (id) => all().find((item) => item.id === id) || null;

  return { all, save, clear, find };
})();

const SalesSimulatorApp = (() => {
  const els = {
    providerSelect: document.getElementById('simulatorProvider'),
    modelInput: document.getElementById('simulatorModel'),
    apiKeyInput: document.getElementById('simulatorApiKey'),
    keyStatus: document.getElementById('simulatorKeyStatus'),
    toast: document.getElementById('simulatorToast'),
    form: document.getElementById('simulatorSetupForm'),
    chatWindow: document.getElementById('chatWindow'),
    messageInput: document.getElementById('simulatorMessage'),
    sendBtn: document.getElementById('sendSimulatorMessage'),
    endBtn: document.getElementById('endSimulationBtn'),
    resetBtn: document.getElementById('resetSimulationBtn'),
    startBtn: document.getElementById('startSimulationBtn'),
    activeLabel: document.getElementById('activeScenarioLabel'),
    activeMeta: document.getElementById('activeScenarioMeta'),
    analysisOutput: document.getElementById('analysisOutput'),
    copyTranscriptBtn: document.getElementById('copyTranscriptBtn'),
    downloadTranscriptBtn: document.getElementById('downloadTranscriptBtn'),
    downloadAnalysisBtn: document.getElementById('downloadAnalysisBtn'),
    historyList: document.getElementById('sessionHistory'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn')
  };

  const state = {
    chatLog: [],
    scenario: null,
    isRunning: false,
    isAnalyzing: false,
    credentials: null,
    modelOverride: null,
    sessionId: null,
    lastSession: null,
    systemPrompt: ''
  };

  const showToast = (message, type = 'info') => {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.dataset.type = type;
  };

  const updateKeyStatus = (message, color = 'var(--tool-muted)') => {
    if (!els.keyStatus) return;
    els.keyStatus.textContent = message;
    els.keyStatus.style.color = color;
  };

  const renderBubble = (className, text) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-message ${className}`;
    bubble.textContent = text;
    els.chatWindow.appendChild(bubble);
    els.chatWindow.scrollTop = els.chatWindow.scrollHeight;
  };

  const pushMessage = (role, text) => {
    state.chatLog.push({ role, content: text });
    const map = { user: 'user', assistant: 'ai', system: 'system' };
    renderBubble(map[role] || 'system', text);
  };

  const resetChatWindow = () => {
    if (!els.chatWindow) return;
    els.chatWindow.innerHTML = '<p class="chat-placeholder">Launch a simulation to begin the conversation.</p>';
  };

  const getCredentials = () => {
    const provider = els.providerSelect.value;
    const saved = SimulatorApiKeys.get(provider);
    if (saved) return { provider, key: saved };
    const attempt = els.apiKeyInput.value.trim();
    if (!attempt) {
      updateKeyStatus('Save a valid API key to continue.', '#f87171');
      return null;
    }
    const validation = SimulatorApiKeys.validate(attempt, provider);
    if (!validation.valid) {
      updateKeyStatus(validation.error, '#f87171');
      return null;
    }
    return { provider, key: validation.value };
  };

  const showTypingIndicator = () => {
    const id = `typing-${Date.now()}`;
    const indicator = document.createElement('div');
    indicator.id = id;
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
    els.chatWindow.appendChild(indicator);
    els.chatWindow.scrollTop = els.chatWindow.scrollHeight;
    return id;
  };

  const removeTypingIndicator = (id) => {
    document.getElementById(id)?.remove();
  };

  const toggleConsoleInputs = (isActive) => {
    els.messageInput.disabled = !isActive;
    els.sendBtn.disabled = !isActive;
    els.endBtn.disabled = !isActive;
    els.resetBtn.disabled = !isActive && !state.chatLog.length;
  };

  const enableExportButtons = (enabled) => {
    els.copyTranscriptBtn.disabled = !enabled;
    els.downloadTranscriptBtn.disabled = !enabled;
    els.downloadAnalysisBtn.disabled = !enabled;
  };

  const handleSaveKey = () => {
    const provider = els.providerSelect.value;
    const { valid, value, error } = SimulatorApiKeys.validate(els.apiKeyInput.value, provider);
    if (!valid) {
      updateKeyStatus(error, '#f87171');
      return;
    }
    SimulatorApiKeys.save(provider, value);
    els.apiKeyInput.value = '';
    updateKeyStatus(`${SalesSimulatorAI.providers[provider].name} key saved locally.`, '#34d399');
  };

  const handleClearKey = () => {
    SimulatorApiKeys.remove(els.providerSelect.value);
    updateKeyStatus('Key cleared.', '#f87171');
  };

  const handleTestKey = async () => {
    const provider = els.providerSelect.value;
    const creds = getCredentials();
    if (!creds) return;
    updateKeyStatus('Testing key…');
    try {
      await SalesSimulatorAI.call({
        provider,
        apiKey: creds.key,
        prompt: 'Respond with OK if you received this test message.',
        systemPrompt: 'You are a diagnostic agent confirming connectivity.'
      });
      updateKeyStatus(`${SalesSimulatorAI.providers[provider].name} responded successfully.`, '#34d399');
    } catch (err) {
      updateKeyStatus(err.message || 'Key test failed.', '#f87171');
    }
  };

  const updateProviderMessage = () => {
    const provider = els.providerSelect.value;
    const saved = SimulatorApiKeys.get(provider);
    if (saved) {
      updateKeyStatus(`${SalesSimulatorAI.providers[provider].name} key detected.`, '#34d399');
    } else {
      updateKeyStatus('No API key saved for this provider.');
    }
  };

  const startSimulation = (event) => {
    event.preventDefault();
    if (state.isRunning) {
      showToast('End or reset the current simulation before launching a new one.', 'error');
      return;
    }
    const creds = getCredentials();
    if (!creds) {
      showToast('Save a valid API key before launching the simulator.', 'error');
      return;
    }

    const formData = new FormData(els.form);
    const scenario = {
      persona: formData.get('persona'),
      pace: formData.get('pace'),
      offer: formData.get('offer')?.trim(),
      dealSize: formData.get('dealSize')?.trim(),
      objective: formData.get('objective')?.trim(),
      difficulty: formData.get('difficulty'),
      context: formData.get('context')?.trim(),
      objections: formData.get('objections')?.trim()
    };

    if (!scenario.offer) {
      showToast('Describe what you are selling to keep the simulator realistic.', 'error');
      return;
    }

    state.credentials = creds;
    state.modelOverride = (els.modelInput.value || '').trim() || null;
    state.systemPrompt = SalesSimulatorPrompts.buildScenarioPrompt(scenario);
    state.scenario = scenario;
    state.chatLog = [{ role: 'system', content: state.systemPrompt }];
    state.isRunning = true;
    state.sessionId = `sim_${Date.now().toString(36)}`;
    state.lastSession = null;

    els.chatWindow.innerHTML = '';
    const intro = SalesSimulatorPrompts.getOpeningLine(scenario.persona);
    pushMessage('assistant', intro);
    toggleConsoleInputs(true);
    enableExportButtons(false);

    const personaLabel = SalesSimulatorPrompts.personas[scenario.persona]?.label || 'Prospect';
    els.activeLabel.textContent = `Live: ${personaLabel}`;
    const metaParts = [
      scenario.offer,
      scenario.objective ? `Objective: ${scenario.objective}` : null,
      scenario.difficulty ? `Resistance: ${scenario.difficulty}` : null
    ].filter(Boolean);
    els.activeMeta.textContent = metaParts.join(' • ') || 'Handle objections and close the next step.';
    showToast('Simulation live. Handle the call in real time.', 'success');
  };

  const sendMessage = async () => {
    if (!state.isRunning || state.isAnalyzing) return;
    const text = els.messageInput.value.trim();
    if (!text) return;
    els.messageInput.value = '';
    pushMessage('user', text);

    const prompt = SalesSimulatorPrompts.buildConversationPrompt(state.chatLog);
    const typingId = showTypingIndicator();
    els.sendBtn.disabled = true;

    try {
      const reply = await SalesSimulatorAI.call({
        provider: state.credentials.provider,
        apiKey: state.credentials.key,
        prompt,
        systemPrompt: state.systemPrompt,
        model: state.modelOverride
      });
      removeTypingIndicator(typingId);
      pushMessage('assistant', reply);
      els.sendBtn.disabled = false;
      els.messageInput.focus();
    } catch (err) {
      removeTypingIndicator(typingId);
      els.sendBtn.disabled = false;
      pushMessage('system', err.message || 'Unable to continue conversation.');
      showToast(err.message || 'Unable to continue conversation.', 'error');
    }
  };

  const endSimulation = async () => {
    if (!state.isRunning || state.isAnalyzing) return;
    state.isAnalyzing = true;
    els.endBtn.disabled = true;
    els.sendBtn.disabled = true;
    els.messageInput.disabled = true;
    showToast('Running coaching analysis…');
    els.analysisOutput.innerHTML = '<p>Analyzing your transcript…</p>';

    const transcript = SalesSimulatorPrompts.formatTranscript(state.chatLog);
    const analysisPrompt = SalesSimulatorPrompts.buildAnalysisPrompt(state.chatLog, state.scenario);

    try {
      const analysis = await SalesSimulatorAI.call({
        provider: state.credentials.provider,
        apiKey: state.credentials.key,
        prompt: analysisPrompt,
        model: state.modelOverride
      });
      els.analysisOutput.innerHTML = analysis;
      const session = {
        id: state.sessionId,
        createdAt: new Date().toISOString(),
        persona: state.scenario.persona,
        offer: state.scenario.offer,
        transcript,
        analysis,
        aiProvider: state.credentials.provider,
        modelOverride: state.modelOverride
      };
      SalesSimulatorStorage.save(session);
      state.lastSession = session;
      state.isRunning = false;
      enableExportButtons(true);
      renderHistory();
      showToast('Analysis complete. Review Ignis, Aqua, and Terra feedback.', 'success');
    } catch (err) {
      els.analysisOutput.innerHTML = `<p class="chat-message system">Analysis failed: ${err.message}</p>`;
      showToast(err.message || 'Analysis failed.', 'error');
    } finally {
      state.isAnalyzing = false;
      els.resetBtn.disabled = false;
    }
  };

  const resetSimulation = () => {
    state.chatLog = [];
    state.scenario = null;
    state.isRunning = false;
    state.isAnalyzing = false;
    state.credentials = null;
    state.modelOverride = null;
    state.sessionId = null;
    resetChatWindow();
    els.messageInput.value = '';
    els.messageInput.disabled = true;
    els.sendBtn.disabled = true;
    els.endBtn.disabled = true;
    els.activeLabel.textContent = 'Waiting for configuration';
    els.activeMeta.textContent = 'Configure the scenario to unlock the console.';
    showToast('Simulator reset. Configure a new scenario when ready.');
  };

  const renderHistory = () => {
    if (!els.historyList) return;
    const sessions = SalesSimulatorStorage.all();
    if (!sessions.length) {
      els.historyList.innerHTML = '<p class="history-empty">Run your first simulation to track transcripts and reviews.</p>';
      return;
    }
    els.historyList.innerHTML = '';
    sessions.forEach((session) => {
      const personaLabel = SalesSimulatorPrompts.personas[session.persona]?.label || 'Prospect';
      const item = document.createElement('article');
      item.className = 'history-item';
      const info = document.createElement('div');
      const date = new Date(session.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
      info.innerHTML = `<strong>${personaLabel}</strong><br><small>${session.offer || 'Custom scenario'} • ${date}</small>`;
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Load Report';
      button.addEventListener('click', () => loadSession(session.id));
      item.appendChild(info);
      item.appendChild(button);
      els.historyList.appendChild(item);
    });
  };

  const loadSession = (id) => {
    const session = SalesSimulatorStorage.find(id);
    if (!session) return;
    state.lastSession = session;
    els.analysisOutput.innerHTML = session.analysis || '<p>No analysis stored.</p>';
    enableExportButtons(Boolean(session.analysis));
    els.chatWindow.innerHTML = '';
    if (session.transcript) {
      session.transcript.split('\n').forEach((line) => {
        const [speaker, ...rest] = line.split(':');
        const text = rest.join(':').trim();
        if (!text) return;
        const role = speaker?.toLowerCase().includes('advisor') ? 'user' : 'ai';
        renderBubble(role, text);
      });
    }
    els.activeLabel.textContent = `Replay: ${SalesSimulatorPrompts.personas[session.persona]?.label || 'Prospect'}`;
    els.activeMeta.textContent = session.offer || 'Custom scenario';
    showToast('Loaded previous session.', 'success');
  };

  const downloadFile = (filename, content, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyTranscript = async () => {
    if (!state.lastSession?.transcript) {
      showToast('Run a simulation to capture a transcript first.', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(state.lastSession.transcript);
      showToast('Transcript copied to clipboard.', 'success');
    } catch (err) {
      showToast('Clipboard copy blocked. Download the file instead.', 'error');
    }
  };

  const downloadTranscript = () => {
    if (!state.lastSession?.transcript) {
      showToast('No transcript available yet.', 'error');
      return;
    }
    downloadFile(`${state.lastSession.id}-transcript.txt`, state.lastSession.transcript, 'text/plain');
  };

  const downloadAnalysis = () => {
    if (!state.lastSession?.analysis) {
      showToast('Run analysis before downloading.', 'error');
      return;
    }
    downloadFile(`${state.lastSession.id}-analysis.html`, state.lastSession.analysis, 'text/html');
  };

  const clearHistory = () => {
    if (!confirm('Clear all saved simulations? This cannot be undone.')) return;
    SalesSimulatorStorage.clear();
    state.lastSession = null;
    enableExportButtons(false);
    resetChatWindow();
    els.analysisOutput.innerHTML = '<p>History cleared. Run a new simulation to regenerate analysis.</p>';
    renderHistory();
    showToast('Session history cleared.', 'success');
  };

  const init = () => {
    if (!els.form) return;
    updateProviderMessage();
    renderHistory();
    enableExportButtons(false);
    resetChatWindow();

    els.form.addEventListener('submit', startSimulation);
    els.sendBtn?.addEventListener('click', sendMessage);
    els.messageInput?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    });
    els.endBtn?.addEventListener('click', endSimulation);
    els.resetBtn?.addEventListener('click', resetSimulation);
    document.getElementById('simulatorSaveKeyBtn')?.addEventListener('click', handleSaveKey);
    document.getElementById('simulatorClearKeyBtn')?.addEventListener('click', handleClearKey);
    document.getElementById('simulatorTestKeyBtn')?.addEventListener('click', handleTestKey);
    els.providerSelect?.addEventListener('change', updateProviderMessage);
    els.copyTranscriptBtn?.addEventListener('click', copyTranscript);
    els.downloadTranscriptBtn?.addEventListener('click', downloadTranscript);
    els.downloadAnalysisBtn?.addEventListener('click', downloadAnalysis);
    els.clearHistoryBtn?.addEventListener('click', clearHistory);

    const preferred = SimulatorApiKeys.getPreferred();
    if (preferred) {
      els.providerSelect.value = preferred;
      updateProviderMessage();
    }
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  SalesSimulatorApp.init();
});
