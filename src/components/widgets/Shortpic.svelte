<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <div class="badge badge-dash badge-success mb-2 text-2xl">اجتماعی</div>
  {#each posts as post}
    <div class="object-center bg-base-100 shadow-xl rounded-2xl p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102">
      <span class="indicator-item indicator-center indicator-middle text-sm"></span>
      <a href={`/${post.id}/${post.slug}`}>
        <img
          src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
          alt={post.title.rendered}
          class="w-65 h-40 rounded-2xl mt-0 pt-0"
        />
      </a>
      <h5 class="text-center text-gray-500 text-sm"> {@html post.title.rendered}</h5>
    </div>
    <br />
  {/each}
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}

