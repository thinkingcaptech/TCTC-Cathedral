---
layout: layout.njk
title: The Covenant of Construction
---

<div class="container" style="padding-top: 2rem; padding-bottom: 4rem; max-width: 800px; text-align: center;">

  <h2 class="bifurcation-title" style="margin-bottom: 1rem;">Begin the Great Work: Book Your $499 Blueprint</h2>
  <p class="bifurcation-subtitle" style="margin-bottom: 2.5rem;">Initiate the Covenant of Construction</p>

  <p style="margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">You have completed the <strong>`AQUA` (Diagnostic)</strong> stage. You have used the solvent of Curiosity to find the fractures in your architecture.</p>
  
  <p style="margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">The next step is <strong>`TERRA` (Earth)</strong>. To co-create your $499 Diagnostic Blueprint, please provide your findings. This is not a simple form; it is the first act of construction.</p>

    <form 
  	name="covenant-form"
  	method="POST" 
  	data-netlify="true"
  	action="/thank-you/"
  	style="max-width: 600px; margin: 0 auto; text-align: left;"
  >
  
  	  	<input type="hidden" name="form-name" value="covenant-form" />

  	  	<div style="margin-bottom: 1.5rem;">
  	 	<label for="name" style="display: block; margin-bottom: 0.5rem; font-family: 'Lato', sans-serif; font-weight: 600;">Your Name</label>
  	 	<input 
  	 	 	type="text" 
  	 	 	id="name" 
  	 	 	name="name" 
  	 	 	placeholder="e.g., Will Johnson" 
  	 	 	required
  	 	 	style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); background-color: #fff; border-radius: 8px; font-family: 'Lato', sans-serif;"
  	 	>
  	</div>

  	  	<div style="margin-bottom: 1.5rem;">
  	 	<label for="email" style="display: block; margin-bottom: 0.5rem; font-family: 'Lato', sans-serif; font-weight: 600;">Your Email Address</label>
  	 	<input 
  	 	 	type="email" 
  	 	 	id="email" 
  	 	 	name="email" 
  	 	 	placeholder="you@yourcompany.com" 
  	 	 	required
  	 	 	style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); background-color: #fff; border-radius: 8px; font-family: 'Lato', sans-serif;"
  	 	>
  	</div>

  	  	<div style="margin-bottom: 1.5rem;">
  	 	<label for="phone" style="display: block; margin-bottom: 0.5rem; font-family: 'Lato', sans-serif; font-weight: 600;">Phone Number (Optional)</label>
  	 	<input 
  	 	 	type="tel" 
  	 	 	id="phone" 
  	 	 	name="phone" 
  	 	 	placeholder="(555) 123-4567"
  	 	 	style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); background-color: #fff; border-radius: 8px; font-family: 'Lato', sans-serif;"
  	 	>
  	</div>

  	  	<div style="margin-bottom: 2rem;">
  	 	<label for="audit_results" style="display: block; margin-bottom: 0.5rem; font-family: 'Lato', sans-serif; font-weight: 600;">Your 5-Point Audit Findings</label>
  	 	<textarea 
  	 	 	id="audit_results" 
  	 	 	name="audit_findings" 
  	 	 	rows="10" 
  	 	 	required
  	 	 	placeholder="Share the fractures you uncovered. For example:1. IGNIS (Signal): My team's messaging is confused.2. AQUA (Story): My website makes *me* the hero, not the customer.3. TERRA (Repetition): We have no defined sales process.4. AER (Atmosphere): Our internal language is full of blame.5. PORTA DOLORIS (Gravity): The true cost is [My emotional/financial truth]..."
  	 	 	style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); background-color: #fff; border-radius: 8px; font-family: 'Lato', sans-serif; line-height: 1.6;"
  	 	></textarea>
  	</div>
  	
  	<button 
  	 	type="submit" 
  	 	class="form-button" 
  	 	style="width: 100%;"
  	>
  	 	Submit Findings & Initiate the Covenant
  	</button>
  </form>

</div>