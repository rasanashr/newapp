import { fetchPosts } from '$lib/services/wordpress.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
    try {
        const akharinkhabarData = await fetchPosts(1, 50);
        return {
            akharinkhabarPosts: akharinkhabarData.posts
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            console.error(`Last news page load error: ${error.message}`);
        }
        return {
            akharinkhabarPosts: []
        };
    }
}
