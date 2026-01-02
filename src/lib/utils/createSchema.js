// تابع کمکی برای decode کردن HTML entities
function decodeEntities(text) {
    if (!text) return '';
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&nbsp;/g, ' ');
}

// تابع کمکی برای تمیز کردن متن از HTML
function cleanHtml(text) {
    if (!text) return '';
    text = text.replace(/متاسفانه مرورگر شما از ویدیو پشتیبانی نمی‌کند\.?/g, '');
    return decodeEntities(text.replace(/<[^>]*>/g, '')).trim();
}

// استخراج URL ویدیوها از محتوای پست
function extractVideosFromContent(content) {
    if (!content) return [];
    const videoRegex = /<video[^>]*>.*?<source[^>]*src=["']([^"']+)["'][^>]*>/gis;
    const matches = [...content.matchAll(videoRegex)];
    return matches.map(m => m[1]);
}

// ساخت اسکیمای ویدیو
function createVideoSchema(videoUrl, post, thumbnailUrl, meta = {}) {
    const videoSchema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: cleanHtml(post.title?.rendered) || 'ویدیو بدون عنوان',
        description: cleanHtml(post.excerpt?.rendered) || 'ویدیوی پایگاه خبری تحلیلی رسا نشر',
        thumbnailUrl: [thumbnailUrl],
        uploadDate: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        contentUrl: videoUrl,
        embedUrl: videoUrl,
        publisher: {
            '@type': 'Organization',
            name: 'پایگاه خبری تحلیلی رسا نشر',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasanashr.ir/graph.jpg',
                width: 512,
                height: 512
            }
        }
    };

    if (meta.duration) videoSchema.duration = meta.duration;
    if (meta.width) videoSchema.width = meta.width;
    if (meta.height) videoSchema.height = meta.height;

    return videoSchema;
}

export function createPostSchema(post, currentUrl, breadcrumbs = null) {
    if (!post) return null;

    const authorName = post._embedded?.author?.[0]?.name || 'پایگاه خبری تحلیلی رسا نشر';
    const imageUrl =
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        'https://rasanashr.ir/graph.jpg';

    const publishedDate = post.date
        ? new Date(post.date).toISOString()
        : new Date().toISOString();
    const modifiedDate = post.modified
        ? new Date(post.modified).toISOString()
        : publishedDate;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: cleanHtml(post.title?.rendered) || 'مقاله بدون عنوان',
        description: cleanHtml(post.excerpt?.rendered) || 'پایگاه خبری تحلیلی رسا نشر، دارای مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی (شماره مجوز: ۸۰۵۳۷)',
        image: [imageUrl],
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: {
            '@type': 'Person',
            name: cleanHtml(authorName),
            url: post._embedded?.author?.[0]?.link || 'https://rasanashr.ir'
        },
        publisher: {
            '@type': 'Organization',
            name: 'پایگاه خبری تحلیلی رسا نشر',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasanashr.ir/graph.jpg',
                width: 512,
                height: 512
            },
            url: 'https://rasanashr.ir'
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': currentUrl
        }
    };

    const schemas = [articleSchema];

    // BreadcrumbList
    if (breadcrumbs?.length) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: item.position,
                name: cleanHtml(item.name),
                item: index === breadcrumbs.length - 1
                    ? undefined // آخرین آیتم (صفحه فعلی) item ندارد
                    : item.item
            })).filter(el => el.name.trim() !== '')
        });
    }

    // VideoObject
    const videoUrls = extractVideosFromContent(post.content?.rendered);
    if (videoUrls.length > 0) {
        const meta = {
            duration: post.meta?.video_duration || null,
            width: post.meta?.video_width || null,
            height: post.meta?.video_height || null
        };
        videoUrls.forEach(url => {
            schemas.push(createVideoSchema(url, post, imageUrl, meta));
        });
    }

    return schemas;
}