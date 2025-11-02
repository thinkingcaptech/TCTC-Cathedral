---
layout: layout.njk
title: Personal Transformation
---

<div class="hero container">
  <h2>The "Transmutation" of Self</h2>
  <p>The "Great Work" is not just external; it is internal. Before you can "architect" the world, you must first forge your "Inner Vessel." This is the path of personal "alchemical" transmutation.</p>
</div>

<section id="courses" class="container">
  <h2>Personal Transformation</h2>

  <div class="product-grid">
    {%- for course in courses -%}
      <div class="product-card">
        <h3>{{ course.title }}</h3>
        <div class="product-price">{{ course.price }}</div>
        <p>{{ course.description }}</p>
        <a href="{{ course.url }}" class="buy-button">Learn More</a>
      </div>
    {%- endfor -%}
  </div>
</section>