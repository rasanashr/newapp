<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <!-- دسکتاپ -->
  <div class="hidden md:block">
    <div class="grid gap-4">
      {#each posts as post}
        <div class="flex p-4 rounded-xl shadow bg-white gap-4 transition-all hover:-translate-y-1 hover:scale-[1.02]">
          <img 
            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'} 
            alt={post.title.rendered} 
            class="w-32 h-32 object-cover rounded-xl"
            loading="lazy"
            decoding="async"
          />
          <div class="flex flex-col justify-between flex-grow">
            <h2 class="font-bold text-lg text-justify">{@html post.title.rendered}</h2>
            <div class="text-sm text-gray-600 line-clamp-3 mb-2 text-justify">
              {@html post.excerpt.rendered}
            </div>
            <a href={`/${post.id}/${post.slug}`} class="self-end">
              <button class="btn btn-secondary">مشاهده خبر</button>
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <!-- موبایل -->
  <div class="md:hidden grid gap-4">
    {#each posts as post, index}
      <div class="card bg-base-100 shadow-sm">
        <figure>
          <img 
            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'} 
            alt={post.title.rendered} 
            class="w-full h-[400px] object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </figure>
        <div class="card-body">
          <h2 class="font-bold text-lg text-justify">{@html post.title.rendered}</h2>
          <div class="text-sm text-gray-600 line-clamp-3 mb-2 text-justify">
            {@html post.excerpt.rendered}
          </div>
          <div class="card-actions justify-end">
            <a href={`/${post.id}/${post.slug}`}>
              <button class="btn btn-secondary">مشاهده خبر</button>
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}