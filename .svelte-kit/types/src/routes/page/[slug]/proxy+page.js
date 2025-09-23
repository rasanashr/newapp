// @ts-nocheck
import { fetchPage, fetchPosts } from '$lib/services/wordpress';

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ params }) {
    try {
        // واکشی همزمان داده‌های اصلی و سایدبار
        const [page, lasttextData, backlinksRes] = await Promise.all([
            fetchPage(params.slug),
            fetchPosts(1, 12),
            fetch('https://rooidadha.ir/wp-json/backlink/v1/links')
        ]);

        const backlinks = await backlinksRes.json();

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
