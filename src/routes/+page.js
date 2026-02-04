import { fetchPosts, fetchPostsByCategory, fetchBacklinks, fetchPostsByTag } from '../lib/services/wordpress.js';

/**
 * ساختار جدید و قابل توسعه برای بارگذاری ویجت‌ها در صفحه اصلی.
 * برای اضافه کردن ویجت جدید کافیست یک آیتم به `primaryWidgets` یا `secondaryWidgets` اضافه کنید.
 */

/** @type {import('./$types').PageLoad} */
export async function load() {
    try {
        // پیکربندی ویجت‌ها — فقط متادیتا و تابع فراخوانی را مشخص کنید
        // Change `HERO_TAG_ID` to the desired tag id (or slug) for the full-screen hero
        const HERO_TAG_ID = 7803;

        const primaryWidgets = [
            { key: 'stackedhero', fn: () => fetchPostsByTag(HERO_TAG_ID, 1, 6) },
            { key: 'posts', fn: () => fetchPosts(1, 12) },
            { key: 'mediapost', fn: () => fetchPostsByCategory([61, 113, 66], 1, 13) },
            { key: 'firstnews', fn: () => fetchPostsByCategory(7, 1, 8) },
            { key: 'notofday', fn: () => fetchPostsByCategory(276, 1, 1) },
            { key: 'slider1', fn: () => fetchPostsByCategory(7, 1, 4) },
            { key: 'lasttext', fn: () => fetchPosts(1, 14) }
        ];

        const secondaryWidgets = [
            { key: 'shortpic', fn: () => fetchPostsByCategory([136, 76], 1, 5) },
            { key: 'piccard', fn: () => fetchPostsByCategory([81, 70, 792], 1, 7) },
            { key: 'minicard', fn: () => fetchPostsByCategory(627, 1, 5) },
            { key: 'singlecard1', fn: () => fetchPostsByCategory(8, 1, 1) },
            { key: 'singlecard2', fn: () => fetchPostsByCategory(4778, 1, 1) },
            { key: 'singlecard3', fn: () => fetchPostsByCategory(2, 1, 1) },
            { key: 'singlecard4', fn: () => fetchPostsByCategory(188, 1, 1) },
            { key: 'singlecard5', fn: () => fetchPostsByCategory(204, 1, 1) },
            { key: 'singlecard6', fn: () => fetchPostsByCategory(327, 1, 1) },
            { key: 'backlinks', fn: () => fetchBacklinks() }
        ];

        // هِلپر کمکی برای اجرای همزمان ویجت‌ها و نگاشت نتیجه بر اساس کلید
        const fetchWidgets = async (widgets) => {
            const promises = widgets.map(w =>
                Promise.resolve()
                    .then(() => w.fn())
                    .catch(err => {
                        console.error(`Widget "${w.key}" fetch error:`, err);
                        return { posts: [] };
                    })
            );

            const results = await Promise.all(promises);
            const mapped = {};
            widgets.forEach((w, i) => {
                mapped[w.key] = results[i] ?? { posts: [] };
            });
            return mapped;
        };

        // ابتدا ویجت‌های اولویت اول را هم‌زمان می‌گیریم
        const primaryResults = await fetchWidgets(primaryWidgets);

        // ساختار اولیه بازگردانده شده به مصرف‌کننده (ساده و مطمئن)
        const data = {
            posts: primaryResults.posts.posts ?? [],
            stackedheroPosts: primaryResults.stackedhero?.posts ?? [],
            totalPages: primaryResults.posts.totalPages ?? 1,
            mediapostPosts: primaryResults.mediapost.posts ?? [],
            firstnewsPosts: primaryResults.firstnews.posts ?? [],
            notofdayPosts: primaryResults.notofday.posts ?? [],
            slider1Posts: primaryResults.slider1.posts ?? [],
            lasttextPosts: primaryResults.lasttext.posts ?? [],
            seo: {
                // placeholder — در صورت نیاز مقادیر SEO را اینجا اضافه کنید
            }
        };

        // ویجت‌های ثانویه را شروع می‌کنیم و سپس نتیجه را اضافه می‌کنیم
        const secondaryPromise = fetchWidgets(secondaryWidgets);

        const secondaryResults = await secondaryPromise;

        // جمع‌بندی نهایی
        return {
            ...data,
            shortpicPosts: secondaryResults.shortpic.posts ?? [],
            piccardPosts: secondaryResults.piccard.posts ?? [],
            minicardPosts: secondaryResults.minicard.posts ?? [],
            singlecard1Posts: secondaryResults.singlecard1.posts ?? [],
            singlecard2Posts: secondaryResults.singlecard2.posts ?? [],
            singlecard3Posts: secondaryResults.singlecard3.posts ?? [],
            singlecard4Posts: secondaryResults.singlecard4.posts ?? [],
            singlecard5Posts: secondaryResults.singlecard5.posts ?? [],
            singlecard6Posts: secondaryResults.singlecard6.posts ?? [],
            backlinks: secondaryResults.backlinks ?? []
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
