<script>
  import { fetchPostsByTag } from '$lib/services/wordpress';
  import TagSEO from '$lib/components/seo/TagSEO.svelte';
  import Sidebar from '$components/Sidebar.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import { page } from '$app/stores';

  /** @type {import('./$types').PageData} */
  export let data;

  let posts = data.posts;
  let tag = data.tag;
  let totalPages = data.totalPages;
  let currentPage = 1;

  $: currentUrl = `https://rasarooz.ir${$page.url.pathname}`;
  $: tagName = data.tag?.name || '';

  async function loadPosts(tagId, page = 1) {
    const result = await fetchPostsByTag(tagId, page);
    posts = result.posts;
    totalPages = result.totalPages;
    currentPage = page;
  }
</script>

<TagSEO tag={data.tag} />

<div class="flex flex-col lg:flex-row gap-8">
  <!-- Main Content -->
  <div class="w-full lg:w-2/3">
    {#if tag}
      <h1 class="text-lg font-bold lg:text-3xl text-justify mt-3 mb-4">مطالب مرتبط با برچسب: {tag.name}</h1>
      
      {#if posts && posts.length > 0}
        <div class="space-y-4">
          {#each posts as post}
            <article class="bg-stone-100 rounded-lg shadow-lg overflow-hidden">
              {#if post._embedded && post._embedded['wp:featuredmedia']}
                <img 
                 src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'} 
                  alt={post.title.rendered}
                  class="w-[98%] h-50 object-cover rounded-xl"
                />
              {/if}
              <div class="p-6">
                <h2 class="text-lg font-bold lg:text-xl text-justify mb-4">
                  <a href="/{post.id}/{post.slug}" class="hover:text-red-600">
                    {@html post.title.rendered}
                  </a>
                </h2>
                <div class="prose prose-lg max-w-none mb-4 text-gray-600 text-justify leading-7">
                  {@html post.excerpt.rendered}
                </div>
              
              </div>
            </article>
          {/each}
        </div>

        <!-- Pagination -->
        {#if totalPages > 1}
          <Pagination
            {currentPage}
            {totalPages}
            onPageChange={(page) => loadPosts(tag.id, page)}
          />
        {/if}
      {:else}
        <p class="text-xl text-gray-600 text-center py-12">
          مطلبی با این برچسب یافت نشد.
        </p>
      {/if}
    {:else}
      <div class="text-center py-12">
        <p class="text-xl text-gray-600">در حال بارگذاری...</p>
      </div>
    {/if}
    <div class="mb-15"></div>
  </div>

  <!-- Sidebar -->
<Sidebar lasttextPosts={data.lasttextPosts} backlinks={data.backlinks} />
</div>
