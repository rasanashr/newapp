import { s as searchPosts, a as fetchPosts } from './wordpress-ByJ8dGUg.js';
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
    if (process.env.NODE_ENV === "production") {
      console.error(`Search page error [q=${query}]: ${error.message}`);
    }
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

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-uIZWGw8n.js')).default;
const universal_id = "src/routes/search/+page.js";
const imports = ["_app/immutable/nodes/9.Jmc5_DOm.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/B4yyLVG6.js","_app/immutable/chunks/B-yy7loJ.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=9--nmEysr9.js.map
