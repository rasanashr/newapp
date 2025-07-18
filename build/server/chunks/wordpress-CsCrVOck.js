import axios from 'axios';

const WP_API_URL = "https://rooidadha.ir/wp-json/wp/v2";
async function fetchPosts(page = 1, perPage = 10) {
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
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], totalPages: 1 };
  }
}
async function fetchPost(id) {
  try {
    const response = await axios.get(`${WP_API_URL}/posts/${id}?_embed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
async function fetchCategories() {
  try {
    const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
async function fetchCategory(slug) {
  try {
    const response = await axios.get(`${WP_API_URL}/categories?slug=${slug}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    console.error("Category not found:", slug);
    return null;
  } catch (error) {
    console.error("Error fetching category:", error);
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
    return {
      posts: response.data,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return { posts: [], totalPages: 1 };
  }
}
async function fetchTags() {
  try {
    const response = await axios.get(`${WP_API_URL}/tags`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}
async function fetchTag(slug) {
  try {
    const response = await axios.get(`${WP_API_URL}/tags`, {
      params: { slug }
    });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching tag:", error);
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
    return {
      posts: response.data,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
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
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching page:", error);
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
    return {
      posts: response.data,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    console.error("Error searching posts:", error);
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
    console.error("Author not found:", slug);
    return null;
  } catch (error) {
    console.error("Error fetching author:", error);
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
    return {
      posts: response.data,
      totalPages: parseInt(response.headers["x-wp-totalpages"]) || 1
    };
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    return { posts: [], totalPages: 1 };
  }
}
async function fetchRelatedPosts(currentPostId, categoryIds = [], count = 3) {
  try {
    const params = new URLSearchParams({
      per_page: count,
      exclude: currentPostId,
      categories: categoryIds.join(","),
      _embed: ""
    });
    const response = await fetch(`https://rooidadha.ir/wp-json/wp/v2/posts?${params}`);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}
async function fetchLatestPostId() {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        per_page: 1,
        orderby: "date",
        order: "desc",
        _fields: "id"
      }
    });
    if (response.data && response.data.length > 0) {
      return response.data[0].id;
    }
    return null;
  } catch (error) {
    console.error("Error fetching latest post id:", error);
    return null;
  }
}

export { fetchPostsByCategory as a, fetchAuthor as b, fetchPostsByAuthor as c, fetchCategories as d, fetchCategory as e, fetchPosts as f, fetchPage as g, fetchTag as h, fetchPostsByTag as i, fetchPost as j, fetchRelatedPosts as k, fetchLatestPostId as l, fetchTags as m, searchPosts as s };
//# sourceMappingURL=wordpress-CsCrVOck.js.map
