import axios from 'axios';

const WP_API_URL = 'https://rooidadha.ir/wp-json/wp/v2';
const DISPLAY_DOMAIN = 'rasarooz.ir';

// تابع کمکی برای اصلاح لینک‌های نمایشی به دامنه دیپلوی شده
function fixDisplayLinks(post) {
    if (!post) return post;
    
    // فقط لینک صفحه را تغییر می‌دهیم (URL نمایشی)
    if (post.link) {
        post.link = post.link.replace('rooidadha.ir', DISPLAY_DOMAIN);
    }
    
    // تصاویر و سایر منابع باید از وردپرس (rooidadha.ir) باقی بمانند
    // پس دیگر source_url را تغییر نمی‌دهیم
    
    return post;
}

export async function fetchPosts(page = 1, perPage = 10) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                page,
                per_page: perPage,
                _embed: true
            }
        });
        
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        
        return {
            posts: sanitizedPosts,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPosts: ${errorData}`);
        }
        return { posts: [], totalPages: 1 };
    }
}

// تابع کمکی برای تمیز کردن HTML و متن‌های دریافتی از API
function sanitizePostData(post) {
    if (!post) return null;
    
    // تمیز کردن عنوان
    if (post.title?.rendered) {
        post.title.rendered = post.title.rendered.trim();
    }
    
    // تمیز کردن محتوا و خلاصه
    if (post.excerpt?.rendered) {
        post.excerpt.rendered = post.excerpt.rendered
            .replace(/<[^>]*>/g, '')  // حذف تگ‌های HTML
            .replace(/\s+/g, ' ')     // تبدیل چند فاصله به یک فاصله
            .trim();
    }
    
    // اطمینان از وجود تاریخ‌های معتبر
    if (!post.date) {
        post.date = new Date().toISOString();
    }
    if (!post.modified) {
        post.modified = post.date;
    }
    
    return post;
}

export async function fetchPost(id) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts/${id}?_embed`);
        const cleanData = fixDisplayLinks(sanitizePostData(response.data));
        return cleanData;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPost: ${errorData}`);
        }
        return null;
    }
}

export async function fetchPostBySlug(slug) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                slug,
                _embed: true
            }
        });
        return fixDisplayLinks(sanitizePostData(response.data[0]));
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPostBySlug: ${errorData}`);
        }
        return null;
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
        return await response.json();
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchCategories: ${errorData}`);
        }
        return [];
    }
}

export async function fetchCategory(slug) {
    try {
        // استفاده از REST API وردپرس برای جستجوی دسته‌بندی با اسلاگ
        const response = await axios.get(`${WP_API_URL}/categories?slug=${slug}`);
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        if (process.env.NODE_ENV === 'production') {
            console.error(`Category not found: ${slug}`);
        }
        return null;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchCategory: ${errorData}`);
        }
        return null;
    }
}

export async function fetchPostsByCategory(categoryId, page = 1, perPage = 10) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                categories: categoryId,
                page,
                per_page: perPage,
                _embed: true
            }
        });
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return {
            posts: sanitizedPosts,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPostsByCategory: ${errorData}`);
        }
        return { posts: [], totalPages: 1 };
    }
}

export async function fetchTags() {
    try {
        const response = await axios.get(`${WP_API_URL}/tags`);
        return response.data;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchTags: ${errorData}`);
        }
        return [];
    }
}

export async function fetchTag(slug) {
    try {
        const response = await axios.get(`${WP_API_URL}/tags`, {
            params: { slug }
        });
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        if (process.env.NODE_ENV === 'production') {
            console.error(`Tag not found: ${slug}`);
        }
        return null;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchTag: ${errorData}`);
        }
        return null;
    }
}

export async function fetchPostsByTag(tagId, page = 1, perPage = 10) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                tags: tagId,
                page,
                per_page: perPage,
                _embed: true
            }
        });
        
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return {
            posts: sanitizedPosts,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPostsByTag: ${errorData}`);
        }
        return { posts: [], totalPages: 1 };
    }
}

export async function fetchPage(slug) {
    try {
        const response = await axios.get(`${WP_API_URL}/pages`, {
            params: {
                slug,
                _embed: true
            }
        });
        if (response.data && response.data.length > 0) {
            return fixDisplayLinks(sanitizePostData(response.data[0]));
        }
        return null;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPage: ${errorData}`);
        }
        return null;
    }
}

export async function searchPosts(query, page = 1, perPage = 10) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                search: query,
                page,
                per_page: perPage,
                _embed: true
            }
        });
        
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return {
            posts: sanitizedPosts,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in searchPosts: ${errorData}`);
        }
        return { posts: [], totalPages: 1 };
    }
}

export async function fetchComments(postId) {
    try {
        const response = await axios.get(`${WP_API_URL}/comments`, {
            params: {
                post: postId,
                order: 'asc',
                _embed: true
            }
        });
        return response.data;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchComments: ${errorData}`);
        }
        return [];
    }
}

export async function submitComment(postId, comment) {
    try {
        const response = await axios.post(`${WP_API_URL}/comments`, {
            post: postId,
            content: comment.content,
            author_name: comment.author_name,
            author_email: comment.author_email
        });
        return response.data;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in submitComment: ${errorData}`);
        }
        throw error;
    }
}

export function formatCommentDate(dateString) {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffTime = Math.abs(now - commentDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'امروز';
    } else if (diffDays === 1) {
        return 'دیروز';
    } else if (diffDays < 30) {
        return `${diffDays} روز قبل`;
    } else {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} ماه قبل`;
    }
}

export async function fetchAuthor(slug) {
    try {
        const response = await axios.get(`${WP_API_URL}/users`, {
            params: {
                slug,
                _embed: true
            }
        });
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        if (process.env.NODE_ENV === 'production') {
            console.error(`Author not found: ${slug}`);
        }
        return null;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchAuthor: ${errorData}`);
        }
        return null;
    }
}

export async function fetchPostsByAuthor(authorId, page = 1, perPage = 10) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                author: authorId,
                page,
                per_page: perPage,
                _embed: true
            }
        });
        
        const sanitizedPosts = response.data.map(post => fixDisplayLinks(sanitizePostData(post)));
        return {
            posts: sanitizedPosts,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPostsByAuthor: ${errorData}`);
        }
        return { posts: [], totalPages: 1 };
    }
}

export async function fetchPages() {
    try {
        const response = await fetch(`${WP_API_URL}/pages?per_page=100`);
        const pages = await response.json();
        return pages.map(page => fixDisplayLinks(sanitizePostData(page)));
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchPages: ${errorData}`);
        }
        return [];
    }
}

export async function fetchRelatedPosts(currentPostId, categoryIds = [], count = 3) {
    try {
        const params = new URLSearchParams({
            per_page: count,
            exclude: currentPostId,
            categories: categoryIds.join(','),
            _embed: true
        });

        const response = await fetch(`${WP_API_URL}/posts?${params}`);
        const posts = await response.json();
        return posts.map(post => fixDisplayLinks(sanitizePostData(post)));
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchRelatedPosts: ${errorData}`);
        }
        return [];
    }
}

/**
 * دریافت آخرین ID پست منتشر شده
 */
export async function fetchLatestPostId() {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                per_page: 1,
                orderby: 'date',
                order: 'desc',
                _fields: 'id'
            }
        });
        if (response.data && response.data.length > 0) {
            return response.data[0].id;
        }
        return null;
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            const errorData = error.response?.data || error.message;
            console.error(`API error in fetchLatestPostId: ${errorData}`);
        }
        return null;
    }
}

/**
 * Fetch the latest 50 posts for the feed
 */
export async function fetchLatestPostsForFeed() {
    return await fetchPosts(1, 50);
}