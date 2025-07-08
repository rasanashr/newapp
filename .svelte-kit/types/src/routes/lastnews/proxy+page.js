// @ts-nocheck
  export const prerender = true;

import { fetchPosts } from '$lib/services/wordpress';

/** */
export async function load() {
    const akharinkhabarData = await fetchPosts(1, 50);
    return {
        akharinkhabarPosts: akharinkhabarData.posts
    };
}
