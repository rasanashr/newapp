import { p as push, m as head, e as pop } from './index2-D34Xi-nR.js';

function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>صفحه پیدا نشد | رسانه روز</title>`;
    $$payload2.out += `<meta name="robots" content="noindex, nofollow"> <meta name="description" content="صفحه مورد نظر شما پیدا نشد. لطفاً از منوی سایت یا جستجو استفاده کنید.">`;
  });
  $$payload.out += `<div class="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center"><img src="/404.svg" alt="404" class="w-60 mb-6 opacity-80" loading="lazy" decoding="async"> <h1 class="text-4xl font-bold mb-4 text-red-600">404</h1> <h2 class="text-2xl font-semibold mb-2">صفحه پیدا نشد</h2> <p class="mb-6 text-gray-600">متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.</p> <a href="/" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">بازگشت به صفحه اصلی</a> <p class="mt-4 text-gray-400 text-sm">تا چند لحظه دیگر به صفحه اصلی هدایت می‌شوید...</p></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CRL0Ytsb.js.map
