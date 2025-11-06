---
layout: layout.njk
title: The Alchemical Citadel
---

<div class="hero container">
  <h2>I Build 7-Day "Franchise-Ready" Blueprints</h2>
  <p>For independent Car Wash & Restaurant Owners. We transmute chaotic operations into a resilient, system-driven architecture.</p>
  <a href="/contact/" class="form-button" style="margin: 2rem auto 0 auto; display: block; max-width: 350px;">Schedule Your Free Consultation</a>
</div>

<section class="bifurcation-container container">
  <h2 class="bifurcation-title">Start the Great Work for Free</h2>
  <p class="bifurcation-subtitle">The first step to building your Citadel is a diagnosis. Get the universal key now.</p>

  <div class="bifurcation-grid" style="grid-template-columns: 1fr;">
    <a href="/business-audit/" class="bifurcation-button" style="background-color: var(--text-accent); color: var(--bg-secondary); border-color: var(--text-accent);">
      <span class="button-title">Get My Free 3-Day "Business Audit"</span>
      <span class="button-desc">The essential diagnostic that reveals your business's core operational fractures.</span>
    </a>
  </div>
</section>

<section class="bifurcation-container container" style="margin-top: 1rem; padding-top: 1.5rem; padding-bottom: 2rem; border-top: 1px solid var(--border-color);">
  <h2 class="bifurcation-title" style="margin-top: 0;">Or Choose Your Path</h2>

  {% comment %}
    THIS IS THE FIX:
    I've added the new "Explore the Codex" bubble inside your existing grid.
    I also suggested "grid-template-columns: repeat(3, 1fr)" to make all
    three buttons appear nicely in a single row.
  {% endcomment %}
.
  <div class="bifurcation-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <a href="/business/" class="bifurcation-button">
      <span class="button-title">Business Transformation</span>
      <span class="button-desc">Done-For-You Systems & Consulting</span>
    </a>
    <a href="/personal/" class="bifurcation-button">
      <span class="button-title">Personal Transformation</span>
      <span class="button-desc">DIY Workbooks & Foundational Courses</span>
    </a>
    
    {% comment %} This is the new bubble you wanted {% endcomment %}
    <a href="/codex/" class="bifurcation-button">
      <span class="button-title">Explore the Codex</span>
      <span class="button-desc">The Alchemical Blog & Philosophy</span>
    </a>
  </div>
</section>