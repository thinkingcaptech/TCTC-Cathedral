# Assets Directory

This folder contains all media files for the Modern AiChemy website.

## Required Files

### Logo
- **File:** `logo.svg`
- **Location:** `/assets/`
- **Purpose:** Main site logo displayed in navigation
- **Specs:** SVG format, optimized for web

### Profile Image
- **File:** `profile.jpg`
- **Location:** `/assets/`
- **Purpose:** William's profile photo on About page
- **Specs:** 400x400px minimum, JPEG format, optimized for web

### Music Tracks

To keep the repository lightweight for hosts like Netlify, audio masters are now stored off-repo. If you want to reintroduce local audio files:

1. Create `/src/assets/music/`
2. Add MP3s such as:
   - `tulsa-grateful.mp3`
   - `modern-aichemy.mp3`
   - `buzz.mp3`
   - `highs-and-lows.mp3`
3. Update any templates to point at those files (or keep them hosted externally and link to streaming URLs).

**Recommendation:** Prefer external hosting/CDN links for audio to avoid LFS and large git history.

## Placeholder Files

Until you add new media, the site will fall back to text placeholders in the UI. This is normal after removing large binaries from the repo.

## Adding Your Files

1. Place `logo.svg` in: `src/assets/`
2. Place `profile.jpg` in: `src/assets/`
3. If you must host audio in the repo, place MP3 files in: `src/assets/music/`

The site will automatically detect and use them once placed in the correct locations.
