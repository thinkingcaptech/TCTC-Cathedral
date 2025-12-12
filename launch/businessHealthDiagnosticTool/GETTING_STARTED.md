# Getting Started with Business Health Diagnostic (BYOK)

## For End Users

### Quick Start

1. **Visit the diagnostic tool** at your hosted URL
2. **Click "Start Diagnostic"** on the homepage
3. **Enter your Gemini API key** when prompted (first time only)
4. **Complete the questionnaire** (10 minutes)
5. **View your personalized report** with AI-generated recommendations

### How to Get Your Gemini API Key

1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"** (or "Get API Key")
4. Copy the entire key (it looks like: `AIzaSyDx...`)
5. Paste it into the diagnostic tool

### Is it Safe?

Yes! Your API key is:
- ✅ Stored locally in your browser only
- ✅ Never sent to our servers
- ✅ Used only to communicate directly with Google's Gemini API
- ✅ Can be deleted anytime

### How Much Does it Cost?

Google Gemini has a **generous free tier**:
- 60 requests per minute (free)
- Each diagnostic uses about 1 request
- Most users never pay anything!

If you exceed the free tier:
- **$0.0005** per diagnostic (half a cent)
- See current pricing: https://ai.google.dev/pricing

### Managing Your API Key

**Save for later**: Check "Remember my API key" to save it for future visits

**Use once**: Uncheck the box to use the key only for this session

**Clear your key**: Clear browser data or use your browser's developer tools to delete `localStorage`

---

## For Developers / Site Owners

### Deployment Options

#### Option 1: Static Hosting (Recommended)

Host the `public` folder on any static hosting service:

**GitHub Pages:**
```bash
# Push public folder to gh-pages branch
git subtree push --prefix public origin gh-pages
```

**Netlify:**
1. Drag and drop the `public` folder into Netlify
2. Or connect your Git repo and set build directory to `public`

**Vercel:**
```bash
cd public
vercel
```

**AWS S3 + CloudFront:**
```bash
aws s3 sync public/ s3://your-bucket-name --acl public-read
```

#### Option 2: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

### Customization

**1. Branding**
- Edit `public/assets/css/style.css` - Change color variables in `:root`
- Replace `public/assets/images/logo.svg` with your logo

**2. Questionnaire**
- Edit `public/quiz.html` - Modify questions or add new ones
- Update scoring weights in `public/assets/js/gemini-client.js`

**3. CTA Links**
- Edit `public/results.html` - Change CRM links to your product

**4. AI Prompt**
- Modify `buildDiagnosticPrompt()` in `public/assets/js/gemini-client.js`
- Customize the recommendations format and tone

### Analytics Integration

Add your analytics code to all pages:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Optional: Firestore Integration

To store reports in Firestore (for sharing/persistence):

1. **Uncomment Firebase scripts** in `results.html`
2. **Configure Firebase** in `firebase-init.js`
3. **Update app.js** to save to Firestore:

```javascript
// After generating report
const docRef = await db.collection('diagnostics').add(reportData);
const reportId = docRef.id;
```

### Security Best Practices

**Content Security Policy** (add to your HTML `<head>`):
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://generativelanguage.googleapis.com; 
               connect-src 'self' https://generativelanguage.googleapis.com;">
```

**HTTPS Only**: Always serve over HTTPS in production

### Monitoring

Track these metrics:
- Diagnostic completion rate
- Average time to complete
- Most common weak pillars
- CTA click-through rate

Use localStorage to aggregate anonymous statistics:
```javascript
// Track completions
const stats = JSON.parse(localStorage.getItem('app_stats') || '{}');
stats.completions = (stats.completions || 0) + 1;
localStorage.setItem('app_stats', JSON.stringify(stats));
```

### Troubleshooting

**API Key Issues:**
- User sees "Invalid API key" → Check they copied the full key
- CORS errors → Verify using correct Gemini endpoint
- Rate limiting → User exceeded free tier quota

**Display Issues:**
- Results not showing → Check browser console for errors
- Modal not appearing → Verify CSS classes and JavaScript loading
- Scoring seems wrong → Review weight calculations in `gemini-client.js`

### Support

For technical issues:
1. Check browser console for JavaScript errors
2. Verify all files loaded correctly (Network tab)
3. Test with a fresh browser session (incognito mode)
4. Clear localStorage and try again

### License & Contributions

This is an open-source project. Feel free to customize and extend!

**Key Files:**
- `app.js` - Form logic and submission
- `gemini-client.js` - AI integration and scoring
- `api-key-manager.js` - Key storage and validation
- `style.css` - All styling including modal
- `quiz.html` - Questionnaire structure
- `results.html` - Report display

Happy diagnosing! 🎯
