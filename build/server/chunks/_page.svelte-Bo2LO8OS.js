import { w as push, D as store_get, K as escape_html, O as ensure_array_like, I as attr, R as stringify, F as unsubscribe_stores, J as bind_props, y as pop, N as head } from './index-Dyzm0Ju0.js';
import { a as fetchPostsByCategory } from './wordpress-CsCrVOck.js';
import { S as Sidebar } from './Sidebar-DO8OzuZI.js';
import { p as page } from './stores-CvIym1KU.js';
import { h as html } from './html-FW6Ia4bL.js';
import { P as Pagination } from './Pagination-BXO9Fm9U.js';
import 'axios';
import './Lasttext-BfLBGSG_.js';

function CategorySEO($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUrl, title, description, keywords, og, canonical, schema;
  let seo = $$props["seo"];
  let category = $$props["category"];
  currentUrl = `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  title = category ? `${category.name} | رسا نشر` : "رسا نشر";
  description = seo?.description || `آرشیو مطالب دسته ${category?.name} در رسا نشر`;
  keywords = category ? `${category.name}, رسا نشر, اخبار ${category.name}` : "";
  og = {
    title,
    description,
    type: "website",
    url: currentUrl,
    site_name: "رسا نشر",
    locale: "fa_IR"
  };
  canonical = currentUrl;
  schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: currentUrl,
    publisher: {
      "@type": "Organization",
      name: "رسا نشر",
      logo: {
        "@type": "ImageObject",
        url: "https://rasanashr.ir/duc.png"
      }
    }
  };
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", description)}> <meta name="keywords"${attr("content", keywords)}> <meta name="robots" content="index, follow"> <link rel="canonical"${attr("href", canonical)}> <meta property="og:title"${attr("content", og.title)}> <meta property="og:description"${attr("content", og.description)}> <meta property="og:type"${attr("content", og.type)}> <meta property="og:url"${attr("content", og.url)}> <meta property="og:site_name"${attr("content", og.site_name)}> <meta property="og:locale"${attr("content", og.locale)}> ${html(`<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`)}`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { seo, category });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let posts = data.posts;
  let category = data.category;
  let totalPages = data.totalPages;
  let currentPage = 1;
  let seo = data.seo;
  let loading = false;
  async function loadPosts(categoryId, page2 = 1) {
    try {
      loading = true;
      const result = await fetchPostsByCategory(categoryId, page2);
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
  CategorySEO($$payload, { category, seo });
  $$payload.out += `<!----> <div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-2/3">`;
  if (category) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h1 class="text-lg font-bold lg:text-3xl text-justify mt-4">دسته‌بندی: ${escape_html(category.name)}</h1> `;
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
        Pagination($$payload, {
          currentPage,
          totalPages,
          onPageChange: (page2) => loadPosts(category.id, page2)
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-center py-8"><p class="text-xl text-gray-600">هیچ مطلبی در این دسته‌بندی یافت نشد.</p></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-8"><h1 class="text-3xl font-bold mb-4">دسته‌بندی یافت نشد</h1> <p class="text-xl text-gray-600">متأسفانه دسته‌بندی مورد نظر شما در سایت وجود ندارد.</p> <a href="/" class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">بازگشت به صفحه اصلی</a></div>`;
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

export { _page as default };
//# sourceMappingURL=_page.svelte-Bo2LO8OS.js.map
