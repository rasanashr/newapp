<script>
  import Akharinkhabar from '$components/widgets/Akharinkhabar.svelte'; 

  /** @type {import('./$types').PageData} */
  export let data;

  $: metaData = {
    title: 'رسا نشر | آخرین اخبار و رویدادها',
    description: 'پایگاه خبری رسانشر - آخرین اخبار و رویدادها، تحلیل‌های روز و گزارش‌های تخصصی',
    keywords: 'اخبار, رویدادها, خبر فوری, گزارش خبری, تحلیل خبر, رسانشر',
    canonical: 'rasanashr.ir',
    ogTitle: 'رسا نشر - پایگاه خبری رسانشر',
    ogDescription: 'مرجع اخبار و رویدادهای روز - پوشش لحظه‌ای اخبار و رویدادها',
    ogImage: 'https://rasanashr.ir/wp-content/uploads/2023/04/1402logo.png'
  };
</script>

<title>{metaData.title}</title>
<Akharinkhabar posts={data.akharinkhabarPosts} />