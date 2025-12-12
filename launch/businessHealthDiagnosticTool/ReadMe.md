# Business Health Diagnostic Tool (BYOK Edition)

An alchemy-inspired, AI-powered lead magnet that diagnoses a company's growth bottlenecks, generates a numeric Business Health Score, and points qualified leads toward the Sales Funnel Micro-CRM.

**Now with Bring Your Own Key (BYOK)** - Users provide their own Gemini API key for privacy and cost control!

## Why it exists
- **Lead magnet**: Capture high-intent prospects with a 10-minute diagnostic.
- **Consultant-in-a-box**: Translate consulting expertise into a repeatable digital experience.
- **CTA orchestration**: Route teams with sales bottlenecks directly to the Sales Funnel Micro-CRM.
- **Privacy-first**: Users bring their own API keys - no server-side AI processing required.

## Core features
- **Multi-step questionnaire** covering Management & Operations, Marketing & Lead Generation, Sales & Conversion, and Finances & Scalability.
- **Client-side scoring** using weighted algorithms - instant results without server round-trips.
- **Gemini-powered insights** that deliver 3–5 actionable recommendations using the user's API key.
- **Shareable results** page tailored to highlight the Sales Funnel Micro-CRM CTA when the Sales pillar underperforms.
- **BYOK (Bring Your Own Key)**: Users provide their own Gemini API key for complete control and privacy.

## Project structure
```
businessHealthDiagnosticTool/
├── firebase.json            # Optional - for Firebase Hosting
├── firestore.rules          # Optional - if using Firestore
├── functions/               # Optional - no longer required for BYOK mode
│   ├── index.js            
│   └── package.json
└── public/
    ├── index.html          # Landing / promo page
    ├── quiz.html           # Multi-step questionnaire with API key modal
    ├── results.html        # Dynamic report page (client-side)
    └── assets/
        ├── css/style.css
        ├── images/logo.svg
        └── js/
            ├── app.js                # Form + client-side submission logic
            ├── api-key-manager.js    # API key storage & validation
            ├── gemini-client.js      # Client-side Gemini API integration
            ├── firebase-init.js      # Optional - for Firestore
            └── results.js            # Render results from localStorage
```

## 🚀 Quick Start (BYOK Mode - No Backend Required!)

### Option 1: Static Hosting (Simplest)

1. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key" 
   - Copy your API key (starts with `AIza...`)

2. **Host the `public` folder**
   You can use any static hosting service:
   - **GitHub Pages**: Push the `public` folder to GitHub
   - **Netlify**: Drag and drop the `public` folder
   - **Vercel**: Deploy with `vercel public`
   - **Local testing**: Use Python's HTTP server:
     ```bash
     cd public
     python -m http.server 8000
     ```
     Then visit `http://localhost:8000`

3. **Use the app**
   - Navigate to `quiz.html`
   - Enter your Gemini API key when prompted
   - Complete the questionnaire
   - View your personalized AI-generated report!

### Option 2: Firebase Hosting (Optional)

If you want to use Firebase Hosting or optionally store reports in Firestore:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project (select Hosting only, or Hosting + Firestore)
firebase init

# Deploy
firebase deploy --only hosting
```

## How BYOK Works

1. **First Visit**: Users are prompted to enter their Gemini API key
2. **Key Storage**: API key is stored locally in the browser (localStorage with basic obfuscation)
3. **Key Usage**: When generating reports, the app calls Gemini API directly from the browser
4. **Privacy**: Your API key never touches our servers - it goes directly from browser to Google
5. **Cost Control**: Users pay only for their own Gemini API usage (very affordable!)

## User Experience Flow

```
Landing Page (index.html)
    ↓
Quiz Page (quiz.html)
    ↓
API Key Modal (first-time users)
    ↓
Complete Questionnaire
    ↓
Client-side Processing:
  - Calculate scores
  - Call Gemini API with user's key
  - Generate recommendations
    ↓
Results Page (results.html)
    ↓
View personalized report with CTA
```

## Configuration Options

### Basic Setup (No Configuration Needed!)
Just host the `public` folder and you're done. Everything runs client-side.

### Advanced: Firebase Integration (Optional)

If you want to store reports in Firestore for sharing:

1. **Uncomment Firebase scripts in `results.html`**:
   ```html
   <script src="https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore-compat.js"></script>
   <script src="assets/js/firebase-init.js"></script>
   ```

2. **Update `firebase-init.js`** with your Firebase project credentials

3. **Deploy Firestore rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

## API Key Management

Users can:
- **Save key**: Stored in browser localStorage (persists across sessions)
- **Session only**: Key stored only for current session
- **Test key**: Validate their API key before proceeding
- **Update key**: Clear and re-enter a new key anytime

### For Users: How to Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the key (format: `AIzaSy...`)
5. Paste into the diagnostic tool when prompted

**Cost**: Gemini API has a generous free tier. Most users will stay within free limits.

## Security Considerations

- **API keys are obfuscated** (not encrypted) in localStorage - basic protection against casual inspection
- **Keys never sent to your servers** - direct browser-to-Google communication
- **No sensitive data stored** - only diagnostic results in localStorage
- **CORS-safe**: Gemini API supports direct browser calls

⚠️ **Note**: While more private than server-side keys, browser-stored keys can be extracted by determined users. For enterprise use, consider implementing proper authentication + backend proxy.

## Gemini API Pricing

- **Free tier**: 60 requests per minute
- **Paid tier**: $0.00025 per 1K characters (extremely affordable)
- Each diagnostic uses ~1-2K characters = ~$0.0005 per report

[View current pricing](https://ai.google.dev/pricing)

## Local Development

```bash
# Serve locally with Python
cd public
python -m http.server 8000

# Or with Node.js
npx http-server public -p 8000

# Or with PHP
cd public
php -S localhost:8000
```

Then visit `http://localhost:8000/quiz.html`

## Deployment Checklist

- [ ] Test API key modal functionality
- [ ] Verify Gemini API calls work with user key
- [ ] Test score calculation accuracy
- [ ] Confirm localStorage persistence
- [ ] Check responsive design on mobile
- [ ] Test "remember key" checkbox
- [ ] Verify error handling for invalid keys
- [ ] Test results page rendering

## Migrating from Server-Side to BYOK

If you're upgrading from the old server-side version:

1. **No Cloud Functions needed** - You can remove/ignore the `functions` folder
2. **Firebase optional** - Only needed if you want Firestore storage
3. **Update your users** - They'll need to get their own Gemini API keys
4. **Cost savings** - You no longer pay for backend API calls!

## Troubleshooting

**"Invalid API key" error**
- Ensure key starts with `AIza`
- Check you copied the entire key
- Verify API is enabled in Google Cloud Console

**"CORS error"**
- Gemini API supports CORS - make sure you're using the correct endpoint
- Check browser console for specific error messages

**Results not loading**
- Check browser localStorage isn't disabled
- Verify JavaScript is enabled
- Check browser console for errors

## Future Enhancements

1. ✅ BYOK implementation (completed!)
2. Add export to PDF functionality
3. Implement report sharing via URL encoding
4. Add optional user authentication for report history
5. Create admin dashboard for analytics (aggregated, privacy-safe)
6. Integrate with Sales Funnel Micro-CRM via webhook
7. Add chart visualizations (radar charts for pillar scores)

## License & Credits

Built with modern vanilla JavaScript, Google Gemini AI, and optional Firebase integration.

**AI Safety**: This tool uses Google's Gemini API with standard safety settings. Recommendations are AI-generated and should be reviewed by qualified professionals.
