<script>
  import { page } from '$app/stores';

  export let tag = null;

  // Default metadata
  const defaultMetaData = {
    title: 'آرشیو برچسب‌ها | رسانه روز',
    description: 'مطالب برچسب‌گذاری شده در رسانه روز',
    canonical: 'https://rasarooz.ir/tag',
    ogTitle: 'آرشیو برچسب‌ها | رسانه روز',
    ogDescription: 'مجموعه مطالب برچسب‌گذاری شده در رسانه روز',
    ogType: 'website',
    ogSite_name: 'رسانه روز'
  };

  // Calculate metadata based on the presence of `tag`
  $: metaData = tag?.name ? {
    title: `${tag.name} | رسانه روز`,
    description: tag.description || `مطالب مرتبط با برچسب ${tag.name} در رسانه روز`,
    canonical: `https://rasarooz.ir/tag/${tag.slug}`,
    ogTitle: `${tag.name} | رسانه روز`,
    ogDescription: tag.description || `مطالب مرتبط با برچسب ${tag.name}`,
    ogType: 'website',
    ogSite_name: 'رسانه روز'
  } : defaultMetaData;

  $: currentUrl = `https://rasarooz.ir${$page.url.pathname}`;

  // Schema.org JSON-LD
  $: schema = tag ? {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metaData.title,
    description: metaData.description,
    url: currentUrl,
    publisher: {
      '@type': 'Organization',
      name: 'رسانه روز',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rasarooz.ir/duc.png'
      }
    }
  } : null;
  $: safeSchema = schema ? JSON.stringify(schema, null, 2) : '';
</script>

<svelte:head>
  <title>{metaData.title}</title>
  <meta name="description" content={metaData.description} />
  <link rel="canonical" href={metaData.canonical} />
  <meta name="keywords" content={tag?.name ? `${tag.name}, رسانه روز, اخبار ${tag.name}, آرشیو ${tag.name}` : ''} />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:title" content={metaData.ogTitle} />
  <meta property="og:description" content={metaData.ogDescription} />
  <meta property="og:type" content={metaData.ogType} />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:site_name" content={metaData.ogSite_name} />
  <meta property="og:locale" content="fa_IR" />
</svelte:head>

{#if safeSchema}
  {@html `<script type=\"application/ld+json\">${safeSchema}</script>`}
{/if}