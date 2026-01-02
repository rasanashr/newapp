import { fetchPost, fetchPosts, fetchRelatedPosts, fetchBacklinks } from '$lib/services/wordpress';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  try {
    const post = await fetchPost(params.id);

    if (!post || post.status !== 'publish') {
      throw error(404, 'پست پیدا نشد');
    }

    // دریافت شناسه‌های دسته‌بندی پست فعلی
    const categoryIds =
      post._embedded?.['wp:term']?.[0]?.map((cat) => cat.id) || [];

    // استفاده از fetch پاس‌داده‌شده برای SSR صحیح
    const [lasttextData, backlinks, relatedPosts] = await Promise.all([
      fetchPosts(1, 12),
      fetchBacklinks(),
      fetchRelatedPosts(params.id, categoryIds, 3)
    ]);

    return {
      post,
      lasttextPosts: lasttextData.posts,
      backlinks,
      relatedPosts
    };
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console.error(`Error loading post [id=${params.id}, slug=${params.slug}]: ${err.message}`);
    }
    throw error(404, 'پست پیدا نشد');
  }
}
