# Changelog

## Version 2.0.0 - BYOK Edition (December 3, 2025)

### 🎉 Major Changes

#### Added
- **Bring Your Own Key (BYOK)** functionality - users provide their own Gemini API keys
- **API Key Manager** module for secure local storage and validation
- **Gemini Client** module for direct browser-to-API communication
- **Client-side scoring** - instant calculation without server round-trips
- **API key modal** with validation, testing, and storage options
- **Standalone API key tester** page (`test-api-key.html`)
- **localStorage-based results** - no database required
- **Session-only key option** for privacy-conscious users
- Comprehensive documentation: `GETTING_STARTED.md`, `DEPLOYMENT.md`, `BYOK_TRANSFORMATION_SUMMARY.md`

#### Changed
- **quiz.html** - Added API key modal UI
- **app.js** - Complete rewrite for client-side processing
- **results.html** - Made Firebase optional, reads from localStorage
- **results.js** - Tries localStorage first, Firestore as fallback
- **index.html** - Updated messaging to highlight BYOK features
- **style.css** - Added modal, toast, and new component styles
- **ReadMe.md** - Comprehensive BYOK documentation and setup guide

#### Architecture
- **Before**: Server-side API calls via Firebase Cloud Functions
- **After**: Client-side API calls directly from browser
- **Backend**: Now completely optional (can run as pure static site)
- **Database**: Now completely optional (localStorage used by default)
- **Hosting**: Can deploy to any static host (GitHub Pages, Netlify, Vercel, etc.)

#### Performance
- ⚡ Faster scoring (no server round-trip)
- ⚡ Instant results loading (from localStorage)
- ⚡ No backend dependencies
- ⚡ Unlimited scalability (no server bottleneck)

#### Cost Savings
- 💰 Zero API costs for site owners
- 💰 Users pay only for their own usage (within generous free tier)
- 💰 No Firebase Functions costs
- 💰 Can use free static hosting

#### Privacy
- 🔒 API keys stored locally only
- 🔒 Keys never sent to your servers
- 🔒 Direct browser-to-Google communication
- 🔒 Optional session-only mode
- 🔒 No user data stored server-side

#### Developer Experience
- 🛠️ Easier deployment (static files only)
- 🛠️ More hosting options
- 🛠️ Simpler architecture
- 🛠️ No backend maintenance
- 🛠️ Better separation of concerns

### Backward Compatibility
- ✅ Firebase Functions still included (optional)
- ✅ Firestore integration still available (optional)
- ✅ All original features maintained
- ✅ Existing deployments can coexist

### Migration Notes
Users of the old version will need to:
1. Get a free Gemini API key from Google AI Studio
2. Enter it once when first using the new version
3. Optionally save it for future visits

---

## Version 1.0.0 - Initial Release

### Features
- Multi-step business health questionnaire
- 4 pillars: Management, Marketing, Sales, Finances
- Firebase Cloud Functions for processing
- Server-side Gemini API integration
- Firestore database for report storage
- Dynamic scoring algorithm
- AI-generated recommendations
- Shareable results page
- CRM integration CTAs

### Architecture
- Firebase Hosting
- Cloud Functions (Node.js)
- Firestore Database
- Server-side Gemini API calls

---

## Upgrade Guide: v1 → v2

### For Site Owners

**Simple Upgrade (Static Only):**
```bash
# Just deploy the new public folder
cd public
# Deploy to your static host of choice
```

**Keep Firebase (Optional):**
```bash
# Uncomment Firebase scripts in results.html if desired
# Deploy both hosting and functions
firebase deploy
```

### For Users

**What Changes:**
- You'll need to provide your own Gemini API key (free from Google)
- First-time setup takes 2 minutes
- After that, everything works the same

**What Doesn't Change:**
- Same questionnaire
- Same scoring algorithm
- Same AI recommendations
- Same user experience

### Why Upgrade?

**For Site Owners:**
- ✅ Eliminate API costs
- ✅ Simplify infrastructure
- ✅ Deploy anywhere
- ✅ Scale infinitely
- ✅ No backend maintenance

**For Users:**
- ✅ Better privacy
- ✅ Control over costs
- ✅ Faster results
- ✅ Works offline (after first load)

---

## Roadmap

### v2.1 (Planned)
- [ ] PDF export of results
- [ ] Enhanced mobile experience
- [ ] Dark mode toggle
- [ ] Multiple AI provider support (OpenAI, Anthropic)

### v2.2 (Future)
- [ ] Report sharing via URL encoding
- [ ] Historical comparison charts
- [ ] Offline mode with service workers
- [ ] Multi-language support

### v3.0 (Consideration)
- [ ] Optional user authentication
- [ ] Team/organization features
- [ ] Advanced analytics dashboard
- [ ] White-label capabilities

---

## Breaking Changes

### v1 → v2
**None!** The upgrade is backward compatible. Old reports in Firestore will still be accessible if Firebase is configured.

### API Changes
- New client-side modules: `api-key-manager.js`, `gemini-client.js`
- `app.js` no longer calls Cloud Functions (calls Gemini directly)
- `results.js` reads from localStorage first, Firestore second

---

## Contributors

- Initial Release: Digital Alchemy Labs
- BYOK Transformation: AI-assisted refactoring (December 2025)

---

## License

See LICENSE file for details.
