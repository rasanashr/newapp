import { a as fetchPosts, c as fetchPostsByCategory } from './wordpress-ByJ8dGUg.js';
import 'axios';

async function load({ fetch }) {
  try {
    const [result, mediapostData, firstnewsData, notofdayData, slider1Data, lasttextData] = await Promise.all([
      fetchPosts(1, 12),
      fetchPostsByCategory([61, 113, 66], 1, 13),
      fetchPostsByCategory(7, 1, 7),
      fetchPostsByCategory(276, 1, 1),
      fetchPostsByCategory(7, 1, 4),
      // slider1 - 4 پست
      fetchPosts(1, 12)
      // lasttext
    ]);
    let data = {
      posts: result.posts,
      totalPages: result.totalPages,
      mediapostPosts: mediapostData.posts,
      firstnewsPosts: firstnewsData.posts,
      notofdayPosts: notofdayData.posts,
      slider1Posts: slider1Data.posts,
      // اضافه کردن slider1
      lasttextPosts: lasttextData.posts,
      // اضافه کردن lasttext
      seo: {
        // ...existing code...
      }
    };
    const secondaryDataPromise = Promise.all([
      fetchPostsByCategory([136, 76], 1, 5),
      // shortpic
      fetchPostsByCategory([81, 70, 792], 1, 7),
      // piccard
      fetchPostsByCategory(627, 1, 5),
      // minicard
      fetchPostsByCategory(8, 1, 1),
      // singlecard1
      fetchPostsByCategory(4778, 1, 1),
      // singlecard2
      fetchPostsByCategory(2, 1, 1),
      // singlecard3
      fetchPostsByCategory(188, 1, 1),
      // singlecard4
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links").then((res) => res.json())
    ]).catch((err) => {
      console.error("Secondary data fetch error:", err);
      return Array(8).fill({ posts: [] });
    });
    const [
      shortpicData,
      piccardData,
      minicardData,
      singlecard1Data,
      singlecard2Data,
      singlecard3Data,
      singlecard4Data,
      backlinks
    ] = await secondaryDataPromise;
    return {
      ...data,
      shortpicPosts: shortpicData.posts,
      piccardPosts: piccardData.posts,
      minicardPosts: minicardData.posts,
      singlecard1Posts: singlecard1Data.posts,
      singlecard2Posts: singlecard2Data.posts,
      singlecard3Posts: singlecard3Data.posts,
      singlecard4Posts: singlecard4Data.posts,
      backlinks
    };
  } catch (error) {
    console.error("Error in home page load function:", error);
    return {
      posts: [],
      totalPages: 1,
      seo: null
    };
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BPjev9rH.js')).default;
const universal_id = "src/routes/+page.js";
const imports = ["_app/immutable/nodes/2.C2PdMMUQ.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/B-yy7loJ.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/3CALFuJD.js"];
const stylesheets = ["_app/immutable/assets/2.D690OItg.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=2-Dc5WppMa.js.map
