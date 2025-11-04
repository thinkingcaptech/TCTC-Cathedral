---
layout: layout.njk
title: Business Transformation
---

<div class="hero container">
  <h2>The "Architecture" of Business</h2>
  <p>We apply "alchemical" principles to your professional "vessel." We do not offer tactics; we transmute your "Prima Materia" (your core business) into a "Citadel" that radiates coherence and authority.</p>
</div>

<section id="products" class="container">
  <h2>Professional Transformation</h2>

  <div class="product-grid">
    {%- for product in products -%}
      <div class="product-card">
        <h3>{{ product.title }}</h3>
        <div class="product-price">{{ product.price }}</div>
        <p>{{ product.description }}</p>
        <a href="{{ product.url }}" class="buy-button">Learn More</a>
      </div>
    {%- endfor -%}
  </div>
</section>

---

<section id="business-hook" class="container">
  <div class="cta-hook">
    <h3>The "Ignis Audit" is the First Step</h3>
    <p>All "Great Work" begins with a "diagnosis" of the "vessel." Before you can build a "Citadel," you must understand your "foundation." The 3-Day "Ignis" Audit is the "universal key" to this process.</p>
    <a href="/free-audit/" class="buy-button" style="max-width: 400px; margin-left: auto; margin-right: auto;">Begin the Free "Ignis" Audit</a>
  </div>
</section>