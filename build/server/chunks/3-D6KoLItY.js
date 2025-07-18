import { b as fetchAuthor, f as fetchPosts, c as fetchPostsByAuthor } from './wordpress-CsCrVOck.js';
import 'axios';

async function load({ params }) {
  try {
    const [author, lasttextData, backlinksRes] = await Promise.all([
      fetchAuthor(params.slug),
      fetchPosts(1, 12),
      fetch("https://rooidadha.ir/wp-json/backlink/v1/links")
    ]);
    const backlinks = await backlinksRes.json();
    let posts = [];
    let totalPages = 1;
    let seo = null;
    if (author && author.id) {
      console.log("Fetching posts for author ID:", author.id);
      const result = await fetchPostsByAuthor(author.id, 1);
      posts = result.posts;
      totalPages = result.totalPages;
      const authorDescription = author.description || `مطالب ${author.name}`;
      seo = {
        title: `${author.name} | پایگاه خبری تحلیلی رسا نشر`,
        description: authorDescription,
        robots: "index, follow",
        og: {
          title: `${author.name} | رسا نشر`,
          description: authorDescription,
          type: "website",
          site_name: "رسا نشر",
          locale: "fa_IR"
        },
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "name": author.name,
          "description": authorDescription,
          "url": `https://rasanashr.ir/author/${params.slug}`,
          "publisher": {
            "@type": "Organization",
            "name": "پایگاه خبری تحلیلی رسا نشر",
            "url": "https://rasanashr.ir"
          }
        }
      };
    } else {
      console.error("Author not found or invalid author ID");
    }
    return {
      author,
      posts,
      totalPages,
      seo,
      lasttextPosts: lasttextData.posts,
      backlinks
    };
  } catch (error) {
    console.error("Error in load function:", error);
    return {
      author: null,
      posts: [],
      totalPages: 1,
      seo: null,
      lasttextPosts: [],
      backlinks: []
    };
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-lQ84x7GL.js')).default;
const universal_id = "src/routes/author/[slug]/+page.js";
const imports = ["_app/immutable/nodes/3.DjL5S7ri.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/1yZpvcLQ.js","_app/immutable/chunks/CBkoNQdp.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/Dzz9Ws4N.js","_app/immutable/chunks/C4Ckgbfu.js","_app/immutable/chunks/B0j1-IUC.js","_app/immutable/chunks/B9GwK8tt.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=3-D6KoLItY.js.map
