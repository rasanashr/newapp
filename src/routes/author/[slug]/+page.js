import { fetchAuthor, fetchPostsByAuthor, fetchPosts } from '$lib/services/wordpress';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        // واکشی همزمان اطلاعات نویسنده و داده‌های سایدبار
        const [author, lasttextData, backlinksRes] = await Promise.all([
            fetchAuthor(params.slug),
            fetchPosts(1, 12),
            fetch('https://rooidadha.ir/wp-json/backlink/v1/links')
        ]);

        const backlinks = await backlinksRes.json();

        let posts = [];
        let totalPages = 1;
        let seo = null;

        if (author && author.id) {
            // دریافت پست‌های نویسنده
            console.log('Fetching posts for author ID:', author.id);
            const result = await fetchPostsByAuthor(author.id, 1);
            posts = result.posts;
            totalPages = result.totalPages;

            // ساخت متای سئو برای نویسنده
            const authorDescription = author.description || `مطالب ${author.name}`;

            seo = {
                title: `${author.name} | پایگاه خبری تحلیلی رسا نشر`,
                description: authorDescription,
                robots: 'index, follow',
                og: {
                    title: `${author.name} | رسا نشر`,
                    description: authorDescription,
                    type: 'website',
                    site_name: 'رسا نشر',
                    locale: 'fa_IR'
                },
                jsonLd: {
                    "@context": "https://schema.org",
                    "@type": "ProfilePage",
                    "name": author.name,
                    "description": authorDescription,
                    "url": `https://rasanashr.ir/author/${params.slug}`,
                    "publisher": {
                        "@type": "Organization",
                        "name": "پایگاه خبری تحلیلی رسا نشر",
                        "url": "https://rasanashr.ir"
                    }
                }
            };
        } else {
            console.error('Author not found or invalid author ID');
        }

        // بازگرداندن داده‌ها به همراه داده‌های سایدبار
        return {
            author,
            posts,
            totalPages,
            seo,
            lasttextPosts: lasttextData.posts,
            backlinks
        };
    } catch (error) {
        console.error('Error in load function:', error);
        return {
            author: null,
            posts: [],
            totalPages: 1,
            seo: null,
            lasttextPosts: [],
            backlinks: []
        };
    }
}
