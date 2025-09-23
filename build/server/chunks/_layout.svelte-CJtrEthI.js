import { p as push, s as setContext, a as store_get, b as attr_class, c as slot, u as unsubscribe_stores, d as bind_props, e as pop, f as fallback, g as attr, h as escape_html, i as getContext, j as ensure_array_like, k as stringify } from './index2-D34Xi-nR.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import jalaliday from 'jalaliday';
import { w as writable } from './exports-Djz9nIiK.js';
import { n as navigating, p as page } from './stores-CsuVb8Gn.js';

function WeatherWidget($$payload, $$props) {
  push();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(jalaliday);
  let weatherIcon = "";
  let timeNow = "";
  let dateNow = "";
  const weatherIcons = {
    0: "☀️",
    // آفتابی
    1: "🌤️",
    // عمدتاً آفتابی
    2: "⛅",
    // نیمه ابری
    3: "☁️",
    // ابری
    45: "🌫️",
    // مه
    48: "🌫️",
    // مه یخ‌زده
    51: "🌦️",
    // نم‌نم باران
    53: "🌧️",
    // باران متوسط
    55: "🌧️",
    // باران شدید
    61: "🌧️",
    // باران کم
    63: "🌧️",
    // باران متوسط
    65: "🌧️",
    // باران شدید
    71: "🌨️",
    // برف کم
    73: "🌨️",
    // برف متوسط
    75: "🌨️",
    // برف شدید
    77: "❄️",
    // دانه‌های برف
    80: "🌧️",
    // باران رگباری خفیف
    81: "🌧️",
    // باران رگباری متوسط
    82: "🌧️",
    // باران رگباری شدید
    85: "🌨️",
    // برف رگباری خفیف
    86: "🌨️",
    // برف رگباری شدید
    95: "⛈️",
    // رعد و برق
    96: "⛈️",
    // رعد و برق با تگرگ خفیف
    99: "⛈️"
    // رعد و برق با تگرگ شدید
  };
  $$payload.out += `<div class="w-full max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-lg flex flex-col items-center hidden md:flex svelte-1bl826d"><div class="text-xl font-semibold mb-2 text-gray-800 svelte-1bl826d">وضعیت آب‌و‌هوای تهران</div> <div class="flex items-center text-4xl font-bold text-blue-600 svelte-1bl826d">${escape_html("...")} <span class="ml-2 text-3xl svelte-1bl826d">${escape_html(weatherIcons[weatherIcon] || "")}</span></div> <div class="mt-4 text-center text-gray-600 svelte-1bl826d"><div class="svelte-1bl826d">تاریخ: ${escape_html(dateNow)}</div> <div class="svelte-1bl826d">ساعت: ${escape_html(timeNow)}</div></div></div> <div class="md:hidden w-full mt-4 svelte-1bl826d"><div class="my-auto px-3 overflow-hidden whitespace-nowrap svelte-1bl826d"><div class="inline-block animate-marquee text-black svelte-1bl826d" style="white-space: nowrap;">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `در حال بارگذاری آب و هوا...`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  pop();
}
function Tgjuwidget($$payload, $$props) {
  push();
  $$payload.out += `<div class="tex-black"><div id="tgju-container"></div></div>`;
  pop();
}
function MobileMenu($$payload, $$props) {
  push();
  var $$store_subs;
  let open = fallback($$props["open"], false);
  let onClose = fallback($$props["onClose"], () => {
  });
  const categories = getContext("categories") || writable([]);
  const pastelColors = [
    "bg-[#ffe5ec]",
    // صورتی روشن
    "bg-[#e0f7fa]"
    // آبی روشن
  ];
  if (open) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$categories", categories));
    $$payload.out += `<div class="fixed inset-0 z-40"><button type="button" class="absolute inset-0 bg-black bg-opacity-40 cursor-pointer" aria-label="بستن منو" tabindex="0" style="border:none;outline:none;padding:0;margin:0;"></button> <nav class="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 flex flex-col"><div class="flex items-center justify-between p-4 border-b"><span class="font-bold text-lg flex items-center gap-2 text-red-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round"></path></svg> منو</span> <button class="btn btn-sm btn-ghost" aria-label="بستن"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="flex-1 overflow-y-auto px-4 py-2"><ul class="space-y-2"><li><a href="/" class="flex items-center gap-2 text-red-600 transition-colors duration-200 rounded-lg px-3 py-2 block hover:bg-black hover:text-white" aria-label="لینک صفحه اصلی"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" stroke-linecap="round" stroke-linejoin="round"></path></svg> خانه</a></li> <li><a href="https://rasanashr.ir/page/%D8%AA%D9%85%D8%A7%D8%B3-%D8%A8%D8%A7-%D9%85%D8%A7" class="flex items-center gap-2 text-red-600 transition-colors duration-200 rounded-lg px-3 py-2 block hover:bg-black hover:text-white" aria-label="لینک صفحه اصلی">تماس با ما</a></li> <li><a href="https://rasanashr.ir/page/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D8%B1%D8%B3%D8%A7-%D9%86%D8%B4%D8%B1" class="flex items-center gap-2 text-red-600 transition-colors duration-200 rounded-lg px-3 py-2 block hover:bg-black hover:text-white" aria-label="لینک صفحه اصلی">درباره ما</a></li> <li><span class="block py-2 font-bold text-gray-700 flex items-center gap-2"><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"></path></svg> دسته‌بندی‌ها</span> <ul class="pl-2 space-y-1"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let cat = each_array[i];
      $$payload.out += `<li><a${attr("href", `/category/${cat.slug}`)}${attr_class(`${stringify(pastelColors[i % 2])} transition-colors duration-200 rounded-lg px-3 py-2 block text-gray-800 hover:bg-black hover:text-white`)} aria-label="لینک دسته بندی">${escape_html(cat.name)}</a></li>`;
    }
    $$payload.out += `<!--]--></ul></li></ul></div></nav></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { open, onClose });
  pop();
}
function Header($$payload, $$props) {
  let mojavez = fallback($$props["mojavez"], "/duc.png");
  let mlogo = fallback($$props["mlogo"], "/logo.svg");
  let logoUrl = fallback($$props["logoUrl"], "https://rooidadha.ir/wp-content/uploads/2023/04/1402logo.png");
  let menuOpen = false;
  $$payload.out += `<header><div class="w-full bg-[#f40000] flex flex-col items-center pt-4 pb-0 hidden md:flex"><div class="w-full flex flex-row justify-between items-start px-0"><div class="w-[25px] h-[176px] mt-2 ml-[10vw]"></div> <div class="bg-white rounded-lg w-[250px] h-[176px] mt-2 ml-[10vw]"><img${attr("src", mojavez)} alt="پایگاه خبری رسا نشر" class="w-[250px] h-[176px] select-none" draggable="false"></div> <div class="flex flex-col items-center justify-center"><a href="/" aria-label="صفحه اصلی رسا نشر"><img${attr("src", logoUrl)} alt="لوگو رسا نشر" class="h-[120px] mt-2 select-none" draggable="false"></a></div> <div class="bg-white rounded-lg w-[250px] h-[176px] mt-2 mr-[10vw]">`;
  WeatherWidget($$payload);
  $$payload.out += `<!----></div> <div class="w-[25px] h-[176px] mt-2 ml-[10vw]"></div></div> <div class="w-[95%] flex flex-row items-center justify-center mt-4 mb-2"><div class="w-full flex flex-row items-center justify-center bg-[#f7f0f0] rounded-full py-2"><div class="flex-1 text-center text-l font-bold"><a href="/" aria-label="صفحه اصلی"><span class="text-black px-2">خانه</span></a><span class="text-lime-300">|</span> <a href="/category/اجتماعی/" aria-label="اخبار اجتماعی"><span class="text-black px-2">اجتماعی</span></a> <span class="text-lime-300">|</span> <a href="/category/سیاسی/" aria-label="اخبار سیاسی"><span class="text-black px-2">سیاسی</span></a><span class="text-lime-300">|</span> <a href="/category/فرهنگ-و-هنر/" aria-label="اخبار فرهنگی"><span class="text-black px-2">فرهنگ و هنر</span></a><span class="text-lime-300">|</span> <a href="/category/اخبار-هوش-مصنوعی/" aria-label="خبرهای هوش مصنوعی"><span class="text-black px-2">هوش مصنوعی</span></a><span class="text-lime-300">|</span> <a href="/category/فیلم-و-سینما/" aria-label="اخبار سینما"><span class="text-black px-2">سینما</span></a></div> <div class="flex items-center justify-center m-auto"><div class="rounded-full bg-[#39e600] border-4 border-white flex items-center justify-center w-15 h-15 -mt-8 z-10"><a href="/categories" aria-label="همه دسته بندی ها"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#fff" d="M20.023 17.484c-1.732-.205-3.022-.908-4.212-1.7l-.558.278l-2.578 8.924c1.217.805 2.905 1.707 4.682 1.914c2.686.312 5.56-.744 6.39-1.195l2.618-9.06l-.56-.28s-2.61 1.492-5.78 1.12zm-5.6-2.66c-1.266-.87-2.577-1.65-4.374-1.815a10 10 0 0 0-.926-.043c-3.01 0-4.948 1.347-4.948 1.347L1.61 23.19l.527.282a10.1 10.1 0 0 1 5.09-.984c1.665.113 2.92.78 4.117 1.53l.507-.26l2.574-8.933zm-4.222-2.73c1.665.114 2.922.78 4.118 1.533l.51-.26L17.4 4.43c-1.27-.87-2.58-1.652-4.377-1.815a10 10 0 0 0-.924-.042c-3.012 0-4.95 1.347-4.95 1.347l-2.566 8.878l.526.282a10.1 10.1 0 0 1 5.09-.986zM28.78 5.97c0 .002-2.61 1.493-5.78 1.12c-1.734-.204-3.023-.907-4.213-1.7l-.56.28l-2.576 8.923c1.216.803 2.907 1.71 4.68 1.915c2.688.312 5.56-.745 6.393-1.197l2.615-9.058l-.56-.28z"></path></svg></a></div></div> <div class="flex-1 text-center text-l font-bold"><a href="/category/اقتصادی/" aria-label="اخبار اقتصادی"><span class="text-black px-2">اقتصادی</span></a><span class="text-lime-300">|</span> <a href="/category/ورزشی" aria-label="اخبار ورزشی"><span class="text-black px-2">ورزشی</span></a> <span class="text-lime-300">|</span> <a href="/category/lifestyle/" aria-label="سبک زندگی"><span class="text-black px-2">سبک زندگی</span></a><span class="text-lime-300">|</span> <a href="/category/فناوری_اطلاعات" aria-label="تازه های فناوری"><span class="text-black px-2">فناوری</span></a><span class="text-lime-300">|</span> <a href="/category/بین-الملل/" aria-label="اخبار بین الملل"><span class="text-black px-2">بین الملل</span></a><span class="text-lime-300">|</span> <a href="/category/چندرسانه-ای/" aria-label="عکس و فیلم"><span class="text-black px-2">چند رسانه ای</span></a></div></div></div></div></header> <div class="lg:hidden relative"><div class="bg-red-600 h-14 flex items-center justify-center shadow-sm relative z-0"></div> <div class="bg-gray-300 h-10 pb-3 flex items-center justify-center z-0"><div class="md:hidden">`;
  WeatherWidget($$payload);
  $$payload.out += `<!----></div></div> <div class="absolute inset-x-0 top-3 flex items-center justify-center z-10"><div class="w-24 h-24 rounded-full bg-white border-2 border-red-600 flex items-center justify-center"><a href="/" aria-label="صفحه اصلی رسا نشر"><img${attr("src", mlogo)} alt="لوگو رسا نشر" class="h-19 select-none" draggable="false"></a></div></div> <div class="absolute right-4 top-4 z-20"><button class="btn btn-ghost btn-circle text-white" aria-label="باز کردن منوی اصلی"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button></div></div> `;
  Tgjuwidget($$payload);
  $$payload.out += `<!----> `;
  MobileMenu($$payload, {
    open: menuOpen,
    onClose: () => menuOpen = false
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { mojavez, mlogo, logoUrl });
}
function Footer($$payload) {
  $$payload.out += `<footer class="footer hidden lg:flex lg:footer-horizontal bg-neutral text-neutral-content items-center p-4"><aside class="grid-flow-col items-center"><svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg> <p>کلیه حقوق این وب سایت متعلق به رسا نشر می باشد</p></aside> <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end"><a href="https://t.me/rasanashr" aria-label="تلگرام رسا نشر"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ff0707" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0m5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21l-1.446 1.394a.76.76 0 0 1-.6.295h-.005l.213-3.054l5.56-5.022c.24-.213-.054-.334-.373-.121L8.32 13.617l-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"></path></svg></a> <a href="https://instagram.com/rasanashr" aria-label="اینستاگرام رسا نشر"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="#f20606" d="M13.61 12.243a1.6 1.6 0 1 1-1.56-1.63a1.62 1.62 0 0 1 1.56 1.63"></path><path fill="#f20606" d="M14.763 7.233H9.338a2.024 2.024 0 0 0-2.024 2.024v5.547a2.024 2.024 0 0 0 2.024 2.024h5.425a2.024 2.024 0 0 0 2.024-2.024V9.267a2.026 2.026 0 0 0-2.024-2.034m-2.713 7.723a2.703 2.703 0 1 1 2.642-2.703a2.67 2.67 0 0 1-2.642 2.703m2.936-5.405a.496.496 0 0 1-.496-.506a.506.506 0 1 1 1.012 0a.496.496 0 0 1-.557.506z"></path><path fill="#f20606" d="M12.05 2a10 10 0 1 0-.1 20a10 10 0 0 0 .1-20m6.073 12.702a3.39 3.39 0 0 1-3.41 3.411H9.389a3.39 3.39 0 0 1-3.411-3.41V9.378a3.39 3.39 0 0 1 3.41-3.411h5.325a3.39 3.39 0 0 1 3.41 3.41z"></path></svg></a> <a href="https://www.youtube.com/@rasanashr" aria-label="یوتیوب رسا نشر"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="#ff0707" d="M11.603 9.833L9.357 8.785C9.161 8.694 9 8.796 9 9.013v1.974c0 .217.161.319.357.228l2.245-1.048c.197-.092.197-.242.001-.334M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m0 13.5c-4.914 0-5-.443-5-3.9s.086-3.9 5-3.9s5 .443 5 3.9s-.086 3.9-5 3.9"></path></svg></a> <a href="/page/درباره-رسا-نشر/" aria-label="صفحه درباره ما"><p>درباره ما</p></a> <a href="/page/تماس-با-ما" aria-label="صفحه تماس با ما"><p>تماس با ما</p></a></nav></footer> <div class="dock dock-md lg:hidden"><button><a href="/" aria-label="رفتن به صفحه اصلی"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff0707" d="M21.184 7.765a2.93 2.93 0 0 0-1.16-1.28l-6.46-4a3 3 0 0 0-3.16 0l-6.48 4a3 3 0 0 0-1.12 1.29a3 3 0 0 0-.23 1.7l1.67 10a3 3 0 0 0 2.93 2.49h9.63a3.17 3.17 0 0 0 1.95-.7a3 3 0 0 0 1-1.79l1.67-10a2.9 2.9 0 0 0-.24-1.71m-4.73 6a9.18 9.18 0 0 1-4.18 3.91a.54.54 0 0 1-.27.07a.5.5 0 0 1-.27-.07a9.13 9.13 0 0 1-4.18-3.91a3.79 3.79 0 0 1 .55-4.25a2.52 2.52 0 0 1 2.25-.55a3 3 0 0 1 1.65 1a3 3 0 0 1 1.65-1a2.52 2.52 0 0 1 2.25.55a3.82 3.82 0 0 1 .55 4.22z"></path></svg></a> <a href="/" aria-label="رفتن به صفحه اصلی"><span class="dock-label">خـانـه</span></a></button> <button><a href="/lastnews" aria-label="لینک آخرین خبرها"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff0707" d="M21.267 21.2a.614.614 0 0 1-.613.613H3.344a.614.614 0 0 1-.612-.613V8.115a.614.614 0 0 1 .613-.613h17.309a.614.614 0 0 1 .613.613zm-3.032-3.42v-1.195a.08.08 0 0 0-.08-.08h-5.373v1.361h5.373a.08.08 0 0 0 .08-.083zm.817-2.587v-1.201a.08.08 0 0 0-.079-.082h-6.19v1.362h6.189a.08.08 0 0 0 .08-.078v-.004zm-.817-2.588V11.4a.08.08 0 0 0-.08-.08h-5.373v1.361h5.373a.08.08 0 0 0 .08-.079zM8.15 14.045v1.226h1.77c-.145.748-.804 1.292-1.77 1.292a1.976 1.976 0 0 1 0-3.95a1.77 1.77 0 0 1 1.253.49l.934-.932a3.14 3.14 0 0 0-2.187-.853a3.268 3.268 0 1 0 0 6.537c1.89 0 3.133-1.328 3.133-3.197a4 4 0 0 0-.052-.619zM2.27 7.654a.616.616 0 0 1 .613-.613h12.154l-1.269-3.49a.595.595 0 0 0-.743-.383L.368 7.775a.594.594 0 0 0-.323.775l2.225 6.112za.616.616 0 0 1 .613-.613h12.154l-1.269-3.49a.595.595 0 0 0-.743-.383L.368 7.775a.594.594 0 0 0-.323.775l2.225 6.112zm21.312-.31l-8.803-2.37l.751 2.067h5.584a.614.614 0 0 1 .613.613v8.794l2.247-8.365a.59.59 0 0 0-.392-.74m-4.496-1.675V2.795a.61.61 0 0 0-.611-.608H5.524a.61.61 0 0 0-.616.605v2.837l8.39-3.052a.594.594 0 0 1 .743.39l.544 1.497z"></path></svg></a> <a href="/lastnews" aria-label="لینک آخرین خبرها"><span class="dock-label">تازه ها</span></a></button> <button><a href="/categories/" aria-label="دیدن همه دسته بندی ها"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff0707" d="M3 20.5q-.425 0-.712-.288T2 19.5v-6q0-.425.288-.712T3 12.5h6q.425 0 .713.288T10 13.5v6q0 .425-.288.713T9 20.5zM14.725 10h-7.45q-.575 0-.862-.513t.012-1.012L10.15 2.4q.3-.5.85-.5t.85.5l3.725 6.075q.3.5.013 1.013t-.863.512m6.15 12.25l-1.95-1.95q-.525.35-1.137.525T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .65-.175 1.263t-.5 1.137l1.95 1.95q.275.275.275.7t-.275.7t-.7.275t-.7-.275M16.5 19q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19"></path></svg></a> <a href="/categories/" aria-label="دیدن همه دسته بندی ها"><span class="dock-label">دسته بندی ها</span></a></button> <button><a href="/search/" aria-label="جستجوی مطالب در رسا نشر"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="#ff0707" d="M10.5 2c1.251 0 2.44.27 3.509.756a3 3 0 0 0-.97 1.759A6.5 6.5 0 1 0 17 10.5l-.005-.269c.536.48 1.239.765 1.991.769a8.46 8.46 0 0 1-1.809 4.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 2m0 3c.927 0 1.801.23 2.568.635a3 3 0 0 0 1.963 2.204l.348.119A5.5 5.5 0 1 1 10.5 5M19 1a1 1 0 0 1 .898.56l.048.117l.13.378a3 3 0 0 0 1.684 1.8l.185.07l.378.129a1 1 0 0 1 .118 1.844l-.118.048l-.378.13a3 3 0 0 0-1.8 1.684l-.07.185l-.129.378a1 1 0 0 1-1.844.117l-.048-.117l-.13-.378a3 3 0 0 0-1.684-1.8l-.185-.07l-.378-.129a1 1 0 0 1-.118-1.844l.118-.048l.378-.13a3 3 0 0 0 1.8-1.684l.07-.185l.129-.378A1 1 0 0 1 19 1"></path></g></svg></a> <a href="/search/" aria-label="جستجوی مطالب در رسا نشر"><span class="dock-label">جستجو</span></a></button></div>`;
}
function Splash_1($$payload, $$props) {
  let Splash = fallback($$props["Splash"], "/splash.png");
  $$payload.out += `<div class="text-center text-2xl font-bold text-red-600 font-extra"><img${attr("src", Splash)} alt="پایگاه خبری رسا نشر" class="w-[25%] mx-auto select-none" draggable="false"> <p>پایگاه خبری تحلیلی رسا نشر</p></div>`;
  bind_props($$props, { Splash });
}
function BackToTop($$payload, $$props) {
  push();
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  const categories = writable(data.categories);
  setContext("categories", categories);
  categories.set(data.categories);
  if (store_get($$store_subs ??= {}, "$navigating", navigating)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading-overlay svelte-jju39e">`;
    Splash_1($$payload, {});
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">`;
  if (store_get($$store_subs ??= {}, "$page", page).route.id !== "/short") {
    $$payload.out += "<!--[-->";
    Header($$payload, { categories });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <main${attr_class("flex-grow svelte-jju39e", void 0, {
    "is-short-page": store_get($$store_subs ??= {}, "$page", page).route.id === "/short"
  })}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></main> `;
  Footer($$payload);
  $$payload.out += `<!----> `;
  BackToTop($$payload);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CJtrEthI.js.map
