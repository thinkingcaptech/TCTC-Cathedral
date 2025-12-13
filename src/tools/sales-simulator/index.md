---
toolStyles: "/css/tools/sales-simulator.css"
toolJavascript: "/js/tools/sales-simulator.js"
inlineInterface: true
---

The AI Sales Simulator is your pressure-free reps practice room. Build custom buyer personas, define likely objections, and run realistic call flows without burning real prospects.

### What you can do

- **Persona lab** – craft ideal buyers with industry, role, pain points, budgets, and tones.
- **Live objection playground** – queue the objections you want to master and let the AI deploy them intelligently.
- **Conversation analytics** – real-time transcripts, talk-to-listen ratios, objection outcomes, and coaching prompts.
- **Session exports** – download transcripts, feedback summaries, and action plans for future reviews.

### How it works

1. Enter the scenario: persona, product pitch, pricing, competitive edges.
2. Choose your model (Gemini 2.5 Flash, GPT-5.1, Claude Sonnet 4.5, or Grok 4 Fast) and difficulty level.
3. Run the call in-browser with audio or text, pausing or restarting whenever you want.
4. Review the transcript, spotting dropped objections and suggested follow-ups.

Hook the Firebase-backed simulator you already built into `/js/tools/sales-simulator.js` and reuse the BYOK panel to keep user keys safe. This page will host the polished UI while future enhancements (multi-agent buyers, CRM push) stay consistent with the TCTC visual language.

<div id="tool-interface" class="tool-interface simulator-app">
  <div class="simulator-grid">
    <section class="simulator-panel">
      <section class="byok-panel">
        <div>
          <p class="tool-hero__eyebrow">Bring Your Own Keys</p>
          <h3>Connect your preferred AI provider</h3>
          <p>Your key stays in this browser. Choose a mid-range text model for responsive roleplays.</p>
        </div>
        <div class="byok-row">
          <div class="byok-field">
            <label for="simulatorProvider">Provider</label>
            <select id="simulatorProvider">
              <option value="gemini">Google Gemini</option>
              <option value="openai">OpenAI GPT</option>
              <option value="anthropic">Anthropic Claude</option>
              <option value="grok">xAI Grok</option>
            </select>
          </div>
          <div class="byok-field">
            <label for="simulatorModel">Model (optional)</label>
            <input id="simulatorModel" type="text" placeholder="Auto-selects best model" list="simulatorModelOptions">
          </div>
        </div>
        <datalist id="simulatorModelOptions">
          <option value="gemini-2.5-flash"></option>
          <option value="gemini-2.5-flash-lite"></option>
          <option value="gpt-4o"></option>
          <option value="gpt-4o-mini"></option>
          <option value="gpt-5-mini"></option>
          <option value="claude-sonnet-4.5"></option>
          <option value="claude-haiku-4.5"></option>
          <option value="grok-4-fast"></option>
          <option value="grok-3-mini"></option>
        </datalist>
        <div class="byok-field">
          <label for="simulatorApiKey">API Key</label>
          <input id="simulatorApiKey" type="password" placeholder="Paste your key here">
        </div>
        <div class="byok-actions">
          <button type="button" class="button button--primary" id="simulatorSaveKeyBtn">Save Key</button>
          <button type="button" class="button button--ghost" id="simulatorTestKeyBtn">Test Key</button>
          <button type="button" class="button button--ghost" id="simulatorClearKeyBtn">Clear</button>
        </div>
        <p id="simulatorKeyStatus" class="byok-status"></p>
      </section>

      <section class="simulator-setup">
        <div class="setup-header">
          <p class="tool-hero__eyebrow">Scenario Builder</p>
          <h3>Define the buyer you'll spar with</h3>
          <p>Personas, tones, and objections shape the way the AI prospect responds.</p>
        </div>
        <form id="simulatorSetupForm" class="setup-form">
          <div class="setup-grid">
            <label>
              <span>Prospect Persona</span>
              <select name="persona" id="simPersona" required>
                <option value="skeptic">Skeptical Operator</option>
                <option value="busy">Busy Executive</option>
                <option value="friendly">Friendly Browser</option>
                <option value="budget">Budget Hawk</option>
              </select>
            </label>
            <label>
              <span>Conversation Pace</span>
              <select name="pace" id="simPace">
                <option value="fast">Fast, abrupt replies</option>
                <option value="balanced" selected>Balanced conversation</option>
                <option value="deliberate">Deliberate and methodical</option>
              </select>
            </label>
            <label>
              <span>Offer / Product</span>
              <input type="text" name="offer" id="simOffer" placeholder="AI RevOps Audit ($7,500)" required>
            </label>
            <label>
              <span>Deal Size</span>
              <input type="text" name="dealSize" id="simDealSize" placeholder="$5k retainer, 3-month minimum">
            </label>
            <label>
              <span>Primary Objective</span>
              <input type="text" name="objective" id="simObjective" placeholder="Secure paid strategy intensive">
            </label>
            <label>
              <span>Difficulty</span>
              <select name="difficulty" id="simDifficulty">
                <option value="medium" selected>Medium resistance</option>
                <option value="hard">High resistance</option>
                <option value="friendly">Warm intro</option>
              </select>
            </label>
          </div>
          <label>
            <span>Prospect Notes</span>
            <textarea name="context" id="simContext" rows="3" placeholder="Industry, tech stack, KPIs, pain points..."></textarea>
          </label>
          <label>
            <span>Objections to rehearse</span>
            <textarea name="objections" id="simObjections" rows="3" placeholder="Budget pushback, internal approvals, competing vendor..."></textarea>
          </label>
          <div class="setup-actions">
            <button type="submit" class="button button--primary" id="startSimulationBtn">Launch Simulation</button>
          </div>
        </form>
        <p class="simulator-note">Simulations run locally in your browser. Keys never leave your machine.</p>
        <div id="simulatorToast" class="simulator-toast" role="status" aria-live="polite"></div>
      </section>
    </section>

    <section class="simulator-panel simulator-panel--console">
      <div class="console-header">
        <div>
          <p class="tool-hero__eyebrow">Live Roleplay Console</p>
          <h3 id="activeScenarioLabel">Waiting for configuration</h3>
          <p id="activeScenarioMeta" class="console-meta">Configure the scenario to unlock the console.</p>
        </div>
        <div class="console-actions">
          <button type="button" class="button button--ghost" id="resetSimulationBtn" disabled>Reset</button>
          <button type="button" class="button button--primary" id="endSimulationBtn" disabled>End & Analyze</button>
        </div>
      </div>

      <div id="chatWindow" class="chat-window">
        <p class="chat-placeholder">Launch a simulation to begin the conversation.</p>
      </div>

      <div class="chat-input">
        <input type="text" id="simulatorMessage" placeholder="Type your response…" disabled>
        <button type="button" class="button button--primary" id="sendSimulatorMessage" disabled>Send</button>
      </div>

      <section class="analysis-panel result-block">
        <div class="analysis-header">
          <div>
            <p class="tool-hero__eyebrow">Post-Call Debrief</p>
            <h3>AI Coaching Breakdown</h3>
          </div>
          <div class="analysis-actions">
            <button type="button" class="button button--ghost" id="copyTranscriptBtn" disabled>Copy Transcript</button>
            <button type="button" class="button button--ghost" id="downloadTranscriptBtn" disabled>Download Transcript</button>
            <button type="button" class="button button--ghost" id="downloadAnalysisBtn" disabled>Download Analysis</button>
          </div>
        </div>
        <div id="analysisOutput" class="analysis-body">
          <p>End the simulation to generate a report scored across Ignis, Aqua, and Terra.</p>
        </div>
      </section>

      <section class="history-panel result-block">
        <div class="history-header">
          <div>
            <p class="tool-hero__eyebrow">Session History</p>
            <h3>Previous sparring logs</h3>
          </div>
          <button type="button" class="button button--ghost" id="clearHistoryBtn">Clear History</button>
        </div>
        <div id="sessionHistory" class="history-list">
          <p class="history-empty">Run your first simulation to track transcripts and reviews.</p>
        </div>
      </section>
    </section>
  </div>
</div>
