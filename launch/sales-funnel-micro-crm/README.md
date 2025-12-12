# 🚀 Sales Funnel CRM - TCTC Digital Alchemy

A lightweight, Firebase-powered Sales Funnel CRM with **Gemini AI integration (BYOK)** for lead qualification, scoring, and intelligent insights. Built with the TCTC Citadel design system featuring dark/light mode, glass-panel aesthetics, and gold accents.

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![License](https://img.shields.io/badge/license-MIT-blue)

**🔑 Bring Your Own Key (BYOK)**: Each user provides their own free Google Gemini API key. [Quick Setup Guide →](QUICK-START.md)

---

## ✨ Features

### 📊 Lead Management Dashboard
- **Grid/List View Toggle** - Switch between visual card layout and compact list
- **Real-Time Search** - Instantly search across all lead fields
- **Smart Filters** - Filter by stage, score, date range, and tags
- **Lead Cards** - Display contact info, stage, AI score, and last contact date
- **Quick Actions** - Email, call, move stage, delete with one click

### 🎯 Sales Funnel Pipeline (Kanban Board)
- **5-Stage Visual Pipeline**:
  1. New Lead
  2. Contacted
  3. Qualified
  4. Proposal Sent
  5. Closed (Won/Lost)
- **Drag-and-Drop** - Move leads between stages seamlessly
- **Auto-Timestamping** - Automatically log stage changes
- **Pipeline Value Tracking** - Real-time total value calculation

### 🤖 Gemini AI Integration (BYOK - Bring Your Own Key)
- **Auto-Score Leads (1-100)** - AI evaluates lead quality based on multiple factors
- **AI Email Writer** - Generate personalized outreach emails instantly
- **Next Best Action** - AI suggests optimal next steps for each lead
- **Weekly Insights** - Automated business intelligence and recommendations
- **Engagement Analysis** - AI evaluates lead interaction quality and conversion likelihood
- **🔑 Your Own API Key** - Each user uses their own free Gemini API key (60 req/min, 1,500/day)

### 📈 Analytics & Insights Dashboard
- **Conversion Funnel Visualization** - See drop-off rates between stages
- **Lead Source Performance** - Track which channels convert best
- **Sales Velocity** - Average time to close and stage-specific metrics
- **Revenue Forecast** - Predictive pipeline value analysis
- **Win Rate Analytics** - Track success rates and trends

### 📝 Activity Timeline
- **Contact Logging** - Track all emails, calls, meetings, notes
- **Chronological History** - Full interaction timeline per lead
- **Quick Notes** - Add text updates with auto-timestamps
- **Activity Types** - Email, Call, Meeting, Note (with icons)

### 📧 Email Integration
- **AI Email Drafter** - Gemini creates personalized emails based on lead data
- **Template Library** - Save and reuse common email templates
- **One-Click Email** - Opens mailto with lead email pre-filled
- **Copy to Clipboard** - Easy copy of AI-generated emails

### 📥 Lead Capture & Import
- **Manual Entry Form** - Complete lead information capture
- **Quick Add Modal** - Fast popup for rapid lead entry
- **CSV Bulk Import** - Upload leads from spreadsheets with auto-scoring

### 🎨 Design System (TCTC Citadel)
- **Dark/Light Mode** - Toggle with one click, persists across sessions
- **Glass Panel Aesthetics** - Modern backdrop-filter effects
- **Gold Accent Colors** - Premium brand highlighting
- **Mobile Responsive** - Optimized for all screen sizes
- **Smooth Animations** - Professional transitions and interactions

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Vanilla JavaScript, HTML5, CSS3 |
| **Backend** | Firebase (Firestore, Auth, Hosting) |
| **AI** | Google Gemini API (BYOK) |
| **Design** | Custom TCTC Citadel Design System |
| **Icons** | Unicode Emojis (no external dependencies) |

---

## 📚 Documentation

- **[Quick Start Guide](QUICK-START.md)** - Get your API key in 2 minutes
- **[BYOK Setup Guide](BYOK-SETUP.md)** - Comprehensive setup and troubleshooting
- **[Implementation Details](BYOK-IMPLEMENTATION.md)** - Technical details of BYOK changes

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Firebase CLI: `npm install -g firebase-tools`
- Firebase project (create at [console.firebase.google.com](https://console.firebase.google.com))
- Google Gemini API key (get at [ai.google.dev](https://ai.google.dev))

### Step 1: Clone or Download Project
```bash
# Navigate to project directory
cd sales-funnel-micro-crm
```

### Step 2: Configure Firebase
1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project"
   - Follow the setup wizard

2. **Enable Authentication**:
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable "Email/Password"

3. **Create Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in **test mode** (we'll apply rules next)
   - Choose your preferred location

4. **Update Firebase Config**:
   - Open `js/config.js`
   - Replace the `firebaseConfig` object with your project credentials:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```
   - Find these values in Firebase Console > Project Settings > Your apps

### Step 3: Configure Gemini AI (Bring Your Own Key)

**🔑 Each user brings their own API key** - Free tier includes 60 requests/min, 1,500 requests/day!

1. **Get Your FREE API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key" button
   - Copy the generated key (starts with `AIza...`)

2. **Configure in App**:
   - Open the app and sign in
   - On first login, you'll see a setup wizard (or click Settings tab)
   - Paste your Gemini API key
   - Click "Test Connection" to verify it works
   - Click "Save API Key"
   - ✅ Key is stored securely in your browser only (localStorage)

3. **Privacy & Security**:
   - 🔒 Your API key is stored locally in your browser
   - 🚫 Never shared with our servers or other users
   - 💡 Each user manages their own key and usage
   - 🆓 Free tier is generous for individual use

**Note**: AI features (lead scoring, email drafting, insights) require an API key. The app will prompt you if it's not configured.

### Step 4: Deploy to Firebase
```bash
# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Select:
# - Firestore (configure rules and indexes)
# - Hosting (configure hosting)

# Choose your Firebase project
# Accept default file paths (firestore.rules, firestore.indexes.json, index.html)

# Deploy
firebase deploy
```

### Step 5: Local Development (Optional)
```bash
# Serve locally with Firebase emulators
firebase serve

# Or use any static server
# Python:
python -m http.server 8000

# Node.js:
npx http-server

# Then open: http://localhost:8000
```

---

## 🎯 Usage Guide

### Getting Started
1. **Sign Up**: Create your account on the auth screen
2. **Add Your First Lead**: Click "+ Add Lead" button
3. **Configure AI**: Go to Settings and add your Gemini API key
4. **Import Leads** (Optional): Upload CSV file in Settings

### Lead Management Workflow
```
1. Add Lead → 2. AI Auto-Scores → 3. Move Through Pipeline → 4. AI Suggests Actions → 5. Close Deal
```

### AI Features Usage

#### 1. Auto-Score Leads
- New leads are automatically scored when created (if API key configured)
- Or click "🤖 Re-score Lead" in lead detail view
- Score range: 1-100 (High: 70+, Medium: 40-69, Low: 0-39)

#### 2. Generate Email
- Open any lead detail
- Click "✉️ Draft Email"
- AI creates personalized email based on lead history
- Copy to clipboard or modify as needed

#### 3. Get Next Action
- In lead detail, click "💡 Next Action"
- AI analyzes lead history and suggests best next step
- View engagement analysis and recommendations

#### 4. Weekly Insights
- Dashboard shows AI-generated business insights
- Click "Refresh" to regenerate
- Provides 3 actionable recommendations

### CSV Import Format
Create a CSV file with these columns:
```csv
name,email,phone,company,source,notes,tags,value
John Smith,john@acme.com,555-0123,Acme Corp,LinkedIn,Interested in enterprise plan,hot|enterprise,50000
Jane Doe,jane@example.com,555-0124,Example Inc,Referral,Needs demo,warm|demo,25000
```

**Required**: `name`, `email`  
**Optional**: `phone`, `company`, `source`, `notes`, `tags` (pipe-separated), `value`

---

## 📊 Firestore Data Structure

### Collections

#### `/users/{userId}`
```javascript
{
  email: "user@example.com",
  displayName: "John Doe",
  role: "sales" | "admin",
  createdAt: Timestamp
}
```

#### `/leads/{leadId}`
```javascript
{
  userId: "user123",
  name: "Jane Smith",
  email: "jane@company.com",
  phone: "555-0123",
  company: "Company Inc",
  source: "LinkedIn",
  stage: "Qualified",
  score: 85,
  tags: ["hot", "enterprise"],
  notes: "Very interested in Q1",
  estimatedValue: 50000,
  createdAt: Timestamp,
  lastContact: Timestamp,
  lastActivity: "Email sent",
  wonLost: "won" | "lost" | null
}
```

#### `/activities/{activityId}`
```javascript
{
  leadId: "lead123",
  userId: "user123",
  type: "email" | "call" | "meeting" | "note",
  description: "Follow-up call scheduled",
  createdAt: Timestamp
}
```

#### `/emailTemplates/{templateId}`
```javascript
{
  userId: "user123",
  name: "Cold Outreach",
  subject: "Quick question about [Company]",
  body: "Hi {name},\n\nI noticed...",
  createdAt: Timestamp
}
```

---

## 🔐 Security Rules

Firestore security rules are configured to:
- Only authenticated users can access data
- Users can only read/write their own leads, activities, and templates
- Data validation enforced on create/update operations
- See `firestore.rules` for full configuration

---

## 🎨 Customization

### Theme Colors
Edit `css/main.css` - modify CSS variables:
```css
:root {
    --gold: #d4af37;          /* Primary accent */
    --gold-dark: #b8941f;     /* Accent dark */
    --gold-light: #f0d673;    /* Accent light */
    --bg-primary: #f5f5f7;    /* Light mode background */
    --text-primary: #1d1d1f;  /* Light mode text */
}

[data-theme="dark"] {
    --bg-primary: #0a0a0a;    /* Dark mode background */
    --text-primary: #f5f5f7;  /* Dark mode text */
}
```

### Pipeline Stages
Edit `js/config.js`:
```javascript
const appConfig = {
    stages: [
        "New Lead",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Closed"
    ]
}
```

### Lead Sources
Edit `js/config.js`:
```javascript
sources: [
    "Website",
    "Referral",
    "LinkedIn",
    "Cold Call",
    "Event",
    "Other"
]
```

---

## 🚀 Deployment

### Firebase Hosting (Recommended)
```bash
firebase deploy
```
Your app will be live at: `https://YOUR_PROJECT_ID.web.app`

### Custom Domain
1. Firebase Console > Hosting > Add custom domain
2. Follow DNS configuration steps
3. SSL automatically provisioned

### Other Hosting Options
- **Netlify**: Drag & drop project folder
- **Vercel**: `vercel deploy`
- **GitHub Pages**: Push to gh-pages branch
- **Any Static Host**: Upload all files to web root

---

## 📱 Mobile & PWA Support

The CRM is fully responsive and works on:
- 📱 Mobile phones (iOS, Android)
- 📱 Tablets (iPad, Android tablets)
- 💻 Desktop (all browsers)
- 🖥️ Large displays (optimized layouts)

### Install as PWA (Progressive Web App)
1. Open in Chrome/Edge/Safari
2. Click "Install" icon in address bar
3. App opens in standalone window
4. Works offline (after first load)

---

## 🔧 Troubleshooting

### Firebase Initialization Error
- Check `js/config.js` has correct Firebase credentials
- Verify Firebase project is active in console
- Ensure Firestore and Auth are enabled

### Gemini AI Not Working
- Verify API key is correct in Settings
- Check [AI Studio](https://ai.google.dev) for quota/usage
- Ensure API key has proper permissions
- Check browser console for specific errors

### CSV Import Fails
- Ensure CSV has `name` and `email` columns
- Check for proper comma separation
- Remove special characters from data
- Verify file encoding is UTF-8

### Drag-and-Drop Not Working
- Ensure using modern browser (Chrome, Firefox, Safari, Edge)
- Check if JavaScript is enabled
- Try refreshing the page

---

## 🎓 Learning Resources

### Firebase
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)

### Gemini AI
- [Gemini API Docs](https://ai.google.dev/docs)
- [Prompt Engineering Guide](https://ai.google.dev/docs/prompt_best_practices)

---

## 📈 Roadmap

### Phase 1: MVP ✅
- [x] Authentication & user management
- [x] Lead CRUD operations
- [x] Kanban pipeline
- [x] Basic analytics
- [x] Activity timeline

### Phase 2: AI Enhancement ✅
- [x] Gemini lead scoring
- [x] AI email writer
- [x] Next action suggestions
- [x] Weekly insights generator

### Phase 3: Polish ✅
- [x] CSV import/export
- [x] Email templates
- [x] Mobile responsive design
- [x] Dark/light mode

### Phase 4: Future Enhancements
- [ ] Calendar integration (Google, Outlook)
- [ ] SMS notifications (Twilio)
- [ ] Team collaboration features
- [ ] Advanced reporting & exports
- [ ] Webhook integrations
- [ ] Email tracking (open/click rates)
- [ ] Multi-language support
- [ ] Custom fields builder
- [ ] API for third-party integrations

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 💬 Support

For issues, questions, or feature requests:
- Open a GitHub issue
- Check existing documentation
- Review Firebase/Gemini docs

---

## 🌟 Credits

**Built by**: TCTC Digital Alchemy  
**Design System**: TCTC Citadel  
**AI Powered by**: Google Gemini  
**Backend**: Firebase  

---

## 📸 Screenshots

### Dashboard
![Dashboard with AI insights, stats, and lead cards]

### Pipeline View
![Kanban board with drag-and-drop stages]

### Lead Detail
![Lead details with activity timeline and AI actions]

### Analytics
![Conversion funnel, sources, velocity, and forecast]

---

**🎯 Start managing your sales pipeline with AI-powered insights today!**

Deploy in minutes • Scale with Firebase • Powered by Gemini AI
