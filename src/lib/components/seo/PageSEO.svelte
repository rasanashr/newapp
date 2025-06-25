<!-- PageSEO.svelte -->
<script>
    import { page } from '$app/stores';
    export let pageData;
    $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;
    $: title = pageData ? `${pageData.title.rendered} | رسا نشر` : 'رسا نشر';
    $: description = pageData?.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 160) || '';
    $: keywords = pageData ? `رسا نشر, ${pageData.title.rendered}` : '';
    $: og = {
        title,
        description,
        type: 'article',
        url: currentUrl,
        image: pageData?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        site_name: 'رسا نشر',
        locale: 'fa_IR',
        'article:published_time': pageData?.date,
        'article:modified_time': pageData?.modified
    };
    $: canonical = currentUrl;
    $: schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageData?.title?.rendered,
        description,
        datePublished: pageData?.date,
        dateModified: pageData?.modified,
        author: {
            '@type': 'Person',
            name: pageData?._embedded?.author?.[0]?.name || 'رسا نشر'
        },
        publisher: {
            '@type': 'Organization',
            name: 'رسا نشر',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasanashr.ir/duc.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': currentUrl
        }
    };
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <meta name="author" content={pageData?._embedded?.author?.[0]?.name || 'رسا نشر'} />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={og.title} />
    <meta property="og:description" content={og.description} />
    <meta property="og:type" content={og.type} />
    <meta property="og:url" content={og.url} />
    <meta property="og:image" content={og.image} />
    <meta property="og:site_name" content={og.site_name} />
    <meta property="og:locale" content={og.locale} />
    <meta property="article:published_time" content={og['article:published_time']} />
    <meta property="article:modified_time" content={og['article:modified_time']} />
    {@html `<script type=\"application/ld+json\">${JSON.stringify(schema)}</script>`}
</svelte:head>
