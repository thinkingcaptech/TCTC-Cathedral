# Quick Reference Card

## 🚀 Fast Start

```bash
cd public
python -m http.server 8000
# Visit: http://localhost:8000/quiz.html
```

---

## 🔑 Get API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy key (starts with `AIza`)
4. Use in diagnostic tool

---

## 📁 File Structure

```
public/
├── index.html              # Landing page
├── quiz.html               # Questionnaire + API key modal
├── results.html            # Report page
├── test-api-key.html       # API key testing tool
└── assets/
    ├── css/
    │   └── style.css       # All styles + modal
    └── js/
        ├── api-key-manager.js   # Key storage & validation
        ├── gemini-client.js     # AI integration & scoring
        ├── app.js               # Quiz logic
        ├── results.js           # Results rendering
        └── firebase-init.js     # Optional Firebase config
```

---

## 💻 Key Functions

### API Key Manager
```javascript
ApiKeyManager.save(key)      // Store key
ApiKeyManager.get()          // Get key
ApiKeyManager.validate(key)  // Check format
ApiKeyManager.test(key)      // Test with API
ApiKeyManager.remove()       // Delete key
```

### Gemini Client
```javascript
GeminiClient.generateContent(apiKey, prompt)  // Call API
GeminiClient.calculateScores(answers)         // Score quiz
GeminiClient.buildDiagnosticPrompt()         // Build prompt
```

---

## 🎨 Customization

### Colors (style.css)
```css
:root {
    --maroon-900: #3a0c1a;
    --gold-500: #d6a342;
    /* Change these for your brand */
}
```

### Questions (quiz.html)
Edit the `<fieldset>` sections for each pillar

### Scoring Weights (gemini-client.js)
```javascript
const pillarWeights = {
    management: {
        process_maturity: 0.4,    // Adjust weights
        team_alignment: 0.35,
        kpi_cadence: 0.25,
    },
    // ...
};
```

### AI Prompt (gemini-client.js)
Edit `buildDiagnosticPrompt()` function

---

## 🚢 Deploy Commands

### GitHub Pages
```bash
git add .
git commit -m "Deploy BYOK version"
git push origin main
# Enable Pages in repo settings
```

### Netlify
```bash
cd public
netlify deploy --prod
```

### Vercel
```bash
cd public
vercel --prod
```

### Firebase
```bash
firebase deploy --only hosting
```

---

## 🐛 Troubleshooting

### Modal doesn't show
- Check: `modal.classList.add('show')`
- Check: CSS `.modal.show { display: flex; }`

### API key not saving
- Check: localStorage enabled
- Check: HTTPS (required for localStorage)
- Check: Browser not in private mode (if "remember" checked)

### Results not loading
- Check: localStorage for `diagnostic_*` keys
- Check: `reportId` in URL params
- Check: Browser console for errors

### AI generation fails
- Check: Valid API key format (`AIza...`)
- Check: API key has quota remaining
- Check: Network connectivity
- Check: Browser console for CORS errors

---

## 📊 Analytics Setup

### Google Analytics
```html
<!-- Add to <head> of all pages -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Track Events
```javascript
gtag('event', 'quiz_started');
gtag('event', 'quiz_completed');
gtag('event', 'api_key_saved');
```

---

## 🔒 Security Headers

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://generativelanguage.googleapis.com;">
```

### HTTPS Redirect
```javascript
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

---

## 📱 Mobile Testing

### Chrome DevTools
```
F12 → Toggle device toolbar → Select device
```

### Responsive Breakpoint
```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

---

## 💡 Tips & Tricks

### Clear User's Stored Data
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
```

### Debug API Calls
```javascript
// In gemini-client.js, add:
console.log('Request:', prompt);
console.log('Response:', data);
```

### Test Without API Key
```javascript
// Temporarily bypass modal
localStorage.setItem('gemini_api_key', btoa('test_key'));
```

---

## 📞 Support

- **Documentation**: See `ReadMe.md`
- **Getting Started**: See `GETTING_STARTED.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Changes**: See `CHANGELOG.md`

---

## ✅ Pre-Launch Checklist

- [ ] Test API key modal
- [ ] Verify key validation
- [ ] Test complete quiz flow
- [ ] Check results page
- [ ] Test mobile responsive
- [ ] Verify HTTPS works
- [ ] Test in multiple browsers
- [ ] Check console for errors
- [ ] Verify localStorage works
- [ ] Test "remember me" option
- [ ] Test session-only mode
- [ ] Add analytics code
- [ ] Update CTA links
- [ ] Customize branding
- [ ] Test on production domain

---

**Version**: 2.0.0 BYOK  
**Updated**: December 3, 2025  
**Quick Test**: `public/test-api-key.html`
