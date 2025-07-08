// @ts-nocheck
import { fetchTag, fetchPostsByTag, fetchPosts } from '$lib/services/wordpress';

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ params }) {
    // واکشی تگ
    const tag = await fetchTag(params.slug);

    if (!tag) {
        // اگر تگ پیدا نشد، داده‌های سایدبار را واکشی کن و مقدار tag را null برگردان
        const [lasttextData, backlinksRes] = await Promise.all([
            fetchPosts(1, 12),
            fetch('https://rooidadha.ir/wp-json/backlink/v1/links')
        ]);
        const backlinks = await backlinksRes.json();
        return {
            tag: null,
            posts: [],
            totalPages: 1,
            lasttextPosts: lasttextData.posts,
            backlinks
        };
    }

    // اگر تگ پیدا شد، پست‌ها و سایدبار را واکشی کن
    const [tagData, lasttextData, backlinksRes] = await Promise.all([
        fetchPostsByTag(tag.id, 1),
        fetchPosts(1, 12),
        fetch('https://rooidadha.ir/wp-json/backlink/v1/links')
    ]);
    const backlinks = await backlinksRes.json();

    return {
        tag,
        posts: tagData.posts,
        totalPages: tagData.totalPages,
        lasttextPosts: lasttextData.posts,
        backlinks
    };
}


