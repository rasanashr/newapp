import { E as fallback, N as ensure_array_like, G as attr, F as bind_props, C as pop, z as push, O as attr_style, P as stringify, Q as attr_class, D as escape_html, I as store_get, R as head, K as unsubscribe_stores } from "../../chunks/index.js";
import { h as html } from "../../chunks/html.js";
import { L as Lasttext } from "../../chunks/Lasttext.js";
import { p as page } from "../../chunks/stores.js";
function Firstnews($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    const each_array_1 = ensure_array_like(posts);
    $$payload.out += `<div class="hidden md:block"><div class="grid gap-2"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<a${attr("href", `/${post.id}/${post.slug}`)} class="self-end"><div class="flex p-4 rounded-xl shadow bg-white gap-2 transition-all hover:-translate-y-1 hover:scale-[1.02]"><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-32 h-32 object-cover rounded-xl" decoding="async"> <div class="flex flex-col justify-between flex-grow"><h2 class="font-bold text-lg text-justify">${html(post.title.rendered)}</h2> <div class="text-sm text-gray-600 line-clamp-3 mb-2 text-justify">${html(post.excerpt.rendered)}</div></div></div></a>`;
    }
    $$payload.out += `<!--]--></div></div> <div class="md:hidden grid gap-4"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let post = each_array_1[$$index_1];
      $$payload.out += `<a${attr("href", `/${post.id}/${post.slug}`)} class="self-end"><div class="flex p-4 rounded-xl shadow bg-white gap-2 transition-all hover:-translate-y-1 hover:scale-[1.02]"><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-32 h-32 object-cover rounded-xl" decoding="async"> <div class="flex flex-col justify-between flex-grow"><h2 class="font-bold text-md text-justify">${html(post.title.rendered)}</h2> <div class="font-light text-sm text-gray-600 line-clamp-3 mb-2 text-justify">${html(post.excerpt.rendered)}</div></div></div></a>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts });
  pop();
}
function Notofday($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [1], true);
  function truncateText(text, length) {
    const cleanText = text.replace(/<[^>]*>/g, "");
    if (cleanText.length <= length) return text;
    const truncated = cleanText.substr(0, length);
    const lastSpace = truncated.lastIndexOf(" ");
    return truncated.substr(0, lastSpace) + "...";
  }
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<div class="card card-side bg-purple-500 flex-wrap md:flex-nowrap mt-7"><figure class="w-full md:w-[40%] aspect-[4/3]"><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-full h-full object-cover"></figure> <div class="card-body w-full md:w-[60%]"><h2 class="font-bold text-white text-lg">${html(post.title.rendered)}</h2> <div class="text-sm text-white mb-2 text-justify whitespace-pre-line overflow-hidden">${html(truncateText(post.excerpt.rendered || "", 500))}</div> <div class="card-actions justify-end pt-2"><a${attr("href", `/${post.id}/${post.slug}`)}><button class="btn btn-error bg-rose-600 text-white">متن کامل</button></a></div></div></div>`;
    }
    $$payload.out += `<!--]--> <br>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts });
  pop();
}
function Shortpic($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    $$payload.out += `<div class="badge badge-dash badge-success mb-2 text-2xl">اجتماعی</div> <!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<div class="object-center bg-white shadow-xl rounded-2xl p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102"><span class="indicator-item indicator-center indicator-middle text-sm"></span> <a${attr("href", `/${post.id}/${post.slug}`)}><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-65 h-40 rounded-2xl mt-0 pt-0"></a> <h5 class="text-center text-gray-500 text-sm">${html(post.title.rendered)}</h5></div> <br>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts });
  pop();
}
function Slider1($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  posts.length;
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    $$payload.out += `<div class="w-full relative"><div class="carousel-container svelte-18xkizi"><div class="carousel-track svelte-18xkizi"${attr_style(`transform: translateX(${stringify(-0 * 100)}%)`)}><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let post = each_array[i];
      $$payload.out += `<div class="carousel-slide svelte-18xkizi"><div class="w-full h-[330px] overflow-hidden bg-base-400 rounded-[20px]"><a${attr("href", `/${post.id}/${post.slug}`)}><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="carousel-img svelte-18xkizi"${attr("loading", i === 0 ? "eager" : "lazy")}></a></div> <div class="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 rounded-b-[20px]"><a${attr("href", `/${post.id}/${post.slug}`)}><h2 class="font-bold text-lg text-justify line-clamp-1">${html(post.title.rendered)}</h2></a> <div class="text-sm text-gray-700 line-clamp-2 mt-2">${html(post.excerpt.rendered)}</div></div></div>`;
    }
    $$payload.out += `<!--]--></div></div> <button class="btn btn-circle absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white z-10" aria-label="دکمه قبلی اسلاید"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <button class="btn btn-circle absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white z-10" aria-label="دکمه بعدی اسلاید"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts });
  pop();
}
function Mediapost($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts.slice(1, 13));
    $$payload.out += `<div class="flex flex-col md:flex-row bg-purple-900 text-white gap-4 p-4 rounded-lg items-start"><div class="w-full md:w-1/2 lg:w-3/5 flex-shrink-0"><div class="relative mb-4 rounded-lg overflow-hidden"><a${attr("href", `/${posts[0].id}/${posts[0].slug}`)}><img${attr("src", posts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", posts[0].title.rendered)} class="w-full h-[300px] sm:h-[400px] object-cover"> <div class="absolute bottom-0 left-0 right-0 bg-white/70 px-4 py-3 rounded-b-lg"><h2 class="block font-bold text-xl sm:text-2xl text-black text-justify">${html(posts[0].title.rendered)}</h2></div></a></div> <div class="text-sm text-base-600 line-clamp-3 text-justify mb-2">${html(posts[0].excerpt.rendered)}</div></div> <div class="w-full md:w-1/2 lg:w-2/5 flex items-start"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<a${attr("href", `/${post.id}/${post.slug}`)} class="group"><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-full h-[90px] sm:h-[110px] object-cover rounded-md border border-gray-700 \\ transition-transform duration-300 group-hover:scale-105"></a>`;
    }
    $$payload.out += `<!--]--></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts });
  pop();
}
function Singlecard($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  let bgColor = fallback($$props["bgColor"], "bg-yellow-100");
  let hoverColor = fallback($$props["hoverColor"], "hover:bg-yellow-50");
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    $$payload.out += `<div class="grid gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<div${attr_class(`flex flex-col md:flex-row p-4 rounded-xl shadow ${bgColor} gap-4 
                transition duration-300 hover:-translate-y-1 hover:scale-[1.02] 
                ${hoverColor} hover:ring-2 hover:ring-yellow-300`)}>`;
      if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<img${attr("src", post._embedded["wp:featuredmedia"][0].source_url)}${attr("alt", post.title.rendered)} class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mx-auto md:mx-0">`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div class="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full mx-auto md:mx-0 flex items-center justify-center"><span class="text-gray-400">بدون تصویر</span></div>`;
      }
      $$payload.out += `<!--]--> <a${attr("href", `/${post.id}/${post.slug}`)} class="flex flex-col justify-between flex-1 text-inherit no-underline"><div><h2 class="font-bold text-base md:text-lg text-gray-900 mb-2 text-center md:text-right">${html(post.title.rendered)}</h2> <div class="text-sm text-gray-700 line-clamp-3 mb-3 text-justify px-2 md:px-0">${html(post.excerpt.rendered)}</div></div> <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-auto">`;
      if (post.categories_info?.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-sm bg-gray-200 px-3 py-1 rounded-full text-gray-800">دسته: ${escape_html(post.categories_info[0].name)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (post.tags_info?.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-sm bg-white border px-3 py-1 rounded-full text-gray-700">#${escape_html(post.tags_info[0].name)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></a></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts, bgColor, hoverColor });
  pop();
}
function Minicard($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    $$payload.out += `<div class="grid gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$payload.out += `<div class="flex flex-col md:flex-row p-4 rounded-xl shadow bg-rose-400 gap-4 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-rose-50 hover:ring-2 hover:ring-rose-500"><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="w-24 h-24 md:w-20 md:h-20 object-cover rounded-full mx-auto md:mx-0"> <a${attr("href", `/${post.id}/${post.slug}`)} class="flex flex-col justify-between flex-1 text-inherit no-underline"${attr("aria-label", `مشاهده مطلب ${post.title.rendered}`)}><div><h2 class="font-bold text-base md:text-lg text-gray-900 mb-2 text-center md:text-right">${html(post.title.rendered)}</h2></div></a></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts });
  pop();
}
function HomeSEO($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUrl, title, description, keywords, og, canonical;
  currentUrl = `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  title = " رسا نشر | تازه‌ترین اخبار اجتماعی، فرهنگی، سیاسی و اقتصادی ایران و جهان";
  description = "پایگاه خبری تحلیلی رسا نشر - آخرین اخبار روز ایران و جهان";
  keywords = "رسا نشر, اخبار اجتماعی, اخبار فرهنگی, اخبار سیاسی, اخبار اقتصادی, پایگاه خبری تحلیلی, رسا نشر ایران, گزارش اجتماعی, هوش مصنوعی, اینترنت, فیلترینگ, تحلیل سیاسی, اخبار روز, اخبار جنگ, جنگ ایران و اسرائیل, حمله نظامی, مذاکره ایران و آمریکا";
  og = {
    title,
    description,
    type: "website",
    url: currentUrl,
    site_name: "رسا نشر",
    locale: "fa_IR"
  };
  canonical = currentUrl;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", description)}> <meta name="keywords"${attr("content", keywords)}> <meta name="robots" content="index, follow"> <link rel="canonical"${attr("href", canonical)}> <meta property="og:title"${attr("content", og.title)}> <meta property="og:description"${attr("content", og.description)}> <meta property="og:type"${attr("content", og.type)}> <meta property="og:url"${attr("content", og.url)}> <meta property="og:site_name"${attr("content", og.site_name)}> <meta property="og:locale"${attr("content", og.locale)}> <script type="application/ld+json">{JSON.stringify(schema)}<\/script>`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  data.posts;
  data.totalPages;
  `https://rasanashr.ir${store_get($$store_subs ??= {}, "$page", page).url.pathname}`;
  HomeSEO($$payload);
  $$payload.out += `<!----> <div class="hidden md:block" dir="rtl"><div class="grid grid-cols-2 gap-2 mb-2"><div class="bg-red-600 p-4 rounded-[20px] min-w-[300px]">`;
  Slider1($$payload, { posts: data.slider1Posts });
  $$payload.out += `<!----></div> <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-[20px] min-w-[300px]">`;
  Notofday($$payload, { posts: data.notofdayPosts });
  $$payload.out += `<!----></div></div> <div class="grid grid-cols-[50%_29%_20%] gap-2 mb-2"><div>`;
  Firstnews($$payload, { posts: data.firstnewsPosts });
  $$payload.out += `<!----></div> <div class="bg-red-600 p-4 rounded-lg">`;
  Lasttext($$payload, { posts: data.lasttextPosts });
  $$payload.out += `<!----></div> <div class="bg-black p-4 text-white rounded-lg">`;
  Shortpic($$payload, { posts: data.shortpicPosts });
  $$payload.out += `<!----></div></div> <div class="bg-purple-300 p-4 mb-2 rounded-lg">`;
  Mediapost($$payload, { posts: data.mediapostPosts });
  $$payload.out += `<!----></div> <div class="grid grid-cols-[70%_29%] gap-2 mb-2"><div class="p-4"><div class="mb-4">`;
  Singlecard($$payload, {
    posts: data.singlecard1Posts,
    bgColor: "bg-yellow-100",
    hoverColor: "hover:bg-yellow-50"
  });
  $$payload.out += `<!----></div> <div class="mb-4">`;
  Singlecard($$payload, {
    posts: data.singlecard2Posts,
    bgColor: "bg-green-100",
    hoverColor: "hover:bg-green-50"
  });
  $$payload.out += `<!----></div> <div class="mb-4">`;
  Singlecard($$payload, {
    posts: data.singlecard3Posts,
    bgColor: "bg-red-100",
    hoverColor: "hover:bg-red-50"
  });
  $$payload.out += `<!----></div> <div class="mb-4">`;
  Singlecard($$payload, {
    posts: data.singlecard4Posts,
    bgColor: "bg-blue-100",
    hoverColor: "hover:bg-blue-50"
  });
  $$payload.out += `<!----></div></div> <div class="p-2 bg-blue-50 rounded-lg shadow p-3">`;
  Minicard($$payload, { posts: data.minicardPosts });
  $$payload.out += `<!----></div></div> <div class="mb-10"></div></div> <div class="lg:hidden w-full mb-5">`;
  Slider1($$payload, { posts: data.firstnewsPosts });
  $$payload.out += `<!----> `;
  Notofday($$payload, { posts: data.notofdayPosts });
  $$payload.out += `<!----> `;
  Lasttext($$payload, { posts: data.lasttextPosts });
  $$payload.out += `<!----> <div class="mb-20">`;
  Firstnews($$payload, { posts: data.firstnewsPosts });
  $$payload.out += `<!----></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
