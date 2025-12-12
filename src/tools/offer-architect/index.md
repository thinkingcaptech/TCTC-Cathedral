---
toolStyles: "/css/tools/offer-architect.css"
toolJavascript: "/js/tools/offer-architect.js"
inlineInterface: true
---

You don't need another vague worksheet to define your offer. The Offer Architect distills customer research, fulfillment details, and monetization levers into a tight pitch deck you can hand to your team within minutes.

### What it handles

- **Positioning & promise** — clarify the audience, bleeding-neck pains, and the single compelling outcome you deliver.
- **Value stack** — translate fulfillment pieces into tangible assets with price anchoring, delivery notes, and success metrics.
- **Launch plan** — generate go-to-market plays, nurture sequences, and success metrics mapped to the next 30 days.
- **Exports & history** — keep every blueprint locally, copy Markdown, or download JSON for Notion, ClickUp, or your CRM.

### Workflow

1. Connect your preferred model (GPT-4o, Claude Sonnet 4.5, Gemini 2.5 Flash, or Grok 4 Fast) with your own key.
2. Fill in the inputs: customer profile, pains, promise, deliverables, pricing, bonuses, and proof.
3. Hit **Generate Blueprint** and let the AI reorganize it into a narrative, value stack, and launch actions.
4. Export the output or send the CTA to TCTC when you want the production build.

<div id="tool-interface" class="tool-interface offer-architect-app">
  <div class="architect-grid">
    <section class="architect-panel">
      <section class="byok-panel">
        <p class="tool-hero__eyebrow">Bring Your Own Keys</p>
        <h3>Connect your preferred AI provider</h3>
        <p>Your key stays in this browser. Use mid-range text models for blazing-fast blueprints.</p>
        <div class="byok-row">
          <div class="byok-field">
            <label for="offerProvider">Provider</label>
            <select id="offerProvider">
              <option value="gemini">Google Gemini</option>
              <option value="openai">OpenAI GPT</option>
              <option value="anthropic">Anthropic Claude</option>
              <option value="grok">xAI Grok</option>
            </select>
          </div>
          <div class="byok-field">
            <label for="offerModel">Model (optional)</label>
            <input id="offerModel" type="text" placeholder="Auto-selects best model" list="offerModelOptions">
          </div>
        </div>
        <datalist id="offerModelOptions">
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
          <label for="offerApiKey">API Key</label>
          <input id="offerApiKey" type="password" placeholder="Paste your key here">
        </div>
        <div class="byok-actions">
          <button type="button" class="button button--primary" id="offerSaveKeyBtn">Save Key</button>
          <button type="button" class="button button--ghost" id="offerTestKeyBtn">Test Key</button>
          <button type="button" class="button button--ghost" id="offerClearKeyBtn">Clear</button>
        </div>
        <p id="offerKeyStatus" class="byok-status"></p>
      </section>

      <section class="offer-form">
        <div class="offer-form__header">
          <p class="tool-hero__eyebrow">Blueprint Intake</p>
          <h3>Define the building blocks</h3>
          <p>Every answer sharpens the positioning. Nothing is saved anywhere except your browser.</p>
        </div>
        <form id="offerForm">
          <div class="offer-form__grid">
            <label>
              <span>Offer Name</span>
              <input id="offerName" type="text" placeholder="RevOps Command Center" required>
            </label>
            <label>
              <span>Primary Persona</span>
              <input id="offerAudience" type="text" placeholder="Series A SaaS Ops leader" required>
            </label>
            <label>
              <span>Sales Motion</span>
              <select id="offerMotion">
                <option value="consultative">Consultative / high-touch</option>
                <option value="productized">Productized package</option>
                <option value="cohort">Cohort / group program</option>
                <option value="self-serve">Self-serve SaaS</option>
              </select>
            </label>
            <label>
              <span>Fulfillment Style</span>
              <select id="offerFulfillment">
                <option value="done-for-you" selected>Done-for-you</option>
                <option value="done-with-you">Done-with-you</option>
                <option value="advisory">Advisory / coaching</option>
                <option value="hybrid">Hybrid / portal + sprints</option>
              </select>
            </label>
          </div>
          <label>
            <span>Audience pains & context</span>
            <textarea id="offerPain" rows="3" placeholder="What makes buyers lose sleep? Include stats, anecdotes, current solutions."></textarea>
          </label>
          <label>
            <span>Desired promise / transformation</span>
            <textarea id="offerPromise" rows="3" placeholder="What outcome do you want to guarantee?"></textarea>
          </label>
          <label>
            <span>Methodology or unfair advantage</span>
            <textarea id="offerMechanism" rows="3" placeholder="Frameworks, IP, tech, team, or systems that make this unique."></textarea>
          </label>
          <label>
            <span>Core deliverables & milestones</span>
            <textarea id="offerDeliverables" rows="4" placeholder="Kickoff workshop, dashboards, CRM rebuild, paid traffic buildout, etc."></textarea>
          </label>
          <label>
            <span>Proof & assets</span>
            <textarea id="offerProof" rows="3" placeholder="Case studies, testimonials, numbers, screenshots."></textarea>
          </label>
          <div class="offer-form__grid">
            <label>
              <span>Pricing & terms</span>
              <input id="offerPrice" type="text" placeholder="$12k upfront + $3k/mo retainer">
            </label>
            <label>
              <span>Guarantee / risk reversal</span>
              <input id="offerGuarantee" type="text" placeholder="90-day KPI guarantee or extra implementation.">
            </label>
          </div>
          <label>
            <span>Bonuses or accelerators</span>
            <textarea id="offerBonuses" rows="2" placeholder="Playbooks, templates, community, implementation sprints."></textarea>
          </label>
          <label>
            <span>Scarcity / urgency lever</span>
            <input id="offerUrgency" type="text" placeholder="Only 4 builds per quarter to maintain quality.">
          </label>
          <div class="offer-form__actions">
            <button type="submit" class="button button--primary" id="offerGenerateBtn">Generate Blueprint</button>
          </div>
        </form>
        <p id="offerToast" class="offer-toast" role="status" aria-live="polite"></p>
      </section>
    </section>

    <section class="architect-panel architect-panel--results">
      <section class="offer-snapshot result-block">
        <p class="tool-hero__eyebrow">Offer Snapshot</p>
        <h3 id="offerSnapshotTitle">Waiting for inputs</h3>
        <div id="offerSnapshot" class="snapshot-grid">
          <p>Fill in the intake and generate a blueprint to populate positioning, promise, and price clarity.</p>
        </div>
      </section>

      <section class="offer-stack result-block">
        <div class="result-header">
          <div>
            <p class="tool-hero__eyebrow">Value Stack</p>
            <h3>Deliverables + leverage</h3>
          </div>
          <div class="result-actions">
            <button type="button" class="button button--ghost" id="copyOfferBtn" disabled>Copy Markdown</button>
            <button type="button" class="button button--ghost" id="downloadOfferBtn" disabled>Download Markdown</button>
            <button type="button" class="button button--ghost" id="downloadOfferJsonBtn" disabled>Download JSON</button>
          </div>
        </div>
        <div id="offerValueStack" class="stack-grid">
          <p class="result-placeholder">Blueprint deliverables render here.</p>
        </div>
      </section>

      <section class="offer-program result-block">
        <div class="result-header">
          <div>
            <p class="tool-hero__eyebrow">Fulfillment Engine</p>
            <h3>12-week delivery program</h3>
            <p class="result-meta">Automatically sequenced milestones for the team executing the offer.</p>
          </div>
          <div class="result-actions">
            <button type="button" class="button button--ghost" id="copyProgramBtn" disabled>Copy Plan</button>
          </div>
        </div>
        <div id="offerProgramBody" class="program-body">
          <p class="result-placeholder">Generate the blueprint to unlock the 12-week execution roadmap.</p>
        </div>
      </section>

      <section class="offer-launch result-block">
        <p class="tool-hero__eyebrow">GTM Roadmap</p>
        <h3>Campaigns, enablement, and metrics</h3>
        <div id="offerLaunchPlan" class="launch-grid">
          <p class="result-placeholder">Generate an offer to unlock the launch plan.</p>
        </div>
      </section>

      <section class="offer-comms result-block">
        <div class="result-header">
          <div>
            <p class="tool-hero__eyebrow">Market Signals</p>
            <h3>Comms + creative prompts</h3>
            <p class="result-meta">LinkedIn drop, nurture email, and a hero visual cue—each referencing the approved blueprint.</p>
          </div>
          <div class="result-actions">
            <button type="button" class="button button--ghost" id="copyCommsBtn" disabled>Copy Assets</button>
          </div>
        </div>
        <div id="offerCommsBody" class="comms-body">
          <p class="result-placeholder">Once the 12-week plan renders, the messaging pack will compile here.</p>
        </div>
      </section>

      <section class="offer-history result-block">
        <div class="history-header">
          <div>
            <p class="tool-hero__eyebrow">Blueprint History</p>
            <h3>Load previous versions</h3>
          </div>
          <button type="button" class="button button--ghost" id="offerClearHistoryBtn">Clear History</button>
        </div>
        <div id="offerHistory" class="history-list">
          <p class="history-empty">Run your first blueprint to save it locally.</p>
        </div>
      </section>

      <section class="offer-cta result-block">
        <p class="tool-hero__eyebrow">Custom Implementation</p>
        <h3>Want TCTC to build the full system?</h3>
        <p>Get a private dashboard, automations, and sales collateral built from this blueprint.</p>
        <a class="button button--primary" href="/contact/?utm_source=offer-architect&utm_medium=cta">Hire TCTC →</a>
      </section>
    </section>
  </div>
</div>
