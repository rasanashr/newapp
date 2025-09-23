import { j as fetchTag, a as fetchPosts, d as fetchPostsByTag } from './wordpress-ByJ8dGUg.js';
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

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DeKXFMAE.js')).default;
const universal_id = "src/routes/tag/[slug]/+page.js";
const imports = ["_app/immutable/nodes/10.7ZeuSCjt.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/B4yyLVG6.js","_app/immutable/chunks/B-yy7loJ.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=10-BefcYANQ.js.map
