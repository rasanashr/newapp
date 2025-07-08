import { l as fetchPost, a as fetchPosts, m as fetchRelatedPosts } from "../../../../chunks/wordpress.js";
async function load({ params }) {
  try {
    const post = await fetchPost(params.id);
    if (!post || post.status !== "publish") {
      throw error(404, "پست پیدا نشد");
    }
    const categoryIds = post._embedded?.["wp:term"]?.[0]?.map((cat) => cat.id) || [];
    const [lasttextData, backlinksRes, relatedPosts] = await Promise.all([
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links"),
      fetchRelatedPosts(params.id, categoryIds, 3)
    ]);
    const backlinks = await backlinksRes.json();
    return {
      post,
      lasttextPosts: lasttextData.posts,
      backlinks,
      relatedPosts
    };
  } catch (err) {
    throw error(404, "پست پیدا نشد");
  }
}
export {
  load
};
