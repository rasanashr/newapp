import { E as fallback, N as ensure_array_like, D as escape_html, G as attr, F as bind_props, C as pop, z as push } from "../../../chunks/index.js";
import { h as html } from "../../../chunks/html.js";
function Akharinkhabar($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    $$payload.out += `<div class="badge badge-md mb-2"><h1 class="font-extrabold text-red-600">آخرین خبرها</h1> <br> <h2>آخرین خبرها در 24 ساعت گذشته</h2></div> <ul class="list rounded-box w-[99%]"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let post = each_array[i];
      $$payload.out += `<li class="list-row bg-linear-to-r/hsl from-indigo-500 to-teal-400 mb-1 items-center"><div class="w-8 text-center text-xl font-bold text-red-700 tabular-nums">${escape_html(i + 1)}</div> <div class="flex items-center justify-center min-w-20"><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="size-12 rounded-lg" loading="lazy" decoding="async"></div> <div class="list-col-grow"><a${attr("href", `/${post.id}/${post.slug}`)} class="link no-underline"><h4 class="text-md font-bold no-underline text-justify">${html(post.title.rendered)}</h4></a></div></li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center p-4">در حال بارگذاری...</div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { posts });
  pop();
}
function _page($$payload, $$props) {
  push();
  let metaData;
  let data = $$props["data"];
  metaData = {
    title: "آخرین اخبار 24 ساعت گذشته ایران و جهان | پایگاه خبری رسا نشر"
  };
  $$payload.out += `<title>${escape_html(metaData.title)}</title> `;
  Akharinkhabar($$payload, { posts: data.akharinkhabarPosts });
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
