<script>
  // No need for any props, this is a static 404 page
  import { onMount } from 'svelte';
  onMount(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  });
</script>

<svelte:head>
  <title>صفحه پیدا نشد | رسا نشر</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content="صفحه مورد نظر شما پیدا نشد. لطفاً از منوی سایت یا جستجو استفاده کنید." />
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
  <img src="/404.svg" alt="404" class="w-60  mb-6 opacity-80" loading="lazy" decoding="async" />
  <h1 class="text-4xl font-bold mb-4 text-red-600">404</h1>
  <h2 class="text-2xl font-semibold mb-2">صفحه پیدا نشد</h2>
  <p class="mb-6 text-gray-600">متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.</p>
  <a href="/" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">بازگشت به صفحه اصلی</a>
  <p class="mt-4 text-gray-400 text-sm">تا چند لحظه دیگر به صفحه اصلی هدایت می‌شوید...</p>
</div>
