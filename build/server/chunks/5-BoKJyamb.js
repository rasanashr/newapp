import { h as fetchCategory, c as fetchPostsByCategory, a as fetchPosts } from './wordpress-ByJ8dGUg.js';
import 'axios';

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

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D3L07yps.js')).default;
const universal_id = "src/routes/category/[slug]/+page.js";
const imports = ["_app/immutable/nodes/5.Dinkzi7P.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/B4yyLVG6.js","_app/immutable/chunks/B-yy7loJ.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=5-BoKJyamb.js.map
