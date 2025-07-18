import { d as fetchCategories } from './wordpress-CsCrVOck.js';
import 'axios';

async function load() {
  try {
    const categories = await fetchCategories();
    return {
      categories,
      status: 200
    };
  } catch (error) {
    console.error("Error loading categories:", error);
    return {
      categories: [],
      status: 500
    };
  }
}

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CZlJTAuu.js')).default;
const universal_id = "src/routes/categories/+page.ts";
const imports = ["_app/immutable/nodes/4.TDBshYzO.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/B0j1-IUC.js"];
const stylesheets = ["_app/immutable/assets/4.CeUHtxGJ.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=4-ClWexRwR.js.map
