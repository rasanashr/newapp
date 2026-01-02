<script>
    // متادیتای استاندارد صفحه اصلی
    $: canonical = 'https://rasanashr.ir';

    $: title = 'پایگاه خبری تحلیلی رسا نشر | صدای رسای مردم ایران';
    $: description = 'پایگاه خبری تحلیلی رسا نشر - دارای مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی (شماره مجوز: ۸۰۵۳۷). تازه‌ترین خبرهای ایران و جهان، تحلیل‌های سیاسی، اقتصادی، اجتماعی و فرهنگی.';
    $: keywords = 'رسا نشر, خبر, گزارش, آخرین خبرها, قیمت ارز, قیمت دلار, قیمت طلا, قیمت لحظه‌ای, قیمت سکه, بازار بورس, اجتماعی, اخبار فرهنگی, اخبار سیاسی, اخبار اقتصادی, پایگاه خبری تحلیلی, ایران, گزارش اجتماعی, هوش مصنوعی, اینترنت, فیلترینگ, تحلیل سیاسی, اخبار روز, جنگ ایران و اسرائیل, مکانیسم ماشه, تحریم, اسنپ بک';

    $: og = {
        title,
        description,
        type: 'website',
        url: canonical,
        site_name: 'پایگاه خبری تحلیلی رسا نشر',
        locale: 'fa_IR'
    };

    $: schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'پایگاه خبری تحلیلی رسا نشر',
        description,
        url: canonical,
        publisher: {
            '@type': 'Organization',
            name: 'پایگاه خبری تحلیلی رسا نشر',
            url: 'https://rasanashr.ir',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasanashr.ir/graph.jpg'
            }
        }
    };

    $: safeSchema = JSON.stringify(schema, null, 0);
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
</svelte:head>

{@html `<script type="application/ld+json">${safeSchema}</script>`}