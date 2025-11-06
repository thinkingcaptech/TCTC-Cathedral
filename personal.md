---
layout: layout.njk
title: Personal Transformation
---

<div class="hero container free-audit-hero">
  <h2 style="font-size: 3rem;">The "Transmutation" of Self</h2>
  <p style="font-size: 1.2rem; color: var(--text-primary);">This is the "Great Work" of "architecting" your "Inner Citadel." We will "transmute" the "Hollow Performer" into the "Alchemist."</p>
</div>

<div class="container">

  <div class="initiation-text">
    <h2 class="initiation-title">The Initiation: "Performer" vs. "Architect"</h2>
      <p>
        The <strong class="forge-strong">"Hollow Performer"</strong> is "fractured." They are polluted by "neediness" and the "static" of their "agenda." Their "influence" is a <em>performance</em>. They ask, "What do I say?"
      </p>
      <p>
        The <strong class="forge-strong">"Alchemist"</strong> (the "Architect") is "coherent." They "radiate" "physics." They understand that "true influence" is the result of an "Indifferent Mind." They ask, "What force am I invoking?"
      </d>
      <p>
        This is the "architecture" of "transmutation."
      </p>
  </div>

  <section id="courses" class="architect-chamber">
    <h2 style="text-align: center;">The "Alchemical" Tools</h2>

    <div class="product-grid" style="grid-template-columns: repeat(2, 1fr);">

      {% comment %} This is your WORKING 'courses' loop. This is correct. {% endcomment %}
      {% for course in courses %}
        <div class="product-card">
          <h3>{{ course.title }}</h3>
          <div class="product-price">
            {{ course.price }}
          </div>
          <p>{{ course.description }}</p>
          <a href="{{ course.url }}" class="buy-button">Learn More</a>
        </div>
      {% endfor %}

    </div>
  </section>

  <section id="codex-posts" class="architect-chamber">
    <h2 style="text-align: center;">From the "Codex"</h2>
    <p style="text-align: center; color: var(--text-secondary); margin-top: -1rem; margin-bottom: 2rem;">"The 'Codex' is the 'living system' of the 'Citadel.' This is where 'Initiates' come to 'architect' their 'resonance.'"</p>

    {% comment %} 
      THIS IS THE FIX:
      I am now using your 'product-grid' and 'product-card' classes,
      which we know work correctly from your "Alchemical Tools" section.
    {% endcomment %}
    {% if collections.post.length > 0 %}
      <div class="product-grid" style="grid-template-columns: repeat(2, 1fr);">

        {% for post in collections.post | reverse | limit: 3 %}
          <div class="product-card">
            {% comment %} This maps your blog post title to the card <h3> {% endcomment %}
            <h3>{{ post.data.title }}</h3>
            
            {% if post.data.excerpt %}
              {% comment %} This maps your blog post excerpt to the card <p> {% endcomment %}
              <p>{{ post.data.excerpt }}</p>
            {% endif %}
            
            {% comment %} This adds a "Read Post" button matching your other cards {% endcomment %}
            <a href="{{ post.url | url }}" class="buy-button">Read Post</a>
          </div>
        {% endfor %}

      </div>
      
      {% comment %} This is the "Explore Full Codex" button at the bottom {% endcomment %}
      <div style="text-align: center; margin-top: 2rem;">
        <a href="/codex/" class="buy-button" style="max-width: 400px; margin-left: auto; margin-right: auto;">Explore the Full "Codex"</a>
      </div>
    
    {% else %}
      <p class="no-posts-message">The Forge is being prepared. Articles on **Ignis, Aqua, Terra, and Aer** will be added soon.</p>
    {% endif %}
  </section>