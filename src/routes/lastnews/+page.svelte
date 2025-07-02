<script>
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte'; 

  /** @type {import('./$types').PageData} */
  export let data;

  $: metaData = {
    title: 'آخرین اخبار 24 ساعت گذشته ایران و جهان | پایگاه خبری رسا نشر',
   
  };
</script>

<title>{metaData.title}</title>
<Akharinkhabar posts={data.akharinkhabarPosts} />