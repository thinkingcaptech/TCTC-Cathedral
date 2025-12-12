# Architecture Comparison

## Old Architecture (Server-Side)

```
┌─────────────┐
│   Browser   │
│             │
│  index.html │
│  quiz.html  │
│ results.html│
└──────┬──────┘
       │
       │ POST /api/analyzeBusiness
       │ {answers: {...}}
       ▼
┌─────────────────────┐
│  Firebase Functions │
│   (Node.js)         │
│                     │
│  1. Receive answers │
│  2. Calculate scores│
│  3. Call Gemini API │◄─── Uses YOUR Gemini key
│  4. Store Firestore │      (server secret)
│  5. Return reportId │
└──────┬──────────────┘
       │
       │ Store results
       ▼
┌─────────────┐
│  Firestore  │
│  Database   │
└─────────────┘
       │
       │ Read results
       ▼
┌─────────────┐
│   Browser   │
│ results.html│
└─────────────┘

COSTS:
✗ You pay for all Gemini API calls
✗ Firebase Functions compute time
✗ Firestore storage & reads
✗ Scaling = more costs
```

---

## New Architecture (BYOK - Client-Side)

```
┌─────────────────────────────────────┐
│           Browser                   │
│                                     │
│  1. index.html (landing)            │
│     ↓                               │
│  2. quiz.html                       │
│     ├─ API Key Modal                │
│     │  (first time only)            │
│     └─ Multi-step form              │
│        ↓                            │
│  3. User completes questionnaire    │
│     ↓                               │
│  4. app.js (client-side logic)      │
│     ├─ Collect answers              │
│     ├─ Calculate scores             │
│     │  (gemini-client.js)           │
│     └─ Generate prompt              │
│        ↓                            │
└─────┬───────────────────────────────┘
      │
      │ Direct API call
      │ with USER's API key
      ▼
┌─────────────────────────────────────┐
│     Google Gemini API               │
│   generativelanguage.googleapis.com │
│                                     │
│  Receives: Prompt + API key         │
│  Returns: AI recommendations        │
└─────────────────────────────────────┘
      │
      │ Response
      ▼
┌─────────────────────────────────────┐
│           Browser                   │
│                                     │
│  5. Receive AI recommendations      │
│     ↓                               │
│  6. Save to localStorage            │
│     {                               │
│       reportId: "report_...",       │
│       answers: {...},               │
│       scores: {...},                │
│       recommendations: "..."        │
│     }                               │
│     ↓                               │
│  7. Navigate to results.html        │
│     ↓                               │
│  8. results.js reads localStorage   │
│     ↓                               │
│  9. Display personalized report     │
│                                     │
└─────────────────────────────────────┘

COSTS:
✓ User pays for their own Gemini calls
✓ You pay $0 for backend
✓ Static hosting = free tier everywhere
✓ Infinite scaling at no cost
```

---

## Data Flow Comparison

### Old Flow (Server-Side)
```
User Input → Your Server → Gemini API → Your Database → User
          $$ you pay $$  $$ you pay $$  $$ you pay $$
```

### New Flow (BYOK)
```
User Input → User's Browser → Gemini API → User's Browser → User
                            $$ user pays $$
                            (within free tier)
```

---

## API Key Storage

### Old Approach
```
┌─────────────────┐
│  Your Server    │
│                 │
│  Environment    │
│  Variables:     │
│                 │
│  GEMINI_KEY=    │
│  AIzaSy...      │
│                 │
│  ↓              │
│  Used for ALL   │
│  users          │
└─────────────────┘
```

### New Approach (BYOK)
```
┌──────────────────┐
│  User's Browser  │
│                  │
│  localStorage:   │
│  {               │
│   gemini_api_key:│
│   "base64(...)"  │
│  }               │
│  ↓               │
│  Used ONLY by    │
│  this user       │
└──────────────────┘
```

---

## Component Architecture

```
┌────────────────────────────────────────────────┐
│              Public Folder (Static)            │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │         HTML Pages                       │ │
│  │  • index.html (landing)                  │ │
│  │  • quiz.html (questionnaire + modal)     │ │
│  │  • results.html (report)                 │ │
│  │  • test-api-key.html (testing tool)      │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │         JavaScript Modules               │ │
│  │  • api-key-manager.js                    │ │
│  │    ├─ save(key)                          │ │
│  │    ├─ get()                              │ │
│  │    ├─ validate(key)                      │ │
│  │    ├─ test(key)                          │ │
│  │    └─ remove()                           │ │
│  │                                          │ │
│  │  • gemini-client.js                      │ │
│  │    ├─ generateContent()                  │ │
│  │    ├─ calculateScores()                  │ │
│  │    ├─ buildDiagnosticPrompt()           │ │
│  │    └─ getWeakestPillar()                │ │
│  │                                          │ │
│  │  • app.js                                │ │
│  │    ├─ Form validation                    │ │
│  │    ├─ Step navigation                    │ │
│  │    ├─ API key modal                      │ │
│  │    └─ Submission logic                   │ │
│  │                                          │ │
│  │  • results.js                            │ │
│  │    ├─ Load from localStorage             │ │
│  │    ├─ Fallback to Firestore (optional)  │ │
│  │    └─ Render report                      │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │         CSS Styling                      │ │
│  │  • style.css                             │ │
│  │    ├─ Layout & typography                │ │
│  │    ├─ Modal styles                       │ │
│  │    ├─ Form components                    │ │
│  │    ├─ Toast notifications                │ │
│  │    └─ Responsive breakpoints             │ │
│  └──────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
                      │
                      │ Can deploy to:
                      ▼
    ┌─────────────────────────────────┐
    │  Any Static Host:               │
    │  • GitHub Pages                 │
    │  • Netlify                      │
    │  • Vercel                       │
    │  • AWS S3                       │
    │  • Firebase Hosting             │
    │  • Cloudflare Pages             │
    │  • etc.                         │
    └─────────────────────────────────┘
```

---

## User Experience Flow

```
┌─────────────────────────────────────────────────┐
│                Start                            │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌────────────────────────────┐
│  Visit Landing Page        │
│  (index.html)              │
│  • See BYOK messaging      │
│  • Click "Start"           │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  Quiz Page Loads           │
│  (quiz.html)               │
└────────────┬───────────────┘
             │
             ▼
       ┌─────────┐
       │ Has API │  No
       │  Key?   ├─────────┐
       └────┬────┘         │
            │ Yes          │
            │              ▼
            │    ┌─────────────────────┐
            │    │  Show API Key Modal │
            │    │  • Enter key        │
            │    │  • Test (optional)  │
            │    │  • Save option      │
            │    └─────────┬───────────┘
            │              │
            ▼              │
       ┌────────────────────┘
       │
       ▼
┌────────────────────────────┐
│  Complete Questionnaire    │
│  • 4 pillars               │
│  • 3 questions each        │
│  • ~10 minutes             │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  Client-Side Processing    │
│  • Calculate scores        │
│  • Build AI prompt         │
│  • Call Gemini API         │
│  • Generate recommendations│
│  (~10 seconds)             │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  Save to localStorage      │
│  • Report ID               │
│  • Answers                 │
│  • Scores                  │
│  • AI recommendations      │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  Navigate to Results       │
│  (results.html)            │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  Display Report            │
│  • Business Health Score   │
│  • Pillar breakdown        │
│  • AI recommendations      │
│  • CTA to Micro-CRM        │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  User Actions              │
│  • Share results           │
│  • Click CTA               │
│  • Run new diagnostic      │
└────────────────────────────┘
```

---

## Security & Privacy

```
┌─────────────────────────────────────┐
│        User's API Key               │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│     api-key-manager.js              │
│     • Validate format               │
│     • Basic obfuscation (base64)    │
│     • Store in localStorage         │
│     • Never sent to your servers    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│     Direct API Call                 │
│     Browser → Google (HTTPS)        │
│     • No intermediary               │
│     • No server-side logging        │
│     • User's cost, user's control   │
└─────────────────────────────────────┘

⚠️  Note: Keys stored in localStorage can be
    extracted by determined users. This is
    acceptable for public tools but consider
    server-side proxy for enterprise use.
```

---

## Deployment Simplicity

### Old Way
```
1. Set up Firebase project
2. Configure Cloud Functions
3. Set environment variables
4. Deploy functions
5. Deploy hosting
6. Configure Firestore
7. Set up security rules
8. Monitor function costs
9. Scale infrastructure

Time: 30-60 minutes
Complexity: High
Ongoing costs: Variable
```

### New Way (BYOK)
```
1. cd public
2. Deploy to static host

Time: 2 minutes
Complexity: Low
Ongoing costs: $0 (or ~$1/month for custom domain)
```

---

**Summary**: The BYOK transformation converts a complex server-side application into a simple, privacy-first, zero-cost static website that scales infinitely!
