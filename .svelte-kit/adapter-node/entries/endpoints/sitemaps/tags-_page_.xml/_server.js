import { d as fetchSitemapEntries } from "../../../../chunks/sitemap-data.js";
const SITEMAP_PAGE_SIZE = 1e3;
function generateSitemap(entries) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  entries.forEach((entry) => {
    xml += `
      <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `;
  });
  xml += "</urlset>";
  return xml;
}
async function GET({ params, fetch }) {
  try {
    const page = parseInt(params.page, 10);
    if (isNaN(page) || page < 1) {
      return new Response("Invalid page number", { status: 400 });
    }
    const tags = await fetchSitemapEntries(fetch, "tags", page, SITEMAP_PAGE_SIZE);
    if (tags.length === 0) {
      return new Response("No tags found for this page.", {
        status: 404,
        headers: { "Content-Type": "text/plain" }
      });
    }
    const sitemapXml = generateSitemap(tags);
    return new Response(sitemapXml.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=0, s-maxage=43200"
        // Cache for 12 hours
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error(`Tags sitemap error on page ${params.page}: ${error.message}`);
    }
    return new Response("Error generating tags sitemap", { status: 500 });
  }
}
export {
  GET
};
