import { fetchPosts } from '$lib/services/wordpress';

export async function GET() {
    try {
        // فقط 100 پست آخر را واکشی کن (معمولاً کافی است)
        const postsResult = await fetchPosts(1, 100, true);
        const posts = postsResult.posts || [];
        const baseUrl = 'https://rasanashr.ir';
        const now = new Date();

        let xml = '<?xml version="1.0" encoding="UTF-8"?>';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
        xml += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" ';
        xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

        posts
            .filter(post => {
                // فقط پست‌های ۴۸ ساعت اخیر
                const pubDate = new Date(post.date);
                return (now - pubDate) < 2 * 24 * 60 * 60 * 1000;
            })
            .forEach(post => {
                const pubDate = new Date(post.date).toISOString();
                const title = post.title?.rendered
                    ?.replace(/&/g, '&amp;')
                    ?.replace(/</g, '&lt;')
                    ?.replace(/>/g, '&gt;')
                    ?.replace(/"/g, '&quot;')
                    ?.replace(/'/g, '&apos;') || '';
                xml += `
  <url>
    <loc>${baseUrl}/${post.id}/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>رسا نشر</news:name>
        <news:language>fa</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>`;
                if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                    const imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
                    xml += `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${title}</image:title>
    </image:image>`;
                }
                xml += `
  </url>`;
            });

        xml += '\n</urlset>';

        return new Response(xml.trim(), {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'max-age=0, s-maxage=3600'
            }
        });
    } catch (error) {
        console.error('Error generating news sitemap:', error);
        return new Response('Error generating sitemap', { status: 500 });
    }
}