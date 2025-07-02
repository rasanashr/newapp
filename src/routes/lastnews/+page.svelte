<script>
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte'; 
  import HomeSEO from '$lib/components/seo/HomeSEO.svelte';
  /** @type {import('./$types').PageData} */
 


</script>

<HomeSEO />
<title>آخرین خبرهای 24 ساعت گذشته ایران و جهان | رسا نشر</title>
<Akharinkhabar posts={data.akharinkhabarPosts} />