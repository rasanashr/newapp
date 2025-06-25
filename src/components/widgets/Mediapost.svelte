<script>
  export let posts = [];
</script>

{#if posts && posts.length > 0}
  <!-- Container اصلی -->
  <div class="flex flex-col md:flex-row bg-purple-900 text-white gap-4 p-4 rounded-lg items-start">
    <!-- قسمت تصویر بزرگ و عنوان روی تصویر -->
    <div class="w-full md:w-1/2 lg:w-3/5 flex-shrink-0">
      <!-- تصویر بزرگ -->
      <div class="relative mb-4 rounded-lg overflow-hidden">
        <a href={`/${posts[0].id}/${posts[0].slug}`}>
          <img
            src={posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
            alt={posts[0].title.rendered}
            class="w-full h-[300px] sm:h-[400px] object-cover"
          />
          <!-- عنوان روی تصویر با زمینه سفید نیمه شفاف -->
          <div class="absolute bottom-0 left-0 right-0 bg-white/70 px-4 py-3 rounded-b-lg">
            <h2 class="block font-bold text-xl sm:text-2xl text-black text-justify">
              {@html posts[0].title.rendered}
            </h2>
          </div>
        </a>
      </div>
      <!-- خلاصه مطلب بالاتر -->
      <div class="text-sm text-base-600 line-clamp-3 text-justify mb-2">
        {@html posts[0].excerpt.rendered}
      </div>
    </div>
    <!-- قسمت تصاویر کوچک (12 عدد) -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex items-start">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full">
        {#each posts.slice(1, 13) as post}
          <a href={`/${post.id}/${post.slug}`} class="group">
            <img
              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
              alt={post.title.rendered}
              class="w-full h-[90px] sm:h-[110px] object-cover rounded-md border border-gray-700 \
                     transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}

