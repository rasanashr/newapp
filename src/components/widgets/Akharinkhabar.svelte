<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <div class="badge badge-md mb-2"><h1 class="font-extrabold text-red-600">آخرین خبرها</h1>
  <br>
    <h1>آخرین خبرها در 24 ساعت گذشته</h1>

</div>
  <ul class="list rounded-box w-[99%] ">
    {#each posts as post, i}
      <li class="list-row bg-linear-to-r/hsl from-indigo-500 to-teal-400 mb-1 items-center">
        <div class="w-8 text-center text-xl font-bold text-red-700 tabular-nums">{i + 1}</div>
        <div class="flex items-center justify-center min-w-20">
          <img
            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
            alt={post.title.rendered}
            class="size-12 rounded-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="list-col-grow">
          <a href={`/${post.id}/${post.slug}`} class="link no-underline">
            <h4 class="text-md font-bold no-underline text-justify">{@html post.title.rendered}</h4>
          </a>
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}
