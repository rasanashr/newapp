import { fetchPosts, fetchCategories, fetchTags } from '$lib/services/wordpress';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        // دریافت تمام پست‌ها (حداکثر 100 پست)
        const postsResult = await fetchPosts(1, 100);
        const categories = await fetchCategories();
        const tags = await fetchTags();

        const baseUrl = 'https://rasanashr.ir';
        const currentDate = new Date().toISOString();
        
        let xml = '<?xml version="1.0" encoding="UTF-8"?>';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // صفحه اصلی
        xml += `
            <url>
                <loc>${baseUrl}</loc>
                <lastmod>${currentDate}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>
        `;

        // نوشته‌ها
        if (postsResult.posts) {
            postsResult.posts.forEach(post => {
                xml += `
                    <url>
                        <loc>${baseUrl}/${post.id}/${post.slug}</loc>
                        <lastmod>${new Date(post.modified).toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                    </url>
                `;
            });
        }

        // دسته‌بندی‌ها
        if (categories) {
            categories.forEach(category => {
                if (category.count > 0) { // فقط دسته‌بندی‌های دارای نوشته
                    xml += `
                        <url>
                            <loc>${baseUrl}/category/${category.slug}</loc>
                            <lastmod>${currentDate}</lastmod>
                            <changefreq>weekly</changefreq>
                            <priority>0.7</priority>
                        </url>
                    `;
                }
            });
        }

        // برچسب‌ها
        if (tags) {
            tags.forEach(tag => {
                if (tag.count > 0) { // فقط برچسب‌های دارای نوشته
                    xml += `
                        <url>
                            <loc>${baseUrl}/tag/${tag.slug}</loc>
                            <lastmod>${currentDate}</lastmod>
                            <changefreq>weekly</changefreq>
                            <priority>0.6</priority>
                        </url>
                    `;
                }
            });
        }

        xml += '</urlset>';

        return new Response(xml.trim(), {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'max-age=0, s-maxage=3600'
            }
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new Response('Error generating sitemap', { status: 500 });
    }
}