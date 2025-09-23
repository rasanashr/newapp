import { i as fetchTag, a as fetchPosts, j as fetchPostsByTag } from "../../../../chunks/wordpress.js";
async function load({ params }) {
  const tag = await fetchTag(params.slug);
  if (!tag) {
    const [lasttextData2, backlinksRes2] = await Promise.all([
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
    ]);
    const backlinks2 = await backlinksRes2.json();
    return {
      tag: null,
      posts: [],
      totalPages: 1,
      lasttextPosts: lasttextData2.posts,
      backlinks: backlinks2
    };
  }
  const [tagData, lasttextData, backlinksRes] = await Promise.all([
    fetchPostsByTag(tag.id, 1),
    fetchPosts(1, 12),
    fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
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
export {
  load
};
