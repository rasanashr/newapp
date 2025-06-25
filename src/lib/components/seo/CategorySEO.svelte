<!-- CategorySEO.svelte -->
<script>
    import { page } from '$app/stores';

    export let seo;
    export let category;
    $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;

    // SSR meta/title values
    $: title = category ? `${category.name} | رسا نشر` : 'رسا نشر';
    $: description = seo?.description || `آرشیو مطالب دسته ${category?.name} در رسا نشر`;
    $: keywords = category ? `${category.name}, رسا نشر, اخبار ${category.name}` : '';

    // Open Graph
    $: og = {
        title,
        description,
        type: 'website',
        url: currentUrl,
        site_name: 'رسا نشر',
        locale: 'fa_IR'
    };

    // SSR canonical
    $: canonical = currentUrl;

    // SSR schema
    $: schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: currentUrl,
        publisher: {
            '@type': 'Organization',
            name: 'رسا نشر',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasanashr.ir/duc.png'
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
    {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
