<script>
  import { fetchPosts } from '$lib/services/wordpress';
  import Firstnews from '$components/widgets/Firstnews.svelte';
  import Notofday from '$components/widgets/Notofday.svelte'; 
  import Lasttext from '$components/widgets/Lasttext.svelte'; 
  import Shortpic from '$components/widgets/Shortpic.svelte'; 
  import Slider1 from '$components/widgets/Slider1.svelte'; 
  import Mediapost from '$components/widgets/Mediapost.svelte'; 
  import Singlecard from '$components/widgets/Singlecard.svelte'; 
  import Piccard from '$components/widgets/Piccard.svelte'; 
  import Minicard from '$components/widgets/Minicard.svelte'; 
  import Mobileca1 from '$components/widgets/Mobileca1.svelte';
  import HomeSEO from '$lib/components/seo/HomeSEO.svelte';
  import BackLinks from '$components/BackLinks.svelte';
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte';
  
  import { page } from '$app/stores';


  /** @type {import('./$types').PageData} */
  export let data;

  let posts = data.posts;
  let totalPages = data.totalPages;
  let currentPage = 1;
  let loading = false;

  $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;

  async function loadPosts(page = 1) {
    try {
      loading = true;
      const result = await fetchPosts(page, 12);
      posts = result.posts;
      totalPages = result.totalPages;
      currentPage = page;
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      loading = false;
    }
  }
</script>

<HomeSEO />

<!-- Real Content Desktop -->
<div class="hidden md:block" dir="rtl">
  <div class="grid grid-cols-2 gap-2 mb-2 ">
    <div class="bg-red-600 p-4 rounded-[20px] min-w-[300px]">
      <Slider1 posts={data.slider1Posts} />
    </div>
    <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-[20px] min-w-[300px]">
      <Notofday posts={data.notofdayPosts} />
    </div>
  </div>

  <div class="grid grid-cols-[50%_29%_20%] gap-2 mb-2">
    <div>
      <Firstnews posts={data.firstnewsPosts} />
    </div>
    <div class="bg-red-600 p-4 rounded-lg">
      <Lasttext posts={data.lasttextPosts} />
    </div>
    <div class="bg-black p-4 text-white rounded-lg">
      <Shortpic posts={data.shortpicPosts} />
    </div>
  </div>

  <div class="bg-purple-300 p-4 mb-2 rounded-lg">
    <Mediapost posts={data.mediapostPosts} />
  </div>

  <div class="grid grid-cols-[70%_29%] gap-2 mb-2">
    <div class="p-4">
<div class="mb-2"><Singlecard posts={data.singlecard1Posts} bgColor="bg-yellow-100" hoverColor="hover:bg-yellow-50" /></div>
<div class="mb-2"><Singlecard posts={data.singlecard2Posts} bgColor="bg-green-100" hoverColor="hover:bg-green-50" /></div>
<div class="mb-2"><Singlecard posts={data.singlecard3Posts} bgColor="bg-red-100" hoverColor="hover:bg-red-50"/></div>
<div class="mb-2"><Singlecard posts={data.singlecard4Posts} bgColor="bg-blue-100" hoverColor="hover:bg-blue-50" /></div>    
    </div>
    <div class="p-2 bg-blue-50 rounded-lg shadow p-3">
      <Minicard posts={data.minicardPosts} />
    </div>
  </div>

 
  <div class="mb-10"></div>
</div>

<!-- Real Content Mobile -->
<div class="lg:hidden w-full mb-5">
  <Slider1 posts={data.firstnewsPosts} />
  <Notofday posts={data.notofdayPosts} />
  <Lasttext posts={data.lasttextPosts} />
   <Piccard posts={data.piccardPosts} />
  <div class="mb-10"><Firstnews posts={data.firstnewsPosts} /></div>

</div>