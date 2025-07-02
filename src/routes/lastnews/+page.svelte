<script>
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte'; 

  /** @type {import('./$types').PageData} */
  export let data;

 
</script>
<HomeSEO />
<title>آخرین خبرها در 24 ساعت گذشته | رسا نشر</title>
<Akharinkhabar posts={data.akharinkhabarPosts} />