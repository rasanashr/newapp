<script>
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte';
  import { fetchPosts } from '$lib/services/wordpress';
  import { onMount } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let posts = data.akharinkhabarPosts;
  let showUpdatePopup = false;
  let loading = false;

  $: metaData = {
    title: 'آخرین اخبار 24 ساعت گذشته ایران و جهان | پایگاه خبری رسا نشر',
  };

  // تابع بررسی وجود پست‌های جدید
  async function checkForNewPosts() {
    try {
      loading = true;
      const result = await fetchPosts(1, 50);
      
      // مقایسه ID آخرین پست
      if (result.posts.length > 0 && posts.length > 0 && 
          result.posts[0].id !== posts[0].id) {
        showUpdatePopup = true;
        setTimeout(() => {
          posts = result.posts;
          location.reload();
        }, 3000);
      }
      loading = false;
    } catch (error) {
      console.error('Error checking for new posts:', error);
      loading = false;
    }
  }

  // هر ۲ دقیقه یک بار بررسی انجام شود
  onMount(() => {
    const interval = setInterval(checkForNewPosts, 2 * 60 * 1000); // هر ۲ دقیقه
    return () => clearInterval(interval);
  });
</script>

<title>{metaData.title}</title>

{#if loading}
  <div class="text-center py-4">در حال بارگذاری...</div>
{:else}
  <Akharinkhabar posts={posts} />
{/if}

{#if showUpdatePopup}
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 text-center">
      <p class="text-lg font-bold mb-2 text-red-600">اخبار جدید منتشر شد</p>
      <p class="text-gray-400">در حال به‌روزرسانی صفحه...</p>
    </div>
  </div>
{/if}