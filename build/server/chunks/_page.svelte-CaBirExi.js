import { w as push, D as store_get, K as escape_html, O as ensure_array_like, I as attr, R as stringify, F as unsubscribe_stores, J as bind_props, y as pop, G as fallback, N as head } from './index-Dyzm0Ju0.js';
import { i as fetchPostsByTag } from './wordpress-CsCrVOck.js';
import { p as page } from './stores-CvIym1KU.js';
import { S as Sidebar } from './Sidebar-DO8OzuZI.js';
import { P as Pagination } from './Pagination-BXO9Fm9U.js';
import { h as html } from './html-FW6Ia4bL.js';
import 'axios';
import './Lasttext-BfLBGSG_.js';

function TagSEO($$payload, $$props) {
  push();
  var $$store_subs;
  let metaData, currentUrl;
  let tag = fallback($$props["tag"], null);
  const defaultMetaData = {
    title: "آرشیو برچسب‌ها | رسا نشر",
    description: "مطالب برچسب‌گذاری شده در رسا نشر",
    canonical: "https://rasanashr.ir/tag",
    ogTitle: "آرشیو برچسب‌ها | رسا نشر",
    ogDescription: "مجموعه مطالب برچسب‌گذاری شده در رسا نشر",
    ogType: "website",
    ogSite_name: "رسا نشر"
  };
  metaData = tag?.name ? {
    title: `${tag.name} | رسا نشر`,
    description: tag.description || `مطالب مرتبط با برچسب ${tag.name} در رسا نشر`,
    canonical: `https://rasanashr.ir/tag/${tag.slug}`,
    ogTitle: `${tag.name} | رسا نشر`,
    ogDescription: tag.description || `مطالب مرتبط با برچسب ${tag.name}`,
    ogType: "website",
    ogSite_name: "رسا نشر"
  } : defaultMetaData;
  currentUrl = `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(metaData.title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", metaData.description)}> <link rel="canonical"${attr("href", metaData.canonical)}> <meta property="og:title"${attr("content", metaData.ogTitle)}> <meta property="og:description"${attr("content", metaData.ogDescription)}> <meta property="og:type"${attr("content", metaData.ogType)}> <meta property="og:url"${attr("content", currentUrl)}> <meta property="og:site_name"${attr("content", metaData.ogSite_name)}> <meta property="og:locale" content="fa_IR">`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { tag });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let posts = data.posts;
  let tag = data.tag;
  let totalPages = data.totalPages;
  let currentPage = 1;
  async function loadPosts(tagId, page2 = 1) {
    const result = await fetchPostsByTag(tagId, page2);
    posts = result.posts;
    totalPages = result.totalPages;
    currentPage = page2;
  }
  `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  data.tag?.name || "";
  TagSEO($$payload, { tag: data.tag });
  $$payload.out += `<!----> <div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-2/3">`;
  if (tag) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h1 class="text-lg font-bold lg:text-3xl text-justify mt-3 mb-4">مطالب مرتبط با برچسب: ${escape_html(tag.name)}</h1> `;
    if (posts && posts.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(posts);
      $$payload.out += `<div class="space-y-4"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let post = each_array[$$index];
        $$payload.out += `<article class="bg-stone-100 rounded-lg shadow-lg overflow-hidden">`;
        if (post._embedded && post._embedded["wp:featuredmedia"]) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-[98%] h-50 object-cover rounded-xl">`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="p-6"><h2 class="text-lg font-bold lg:text-xl text-justify mb-4"><a${attr("href", `/${stringify(post.id)}/${stringify(post.slug)}`)} class="hover:text-red-600">${html(post.title.rendered)}</a></h2> <div class="prose prose-lg max-w-none mb-4 text-gray-600 text-justify leading-7">${html(post.excerpt.rendered)}</div></div></article>`;
      }
      $$payload.out += `<!--]--></div> `;
      if (totalPages > 1) {
        $$payload.out += "<!--[-->";
        Pagination($$payload, {
          currentPage,
          totalPages,
          onPageChange: (page2) => loadPosts(tag.id, page2)
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="text-xl text-gray-600 text-center py-12">مطلبی با این برچسب یافت نشد.</p>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-12"><p class="text-xl text-gray-600">در حال بارگذاری...</p></div>`;
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
//# sourceMappingURL=_page.svelte-CaBirExi.js.map
