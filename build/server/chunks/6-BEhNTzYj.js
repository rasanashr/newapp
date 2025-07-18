import { f as fetchPosts } from './wordpress-CsCrVOck.js';
import 'axios';

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

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CPxRq7qL.js')).default;
const universal_id = "src/routes/lastnews/+page.js";
const imports = ["_app/immutable/nodes/6.Bc_TQaax.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/CoueGlLg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=6-BEhNTzYj.js.map
