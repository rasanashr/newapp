import axios from 'axios';

const WP_API_URL = 'https://rooidadha.ir/wp-json/wp/v2';

export async function fetchPosts(page = 1, perPage = 10) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts`, {
            params: {
                page,
                per_page: perPage,
                _embed: true
            }
        });
        return {
            posts: response.data,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [], totalPages: 1 };
    }
}

export async function fetchPost(id) {
    try {
        const response = await axios.get(`${WP_API_URL}/posts/${id}?_embed`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
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
        return response.data[0];
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function fetchCategory(slug) {
    try {
        // استفاده از REST API وردپرس برای جستجوی دسته‌بندی با اسلاگ
        const response = await axios.get(`${WP_API_URL}/categories?slug=${slug}`);
        if (response.data && response.data.length > 0) {
            // برگرداندن اولین دسته‌بندی که پیدا شده
            return response.data[0];
        }
        // اگر دسته‌بندی پیدا نشد
        console.error('Category not found:', slug);
        return null;
    } catch (error) {
        console.error('Error fetching category:', error);
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
        return {
            posts: response.data,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        return { posts: [], totalPages: 1 };
    }
}

export async function fetchTags() {
    try {
        const response = await axios.get(`${WP_API_URL}/tags`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
}

export async function fetchTag(slug) {
    try {
        const response = await axios.get(`${WP_API_URL}/tags`, {
            params: { slug }
        });
        return response.data[0];
    } catch (error) {
        console.error('Error fetching tag:', error);
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
        return {
            posts: response.data,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        console.error('Error fetching posts by tag:', error);
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
            return response.data[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching page:', error);
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
        return {
            posts: response.data,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        console.error('Error searching posts:', error);
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
        console.error('Error fetching comments:', error);
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
        console.error('Error submitting comment:', error.response ? error.response.data : error.message);
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
        console.error('Author not found:', slug);
        return null;
    } catch (error) {
        console.error('Error fetching author:', error);
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
        return {
            posts: response.data,
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1
        };
    } catch (error) {
        console.error('Error fetching posts by author:', error);
        return { posts: [], totalPages: 1 };
    }
}

export async function fetchPages() {
    try {
        const response = await fetch(`${WP_API_URL}/pages?per_page=100`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching pages:', error);
        return [];
    }
}

export async function fetchRelatedPosts(currentPostId, categoryIds = [], count = 3) {
    try {
        // ابتدا پست‌های هم‌دسته
        const params = new URLSearchParams({
            per_page: count,
            exclude: currentPostId,
            categories: categoryIds.join(','),
            _embed: ''
        });

        const response = await fetch(`https://rooidadha.ir/wp-json/wp/v2/posts?${params}`);
        const posts = await response.json();
        
        return posts;
    } catch (error) {
        console.error('Error fetching related posts:', error);
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
        console.error('Error fetching latest post id:', error);
        return null;
    }
}
