<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <div class="flex 2xl:flex-row">
    <div class="w-full md:w-2/4 p-4">
      <div class="badge badge-dash badge-error text-3xl">چند رسانه ای</div>
      <div class="relative mb-4">
        <a href={`/${posts[0].id}/${posts[0].slug}`}>
          <img src={posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'} alt={posts[0].title.rendered} class="w-full h-[300px] object-cover rounded-lg" />
        </a>
      </div>
      <a href={`/${posts[0].id}/${posts[0].slug}`} class="block font-bold text-xl mb-2">
        {@html posts[0].title.rendered}
      </a>
      <div class="text-sm text-base-600 text-justify">{@html posts[0].excerpt.rendered}</div>
    </div>
    <div class="m-t-6">
      {#each posts.slice(1, 11) as post, i}
        <ul>
          <li class="py-2">✅<a href={`/${post.id}/${post.slug}`} class="text-lg">{@html post.title.rendered}</a></li>
        </ul>
      {/each}
    </div>
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}