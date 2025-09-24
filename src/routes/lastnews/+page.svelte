<script>
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte';
  import { fetchPosts } from '$lib/services/wordpress';
  import { onMount } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let posts = data.akharinkhabarPosts;
  let showUpdatePopup = false;
  let loading = false;


  // تابع بررسی وجود پست‌های جدید
async function checkForNewPosts() {
  try {
    loading = true;
    const result = await fetchPosts(1, 50);
    
    console.log('Current posts:', posts.map(p => p.id));
    console.log('New posts:', result.posts.map(p => p.id));
    
    const hasNewPosts = result.posts.some(
      newPost => !posts.some(oldPost => oldPost.id === newPost.id)
    );
    
    console.log('Has new posts:', hasNewPosts);
    
    if (hasNewPosts) {
      showUpdatePopup = true;
      setTimeout(() => {
        posts = result.posts;
        location.reload();
      }, 3000);
    }
    loading = false;
  } catch (error) {
    console.error(`Error checking for new posts: ${error.message}`);
    loading = false;
  }
}

  // هر ۲ دقیقه یک بار بررسی انجام شود
 onMount(() => {
  const interval = setInterval(checkForNewPosts, 2 * 60 * 1000); // هر ۵ دقیقه
  return () => clearInterval(interval);
});
</script>

<svelte:head>
  <title>رسانه روز - آخرین خبرهای منتشر شده در رسانه روز</title>
</svelte:head>

{#if loading}
  <div class="text-center py-4">در حال بارگذاری...</div>
{:else}
  <Akharinkhabar posts={posts} />
{/if}

{#if showUpdatePopup}
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 text-center">
      <p class="text-lg font-bold mb-2 text-red-600">مطالب جدیدی در رسانه روز منتشر شد</p>
      <p class="text-gray-400">در حال اجرای نسخه جدید</p>
    </div>
  </div>
{/if}