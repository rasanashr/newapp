import { i as fetchPage, a as fetchPosts } from "../../../../chunks/wordpress.js";
async function load({ params }) {
  try {
    const [page, lasttextData, backlinksRes] = await Promise.all([
      fetchPage(params.slug),
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
    ]);
    const backlinks = await backlinksRes.json();
    return {
      page,
      lasttextPosts: lasttextData.posts,
      backlinks
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      page: null,
      lasttextPosts: [],
      backlinks: []
    };
  }
}
export {
  load
};
