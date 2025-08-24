import { fetchAllCategories } from '$lib/services/sitemap-data.js';

const SITE_URL = 'https://rasanashr.ir';

function generateSitemapXml(entries) {
	let xml = '<?xml version="1.0" encoding="UTF-8"?>';
	xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	entries.forEach(entry => {
		// Manually construct the URL with the correct structure
		const loc = `${SITE_URL}/category/${entry.slug}`;
		xml += `
      <url>
        <loc>${loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
	});

	xml += '</urlset>';
	return xml;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	try {
		const categories = await fetchAllCategories(fetch);
		const sitemapXml = generateSitemapXml(categories);

		return new Response(sitemapXml.trim(), {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=0, s-maxage=43200' // Cache for 12 hours
			}
		});
	} catch (error) {
		console.error('Error generating categories sitemap:', error);
		return new Response('Error generating categories sitemap', { status: 500 });
	}
}