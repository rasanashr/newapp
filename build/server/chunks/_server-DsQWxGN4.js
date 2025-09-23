import { d as fetchSitemapEntries } from './sitemap-data-BkSoFq__.js';

const SITEMAP_PAGE_SIZE = 1e3;
function generateSitemap(entries) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  entries.forEach((entry) => {
    xml += `
      <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
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
    const posts = await fetchSitemapEntries(fetch, "posts", page, SITEMAP_PAGE_SIZE);
    if (posts.length === 0) {
      return new Response("No posts found for this page.", {
        status: 404,
        headers: { "Content-Type": "text/plain" }
      });
    }
    const sitemapXml = generateSitemap(posts);
    return new Response(sitemapXml.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=0, s-maxage=3600"
        // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error(`Error generating posts sitemap for page ${params.page}:`, error);
    return new Response("Error generating posts sitemap", { status: 500 });
  }
}

export { GET };
//# sourceMappingURL=_server-DsQWxGN4.js.map
