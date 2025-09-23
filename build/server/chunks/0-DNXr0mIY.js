import { e as fetchCategories } from './wordpress-ByJ8dGUg.js';
import 'axios';

async function load() {
  const categories = await fetchCategories();
  return {
    categories
  };
}

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-CJtrEthI.js')).default;
const server_id = "src/routes/+layout.server.js";
const imports = ["_app/immutable/nodes/0.CT5pc8pi.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/CYkpaUwJ.js","_app/immutable/chunks/B-yy7loJ.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/3CALFuJD.js"];
const stylesheets = ["_app/immutable/assets/0.Dr1P5f1C.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server as server, server_id, stylesheets };
//# sourceMappingURL=0-DNXr0mIY.js.map
