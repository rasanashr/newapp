import { a as fetchPosts } from "../../../chunks/wordpress.js";
const prerender = true;
async function load() {
  const akharinkhabarData = await fetchPosts(1, 50);
  return {
    akharinkhabarPosts: akharinkhabarData.posts
  };
}
export {
  load,
  prerender
};
