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
    // حذف جمله‌ی پیش‌فرض مرورگر
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
        description: cleanHtml(post.excerpt?.rendered) || 'ویدیوی رسانه روز',
        thumbnailUrl: [thumbnailUrl],
        uploadDate: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        contentUrl: videoUrl,
        embedUrl: videoUrl,
        publisher: {
            '@type': 'Organization',
            name: 'رسانه روز',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasarooz.ir/icon-512.png',
                width: '512',
                height: '512'
            }
        }
    };

    // اگر duration موجود بود → ISO 8601
    if (meta.duration) {
        videoSchema.duration = meta.duration;
    }

    // اگر ابعاد ویدیو موجود بود
    if (meta.width) {
        videoSchema.width = meta.width;
    }
    if (meta.height) {
        videoSchema.height = meta.height;
    }

    return videoSchema;
}

export function createPostSchema(post, currentUrl, breadcrumbs = null) {
    if (!post) return null;

    const authorName = post._embedded?.author?.[0]?.name || 'رسانه روز';
    const imageUrl =
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        'https://rasarooz.ir/placeholder.jpg';
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
        description: cleanHtml(post.excerpt?.rendered) || 'مقاله رسانه روز',
        image: [imageUrl],
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: {
            '@type': 'Person',
            name: cleanHtml(authorName),
            url:
                post._embedded?.author?.[0]?.link ||
                'https://rasarooz.ir/about-us'
        },
        publisher: {
            '@type': 'Organization',
            name: 'رسانه روز',
            logo: {
                '@type': 'ImageObject',
                url: 'https://rasarooz.ir/icon-512.png',
                width: '512',
                height: '512'
            },
            url: 'https://rasarooz.ir'
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': currentUrl
        }
    };

    const schemas = [articleSchema];

    // اضافه کردن اسکیمای Breadcrumb (در صورت وجود)
    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs
                .map(item => ({
                    '@type': 'ListItem',
                    position: item.position,
                    name: cleanHtml(item.name),
                    item: item.position === breadcrumbs.length ? undefined : item.item
                }))
                .filter(item => item.position <= breadcrumbs.length)
        });
    }

    // اضافه کردن اسکیمای ویدیو (در صورت وجود)
    const videoUrls = extractVideosFromContent(post.content?.rendered);

    if (videoUrls.length > 0) {
        videoUrls.forEach(url => {
            // اینجا فرض می‌کنیم وردپرس متادیتا ویدیو (duration, width, height) رو در post.meta ذخیره می‌کنه
            const meta = {
                duration: post.meta?.video_duration || null, // PT45S
                width: post.meta?.video_width || null,       // 720
                height: post.meta?.video_height || null      // 1280
            };
            schemas.push(createVideoSchema(url, post, imageUrl, meta));
        });
    }

    return schemas;
}
