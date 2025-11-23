# Modern AiChemy - Eleventy Website

**Where AI Meets Alchemy** — A static website built on Eleventy following the principles of "The Architecture of Resonance."

## 🎯 Mission

Help William raise $3,000 by January 1st, 2025 for a legal case while providing genuine value through AI-powered business tools and custom music services.

## 🏗️ Built With Resonance Principles

This website follows the Architecture of Resonance framework:

**First Law of Influence:**
```
Influence = (Pattern Coherence × Amplitude) / Noise
```

Every design decision reduces cognitive friction and strengthens signal.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

```powershell
# Navigate to project directory
cd "c:\Users\think\OneDrive\Desktop\DigitalAlchemy\AiChemy"

# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:8080` (default Eleventy port).

### Build for Production

```powershell
# Generate static site in _site/ directory
npm run build
```

### Clean Build Artifacts

```powershell
# Remove _site/ directory
npm run clean
```

## 📁 Project Structure

```
AiChemy/
├── .eleventy.js           # Eleventy configuration (the foundation)
├── package.json           # Dependencies and scripts
├── README.md              # This file
├── src/                   # Source files
│   ├── index.njk          # Homepage (resonance chamber)
│   ├── software.njk       # Digital tools page
│   ├── music.njk          # Audio alchemy page
│   ├── packages.njk       # Bundle formulas page
│   ├── about.njk          # About William page
│   ├── proof.njk          # Portfolio & proof page
│   ├── contact.njk        # Contact page
│   ├── _includes/         # Reusable templates
│   │   ├── layout.njk     # Base layout (the frame)
│   │   ├── nav.njk        # Navigation (the pathways)
│   │   ├── footer.njk     # Footer (the ground)
│   │   ├── product-card.njk  # Product card component
│   │   └── progress-bar.njk  # Progress bar component
│   ├── _data/             # Site data (JSON)
│   │   ├── site.json      # Site constants and config
│   │   ├── products.json  # Software products catalog
│   │   └── packages.json  # Bundle packages
│   ├── css/
│   │   └── style.css      # Complete CSS system (the frequencies)
│   └── assets/            # Images, fonts, media
│       └── images/
└── _site/                 # Generated static site (git-ignored)
```

## 🎨 Color System - The Three-Layer Frequency

### Primary Frequency (Purplish Blue)
- **Use for:** Headers, navigation, technology sections
- **Color:** `#667eea` to `#764ba2`
- **Represents:** AI magic, wisdom, premium transformation
- **This is LOW-FREQUENCY foundation** - the hum that rarely changes

### Accent Frequency (Gold)
- **Use for:** ALL CTAs, buttons, highlights, transformation moments
- **Color:** `#f6c042`
- **Represents:** The result, the gold, success
- **This creates HIGH-AROUSAL** for acquisition

### Mission Frequency (Maroon)
- **Use ONLY for:** Personal story, countdown, urgency
- **Color:** `#8b1538`
- **Represents:** Passion, urgency, the human element
- **This is LOW-AROUSAL** but high-salience retention

## 📝 Content Philosophy

### The Breath Test
Every message must pass the **Breath Test**: Can this idea be carried in a single breath?

### Compression Principles
- Every paragraph: 2-3 sentences maximum
- Every feature: One breath to explain
- Every value prop: Could fit on a business card

### Forbidden Phrases
- "Leverage," "utilize," "synergy" (corporate noise)
- "World-class," "best-in-class" (empty claims)
- Any claim that can't be proven immediately

### Required Phrases
- "AI amplifies human creativity"
- "You own everything - no royalties"
- "Results in days, not months"
- "Built by someone who runs businesses"
- "Help me fight for my family"

## 🛠️ Customization Guide

### Update Progress Bar

Edit `src/_data/site.json`:

```json
{
  "currentAmount": 500,
  "goalAmount": 3000,
  "goalDate": "2025-01-01"
}
```

The progress bar will automatically update across all pages.

### Add a New Product

Edit `src/_data/products.json`:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "price": 97,
  "compressed": "One-breath description",
  "liveUrl": "https://demo-url.com",
  "category": "software",
  "features": [
    "Feature one",
    "Feature two"
  ]
}
```

### Add a New Bundle

Edit `src/_data/packages.json`:

```json
{
  "id": "bundle-id",
  "name": "Bundle Name",
  "price": 497,
  "regularPrice": 691,
  "compressed": "One-breath description",
  "includes": ["Item 1", "Item 2"],
  "features": ["Feature 1", "Feature 2"],
  "bestFor": "Target audience description"
}
```

### Add a New Page

1. Create `src/newpage.njk`
2. Add front matter:
```yaml
---
layout: layout.njk
title: "Page Title | Modern AiChemy"
description: "Page description"
permalink: /newpage/
---
```
3. Add content using Nunjucks/HTML
4. Update navigation in `src/_includes/nav.njk`

## 🎯 Eleventy Filters & Shortcodes

### Custom Filters

- `progressPercent(current, goal)` - Calculate progress percentage
- `currency(amount)` - Format as USD currency
- `daysUntil(date)` - Calculate days remaining
- `savings(regular, bundle)` - Calculate bundle savings

### Custom Shortcodes

- `{% audioPlayer src, title %}` - Embed audio player
- `{% liveDemo url, text %}` - External link button

### Usage Examples

```njk
{# Progress percentage #}
{{ site.currentAmount | progressPercent(site.goalAmount) }}%

{# Currency formatting #}
{{ product.price | currency }}

{# Days remaining #}
{{ site.goalDate | daysUntil }} days

{# Audio player #}
{% audioPlayer "/assets/song.mp3", "Tulsa Grateful" %}

{# Live demo button #}
{% liveDemo "https://demo.com", "Try Demo" %}
```

## 🧪 Testing

### Test Locally

```powershell
# Start dev server with live reload
npm start

# Open browser to http://localhost:8080
```

### Test Production Build

```powershell
# Build production version
npm run build

# Serve _site/ folder with any static server
# Example using Python:
python -m http.server --directory _site 8000
```

## 🚢 Deployment

The `_site/` folder contains the complete static website. Deploy it to:

- **Netlify:** Drop the `_site` folder or connect to Git
- **Vercel:** Import project and set build command to `npm run build`
- **GitHub Pages:** Push `_site` contents to gh-pages branch
- **Any Static Host:** Upload `_site` contents via FTP/SFTP

### Recommended: Netlify

```powershell
# Build command
npm run build

# Publish directory
_site
```

## 🎨 Design System

### Typography Scale
- h1: `clamp(2rem, 5vw, 3.5rem)`
- h2: `clamp(1.75rem, 4vw, 2.5rem)`
- h3: `clamp(1.5rem, 3vw, 2rem)`
- Body: `1rem` (16px base)

### Spacing Scale
- xs: `0.5rem`
- sm: `1rem`
- md: `1.5rem`
- lg: `2rem`
- xl: `3rem`
- xxl: `4rem`

### Responsive Breakpoints
- Mobile: `< 480px`
- Tablet: `481px - 768px`
- Desktop: `> 769px`

## 🔧 Maintenance

### Update Site Constants

Edit `src/_data/site.json` for:
- Goal progress
- Contact email
- Current year
- Promo codes

### Add New Testimonials

When you get client results:
1. Edit `src/proof.njk`
2. Add testimonial in Client Results section
3. Include name, business, specific result

### Update Portfolio

1. Add audio files to `src/assets/audio/`
2. Update `src/music.njk` and `src/proof.njk`
3. Use `{% audioPlayer %}` shortcode to embed

## 📊 Analytics & Tracking

To add analytics:

1. Edit `src/_includes/layout.njk`
2. Add tracking script before closing `</head>` tag
3. Rebuild and deploy

## 🐛 Troubleshooting

### Site not building?
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### CSS not updating?
```powershell
# Hard refresh browser (Ctrl+Shift+R)
# Or clear .eleventy cache
Remove-Item -Recurse -Force .eleventy.cache
npm start
```

### Navigation not working?
- Check `permalink:` in page front matter
- Ensure navigation links match permalinks
- Verify closing slashes `/about/` vs `/about`

## 📚 Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Template Guide](https://mozilla.github.io/nunjucks/templating.html)
- [Architecture of Resonance Framework](https://book-learning-module.web.app)

## 💡 Philosophy & Principles

### Cathedral Thinking
Build for endurance, not novelty. Systems that last.

### Signal Over Noise
```
Influence = (Pattern Coherence × Amplitude) / Noise
```

Every element must:
- Increase pattern coherence (alignment)
- Amplify the right message (emotional conviction)
- Reduce noise (friction, contradiction, clutter)

### Design Invisibility
```
Design Invisibility = 1 / Cognitive Friction
```

Make it so clear, so smooth, so aligned that users forget they're on a website and just... transform.

## 🤝 Support

Questions? Reach out:
- **Email:** will@tctcusa.com
- **Response Time:** Usually within 24 hours

## 📄 License

MIT License - Use this however helps your business.

---

**Built with resonance principles by William**
*Where AI Meets Alchemy* 🪄✨

Every purchase helps me fight for my family. Thank you.
