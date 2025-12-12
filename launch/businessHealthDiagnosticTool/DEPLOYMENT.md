# Quick Deployment Guide

## Test Locally (1 minute)

```bash
cd public
python -m http.server 8000
```

Visit: `http://localhost:8000/quiz.html`

---

## Deploy to GitHub Pages (5 minutes)

### Option A: Direct Upload

1. Create a new GitHub repository
2. Upload the contents of the `public` folder
3. Go to Settings → Pages
4. Select branch: `main`, folder: `/root`
5. Visit: `https://yourusername.github.io/your-repo-name/`

### Option B: Using Git

```bash
cd public
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

Then enable GitHub Pages in repository settings.

---

## Deploy to Netlify (2 minutes)

### Drag & Drop:
1. Go to [netlify.com](https://netlify.com)
2. Drag the `public` folder onto the page
3. Done! You get a URL like `https://your-site.netlify.app`

### CLI:
```bash
npm install -g netlify-cli
cd public
netlify deploy --prod
```

---

## Deploy to Vercel (2 minutes)

```bash
npm install -g vercel
cd public
vercel --prod
```

---

## Deploy to Firebase Hosting (5 minutes)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select public folder
firebase deploy --only hosting
```

---

## Deploy to AWS S3 + CloudFront

```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
cd public
aws s3 sync . s3://your-bucket-name --acl public-read

# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html

# Create CloudFront distribution (optional, for HTTPS + CDN)
# Follow AWS CloudFront setup guide
```

---

## Custom Domain Setup

### GitHub Pages:
1. Add `CNAME` file to `public` folder with your domain
2. Update DNS: `CNAME` record pointing to `yourusername.github.io`

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS with provided records

### Vercel:
1. Project Settings → Domains
2. Add your domain
3. Update DNS records

---

## Post-Deployment Checklist

- [ ] Test the quiz flow end-to-end
- [ ] Verify API key modal appears
- [ ] Test with a real Gemini API key
- [ ] Check mobile responsiveness
- [ ] Verify results page loads correctly
- [ ] Test "Test Key" functionality
- [ ] Check all links and CTAs work
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (most hosts do this automatically)

---

## Monitoring & Analytics

Add to `quiz.html` and `results.html` (before `</head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Or use privacy-friendly alternatives:
- [Plausible](https://plausible.io/)
- [Fathom](https://usefathom.com/)
- [Simple Analytics](https://simpleanalytics.com/)

---

## Cost Estimate

**Hosting**: $0/month (all platforms offer free tiers)
**Gemini API**: $0/month for most users (free tier is generous)
**Domain**: ~$12/year (optional)
**Total**: **FREE** (or ~$1/month with custom domain)

---

## Troubleshooting Deployment

**404 Errors**: Ensure routing is set up correctly. For GitHub Pages, use full URLs like `/quiz.html`

**CORS Issues**: Gemini API supports CORS. If issues persist, check browser console

**Slow Loading**: Enable CDN (CloudFront, Cloudflare) or use a faster host

**API Key Not Saving**: Ensure HTTPS is enabled (localStorage security requirement)

---

## Need Help?

Check the full documentation in `GETTING_STARTED.md` or `ReadMe.md`
