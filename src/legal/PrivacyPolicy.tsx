import React from "react";

export default function PrivacyPolicy() {
  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto", color: "#0f172a" }}>
      <h1>Privacy Policy - Thinking Cap Trinity Consulting</h1>
      <p>Effective Date: January 1, 2025</p>

      <h2>Who We Are</h2>
      <p>Thinking Cap Trinity Consulting (TCTC) is a boutique Builder-Consultant practice focused on applied AI architecture.</p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Contact details you submit (name, email, phone).</li>
        <li>Project context you share (requirements, goals, constraints).</li>
        <li>Basic site analytics (cookies for usage only).</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiries and deliver consulting/engineering services.</li>
        <li>To improve site experience and performance.</li>
      </ul>

      <h2>Generative AI Disclaimer</h2>
      <p>
        AI outputs can be non-deterministic and may contain inaccuracies or hallucinations. TCTC is not liable for errors in AI-generated
        content. You must review and validate AI outputs before production use.
      </p>

      <h2>BYOK Data Clause</h2>
      <p>
        TCTC builds “Bring Your Own Key” (BYOK) architectures. You retain ownership and control of data sent to AI providers. We do not
        store, resell, or route your keys or payloads through TCTC-owned services unless explicitly agreed in writing.
      </p>

      <h2>Data Sharing</h2>
      <p>We do not sell your data. We only share data with vendors required to deliver services you request (e.g., hosting, analytics).</p>

      <h2>Cookies</h2>
      <p>We use cookies for basic analytics. You can accept or decline via the on-site cookie banner.</p>

      <h2>Contact</h2>
      <p>
        PO Box 476, Richmond, KY 40476 | (859) 267-8383 |{" "}
        <a href="mailto:will@tctcusa.com">will@tctcusa.com</a>
      </p>
    </main>
  );
}
