import { p as push, m as head, j as ensure_array_like, g as attr, b as attr_class, h as escape_html, k as stringify, d as bind_props, e as pop } from './index2-D34Xi-nR.js';

function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let categories = data.categories;
  const colors = [
    "bg-yellow-200 text-yellow-800 hover:bg-yellow-300",
    "bg-red-500 text-white hover:bg-red-600",
    "bg-blue-300 text-blue-800 hover:bg-blue-400",
    "bg-indigo-500 text-white hover:bg-indigo-600",
    "bg-green-300 text-green-800 hover:bg-green-400",
    "bg-pink-200 text-pink-800 hover:bg-pink-300",
    "bg-sky-500 text-white hover:bg-indigo-600",
    "bg-fuchsia-400 text-green-800 hover:bg-green-400",
    "bg-orange-400 text-pink-800 hover:bg-pink-300"
  ];
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>رسانه روز - دسته بندی مطالب منتشر شده در رسانه روز</title>`;
  });
  $$payload.out += `<main class="container mx-auto px-4 py-8 svelte-nfclae"><h1 class="text-2xl font-bold text-black dark:text-white text-center mb-12 svelte-nfclae">دسته بندی مطالب منتشر شده در رسانه روز</h1> `;
  if (categories.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center py-8 svelte-nfclae"><div class="loading loading-spinner loading-lg svelte-nfclae"></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(categories);
    $$payload.out += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-nfclae"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$payload.out += `<a${attr("href", `/category/${stringify(category.slug)}`)} class="transform transition-all duration-300 hover:scale-105 group svelte-nfclae"><div${attr_class(` relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${stringify(getRandomColor())} flex items-center justify-between rtl `, "svelte-nfclae")}><div class="svelte-nfclae"><span class="text-xl font-bold svelte-nfclae">${escape_html(category.name)}</span> <span class="text-sm opacity-75 svelte-nfclae">(${escape_html(category.count)} مطلب)</span></div> <span class="text-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 svelte-nfclae">#</span></div></a>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></main>`;
  bind_props($$props, { data });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DIVfGJff.js.map
