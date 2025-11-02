---
layout: layout.njk
title: The Codex
pagination:
  data: collections.posts
  size: 5
  alias: posts
---

<div class="hero container">
  <h2>The Alchemist's Codex</h2>
  <p>The "Great Work" is built on principles, not tactics. This is the **Codex**—the library of **Ignis, Aqua, Terra, and Aer**—forged to transmute your perspective.</p>
</div>

<section class="container" id="codex-posts">
  <h2>Latest Transmutations</h2>
  
  {% if pagination.items.length > 0 %}
    <div class="post-list">
      
      {% for post in pagination.items %}
        <a href="{{ post.url }}" class="post-card">
          <h3 class="post-title">{{ post.data.title }}</h3>
          <p class="post-excerpt">{{ post.data.excerpt }}</p>
          </a>
      {% endfor %}

    </div>
  {% else %}
    <p class="no-posts-message">The Forge is being prepared. Articles on **Ignis, Aqua, Terra, and Aer** will be added soon.</p>
  {% endif %}
</section>