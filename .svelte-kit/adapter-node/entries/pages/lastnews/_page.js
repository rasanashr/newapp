import { a as fetchPosts } from "../../../chunks/wordpress.js";
async function load() {
  try {
    const akharinkhabarData = await fetchPosts(1, 50);
    return {
      akharinkhabarPosts: akharinkhabarData.posts
    };
  } catch (error) {
    console.error("Error loading initial posts:", error);
    return {
      akharinkhabarPosts: []
    };
  }
}
export {
  load
};
