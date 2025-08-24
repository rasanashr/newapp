<script>
    import { browser } from '$app/environment';
    import { page } from '$app/stores';

    $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;
    $: title = 'رسا نشر | تازه‌ترین اخبار اجتماعی، فرهنگی، سیاسی و اقتصادی ایران و جهان';
    $: description = 'پایگاه خبری تحلیلی رسا نشر - آخرین اخبار روز ایران و جهان';
    $: keywords = 'رسا نشر, اخبار اجتماعی, اخبار فرهنگی, اخبار سیاسی, اخبار اقتصادی, پایگاه خبری تحلیلی, رسا نشر ایران, گزارش اجتماعی, هوش مصنوعی, اینترنت, فیلترینگ, تحلیل سیاسی, اخبار روز, اخبار جنگ, جنگ ایران و اسرائیل, حمله نظامی, مذاکره ایران و آمریکا';
    $: og = {
        title,
        description,
        type: 'website',
        url: currentUrl,
        site_name: 'رسا نشر',
        locale: 'fa_IR'
    };
    $: canonical = currentUrl;
    $: schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'رسا نشر',
        description,
        url: currentUrl
    };
    $: safeSchema = JSON.stringify(schema, null, 2);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={og.title} />
    <meta property="og:description" content={og.description} />
    <meta property="og:type" content={og.type} />
    <meta property="og:url" content={og.url} />
    <meta property="og:site_name" content={og.site_name} />
    <meta property="og:locale" content={og.locale} />
</svelte:head>

{@html `<script type="application/ld+json">${safeSchema}</script>`}