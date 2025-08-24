<script>
  import { page } from '$app/stores';
  import { createPostSchema } from '$lib/utils/createSchema.js';
  export let post;

  $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;
  
  $: breadcrumbs = [
    {
      position: 1,
      name: 'خانه',
      item: 'https://rasanashr.ir/'
    },
    ...(post?.categories_info || []).map((category, index) => ({
      position: index + 2,
      name: category.name,
      item: `https://rasanashr.ir/category/${category.slug}/`
    })),
    {
      position: (post?.categories_info?.length || 0) + 2,
      name: post?.title?.rendered || '',
      item: currentUrl.endsWith('/') ? currentUrl : `${currentUrl}/`
    }
  ];

  $: title = post ? `${post.title.rendered} | رسا نشر` : 'رسا نشر';
  $: description = 
    post?.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 160) || '';
  $: keywords = post?.tags_info?.map(tag => tag.name).join(', ') || '';
  $: canonical = currentUrl;

  $: og = {
      title,
      description,
      type: 'article',
      url: currentUrl,
      image: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      site_name: 'رسا نشر',
      locale: 'fa_IR',
      'article:published_time': post?.date ? new Date(post.date).toISOString() : '',
      'article:modified_time': post?.modified ? new Date(post.modified).toISOString() : ''
  };

  // تولید اسکیما (هم مقاله، هم برادکرامپ، هم ویدیو اگر وجود داشته باشد)
  $: schemaData = post ? createPostSchema(post, currentUrl, breadcrumbs) : null;
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
  {#if schemaData}
    {@html `<script type="application/ld+json">${JSON.stringify(schemaData, null, 2)}</script>`}
  {/if}
</svelte:head>
