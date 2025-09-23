const WP_API_URL = 'https://rooidadha.ir/wp-json/wp/v2';

// تابع کمکی برای گرفتن دامنه فعلی سایت
function getSiteURL(fetch) {
    // اگر در محیط سرور هستیم، از متغیرهای محیطی یا تنظیمات استفاده می‌کنیم
    if (typeof process !== 'undefined' && process.env.SITE_URL) {
        return process.env.SITE_URL.replace(/\/$/, '');
    }
    
    // در غیر این صورت از دامنه فعلی استفاده می‌کنیم
    if (typeof window !== 'undefined') {
        return `${window.location.protocol}//${window.location.host}`;
    }
    
    // مقدار پیش‌فرض
    return 'https://rasarooz.ir';
}

/**
 * A centralized and safe fetcher function that handles errors using SvelteKit's fetch.
 * @param {Function} fetch The fetch function from SvelteKit.
 * @param {string} endpoint The WordPress API endpoint (e.g., 'posts').
 * @param {object} params The query parameters.
 * @returns {Promise<{data: any[], headers: Headers}>}
 */
async function safeApiCall(fetch, endpoint, params = {}) {
    const url = new URL(`${WP_API_URL}/${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            // Log error in production
            const errorMessage = await response.text();
            if (process.env.NODE_ENV === 'production') {
                console.error(`API ${endpoint} failed: ${response.status} - ${errorMessage}`);
            }
            return { data: [], headers: new Headers() };
        }
        
        const data = await response.json();
        // Ensure data is always an array to prevent .map errors
        const safeData = Array.isArray(data) ? data : [];
        return { data: safeData, headers: response.headers };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            console.error(`API ${endpoint} error: ${error.message}`);
        }
        // Return an empty state to prevent downstream crashes
        return { data: [], headers: new Headers() };
    }
}

async function fetchAllWithPagination(fetch, endpoint, fields) {
    const { headers, data: firstPageData } = await safeApiCall(fetch, endpoint, { per_page: 100, page: 1, _fields: fields.join(',') });
    const totalPages = parseInt(headers.get('x-wp-totalpages'), 10) || 1;
    let allData = firstPageData;

    if (totalPages > 1) {
        const pagePromises = [];
        for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(safeApiCall(fetch, endpoint, { per_page: 100, page, _fields: fields.join(',') }));
        }
        const results = await Promise.all(pagePromises);
        results.forEach(result => {
            allData = allData.concat(result.data);
        });
    }
    return allData;
}


export async function getTotalPostsCount(fetch) {
    const { headers } = await safeApiCall(fetch, 'posts', { per_page: 1, _fields: 'id' });
    return parseInt(headers.get('x-wp-total'), 10) || 0;
}

export async function getTotalTagsCount(fetch) {
    const { headers } = await safeApiCall(fetch, 'tags', { per_page: 1, _fields: 'id' });
    return parseInt(headers.get('x-wp-total'), 10) || 0;
}

export async function fetchAllPages(fetch) {
    const pages = await fetchAllWithPagination(fetch, 'pages', ['slug', 'modified_gmt']);
    const siteUrl = getSiteURL(fetch);
    return pages.map(page => ({
        loc: `${siteUrl}/page/${page.slug}`,
        lastmod: new Date(page.modified_gmt).toISOString()
    }));
}

export async function fetchAllCategories(fetch) {
    const categories = await fetchAllWithPagination(fetch, 'categories', ['slug']);
    return categories.map(cat => ({
        slug: cat.slug,
        lastmod: new Date().toISOString()
    }));
}

export async function fetchAllAuthors(fetch) {
    const authors = await fetchAllWithPagination(fetch, 'users', ['slug']);
    const siteUrl = getSiteURL(fetch);
    return authors.map(author => ({
        loc: `${siteUrl}/author/${author.slug}`,
        lastmod: new Date().toISOString()
    }));
}

export async function fetchSitemapEntries(fetch, type, sitemapPage, sitemapPageSize) {
    const API_MAX_PER_PAGE = 100;
    const endpoint = type === 'posts' ? 'posts' : 'tags';
    const fields = type === 'posts' ? ['id', 'slug', 'modified_gmt'] : ['slug'];

    // Calculate the range of API pages to fetch for the given sitemap page
    const apiCallsNeeded = Math.ceil(sitemapPageSize / API_MAX_PER_PAGE);
    const startApiPage = (sitemapPage - 1) * apiCallsNeeded + 1;
    const endApiPage = startApiPage + apiCallsNeeded - 1;

    // Create an array of promises for all the API calls needed for this single sitemap page
    const pagePromises = [];
    for (let currentPage = startApiPage; currentPage <= endApiPage; currentPage++) {
        pagePromises.push(safeApiCall(fetch, endpoint, {
            page: currentPage,
            per_page: API_MAX_PER_PAGE,
            _fields: fields.join(',')
        }));
    }

    // Execute all API calls in parallel
    const results = await Promise.all(pagePromises);

    // Concatenate the data from all results
    let allData = [];
    results.forEach(result => {
        if (result.data) {
            allData = allData.concat(result.data);
        }
    });

    // Map the combined data to the final format
    const siteUrl = getSiteURL(fetch);

    if (type === 'posts') {
        return allData.map(item => ({
            loc: `${siteUrl}/${item.id}/${item.slug}`,
            lastmod: item.modified_gmt ? new Date(item.modified_gmt).toISOString() : new Date().toISOString()
        }));
    }

    if (type === 'tags') {
        return allData.map(item => ({
            loc: `${siteUrl}/tag/${item.slug}`,
            lastmod: new Date().toISOString()
        }));
    }

    return [];
}


export async function fetchNewsPosts(fetch) {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const { data: posts } = await safeApiCall(fetch, 'posts', {
        after: twoDaysAgo.toISOString(),
        per_page: 100,
        _embed: 'wp:term',
        _fields: 'id,slug,title,date_gmt,link,_embedded'
    });

    const siteUrl = getSiteURL(fetch);
    return posts.map(post => {
        const keywords = post._embedded?.['wp:term']?.[1]?.map(t => t.name).join(', ') || '';
        return {
            ...post,
            link: `${siteUrl}/${post.id}/${post.slug}`,
            publication: { name: "رسا نشر", language: "fa" },
            keywords: keywords
        };
    });
}