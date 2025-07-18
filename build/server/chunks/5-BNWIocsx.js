import { e as fetchCategory, a as fetchPostsByCategory, f as fetchPosts } from './wordpress-CsCrVOck.js';
import 'axios';

async function load({ params }) {
  try {
    const category = await fetchCategory(params.slug);
    const [categoryData, lasttextData, backlinksRes] = await Promise.all([
      category ? fetchPostsByCategory(category.id, 1) : { posts: [], totalPages: 1 },
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
    ]);
    const backlinks = await backlinksRes.json();
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

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bo2LO8OS.js')).default;
const universal_id = "src/routes/category/[slug]/+page.js";
const imports = ["_app/immutable/nodes/5.kMTuCm2w.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/1yZpvcLQ.js","_app/immutable/chunks/CBkoNQdp.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/Dzz9Ws4N.js","_app/immutable/chunks/B9GwK8tt.js","_app/immutable/chunks/C4Ckgbfu.js","_app/immutable/chunks/B0j1-IUC.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=5-BNWIocsx.js.map
