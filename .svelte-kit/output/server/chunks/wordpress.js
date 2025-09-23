import axios from "axios";
const WP_API_URL = "https://rooidadha.ir/wp-json/wp/v2";
const DISPLAY_DOMAIN = "rasarooz.ir";
function fixDisplayLinks(post) {
  if (!post) return post;
  if (post.link) {
    post.link = post.link.replace("rooidadha.ir", DISPLAY_DOMAIN);
  }
  return post;
}
async function fetchPosts(page = 1, perPage = 10) {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        page,
        per_page: perPage,
        _embed: true
      }
    });
    const sanitizedPosts = response.data.map((post) => fixDisplayLinks(sanitizePostData(post)));
    return {
      posts: sanitizedPosts,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchPosts: ${errorData}`);
    }
    return { posts: [], totalPages: 1 };
  }
}
function sanitizePostData(post) {
  if (!post) return null;
  if (post.title?.rendered) {
    post.title.rendered = post.title.rendered.trim();
  }
  if (post.excerpt?.rendered) {
    post.excerpt.rendered = post.excerpt.rendered.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  }
  if (!post.date) {
    post.date = (/* @__PURE__ */ new Date()).toISOString();
  }
  if (!post.modified) {
    post.modified = post.date;
  }
  return post;
}
async function fetchPost(id) {
  try {
    const response = await axios.get(`${WP_API_URL}/posts/${id}?_embed`);
    const cleanData = fixDisplayLinks(sanitizePostData(response.data));
    return cleanData;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchPost: ${errorData}`);
    }
    return null;
  }
}
async function fetchCategories() {
  try {
    const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchCategories: ${errorData}`);
    }
    return [];
  }
}
async function fetchCategory(slug) {
  try {
    const response = await axios.get(`${WP_API_URL}/categories?slug=${slug}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    if (process.env.NODE_ENV === "production") {
      console.error(`Category not found: ${slug}`);
    }
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchCategory: ${errorData}`);
    }
    return null;
  }
}
async function fetchPostsByCategory(categoryId, page = 1, perPage = 10) {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        categories: categoryId,
        page,
        per_page: perPage,
        _embed: true
      }
    });
    const sanitizedPosts = response.data.map((post) => fixDisplayLinks(sanitizePostData(post)));
    return {
      posts: sanitizedPosts,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchPostsByCategory: ${errorData}`);
    }
    return { posts: [], totalPages: 1 };
  }
}
async function fetchTag(slug) {
  try {
    const response = await axios.get(`${WP_API_URL}/tags`, {
      params: { slug }
    });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    if (process.env.NODE_ENV === "production") {
      console.error(`Tag not found: ${slug}`);
    }
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchTag: ${errorData}`);
    }
    return null;
  }
}
async function fetchPostsByTag(tagId, page = 1, perPage = 10) {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        tags: tagId,
        page,
        per_page: perPage,
        _embed: true
      }
    });
    const sanitizedPosts = response.data.map((post) => fixDisplayLinks(sanitizePostData(post)));
    return {
      posts: sanitizedPosts,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchPostsByTag: ${errorData}`);
    }
    return { posts: [], totalPages: 1 };
  }
}
async function fetchPage(slug) {
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
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchPage: ${errorData}`);
    }
    return null;
  }
}
async function searchPosts(query, page = 1, perPage = 10) {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        search: query,
        page,
        per_page: perPage,
        _embed: true
      }
    });
    const sanitizedPosts = response.data.map((post) => fixDisplayLinks(sanitizePostData(post)));
    return {
      posts: sanitizedPosts,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in searchPosts: ${errorData}`);
    }
    return { posts: [], totalPages: 1 };
  }
}
async function fetchAuthor(slug) {
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
    if (process.env.NODE_ENV === "production") {
      console.error(`Author not found: ${slug}`);
    }
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchAuthor: ${errorData}`);
    }
    return null;
  }
}
async function fetchPostsByAuthor(authorId, page = 1, perPage = 10) {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        author: authorId,
        page,
        per_page: perPage,
        _embed: true
      }
    });
    const sanitizedPosts = response.data.map((post) => fixDisplayLinks(sanitizePostData(post)));
    return {
      posts: sanitizedPosts,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchPostsByAuthor: ${errorData}`);
    }
    return { posts: [], totalPages: 1 };
  }
}
async function fetchRelatedPosts(currentPostId, categoryIds = [], count = 3) {
  try {
    const params = new URLSearchParams({
      per_page: count,
      exclude: currentPostId,
      categories: categoryIds.join(","),
      _embed: true
    });
    const response = await fetch(`${WP_API_URL}/posts?${params}`);
    const posts = await response.json();
    return posts.map((post) => fixDisplayLinks(sanitizePostData(post)));
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      const errorData = error.response?.data || error.message;
      console.error(`API error in fetchRelatedPosts: ${errorData}`);
    }
    return [];
  }
}
async function fetchLatestPostsForFeed() {
  return await fetchPosts(1, 50);
}
export {
  fetchPosts as a,
  fetchCategories as b,
  fetchPostsByCategory as c,
  fetchAuthor as d,
  fetchPostsByAuthor as e,
  fetchLatestPostsForFeed as f,
  fetchCategory as g,
  fetchPage as h,
  fetchTag as i,
  fetchPostsByTag as j,
  fetchPost as k,
  fetchRelatedPosts as l,
  searchPosts as s
};
