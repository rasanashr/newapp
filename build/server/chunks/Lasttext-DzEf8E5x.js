import { p as push, f as fallback, j as ensure_array_like, h as escape_html, g as attr, d as bind_props, e as pop } from './index2-D34Xi-nR.js';
import { h as html } from './html-FW6Ia4bL.js';

function Lasttext($$payload, $$props) {
  push();
  let posts = fallback($$props["posts"], () => [], true);
  if (posts && posts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(posts);
    $$payload.out += `<div class="badge badge-xl mb-2">آخرین خبرها</div> <ul class="list rounded-box w-[99%]"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let post = each_array[i];
      $$payload.out += `<li class="list-row bg-violet-50 mb-1 items-center"><div class="w-8 text-center text-red-700 text-xl font-bold opacity-80 tabular-nums">${escape_html(i + 1)}</div> <div class="flex items-center justify-center min-w-[48px]"><img${attr("src", post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg")}${attr("alt", post.title.rendered)} class="size-12 rounded-lg" loading="lazy" decoding="async"></div> <div class="list-col-grow"><a${attr("href", `/${post.id}/${post.slug}`)} class="link no-underline"><h4 class="text-md font-bold no-underline text-justify">${html(post.title.rendered)}</h4></a></div></li>`;
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

export { Lasttext as L };
//# sourceMappingURL=Lasttext-DzEf8E5x.js.map
