import { fetchLatestPostsForFeed } from '$lib/services/wordpress.js';

/**
 * GET /feed - RSS feed of the latest 50 posts
 */
export async function GET() {
    const { posts } = await fetchLatestPostsForFeed();

    const siteUrl = 'https://rasarooz.ir';
    const feedTitle = 'Rasanooz News Feed';
    const feedDescription = 'آخرین اخبار رسانه روز';
    const feedLink = `${siteUrl}/feed`;

    const items = posts.map(post => {
        const link = `${siteUrl}/${post.id}/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();
        const description = post.excerpt && post.excerpt.rendered ? post.excerpt.rendered : '';
        return `
      <item>
        <title><![CDATA[${post.title.rendered}]]></title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${description}]]></description>
      </item>
    `;
    }).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${feedTitle}]]></title>
    <link>${feedLink}</link>
    <description><![CDATA[${feedDescription}]]></description>
    <language>fa</language>
    <generator>SvelteKit RSS</generator>
    ${items}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8'
        }
    });
}