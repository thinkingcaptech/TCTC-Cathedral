---
layout: layout.njk
title: The Codex
---

{% comment %} This container div will make the layout match your other pages {% endcomment %}
<div class="class-container">
  <h1>The Codex</h1>
  <p>An archive of thoughts and explorations.</p>

  <hr>

  <h2>All Posts</h2>

  {% comment %} 
    This is the corrected Liquid loop.
    - "collections.post | reverse" sorts newest-to-oldest.
  {% endcomment %}
  <ul>
    {%- for post in collections.post | reverse -%}
      <li>
        <a href="{{ post.url | url }}">
          <strong>{{ post.data.title }}</strong>
        </a>
        - 
        <time datetime="{{ post.date | date: '%Y-%m-%d' }}">
          {{ post.date | date: "%B %d, %Y" }}
        </time>
      </li>
    {%- endfor -%}
  </ul>

</div>