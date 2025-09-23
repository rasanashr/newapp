import { a as fetchPosts } from './wordpress-ByJ8dGUg.js';
import 'axios';

async function load() {
  try {
    const akharinkhabarData = await fetchPosts(1, 50);
    return {
      akharinkhabarPosts: akharinkhabarData.posts
    };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error(`Last news page load error: ${error.message}`);
    }
    return {
      akharinkhabarPosts: []
    };
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DnC7FWxA.js')).default;
const universal_id = "src/routes/lastnews/+page.js";
const imports = ["_app/immutable/nodes/7.C9c91OpQ.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CakbJC7y.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=7-BSPJxNIS.js.map
