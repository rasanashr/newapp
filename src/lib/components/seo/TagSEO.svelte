<script>
  export let tag = null;

  // Canonical پایه برای صفحه آرشیو برچسب‌ها
  $: baseCanonical = 'https://rasanashr.ir/tag';

  // اگر برچسب وجود دارد، canonical بر اساس slug آن ساخته می‌شود
  $: canonical = tag?.slug
    ? `https://rasanashr.ir/tag/${tag.slug}`
    : baseCanonical;

  // عنوان و توضیحات
  $: title = tag?.name
    ? `${tag.name} | پایگاه خبری تحلیلی رسا نشر`
    : 'آرشیو برچسب‌ها | پایگاه خبری تحلیلی رسا نشر';

  $: description = tag?.description
    ? tag.description
    : tag?.name
      ? `مطالب مرتبط با برچسب «${tag.name}» در پایگاه خبری تحلیلی رسا نشر، دارای مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی (شماره مجوز: ۸۰۵۳۷)`
      : 'مجموعه مطالب برچسب‌گذاری شده در پایگاه خبری تحلیلی رسا نشر';

  // کلمات کلیدی
  $: keywords = tag?.name
    ? `${tag.name}, پایگاه خبری تحلیلی رسا نشر, خبر, گزارش, نقد و بررسی, آخرین خبرها, آرشیو برچسب‌ها`
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

  // Schema.org
  $: schema = tag ? {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: canonical,
    publisher: {
      '@type': 'Organization',
      name: 'پایگاه خبری تحلیلی رسا نشر', // ✅ اصلاح از «رسانه روز»
      logo: {
        '@type': 'ImageObject',
        url: 'https://rasanashr.ir/graph.jpg'
      }
    }
  } : null;

  $: safeSchema = schema ? JSON.stringify(schema, null, 0) : '';
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

{#if safeSchema}
  {@html `<script type="application/ld+json">${safeSchema}</script>`}
{/if}