<!-- src/routes/goldprice/+page.svelte -->
<script>
  import { onMount } from 'svelte';
    import Sidebar from '$components/Sidebar.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
 
  // تاریخ شمی (جلالی) که در عنوان صفحه و هدر نمایش داده میشه
  let shamsiDate = '';
  let pageTitle = 'قیمت لحظه ای طلا، سکه و دلار';

  // در onMount به صورت داینامیک jalaliday و dayjs رو ایمپورت می‌کنیم ولی برای نمایش تاریخ از Intl با تقویم Persian استفاده می‌کنیم
  onMount(async () => {
    // اول تلاش می‌کنیم jalaliday را ایمپورت کنیم تا در صورت نیاز نگهداری کنیم (ممکن است برای عملیات‌های دیگر مفید باشد)
    try {
      await import('dayjs');
      await import('jalaliday');
    } catch (e) {
      // اگر لود نشد هم مشکلی نیست؛ فرمت تاریخ را با Intl تنظیم می‌کنیم
    }

    // حتماً از Intl با تقویم Persian استفاده می‌کنیم تا نام ماه‌ها به فارسی (مثلاً "مهر") نمایش داده شود
    try {
      shamsiDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date());
    } catch (e) {
      // در صورت نبودن پشتیبانی Intl، از یک fallback ساده استفاده می‌کنیم
      const d = new Date();
      shamsiDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    // آپدیت عنوان صفحه
    document.title = `${pageTitle} در ${shamsiDate}`;
  });
</script>

<svelte:head>
  <title>{pageTitle}{shamsiDate ? ` در ${shamsiDate}` : ''}</title>
  <meta name="description" content="قیمت لحظه ای طلا، سکه و دلار در بازار تهران " />
  <meta name="author" content="RasaNashr.ir" />
  <link rel="canonical" href="https://rasanashr.ir/goldprice" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.png" />
    <meta property="og:title" content="{pageTitle}{shamsiDate ? ` در ${shamsiDate}` : ''}" />
    <meta property="og:description" content="قیمت لحظه ای طلا، سکه و دلار در بازار تهران " />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rasanashr.ir/goldprice" />
    <meta property="og:image" content="https://rasanashr.ir/graph.jpg" />
     

</svelte:head>





<div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <div class="w-full lg:w-2/3">
        
      {#if true}
        <article class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-8">
            <header class="mb-6">
              <h1 class="text-2xl font-bold">{pageTitle}{shamsiDate ? ` در ${shamsiDate}` : ''}</h1>
              <p class="text-sm text-gray-500">در جدول زیر قیمت لحظه‌ای طلا، سکه و دلار نمایش داده می‌شود.</p>
            </header>

            <!-- این تگ توسط فایل static/tala.js پردازش می‌شود و جدول بازار را می‌سازد -->
            <div id="goldprice-widget" class="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <tgju
                type="market-data"
                items="137121,391292,391295,137138,137137,137139,137140,137141,137203,137205"
                columns="dot,diff,low,high,time"
                token="webservice"
                styles={`{"low":"#e30b00","high":"#02c22f"}`}></tgju>
            </div>
          </div>
        </article>
      {/if}

  <!-- بارگذاری اسکریپت محلی که داده‌ها را می‌خواند و المان <tgju> را تبدیل می‌کند -->
  <script src="/tala.js" defer></script>

        </div>

        <!-- Sidebar -->
      
<Sidebar lasttextPosts={data.lasttextPosts} backlinks={data.backlinks} />      
    
 </div>
 <div class="mb-10"></div>