<script>
  import { page } from '$app/stores';

  export let tag = null;

  // Default metadata
  const defaultMetaData = {
    title: 'آرشیو برچسب‌ها | رسا نشر',
    description: 'مطالب برچسب‌گذاری شده در رسا نشر',
    canonical: 'https://rasanashr.ir/tag',
    ogTitle: 'آرشیو برچسب‌ها | رسا نشر',
    ogDescription: 'مجموعه مطالب برچسب‌گذاری شده در رسا نشر',
    ogType: 'website',
    ogSite_name: 'رسا نشر'
  };

  // Calculate metadata based on the presence of `tag`
  $: metaData = tag?.name ? {
    title: `${tag.name} | رسا نشر`,
    description: tag.description || `مطالب مرتبط با برچسب ${tag.name} در رسا نشر`,
    canonical: `https://rasanashr.ir/tag/${tag.slug}`,
    ogTitle: `${tag.name} | رسا نشر`,
    ogDescription: tag.description || `مطالب مرتبط با برچسب ${tag.name}`,
    ogType: 'website',
    ogSite_name: 'رسا نشر'
  } : defaultMetaData;

  $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;

  // Schema.org JSON-LD
  $: schema = tag ? {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metaData.title,
    description: metaData.description,
    url: currentUrl,
    publisher: {
      '@type': 'Organization',
      name: 'رسا نشر',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rasanashr.ir/duc.png'
      }
    }
  } : null;
</script>

<svelte:head>
  <title>{metaData.title}</title>
  <meta name="description" content={metaData.description} />
  <link rel="canonical" href={metaData.canonical} />
  <meta name="keywords" content={tag?.name ? `${tag.name}, رسا نشر, اخبار ${tag.name}, آرشیو ${tag.name}` : ''} />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:title" content={metaData.ogTitle} />
  <meta property="og:description" content={metaData.ogDescription} />
  <meta property="og:type" content={metaData.ogType} />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:site_name" content={metaData.ogSite_name} />
  <meta property="og:locale" content="fa_IR" />

  <!-- Schema.org -->
  {#if schema}
    <script type="application/ld+json">
      {JSON.stringify(schema, null, 2)}
    </script>
  {/if}
</svelte:head>