<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <div class="grid gap-4">
    {#each posts as post}
      <div
        class="flex flex-col md:flex-row p-4 rounded-xl shadow bg-[#1C4D8D] gap-4 
               transition duration-300 hover:-translate-y-1 hover:scale-[1.02] 
               hover:bg-[#4988C4] hover:ring-2 hover:ring-[#BDE8F5]"
      >
        <!-- تصویر شاخص -->
        <img
          src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
          alt={post.title.rendered}
          class="w-24 h-24 md:w-20 md:h-20 object-cover rounded-full mx-auto md:mx-0"
        />
  
        <!-- محتوای متنی با لینک -->
        <a
          href={`/${post.id}/${post.slug}`}
          class="flex flex-col justify-between flex-1 text-inherit no-underline"
          aria-label={`مشاهده مطلب ${post.title.rendered}`}
        >
          <div>
            <h2 class="font-bold text-base md:text-lg text-white mb-2 text-center md:text-right">
              {@html post.title.rendered}
            </h2>
             
          </div>
        </a>
      </div>
    {/each}
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}

