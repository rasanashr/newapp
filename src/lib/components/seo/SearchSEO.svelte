<!-- SearchSEO.svelte -->
<script>
    import { page } from '$app/stores';
    export let query = '';
    $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;
    $: title = query ? `جستجو: ${query} | رسانه روز` : 'جستجو در رسانه روز';
    $: description = query 
        ? `نتایج جستجو برای ${query} در پایگاه خبری تحلیلی رسانه روز`
        : 'جستجو در مطالب پایگاه خبری تحلیلی رسانه روز';
    $: og = {
        title,
        description,
        type: 'website',
        url: currentUrl,
        site_name: 'رسانه روز',
        locale: 'fa_IR'
    };
    $: canonical = 'https://rasarooz.ir/search';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={og.title} />
    <meta property="og:description" content={og.description} />
    <meta property="og:type" content={og.type} />
    <meta property="og:url" content={og.url} />
    <meta property="og:site_name" content={og.site_name} />
    <meta property="og:locale" content={og.locale} />
</svelte:head>
