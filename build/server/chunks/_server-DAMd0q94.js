import { f as fetchAllAuthors } from './sitemap-data-BkSoFq__.js';

function generateSitemapXml(entries) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  entries.forEach((entry) => {
    xml += `
      <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  });
  xml += "</urlset>";
  return xml;
}
async function GET({ fetch }) {
  try {
    const authors = await fetchAllAuthors(fetch);
    const sitemapXml = generateSitemapXml(authors);
    return new Response(sitemapXml.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=0, s-maxage=86400"
        // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error("Error generating authors sitemap:", error);
    return new Response("Error generating authors sitemap", { status: 500 });
  }
}

export { GET };
//# sourceMappingURL=_server-DAMd0q94.js.map
