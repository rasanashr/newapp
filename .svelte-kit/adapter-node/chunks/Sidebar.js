import { E as fallback, N as ensure_array_like, G as attr, D as escape_html, F as bind_props, C as pop, z as push } from "./index.js";
import { L as Lasttext } from "./Lasttext.js";
import "./client.js";
function BackLinks($$payload, $$props) {
  push();
  let backlinks = fallback($$props["backlinks"], () => [], true);
  let loading = fallback($$props["loading"], false);
  if (loading) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Array(4));
    $$payload.out += `<div class="grid gap-3"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$payload.out += `<div${attr("key", i)} class="skeleton h-8 w-full"></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else if (backlinks.length > 0) {
    $$payload.out += "<!--[1-->";
    const each_array_1 = ensure_array_like(backlinks);
    $$payload.out += `<div class="backlinks-container svelte-1d6gza5"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let link = each_array_1[$$index_1];
      $$payload.out += `<div class="backlink-item text-sm font-reqular text-gray-700 svelte-1d6gza5"><a${attr("href", link.url)} target="_blank" rel="noopener noreferrer" class="svelte-1d6gza5">🌐 ${escape_html(link.name)}</a></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center my-8">هیچ بک لینکی وجود ندارد.</div>`;
  }
  $$payload.out += `<!--]--> <div id="div_eRasanehTrustseal_80537"></div>`;
  bind_props($$props, { backlinks, loading });
  pop();
}
function Sidebar($$payload, $$props) {
  push();
  let lasttextPosts = fallback($$props["lasttextPosts"], () => [], true);
  let backlinks = fallback($$props["backlinks"], () => [], true);
  let searchQuery = "";
  $$payload.out += `<aside class="w-full lg:w-1/3 space-y-8"><div class="bg-white rounded-lg shadow p-4 hidden md:block"><form class="flex flex-col gap-2"><input type="search"${attr("value", searchQuery)} placeholder="جستجو در مطالب..." class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"> <button type="submit" class="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">جستجو</button></form></div> <div class="bg-red-600 rounded-lg shadow p-3">`;
  Lasttext($$payload, { posts: lasttextPosts });
  $$payload.out += `<!----></div> <div class="bg-violet-50 rounded-lg shadow p-3">`;
  BackLinks($$payload, { backlinks, loading: false });
  $$payload.out += `<!----></div></aside>`;
  bind_props($$props, { lasttextPosts, backlinks });
  pop();
}
export {
  Sidebar as S
};
