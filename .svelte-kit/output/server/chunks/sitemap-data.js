const WP_API_URL = "https://rooidadha.ir/wp-json/wp/v2";
function getSiteURL(fetch) {
  if (typeof process !== "undefined" && process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return "https://rasarooz.ir";
}
async function safeApiCall(fetch, endpoint, params = {}) {
  const url = new URL(`${WP_API_URL}/${endpoint}`);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorMessage = await response.text();
      if (process.env.NODE_ENV === "production") {
        console.error(`API ${endpoint} failed: ${response.status} - ${errorMessage}`);
      }
      return { data: [], headers: new Headers() };
    }
    const data = await response.json();
    const safeData = Array.isArray(data) ? data : [];
    return { data: safeData, headers: response.headers };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error(`API ${endpoint} error: ${error.message}`);
    }
    return { data: [], headers: new Headers() };
  }
}
async function fetchAllWithPagination(fetch, endpoint, fields) {
  const { headers, data: firstPageData } = await safeApiCall(fetch, endpoint, { per_page: 100, page: 1, _fields: fields.join(",") });
  const totalPages = parseInt(headers.get("x-wp-totalpages"), 10) || 1;
  let allData = firstPageData;
  if (totalPages > 1) {
    const pagePromises = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(safeApiCall(fetch, endpoint, { per_page: 100, page, _fields: fields.join(",") }));
    }
    const results = await Promise.all(pagePromises);
    results.forEach((result) => {
      allData = allData.concat(result.data);
    });
  }
  return allData;
}
async function getTotalPostsCount(fetch) {
  const { headers } = await safeApiCall(fetch, "posts", { per_page: 1, _fields: "id" });
  return parseInt(headers.get("x-wp-total"), 10) || 0;
}
async function getTotalTagsCount(fetch) {
  const { headers } = await safeApiCall(fetch, "tags", { per_page: 1, _fields: "id" });
  return parseInt(headers.get("x-wp-total"), 10) || 0;
}
async function fetchAllPages(fetch) {
  const pages = await fetchAllWithPagination(fetch, "pages", ["slug", "modified_gmt"]);
  const siteUrl = getSiteURL();
  return pages.map((page) => ({
    loc: `${siteUrl}/page/${page.slug}`,
    lastmod: new Date(page.modified_gmt).toISOString()
  }));
}
async function fetchAllCategories(fetch) {
  const categories = await fetchAllWithPagination(fetch, "categories", ["slug"]);
  return categories.map((cat) => ({
    slug: cat.slug,
    lastmod: (/* @__PURE__ */ new Date()).toISOString()
  }));
}
async function fetchAllAuthors(fetch) {
  const authors = await fetchAllWithPagination(fetch, "users", ["slug"]);
  const siteUrl = getSiteURL();
  return authors.map((author) => ({
    loc: `${siteUrl}/author/${author.slug}`,
    lastmod: (/* @__PURE__ */ new Date()).toISOString()
  }));
}
async function fetchSitemapEntries(fetch, type, sitemapPage, sitemapPageSize) {
  const API_MAX_PER_PAGE = 100;
  const endpoint = type === "posts" ? "posts" : "tags";
  const fields = type === "posts" ? ["id", "slug", "modified_gmt"] : ["slug"];
  const apiCallsNeeded = Math.ceil(sitemapPageSize / API_MAX_PER_PAGE);
  const startApiPage = (sitemapPage - 1) * apiCallsNeeded + 1;
  const endApiPage = startApiPage + apiCallsNeeded - 1;
  const pagePromises = [];
  for (let currentPage = startApiPage; currentPage <= endApiPage; currentPage++) {
    pagePromises.push(safeApiCall(fetch, endpoint, {
      page: currentPage,
      per_page: API_MAX_PER_PAGE,
      _fields: fields.join(",")
    }));
  }
  const results = await Promise.all(pagePromises);
  let allData = [];
  results.forEach((result) => {
    if (result.data) {
      allData = allData.concat(result.data);
    }
  });
  const siteUrl = getSiteURL();
  if (type === "posts") {
    return allData.map((item) => ({
      loc: `${siteUrl}/${item.id}/${item.slug}`,
      lastmod: item.modified_gmt ? new Date(item.modified_gmt).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    }));
  }
  if (type === "tags") {
    return allData.map((item) => ({
      loc: `${siteUrl}/tag/${item.slug}`,
      lastmod: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }
  return [];
}
export {
  getTotalTagsCount as a,
  fetchAllCategories as b,
  fetchAllPages as c,
  fetchSitemapEntries as d,
  fetchAllAuthors as f,
  getTotalPostsCount as g
};
