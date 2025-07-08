<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <div class="hidden md:block">
    <div class="grid gap-2">
      {#each posts as post}
        <a href={`/${post.id}/${post.slug}`} class="self-end">
          <div class="flex p-4 rounded-xl shadow bg-white gap-2 transition-all hover:-translate-y-1 hover:scale-[1.02]">
            <img
              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
              alt={post.title.rendered}
              class="w-32 h-32 object-cover rounded-xl"
              decoding="async"
            />
            <div class="flex flex-col justify-between flex-grow">
              <h2 class="font-bold text-lg text-justify">{@html post.title.rendered}</h2>
              <div class="text-sm text-gray-600 line-clamp-3 mb-2 text-justify">
                {@html post.excerpt.rendered}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
  
  
  <div class="md:hidden grid gap-4">
   {#each posts as post}
        <a href={`/${post.id}/${post.slug}`} class="self-end">
          <div class="flex p-4 rounded-xl shadow bg-white gap-2 transition-all hover:-translate-y-1 hover:scale-[1.02]">
            <img
              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
              alt={post.title.rendered}
              class="w-32 h-32 object-cover rounded-xl"
              decoding="async"
            />
            <div class="flex flex-col justify-between flex-grow">
              <h2 class="font-bold text-md text-justify">{@html post.title.rendered}</h2>
              <div class="font-light text-sm text-gray-600 line-clamp-3 mb-2 text-justify">
                {@html post.excerpt.rendered}
              </div>
            </div>
          </div>
        </a>
      {/each}
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}