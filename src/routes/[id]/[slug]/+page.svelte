<script>
  import PostSEO from '$lib/components/seo/PostSEO.svelte';
  import Sidebar from '$components/Sidebar.svelte';
  import RelatedPosts from '$components/widgets/RelatedPosts.svelte';
  import Comments from '$components/Comments.svelte';
  import NewsVerification from '$lib/components/NewsVerification.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import Firstnews from '$components/widgets/Firstnews.svelte';


  /** @type {import('./$types').PageData} */
  export let data;

  $: post = data.post;
  $: primaryCategory = post?._embedded?.['wp:term']?.[0]?.[0];

  $: breadcrumbItems = primaryCategory ? [{
    name: primaryCategory.name,
    href: `/category/${primaryCategory.slug}`
  }] : [];

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

<div class="flex flex-col lg:flex-row gap-8">
  <!-- Main Content -->
  <div class="w-full lg:w-2/3">
    {#if post}
      <article class="bg-white rounded-lg shadow-lg overflow-hidden">
        
        <div class="p-6">
          <Breadcrumbs items={breadcrumbItems} postTitle={post.title.rendered} />

          <h1 class="text-lg font-bold lg:text-3xl text-justify mt-4 mb-4 text-black">
            {@html post.title.rendered}
          </h1>
     
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
            <!-- Author -->
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
            
            <!-- Date -->
            <div class="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{formatDate(post.date)}</span>
            </div>

            <!-- Category -->
            {#if primaryCategory}
              <a href="/category/{primaryCategory.slug}" class="text-red-600 hover:underline">
                {primaryCategory.name}
              </a>
            {/if}
          </div>
        </div>

           <div class="flex md:justify-end justify-center my-1 ml-2">
  <NewsVerification {post} />
</div>   


        <div id="content-prose" class="p-6 prose prose-lg max-w-none text-justify leading-loose link-styles text-gray-900">
          {@html post.content.rendered}
        </div>
        
        <!-- Related Posts and Tags Section -->
        <div class="p-4 border-t border-gray-200">
          <RelatedPosts relatedPosts={data.relatedPosts} />
          
          <!-- Tags Section -->
          {#if post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][1] && post._embedded['wp:term'][1].length > 0}
            <div class="mt-8">
              <h3 class="font-bold text-gray-800 mb-2">برچسب‌ها:</h3>
              <div class="flex flex-wrap gap-2">
                {#each post._embedded['wp:term'][1] as tag}
                  <a href="/tag/{tag.slug}" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300">
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

<style>
  a {
    color: rgb(231, 18, 18);
  }
</style>