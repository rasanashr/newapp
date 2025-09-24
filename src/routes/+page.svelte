<script>
  import { fetchPosts } from '$lib/services/wordpress';
  import Firstnews from '$components/widgets/Firstnews.svelte';
  import Notofday from '$components/widgets/Notofday.svelte'; 
  import Lasttext from '$components/widgets/Lasttext.svelte'; 
  import Shortpic from '$components/widgets/Shortpic.svelte'; 
  import Slider1 from '$components/widgets/Slider1.svelte'; 
  import Mediapost from '$components/widgets/Mediapost.svelte'; 
  import Singlecard from '$components/widgets/Singlecard.svelte'; 
  import Minicard from '$components/widgets/Minicard.svelte'; 
  import HomeSEO from '$lib/components/seo/HomeSEO.svelte';
  
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { tick } from 'svelte';


  /** @type {import('./$types').PageData} */
  export let data;

  let posts = data.posts;
  let totalPages = data.totalPages;
  let currentPage = 1;
  let loading = false;

  // وضعیت نمایش پاپ‌آپ
  let showUpdatePopup = false;

  $: currentUrl = `https://rasarooz.ir${$page.url.pathname}`;

  async function loadPosts(page = 1) {
    try {
      loading = true;
      const result = await fetchPosts(page, 12);
      posts = result.posts;
      totalPages = result.totalPages;
      currentPage = page;
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error(`Error loading home page posts: ${error.message}`);
      }
    } finally {
      loading = false;
    }
  }

  // تابع پاک‌سازی کش سرویس‌ورکر
  async function clearServiceWorkerCache() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
  }

  // بررسی وجود مطالب جدید
  async function checkForUpdates() {
    try {
      const result = await fetchPosts(1, 1); // فقط آخرین پست را دریافت کن
      const latestPost = result.posts[0];
      const currentLatestPost = posts[0];
      
      if (latestPost && currentLatestPost && latestPost.id !== currentLatestPost.id) {
        showUpdatePopup = true;
        await tick();
        // پاک کردن کش سرویس ورکر
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.update();
          }
        }
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (e) {
      console.error('خطا در بررسی به‌روزرسانی:', e);
    }
  }

  // هر 5 دقیقه یک بار کش پاک و بررسی انجام شود
  onMount(() => {
    const interval = setInterval(async () => {
      await clearServiceWorkerCache();
      await checkForUpdates();
    }, 1 * 60 * 1000); // هر ۵ دقیقه
    return () => clearInterval(interval);
  });
</script>

<HomeSEO />
<h1 class="absolute -left-9999 -top-9999 w-0 h-0 overflow-hidden opacity-0">
پایگاه خبری تحلیلی رسانه روز - تازه ترین خبرهای ایران و جهان
</h1>
<!-- Real Content Desktop -->
<div class="hidden md:block" dir="rtl">
  <div class="grid grid-cols-2 gap-2 mb-2 ">
    <div class="bg-[#ed129a] p-4 rounded-[20px] min-w-[300px]">
      <Slider1 posts={data.slider1Posts} />
    </div>
    <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-[20px] min-w-[300px]">
      <Notofday posts={data.notofdayPosts} />
    </div>
  </div>

  <div class="grid grid-cols-[50%_29%_20%] gap-2 mb-2">
    <div>
      <Firstnews posts={data.firstnewsPosts} />
    </div>
    <div class="bg-[#12ed65] p-4 rounded-lg">
      <Lasttext posts={data.lasttextPosts} />
    </div>
    <div class="bg-black p-4 text-white rounded-lg">
      <Shortpic posts={data.shortpicPosts} />
    </div>
  </div>

  <div class="bg-purple-300 p-4 mb-2 rounded-lg">
    <Mediapost posts={data.mediapostPosts} />
  </div>

  <div class="grid grid-cols-[70%_29%] gap-2 mb-2">
    <div class="p-4">
<div class="mb-4"><Singlecard posts={data.singlecard1Posts} bgColor="bg-yellow-100" hoverColor="hover:bg-yellow-50" /></div>
<div class="mb-4"><Singlecard posts={data.singlecard2Posts} bgColor="bg-green-100" hoverColor="hover:bg-green-50" /></div>
<div class="mb-4"><Singlecard posts={data.singlecard3Posts} bgColor="bg-red-100" hoverColor="hover:bg-red-50"/></div>
<div class="mb-4"><Singlecard posts={data.singlecard4Posts} bgColor="bg-blue-100" hoverColor="hover:bg-blue-50" /></div>    
    </div>
    <div class="p-2 bg-blue-50 rounded-lg shadow p-3">
      <Minicard posts={data.minicardPosts} />
    </div>
  </div>

 
  <div class="mb-10"></div>
</div>

<!-- Real Content Mobile -->
<div class="lg:hidden w-full mb-5">
  <Slider1 posts={data.firstnewsPosts} />
  <Notofday posts={data.notofdayPosts} />
  <Lasttext posts={data.lasttextPosts} />
   <div class="mb-20"><Firstnews posts={data.firstnewsPosts} /></div>

</div>

{#if showUpdatePopup}
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 text-center">
      <p class="text-lg font-bold mb-2 text-red-600">مطالب جدیدی در رسانه روز منتشر شد</p>
      <p class="text-gray-400">در حال اجرای نسخه جدید</p>
    </div>
  </div>
{/if}