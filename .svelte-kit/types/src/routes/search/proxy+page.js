// @ts-nocheck
import { searchPosts, fetchPosts } from '$lib/services/wordpress';

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ url, depends }) {
    depends('app:search'); // این باعث می‌شه که با هر جستجو، داده‌ها دوباره لود بشن
    
    const query = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    
    try {
        // واکشی همزمان نتایج جستجو و داده‌های سایدبار
        const [searchResult, lasttextData, backlinksRes] = await Promise.all([
            query ? searchPosts(query, page) : { posts: [], totalPages: 0 },
            fetchPosts(1, 12),
            fetch('https://rooidadha.ir/wp-json/backlink/v1/links')
        ]);

        const backlinks = await backlinksRes.json();

        return {
            query,
            posts: searchResult.posts,
            totalPages: searchResult.totalPages,
            currentPage: page,
            lasttextPosts: lasttextData.posts,
            backlinks
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            console.error(`Search page error [q=${query}]: ${error.message}`);
        }
        return {
            query,
            posts: [],
            totalPages: 0,
            currentPage: page,
            lasttextPosts: [],
            backlinks: []
        };
    }
}
