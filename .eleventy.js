/**
 * TCTC CATHEDRAL - ELEVENTY CONFIGURATION
 *
 * Professional business site configuration:
 * - Clean structure
 * - Consistent patterns
 * - Minimal complexity
 */

module.exports = function(eleventyConfig) {
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/css/");
  
  // FILTER: Calculate progress percentage
  eleventyConfig.addFilter("progressPercent", function(current, goal) {
    return Math.min(Math.round((current / goal) * 100), 100);
  });
  
  // FILTER: Format currency
  eleventyConfig.addFilter("currency", function(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  });
  
  // FILTER: Calculate days remaining
  eleventyConfig.addFilter("daysUntil", function(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  });
  
  // FILTER: Calculate savings
  eleventyConfig.addFilter("savings", function(regularPrice, bundlePrice) {
    const saved = regularPrice - bundlePrice;
    const percent = Math.round((saved / regularPrice) * 100);
    return { amount: saved, percent: percent };
  });
  
  // SHORTCODE: Embed audio player
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
  eleventyConfig.addShortcode("liveDemo", function(url, text) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="live-demo-button">${text} →</a>`;
  });
  
  // Configuration
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
