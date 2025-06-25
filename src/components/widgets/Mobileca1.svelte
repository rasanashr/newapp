<script>
  export let posts = [];
</script>
{#if posts && posts.length > 0}
  <div class="carousel carousel-center bg-neutral rounded-box max-w-md h-[300px]">
    {#each posts as post}
      <div class="carousel-item mb-4 pb-4">
        <a href={`/${post.id}/${post.slug}`}>
          <img 
            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'} 
            alt={post.title.rendered} 
            class="w-full h-[280px] px-2 py-4"
          />
        </a>
      </div>
    {/each}
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}

