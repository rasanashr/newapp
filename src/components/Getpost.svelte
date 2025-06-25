<script>
  import { fetchPostsByCategory } from '$lib/services/wordpress';
  import { onMount, afterUpdate } from 'svelte';

  export let category; // شناسه دسته‌بندی
  export let count = 5; // تعداد پست‌ها (پیش‌فرض: 5)

  // متغیرهای داخلی
  let posts = [];
  let loading = true;
  let error = null;

  // برای binding loading به component والد
  export { loading as bindableLoading };

  async function loadPosts() {
    try {
      loading = true;
      const result = await fetchPostsByCategory(category, 1, count);
      posts = result.posts;
    } catch (err) {
      error = 'خطا در دریافت مطالب';
      console.error('Error fetching posts:', err);
    } finally {
      loading = false;
    }
  }

  // فقط در کلاینت اجرا می‌شه
  onMount(loadPosts);

  // اختیاری: اگر از SPA روتینگ استفاده کنیم و props عوض بشن
  $: if (category || count) {
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
{:else}
  <slot name="render" {posts} />
{/if}