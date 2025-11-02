module.exports = function(eleventyConfig) {
  // 1. Tell Eleventy to copy the 'css' folder
  eleventyConfig.addPassthroughCopy("css");
  
  // 2. Tell Eleventy to copy the 'img' folder
  eleventyConfig.addPassthroughCopy("img");

  // 3. === THE FIX: Tell Eleventy to copy the 'assets' folder ===
  eleventyConfig.addPassthroughCopy("assets");

  // 4. Create a "shortcode" for the year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // 5. Return the configuration object
  return {
    dir: {
      input: ".",          // Use root folder for content files
      output: "_site",     // This is the folder Eleventy will build
      includes: "_includes", // Folder for layouts, header, footer
      data: "_data"        // Folder for your global data (like products)
    }
  };
};