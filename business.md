---
layout: layout.njk
title: Business Transformation
---

<div class="hero container">
  <h2>The "Architecture" of Business</h2>
  <p>We apply "alchemical" principles to your professional "vessel." We do not offer tactics; we transmute your "Prima Materia" (your core business) into a **Citadel** that radiates coherence and authority.</p>
</div>

<section id="products" class="container">
  <h2>Professional Transformation</h2>

  <div class="product-grid" style="grid-template-columns: 1fr;">
    
    {% for product in products %}
      <div class="product-card" style="margin: 0 auto;">
        <h3>{{ product.title }}</h3>
        <div class="product-price">
          <span class="slashed-price">{{ product.price_anchor }}</span>
          {{ product.price_actual }}
        </div>
        <p>{{ product.description }}</p>
        <a href="{{ product.url }}" class="buy-button">Learn More</a>
      </div>
    {% endfor %}

  </div>
</section>

---

<section id="business-hook" class="container">
  <div class="cta-hook">
    <h3>The "Ignis Audit" is the First Step</h3>
    <p>All "Great Work" begins with a "diagnosis" of the "vessel." The 3-Day "Ignis" Audit (for Business) is the "universal key" to this process.</p>
    <a href="/business-audit/" class="buy-button" style="max-width: 400px; margin-left: auto; margin-right: auto;">Begin the Free "Business Audit"</a>
  </div>
</section>