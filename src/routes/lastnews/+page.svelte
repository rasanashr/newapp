<!-- src/routes/lastnews/+page.svelte -->
<script>
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte';
  import { fetchPosts } from '$lib/services/wordpress';
  import { onMount } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let posts = data.akharinkhabarPosts;
  let loadingMore = false;
  let page = 1;
  let hasMore = true; // فرض می‌کنیم اطلاعات بیشتری وجود داره

  // تابع بارگذاری خبرهای بیشتر
  async function loadMorePosts() {
    if (loadingMore || !hasMore) return;

    loadingMore = true;
    try {
      const result = await fetchPosts(page + 1, 20);
      if (result.posts.length === 0) {
        hasMore = false;
      } else {
        posts = [...posts, ...result.posts];
        page += 1;
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      loadingMore = false;
    }
  }

  // رصد انتهای صفحه با Intersection Observer
  onMount(() => {
    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-sentinel';
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore && hasMore) {
        loadMorePosts();
      }
    }, { rootMargin: '100px' });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
    };
  });
</script>

<svelte:head>
  <title>پایگاه خبری تحلیلی رسا نشر - آخرین خبرهای منتشر شده در رسا نشر</title>
  <meta name="description" content="آخرین خبرهای منتشر شده در رسا نشر. جدیدترین مقالات و اخبار روز را در این بخش دنبال کنید." />
  <meta name="keywords" content="آخرین خبرها, رسا نشر, مقالات جدید, اخبار روز" />
  <meta name="author" content="RasaNashr.ir" />
  <meta property="og:title" content="پایگاه خبری تحلیلی رسا نشر - آخرین خبرهای منتشر شده در رسا نشر" />
  <meta property="og:description" content="آخرین خبرهای منتشر شده در رسا نشر. جدیدترین مقالات و اخبار روز را در این بخش دنبال کنید." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://rasanashr.ir/lastnews" />
  <meta property="og:image" content="https://rasanashr.ir/graph.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="پایگاه خبری تحلیلی رسا نشر - آخرین خبرهای منتشر شده در رسا نشر" />
  <meta name="twitter:description" content="آخرین خبرهای منتشر شده در رسا نشر. جدیدترین مقالات و اخبار روز را در این بخش دنبال کنید." />
  <meta name="twitter:image" content="https://rasanashr.ir/graph.jpg" />
  <link rel="canonical" href="https://rasanashr.ir/lastnews" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<Akharinkhabar posts={posts} />

{#if loadingMore}
  <div class="text-center py-4 text-gray-500">در حال بارگذاری خبرهای بیشتر...</div>
{/if}

{#if !hasMore && posts.length > 0}
  <div class="text-center py-4 text-gray-400">پایان خبرها</div>
{/if}

<!-- این عنصر در پایین صفحه قرار می‌گیره و توسط Observer رصد میشه -->
<div id="scroll-sentinel" style="height: 1px;"></div>