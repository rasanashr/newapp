<!-- src/routes/[...catchall]/+page.svelte -->
<script>
  import { onMount } from 'svelte';

  // وضعیت تصویر (اصلی یا fallback)
  let imageSrc = 'https://rasanashr.ir/404.svg';
  let imageAlt = 'صفحه یافت نشد – 404';

  function handleImageError() {
    imageSrc = 'https://rasanashr.ir/graph.jpg';
    imageAlt = 'لوگوی رسا نشر';
  }

  onMount(() => {
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);
    return () => clearTimeout(timer);
  });
</script>

<svelte:head>
  <title>صفحه‌ای یافت نشد | پایگاه خبری تحلیلی رسا نشر</title>
  <meta name="description" content="متاسفانه صفحه مورد نظر یافت نشد. پایگاه خبری تحلیلی رسا نشر، دارای مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی (شماره مجوز: ۸۰۵۳۷)." />
  <meta name="robots" content="noindex, follow" />
  <meta property="og:title" content="خطا ۴۰۴: صفحه یافت نشد" />
  <meta property="og:description" content="این صفحه در پایگاه خبری تحلیلی رسا نشر وجود ندارد." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://rasanashr.ir" />
  <meta property="og:site_name" content="پایگاه خبری تحلیلی رسا نشر" />
  <meta property="og:locale" content="fa_IR" />
  <meta property="og:image" content="https://rasanashr.ir/graph.jpg" />
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center px-4">
  <img 
    src={imageSrc}
    alt={imageAlt}
    class="w-60 mb-6 opacity-80 max-w-full"
    loading="lazy"
    decoding="async"
    on:error={handleImageError}
  />
  
  <h1 class="text-4xl font-bold mb-4 text-red-600">404</h1>
  <h2 class="text-2xl font-semibold mb-2">مطلبی که به دنبالش هستید وجود ندارد</h2>
  <p class="mb-6 text-gray-600 max-w-lg">
    متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد، حذف شده یا آدرس آن تغییر کرده است.
  </p>
  
  <a 
    href="/" 
    class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    بازگشت به صفحه اصلی
  </a>
  
  <p class="mt-4 text-gray-400 text-sm">
    تا ۵ ثانیه دیگر به صفحه اصلی هدایت می‌شوید...
  </p>
</div>