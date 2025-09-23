import { g as fetchAuthor, a as fetchPosts, b as fetchPostsByAuthor } from './wordpress-ByJ8dGUg.js';
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
      const result = await fetchPostsByAuthor(author.id, 1);
      posts = result.posts;
      totalPages = result.totalPages;
      const authorDescription = author.description || `مطالب ${author.name}`;
      seo = {
        title: `${author.name} | پایگاه خبری تحلیلی رسانه روز`,
        description: authorDescription,
        robots: "index, follow",
        og: {
          title: `${author.name} | رسانه روز`,
          description: authorDescription,
          type: "website",
          site_name: "رسانه روز",
          locale: "fa_IR"
        },
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "name": author.name,
          "description": authorDescription,
          "url": `https://rasarooz.ir/author/${params.slug}`,
          "publisher": {
            "@type": "Organization",
            "name": "پایگاه خبری تحلیلی رسانه روز",
            "url": "https://rasarooz.ir"
          }
        }
      };
    } else {
      if (process.env.NODE_ENV === "production") {
        console.error(`Author not found: ${params.slug}`);
      }
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
    if (process.env.NODE_ENV === "production") {
      console.error(`Author page error [slug=${params.slug}]: ${error.message}`);
    }
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
const component = async () => component_cache ??= (await import('./_page.svelte-CJoVbzL7.js')).default;
const universal_id = "src/routes/author/[slug]/+page.js";
const imports = ["_app/immutable/nodes/3.BUfkw-cJ.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/B4yyLVG6.js","_app/immutable/chunks/B-yy7loJ.js","_app/immutable/chunks/BThVNy5y.js"];
const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=3-B4XphwRh.js.map
