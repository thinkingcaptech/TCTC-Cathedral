---
layout: layout.njk
title: Initiate Contact
---

<div class="hero container">
  <h2>Initiate Contact</h2>
  <p>The "Great Work" often requires a direct exchange. For professional inquiries, speaking requests, or questions about the "Alchemical Exchange," please use the conduit below.</p>
</div>

<div class="container" style="max-width: 600px;">
  <div class="waitlist-form-container">
    <h3 class="form-title">The "Conduit"</h3>
    
    <form name="general-contact" netlify data-netlify="true" action="/thank-you/">
      
      <input type="hidden" name="Form" value="General Contact Inquiry">

      <div class="form-group">
        <label for="name">Name (The Architect)</label>
        <input type="text" id="name" name="name" class="form-input" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email (The Primary Conduit)</label>
        <input type="email" id="email" name="email" class="form-input" required>
      </div>

      <div class="form-group">
        <label for="phone">Phone (Mandatory for Professional Inquiry)</label>
        <input type="tel" id="phone" name="phone" class="form-input" required>
      </div>
      
      <div class="form-group">
        <label for="message">Your Inquiry (The Prima Materia)</label>
        <textarea id="message" name="message" class="form-textarea" rows="4" placeholder="e.g., 'Inquiry about the Blueprint System,' 'Speaking request,' etc." required></textarea>
      </div>
      
      <button type="submit" class="form-button">Submit Inquiry</button>
    </form>
  </div>
</div>

<section id="contact-hook" class="container">
  <div class="cta-hook">
    <h3>Begin Your "Transmutation"</h3>
    <p>If you are not ready for a professional inquiry, begin the "Great Work" with the "Ignis Audit." It is the "universal key" to "architecting" your "resonance."</l>
    <a href="/free-audit/" class="buy-button" style="max-width: 400px; margin-left: auto; margin-right: auto;">Begin the Free "Ignis" Audit</a>
  </div>
</section>