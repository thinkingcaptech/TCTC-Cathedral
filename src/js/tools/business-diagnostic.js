const DiagnosticApiKeys = (() => {
  const STORAGE_KEY = 'tctc_api_keys';
  const PROVIDERS = ['gemini', 'openai', 'anthropic', 'grok'];

  const save = (provider, key) => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    store[provider] = key.trim();
    store[provider + '_updated'] = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  };

  const remove = (provider) => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    delete store[provider];
    delete store[provider + '_updated'];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  };

  const get = (provider) => {
    try {
      const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return store[provider] || null;
    } catch (err) {
      return null;
    }
  };

  const getPreferred = () => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return PROVIDERS.find((p) => store[p] && store[p].length > 10) || null;
  };

  const hasAny = () => Boolean(getPreferred());

  const validate = (key, provider) => {
    const trimmed = (key || '').trim();
    if (!trimmed) return { valid: false, error: 'API key required.' };
    if (trimmed.length < 15) return { valid: false, error: 'API key looks too short.' };
    if (provider === 'gemini' && !trimmed.startsWith('AIza')) {
      return { valid: false, error: 'Gemini keys normally start with "AIza".' };
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

  return { save, remove, get, getPreferred, hasAny, validate };
})();

const showDiagnosticToast = (message, type = 'info') => {
  const toastEl = document.getElementById('formToast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.dataset.type = type;
};

const DiagnosticAI = (() => {
  const providers = {
    gemini: {
      name: 'Google Gemini',
      endpoint: (key, model = 'gemini-2.0-flash') =>
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      headers: () => ({ 'Content-Type': 'application/json' }),
      buildRequest: (prompt) => ({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 8192 }
      }),
      extract: (data) => data?.candidates?.[0]?.content?.parts?.[0]?.text
    },
    openai: {
      name: 'OpenAI GPT',
      endpoint: () => 'https://api.openai.com/v1/chat/completions',
      headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }),
      buildRequest: (prompt, model = 'gpt-4o-mini') => ({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      }),
      extract: (data) => data?.choices?.[0]?.message?.content
    },
    anthropic: {
      name: 'Anthropic Claude',
      endpoint: () => 'https://api.anthropic.com/v1/messages',
      headers: (key) => ({
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      }),
      buildRequest: (prompt, model = 'claude-3-5-sonnet-20241022') => ({
        model,
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      }),
      extract: (data) => data?.content?.[0]?.text
    },
    grok: {
      name: 'xAI Grok',
      endpoint: () => 'https://api.x.ai/v1/chat/completions',
      headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }),
      buildRequest: (prompt, model = 'grok-beta') => ({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      }),
      extract: (data) => data?.choices?.[0]?.message?.content
    }
  };

  const generate = async ({ apiKey, provider, prompt, model }) => {
    const config = providers[provider];
    if (!config) throw new Error('Unknown provider');
    const response = await fetch(config.endpoint(apiKey, model), {
      method: 'POST',
      headers: config.headers(apiKey),
      body: JSON.stringify(config.buildRequest(prompt, model))
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Request failed (${response.status})`);
    }
    const data = await response.json();
    const text = config.extract(data);
    if (!text) throw new Error('No content generated');
    return text;
  };

  const calculateScores = (answers = {}) => {
    const weights = {
      management: { process_maturity: 0.4, team_alignment: 0.35, kpi_cadence: 0.25 },
      marketing: { lead_volume: 0.4, channel_mix: 0.3, roi_tracking: 0.3 },
      sales: { pipeline_rigor: 0.4, enablement_strength: 0.35, close_rate: 0.25 },
      finances: { cashflow_visibility: 0.35, margin_health: 0.35, scaling_readiness: 0.3 }
    };

    const normalize = (value) => {
      const numericValue = Number(value);
      if (Number.isNaN(numericValue)) return 0;
      return Math.min(Math.max(numericValue, 1), 5);
    };

    const scores = {};
    Object.entries(weights).forEach(([pillar, config]) => {
      const group = answers[pillar] || {};
      let achieved = 0;
      let max = 0;
      Object.entries(config).forEach(([question, weight]) => {
        achieved += normalize(group[question]) * weight;
        max += 5 * weight;
      });
      scores[pillar] = max ? Math.round((achieved / max) * 100) : 0;
    });
    scores.total = Math.round((scores.management + scores.marketing + scores.sales + scores.finances) / 4);
    return scores;
  };

  const getWeakestPillar = (scores) => {
    return Object.entries(scores)
      .filter(([pillar]) => pillar !== 'total')
      .sort(([, a], [, b]) => a - b)[0]?.[0] || null;
  };

  const buildPrompt = (answers, scores) => {
    return `You are an elite management consultant with 25+ years of experience. Analyze the following diagnostic responses and craft a 1,500 word report.

SCORES:
- Management & Operations: ${scores.management}/100
- Marketing & Lead Generation: ${scores.marketing}/100
- Sales & Conversion: ${scores.sales}/100
- Finances & Scalability: ${scores.finances}/100
- Overall Score: ${scores.total}/100

RAW ANSWERS:
${JSON.stringify(answers, null, 2)}

Follow this outline:
1. Executive summary (3 paragraphs).
2. Pillar-by-pillar deep dive (observations, risks, leverage for each pillar).
3. Top 3 critical priorities (problem, cost of inaction, first step).
4. 5-7 strategic recommendations (action, expected outcome, timeframe, metric).
5. 90-day roadmap broken into 30/30/30 blocks.
6. Closing insight + cautionary note + encouragement.

Use markdown headings, crisp sentences, and reference their scores where helpful.`;
  };

  return { generate, calculateScores, getWeakestPillar, buildPrompt, providers };
})();

const DiagnosticStorage = (() => {
  const KEY = 'diagnostic_reports';
  const save = (report) => {
    const reports = JSON.parse(localStorage.getItem(KEY) || '[]');
    reports.unshift(report);
    localStorage.setItem(KEY, JSON.stringify(reports.slice(0, 10)));
    sessionStorage.setItem('latest_diagnostic_report', report.reportId);
  };

  const all = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  };

  const get = (reportId) => all().find((report) => report.reportId === reportId) || null;

  return { save, all, get };
})();

const DiagnosticExports = (() => {
  const copyBtn = document.getElementById('copyReportBtn');
  const downloadMdBtn = document.getElementById('downloadMdBtn');
  const downloadJsonBtn = document.getElementById('downloadJsonBtn');
  let activeReport = null;

  const setButtonsEnabled = (enabled) => {
    [copyBtn, downloadMdBtn, downloadJsonBtn].forEach((btn) => {
      if (btn) btn.disabled = !enabled;
    });
  };

  const buildMarkdown = (report) => {
    const date = new Date(report.createdAt).toLocaleString();
    return `# Business Diagnostic Report

**Report ID:** ${report.reportId}
**Generated:** ${date}
**AI Provider:** ${report.aiProvider ?? 'Unknown'}

## Scores
- Management & Operations: ${report.scores?.management ?? '--'}/100
- Marketing & Lead Generation: ${report.scores?.marketing ?? '--'}/100
- Sales & Conversion: ${report.scores?.sales ?? '--'}/100
- Finances & Scalability: ${report.scores?.finances ?? '--'}/100
- **Overall:** ${report.scores?.total ?? '--'}/100

## AI Recommendations
${report.recommendations || '_No recommendations generated._'}

## Raw Answers
\`\`\`json
${JSON.stringify(report.answers, null, 2)}
\`\`\`
`;
  };

  const downloadFile = (filename, content, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const copyMarkdown = async () => {
    if (!activeReport) return;
    try {
      await navigator.clipboard.writeText(buildMarkdown(activeReport));
      showDiagnosticToast('Report copied to clipboard.', 'success');
    } catch (err) {
      console.error(err);
      showDiagnosticToast('Clipboard permission denied.', 'error');
    }
  };

  const downloadMarkdown = () => {
    if (!activeReport) return;
    downloadFile(`diagnostic-${activeReport.reportId}.md`, buildMarkdown(activeReport), 'text/markdown');
  };

  const downloadJson = () => {
    if (!activeReport) return;
    downloadFile(`diagnostic-${activeReport.reportId}.json`, JSON.stringify(activeReport, null, 2), 'application/json');
  };

  copyBtn?.addEventListener('click', copyMarkdown);
  downloadMdBtn?.addEventListener('click', downloadMarkdown);
  downloadJsonBtn?.addEventListener('click', downloadJson);

  const setActiveReport = (report) => {
    activeReport = report || null;
    setButtonsEnabled(Boolean(activeReport));
  };

  return { setActiveReport };
})();

const DiagnosticHistory = (() => {
  const container = document.getElementById('reportHistory');
  let loadHandler = null;

  const template = (report, isActive) => {
    const date = new Date(report.createdAt).toLocaleDateString();
    return `
      <div class="history-item ${isActive ? 'is-active' : ''}" data-report-id="${report.reportId}">
        <div>
          <strong>${report.scores?.total ?? '--'}/100</strong>
          <div><small>${date} • ${report.aiProvider?.toUpperCase() || 'AI'}</small></div>
        </div>
        <button type="button">View</button>
      </div>
    `;
  };

  const render = (activeId = null) => {
    if (!container) return;
    const reports = DiagnosticStorage.all();
    if (!reports.length) {
      container.innerHTML = '<p class="history-empty">Run your first diagnostic to see reports here.</p>';
      return;
    }
    container.innerHTML = reports.map((report) => template(report, report.reportId === activeId)).join('');
  };

  container?.addEventListener('click', (event) => {
    const target = event.target.closest('.history-item');
    if (!target) return;
    const report = DiagnosticStorage.get(target.dataset.reportId);
    if (report && typeof loadHandler === 'function') {
      loadHandler(report);
    }
  });

  const setOnSelect = (callback) => {
    loadHandler = callback;
  };

  return { render, setOnSelect };
})();

const DiagnosticResults = (() => {
  const scoreEl = document.getElementById('scoreValue');
  const narrativeEl = document.getElementById('scoreNarrative');
  const reportIdEl = document.getElementById('reportIdLabel');
  const breakdownGrid = document.getElementById('breakdownGrid');
  const aiContainer = document.getElementById('aiRecommendations');
  const ctaPanel = document.getElementById('diagnosticCta');
  let currentReport = null;

  const formatNarrative = (score) => {
    if (score >= 85) return 'Elite operations. Keep investing in scalability.';
    if (score >= 70) return 'Strong fundamentals with select optimizations remaining.';
    if (score >= 55) return 'Momentum exists, but key bottlenecks now limit growth.';
    return 'Critical focus required. Address the weakest pillar immediately.';
  };

  const renderBreakdown = (scores) => {
    if (!breakdownGrid) return;
    breakdownGrid.innerHTML = '';
    const titles = {
      management: 'Management & Operations',
      marketing: 'Marketing & Lead Generation',
      sales: 'Sales & Conversion',
      finances: 'Finances & Scalability'
    };
    Object.entries(titles).forEach(([pillar, label]) => {
      const card = document.createElement('article');
      card.className = 'breakdown-card';
      const score = scores?.[pillar] ?? 0;
      card.innerHTML = `
        <h3>${label}</h3>
        <p>${score}/100</p>
        <div class="progress-pill"><span style="width:${score}%"></span></div>
      `;
      breakdownGrid.appendChild(card);
    });
  };

  const renderRecommendations = (text) => {
    if (!aiContainer) return;
    aiContainer.classList.remove('loading');
    if (!text) {
      aiContainer.innerHTML = '<p>Recommendations will appear here once the diagnostic is complete.</p>';
      return;
    }
    let html = text
      .replace(/^### (.*)$/gm, '<h4>$1</h4>')
      .replace(/^## (.*)$/gm, '<h3>$1</h3>')
      .replace(/^# (.*)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*)$/gm, '<li>$1</li>')
      .replace(/^[0-9]+\. (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
      .replace(/\n\n/g, '</p><p>');
    if (!html.startsWith('<')) html = `<p>${html}</p>`;
    aiContainer.innerHTML = `<div class="diagnostic-report">${html}</div>`;
  };

  const updateCtaCopy = (scores) => {
    if (!ctaPanel) return;
    const salesScore = scores?.sales || 0;
    const body = ctaPanel.querySelector('p:nth-of-type(2)');
    if (body && salesScore < 65) {
      body.textContent = 'Sales & Conversion scored the lowest. The Sales Simulator pairs perfectly with this diagnostic to remove friction where it hurts most.';
    }
  };

  const render = (report) => {
    currentReport = report || null;
    if (scoreEl) scoreEl.textContent = report?.scores?.total ?? '--';
    if (narrativeEl && report?.scores) narrativeEl.textContent = formatNarrative(report.scores.total ?? 0);
    if (reportIdEl) reportIdEl.textContent = report?.reportId ?? '--';
    renderBreakdown(report?.scores || {});
    renderRecommendations(report?.recommendations);
    updateCtaCopy(report?.scores || {});
    DiagnosticExports.setActiveReport(currentReport);
    DiagnosticHistory.render(currentReport?.reportId);
  };

  return { render };
})();

const DiagnosticForm = (() => {
  const STEPS = ['Management & Operations', 'Marketing & Lead Generation', 'Sales & Conversion', 'Finances & Scalability'];
  const form = document.getElementById('diagnosticForm');
  const providerSelect = document.getElementById('diagnosticProvider');
  const keyInput = document.getElementById('diagnosticApiKey');
  const modelInput = document.getElementById('diagnosticModel');
  const statusEl = document.getElementById('keyStatus');
  let currentStep = 0;
  const MODEL_HINTS = {
    gemini: 'Try gemini-2.5-flash or gemini-2.0-pro',
    openai: 'Try gpt-4o or gpt-4o-mini',
    anthropic: 'Try claude-3.5-sonnet-20241022',
    grok: 'Try grok-2 or grok-beta'
  };

  const updateProgress = () => {
    const fill = document.getElementById('progressFill');
    const labels = document.querySelectorAll('#progressSteps li');
    const percent = ((currentStep + 1) / STEPS.length) * 100;
    if (fill) fill.style.width = `${percent}%`;
    labels.forEach((label, index) => label.classList.toggle('active', index <= currentStep));
  };

  const validateStep = (stepEl) => {
    const requiredFields = stepEl.querySelectorAll('select[required], textarea[required], input[required]');
    let valid = true;
    requiredFields.forEach((field) => {
      if (!field.value) {
        field.classList.add('invalid');
        valid = false;
      } else {
        field.classList.remove('invalid');
      }
    });
    if (!valid) showDiagnosticToast('Please complete all questions before continuing.', 'error');
    return valid;
  };

  const collectAnswers = () => {
    const formData = new FormData(form);
    const payload = { management: {}, marketing: {}, sales: {}, finances: {}, metadata: {} };
    formData.forEach((value, key) => {
      const [pillar, ...rest] = key.split('_');
      if (payload[pillar]) {
        payload[pillar][rest.join('_') || 'value'] = value;
      } else {
        payload.metadata[key] = value;
      }
    });
    return payload;
  };

  const showStep = (index) => {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((step, idx) => step.classList.toggle('active-step', idx === index));
    currentStep = index;
    updateProgress();
  };

  const handleNavClick = (event) => {
    const target = event.target;
    if (target.matches('.next-btn')) {
      const steps = document.querySelectorAll('.form-step');
      if (validateStep(steps[currentStep]) && currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      }
    }
    if (target.matches('.prev-btn')) {
      if (currentStep > 0) showStep(currentStep - 1);
    }
  };

  const updateModelPlaceholder = () => {
    if (!modelInput || !providerSelect) return;
    const provider = providerSelect.value;
    modelInput.placeholder = MODEL_HINTS[provider] || 'Auto-selects best model';
  };

  const getApiCredentials = () => {
    const provider = providerSelect.value;
    const storedKey = DiagnosticApiKeys.get(provider);
    return storedKey ? { key: storedKey, provider } : null;
  };

  const saveKey = () => {
    const provider = providerSelect.value;
    const { valid, error, value } = DiagnosticApiKeys.validate(keyInput.value, provider);
    if (!valid) {
      statusEl.textContent = error;
      statusEl.style.color = '#f87171';
      return;
    }
    DiagnosticApiKeys.save(provider, value);
    keyInput.value = '';
    statusEl.textContent = `${DiagnosticAI.providers[provider].name} key saved locally.`;
    statusEl.style.color = '#34d399';
  };

  const clearKey = () => {
    DiagnosticApiKeys.remove(providerSelect.value);
    statusEl.textContent = 'Key cleared.';
    statusEl.style.color = '#f87171';
  };

  const testKey = async () => {
    const provider = providerSelect.value;
    const key = DiagnosticApiKeys.get(provider) || keyInput.value.trim();
    if (!key) {
      statusEl.textContent = 'Enter a key before testing.';
      statusEl.style.color = '#f87171';
      return;
    }
    statusEl.textContent = 'Testing key…';
    statusEl.style.color = 'var(--tool-muted)';
    try {
      await DiagnosticAI.generate({ apiKey: key, provider, prompt: 'Reply with OK to confirm connectivity.' });
      statusEl.textContent = `${DiagnosticAI.providers[provider].name} responded successfully.`;
      statusEl.style.color = '#34d399';
    } catch (err) {
      statusEl.textContent = err.message;
      statusEl.style.color = '#f87171';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const steps = document.querySelectorAll('.form-step');
    if (!validateStep(steps[currentStep])) return;

    const creds = getApiCredentials();
    if (!creds) {
      showDiagnosticToast('Please save an API key before generating your report.', 'error');
      statusEl.textContent = 'No API key found. Save one above.';
      statusEl.style.color = '#f87171';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Analyzing…';
    }

    try {
      const answers = collectAnswers();
      const scores = DiagnosticAI.calculateScores(answers);
      const prompt = DiagnosticAI.buildPrompt(answers, scores);
      showDiagnosticToast('Generating personalized recommendations…');
      const model = (modelInput?.value || '').trim() || null;
      const recommendations = await DiagnosticAI.generate({ apiKey: creds.key, provider: creds.provider, prompt, model });
      const reportId = `diag_${Date.now().toString(36)}`;
      const report = {
        reportId,
        createdAt: new Date().toISOString(),
        scores,
        answers,
        recommendations,
        aiProvider: creds.provider,
        modelOverride: model
      };
      DiagnosticStorage.save(report);
      DiagnosticResults.render(report);
      showDiagnosticToast('Report generated successfully.', 'success');
    } catch (error) {
      console.error(error);
      showDiagnosticToast(error.message || 'Could not generate your report.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Generate My Report';
      }
    }
  };

  const init = () => {
    if (!form) return;
    form.addEventListener('click', handleNavClick);
    form.addEventListener('submit', handleSubmit);
    document.getElementById('saveKeyBtn')?.addEventListener('click', saveKey);
    document.getElementById('clearKeyBtn')?.addEventListener('click', clearKey);
    document.getElementById('testKeyBtn')?.addEventListener('click', testKey);
    providerSelect?.addEventListener('change', () => {
      updateModelPlaceholder();
      const provider = providerSelect.value;
      const storedKey = DiagnosticApiKeys.get(provider);
      if (storedKey) {
        statusEl.textContent = `${DiagnosticAI.providers[provider].name} key detected.`;
        statusEl.style.color = '#34d399';
      } else {
        statusEl.textContent = 'No API key saved for this provider.';
        statusEl.style.color = 'var(--tool-muted)';
      }
    });

    const preferred = DiagnosticApiKeys.getPreferred();
    if (preferred) {
      providerSelect.value = preferred;
      statusEl.textContent = `${DiagnosticAI.providers[preferred].name} key detected.`;
      statusEl.style.color = '#34d399';
    } else {
      statusEl.textContent = 'Save a key to begin.';
      statusEl.style.color = 'var(--tool-muted)';
    }

    updateModelPlaceholder();
    showStep(0);
  };

  return { init };
})();

DiagnosticHistory.setOnSelect((report) => {
  DiagnosticResults.render(report);
  showDiagnosticToast('Loaded previous report.', 'success');
});

document.addEventListener('DOMContentLoaded', () => {
  DiagnosticForm.init();
  DiagnosticHistory.render();
  DiagnosticExports.setActiveReport(null);
});
