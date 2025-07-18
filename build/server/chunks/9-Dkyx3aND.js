import { h as fetchTag, f as fetchPosts, i as fetchPostsByTag } from './wordpress-CsCrVOck.js';
import 'axios';

async function load({ params }) {
  const tag = await fetchTag(params.slug);
  if (!tag) {
    const [lasttextData2, backlinksRes2] = await Promise.all([
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
    ]);
    const backlinks2 = await backlinksRes2.json();
    return {
      tag: null,
      posts: [],
      totalPages: 1,
      lasttextPosts: lasttextData2.posts,
      backlinks: backlinks2
    };
  }
  const [tagData, lasttextData, backlinksRes] = await Promise.all([
    fetchPostsByTag(tag.id, 1),
    fetchPosts(1, 12),
    fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
  ]);
  const backlinks = await backlinksRes.json();
  return {
    tag,
    posts: tagData.posts,
    totalPages: tagData.totalPages,
    lasttextPosts: lasttextData.posts,
    backlinks
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CaBirExi.js')).default;
const universal_id = "src/routes/tag/[slug]/+page.js";
const imports = ["_app/immutable/nodes/9.DLsb-8Pg.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/B9GwK8tt.js","_app/immutable/chunks/Dzz9Ws4N.js","_app/immutable/chunks/1yZpvcLQ.js","_app/immutable/chunks/CBkoNQdp.js","_app/immutable/chunks/C4Ckgbfu.js","_app/immutable/chunks/B0j1-IUC.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=9-Dkyx3aND.js.map
