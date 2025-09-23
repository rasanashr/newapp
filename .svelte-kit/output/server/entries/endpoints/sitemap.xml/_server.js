import { g as getTotalPostsCount, a as getTotalTagsCount } from "../../../chunks/sitemap-data.js";
const SITEMAP_PAGE_SIZE = 1e3;
function createSitemapIndex(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  sitemaps.forEach((sitemap) => {
    xml += `
            <sitemap>
                <loc>${sitemap.loc}</loc>
            </sitemap>
        `;
  });
  xml += "</sitemapindex>";
  return xml;
}
async function GET({ fetch, url }) {
  try {
    const baseUrl = `${url.protocol}//${url.host}`;
    const [totalPosts, totalTags] = await Promise.all([
      getTotalPostsCount(fetch),
      getTotalTagsCount(fetch)
    ]);
    const totalPostPages = Math.ceil(totalPosts / SITEMAP_PAGE_SIZE);
    const totalTagPages = Math.ceil(totalTags / SITEMAP_PAGE_SIZE);
    const sitemaps = [
      { loc: `${baseUrl}/sitemaps/pages.xml` },
      { loc: `${baseUrl}/sitemaps/categories.xml` },
      { loc: `${baseUrl}/sitemaps/authors.xml` }
    ];
    for (let i = 1; i <= totalPostPages; i++) {
      sitemaps.push({ loc: `${baseUrl}/sitemaps/posts-${i}.xml` });
    }
    for (let i = 1; i <= totalTagPages; i++) {
      sitemaps.push({ loc: `${baseUrl}/sitemaps/tags-${i}.xml` });
    }
    const sitemapIndexXml = createSitemapIndex(sitemaps);
    return new Response(sitemapIndexXml.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=0, s-maxage=3600"
        // Cache for 1 hour
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error(`Sitemap index generation error: ${error.message}`);
    }
    return new Response("Error generating sitemap index", { status: 500 });
  }
}
export {
  GET
};
