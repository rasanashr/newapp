import { d as fetchAuthor, a as fetchPosts, e as fetchPostsByAuthor } from "../../../../chunks/wordpress.js";
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
export {
  load
};
