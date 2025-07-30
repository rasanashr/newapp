<script>
    import { page } from '$app/stores';
    export let post;

    // Calculate current URL
    $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;

    // Metadata
    $: title = post ? `${post.title.rendered} | رسا نشر` : 'رسا نشر';
    $: description = post?.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 160) || '';
    $: keywords = post?.tags_info?.map(tag => tag.name).join(', ') || '';

    // Open Graph metadata
    $: og = {
        title,
        description,
        type: 'article',
        url: currentUrl,
        image: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        site_name: 'رسا نشر',
        locale: 'fa_IR',
        'article:published_time': post?.date,
        'article:modified_time': post?.modified
    };

    // Canonical URL
    $: canonical = currentUrl;

    // Schema.org JSON-LD
    $: schema = post ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: post?.title?.rendered || 'مقاله بدون عنوان',
        description,
        image: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        datePublished: post?.date,
        dateModified: post?.modified,
        author: {
            '@type': 'Person',
            name: post?._embedded?.author?.[0]?.name || 'رسا نشر'
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
    } : null;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <meta name="author" content={post?._embedded?.author?.[0]?.name || 'رسا نشر'} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={og.title} />
    <meta property="og:description" content={og.description} />
    <meta property="og:type" content={og.type} />
    <meta property="og:url" content={og.url} />
    <meta property="og:image" content={og.image} />
    <meta property="og:site_name" content={og.site_name} />
    <meta property="og:locale" content={og.locale} />
    <meta property="article:published_time" content={og['article:published_time']} />
    <meta property="article:modified_time" content={og['article:modified_time']} />

    <!-- Schema.org -->
    {#if schema}
        <script type="application/ld+json">
            {JSON.stringify(schema, null, 2)}
        </script>
    {/if}
</svelte:head>