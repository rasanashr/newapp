import { fetchPosts } from '$lib/services/wordpress.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
    try {
        const akharinkhabarData = await fetchPosts(1, 50);
        return {
            akharinkhabarPosts: akharinkhabarData.posts
        };
    } catch (error) {
        console.error('Error loading initial posts:', error);
        return {
            akharinkhabarPosts: []
        };
    }
}
