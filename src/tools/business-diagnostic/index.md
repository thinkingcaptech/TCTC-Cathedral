---
toolStyles: "/css/tools/business-diagnostic.css"
toolJavascript: "/js/tools/business-diagnostic.js"
inlineInterface: true
---

The AI Business Diagnostic walks you through a fast, structured intake so you can benchmark your company without hiring a consultant. Feed it the specifics of your offer, team, pipeline, and runway, then let the multi-model AI stack highlight bottlenecks across five pillars: Operations, Marketing, Sales, Team, and Finance.

### What makes it different

- **Bring your own API keys** for OpenAI, Anthropic, Gemini, or Grok. The diagnostic runs completely in your browser and stores keys in `localStorage`.
- **Wizard-style workflow** with autosave, progress tracker, and editable answers. Pause halfway through and pick back up later.
- **Scored report** generated in seconds. See radar charts, weighted scores, and prioritized recommendations for the next 90 days.
- **Shareable output** with Markdown and PDF export so you can update investors, leadership teams, or mastermind groups.

### Ideal scenarios

1. Quarterly planning or off-sites when you need an honest look at the business.
2. Founder / operator catch-ups to align the team on a single source of truth.
3. Pre-engagement audits for agencies and consultants who want to show value fast.

### How to use

1. Connect your preferred model (GPT-4o, Claude 3.5, Gemini 1.5, or Grok 2) with your own API key.
2. Work through the four-step intake covering operations, marketing, sales, and finances.
3. Press “Generate Report” and let the tool produce scores, red/yellow/green flags, and recommended playbooks.
4. Export the results, share them with stakeholders, or jump into a custom engagement with TCTC.

Below is the production interface—configure your API key, work through the questionnaire, and the right column will populate with scores plus AI-authored recommendations in seconds.

<div id="tool-interface" class="tool-interface diagnostic-app">
  <div class="diagnostic-grid">
    <div class="diagnostic-panel">
      <section class="byok-panel">
        <div>
          <p class="tool-hero__eyebrow">Bring Your Own Keys</p>
          <h3>Connect your preferred AI provider</h3>
          <p>Your key only lives in this browser. Use Gemini, GPT-4o, Claude, or Grok.</p>
        </div>
        <div class="byok-row">
          <div class="byok-field">
            <label for="diagnosticProvider">Provider</label>
            <select id="diagnosticProvider">
              <option value="gemini">Google Gemini</option>
              <option value="openai">OpenAI GPT</option>
              <option value="anthropic">Anthropic Claude</option>
              <option value="grok">xAI Grok</option>
            </select>
          </div>
          <div class="byok-field">
            <label for="diagnosticModel">Model (optional)</label>
            <input id="diagnosticModel" type="text" placeholder="Auto-selects best model" list="diagnosticModelOptions">
          </div>
        </div>
        <datalist id="diagnosticModelOptions">
          <!-- Google Gemini (text-focused, mid-range) -->
          <option value="gemini-2.5-pro"></option>
          <option value="gemini-2.5-flash"></option>
          <option value="gemini-2.5-flash-lite"></option>
          <!-- OpenAI -->
          <option value="gpt-5-mini"></option>
          <option value="gpt-4o"></option>
          <option value="gpt-4o-mini"></option>
          <option value="o3-mini"></option>
          <!-- Anthropic -->
          <option value="claude-sonnet-4.5"></option>
          <option value="claude-haiku-4.5"></option>
          <!-- xAI -->
          <option value="grok-4-fast"></option>
          <option value="grok-3-mini"></option>
          <option value="grok-code-fast-1"></option>
        </datalist>
        <div class="byok-field">
          <label for="diagnosticApiKey">API Key</label>
          <input id="diagnosticApiKey" type="password" placeholder="Paste your key here">
        </div>
        <div class="byok-actions">
          <button type="button" class="button button--primary" id="saveKeyBtn">Save Key</button>
          <button type="button" class="button button--ghost" id="testKeyBtn">Test Key</button>
          <button type="button" class="button button--ghost" id="clearKeyBtn">Clear</button>
        </div>
        <p id="keyStatus" class="byok-status"></p>
      </section>

      <section class="quiz-shell">
        <div class="progress">
          <h1>Business Health Questionnaire</h1>
          <div class="progress-bar">
            <div class="progress-bar__fill" id="progressFill"></div>
          </div>
          <ul class="progress-steps" id="progressSteps">
            <li class="active">Management & Operations</li>
            <li>Marketing & Lead Generation</li>
            <li>Sales & Conversion</li>
            <li>Finances & Scalability</li>
          </ul>
        </div>

        <form id="diagnosticForm" novalidate>
          <fieldset class="form-step active-step" data-step="0">
            <legend>Management & Operations</legend>
            <p class="step-intro">Assess how mature your systems, cadences, and leadership rhythms are.</p>
            <label class="question">
              <span>How mature are your documented processes?</span>
              <select name="management_process_maturity" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Fully documented and audited quarterly</option>
                <option value="4">Documented for most core workflows</option>
                <option value="3">Documented for a few key processes</option>
                <option value="2">Informal checklists live across tools</option>
                <option value="1">Nothing is documented</option>
              </select>
            </label>
            <label class="question">
              <span>How aligned and empowered is your leadership team?</span>
              <select name="management_team_alignment" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Roles, KPIs, and cadences are crystal clear</option>
                <option value="4">Mostly aligned but a few gaps remain</option>
                <option value="3">Mixed clarity and accountability</option>
                <option value="2">Frequent misalignment or conflict</option>
                <option value="1">No consistent leadership rhythm</option>
              </select>
            </label>
            <label class="question">
              <span>How frequently do you review KPIs and operating dashboards?</span>
              <select name="management_kpi_cadence" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Weekly leadership scorecard reviews</option>
                <option value="4">Bi-weekly cadence</option>
                <option value="3">Monthly at best</option>
                <option value="2">Quarterly or ad hoc</option>
                <option value="1">No centralized visibility</option>
              </select>
            </label>
            <label class="question optional">
              <span>Anything else we should know about your operations?</span>
              <textarea name="management_notes" rows="3" placeholder="Optional context"></textarea>
            </label>
            <div class="step-actions">
              <button type="button" class="button button--primary next-btn">Next</button>
            </div>
          </fieldset>

          <fieldset class="form-step" data-step="1">
            <legend>Marketing & Lead Generation</legend>
            <p class="step-intro">Reveal how predictably your demand engine attracts qualified leads.</p>
            <label class="question">
              <span>How confident are you in your lead volume month over month?</span>
              <select name="marketing_lead_volume" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Pipeline consistently exceeds goals</option>
                <option value="4">Steady flow that usually meets targets</option>
                <option value="3">Unpredictable surges and dips</option>
                <option value="2">Chronic shortage of leads</option>
                <option value="1">No reliable volume data</option>
              </select>
            </label>
            <label class="question">
              <span>How diversified are your acquisition channels?</span>
              <select name="marketing_channel_mix" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">3+ high-performing channels</option>
                <option value="4">Two strong channels</option>
                <option value="3">One dependable channel</option>
                <option value="2">One experimental or inconsistent channel</option>
                <option value="1">No defined channels</option>
              </select>
            </label>
            <label class="question">
              <span>How efficiently do you measure marketing ROI?</span>
              <select name="marketing_roi_tracking" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Real-time dashboards with CAC/LTV tracking</option>
                <option value="4">Monthly reports with solid attribution</option>
                <option value="3">Basic tracking in spreadsheets</option>
                <option value="2">Gut feel with sparse data</option>
                <option value="1">No measurement system</option>
              </select>
            </label>
            <label class="question optional">
              <span>Share context about your current marketing campaigns.</span>
              <textarea name="marketing_notes" rows="3" placeholder="Optional context"></textarea>
            </label>
            <div class="step-actions">
              <button type="button" class="button button--ghost prev-btn">Previous</button>
              <button type="button" class="button button--primary next-btn">Next</button>
            </div>
          </fieldset>

          <fieldset class="form-step" data-step="2">
            <legend>Sales & Conversion</legend>
            <p class="step-intro">Evaluate how well your team converts qualified demand into revenue.</p>
            <label class="question">
              <span>How disciplined is your sales pipeline management?</span>
              <select name="sales_pipeline_rigor" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Stages, probabilities, and SLAs are enforced</option>
                <option value="4">Pipeline updates weekly</option>
                <option value="3">Pipeline reviewed monthly</option>
                <option value="2">Pipeline is outdated</option>
                <option value="1">No shared pipeline</option>
              </select>
            </label>
            <label class="question">
              <span>How strong is your conversion enablement?</span>
              <select name="sales_enablement_strength" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Battle-tested playbooks and assets</option>
                <option value="4">Core assets exist but need polish</option>
                <option value="3">Partial assets for a few stages</option>
                <option value="2">Basic pitch decks only</option>
                <option value="1">Nothing standardized</option>
              </select>
            </label>
            <label class="question">
              <span>What's your close rate on qualified opportunities?</span>
              <select name="sales_close_rate" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Above 40%</option>
                <option value="4">30-40%</option>
                <option value="3">20-30%</option>
                <option value="2">10-20%</option>
                <option value="1">Below 10% or unknown</option>
              </select>
            </label>
            <label class="question optional">
              <span>Where do most deals stall today?</span>
              <textarea name="sales_notes" rows="3" placeholder="Optional context"></textarea>
            </label>
            <div class="step-actions">
              <button type="button" class="button button--ghost prev-btn">Previous</button>
              <button type="button" class="button button--primary next-btn">Next</button>
            </div>
          </fieldset>

          <fieldset class="form-step" data-step="3">
            <legend>Finances & Scalability</legend>
            <p class="step-intro">Understand how resilient your economics are as you scale.</p>
            <label class="question">
              <span>How predictable is your cash flow?</span>
              <select name="finances_cashflow_visibility" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">13-week rolling forecasts locked in</option>
                <option value="4">Monthly cash planning</option>
                <option value="3">Quarterly look-backs only</option>
                <option value="2">Occasional fire drills</option>
                <option value="1">No cash visibility</option>
              </select>
            </label>
            <label class="question">
              <span>What describes your margin health?</span>
              <select name="finances_margin_health" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Margins exceed industry benchmarks</option>
                <option value="4">Healthy but could improve</option>
                <option value="3">Average margins under watch</option>
                <option value="2">Margin pressure threatens growth</option>
                <option value="1">Margins unclear or negative</option>
              </select>
            </label>
            <label class="question">
              <span>How scalable are your systems for the next revenue milestone?</span>
              <select name="finances_scaling_readiness" required>
                <option value="" disabled selected>Select one</option>
                <option value="5">Next 2 growth stages are modeled</option>
                <option value="4">Systems ready for the next stage</option>
                <option value="3">Some upgrades needed</option>
                <option value="2">Big investments required</option>
                <option value="1">No plan for scale</option>
              </select>
            </label>
            <label class="question optional">
              <span>Describe your growth targets for the next 12 months.</span>
              <textarea name="finances_notes" rows="3" placeholder="Optional context"></textarea>
            </label>
            <div class="step-actions">
              <button type="button" class="button button--ghost prev-btn">Previous</button>
              <button type="submit" class="button button--primary">Generate My Report</button>
            </div>
          </fieldset>
        </form>
        <div id="formToast" class="diagnostic-toast" role="status" aria-live="polite"></div>
      </section>
    </div>

    <div class="diagnostic-panel diagnostic-panel--results">
      <section class="score-card result-block">
        <p class="tool-hero__eyebrow">Business Health Diagnostic</p>
        <h1 id="scoreValue">--</h1>
        <p class="score-narrative" id="scoreNarrative">Complete the diagnostic to unlock your report.</p>
        <p class="score-id">Report ID: <span id="reportIdLabel">--</span></p>

        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(148, 163, 184, 0.2);">
          <h2 style="margin-bottom: 1.5rem;">Pillar Breakdown</h2>
          <div class="breakdown-grid" id="breakdownGrid"></div>
        </div>
      </section>

      <section class="ai-report result-block">
          <div class="ai-report__header">
            <h2>AI-Powered Recommendations</h2>
            <p>The AI consultant analyzes your answers and surfaces the highest-leverage moves.</p>
          </div>
          <div id="aiRecommendations" class="ai-report__body loading">
            <p>Complete the diagnostic to generate your action plan.</p>
          </div>
      </section>

      <section class="diagnostic-actions result-block">
          <p class="tool-hero__eyebrow">Export</p>
          <h3>Save or share your report</h3>
          <div class="diagnostic-export-grid">
            <button type="button" class="button button--primary" id="copyReportBtn" disabled>Copy Markdown</button>
            <button type="button" class="button button--ghost" id="downloadMdBtn" disabled>Download Markdown</button>
            <button type="button" class="button button--ghost" id="downloadJsonBtn" disabled>Download JSON</button>
          </div>
      </section>

      <section class="diagnostic-history result-block">
          <p class="tool-hero__eyebrow">Recent Reports</p>
          <h3>View previous diagnostics</h3>
          <div id="reportHistory" class="history-list">
            <p class="history-empty">Run your first diagnostic to see a timeline of reports here.</p>
          </div>
      </section>

      <section class="diagnostic-cta result-block" id="diagnosticCta">
        <p class="tool-hero__eyebrow">Custom Implementation</p>
        <h3>Need help executing the roadmap?</h3>
        <p>Book TCTC to build your internal dashboards, automations, or offer-specific diagnostics.</p>
        <a class="button button--primary" href="/custom-development/?utm_source=diagnostic&utm_medium=cta">Discuss a custom build →</a>
      </section>
    </div>
  </div>
</div>
