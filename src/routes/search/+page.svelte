<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Sidebar from '$components/Sidebar.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import SearchSEO from '$lib/components/seo/SearchSEO.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let searchInput = data.query;
  let posts = data.posts;
  let totalPages = data.totalPages;  let currentPage = data.currentPage;
  
  $: currentUrl = `https://rasanashr.ir${$page.url.pathname}${$page.url.search}`;
  async function handleSearch(event) {
    event.preventDefault();
    if (searchInput.trim()) {
      // Remove invalidateAll and use replaceState
      await goto(`/search?q=${encodeURIComponent(searchInput.trim())}`, {
        replaceState: true
      });
    }
  }

  // Add reactive statement to update posts when data changes
  $: {
    posts = data.posts;
    totalPages = data.totalPages;
    currentPage = data.currentPage;
  }

  function handlePageChange(page) {
    goto(`/search?q=${encodeURIComponent(searchInput)}&page=${page}`);  }
</script>

<SearchSEO query={data.query} {currentUrl} />

<div class="flex flex-col lg:flex-row gap-8">
  <!-- Main Content -->
  <div class="w-full lg:w-2/3">
    <!-- Search Form -->
    <form 
      on:submit={handleSearch} 
      class="mb-8 flex gap-2 bg-white p-4 rounded-lg shadow-lg"
    >
      <input
        type="search"
        bind:value={searchInput}
        placeholder="جستجو در مطالب..."
        class="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
      />
      <button
        type="submit"
        class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
      >
        جستجو
      </button>
    </form>

    {#if data.query}
      <h1 class="text-lg font-bold lg:text-3xl text-justify mb-6">
        نتایج جستجو برای: {data.query}
      </h1>

      {#if posts && posts.length > 0}
        <div class="space-y-8">
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
                <h2 class="text-lg font-bold lg:text-2xl text-justify mb-4">
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

        {#if totalPages > 1}
          <div class="mt-8">
            <Pagination
              {currentPage}
              {totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        {/if}
      {:else}
        <p class="text-xl text-gray-600 text-center py-12">
          نتیجه‌ای برای جستجوی شما یافت نشد.
        </p>
      {/if}
    {:else}
      <div class="text-center py-12 text-gray-600">
        لطفاً عبارت مورد نظر خود را جستجو کنید.
      </div>
    {/if}
  </div>

  <!-- Sidebar -->
  <Sidebar lasttextPosts={data.lasttextPosts} backlinks={data.backlinks} />
</div>
