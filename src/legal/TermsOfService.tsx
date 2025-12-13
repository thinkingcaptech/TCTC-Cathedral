import React from "react";

export default function TermsOfService() {
  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto", color: "#0f172a" }}>
      <h1>Terms of Service - Thinking Cap Trinity Consulting</h1>
      <p>Effective Date: January 1, 2025</p>

      <h2>Services</h2>
      <p>We provide consulting, architecture, and software development services with a Builder-Consultant model.</p>

      <h2>Payments & Milestones</h2>
      <ul>
        <li>33% at project kickoff, 33% at midpoint prototype, 34% at final delivery.</li>
        <li>Invoices are due upon receipt unless otherwise specified.</li>
      </ul>

      <h2>Ownership</h2>
      <p>You own the delivered code and related work product upon final payment unless otherwise agreed in writing.</p>

      <h2>BYOK Data Clause</h2>
      <p>
        BYOK architectures keep your data under your control. You connect directly to AI providers; TCTC does not intercept, sell, or
        reroute your API keys or payloads unless explicitly contracted to manage infrastructure.
      </p>

      <h2>Generative AI Disclaimer</h2>
      <p>
        AI outputs may contain inaccuracies or hallucinations. You are responsible for reviewing AI-generated outputs before production
        use. TCTC is not liable for business decisions made solely on AI-generated content.
      </p>

      <h2>Warranties & Limitations</h2>
      <p>Services are provided “as is.” TCTC disclaims implied warranties to the fullest extent permitted by law.</p>

      <h2>Support</h2>
      <p>60-day bug support and assistance are included post-launch for fixes, regressions, and minor adjustments.</p>

      <h2>Contact</h2>
      <p>
        PO Box 476, Richmond, KY 40476 | (859) 267-8383 |{" "}
        <a href="mailto:will@tctcusa.com">will@tctcusa.com</a>
      </p>
    </main>
  );
}
