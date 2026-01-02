import { fetchPage, fetchPosts, fetchBacklinks } from '$lib/services/wordpress';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        // واکشی همزمان داده‌های اصلی و سایدبار
        const [page, lasttextData, backlinks] = await Promise.all([
            fetchPage(params.slug),
            fetchPosts(1, 12),
            fetchBacklinks()
        ]);

        return {
            page,
            lasttextPosts: lasttextData.posts,
            backlinks
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            console.error(`Error loading page [slug=${params.slug}]: ${error.message}`);
        }
        return {
            page: null,
            lasttextPosts: [],
            backlinks: []
        };
    }
}
