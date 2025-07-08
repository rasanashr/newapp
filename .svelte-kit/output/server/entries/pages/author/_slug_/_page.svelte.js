import { E as fallback, R as head, F as bind_props, C as pop, z as push, D as escape_html, G as attr, I as store_get, N as ensure_array_like, P as stringify, K as unsubscribe_stores } from "../../../../chunks/index.js";
import { e as fetchPostsByAuthor } from "../../../../chunks/wordpress.js";
import { S as Sidebar } from "../../../../chunks/Sidebar.js";
import { P as Pagination } from "../../../../chunks/Pagination.js";
import { p as page } from "../../../../chunks/stores.js";
import { h as html } from "../../../../chunks/html.js";
function AuthorSEO($$payload, $$props) {
  push();
  let metaTitle, metaDescription, metaOg;
  let author = fallback($$props["author"], null);
  let seo = fallback($$props["seo"], null);
  metaTitle = seo?.title || (author ? `${author.name} | رسا نشر` : "رسا نشر");
  metaDescription = seo?.description || author?.description || (author ? `مطالب ${author.name}` : "پایگاه خبری رسا نشر");
  metaOg = seo?.og || {};
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(metaTitle)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", metaDescription)}> <meta name="robots" content="index, follow"> `;
    if (author) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<meta name="author"${attr("content", author.name)}>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <meta property="og:title"${attr("content", metaOg.title || metaTitle)}> <meta property="og:description"${attr("content", metaOg.description || metaDescription)}> <meta property="og:type"${attr("content", metaOg.type || "website")}> <meta property="og:site_name"${attr("content", metaOg.site_name || "رسا نشر")}> <meta property="og:locale"${attr("content", metaOg.locale || "fa_IR")}> `;
    if (author) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: author.name,
        description: author.description || \`مطالب \${author.name}\`,
        publisher: {
          "@type": "Organization",
          name: "رسا نشر",
          url: "https://rasanashr.ir"
        }
      })}
    <\/script><!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  });
  bind_props($$props, { author, seo });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let posts = data.posts;
  let author = data.author;
  let totalPages = data.totalPages;
  let currentPage = 1;
  let seo = data.seo;
  let loading = false;
  async function loadPosts(authorId, page2 = 1) {
    try {
      loading = true;
      const result = await fetchPostsByAuthor(authorId, page2);
      posts = result.posts;
      totalPages = result.totalPages;
      currentPage = page2;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      loading = false;
    }
  }
  `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  AuthorSEO($$payload, { author, seo });
  $$payload.out += `<!----> <div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-2/3">`;
  if (author) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="bg-white rounded-lg shadow-lg p-8 mb-8"><h1 class="text-lg font-bold lg:text-3xl text-justify mb-4">${escape_html(author.name)}</h1> `;
    if (author.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="prose prose-lg text-md lg:text-lg max-w-none mb-4 text-gray-500 text-justify leading-6">${html(author.description)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (posts && posts.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(posts);
      $$payload.out += `<div class="space-y-8"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let post = each_array[$$index];
        $$payload.out += `<article class="bg-stone-100 rounded-lg shadow-lg overflow-hidden">`;
        if (post._embedded && post._embedded["wp:featuredmedia"]) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-[98%] h-50 object-cover rounded-xl">`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="p-6"><h2 class="text-lg font-bold lg:text-2xl text-justify mb-4"><a${attr("href", `/${stringify(post.id)}/${stringify(post.slug)}`)} class="hover:text-red-600">${html(post.title.rendered)}</a></h2> <div class="prose prose-lg max-w-none mb-4 text-gray-600 text-justify leading-7">${html(post.excerpt.rendered)}</div></div></article>`;
      }
      $$payload.out += `<!--]--></div> `;
      if (totalPages > 1) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-8">`;
        Pagination($$payload, {
          currentPage,
          totalPages,
          onPageChange: (page2) => loadPosts(author.id, page2)
        });
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-center py-8"><p class="text-xl text-gray-600">هیچ مطلبی از این نویسنده یافت نشد.</p></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-8"><h1 class="text-3xl font-bold mb-4">نویسنده یافت نشد</h1> <p class="text-xl text-gray-600">متأسفانه نویسنده مورد نظر شما در سایت وجود ندارد.</p> <a href="/" class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">بازگشت به صفحه اصلی</a></div>`;
  }
  $$payload.out += `<!--]--> <div class="mb-15"></div></div> `;
  Sidebar($$payload, {
    lasttextPosts: data.lasttextPosts,
    backlinks: data.backlinks
  });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
