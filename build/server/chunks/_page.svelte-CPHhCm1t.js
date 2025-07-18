import { w as push, D as store_get, F as unsubscribe_stores, J as bind_props, y as pop, N as head, K as escape_html, I as attr } from './index-Dyzm0Ju0.js';
import { p as page } from './stores-CvIym1KU.js';
import { h as html } from './html-FW6Ia4bL.js';
import { S as Sidebar } from './Sidebar-DO8OzuZI.js';
import DOMPurify from 'dompurify';
import './Lasttext-BfLBGSG_.js';

function PageSEO($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUrl, title, description, keywords, og, canonical, schema;
  let pageData = $$props["pageData"];
  currentUrl = `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  title = pageData ? `${pageData.title.rendered} | رسا نشر` : "رسا نشر";
  description = pageData?.excerpt?.rendered?.replace(/<[^>]*>/g, "").slice(0, 160) || "";
  keywords = pageData ? `رسا نشر, ${pageData.title.rendered}` : "";
  og = {
    title,
    description,
    type: "article",
    url: currentUrl,
    image: pageData?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    site_name: "رسا نشر",
    locale: "fa_IR",
    "article:published_time": pageData?.date,
    "article:modified_time": pageData?.modified
  };
  canonical = currentUrl;
  schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageData?.title?.rendered,
    description,
    datePublished: pageData?.date,
    dateModified: pageData?.modified,
    author: {
      "@type": "Person",
      name: pageData?._embedded?.author?.[0]?.name || "رسا نشر"
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
    $$payload2.out += `<meta name="description"${attr("content", description)}> <meta name="keywords"${attr("content", keywords)}> <meta name="robots" content="index, follow"> <meta name="author"${attr("content", pageData?._embedded?.author?.[0]?.name || "رسا نشر")}> <link rel="canonical"${attr("href", canonical)}> <meta property="og:title"${attr("content", og.title)}> <meta property="og:description"${attr("content", og.description)}> <meta property="og:type"${attr("content", og.type)}> <meta property="og:url"${attr("content", og.url)}> <meta property="og:image"${attr("content", og.image)}> <meta property="og:site_name"${attr("content", og.site_name)}> <meta property="og:locale"${attr("content", og.locale)}> <meta property="article:published_time"${attr("content", og["article:published_time"])}> <meta property="article:modified_time"${attr("content", og["article:modified_time"])}> ${html(`<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`)}`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { pageData });
  pop();
}
const defaultOptions = {
  ALLOWED_TAGS: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "br",
    "b",
    "i",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "blockquote",
    "pre",
    "code",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "div",
    "span",
    "hr"
  ],
  ALLOWED_ATTR: [
    "href",
    "src",
    "alt",
    "title",
    "class",
    "target",
    "rel",
    "width",
    "height"
  ]
};
function sanitizeHtml(content) {
  if (typeof window === "undefined") return content;
  return DOMPurify.sanitize(content, defaultOptions);
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let pageData, content;
  let data = $$props["data"];
  pageData = data.page;
  `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  content = pageData?.content?.rendered ? sanitizeHtml(pageData.content.rendered) : "";
  PageSEO($$payload, { pageData: data.page });
  $$payload.out += `<!----> <div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-2/3">`;
  if (pageData) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<article class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="p-8"><h1 class="text-3xl font-bold mb-8 text-right">${html(pageData.title.rendered)}</h1> <div class="prose prose-lg max-w-none rtl">${html(content)}</div></div></article>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="bg-white rounded-lg shadow-lg p-8 text-center"><h1 class="text-3xl font-bold mb-4">صفحه مورد نظر یافت نشد</h1> <p class="text-xl text-gray-600 mb-6">متأسفانه صفحه مورد نظر شما در سایت وجود ندارد.</p> <a href="/" class="btn btn-primary">بازگشت به صفحه اصلی</a></div>`;
  }
  $$payload.out += `<!--]--> <div class="mb-5"></div></div> `;
  Sidebar($$payload, {
    lasttextPosts: data.lasttextPosts,
    backlinks: data.backlinks
  });
  $$payload.out += `<!----></div> <div class="mb-10"></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CPHhCm1t.js.map
