<!-- TagSEO.svelte -->
<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  export let tag = null;

  // متادیتای پیش‌فرض
  const defaultMetaData = {
    title: 'آرشیو برچسب‌ها | رسا نشر',
    description: 'مطالب برچسب‌گذاری شده در رسا نشر',
    canonical: 'https://rasanashr.ir/tag', 
    ogTitle: 'آرشیو برچسب‌ها | رسا نشر',
    ogDescription: 'مجموعه مطالب برچسب‌گذاری شده در رسا نشر',
    ogType: 'website',
    ogSite_name: 'رسا نشر'
  };

  // محاسبه متادیتا بر اساس موجود بودن tag
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

  // فقط در محیط کلاینت و پس از mount المان‌ها اجرا شود
  onMount(() => {
    if (!browser || !tag) return;

    try {
      // حذف متاتگ‌های قبلی (به جز viewport)
      const existingMetas = document.querySelectorAll('meta:not([name="viewport"])');
      existingMetas.forEach(meta => meta.remove());

      // متاتگ‌های جدید
      const metaTags = [
        { name: 'description', content: metaData.description },
        { name: 'keywords', content: `${tag.name}, رسا نشر, اخبار ${tag.name}, آرشیو ${tag.name}` },
        { name: 'robots', content: 'index, follow' }
      ];

      metaTags.forEach(({ name, content }) => {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      });

      // Open Graph
      const ogTags = {
        title: metaData.ogTitle,
        description: metaData.ogDescription,
        type: metaData.ogType,
        url: currentUrl,
        site_name: metaData.ogSite_name,
        locale: 'fa_IR'
      };

      Object.entries(ogTags).forEach(([key, value]) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', `og:${key}`);
        meta.content = value;
        document.head.appendChild(meta);
      });

      // Canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = metaData.canonical;
      document.head.appendChild(canonical);

      // Schema.org
      const schema = {
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
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (scriptTag) scriptTag.remove();
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptTag);

    } catch (error) {
      console.error('Error updating tag SEO:', error);
    }
  });
</script>

<svelte:head>
  <title>{metaData.title}</title>
  <meta name="description" content={metaData.description} />
  <link rel="canonical" href={metaData.canonical} />

  <!-- Open Graph -->
  <meta property="og:title" content={metaData.ogTitle} />
  <meta property="og:description" content={metaData.ogDescription} />
  <meta property="og:type" content={metaData.ogType} />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:site_name" content={metaData.ogSite_name} />
  <meta property="og:locale" content="fa_IR" />
</svelte:head>