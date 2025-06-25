import axios from 'axios';

const WP_DOMAIN = 'rooidadha.ir';
const SITE_DOMAIN = 'rasanashr.ir';

/**
 * تبدیل URL هدلس به URL وردپرس
 */
function convertToWordPressUrl(url) {
    // حذف پروتکل از URL اگر وجود دارد
    const cleanUrl = url.replace(/^https?:\/\//, '');
    
    // جایگزینی دامنه هدلس با دامنه وردپرس
    let wpUrl = cleanUrl.replace(SITE_DOMAIN, WP_DOMAIN);

    // اصلاح مسیرها برای دسته‌بندی و برچسب
    if (wpUrl.includes('/category/') || wpUrl.includes('/tag/')) {
        // افزودن کد دیباگ برای بررسی URL
        console.log('Category/Tag URL before:', wpUrl);
        // اطمینان از اینکه مسیر درست است
        wpUrl = wpUrl.replace(/\/+/g, '/'); // حذف اسلش‌های اضافی
        console.log('Category/Tag URL after:', wpUrl);
    }

    return `https://${wpUrl}`;
}

/**
 * دریافت اطلاعات SEO از Rank Math API
 * @param {string} url - آدرس صفحه در سایت اصلی
 */
export async function fetchSEOData(url) {
    try {
        // حذف پروتکل از URL اگر وجود دارد
        let cleanUrl = url.replace(/^https?:\/\//, '');
        
        // جایگزینی دامنه هدلس با دامنه وردپرس
        let wpUrl = cleanUrl.replace(SITE_DOMAIN, WP_DOMAIN);

        // اطمینان از اینکه URL با https:// شروع می‌شود
        const fullWpUrl = `https://${wpUrl}`;

        console.log('Clean URL:', cleanUrl);
        console.log('WordPress URL:', wpUrl);
        console.log('Requesting SEO data for URL:', fullWpUrl);

        const response = await axios.get(`https://${WP_DOMAIN}/wp-json/rankmath/v1/getHead`, {
            params: {
                url: fullWpUrl
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log('SEO Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching SEO data:', error.response?.data || error.message);
        return null;
    }
}

/**
 * ساخت اسکیمای NewsArticle
 */
export function createNewsArticleSchema(post, seoData) {
    if (!post) return null;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": post.title.rendered,
        "datePublished": post.date,
        "dateModified": post.modified,
        "description": post.excerpt.rendered.replace(/<[^>]*>/g, ''),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://${SITE_DOMAIN}/${post.id}/${post.slug}`
        },
        "publisher": {
            "@type": "Organization",
            "name": "پایگاه خبری تحلیلی رسا نشر",
            "url": `https://${SITE_DOMAIN}`,
            "logo": seoData?.organization?.logo || null
        }
    };

    // اضافه کردن تصویر شاخص
    if (post._embedded && post._embedded['wp:featuredmedia']) {
        articleSchema.image = {
            "@type": "ImageObject",
            "url": post._embedded['wp:featuredmedia'][0].source_url
        };
    }

    // اضافه کردن نویسنده
    if (post._embedded && post._embedded.author) {
        articleSchema.author = {
            "@type": "Person",
            "name": post._embedded.author[0].name
        };
    }

    return articleSchema;
}

/**
 * تبدیل HTML Meta Tags به آبجکت
 */
export function parseMetaTags(head) {
    if (!head) return null;

    const metaTags = {};
    const div = document.createElement('div');
    div.innerHTML = head;

    // استخراج تگ‌های meta
    div.querySelectorAll('meta').forEach(meta => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (name && content) {
            metaTags[name] = content;
        }
    });

    // استخراج title
    const title = div.querySelector('title');
    if (title) {
        metaTags.title = title.textContent;
    }

    return metaTags;
}
