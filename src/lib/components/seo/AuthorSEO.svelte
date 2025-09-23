<script>
  export let author = null;
  export let seo = null;

  $: metaTitle = seo?.title || (author ? `${author.name} | رسانه روز` : 'رسانه روز');
  $: metaDescription = seo?.description || author?.description || (author ? `مطالب ${author.name}` : 'پایگاه خبری رسانه روز');
  $: metaOg = seo?.og || {};
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta name="robots" content="index, follow" />
  {#if author}
    <meta name="author" content={author.name} />
  {/if}
  <!-- Open Graph -->
  <meta property="og:title" content={metaOg.title || metaTitle} />
  <meta property="og:description" content={metaOg.description || metaDescription} />
  <meta property="og:type" content={metaOg.type || 'website'} />
  <meta property="og:site_name" content={metaOg.site_name || 'رسا نشر'} />
  <meta property="og:locale" content={metaOg.locale || 'fa_IR'} />
  <!-- Schema.org -->
  {#if author}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: author.name,
        description: author.description || `مطالب ${author.name}`,
        publisher: {
          "@type": "Organization",
          name: "رسا نشر",
          url: "https://rasarooz.ir"
        }
      })}
    </script>
  {/if}
</svelte:head>
