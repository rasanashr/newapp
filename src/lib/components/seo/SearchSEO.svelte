<!-- SearchSEO.svelte -->
<script>
    export let query = '';

    // Canonical ثابت برای صفحه جستجو — بدون فاصله و مستقل از URL فعلی
    $: canonical = 'https://rasanashr.ir/search';

    // عنوان و توضیحات با نام کامل رسانه
    $: title = query
        ? `جستجو: ${query} | پایگاه خبری تحلیلی رسا نشر`
        : 'جستجو در پایگاه خبری تحلیلی رسا نشر';

    $: description = query
        ? `نتایج جستجو برای «${query}» در پایگاه خبری تحلیلی رسا نشر، دارای مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی (شماره مجوز: ۸۰۵۳۷)`
        : 'جستجو در بین هزاران خبر، گزارش و تحلیل منتشر شده در پایگاه خبری تحلیلی رسا نشر';

    // Open Graph — URL از canonical گرفته می‌شود
    $: og = {
        title,
        description,
        type: 'website',
        url: canonical,
        site_name: 'پایگاه خبری تحلیلی رسا نشر',
        locale: 'fa_IR'
    };
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <!-- صفحات جستجو باید `noindex` باشند تا از محتوای تکراری جلوگیری شود -->
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={og.title} />
    <meta property="og:description" content={og.description} />
    <meta property="og:type" content={og.type} />
    <meta property="og:url" content={og.url} />
    <meta property="og:site_name" content={og.site_name} />
    <meta property="og:locale" content={og.locale} />
</svelte:head>