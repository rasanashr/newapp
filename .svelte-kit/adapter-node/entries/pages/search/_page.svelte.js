import { E as fallback, I as store_get, R as head, K as unsubscribe_stores, F as bind_props, C as pop, z as push, D as escape_html, G as attr, N as ensure_array_like, P as stringify } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
import { g as goto } from "../../../chunks/client.js";
import { S as Sidebar } from "../../../chunks/Sidebar.js";
import { P as Pagination } from "../../../chunks/Pagination.js";
import { h as html } from "../../../chunks/html.js";
function SearchSEO($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUrl, title, description, og, canonical;
  let query = fallback($$props["query"], "");
  currentUrl = `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  title = query ? `جستجو: ${query} | رسا نشر` : "جستجو در رسا نشر";
  description = query ? `نتایج جستجو برای ${query} در پایگاه خبری تحلیلی رسا نشر` : "جستجو در مطالب پایگاه خبری تحلیلی رسا نشر";
  og = {
    title,
    description,
    type: "website",
    url: currentUrl,
    site_name: "رسا نشر",
    locale: "fa_IR"
  };
  canonical = "https://rasanashr.ir/search";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", description)}> <meta name="robots" content="noindex, follow"> <link rel="canonical"${attr("href", canonical)}> <meta property="og:title"${attr("content", og.title)}> <meta property="og:description"${attr("content", og.description)}> <meta property="og:type"${attr("content", og.type)}> <meta property="og:url"${attr("content", og.url)}> <meta property="og:site_name"${attr("content", og.site_name)}> <meta property="og:locale"${attr("content", og.locale)}>`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { query });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUrl;
  let data = $$props["data"];
  let searchInput = data.query;
  let posts = data.posts;
  let totalPages = data.totalPages;
  let currentPage = data.currentPage;
  function handlePageChange(page2) {
    goto();
  }
  currentUrl = `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}${store_get($$store_subs ??= {}, "$page", page).url.search}`;
  {
    posts = data.posts;
    totalPages = data.totalPages;
    currentPage = data.currentPage;
  }
  SearchSEO($$payload, { query: data.query, currentUrl });
  $$payload.out += `<!----> <div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-2/3"><form class="mb-8 flex gap-2 bg-white p-4 rounded-lg shadow-lg"><input type="search"${attr("value", searchInput)} placeholder="جستجو در مطالب..." class="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"> <button type="submit" class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">جستجو</button></form> `;
  if (data.query) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h1 class="text-lg font-bold lg:text-3xl text-justify mb-6">نتایج جستجو برای: ${escape_html(data.query)}</h1> `;
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
          onPageChange: handlePageChange
        });
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="text-xl text-gray-600 text-center py-12">نتیجه‌ای برای جستجوی شما یافت نشد.</p>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-12 text-gray-600">لطفاً عبارت مورد نظر خود را جستجو کنید.</div>`;
  }
  $$payload.out += `<!--]--></div> `;
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
