async function load({ fetch }) {
  let lasttextPosts = [];
  let backlinks = [];
  try {
    const response = await fetch("https://rooidadha.ir/wp-json/wp/v2/posts?per_page=5&_embed=true");
    if (response.ok) {
      lasttextPosts = await response.json();
    }
  } catch (error) {
    console.error("Error fetching latest posts:", error);
  }
  try {
    const backlinksResponse = await fetch("https://rooidadha.ir/wp-json/backlink/v1/links");
    if (backlinksResponse.ok) {
      backlinks = await backlinksResponse.json();
    }
  } catch (error) {
    console.error("Error fetching popular posts:", error);
  }
  return {
    lasttextPosts,
    backlinks
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cn4SNxmX.js')).default;
const universal_id = "src/routes/freegrokchat/+page.js";
const imports = ["_app/immutable/nodes/6.Ce6oC7Nx.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/B-yy7loJ.js","_app/immutable/chunks/CWmzcjye.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css","_app/immutable/assets/6.Bq9-XhJt.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=6-BJqQ0O91.js.map
