<!-- PageSEO.svelte -->
<script>
    export let pageData;

    // Canonical بر اساس لینک دائمی (permalink) صفحه — بدون وابستگی به URL فعلی
    $: canonical = pageData?.link && pageData.link.startsWith('http')
        ? pageData.link
        : 'https://rasanashr.ir';

    // عنوان: نام کامل برند + عنوان صفحه
    $: title = pageData
        ? `${pageData.title.rendered} | پایگاه خبری تحلیلی رسا نشر`
        : 'پایگاه خبری تحلیلی رسا نشر';

    // توضیحات: استخراج متن خالص از excerpt و محدود به 160 کاراکتر
    $: cleanExcerpt = pageData?.excerpt?.rendered
        ? pageData.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
        : '';
    $: description = cleanExcerpt.length > 160
        ? cleanExcerpt.substring(0, 157) + '...'
        : cleanExcerpt || 'پایگاه خبری تحلیلی رسا نشر، دارای مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی (شماره مجوز: ۸۰۵۳۷)';

    // کلمات کلیدی
    $: keywords = pageData
        ? `پایگاه خبری تحلیلی رسا نشر, ${pageData.title.rendered}`
        : 'رسا نشر, خبر, تحلیل خبری, پایگاه خبری معتبر';

    // نویسنده
    $: authorName = pageData?._embedded?.author?.[0]?.name || 'پایگاه خبری تحلیلی رسا نشر';

    // تصویر شاخص
    $: featuredImage = pageData?._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://rasanashr.ir/graph.jpg';

    // Open Graph
    $: og = {
        title,
        description,
        type: 'article',
        url: canonical,
        image: featuredImage,
        site_name: 'پایگاه خبری تحلیلی رسا نشر',
        locale: 'fa_IR',
        'article:published_time': pageData?.date,
        'article:modified_time': pageData?.modified
    };

    // Schema.org (Article برای صفحات خبری/تحلیلی — WebPage برای صفحات عمومی)
    $: schema = {
        '@context': 'https://schema.org',
        '@type': 'Article', // مناسب‌تر از WebPage برای محتوای تحلیلی/خبری
        headline: pageData?.title?.rendered,
        description,
        image: featuredImage,
        datePublished: pageData?.date,
        dateModified: pageData?.modified,
        author: {
            '@type': 'Person',
            name: authorName
        },
        publisher: {
            '@type': 'Organization',
            name: 'پایگاه خبری تحلیلی رسا نشر',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasanashr.ir/graph.jpg'
            }
        },
        mainEntityOfPage: canonical
    };

    $: safeSchema = JSON.stringify(schema, null, 0);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <meta name="author" content={authorName} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={og.title} />
    <meta property="og:description" content={og.description} />
    <meta property="og:type" content={og.type} />
    <meta property="og:url" content={og.url} />
    <meta property="og:image" content={og.image} />
    <meta property="og:site_name" content={og.site_name} />
    <meta property="og:locale" content={og.locale} />
    {#if og['article:published_time']}
        <meta property="article:published_time" content={og['article:published_time']} />
    {/if}
    {#if og['article:modified_time']}
        <meta property="article:modified_time" content={og['article:modified_time']} />
    {/if}

    <!-- Schema.org -->
    {@html `<script type="application/ld+json">${safeSchema}</script>`}
</svelte:head>