<script>
  import { fetchPostsByAuthor } from '$lib/services/wordpress';
  import Sidebar from '$components/Sidebar.svelte';
  import AuthorSEO from '$lib/components/seo/AuthorSEO.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import { page } from '$app/stores';

  /** @type {import('./$types').PageData} */
  export let data;

  let posts = data.posts;
  let author = data.author;
  let totalPages = data.totalPages;
  let currentPage = 1;
  let seo = data.seo;
  let loading = false;

  $: currentUrl = `https://rasarooz.ir${$page.url.pathname}`;

  async function loadPosts(authorId, page = 1) {
    try {
      loading = true;
      const result = await fetchPostsByAuthor(authorId, page);
      posts = result.posts;
      totalPages = result.totalPages;
      currentPage = page;
      // Scroll to top after loading new page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error(`Error loading author posts [id=${authorId}, page=${page}]: ${error.message}`);
      }
    } finally {
      loading = false;
    }
  }
</script>

<AuthorSEO {author} {seo} />

<div class="flex flex-col lg:flex-row gap-8">
  <!-- Main Content -->
  <div class="w-full lg:w-2/3">
    {#if author}
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 class="text-lg font-bold lg:text-3xl text-justify mb-4">{author.name}</h1>
        {#if author.description}
          <div class="prose prose-lg text-md lg:text-lg max-w-none mb-4 text-gray-500 text-justify leading-6">
            {@html author.description}
          </div>
        {/if}
      </div>
      
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
              onPageChange={(page) => loadPosts(author.id, page)}
            />
          </div>
        {/if}
      {:else}
        <div class="text-center py-8">
          <p class="text-xl text-gray-600">هیچ مطلبی از این نویسنده یافت نشد.</p>
        </div>
      {/if}
    {:else}
      <div class="text-center py-8">
        <h1 class="text-3xl font-bold mb-4">نویسنده یافت نشد</h1>
        <p class="text-xl text-gray-600">متأسفانه نویسنده مورد نظر شما در سایت وجود ندارد.</p>
        <a href="/" class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          بازگشت به صفحه اصلی
        </a>
      </div>
    {/if}
    <div class="mb-15"></div>
  </div>

  <!-- Sidebar -->
 <Sidebar lasttextPosts={data.lasttextPosts} backlinks={data.backlinks} />
</div>
