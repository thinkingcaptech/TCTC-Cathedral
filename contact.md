---
layout: layout.njk
title: Initiate Contact
---

<div class="hero container">
  <h2>Initiate Contact</h2>
  <p>The "Great Work" often requires a direct exchange. For professional inquiries, speaking requests, or questions about the **Alchemical Exchange**, please use the conduit below.</p>
</div>

<div class="container" style="max-width: 600px;">
  <div class="waitlist-form-container">
    <h3 class="form-title">The "Conduit"</h3>
    
    <form name="general-contact" netlify data-netlify="true" action="/thank-you/">
      
      <input type="hidden" name="Form" value="General Contact Inquiry">

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" class="form-input" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" class="form-input" required>
      </div>

      <div class="form-group">
        <label for="message">Your Inquiry (The Prima Materia)</label>
        <textarea id="message" name="message" class="form-textarea" rows="4" placeholder="e.g., 'Inquiry about speaking fees,' or 'Question on the $10,000 Blueprint.'"></textarea>
      </div>
      
      <button type="submit" class="form-button">Send Message</button>
    </form>
  </div>
</div>