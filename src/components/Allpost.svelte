<script>
  import { fetchPosts } from '$lib/services/wordpress';
  import { onMount } from 'svelte';

  export let count = 5; // تعداد پست‌ها (پیش‌فرض: 5)

  let posts = [];
  let loading = true;
  let error = null;

  // کش ساده برای جلوگیری از فچ تکراری
  const cache = {};
  let lastCount = count;
  let fetchController = null;

  // اجازه binding متغیر loading به component والد
  export { loading as bindableLoading };

  async function loadPosts() {
    if (cache[count]) {
      posts = cache[count];
      loading = false;
      error = null;
      return;
    }
    if (fetchController) {
      fetchController.abort();
    }
    fetchController = new AbortController();
    loading = true;
    error = null;
    try {
      // Timeout: اگر وردپرس کند بود، بعد از 10 ثانیه قطع شود
      const timeout = setTimeout(() => fetchController.abort(), 10000);
      const result = await fetchPosts(1, count, true, { signal: fetchController.signal });
      clearTimeout(timeout);
      posts = result.posts;
      cache[count] = posts;
    } catch (err) {
      if (err.name === 'AbortError') {
        error = 'درخواست بیش از حد طول کشید. لطفاً دوباره تلاش کنید.';
      } else {
        error = 'خطا در دریافت مطالب';
        console.error('Error fetching posts:', err);
      }
      posts = [];
    } finally {
      loading = false;
      fetchController = null;
    }
  }

  onMount(loadPosts);

  // فقط زمانی که count واقعاً تغییر کند، دوباره فچ کن
  $: if (count !== lastCount) {
    lastCount = count;
    if (typeof window !== 'undefined') {
      loadPosts();
    }
  }
</script>

{#if loading}
  <!-- Skeleton Loader -->
  <div class="grid gap-4">
    {#each Array(count) as _, i}
      <div key={i} class="hidden md:block">
        <div class="flex p-4 rounded-xl shadow bg-white gap-4">
          <div class="skeleton w-32 h-32 rounded-xl"></div>
          <div class="flex flex-col justify-between flex-grow">
            <div class="skeleton h-6 w-3/4 mb-2"></div>
            <div class="skeleton h-4 w-full mb-2"></div>
            <div class="skeleton h-4 w-2/3 mb-2"></div>
            <div class="skeleton h-8 w-32 self-end mt-auto"></div>
          </div>
        </div>
      </div>

      <div class="md:hidden card bg-base-100 shadow-sm skeleton" key={i}>
        <figure><div class="skeleton h-40 w-full"></div></figure>
        <div class="card-body">
          <div class="skeleton h-6 w-3/4 mb-2"></div>
          <div class="skeleton h-4 w-full mb-2"></div>
          <div class="skeleton h-4 w-2/3 mb-2"></div>
          <div class="card-actions justify-end">
            <div class="skeleton h-8 w-32"></div>
          </div>
        </div>
      </div>
    {/each}
  </div>
{:else if error}
  <div class="text-error text-center p-4">{error}</div>
{:else if posts.length > 0}
  <slot name="render" {posts} />
{:else}
  <div class="text-center p-4 text-gray-600">
    مطلبی یافت نشد.
  </div>
{/if}