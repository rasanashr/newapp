import { p as push, d as bind_props, e as pop, j as ensure_array_like, g as attr, h as escape_html, b as attr_class, k as stringify } from './index2-D34Xi-nR.js';
import { S as Sidebar } from './Sidebar-D4Vc3Qyw.js';
import './Lasttext-DzEf8E5x.js';
import './html-FW6Ia4bL.js';

function GrokChat($$payload, $$props) {
  push();
  let messages = [];
  let newMessage = "";
  let isLoading = false;
  const models = [
    { id: "x-ai/grok-4", name: "Grok 4 (پیشرفته)" },
    { id: "x-ai/grok-3", name: "Grok 3" },
    { id: "gpt-5-nano", name: "GPT-5 Nano (سریع)" },
    { id: "gpt-5-turbo", name: "GPT-5 Turbo" },
    { id: "gpt-4", name: "GPT-4 (دقیق)" }
  ];
  const each_array = ensure_array_like(models);
  const each_array_1 = ensure_array_like(messages);
  $$payload.out += `<div class="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden svelte-sbctc4"><div class="p-4 border-b border-gray-200 svelte-sbctc4"><div class="flex justify-between items-center svelte-sbctc4"><h2 class="text-xl font-bold text-gray-800 svelte-sbctc4">گفتگو با هوش مصنوعی</h2> <select class="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm svelte-sbctc4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let model = each_array[$$index];
    $$payload.out += `<option${attr("value", model.id)} class="svelte-sbctc4">${escape_html(model.name)}</option>`;
  }
  $$payload.out += `<!--]--></select></div></div> <div class="flex-1 overflow-y-auto p-4 space-y-4 svelte-sbctc4" style="height: 500px;"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let message = each_array_1[$$index_1];
    $$payload.out += `<div${attr_class(`flex flex-col ${stringify(message.role === "user" ? "items-end" : "items-start")}`, "svelte-sbctc4")}><div${attr_class(`max-w-[80%] rounded-lg p-3 ${stringify(message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800")} ${stringify(message.role === "system" ? "bg-red-100 text-red-800" : "")}`, "svelte-sbctc4")}>`;
    if (message.isTyping) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex items-center space-x-2 svelte-sbctc4"><div class="typing-animation svelte-sbctc4"><span class="dot svelte-sbctc4"></span> <span class="dot svelte-sbctc4"></span> <span class="dot svelte-sbctc4"></span></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="whitespace-pre-wrap text-justify svelte-sbctc4">${escape_html(message.content)}</p>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="p-4 border-t border-gray-200 svelte-sbctc4"><form class="flex gap-2 svelte-sbctc4"><input type="text"${attr("value", newMessage)} placeholder="پیام خود را بنویسید..." class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 svelte-sbctc4"${attr("disabled", isLoading, true)}> <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 svelte-sbctc4"${attr("disabled", !newMessage.trim(), true)}>${escape_html("ارسال")}</button></form></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  $$payload.out += `<div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-2/3"><div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="p-6"><h1 class="text-2xl font-bold mb-4">گفتگوی آزاد با هوش مصنوعی</h1> <p class="text-gray-600 mb-6">در این بخش می‌توانید به صورت آزاد با هوش مصنوعی گفتگو کنید. نوع مدل هوش مصنوعی را انتخاب کنید و سوالات خود را بپرسید.</p> `;
  GrokChat($$payload);
  $$payload.out += `<!----></div></div></div> `;
  if (data?.lasttextPosts || data?.backlinks) {
    $$payload.out += "<!--[-->";
    Sidebar($$payload, {
      lasttextPosts: data.lasttextPosts || [],
      backlinks: data.backlinks || []
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="w-full lg:w-1/3"></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { data });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cn4SNxmX.js.map
