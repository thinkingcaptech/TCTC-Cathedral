/**
 * MODERN AICHEMY - ELEVENTY CONFIGURATION
 * 
 * Following the Architecture of Resonance:
 * - Cathedral thinking: Structure that endures
 * - Pattern coherence: Consistent signal throughout
 * - Minimal noise: Zero unnecessary complexity
 * 
 * Influence = (Pattern Coherence × Amplitude) / Noise
 */

module.exports = function(eleventyConfig) {
  
  // SIGNAL AMPLIFICATION: Copy assets without transformation
  // Preserve the original frequencies (CSS, images, fonts)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // WATCH FOR CHANGES: Live reload during development
  // Standing waves require continuous observation
  eleventyConfig.addWatchTarget("src/css/");
  
  // FILTER: Calculate progress percentage
  // Visual representation of momentum toward goal
  eleventyConfig.addFilter("progressPercent", function(current, goal) {
    return Math.min(Math.round((current / goal) * 100), 100);
  });
  
  // FILTER: Format currency
  // Transform numbers into readable values
  eleventyConfig.addFilter("currency", function(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  });
  
  // FILTER: Calculate days remaining
  // Urgency without manipulation
  eleventyConfig.addFilter("daysUntil", function(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  });
  
  // FILTER: Calculate savings
  // Show value of bundle formulas
  eleventyConfig.addFilter("savings", function(regularPrice, bundlePrice) {
    const saved = regularPrice - bundlePrice;
    const percent = Math.round((saved / regularPrice) * 100);
    return { amount: saved, percent: percent };
  });
  
  // SHORTCODE: Embed audio player
  // For music portfolio samples
  eleventyConfig.addShortcode("audioPlayer", function(src, title) {
    return `
      <div class="audio-player">
        <p class="audio-title">${title}</p>
        <audio controls>
          <source src="${src}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
    `;
  });
  
  // SHORTCODE: External link button
  // For live demo links
  eleventyConfig.addShortcode("liveDemo", function(url, text) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="live-demo-button">${text} →</a>`;
  });
  
  // CONFIGURATION: The foundation
  return {
    dir: {
      input: "src",           // Source files (the raw material)
      output: "_site",        // Built site (the manifestation)
      includes: "_includes",  // Templates (the patterns)
      data: "_data"          // Constants (the frequencies)
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
