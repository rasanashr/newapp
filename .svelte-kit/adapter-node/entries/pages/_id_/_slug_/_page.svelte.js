import { I as store_get, R as head, K as unsubscribe_stores, F as bind_props, C as pop, z as push, D as escape_html, G as attr, E as fallback, N as ensure_array_like, P as stringify } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { h as html } from "../../../../chunks/html.js";
import { S as Sidebar } from "../../../../chunks/Sidebar.js";
import "../../../../chunks/client.js";
function PostSEO($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUrl, title, description, keywords, og, canonical, schema;
  let post = $$props["post"];
  currentUrl = `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  title = post ? `${post.title.rendered} | رسا نشر` : "رسا نشر";
  description = post?.excerpt?.rendered?.replace(/<[^>]*>/g, "").slice(0, 160) || "";
  keywords = post?.tags_info?.map((tag) => tag.name).join(", ") || "";
  og = {
    title,
    description,
    type: "article",
    url: currentUrl,
    image: post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    site_name: "رسا نشر",
    locale: "fa_IR",
    "article:published_time": post?.date,
    "article:modified_time": post?.modified
  };
  canonical = currentUrl;
  schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post?.title?.rendered,
    description,
    image: post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    datePublished: post?.date,
    dateModified: post?.modified,
    author: {
      "@type": "Person",
      name: post?._embedded?.author?.[0]?.name || "رسا نشر"
    },
    publisher: {
      "@type": "Organization",
      name: "رسا نشر",
      logo: {
        "@type": "ImageObject",
        url: "https://rasanashr.ir/duc.png"
      }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": currentUrl }
  };
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", description)}> <meta name="keywords"${attr("content", keywords)}> <meta name="robots" content="index, follow"> <meta name="author"${attr("content", post?._embedded?.author?.[0]?.name || "رسا نشر")}> <link rel="canonical"${attr("href", canonical)}> <meta property="og:title"${attr("content", og.title)}> <meta property="og:description"${attr("content", og.description)}> <meta property="og:type"${attr("content", og.type)}> <meta property="og:url"${attr("content", og.url)}> <meta property="og:image"${attr("content", og.image)}> <meta property="og:site_name"${attr("content", og.site_name)}> <meta property="og:locale"${attr("content", og.locale)}> <meta property="article:published_time"${attr("content", og["article:published_time"])}> <meta property="article:modified_time"${attr("content", og["article:modified_time"])}> ${html(`<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`)}`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { post });
  pop();
}
function Comments($$payload, $$props) {
  push();
  let postId = $$props["postId"];
  let comments = [];
  $$payload.out += `<div class="comments-section mt-8 bg-white rounded-lg shadow-lg p-6"><div class="flex justify-between items-center mb-6"><h4 class="text-xl text-black font-bold">نظرات (${escape_html(comments.length)})</h4> <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200">نوشتن نظر</button></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center py-4"><p>در حال بارگذاری نظرات...</p></div>`;
  }
  $$payload.out += `<!--]--></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { postId });
  pop();
}
function RelatedPosts($$payload, $$props) {
  push();
  let relatedPosts = fallback($$props["relatedPosts"], () => [], true);
  if (relatedPosts?.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(relatedPosts.slice(0, 3));
    $$payload.out += `<div class="my-8"><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-red-600 rounded-full"></div> <h3 class="text-lg font-bold text-red-800">مطالب مرتبط</h3></div> <div class="space-y-2"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<a${attr("href", `/${post.id}/${post.slug}`)} class="block p-3 bg-red-50 hover:bg-red-100 transition-colors rounded-lg border-r-4 border-red-500"><h4 class="font-medium text-gray-800 line-clamp-1">${html(post.title.rendered)}</h4></a>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { relatedPosts });
  pop();
}
function _page($$payload, $$props) {
  push();
  let post;
  let data = $$props["data"];
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "persian"
    };
    return new Intl.DateTimeFormat("fa-IR", options).format(date);
  }
  post = data.post;
  PostSEO($$payload, { post: data.post });
  $$payload.out += `<!----> <div class="flex flex-col lg:flex-row gap-8 w-full"><div class="w-full lg:w-2/3 text-justify">`;
  if (post) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<article class="rounded-lg shadow-lg overflow-hidden"><div class="p-4"><h1 class="text-lg font-bold mb-4 pt-2 lg:text-3xl text-justify text-black">${html(post.title.rendered)}</h1> <div class="flex items-center gap-4 text-gray-600 mb-8 text-sm">`;
    if (post._embedded && post._embedded.author) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> <a${attr("href", `/author/${stringify(post._embedded.author[0].slug)}`)} class="hover:text-red-600">${escape_html(post._embedded.author[0].name)}</a></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span>${escape_html(formatDate(post.date))}</span></div></div> <div class="prose prose-lg max-w-none mb-8 px-1 text-justify leading-9 text-black">${html(post.content.rendered)}</div> `;
    if (data.relatedPosts && data.relatedPosts.length > 0) {
      $$payload.out += "<!--[-->";
      RelatedPosts($$payload, { relatedPosts: data.relatedPosts });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (post._embedded && post._embedded["wp:term"]) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(post._embedded["wp:term"].find((terms) => terms[0]?.taxonomy === "post_tag") || []);
      $$payload.out += `<div class="border-t pt-6"><h3 class="text-lg text-black font-bold mb-4">برچسب‌ها:</h3> <div class="flex flex-wrap gap-2"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$payload.out += `<a${attr("href", `/tag/${stringify(tag.slug)}`)} class="inline-block bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full px-3 py-1 text-sm">${escape_html(tag.name)}</a>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></article> `;
    Comments($$payload, { postId: post.id });
    $$payload.out += `<!----> <div class="mb-8"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-12"><p class="text-xl text-gray-600">در حال بارگذاری...</p></div>`;
  }
  $$payload.out += `<!--]--></div> `;
  Sidebar($$payload, {
    lasttextPosts: data.lasttextPosts,
    backlinks: data.backlinks
  });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
