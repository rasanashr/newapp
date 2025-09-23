import { k as fetchPost, a as fetchPosts, l as fetchRelatedPosts } from './wordpress-ByJ8dGUg.js';
import { e as error } from './index-CvuFLVuQ.js';
import 'axios';

async function load({ params, fetch }) {
  try {
    const post = await fetchPost(params.id);
    if (!post || post.status !== "publish") {
      throw error(404, "پست پیدا نشد");
    }
    const categoryIds = post._embedded?.["wp:term"]?.[0]?.map((cat) => cat.id) || [];
    const [lasttextData, backlinksRes, relatedPosts] = await Promise.all([
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links"),
      fetchRelatedPosts(params.id, categoryIds, 3)
    ]);
    const backlinks = await backlinksRes.json();
    return {
      post,
      lasttextPosts: lasttextData.posts,
      backlinks,
      relatedPosts
    };
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      console.error(`Error loading post [id=${params.id}, slug=${params.slug}]: ${err.message}`);
    }
    throw error(404, "پست پیدا نشد");
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BpM15Zqn.js')).default;
const universal_id = "src/routes/[id]/[slug]/+page.js";
const imports = ["_app/immutable/nodes/12.DDfFDeBp.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/CWmzcjye.js","_app/immutable/chunks/CYkpaUwJ.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css","_app/immutable/assets/12.CUcwcBKe.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=12-DCq2Wq3k.js.map
