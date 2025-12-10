---
layout: layout.njk
title: Free 5-Point Business Audit
---

<section class="container" style="padding: 3rem 1rem; max-width: 880px; margin: 0 auto; text-align: center; color: #F8FAFC; background: #0F172A;">
  <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.85rem; color: #94A3B8;">Free Diagnostic</p>
  <h1 style="font-size: 2.6rem; margin-bottom: 0.75rem;">Get Your 5-Point Business Audit</h1>
  <p style="color: #CBD5F5; line-height: 1.7;">
    A fast, objective review of your marketing, sales, and delivery systems. Use it to identify the
    bottlenecks stealing time and money before investing in paid consulting.
  </p>
</section>

<section class="container" style="padding: 3rem 1rem; max-width: 900px; margin: 0 auto;">
  <div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
    <article style="background: #1E293B; border: 1px solid #334155; border-radius: 16px; padding: 1.5rem; color: #E2E8F0;">
      <h3 style="color: #F8FAFC;">What We Review</h3>
      <ul style="padding-left: 1.2rem; line-height: 1.7; color: #CBD5F5;">
        <li>Website clarity & positioning</li>
        <li>Offer structure and pricing</li>
        <li>Lead flow & follow-up rhythm</li>
        <li>Delivery workflows and handoffs</li>
        <li>Team communication & accountability</li>
      </ul>
    </article>
    <article style="background: #1E293B; border: 1px solid #334155; border-radius: 16px; padding: 1.5rem; color: #E2E8F0;">
      <h3 style="color: #F8FAFC;">What You Receive</h3>
      <ul style="padding-left: 1.2rem; line-height: 1.7; color: #CBD5F5;">
        <li>Scorecard across five business pillars</li>
        <li>Top three risks slowing growth</li>
        <li>Recommended fixes in plain language</li>
        <li>Links to relevant TCTC tools</li>
        <li>Option to upgrade into paid blueprint</li>
      </ul>
    </article>
  </div>
</section>

<section class="container" style="padding: 2rem 1rem 4rem 1rem; max-width: 760px; margin: 0 auto;">
  <div style="background: #0F172A; padding: 2rem; border-radius: 16px; border: 1px solid #334155; color: #F8FAFC;">
    <h2 style="margin-top: 0;">Request the Audit</h2>
    <p style="color: #CBD5F5;">Fill out the form below. We will email a personalized audit within 2 business days.</p>
    <form action="{{ '/audit-delivery/' | url }}" method="GET" style="margin-top: 1.5rem;">
      <div style="margin-bottom: 1.25rem;">
        <label for="name" style="display: block; margin-bottom: 0.5rem; color: #E2E8F0;">Your Name</label>
        <input type="text" id="name" name="name" placeholder="e.g., Will Johnson" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #475569; background: #0B1223; color: #F8FAFC;">
      </div>
      <div style="margin-bottom: 1.25rem;">
        <label for="email" style="display: block; margin-bottom: 0.5rem; color: #E2E8F0;">Email Address</label>
        <input type="email" id="email" name="email" placeholder="you@yourcompany.com" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #475569; background: #0B1223; color: #F8FAFC;">
      </div>
      <div style="margin-bottom: 1.5rem;">
        <label for="phone" style="display: block; margin-bottom: 0.5rem; color: #E2E8F0;">Phone (Optional)</label>
        <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #475569; background: #0B1223; color: #F8FAFC;">
      </div>
      <button type="submit" class="form-button" style="width: 100%; background: #F59E0B; color: #0F172A; font-weight: 600;">Download the Audit</button>
    </form>
  </div>
</section>

<section class="container" style="padding: 0 1rem 4rem 1rem; max-width: 760px; margin: 0 auto; text-align: center;">
  <h2>Want a deeper engagement?</h2>
  <p style="color: #475569;">Use the free audit first. When you're ready, upgrade into the paid $499 Diagnostic Blueprint for a live working session and action plan.</p>
  <a href="{{ '/business/' | url }}" class="form-button" style="background: transparent; border: 1px solid #F59E0B; color: #F59E0B;">View Paid Diagnostic</a>
</section>
