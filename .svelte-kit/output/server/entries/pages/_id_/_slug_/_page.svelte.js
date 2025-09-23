import { j as store_get, i as head, u as unsubscribe_stores, c as bind_props, p as pop, d as push, a as escape_html, b as attr, f as fallback, e as ensure_array_like, l as slot, m as copy_payload, o as assign_payload, s as stringify } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { h as html } from "../../../../chunks/html.js";
import { S as Sidebar } from "../../../../chunks/Sidebar.js";
function decodeEntities(text) {
  if (!text) return "";
  return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, " ");
}
function cleanHtml(text) {
  if (!text) return "";
  text = text.replace(/متاسفانه مرورگر شما از ویدیو پشتیبانی نمی‌کند\.?/g, "");
  return decodeEntities(text.replace(/<[^>]*>/g, "")).trim();
}
function extractVideosFromContent(content) {
  if (!content) return [];
  const videoRegex = /<video[^>]*>.*?<source[^>]*src=["']([^"']+)["'][^>]*>/gis;
  const matches = [...content.matchAll(videoRegex)];
  return matches.map((m) => m[1]);
}
function createVideoSchema(videoUrl, post, thumbnailUrl, meta = {}) {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: cleanHtml(post.title?.rendered) || "ویدیو بدون عنوان",
    description: cleanHtml(post.excerpt?.rendered) || "ویدیوی رسانه روز",
    thumbnailUrl: [thumbnailUrl],
    uploadDate: post.date ? new Date(post.date).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
    contentUrl: videoUrl,
    embedUrl: videoUrl,
    publisher: {
      "@type": "Organization",
      name: "رسانه روز",
      logo: {
        "@type": "ImageObject",
        url: "https://rasarooz.ir/icon-512.png",
        width: "512",
        height: "512"
      }
    }
  };
  if (meta.duration) {
    videoSchema.duration = meta.duration;
  }
  if (meta.width) {
    videoSchema.width = meta.width;
  }
  if (meta.height) {
    videoSchema.height = meta.height;
  }
  return videoSchema;
}
function createPostSchema(post, currentUrl, breadcrumbs = null) {
  if (!post) return null;
  const authorName = post._embedded?.author?.[0]?.name || "رسانه روز";
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://rasarooz.ir/placeholder.jpg";
  const publishedDate = post.date ? new Date(post.date).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
  const modifiedDate = post.modified ? new Date(post.modified).toISOString() : publishedDate;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: cleanHtml(post.title?.rendered) || "مقاله بدون عنوان",
    description: cleanHtml(post.excerpt?.rendered) || "مقاله رسانه روز",
    image: [imageUrl],
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: cleanHtml(authorName),
      url: post._embedded?.author?.[0]?.link || "https://rasarooz.ir/about-us"
    },
    publisher: {
      "@type": "Organization",
      name: "رسانه روز",
      logo: {
        "@type": "ImageObject",
        url: "https://rasarooz.ir/icon-512.png",
        width: "512",
        height: "512"
      },
      url: "https://rasarooz.ir"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };
  const schemas = [articleSchema];
  if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        name: cleanHtml(item.name),
        item: item.position === breadcrumbs.length ? void 0 : item.item
      })).filter((item) => item.position <= breadcrumbs.length)
    });
  }
  const videoUrls = extractVideosFromContent(post.content?.rendered);
  if (videoUrls.length > 0) {
    videoUrls.forEach((url) => {
      const meta = {
        duration: post.meta?.video_duration || null,
        // PT45S
        width: post.meta?.video_width || null,
        // 720
        height: post.meta?.video_height || null
        // 1280
      };
      schemas.push(createVideoSchema(url, post, imageUrl, meta));
    });
  }
  return schemas;
}
function PostSEO($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUrl, breadcrumbs, title, description, keywords, canonical, og, schemaData;
  let post = $$props["post"];
  currentUrl = `https://rasarooz.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  breadcrumbs = [
    {
      position: 1,
      name: "خانه",
      item: "https://rasarooz.ir/"
    },
    ...(post?.categories_info || []).map((category, index) => ({
      position: index + 2,
      name: category.name,
      item: `https://rasarooz.ir/category/${category.slug}/`
    })),
    {
      position: (post?.categories_info?.length || 0) + 2,
      name: post?.title?.rendered || "",
      item: currentUrl.endsWith("/") ? currentUrl : `${currentUrl}/`
    }
  ];
  title = post ? `${post.title.rendered} | رسانه روز` : "رسانه روز";
  description = post?.excerpt?.rendered?.replace(/<[^>]*>/g, "").slice(0, 160) || "";
  keywords = post?.tags_info?.map((tag) => tag.name).join(", ") || "";
  canonical = currentUrl;
  og = {
    title,
    description,
    type: "article",
    url: currentUrl,
    image: post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    site_name: "رسانه روز",
    locale: "fa_IR",
    "article:published_time": post?.date ? new Date(post.date).toISOString() : "",
    "article:modified_time": post?.modified ? new Date(post.modified).toISOString() : ""
  };
  schemaData = post ? createPostSchema(post, currentUrl, breadcrumbs) : null;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", description)}> <meta name="keywords"${attr("content", keywords)}> <meta name="robots" content="index, follow"> <meta name="author"${attr("content", post?._embedded?.author?.[0]?.name || "رسانه روز")}> <link rel="canonical"${attr("href", canonical)}> <meta property="og:title"${attr("content", og.title)}> <meta property="og:description"${attr("content", og.description)}> <meta property="og:type"${attr("content", og.type)}> <meta property="og:url"${attr("content", og.url)}> <meta property="og:image"${attr("content", og.image)}> <meta property="og:site_name"${attr("content", og.site_name)}> <meta property="og:locale"${attr("content", og.locale)}> <meta property="article:published_time"${attr("content", og["article:published_time"])}> <meta property="article:modified_time"${attr("content", og["article:modified_time"])}> `;
    if (schemaData) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `${html(`<script type="application/ld+json">${JSON.stringify(schemaData, null, 2)}<\/script>`)}`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { post });
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
function Modal($$payload, $$props) {
  let show = fallback($$props["show"], false);
  let title = fallback($$props["title"], "");
  if (show) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="fixed inset-0 z-50 flex items-center justify-center"><div class="fixed inset-0 bg-black opacity-50"></div> <div class="bg-white rounded-lg shadow-xl z-50 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] flex flex-col"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-xl font-semibold text-gray-900">${escape_html(title)}</h3></div> <div class="px-6 py-4 overflow-y-auto"><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></div> <div class="px-6 py-4 border-t border-gray-200"><!---->`;
    slot($$payload, $$props, "footer", {}, () => {
      $$payload.out += `<button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">بستن</button>`;
    });
    $$payload.out += `<!----></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { show, title });
}
function NewsVerification($$payload, $$props) {
  push();
  let post = $$props["post"];
  let remainingQuestions = 2;
  let showModal = false;
  let isLoading = false;
  let modalTitle = "";
  let userQuestion = "";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex gap-2 mt-4"><button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"${attr("disabled", isLoading, true)}>`;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> بررسی محتوا با هوش مصنوعی</button></div> `;
    Modal($$payload2, {
      title: modalTitle,
      get show() {
        return showModal;
      },
      set show($$value) {
        showModal = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<div class="prose max-w-none">`;
        {
          $$payload3.out += "<!--[!-->";
          $$payload3.out += `<div class="whitespace-pre-wrap text-justify">`;
          {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div>`;
        }
        $$payload3.out += `<!--]--></div>`;
      },
      $$slots: {
        default: true,
        footer: ($$payload3) => {
          {
            $$payload3.out += `<div class="flex flex-col gap-4">`;
            {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="flex flex-col gap-2"><div class="text-sm text-gray-600 text-left">سوالات باقیمانده: ${escape_html(remainingQuestions)}</div> <div class="flex items-center gap-2"><input type="text"${attr("value", userQuestion)} placeholder="سوال خود را درباره این خبر بپرسید..." class="flex-1 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"${attr("disabled", false, true)}> <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"${attr("disabled", !userQuestion.trim(), true)}>`;
              {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> ${escape_html("پرسیدن")}</button></div></div>`;
            }
            $$payload3.out += `<!--]--> <div class="flex justify-between"><button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">بستن</button> `;
            {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div></div>`;
          }
        }
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { post });
  pop();
}
function Breadcrumbs($$payload, $$props) {
  let items = fallback($$props["items"], () => [], true);
  let postTitle = fallback($$props["postTitle"], "");
  const each_array = ensure_array_like(items);
  $$payload.out += `<nav aria-label="Breadcrumb" class="text-sm text-gray-500 mb-2"><ol class="flex flex-wrap items-center gap-1 sm:gap-2 rtl:space-x-reverse"><li><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">خانه</a></li> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<li class="flex items-center"><span class="text-gray-400 dark:text-gray-600">/</span> <a${attr("href", item.href)} class="ml-2 hover:text-gray-700 dark:hover:text-gray-300 max-w-[120px] sm:max-w-none whitespace-nowrap overflow-hidden text-ellipsis">${escape_html(item.name)}</a></li>`;
  }
  $$payload.out += `<!--]--> `;
  if (postTitle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<li class="flex items-center"><span class="text-gray-400 dark:text-gray-600">/</span> <span class="ml-2 text-gray-700 dark:text-gray-400 max-w-[120px] sm:max-w-none whitespace-nowrap overflow-hidden text-ellipsis" aria-current="page">${escape_html(postTitle)}</span></li>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ol></nav>`;
  bind_props($$props, { items, postTitle });
}
function _page($$payload, $$props) {
  push();
  let post, primaryCategory, breadcrumbItems;
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
  primaryCategory = post?._embedded?.["wp:term"]?.[0]?.[0];
  breadcrumbItems = primaryCategory ? [
    {
      name: primaryCategory.name,
      href: `/category/${primaryCategory.slug}`
    }
  ] : [];
  PostSEO($$payload, { post: data.post });
  $$payload.out += `<!----> <div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-2/3">`;
  if (post) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<article class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="p-6">`;
    Breadcrumbs($$payload, {
      items: breadcrumbItems,
      postTitle: post.title.rendered
    });
    $$payload.out += `<!----> <h1 class="text-lg font-bold lg:text-3xl text-justify mt-4 mb-4 text-black">${html(post.title.rendered)}</h1> <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">`;
    if (post._embedded && post._embedded.author) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> <a${attr("href", `/author/${stringify(post._embedded.author[0].slug)}`)} class="hover:text-red-600 svelte-5qnj3o">${escape_html(post._embedded.author[0].name)}</a></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span>${escape_html(formatDate(post.date))}</span></div> `;
    if (primaryCategory) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<a${attr("href", `/category/${stringify(primaryCategory.slug)}`)} class="text-red-600 hover:underline svelte-5qnj3o">${escape_html(primaryCategory.name)}</a>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <div class="flex md:justify-end justify-center my-1 ml-2">`;
    NewsVerification($$payload, { post });
    $$payload.out += `<!----></div> <div id="content-prose" class="p-6 prose prose-lg max-w-none text-justify leading-loose link-styles text-gray-900">${html(post.content.rendered)}</div> <div class="p-4 border-t border-gray-200">`;
    RelatedPosts($$payload, { relatedPosts: data.relatedPosts });
    $$payload.out += `<!----> `;
    if (post._embedded && post._embedded["wp:term"] && post._embedded["wp:term"][1] && post._embedded["wp:term"][1].length > 0) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(post._embedded["wp:term"][1]);
      $$payload.out += `<div class="mt-8"><h3 class="font-bold text-gray-800 mb-2">برچسب‌ها:</h3> <div class="flex flex-wrap gap-2"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$payload.out += `<a${attr("href", `/tag/${stringify(tag.slug)}`)} class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 svelte-5qnj3o">${escape_html(tag.name)}</a>`;
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
