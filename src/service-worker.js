import { fetchPosts, fetchPostsByCategory } from '../lib/services/wordpress.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    try {
        // درخواست‌های ضروری (اولویت اول)
        const [result, mediapostData, firstnewsData, notofdayData, slider1Data, lasttextData] = await Promise.all([
            fetchPosts(1, 12),
            fetchPostsByCategory([61, 113, 66], 1, 13),
            fetchPostsByCategory(7, 1, 7),
            fetchPostsByCategory(276, 1, 1),
            fetchPostsByCategory(7, 1, 4),    // slider1 - 4 پست
            fetchPosts(1, 12)                 // lasttext
        ]);

        // ابتدا داده‌های اولویت اول را برمی‌گردانیم
        let data = {
            posts: result.posts,
            totalPages: result.totalPages,
            mediapostPosts: mediapostData.posts,
            firstnewsPosts: firstnewsData.posts,
            notofdayPosts: notofdayData.posts,
            slider1Posts: slider1Data.posts,   // اضافه کردن slider1
            lasttextPosts: lasttextData.posts, // اضافه کردن lasttext
            seo: {
                // ...existing code...
            }
        };

        // درخواست‌های اولویت دوم به صورت جداگانه
        const secondaryDataPromise = Promise.all([
            fetchPostsByCategory([136, 76], 1, 5),    // shortpic
            fetchPostsByCategory([81, 70, 792], 1, 7),  // piccard
            fetchPostsByCategory(627, 1, 5),    // minicard
            fetchPostsByCategory(8, 1, 1),      // singlecard1
            fetchPostsByCategory(4778, 1, 1),   // singlecard2
            fetchPostsByCategory(2, 1, 1),      // singlecard3
            fetchPostsByCategory(188, 1, 1),    // singlecard4
            fetch('https://rooidadha.ir/wp-json/backlink/v1/links').then(res => res.json())
        ]).catch(err => {
            console.error('Secondary data fetch error:', err);
            return Array(8).fill({ posts: [] }); // مقادیر پیش‌فرض در صورت خطا
        });

        // داده‌های اولویت دوم را به محض آماده شدن اضافه می‌کنیم
        const [
            shortpicData,
            piccardData,
            minicardData,
            singlecard1Data,
            singlecard2Data,
            singlecard3Data,
            singlecard4Data,
            backlinks
        ] = await secondaryDataPromise;

        return {
            ...data,
            shortpicPosts: shortpicData.posts,
            piccardPosts: piccardData.posts,
            minicardPosts: minicardData.posts,
            singlecard1Posts: singlecard1Data.posts,
            singlecard2Posts: singlecard2Data.posts,
            singlecard3Posts: singlecard3Data.posts,
            singlecard4Posts: singlecard4Data.posts,
            backlinks
        };

    } catch (error) {
        console.error('Error in home page load function:', error);
        return {
            posts: [],
            totalPages: 1,
            seo: null
        };
    }
}

let lastPostId = null;

// Utility: Fetch latest post id from WP REST API
async function checkForNewPost() {
  try {
    const res = await fetch('https://rasanashr.ir/wp-json/wp/v2/posts?per_page=1');
    const posts = await res.json();
    if (posts && posts.length > 0) {
      const latestId = posts[0].id;
      if (lastPostId && latestId !== lastPostId) {
        // New post published
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'NEW_CONTENT_AVAILABLE' });
          });
        });
      }
      lastPostId = latestId;
    }
  } catch (e) {
    // Silent fail
  }
}

// Poll every 60 seconds for new posts
setInterval(checkForNewPost, 60000);
self.addEventListener('activate', (event) => {
  event.waitUntil(checkForNewPost());
});