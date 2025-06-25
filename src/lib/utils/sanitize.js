import DOMPurify from 'dompurify';

// تنظیمات پیش‌فرض برای پاکسازی HTML
const defaultOptions = {
    ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'b', 'i', 'strong', 'em',
        'ul', 'ol', 'li', 'a', 'img',
        'blockquote', 'pre', 'code',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span', 'hr'
    ],
    ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class',
        'target', 'rel', 'width', 'height'
    ]
};

/**
 * پاکسازی محتوای HTML با تنظیمات امنیتی
 * @param {string} content - محتوای HTML که باید پاکسازی شود
 * @returns {string} - محتوای پاکسازی شده
 */
export function sanitizeHtml(content) {
    if (typeof window === 'undefined') return content; // برای SSR
    return DOMPurify.sanitize(content, defaultOptions);
}

/**
 * حذف تمام تگ‌های HTML از متن
 * @param {string} content - متن HTML
 * @returns {string} - متن خالی
 */
export function stripHtml(content) {
    if (typeof window === 'undefined') return content?.replace(/<[^>]*>/g, '') || ''; // برای SSR
    return DOMPurify.sanitize(content, { ALLOWED_TAGS: [] });
}
