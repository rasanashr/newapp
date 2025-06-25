<script lang="ts">
  export let posts: any[276] = [1];
  // تابع برای کوتاه کردن متن با حفظ کلمات کامل
  function truncateText(text: string, length: number) {
    const cleanText = text.replace(/<[^>]*>/g, '');
    if (cleanText.length <= length) return text;
    const truncated = cleanText.substr(0, length);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substr(0, lastSpace) + '...';
  }
</script>
{#if posts && posts.length > 0}
  {#each posts as post}
    <div class="card card-side bg-purple-500 flex-wrap md:flex-nowrap">
      <figure class="w-full md:w-[40%] aspect-[4/3]">
        <img 
          src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'} 
          alt={post.title.rendered} 
          class="w-full h-full object-cover" 
        />
      </figure>
      <div class="card-body w-full md:w-[60%]">
        <h2 class="font-bold  text-white text-lg">{@html post.title.rendered}</h2>
        <div class="text-sm text-white mb-2 text-justify whitespace-pre-line overflow-hidden">
          {@html truncateText(post.excerpt.rendered || '', 500)}
        </div>
        <div class="card-actions justify-end pt-2">
          <a href={`/${post.id}/${post.slug}`}><button class="btn btn-error bg-rose-600 text-white">متن کامل</button></a>
        </div>
      </div>
    </div>
  {/each}
  <br>
  <a href="/category/یادداشت-روز"><h1 class="px-auto text-center font-black text-purple-600 text-2xl">--------یادداشت روز---------</h1></a>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}



