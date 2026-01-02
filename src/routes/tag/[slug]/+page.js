import { fetchTag, fetchPostsByTag, fetchPosts, fetchBacklinks } from '$lib/services/wordpress';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    // واکشی تگ
    const tag = await fetchTag(params.slug);

    if (!tag) {
        // اگر تگ پیدا نشد، داده‌های سایدبار را واکشی کن و مقدار tag را null برگردان
        const [lasttextData, backlinks] = await Promise.all([
            fetchPosts(1, 12),
            fetchBacklinks()
        ]);
        return {
            tag: null,
            posts: [],
            totalPages: 1,
            lasttextPosts: lasttextData.posts,
            backlinks
        };
    }

    // اگر تگ پیدا شد، پست‌ها و سایدبار را واکشی کن
    const [tagData, lasttextData, backlinks] = await Promise.all([
        fetchPostsByTag(tag.id, 1),
        fetchPosts(1, 12),
        fetchBacklinks()
    ]);

    return {
        tag,
        posts: tagData.posts,
        totalPages: tagData.totalPages,
        lasttextPosts: lasttextData.posts,
        backlinks
    };
}


