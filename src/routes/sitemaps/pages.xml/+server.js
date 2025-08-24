import { fetchAllPages } from '$lib/services/sitemap-data.js';

const SITE_URL = 'https://rasanashr.ir';

function generateSitemapXml(wpPages) {
	let xml = '<?xml version="1.0" encoding="UTF-8"?>';
	xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	// Add pages from WordPress
	wpPages.forEach(page => {
		xml += `
      <url>
        <loc>${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
	});

	// Manually add static pages from the SvelteKit project
	const staticPages = [
		{ loc: `${SITE_URL}/categories`, changefreq: 'weekly', priority: 0.7 },
		{ loc: `${SITE_URL}/lastnews`, changefreq: 'daily', priority: 0.8 }
	];

	staticPages.forEach(page => {
		xml += `
      <url>
        <loc>${page.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `;
	});

	xml += '</urlset>';
	return xml;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	try {
		const wpPages = await fetchAllPages(fetch);
		const sitemapXml = generateSitemapXml(wpPages);

		return new Response(sitemapXml.trim(), {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=0, s-maxage=86400' // Cache for 24 hours
			}
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'production') {
			console.error(`Pages sitemap generation error: ${error.message}`);
		}
		return new Response('Error generating pages sitemap', { status: 500 });
	}
}