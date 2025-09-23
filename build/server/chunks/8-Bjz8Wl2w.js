import { i as fetchPage, a as fetchPosts } from './wordpress-ByJ8dGUg.js';
import 'axios';

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
    if (process.env.NODE_ENV === "production") {
      console.error(`Error loading page [slug=${params.slug}]: ${error.message}`);
    }
    return {
      page: null,
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
const component = async () => component_cache ??= (await import('./_page.svelte-B3zzktyL.js')).default;
const universal_id = "src/routes/page/[slug]/+page.js";
const imports = ["_app/immutable/nodes/8.DjnCc4rU.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/BDxagX-Y.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=8-Bjz8Wl2w.js.map
