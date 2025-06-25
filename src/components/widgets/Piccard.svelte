<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <div class="container grid grid-cols-1 gap-0">
    {#each posts as post}
      <a href={`/${post.id}/${post.slug}`}>
        <div class="relative h-[140px] w-full rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-300">
          {#if post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
            <img
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post.title.rendered}
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 flex flex-col justify-between p-4">
              <h2 class="text-lg md:text-xl text-white text-right">{@html post.title.rendered}</h2>
              {#if post.tags_info?.length > 0}
                <span class="text-sm bg-white/80 w-fit px-3 py-1 rounded-full text-gray-700">#{post.tags_info[0].name}</span>
              {/if}
            </div>
          {:else}
            <div class="w-full h-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500">تصویر موجود نیست</span>
            </div>
          {/if}
        </div>
      </a>
    {/each}
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}

