const tools = require("../_data/tools.json");
const site = require("../_data/site.json");

const getSlug = (filePathStem = "") => {
  const segments = filePathStem.split("/").filter(Boolean);
  if (!segments.length) return null;
  const last = segments[segments.length - 1];
  if (last === "index" && segments.length > 1) {
    return segments[segments.length - 2];
  }
  return last;
};

module.exports = {
  layout: "layouts/tool.njk",
  eleventyComputed: {
    slug: data => getSlug(data.page.filePathStem),
    toolData: data => tools[getSlug(data.page.filePathStem)],
    permalink: data => tools[getSlug(data.page.filePathStem)]?.url,
    title: data => tools[getSlug(data.page.filePathStem)]?.name,
    eyebrow: "BYOK Tool",
    description: data => tools[getSlug(data.page.filePathStem)]?.tagline,
    category: data => tools[getSlug(data.page.filePathStem)]?.category,
    difficulty: data => tools[getSlug(data.page.filePathStem)]?.difficulty,
    apiModels: data => tools[getSlug(data.page.filePathStem)]?.apiModels,
    useCases: data => tools[getSlug(data.page.filePathStem)]?.useCases,
    seo: data => tools[getSlug(data.page.filePathStem)]?.seo,
    faq: data => tools[getSlug(data.page.filePathStem)]?.faq,
    schema: data => {
      const tool = tools[getSlug(data.page.filePathStem)];
      if (!tool) return null;
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        url: `${site.url}${tool.url}`,
        description: tool.seo?.description,
        applicationCategory: tool.schema?.applicationCategory,
        operatingSystem: tool.schema?.operatingSystem,
        offers: tool.schema?.offers,
        provider: {
          "@type": "Organization",
          name: "TCTC",
          url: site.url
        }
      };
    }
  }
};
