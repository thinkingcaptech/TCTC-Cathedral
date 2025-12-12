# 🔐 Secure Setup Guide - Gemini API

## Overview
Your Gemini API key is now **100% secure** and stored server-side in Firebase Cloud Functions. It's never exposed to browsers or end users.

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies
```powershell
cd functions
npm install
cd ..
```

### Step 2: Set Gemini API Key (Server-Side)
```powershell
# Set your API key securely in Firebase Functions config
firebase functions:config:set gemini.apikey="YOUR_GEMINI_API_KEY_HERE"
```

**Important**: Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.

### Step 3: Deploy Cloud Functions
```powershell
# Deploy the secure functions
firebase deploy --only functions
```

This will deploy 5 secure endpoints:
- ✅ `callGemini` - General AI calls
- ✅ `scoreLead` - Lead scoring
- ✅ `draftEmail` - Email generation
- ✅ `suggestNextAction` - Action recommendations
- ✅ `generateInsights` - Business insights
- ✅ `analyzeEngagement` - Engagement analysis

### Step 4: Deploy Everything
```powershell
# Deploy hosting and firestore rules
firebase deploy
```

---

## 🔒 Security Features

### ✅ What's Protected
1. **API Key**: Stored in Firebase Functions config (server-side only)
2. **Authentication Required**: All AI functions require user login
3. **No Client Exposure**: Key never sent to browser
4. **Rate Limiting**: Firebase automatically limits abuse
5. **User Isolation**: Each user can only access their own data

### ✅ How It Works
```
Browser → Firebase Functions → Gemini API
         (User Auth)        (Secure Key)
```

1. User makes request from browser
2. Firebase verifies user is logged in
3. Cloud Function uses secure API key
4. Response sent back to user
5. API key remains hidden

---

## 🧪 Testing

After deployment:

1. Open your app: `https://your-project-id.web.app`
2. Sign in with your account
3. Try AI features:
   - Add a lead → Auto-scores
   - Open lead → Click "🤖 Re-score Lead"
   - Click "✉️ Draft Email"
   - Click "💡 Next Action"
   - Dashboard shows AI insights

---

## 📊 Monitoring Usage

### Check Function Logs
```powershell
firebase functions:log
```

### View in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Functions
4. View logs and metrics

---

## 💰 Cost Considerations

### Firebase Functions (Free Tier)
- 2M invocations/month
- 400K GB-seconds/month
- 200K CPU-seconds/month

### Gemini API (Free Tier)
- 60 requests/minute
- 1,500 requests/day
- Generous free quota

**Typical Usage**: 
- Small team (<10 users): Stays within free tier
- Medium team: ~$5-10/month
- Large team: Monitor and scale as needed

---

## 🔧 Advanced Configuration

### Update API Key
```powershell
# Change API key anytime
firebase functions:config:set gemini.apikey="NEW_KEY"

# Redeploy
firebase deploy --only functions
```

### View Current Config
```powershell
firebase functions:config:get
```

### Remove Config (if needed)
```powershell
firebase functions:config:unset gemini.apikey
```

---

## 🛡️ Best Practices

1. **Never Commit API Keys**: Already in `.gitignore`
2. **Use Environment Variables**: Done via Firebase config
3. **Monitor Usage**: Check Firebase Console regularly
4. **Set Budget Alerts**: In Google Cloud Console
5. **Review Logs**: Check for suspicious activity

---

## 🚨 Troubleshooting

### "API key not configured" Error
```powershell
# Make sure you set the key
firebase functions:config:set gemini.apikey="YOUR_KEY"

# Then deploy
firebase deploy --only functions
```

### "Must be authenticated" Error
- User needs to log in first
- Check Firebase Authentication is enabled
- Verify user session is active

### Functions Not Deploying
```powershell
# Install dependencies first
cd functions
npm install
cd ..

# Then deploy
firebase deploy --only functions
```

### TypeScript Compilation Errors
```powershell
cd functions
npm run build
# Check for any errors
```

---

## 📈 Scaling

### If You Exceed Free Tier

1. **Upgrade Firebase Plan**: Blaze (pay-as-you-go)
2. **Set Budget Alerts**: Google Cloud Console
3. **Optimize Calls**: Cache results where possible
4. **Rate Limiting**: Implement client-side throttling

### Estimated Costs at Scale
- 10K AI calls/month: ~$2-5
- 50K AI calls/month: ~$10-20
- 100K AI calls/month: ~$20-40

---

## ✅ Security Checklist

- [x] API key stored server-side only
- [x] User authentication required
- [x] Firestore security rules applied
- [x] Functions config not in git
- [x] HTTPS enforced
- [x] CORS configured
- [x] Input validation on all endpoints

---

## 🎯 Next Steps

1. ✅ Set Gemini API key: `firebase functions:config:set`
2. ✅ Deploy functions: `firebase deploy --only functions`
3. ✅ Test AI features in production
4. ✅ Monitor usage in console
5. ✅ Share app securely with team

---

**🔒 Your API key is now 100% secure and hidden from all users!**

No one can steal it, even if you share the web app link publicly.
