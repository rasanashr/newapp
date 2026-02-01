import axios from 'axios';
import { browser } from '$app/environment';

const WP_API_URL = 'https://rooidadha.ir/new/wp-json/wp/v2';
const DISPLAY_DOMAIN = 'rasanashr.ir';

// Axios instance with sensible defaults (raise timeout to accommodate slower API responses)
const api = axios.create({
    baseURL: WP_API_URL,
    timeout: 15000
});

// Simple retry helper with exponential backoff
async function fetchWithRetry(fn, retries = 2, delay = 300) {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 0) throw err;
        await new Promise(r => setTimeout(r, delay));
        return fetchWithRetry(fn, retries - 1, delay * 2);
    }
}

// In-memory map to deduplicate concurrent identical requests
const pendingRequests = new Map();

function makeCacheKey(prefix, args) {
    let k;
    try {
        k = `${prefix}:${JSON.stringify(args)}`;
    } catch (e) {
        k = `${prefix}:${String(args)}`;
    }
    return k;
}

// Simple in-memory TTL cache to avoid importing server-only modules into browser-bundled code.
const inMemoryCache = new Map();

function getFromMemoryCache(key, ttlSeconds) {
    const entry = inMemoryCache.get(key);
    if (!entry) return null;
    if ((Date.now() - entry.timestamp) / 1000 > (ttlSeconds || 0)) {
        inMemoryCache.delete(key);
        return null;
    }
    return entry.value;
}

function setMemoryCache(key, value) {
    inMemoryCache.set(key, { value, timestamp: Date.now() });
}

// Disk cache helpers (server-only). Files stored under `.cache/wp/` with SHA1-hashed filenames.
// Disk cache helpers implemented with dynamic imports to avoid bundling Node builtins into client code.
async function getCacheDir() {
    const pathMod = await import('path');
    return pathMod.resolve(process.cwd(), '.cache', 'wp');
}

async function ensureCacheDir() {
    try {
        const fspMod = await import('fs/promises');
        const dir = await getCacheDir();
        await fspMod.mkdir(dir, { recursive: true });
    } catch (e) {
        // ignore
    }
}

async function hashKeyToFilename(key) {
    const cryptoMod = await import('crypto');
    const pathMod = await import('path');
    const h = cryptoMod.createHash('sha1').update(key).digest('hex');
    const dir = await getCacheDir();
    return pathMod.join(dir, `${h}.json`);
}

async function readDiskCache(key) {
    if (browser) return null;
    try {
        const fspMod = await import('fs/promises');
        const file = await hashKeyToFilename(key);
        const raw = await fspMod.readFile(file, 'utf8');
        const parsed = JSON.parse(raw);
        return parsed; // { timestamp, value }
    } catch (e) {
        return null;
    }
}

async function writeDiskCache(key, value) {
    if (browser) return;
    try {
        const fspMod = await import('fs/promises');
        await ensureCacheDir();
        const file = await hashKeyToFilename(key);
        const pid = (typeof process !== 'undefined' && process.pid) ? process.pid : '0';
        const tmp = `${file}.${pid}.${Date.now()}.tmp`;
        const payload = JSON.stringify({ timestamp: Date.now(), value });
        await fspMod.writeFile(tmp, payload, 'utf8');
        await fspMod.rename(tmp, file);
    } catch (e) {
        // ignore disk write errors
    }
}

async function deleteDiskCache(key) {
    if (browser) return;
    try {
        const fspMod = await import('fs/promises');
        const file = await hashKeyToFilename(key);
        await fspMod.unlink(file).catch(() => {});
    } catch (e) {}
}

async function purgeAllDiskCache() {
    if (browser) return;
    try {
        const fspMod = await import('fs/promises');
        const pathMod = await import('path');
        const dir = await getCacheDir();
        const files = await fspMod.readdir(dir).catch(() => []);
        await Promise.all(files.map(f => fspMod.unlink(pathMod.join(dir, f)).catch(() => {})));
    } catch (e) {}
}

/**
 * cachedRequest: server-aware disk-backed cache with stale-while-revalidate.
 * - On server: try memory -> disk.
 * - If disk entry exists and is fresh: return it.
 * - If disk entry exists but expired: return stale immediately and refresh in background.
 * - If missing: fetch, store to memory+disk and return.
 */
async function cachedRequest(key, ttlSeconds, fn) {
    // Client-side: keep prior behavior using in-memory cache only
    if (browser) {
        const cached = getFromMemoryCache(key, ttlSeconds);
        if (cached) return cached;
        if (pendingRequests.has(key)) return pendingRequests.get(key);
        const promise = (async () => {
            try {
                const result = await fetchWithRetry(fn);
                if (ttlSeconds && result !== undefined) setMemoryCache(key, result);
                return result;
            } finally {
                pendingRequests.delete(key);
            }
        })();
        pendingRequests.set(key, promise);
        return promise;
    }

    // Server-side: prefer memory, then disk
    const mem = getFromMemoryCache(key, ttlSeconds);
    if (mem) return mem;

    // Try disk
    const diskEntry = await readDiskCache(key);
    if (diskEntry && diskEntry.timestamp) {
        const ageSec = (Date.now() - diskEntry.timestamp) / 1000;
        if (ttlSeconds && ageSec <= ttlSeconds) {
            // fresh
            setMemoryCache(key, diskEntry.value);
            return diskEntry.value;
        }
        // stale: return stale immediately and trigger background refresh
        setMemoryCache(key, diskEntry.value);
        if (!pendingRequests.has(key)) {
            const bg = (async () => {
                try {
                    const result = await fetchWithRetry(fn);
                    if (ttlSeconds && result !== undefined) {
                        setMemoryCache(key, result);
                        await writeDiskCache(key, result);
                    }
                    return result;
                } catch (e) {
                    return diskEntry.value;
                } finally {
                    pendingRequests.delete(key);
                }
            })();
            pendingRequests.set(key, bg);
        }
        return diskEntry.value;
    }

    // No cache: fetch and populate
    if (pendingRequests.has(key)) return pendingRequests.get(key);
    const promise = (async () => {
        try {
            const result = await fetchWithRetry(fn);
            if (ttlSeconds && result !== undefined) {
                setMemoryCache(key, result);
                await writeDiskCache(key, result);
            }
            return result;
        } finally {
            pendingRequests.delete(key);
        }
    })();
    pendingRequests.set(key, promise);
    return promise;
}

// Expose purge helpers for webhook
export async function purgeCacheKey(key) {
    inMemoryCache.delete(key);
    await deleteDiskCache(key);
}

export async function purgeAllCache() {
    inMemoryCache.clear();
    await purgeAllDiskCache();
}

// تابع کمکی برای اصلاح لینک‌های نمایشی به دامنه دیپلوی شده
function fixDisplayLinks(post) {
    if (!post) return post;
    if (post.link) {
        post.link = post.link.replace('rooidadha.ir/new', DISPLAY_DOMAIN);
    }
    return post;
}

// تابع کمکی برای تمیز کردن HTML و متن‌های دریافتی از API
function sanitizePostData(post) {
    // helper: rewrite media URLs in HTML to point to our proxy
    function rewriteMediaUrlsInHtml(html) {
        if (!html || typeof html !== 'string') return html;

        // srcset="..."
        html = html.replace(/srcset\s*=\s*"([^"]*)"/gi, (m, p1) => {
            const parts = p1.split(',');
            const newparts = parts.map(part => {
                const sp = part.trim().split(/\s+/);
                const url = sp[0];
                const rest = sp.slice(1).join(' ');
                if (/https?:\/\/[^\s"']*wp-content/i.test(url)) {
                    return `/api/image?src=${encodeURIComponent(url)}${rest ? ' ' + rest : ''}`;
                }
                return part.trim();
            });
            return `srcset="${newparts.join(', ')}"`;
        });

        // src='https://...wp-content...'
        html = html.replace(/src\s*=\s*(['"])(https?:\/\/[^'">]*wp-content[^'">]*)\1/gi, (m, q, url) => {
            return `src=${q}/api/image?src=${encodeURIComponent(url)}${q}`;
        });

        // css url(...) background images
        html = html.replace(/url\((['"]?)(https?:\/\/[^)"']*wp-content[^)"']*)\1\)/gi, (m, q, url) => {
            return `url(${q}/api/image?src=${encodeURIComponent(url)}${q})`;
        });

        return html;
    }
    // Ensure we always return a normalized object to avoid hydration/runtime errors
    if (!post || typeof post !== 'object') {
        return {
            id: null,
            slug: '',
            link: '',
            title: { rendered: '' },
            excerpt: { rendered: '' },
            date: new Date().toISOString(),
            modified: new Date().toISOString(),
            _embedded: {}
        };
    }

    // Ensure shape exists
    if (!post.title || typeof post.title !== 'object') post.title = { rendered: '' };
    if (!post.excerpt || typeof post.excerpt !== 'object') post.excerpt = { rendered: '' };
    if (!post._embedded || typeof post._embedded !== 'object') post._embedded = {};

    // Trim title
    if (typeof post.title.rendered === 'string') {
        post.title.rendered = post.title.rendered.trim();
    } else {
        post.title.rendered = '';
    }

    // Rewrite media URLs inside excerpt and content (if present)
    if (typeof post.excerpt.rendered === 'string') {
        post.excerpt.rendered = rewriteMediaUrlsInHtml(post.excerpt.rendered);
    } else {
        post.excerpt.rendered = '';
    }

    if (post.content && typeof post.content.rendered === 'string') {
        post.content.rendered = rewriteMediaUrlsInHtml(post.content.rendered);
    }

    if (!post.date) post.date = new Date().toISOString();
    if (!post.modified) post.modified = post.date;
    // Rewrite featured media URL to local proxy endpoint so images are cached by our server
    try {
        const featured = post._embedded?.['wp:featuredmedia']?.[0];
        if (featured && featured.source_url) {
            const original = featured.source_url;
            featured.source_url = `/api/image?src=${encodeURIComponent(original)}`;
        }
    } catch (e) {
        // ignore rewrite failures
    }

    return post;
}

// Default TTLs (in seconds) for different endpoints
const TTL = {
    postsShort: 60, // list pages
    postsMedium: 300,
    categories: 3600,
    pages: 3600,
    feed: 300,
    post: 60,
    tags: 3600
};

export async function fetchPosts(page = 1, perPage = 10) {
    const cacheKey = makeCacheKey('posts', { page, perPage });
    return cachedRequest(cacheKey, TTL.postsShort, async () => {
        const response = await api.get('/posts', {
            params: { page, per_page: perPage, _embed: true }
        });
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return {
            posts: sanitizedPosts,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    });
}

export async function fetchPost(id) {
    const cacheKey = makeCacheKey('post', id);
    return cachedRequest(cacheKey, TTL.post, async () => {
        const response = await api.get(`/posts/${id}`, { params: { _embed: true } });
        return fixDisplayLinks(sanitizePostData(response.data));
    });
}

export async function fetchPostBySlug(slug) {
    const cacheKey = makeCacheKey('postBySlug', slug);
    return cachedRequest(cacheKey, TTL.post, async () => {
        const response = await api.get('/posts', { params: { slug, _embed: true } });
        return fixDisplayLinks(sanitizePostData(response.data[0]));
    });
}

export async function fetchCategories() {
    const cacheKey = makeCacheKey('categories', 'all');
    return cachedRequest(cacheKey, TTL.categories, async () => {
        const response = await api.get('/categories', { params: { per_page: 100 } });
        return response.data;
    });
}

export async function fetchCategory(slug) {
    const cacheKey = makeCacheKey('category', slug);
    return cachedRequest(cacheKey, TTL.categories, async () => {
        const response = await api.get('/categories', { params: { slug } });
        return (response.data && response.data.length > 0) ? response.data[0] : null;
    });
}

export async function fetchPostsByCategory(categoryId, page = 1, perPage = 10) {
    const categoriesParam = Array.isArray(categoryId) ? categoryId.join(',') : categoryId;
    const cacheKey = makeCacheKey('postsByCategory', { categories: categoriesParam, page, perPage });
    return cachedRequest(cacheKey, TTL.postsMedium, async () => {
        const response = await api.get('/posts', { params: { categories: categoriesParam, page, per_page: perPage, _embed: true } });
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return { posts: sanitizedPosts, totalPages: parseInt(response.headers['x-wp-totalpages']) || 1 };
    });
}

export async function fetchTags() {
    const cacheKey = makeCacheKey('tags', 'all');
    return cachedRequest(cacheKey, TTL.tags, async () => {
        const response = await api.get('/tags');
        return response.data;
    });
}

// Backlinks endpoint (separate namespace) - cached
export async function fetchBacklinks() {
    const cacheKey = makeCacheKey('backlinks', 'all');
    return cachedRequest(cacheKey, TTL.categories, async () => {
        const url = 'https://rooidadha.ir/new/wp-json/backlink/v1/links';
        const response = await axios.get(url, { timeout: 7000 });
        return response.data;
    });
}

export async function fetchTag(slug) {
    const cacheKey = makeCacheKey('tag', slug);
    return cachedRequest(cacheKey, TTL.tags, async () => {
        const response = await api.get('/tags', { params: { slug } });
        return (response.data && response.data.length > 0) ? response.data[0] : null;
    });
}

export async function fetchPostsByTag(tagId, page = 1, perPage = 10) {
    const cacheKey = makeCacheKey('postsByTag', { tagId, page, perPage });
    return cachedRequest(cacheKey, TTL.postsMedium, async () => {
        const response = await api.get('/posts', { params: { tags: tagId, page, per_page: perPage, _embed: true } });
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return { posts: sanitizedPosts, totalPages: parseInt(response.headers['x-wp-totalpages']) || 1 };
    });
}

export async function fetchPage(slug) {
    const cacheKey = makeCacheKey('page', slug);
    return cachedRequest(cacheKey, TTL.pages, async () => {
        const response = await api.get('/pages', { params: { slug, _embed: true } });
        return (response.data && response.data.length > 0) ? fixDisplayLinks(sanitizePostData(response.data[0])) : null;
    });
}

export async function searchPosts(query, page = 1, perPage = 10) {
    const cacheKey = makeCacheKey('search', { query, page, perPage });
    return cachedRequest(cacheKey, TTL.postsShort, async () => {
        const response = await api.get('/posts', { params: { search: query, page, per_page: perPage, _embed: true } });
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return { posts: sanitizedPosts, totalPages: parseInt(response.headers['x-wp-totalpages']) || 1 };
    });
}

export async function fetchComments(postId) {
    const cacheKey = makeCacheKey('comments', { postId });
    return cachedRequest(cacheKey, TTL.postsShort, async () => {
        const response = await api.get('/comments', { params: { post: postId, order: 'asc', _embed: true } });
        return response.data;
    });
}

export async function submitComment(postId, comment) {
    try {
        const headers = { 'Content-Type': 'application/json' };
        const response = await api.post('/comments', {
            post: postId,
            author_name: comment.author_name || 'ناشناس',
            author_email: comment.author_email || 'anonymous@rasanashr.ir',
            content: comment.content,
            status: 'pending'
        }, { headers, withCredentials: true });

        if (response.status !== 201) throw new Error('خطا در ارسال نظر');
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'خطا در ارتباط با سرور');
        } else if (error.request) {
            throw new Error('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید');
        } else {
            throw new Error('خطای غیرمنتظره. لطفاً دوباره تلاش کنید');
        }
    }
}

export function formatCommentDate(dateString) {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffTime = Math.abs(now - commentDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'امروز';
    if (diffDays === 1) return 'دیروز';
    if (diffDays < 30) return `${diffDays} روز قبل`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} ماه قبل`;
}

export async function fetchAuthor(slug) {
    const cacheKey = makeCacheKey('author', slug);
    return cachedRequest(cacheKey, TTL.categories, async () => {
        const response = await api.get('/users', { params: { slug, _embed: true } });
        return (response.data && response.data.length > 0) ? response.data[0] : null;
    });
}

export async function fetchPostsByAuthor(authorId, page = 1, perPage = 10) {
    const cacheKey = makeCacheKey('postsByAuthor', { authorId, page, perPage });
    return cachedRequest(cacheKey, TTL.postsMedium, async () => {
        const response = await api.get('/posts', { params: { author: authorId, page, per_page: perPage, _embed: true } });
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return { posts: sanitizedPosts, totalPages: parseInt(response.headers['x-wp-totalpages']) || 1 };
    });
}

export async function fetchPages() {
    const cacheKey = makeCacheKey('pages', 'all');
    return cachedRequest(cacheKey, TTL.pages, async () => {
        const response = await api.get('/pages', { params: { per_page: 100 } });
        return response.data.map(page => fixDisplayLinks(sanitizePostData(page)));
    });
}

export async function fetchRelatedPosts(currentPostId, categoryIds = [], count = 3) {
    const categoriesParam = Array.isArray(categoryIds) ? categoryIds.join(',') : categoryIds;
    const cacheKey = makeCacheKey('relatedPosts', { currentPostId, categoriesParam, count });
    return cachedRequest(cacheKey, TTL.postsShort, async () => {
        const response = await api.get('/posts', { params: { per_page: count, exclude: currentPostId, categories: categoriesParam, _embed: true } });
        return response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
    });
}

export async function fetchLatestPostId() {
    const cacheKey = makeCacheKey('latestPostId', 'single');
    return cachedRequest(cacheKey, TTL.postsShort, async () => {
        const response = await api.get('/posts', { params: { per_page: 1, orderby: 'date', order: 'desc', _fields: 'id' } });
        return (response.data && response.data.length > 0) ? response.data[0].id : null;
    });
}

export async function fetchLatestPostsForFeed() {
    const cacheKey = makeCacheKey('latestForFeed', '50');
    return cachedRequest(cacheKey, TTL.feed, async () => {
        return await fetchPosts(1, 50);
    });
}