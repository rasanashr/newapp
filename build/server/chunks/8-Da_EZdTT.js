import { s as searchPosts, f as fetchPosts } from './wordpress-CsCrVOck.js';
import 'axios';

async function load({ url, depends }) {
  depends("app:search");
  const query = url.searchParams.get("q") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  try {
    const [searchResult, lasttextData, backlinksRes] = await Promise.all([
      query ? searchPosts(query, page) : { posts: [], totalPages: 0 },
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
    ]);
    const backlinks = await backlinksRes.json();
    return {
      query,
      posts: searchResult.posts,
      totalPages: searchResult.totalPages,
      currentPage: page,
      lasttextPosts: lasttextData.posts,
      backlinks
    };
  } catch (error) {
    console.error("Error in search page load:", error);
    return {
      query,
      posts: [],
      totalPages: 0,
      currentPage: page,
      lasttextPosts: [],
      backlinks: []
    };
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C4f0B3u3.js')).default;
const universal_id = "src/routes/search/+page.js";
const imports = ["_app/immutable/nodes/8.CuDiwG2e.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/1yZpvcLQ.js","_app/immutable/chunks/CBkoNQdp.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/Dzz9Ws4N.js","_app/immutable/chunks/B9GwK8tt.js","_app/immutable/chunks/C4Ckgbfu.js","_app/immutable/chunks/B0j1-IUC.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=8-Da_EZdTT.js.map
