const OfferArchitectKeys = (() => {
  const STORAGE_KEY = "tctc_api_keys";
  const PROVIDERS = ["gemini", "openai", "anthropic", "grok"];

  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (err) {
      console.warn("API key storage corrupted", err);
      return {};
    }
  };

  const save = (provider, value) => {
    if (!provider || !value) return;
    const payload = read();
    payload[provider] = value;
    payload[`${provider}_updated`] = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const remove = (provider) => {
    const payload = read();
    delete payload[provider];
    delete payload[`${provider}_updated`];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const get = (provider) => read()[provider] || null;

  const getPreferred = () => PROVIDERS.find((p) => Boolean(get(p))) || null;

  const validate = (key, provider) => {
    const value = (key || "").trim();
    if (!value) return { valid: false, error: "API key required." };
    if (value.length < 15) return { valid: false, error: "API key looks too short." };
    if (provider === "gemini" && !value.startsWith("AIza")) {
      return { valid: false, error: 'Gemini keys typically start with "AIza".' };
    }
    if (provider === "openai" && !value.startsWith("sk-")) {
      return { valid: false, error: 'OpenAI keys start with "sk-".' };
    }
    if (provider === "anthropic" && !value.startsWith("sk-ant-")) {
      return { valid: false, error: 'Claude keys start with "sk-ant-".' };
    }
    if (provider === "grok" && !value.startsWith("xai-")) {
      return { valid: false, error: 'Grok keys start with "xai-".' };
    }
    return { valid: true, value };
  };

  return { save, remove, get, getPreferred, validate };
})();

const OfferArchitectAI = (() => {
  const providers = {
    gemini: {
      name: "Google Gemini",
      defaultModel: "gemini-2.5-flash",
      endpoint: (key, model) =>
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      headers: () => ({ "Content-Type": "application/json" }),
      buildBody: (prompt) => ({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.72, maxOutputTokens: 2048 }
      }),
      extract: (payload) => payload?.candidates?.[0]?.content?.parts?.[0]?.text
    },
    openai: {
      name: "OpenAI GPT",
      defaultModel: "gpt-4o-mini",
      endpoint: () => "https://api.openai.com/v1/chat/completions",
      headers: (key) => ({ "Content-Type": "application/json", Authorization: `Bearer ${key}` }),
      buildBody: (prompt, model) => ({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.75,
        max_tokens: 2000
      }),
      extract: (payload) => payload?.choices?.[0]?.message?.content
    },
    anthropic: {
      name: "Anthropic Claude",
      defaultModel: "claude-3-5-sonnet-20241022",
      endpoint: () => "https://api.anthropic.com/v1/messages",
      headers: (key) => ({
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      }),
      buildBody: (prompt, model) => ({
        model,
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }]
      }),
      extract: (payload) => payload?.content?.[0]?.text
    },
    grok: {
      name: "xAI Grok",
      defaultModel: "grok-4-fast",
      endpoint: () => "https://api.x.ai/v1/chat/completions",
      headers: (key) => ({ "Content-Type": "application/json", Authorization: `Bearer ${key}` }),
      buildBody: (prompt, model) => ({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.78,
        max_tokens: 2000
      }),
      extract: (payload) => payload?.choices?.[0]?.message?.content
    }
  };

  const call = async ({ provider, apiKey, prompt, model }) => {
    const config = providers[provider];
    if (!config) throw new Error("Unsupported provider.");
    const targetModel = model || config.defaultModel;
    const response = await fetch(config.endpoint(apiKey, targetModel), {
      method: "POST",
      headers: config.headers(apiKey),
      body: JSON.stringify(config.buildBody(prompt, targetModel))
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error?.error?.message || `Request failed (${response.status}).`);
    }
    const data = await response.json();
    const text = config.extract(data);
    if (!text) throw new Error("Empty response from provider.");
    return text.trim();
  };

  return { call, providers };
})();

const OfferArchitectPrompt = (inputs = {}) => {
  const template = `You are an elite offer architect at TCTC.
Use the following intake to produce a JSON blueprint. Respond ONLY with JSON, no prose, no markdown, no code fences.

Inputs:
${JSON.stringify(inputs, null, 2)}

Return JSON in this exact structure:
{
  "snapshot": {
    "headline": "",
    "tagline": "",
    "audience": "",
    "primaryPromise": "",
    "priceStructure": "",
    "riskReversal": "",
    "keyProof": ""
  },
  "valueStack": [
    {
      "title": "",
      "description": "",
      "format": "",
      "outcome": "",
      "valueAnchor": ""
    }
  ],
  "launchPlan": {
    "goToMarket": [
      { "name": "", "channel": "", "angle": "" }
    ],
    "enablement": ["", ""],
    "metrics": ["", ""],
    "timeline": {
      "week0": "",
      "week1": "",
      "week2": "",
      "week3": ""
    }
  },
  "messaging": {
    "differentiator": "",
    "urgencyLever": "",
    "cta": "",
    "soundbite": ""
  }
}`;
  return template;
};

const OfferArchitectStorage = (() => {
  const KEY = "offer_architect_blueprints";

  const all = () => {
    try {
      const payload = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(payload) ? payload : [];
    } catch (err) {
      console.warn("Invalid blueprint payload", err);
      return [];
    }
  };

  const save = (item) => {
    if (!item?.id) return;
    const list = all();
    list.unshift(item);
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 20)));
  };

  const clear = () => localStorage.removeItem(KEY);

  const find = (id) => all().find((entry) => entry.id === id) || null;

  return { all, save, clear, find };
})();

const OfferArchitectUI = (() => {
  const els = {
    provider: document.getElementById("offerProvider"),
    model: document.getElementById("offerModel"),
    apiKey: document.getElementById("offerApiKey"),
    keyStatus: document.getElementById("offerKeyStatus"),
    toast: document.getElementById("offerToast"),
    form: document.getElementById("offerForm"),
    generateBtn: document.getElementById("offerGenerateBtn"),
    snapshotTitle: document.getElementById("offerSnapshotTitle"),
    snapshot: document.getElementById("offerSnapshot"),
    stack: document.getElementById("offerValueStack"),
    launch: document.getElementById("offerLaunchPlan"),
    history: document.getElementById("offerHistory"),
    copyBtn: document.getElementById("copyOfferBtn"),
    downloadMdBtn: document.getElementById("downloadOfferBtn"),
    downloadJsonBtn: document.getElementById("downloadOfferJsonBtn"),
    clearHistoryBtn: document.getElementById("offerClearHistoryBtn"),
    programBody: document.getElementById("offerProgramBody"),
    commsBody: document.getElementById("offerCommsBody"),
    copyProgramBtn: document.getElementById("copyProgramBtn"),
    copyCommsBtn: document.getElementById("copyCommsBtn")
  };

  let activeBlueprint = null;
  let blueprintMarkdown = "";
  let activeProgram = "";
  let activeComms = "";
  let activeProgram = "";
  let activeComms = "";

  const setToast = (message, type = "info") => {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.dataset.type = type;
  };

  const setKeyStatus = (message, color = "var(--tool-muted)") => {
    if (!els.keyStatus) return;
    els.keyStatus.textContent = message;
    els.keyStatus.style.color = color;
  };

  const collectInputs = () => ({
    name: document.getElementById("offerName")?.value.trim(),
    audience: document.getElementById("offerAudience")?.value.trim(),
    motion: document.getElementById("offerMotion")?.value,
    fulfillment: document.getElementById("offerFulfillment")?.value,
    pains: document.getElementById("offerPain")?.value.trim(),
    promise: document.getElementById("offerPromise")?.value.trim(),
    mechanism: document.getElementById("offerMechanism")?.value.trim(),
    deliverables: document.getElementById("offerDeliverables")?.value.trim(),
    proof: document.getElementById("offerProof")?.value.trim(),
    price: document.getElementById("offerPrice")?.value.trim(),
    guarantee: document.getElementById("offerGuarantee")?.value.trim(),
    bonuses: document.getElementById("offerBonuses")?.value.trim(),
    urgency: document.getElementById("offerUrgency")?.value.trim()
  });

  const requireInputs = (inputs) => {
    if (!inputs.name || !inputs.audience) {
      setToast("Provide an offer name and primary persona to continue.", "error");
      return false;
    }
    if (!inputs.deliverables?.length) {
      setToast("List a few deliverables or milestones so the AI has material to work with.", "error");
      return false;
    }
    return true;
  };

  const getCredentials = () => {
    const provider = els.provider.value;
    const saved = OfferArchitectKeys.get(provider);
    if (saved) return { provider, key: saved };
    const attempt = els.apiKey.value;
    const validation = OfferArchitectKeys.validate(attempt, provider);
    if (!validation.valid) {
      setKeyStatus(validation.error, "#f87171");
      return null;
    }
    return { provider, key: validation.value };
  };

  const extractJson = (text) => {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch (err) {
      console.warn("JSON parse failed", err);
      return null;
    }
  };

  const formatSnapshot = (snapshot = {}) => {
    if (!els.snapshot || !snapshot) return;
    const cards = [
      { label: "Audience", value: snapshot.audience },
      { label: "Promise", value: snapshot.primaryPromise },
      { label: "Price", value: snapshot.priceStructure },
      { label: "Risk Reversal", value: snapshot.riskReversal },
      { label: "Proof", value: snapshot.keyProof }
    ]
      .filter((item) => item.value)
      .map(
        (item) =>
          `<article class="snapshot-card"><h4>${item.label}</h4><p>${item.value}</p></article>`
      );

    els.snapshot.innerHTML = cards.length
      ? cards.join("")
      : '<p class="result-placeholder">No snapshot data returned.</p>';
    els.snapshotTitle.textContent = snapshot.headline || "Offer Snapshot";
  };

  const formatStack = (valueStack = []) => {
    if (!els.stack) return;
    if (!valueStack.length) {
      els.stack.innerHTML = '<p class="result-placeholder">No deliverables returned.</p>';
      return;
    }
    els.stack.innerHTML = valueStack
      .map(
        (item) => `<article class="stack-card">
          <small>${item.format || "Deliverable"}</small>
          <h4>${item.title || "Deliverable"}</h4>
          <p>${item.description || ""}</p>
          ${item.outcome ? `<p><strong>Outcome:</strong> ${item.outcome}</p>` : ""}
          ${item.valueAnchor ? `<p><strong>Value:</strong> ${item.valueAnchor}</p>` : ""}
        </article>`
      )
      .join("");
  };

  const formatLaunch = (plan = {}) => {
    if (!els.launch) return;
    const cards = [];
    if (plan.goToMarket?.length) {
      cards.push(
        `<article class="launch-card">
          <h4>Go-To-Market Plays</h4>
          <ul>${plan.goToMarket
            .map((play) => `<li><strong>${play.name}:</strong> ${play.channel} — ${play.angle}</li>`)
            .join("")}</ul>
        </article>`
      );
    }
    if (plan.enablement?.length) {
      cards.push(
        `<article class="launch-card">
          <h4>Enablement</h4>
          <ul>${plan.enablement.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>`
      );
    }
    if (plan.metrics?.length) {
      cards.push(
        `<article class="launch-card">
          <h4>Metrics</h4>
          <ul>${plan.metrics.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>`
      );
    }
    if (plan.timeline) {
      const entries = Object.entries(plan.timeline)
        .filter(([, value]) => Boolean(value))
        .map(([week, text]) => `<li><strong>${week.toUpperCase()}:</strong> ${text}</li>`)
        .join("");
      if (entries) {
        cards.push(
          `<article class="launch-card">
            <h4>Timeline</h4>
            <ul>${entries}</ul>
          </article>`
        );
      }
    }
    els.launch.innerHTML = cards.length
      ? cards.join("")
      : '<p class="result-placeholder">No GTM plan returned.</p>';
  };

  const PROGRAM_PLACEHOLDER =
    "Generate the blueprint to unlock the 12-week execution roadmap.";
  const COMMS_PLACEHOLDER =
    "Once the 12-week plan renders, the messaging pack will compile here.";

  const resetProgramSection = (message = PROGRAM_PLACEHOLDER) => {
    if (els.programBody) {
      els.programBody.innerHTML = `<p class="result-placeholder">${message}</p>`;
    }
    activeProgram = "";
    if (els.copyProgramBtn) els.copyProgramBtn.disabled = true;
  };

  const resetCommsSection = (message = COMMS_PLACEHOLDER) => {
    if (els.commsBody) {
      els.commsBody.innerHTML = `<p class="result-placeholder">${message}</p>`;
    }
    activeComms = "";
    if (els.copyCommsBtn) els.copyCommsBtn.disabled = true;
  };

  const setProgramContent = (text) => {
    if (els.programBody) {
      els.programBody.textContent = text;
    }
    activeProgram = text;
    if (els.copyProgramBtn) els.copyProgramBtn.disabled = !text;
  };

  const setProgramStatus = (message) => {
    if (els.programBody) {
      els.programBody.textContent = message;
    }
    activeProgram = "";
    if (els.copyProgramBtn) els.copyProgramBtn.disabled = true;
  };

  const setCommsStatus = (message) => {
    if (els.commsBody) {
      els.commsBody.textContent = message;
    }
    activeComms = "";
    if (els.copyCommsBtn) els.copyCommsBtn.disabled = true;
  };

  const setCommsContent = (text) => {
    if (els.commsBody) {
      els.commsBody.textContent = text;
    }
    activeComms = text;
    if (els.copyCommsBtn) els.copyCommsBtn.disabled = !text;
  };

  const setActiveBlueprint = (blueprint) => {
    activeBlueprint = blueprint;
    blueprintMarkdown = blueprint ? buildMarkdown(blueprint) : "";
    if (blueprint) {
      resetProgramSection("Generate to refresh the 12-week delivery program.");
      resetCommsSection("Generate to refresh the messaging pack.");
    } else {
      resetProgramSection();
      resetCommsSection();
    }
    const disabled = !blueprint;
    els.copyBtn.disabled = disabled;
    els.downloadMdBtn.disabled = disabled;
    els.downloadJsonBtn.disabled = disabled;
  };

  const renderBlueprint = (blueprint) => {
    setActiveBlueprint(blueprint);
    formatSnapshot(blueprint?.snapshot);
    formatStack(blueprint?.valueStack);
    formatLaunch(blueprint?.launchPlan);
  };

  const renderHistory = () => {
    if (!els.history) return;
    const history = OfferArchitectStorage.all();
    if (!history.length) {
      els.history.innerHTML = '<p class="history-empty">Run your first blueprint to save it locally.</p>';
      return;
    }
    els.history.innerHTML = "";
    history.forEach((item) => {
      const row = document.createElement("article");
      row.className = "history-item";
      const info = document.createElement("div");
      const timestamp = new Date(item.createdAt).toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short"
      });
      info.innerHTML = `<strong>${item.inputs?.name || "Offer"}</strong><br><small>${
        item.inputs?.audience || "Persona"
      } • ${timestamp}</small>`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Load Blueprint";
      btn.addEventListener("click", () => {
        renderBlueprint(item);
        setToast("Blueprint loaded.", "success");
      });
      row.appendChild(info);
      row.appendChild(btn);
      els.history.appendChild(row);
    });
  };

  const buildMarkdown = (blueprint) => {
    if (!blueprint) return "";
    const snapshot = blueprint.snapshot || {};
    const stack = blueprint.valueStack || [];
    const plan = blueprint.launchPlan || {};
    const lines = [];
    lines.push(`# ${snapshot.headline || blueprint.inputs?.name || "Offer Blueprint"}`);
    if (snapshot.tagline) lines.push(`_${snapshot.tagline}_`);
    lines.push("");
    lines.push(`**Audience:** ${snapshot.audience || blueprint.inputs?.audience || "—"}`);
    lines.push(`**Promise:** ${snapshot.primaryPromise || "—"}`);
    lines.push(`**Price Structure:** ${snapshot.priceStructure || blueprint.inputs?.price || "—"}`);
    lines.push(`**Risk Reversal:** ${snapshot.riskReversal || blueprint.inputs?.guarantee || "—"}`);
    lines.push("");
    lines.push("## Value Stack");
    stack.forEach((item, index) => {
      lines.push(
        `${index + 1}. **${item.title || "Deliverable"}** (${item.format || "Format"}): ${
          item.description || ""
        }`
      );
      if (item.outcome) lines.push(`   - Outcome: ${item.outcome}`);
      if (item.valueAnchor) lines.push(`   - Value: ${item.valueAnchor}`);
    });
    lines.push("");
    lines.push("## Launch Plan");
    if (plan.goToMarket?.length) {
      lines.push("### Go-To-Market Plays");
      plan.goToMarket.forEach((play) =>
        lines.push(`- **${play.name}** (${play.channel}): ${play.angle}`)
      );
    }
    if (plan.enablement?.length) {
      lines.push("");
      lines.push("### Enablement");
      plan.enablement.forEach((item) => lines.push(`- ${item}`));
    }
    if (plan.metrics?.length) {
      lines.push("");
      lines.push("### Metrics");
      plan.metrics.forEach((item) => lines.push(`- ${item}`));
    }
    if (plan.timeline) {
      lines.push("");
      lines.push("### Timeline");
      Object.entries(plan.timeline).forEach(([week, text]) => {
        if (text) lines.push(`- ${week}: ${text}`);
      });
    }
    return lines.join("\n");
  };

  const copyMarkdown = async () => {
    if (!activeBlueprint) {
      setToast("No blueprint to copy yet.", "error");
      return;
    }
    try {
      await navigator.clipboard.writeText(buildMarkdown(activeBlueprint));
      setToast("Blueprint copied to clipboard.", "success");
    } catch (err) {
      setToast("Clipboard blocked. Download the Markdown instead.", "error");
    }
  };

  const downloadFile = (filename, content, type = "text/plain") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadMarkdown = () => {
    if (!activeBlueprint) {
      setToast("Generate a blueprint first.", "error");
      return;
    }
    downloadFile(`${activeBlueprint.id}.md`, buildMarkdown(activeBlueprint), "text/markdown");
  };

  const copyProgram = async () => {
    if (!activeProgram) {
      setToast("Generate the 12-week program first.", "error");
      return;
    }
    try {
      await navigator.clipboard.writeText(activeProgram);
      setToast("12-week plan copied.", "success");
    } catch (err) {
      setToast("Clipboard blocked. Download the Markdown instead.", "error");
    }
  };

  const copyComms = async () => {
    if (!activeComms) {
      setToast("Generate the communications pack first.", "error");
      return;
    }
    try {
      await navigator.clipboard.writeText(activeComms);
      setToast("Messaging pack copied.", "success");
    } catch (err) {
      setToast("Clipboard blocked. Download the Markdown instead.", "error");
    }
  };

  const downloadJson = () => {
    if (!activeBlueprint) {
      setToast("Generate a blueprint first.", "error");
      return;
    }
    downloadFile(`${activeBlueprint.id}.json`, JSON.stringify(activeBlueprint, null, 2), "application/json");
  };

  const buildProgramPrompt = (markdown) => {
    return `You already architected the following offer:

${markdown}

Transform it into a detailed 12-week fulfillment program. Each week must include:
- Theme (descriptive name)
- Internal focus (what the team builds or optimizes)
- Client-facing deliverable
- Proof of progress metric

Format the response using Markdown headings:
### Week 1 - Theme
- Internal Focus:
- Deliverable:
- Proof of Progress:

Repeat for Weeks 1-12. Use confident, instructional language.`;
  };

  const buildCommsPrompt = (markdown, programText) => {
    return `You architected this offer blueprint:
${markdown}

You also drafted this 12-week program:
${programText}

Now produce a cohesive communications pack with the following sections:

### LinkedIn Post
- Hook
- Body (2 short paragraphs)
- CTA

### Launch Email
- Subject line
- Body formatted in short paragraphs with a call-to-action

### Offer CTA Block
- Headline
- Subheadline
- Button copy

### Visual Prompt
Describe a Midjourney-style prompt for a high-status hero image that represents the offer.

Make sure each section references the offer positioning and 12-week program.`;
  };

  const generateProgramPlan = async (markdown, creds, modelOverride) => {
    if (!els.programBody) return "";
    setProgramStatus("Drafting 12-week delivery program…");
    try {
      const response = await OfferArchitectAI.call({
        provider: creds.provider,
        apiKey: creds.key,
        prompt: buildProgramPrompt(markdown.slice(0, 4000)),
        model: modelOverride
      });
      const text = response.trim();
      setProgramContent(text);
      return text;
    } catch (err) {
      console.error(err);
      resetProgramSection(`Could not generate 12-week plan: ${err.message}`);
      return "";
    }
  };

  const generateCommsPack = async (markdown, programText, creds, modelOverride) => {
    if (!els.commsBody) return "";
    if (!programText) {
      resetCommsSection("Generate the 12-week program before assembling messaging.");
      return "";
    }
    setCommsStatus("Assembling LinkedIn + email assets…");
    try {
      const response = await OfferArchitectAI.call({
        provider: creds.provider,
        apiKey: creds.key,
        prompt: buildCommsPrompt(markdown.slice(0, 4000), programText.slice(0, 4000)),
        model: modelOverride
      });
      const text = response.trim();
      setCommsContent(text);
      return text;
    } catch (err) {
      console.error(err);
      resetCommsSection(`Unable to build comms pack: ${err.message}`);
      return "";
    }
  };

  const clearHistory = () => {
    if (!confirm("Erase all locally saved blueprints?")) return;
    OfferArchitectStorage.clear();
    renderHistory();
    setActiveBlueprint(null);
    els.snapshot.innerHTML = '<p class="result-placeholder">History cleared.</p>';
    els.stack.innerHTML = '<p class="result-placeholder">History cleared.</p>';
    els.launch.innerHTML = '<p class="result-placeholder">History cleared.</p>';
    setToast("Blueprint history cleared.", "success");
  };

  const saveKey = () => {
    const provider = els.provider.value;
    const validation = OfferArchitectKeys.validate(els.apiKey.value, provider);
    if (!validation.valid) {
      setKeyStatus(validation.error, "#f87171");
      return;
    }
    OfferArchitectKeys.save(provider, validation.value);
    els.apiKey.value = "";
    setKeyStatus(`${OfferArchitectAI.providers[provider].name} key saved locally.`, "#34d399");
  };

  const clearKey = () => {
    OfferArchitectKeys.remove(els.provider.value);
    setKeyStatus("Key cleared.", "#f87171");
  };

  const testKey = async () => {
    const provider = els.provider.value;
    const creds = getCredentials();
    if (!creds) return;
    setKeyStatus("Testing key…");
    try {
      await OfferArchitectAI.call({
        provider,
        apiKey: creds.key,
        prompt: "Reply with OK if this BYOK connectivity test worked."
      });
      setKeyStatus(`${OfferArchitectAI.providers[provider].name} responded successfully.`, "#34d399");
    } catch (err) {
      setKeyStatus(err.message || "Key test failed.", "#f87171");
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const inputs = collectInputs();
    if (!requireInputs(inputs)) return;
    const creds = getCredentials();
    if (!creds) {
      setToast("Save an API key before generating a blueprint.", "error");
      return;
    }

    els.generateBtn.disabled = true;
    els.generateBtn.textContent = "Architecting…";
    setToast("Building blueprint…");

    try {
      const prompt = OfferArchitectPrompt(inputs);
      const modelOverride = (els.model.value || "").trim() || null;
      const response = await OfferArchitectAI.call({
        provider: creds.provider,
        apiKey: creds.key,
        prompt,
        model: modelOverride
      });
      const parsed = extractJson(response);
      if (!parsed) throw new Error("Could not parse provider response. Try again with more detail.");

      const blueprint = {
        id: `offer_${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
        inputs,
        snapshot: parsed.snapshot || {},
        valueStack: Array.isArray(parsed.valueStack) ? parsed.valueStack : [],
        launchPlan: parsed.launchPlan || {},
        messaging: parsed.messaging || {},
        raw: response,
        aiProvider: creds.provider,
        modelOverride
      };

      OfferArchitectStorage.save(blueprint);
      renderBlueprint(blueprint);
      renderHistory();
      setToast("Blueprint generated successfully.", "success");

      const contextMarkdown = blueprintMarkdown || buildMarkdown(blueprint);
      resetProgramSection("Drafting 12-week delivery program…");
      resetCommsSection("Waiting for fulfillment plan before assembling messaging.");
      const programText = await generateProgramPlan(contextMarkdown, creds, modelOverride);
      if (programText) {
        await generateCommsPack(contextMarkdown, programText, creds, modelOverride);
      }
    } catch (err) {
      console.error(err);
      setToast(err.message || "Unable to generate blueprint.", "error");
    } finally {
      els.generateBtn.disabled = false;
      els.generateBtn.textContent = "Generate Blueprint";
    }
  };

  const handleProviderChange = () => {
    const provider = els.provider.value;
    const saved = OfferArchitectKeys.get(provider);
    if (saved) {
      setKeyStatus(`${OfferArchitectAI.providers[provider].name} key detected.`, "#34d399");
    } else {
      setKeyStatus("No API key saved for this provider.");
    }
  };

  const init = () => {
    if (!els.form) return;
    resetProgramSection();
    resetCommsSection();
    setActiveBlueprint(null);
    const preferred = OfferArchitectKeys.getPreferred();
    if (preferred) {
      els.provider.value = preferred;
      setKeyStatus(`${OfferArchitectAI.providers[preferred].name} key detected.`, "#34d399");
    } else {
      setKeyStatus("Save a key to begin.");
    }

    renderHistory();
    setActiveBlueprint(null);
    els.form.addEventListener("submit", submitForm);
    document.getElementById("offerSaveKeyBtn")?.addEventListener("click", saveKey);
    document.getElementById("offerClearKeyBtn")?.addEventListener("click", clearKey);
    document.getElementById("offerTestKeyBtn")?.addEventListener("click", testKey);
    els.provider.addEventListener("change", handleProviderChange);
    els.copyBtn?.addEventListener("click", copyMarkdown);
    els.downloadMdBtn?.addEventListener("click", downloadMarkdown);
    els.downloadJsonBtn?.addEventListener("click", downloadJson);
    els.clearHistoryBtn?.addEventListener("click", clearHistory);
    els.copyProgramBtn?.addEventListener("click", copyProgram);
    els.copyCommsBtn?.addEventListener("click", copyComms);
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  OfferArchitectUI.init();
});
