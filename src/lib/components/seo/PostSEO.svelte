<script>
  import { createPostSchema } from '$lib/utils/createSchema.js';
  export let post;

  // canonical باید از permalink رسمی پست گرفته شود — این دقیقاً همان چیزی است که وردپرس در REST API می‌دهد
  $: canonical = post?.link && post.link.startsWith('http')
    ? post.link
    : 'https://rasanashr.ir';

  // breadcrumbها هم باید از canonical و slugهای واقعی استفاده کنند
  $: breadcrumbs = [
    {
      position: 1,
      name: 'خانه',
      item: 'https://rasanashr.ir'
    },
    ...(post?.categories_info || []).map((category, index) => ({
      position: index + 2,
      name: category.name,
      item: `https://rasanashr.ir/category/${category.slug}/`
    })),
    {
      position: (post?.categories_info?.length || 0) + 2,
      name: post?.title?.rendered || '',
      item: canonical.endsWith('/') ? canonical : `${canonical}/`
    }
  ];

  // متادیتای پایه
  $: title = post
    ? `${post.title.rendered} | پایگاه خبری تحلیلی رسا نشر`
    : 'پایگاه خبری تحلیلی رسا نشر';

  $: cleanExcerpt = post?.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
    : '';
  $: description = cleanExcerpt.length > 160
    ? cleanExcerpt.substring(0, 157) + '...'
    : cleanExcerpt || 'پایگاه خبری تحلیلی رسا نشر، دارای مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی (شماره مجوز: ۸۰۵۳۷)';

  $: keywords = post?.tags_info?.map(tag => tag.name).join(', ') || 'رسا نشر, خبر, تحلیل خبری, پایگاه خبری معتبر';

  $: authorName = post?._embedded?.author?.[0]?.name || 'پایگاه خبری تحلیلی رسا نشر';
  $: featuredImage = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://rasanashr.ir/graph.jpg';

  // Open Graph — با زمان‌های ISO و URL صحیح
  $: og = {
    title,
    description,
    type: 'article',
    url: canonical,
    image: featuredImage,
    site_name: 'پایگاه خبری تحلیلی رسا نشر',
    locale: 'fa_IR',
    'article:published_time': post?.date ? new Date(post.date).toISOString() : '',
    'article:modified_time': post?.modified ? new Date(post.modified).toISOString() : ''
  };

  // ارسال canonical و breadcrumbهای اصلاح‌شده به تابع schema
  $: schemaData = post ? createPostSchema(post, canonical, breadcrumbs) : null;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="robots" content="index, follow" />
  <meta name="author" content={authorName} />
  <link rel="canonical" href={canonical} />

  <!-- Open Graph -->
  <meta property="og:title" content={og.title} />
  <meta property="og:description" content={og.description} />
  <meta property="og:type" content={og.type} />
  <meta property="og:url" content={og.url} />
  <meta property="og:image" content={og.image} />
  <meta property="og:site_name" content={og.site_name} />
  <meta property="og:locale" content={og.locale} />
  {#if og['article:published_time']}
    <meta property="article:published_time" content={og['article:published_time']} />
  {/if}
  {#if og['article:modified_time']}
    <meta property="article:modified_time" content={og['article:modified_time']} />
  {/if}

  <!-- Schema.org -->
  {#if schemaData}
    {@html `<script type="application/ld+json">${JSON.stringify(schemaData, null, 0)}</script>`}
  {/if}
</svelte:head>