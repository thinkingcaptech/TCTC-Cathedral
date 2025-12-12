# 🔑 Bring Your Own Key (BYOK) Setup Guide

## Overview

This Sales Funnel CRM uses a **Bring Your Own Key (BYOK)** model for AI features. This means:
- ✅ **Each user provides their own Google Gemini API key**
- ✅ **You control your own usage and costs**
- ✅ **Your key is stored securely in your browser only**
- ✅ **Free tier is very generous: 60 requests/min, 1,500 requests/day**

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Get Your Free Gemini API Key

1. **Visit Google AI Studio**:
   - Go to: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account (personal or work)

2. **Create API Key**:
   - Click the **"Create API Key"** button
   - Select an existing Google Cloud project or create a new one
   - Your API key will be generated instantly

3. **Copy Your Key**:
   - Click the copy icon next to your key
   - It should start with `AIza...`
   - Keep this key private!

### Step 2: Configure in the App

**Option A: First-Time Setup (Automatic)**
1. Open the Sales Funnel CRM app
2. Sign in or create an account
3. You'll see an automatic setup wizard
4. Paste your API key in the field
5. Click **"Save & Continue"**
6. Done! ✅

**Option B: Manual Setup (Settings)**
1. Open the Sales Funnel CRM app
2. Click the **"Settings"** tab in the navigation
3. Find the **"🤖 Gemini AI Configuration"** section
4. Paste your API key
5. Click **"Test Connection"** to verify it works
6. Click **"💾 Save API Key"**
7. Done! ✅

### Step 3: Start Using AI Features

Once configured, you can use:
- **🤖 Auto Lead Scoring** - Automatic when you create new leads
- **✉️ AI Email Drafting** - Click "Draft Email" on any lead
- **💡 Next Action Suggestions** - Click "Next Action" on any lead
- **📊 AI Insights** - Automatically generated on Dashboard
- **🎯 Engagement Analysis** - Evaluates lead quality and conversion potential

---

## 🔒 Security & Privacy

### Where is Your Key Stored?

Your API key is stored in **localStorage** in your browser. This means:
- ✅ It's saved on your device only
- ✅ Not sent to our servers
- ✅ Not shared with other users
- ✅ Persists between sessions on your browser
- ⚠️ Lost if you clear browser data

### Is It Secure?

**Local Storage Security:**
- Your key is stored in your browser's localStorage
- It can be accessed by JavaScript on the same domain
- Browser extensions with access to the page could potentially read it
- Not encrypted by default in localStorage

**Best Practices:**
1. **Don't share your screen** when your key is visible
2. **Use API key restrictions** in Google Cloud Console (see below)
3. **Don't use shared/public computers** for sensitive work
4. **Clear browser data** if using a public computer
5. **Regenerate keys periodically** for extra security

### API Key Restrictions (Recommended)

To secure your API key further:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services > Credentials**
4. Find your API key and click "Edit"
5. Under **Application restrictions**, select:
   - **HTTP referrers (web sites)**
   - Add your app's domain: `https://your-app-domain.web.app/*`
   - Add localhost for testing: `http://localhost/*`
6. Under **API restrictions**, select:
   - **Restrict key**
   - Select: **Generative Language API**
7. Click **Save**

Now your key only works from your app's domain! 🔒

---

## 💰 Costs & Usage

### Free Tier Limits

Google Gemini offers a generous free tier:

| Metric | Free Tier Limit |
|--------|-----------------|
| **Requests per minute** | 60 |
| **Requests per day** | 1,500 |
| **Monthly cost** | $0 |

### Typical Usage

For a small business or individual:
- **5-10 leads/day** with AI scoring: ~10-20 requests/day
- **Email drafting**: ~5 requests/day
- **Daily insights**: ~3 requests/day
- **Total**: ~20-30 requests/day

**You'll stay well within the free tier!** 🎉

### What If I Need More?

If you exceed the free tier:
1. Google will prompt you to enable billing
2. Pricing is pay-as-you-go (very affordable)
3. Typical cost: $0.001-0.01 per request
4. 10,000 requests ≈ $10-100 depending on model

Most users never need to pay!

---

## 🛠️ Troubleshooting

### Problem: "Please configure your API key"

**Solution:**
1. Go to Settings tab
2. Make sure you've saved your API key
3. Try refreshing the page
4. Check that your key starts with `AIza`

### Problem: "Connection failed. Please check your API key"

**Solution:**
1. Verify your key is correct (copy-paste from Google AI Studio)
2. Check that the API key isn't expired or deleted
3. Make sure the Generative Language API is enabled in your Google Cloud project
4. Try creating a new API key

### Problem: "API key appears too short"

**Solution:**
- Gemini API keys are typically 39 characters long
- Make sure you copied the entire key
- Check for extra spaces at the beginning or end
- Key should start with `AIza`

### Problem: AI features not working

**Solution:**
1. Open browser console (F12)
2. Look for error messages
3. Common issues:
   - API key not set
   - Rate limit exceeded (wait a minute)
   - Network issues (check internet connection)
   - API quota exhausted (check Google Cloud Console)

### Problem: "Rate limit exceeded"

**Solution:**
- Free tier allows 60 requests/minute
- Wait 1 minute and try again
- Consider spacing out AI requests
- Check your usage in Google Cloud Console

---

## 📊 Monitoring Your Usage

### Check Usage in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services > Dashboard**
4. Click on **Generative Language API**
5. View your quota usage and remaining limits

### Set Up Budget Alerts (Optional)

If you enable billing:
1. Go to **Billing > Budgets & alerts**
2. Click **Create Budget**
3. Set a monthly budget (e.g., $5)
4. Configure alerts at 50%, 90%, 100%
5. You'll be notified if costs approach your limit

---

## 🔄 Managing Multiple Keys

### Using Different Keys on Different Devices

Since keys are stored per-browser:
- Your work computer has one key
- Your phone has another key
- Each device manages its own key independently

### Sharing the App with Your Team

Each team member:
1. Gets their own Gemini API key (free)
2. Configures it in their browser
3. Uses the app with their own key
4. Manages their own usage

**Everyone stays within free tier limits!**

---

## ⚡ Advanced: Key Rotation

For enhanced security, rotate your keys periodically:

### Monthly Key Rotation

1. **Create new key** in Google AI Studio
2. **Save new key** in Settings
3. **Delete old key** in Google Cloud Console
4. **Update on all devices** you use

### Automated Key Management

For teams or advanced users, consider:
- Using environment-specific keys (dev/prod)
- Implementing key rotation policies
- Setting up monitoring and alerts
- Using Google Cloud IAM for team access

---

## 🎓 Best Practices

### ✅ Do's

- ✅ Use API key restrictions (HTTP referrers)
- ✅ Monitor your usage regularly
- ✅ Keep your key private
- ✅ Use one key per user
- ✅ Test connection after setup
- ✅ Set up budget alerts if on paid tier

### ❌ Don'ts

- ❌ Share your API key with others
- ❌ Commit keys to git repositories
- ❌ Use the same key across many users
- ❌ Leave keys unrestricted
- ❌ Store keys in plain text files
- ❌ Use keys on untrusted devices

---

## 📚 Additional Resources

### Official Documentation
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google Cloud Console](https://console.cloud.google.com/)

### Support
- Check the main [README.md](README.md) for general setup
- Review [SECURE-SETUP.md](SECURE-SETUP.md) for the old server-side approach
- Open an issue on GitHub for bugs or questions

---

## 🆘 Still Need Help?

1. **Check the console**: Press F12 and look for errors
2. **Verify API key**: Test it in Google AI Studio first
3. **Check quotas**: View usage in Google Cloud Console
4. **Clear browser cache**: Sometimes helps with localStorage issues
5. **Try incognito mode**: Rules out extension conflicts

---

## 🎉 You're All Set!

Once your API key is configured:
- 🤖 AI lead scoring works automatically
- ✉️ Draft emails with one click
- 💡 Get intelligent suggestions
- 📊 View AI-powered insights
- 🎯 Analyze engagement quality

**Enjoy your AI-powered CRM!** 🚀
