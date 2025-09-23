import { g as fetchCategory, c as fetchPostsByCategory, a as fetchPosts } from "../../../../chunks/wordpress.js";
async function load({ params, setHeaders }) {
  try {
    const category = await fetchCategory(params.slug);
    const [categoryData, lasttextData, backlinksRes] = await Promise.all([
      category ? fetchPostsByCategory(category.id, 1) : { posts: [], totalPages: 1 },
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
    ]);
    const backlinks = await backlinksRes.json();
    setHeaders({
      "Cache-Control": "public, max-age=300, s-maxage=300"
      // 5 minutes
    });
    return {
      category,
      posts: categoryData.posts,
      totalPages: categoryData.totalPages,
      lasttextPosts: lasttextData.posts,
      backlinks
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      category: null,
      posts: [],
      totalPages: 1,
      lasttextPosts: [],
      backlinks: []
    };
  }
}
export {
  load
};
