---
layout: layout.njk
title: Schedule Consultation
---

<div class="hero container">
  <h2>The "Alchemical Exchange"</h2>
  <p>The "Covenant" is ready to be sealed. Please provide your "conduit" (contact) and your preferred "moment of initiation" (time) to begin the "Great Work."</p>
</div>

<div class="container" style="max-width: 768px;">
  <div class="waitlist-form-container">
    <h3 class="form-title">Schedule Your "Transmutation"</h3>
    
    <form name="consultation-request" netlify data-netlify="true" action="{{ '/thank-you/' | url }}">
      
      <input type="hidden" id="service-name-input" name="service" value="Service Request">

      <div class="form-group">
        <label for="name">Name (The Architect)</label>
        <input type="text" id="name" name="name" class="form-input" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email (The Conduit)</label>
        <input type="email" id="email" name="email" class="form-input" required>
      </div>

      <div class="form-group">
        <label for="phone">Phone (Optional)</label>
        <input type="tel" id="phone" name="phone" class="form-input">
      </div>
      
      <div class="form-group">
        <label for="preferred-time">Preferred Date(s) and Time(s)</label>
        <textarea id="preferred-time" name="preferred-time" class="form-textarea" rows="3" placeholder="e.g., 'Mondays or Wednesdays after 3 PM EDT.'"></textarea>
      </div>
      
      <button type="submit" class="form-button">Submit Consultation Request</button>
    </form>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const input = document.getElementById('service-name-input');
    
    if (service && input) {
      // "Transmute" the URL (e.g., "service-spark") into a "pristine" name
      let serviceName = "Service Request";
      if (service === 'spark') {
        serviceName = "The Spark (Alchemical Analysis) - $500";
      } else if (service === 'blueprint') {
        serviceName = "The Blueprint (Guided Alchemy) - $10,000";
      }
      input.value = serviceName;
    }
  });
</script>
