---
layout: layout.njk
title: The Codex
---

<div class="container">
  <h1>The Codex</h1>
  <p>An archive of thoughts and explorations.</p>

  <hr>

  <h2 style="margin-top: 2rem;">All Posts</h2>

  {% comment %}
    This uses your "product-grid" classes to create the "bubble" card
    style for every post in your collection.
  {% endcomment %}
  
  <div class="product-grid" style="grid-template-columns: repeat(2, 1fr);">

    {% for post in collections.post | reverse %}
      <div class="product-card">
        <h3>{{ post.data.title }}</h3>
        
        {% if post.data.excerpt %}
          <p>{{ post.data.excerpt }}</p>
        {% endif %}
        
        <a href="{{ post.url | url }}" class="buy-button">Read Post</a>
      </div>
    {% endfor %}

  </div>
</div>