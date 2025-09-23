import { f as fallback, j as store_get, i as head, u as unsubscribe_stores, c as bind_props, p as pop, d as push, a as escape_html, b as attr, e as ensure_array_like, s as stringify } from "../../../../chunks/index2.js";
import { j as fetchPostsByTag } from "../../../../chunks/wordpress.js";
import { p as page } from "../../../../chunks/stores.js";
import { h as html } from "../../../../chunks/html.js";
import { S as Sidebar } from "../../../../chunks/Sidebar.js";
import { P as Pagination } from "../../../../chunks/Pagination.js";
function TagSEO($$payload, $$props) {
  push();
  var $$store_subs;
  let metaData, currentUrl, schema, safeSchema;
  let tag = fallback($$props["tag"], null);
  const defaultMetaData = {
    title: "آرشیو برچسب‌ها | رسانه روز",
    description: "مطالب برچسب‌گذاری شده در رسانه روز",
    canonical: "https://rasarooz.ir/tag",
    ogTitle: "آرشیو برچسب‌ها | رسانه روز",
    ogDescription: "مجموعه مطالب برچسب‌گذاری شده در رسانه روز",
    ogType: "website",
    ogSite_name: "رسانه روز"
  };
  metaData = tag?.name ? {
    title: `${tag.name} | رسانه روز`,
    description: tag.description || `مطالب مرتبط با برچسب ${tag.name} در رسانه روز`,
    canonical: `https://rasarooz.ir/tag/${tag.slug}`,
    ogTitle: `${tag.name} | رسانه روز`,
    ogDescription: tag.description || `مطالب مرتبط با برچسب ${tag.name}`,
    ogType: "website",
    ogSite_name: "رسانه روز"
  } : defaultMetaData;
  currentUrl = `https://rasarooz.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  schema = tag ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: metaData.title,
    description: metaData.description,
    url: currentUrl,
    publisher: {
      "@type": "Organization",
      name: "رسانه روز",
      logo: {
        "@type": "ImageObject",
        url: "https://rasarooz.ir/duc.png"
      }
    }
  } : null;
  safeSchema = schema ? JSON.stringify(schema, null, 2) : "";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(metaData.title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", metaData.description)}> <link rel="canonical"${attr("href", metaData.canonical)}> <meta name="keywords"${attr("content", tag?.name ? `${tag.name}, رسانه روز, اخبار ${tag.name}, آرشیو ${tag.name}` : "")}> <meta name="robots" content="index, follow"> <meta property="og:title"${attr("content", metaData.ogTitle)}> <meta property="og:description"${attr("content", metaData.ogDescription)}> <meta property="og:type"${attr("content", metaData.ogType)}> <meta property="og:url"${attr("content", currentUrl)}> <meta property="og:site_name"${attr("content", metaData.ogSite_name)}> <meta property="og:locale" content="fa_IR">`;
  });
  if (safeSchema) {
    $$payload.out += "<!--[-->";
    $$payload.out += `${html(`<script type="application/ld+json">${safeSchema}<\/script>`)}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
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
  `https://rasarooz.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
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
export {
  _page as default
};
