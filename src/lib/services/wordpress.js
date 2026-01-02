import axios from 'axios';
import { browser } from '$app/environment';

const WP_API_URL = 'https://rooidadha.ir/new/wp-json/wp/v2';
const DISPLAY_DOMAIN = 'rasanashr.ir';

// Axios instance with sensible defaults
const api = axios.create({
    baseURL: WP_API_URL,
    timeout: 7000
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

async function cachedRequest(key, ttlSeconds, fn) {
    // Try in-process cache first (works both server and client but small memory only)
    const cached = getFromMemoryCache(key, ttlSeconds);
    if (cached) return cached;

    // Deduplicate concurrent requests
    if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
    }

    const promise = (async () => {
        try {
            const result = await fetchWithRetry(fn);
            if (ttlSeconds && result !== undefined) {
                setMemoryCache(key, result);
            }
            return result;
        } finally {
            pendingRequests.delete(key);
        }
    })();

    pendingRequests.set(key, promise);
    return promise;
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
    if (!post) return null;
    if (post.title?.rendered) {
        post.title.rendered = post.title.rendered.trim();
    }
    if (post.excerpt?.rendered) {
        post.excerpt.rendered = post.excerpt.rendered
            .replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    if (!post.date) post.date = new Date().toISOString();
    if (!post.modified) post.modified = post.date;
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