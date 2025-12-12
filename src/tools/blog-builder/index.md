toolStyles: "/css/tools/blog-builder.css"
toolJavascript: "/js/tools/blog-builder.js"
interfaceData:
  api-base: "https://local-keyword-blog-builder.web.app"
inlineInterface: true
---

The Local SEO Blog Builder lets you launch full content campaigns in one sitting. Feed it a list of cities, services, and keyword pillars; the workflow builds outlines, writes drafts, and batches exports so you can upload to any CMS without touching a spreadsheet.

### Highlights

- **Bulk generation** for 1-200 posts at a time with throttled queueing so you don’t hit rate limits.
- **Reusable templates** for intros, CTAs, and brand voice snippets that stay synced across every article.
- **Geo-personalization** that inserts neighborhood data, landmarks, and trust cues pulled from your prompts.
- **Instant exports** to Markdown, HTML, or CSV for downstream scheduling tools or agencies.

### Workflow

1. Add your service keywords, list of cities, and tone/voice preferences.
2. Pick the AI model you want (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro).
3. Generate structured outlines, approve them, then batch write the full posts.
4. Export, publish, and repeat whenever you need more topical depth.

The interface below mirrors the production build—paste in your template, list target cities, and press **Generate** to watch the localized drafts populate inside the new TCTC styling.

<div id="tool-interface" class="tool-interface blog-builder-app" data-api-base="{{ interfaceData['api-base'] }}">
  <div class="blog-builder-grid">
    <section class="builder-panel builder-panel--form">
      <div class="builder-actions">
        <span class="builder-chip">Templates</span>
        <span class="builder-chip">1–200 cities</span>
        <span class="builder-chip">ZIP &amp; WP XML</span>
      </div>

      <div class="builder-field">
        <label class="builder-label" for="templateSelect">Industry template</label>
        <select id="templateSelect" class="builder-select">
          <option value="">Choose a template...</option>
          <optgroup label="Home Services">
            <option value="plumber">Plumber SEO Article</option>
            <option value="roofer">Roofer SEO Article</option>
            <option value="electrician">Electrician SEO Article</option>
            <option value="hvac">HVAC SEO Article</option>
            <option value="locksmith">Locksmith SEO Article</option>
            <option value="landscaping">Landscaping SEO Article</option>
            <option value="cleaning">Cleaning Service SEO Article</option>
            <option value="pestcontrol">Pest Control SEO Article</option>
            <option value="poolservice">Pool Service SEO Article</option>
          </optgroup>
          <optgroup label="Automotive">
            <option value="autorepair">Auto Repair SEO Article</option>
            <option value="carwash">Car Wash SEO Article</option>
          </optgroup>
          <optgroup label="Healthcare &amp; Wellness">
            <option value="dentist">Dentist SEO Article</option>
            <option value="chiropractor">Chiropractor SEO Article</option>
            <option value="veterinarian">Veterinarian SEO Article</option>
            <option value="massage">Massage Therapy SEO Article</option>
          </optgroup>
          <optgroup label="Professional Services">
            <option value="lawyer">Lawyer SEO Article</option>
            <option value="attorney">Criminal Defense Attorney SEO Article</option>
            <option value="accountant">Accountant SEO Article</option>
            <option value="insurance">Insurance Agency SEO Article</option>
            <option value="inspector">Home Inspector SEO Article</option>
            <option value="realestate">Real Estate SEO Article</option>
          </optgroup>
          <optgroup label="Personal Services">
            <option value="trainer">Personal Trainer SEO Article</option>
            <option value="photographer">Wedding Photographer SEO Article</option>
            <option value="salon">Hair Salon SEO Article</option>
            <option value="florist">Florist SEO Article</option>
          </optgroup>
          <optgroup label="Businesses">
            <option value="restaurant">Restaurant SEO Article</option>
            <option value="gym">Gym &amp; Fitness Center SEO Article</option>
            <option value="daycare">Daycare SEO Article</option>
            <option value="tutoring">Tutoring Service SEO Article</option>
            <option value="moving">Moving Company SEO Article</option>
          </optgroup>
          <optgroup label="Custom Templates" id="customTemplatesGroup" style="display:none;"></optgroup>
        </select>
        <div class="builder-template-actions">
          <button id="saveTemplateBtn" type="button" class="builder-button builder-button--ghost">Save Template</button>
          <button id="manageTemplatesBtn" type="button" class="builder-button builder-button--ghost">Manage Templates</button>
        </div>
      </div>

      <div class="builder-field">
        <label class="builder-label" for="baseArticle">Base article template</label>
        <textarea id="baseArticle" class="builder-textarea" placeholder="Write or paste a generic article using placeholders like [CITY] and [SERVICE]."></textarea>
      </div>

      <div class="builder-field">
        <label class="builder-label" for="cities">Target locations (one per line)</label>
        <textarea id="cities" class="builder-textarea" rows="6">Dallas, TX
Austin, TX
Houston, TX</textarea>
      </div>

      <div class="builder-field" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;">
        <div>
          <label class="builder-label" for="tone">Tone</label>
          <select id="tone" class="builder-select">
            <option value="neutral">Neutral</option>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>
        <div>
          <label class="builder-label" for="length">Length</label>
          <select id="length" class="builder-select">
            <option value="short">Short</option>
            <option value="medium" selected>Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
      </div>

      <button id="generateBtn" type="button" class="builder-button builder-button--primary">Generate Localized Posts</button>
      <p id="status" class="builder-status"></p>
    </section>

    <section class="builder-panel builder-panel--results">
      <div class="builder-results-wrapper">
        <div id="resultsContainer" class="builder-results">
          <p class="builder-status">Generated posts will appear here.</p>
        </div>
        <div class="builder-export-grid">
          <button id="downloadZipBtn" type="button" class="builder-button builder-button--ghost" disabled>Download ZIP</button>
          <button id="exportWPBtn" type="button" class="builder-button builder-button--ghost" disabled>Export WP XML</button>
          <button id="copyAllBtn" type="button" class="builder-button builder-button--ghost" disabled>Copy All</button>
        </div>
      </div>
    </section>
  </div>
</div>
