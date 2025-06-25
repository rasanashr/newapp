<script>
  import PostSEO from '$lib/components/seo/PostSEO.svelte';
  import Sidebar from '$components/Sidebar.svelte';
  import Comments from '$components/Comments.svelte';
  import RelatedPosts from '$components/widgets/RelatedPosts.svelte';
  import { page } from '$app/stores';


  
  /** @type {import('./$types').PageData} */
  export let data;

  $: post = data.post;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: 'persian'
    };
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
  }
</script>

<PostSEO post={data.post} />

<div class="flex flex-col lg:flex-row gap-8 w-full">
  <div class="w-full lg:w-2/3 text-justify">
    {#if post}
      <article class=" rounded-lg shadow-lg overflow-hidden">
      
        <div class="p-4">
          <h1 class="text-lg font-bold mb-4 pt-2 lg:text-3xl text-justify text-black">
            {@html post.title.rendered}
          </h1>

          <!-- Meta Information -->
          <div class="flex items-center gap-4 text-gray-600 mb-8 text-sm">
            {#if post._embedded && post._embedded.author}
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <a href="/author/{post._embedded.author[0].slug}" class="hover:text-red-600">
                  {post._embedded.author[0].name}
                </a>
              </div>
            {/if}
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{formatDate(post.date)}</span>
            </div>
          </div>

          <div class="prose prose-lg max-w-none mb-8 px-1 text-justify leading-9 text-black">
            {@html post.content.rendered}
          </div>

          {#if data.relatedPosts && data.relatedPosts.length > 0}
              <RelatedPosts relatedPosts={data.relatedPosts} />
          {/if}
          <!-- Tags -->
          {#if post._embedded && post._embedded['wp:term']}
            <div class="border-t pt-6">
              <h3 class="text-lg font-bold mb-4">برچسب‌ها:</h3>
              <div class="flex flex-wrap gap-2">
                {#each post._embedded['wp:term'].find(terms => terms[0]?.taxonomy === 'post_tag') || [] as tag}
                  <a 
                    href="/tag/{tag.slug}" 
                    class="inline-block bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full px-3 py-1 text-sm"
                  >
                    {tag.name}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </article>

      <Comments postId={post.id} />
      
      <div class="mb-8"></div>
    {:else}
      <div class="text-center py-12">
        <p class="text-xl text-gray-600">در حال بارگذاری...</p>
      </div>
    {/if}
  </div>

<Sidebar lasttextPosts={data.lasttextPosts} backlinks={data.backlinks} /></div>
