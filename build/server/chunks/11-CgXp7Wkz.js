import { j as fetchPost, f as fetchPosts, k as fetchRelatedPosts } from './wordpress-CsCrVOck.js';
import { e as error } from './index2-CvuFLVuQ.js';
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
    console.error("خطا در بارگذاری صفحه:", err);
    throw error(404, "پست پیدا نشد");
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-gf7xKOvn.js')).default;
const universal_id = "src/routes/[id]/[slug]/+page.js";
const imports = ["_app/immutable/nodes/11.BCg16Jbr.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/Dzz9Ws4N.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/B9GwK8tt.js","_app/immutable/chunks/1yZpvcLQ.js","_app/immutable/chunks/CBkoNQdp.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=11-CgXp7Wkz.js.map
