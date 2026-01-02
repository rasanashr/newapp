<!-- CategorySEO.svelte (اصلاح‌شده) -->
<script>
    export let seo;
    export let category;

    // Canonical فقط از slug معتبر دسته‌بندی ساخته می‌شود — بدون وابستگی به URL فعلی
    $: canonical = category
        ? `https://rasanashr.ir/category/${category.slug}`
        : 'https://rasanashr.ir';

    // Title و description بدون تغییر
    $: title = category
        ? `${category.name} | پایگاه خبری تحلیلی رسا نشر`
        : 'پایگاه خبری تحلیلی رسا نشر';
    $: description = seo?.description || `آرشیو مطالب منتشر شده در ${category?.name} در پایگاه خبری رسا نشر`;
    $: keywords = category
        ? `${category.name}, رسا نشر, پایگاه خبری, خبر, گزارش خبری ${category.name}`
        : '';

    // Open Graph
    $: og = {
        title,
        description,
        type: 'website',
        url: canonical,
        site_name: 'پایگاه خبری تحلیلی رسا نشر',
        locale: 'fa_IR'
    };

    // Schema
    $: schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: canonical,
        publisher: {
            '@type': 'Organization',
            name: 'پایگاه خبری تحلیلی رسا نشر',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasanashr.ir/graph.jpg'
            }
        }
    };
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={og.title} />
    <meta property="og:description" content={og.description} />
    <meta property="og:type" content={og.type} />
    <meta property="og:url" content={og.url} />
    <meta property="og:site_name" content={og.site_name} />
    <meta property="og:locale" content={og.locale} />

    <!-- Schema -->
    {@html `<script type="application/ld+json">${JSON.stringify(schema, null, 0)}</script>`}
</svelte:head>