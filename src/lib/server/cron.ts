import { dev } from '$app/environment';
import { fetchPosts, fetchCategories, fetchLatestPostsForFeed, fetchBacklinks } from '$lib/services/wordpress';

let started = false;

/**
 * Start a simple in-process cron to warm/refresh caches for hot endpoints.
 * Runs only when not in dev and when ENABLE_CACHE_CRON !== 'false'.
 */
export function startCron(options = {}) {
    if (started) return;
    const enabled = !dev && process.env.ENABLE_CACHE_CRON !== 'false';
    if (!enabled) return;

    started = true;
    const intervalSeconds = options.intervalSeconds || parseInt(process.env.CACHE_CRON_INTERVAL_SECONDS || '60', 10);

    async function refreshOnce() {
        try {
            // Warm homepage (first page)
            await fetchPosts(1, 12);
            // Warm lastnews
            await fetchPosts(1, 20);
            // Warm categories list
            await fetchCategories();
            // Warm feed
            await fetchLatestPostsForFeed();
            // Warm backlinks
            await fetchBacklinks();
        } catch (err) {
            console.error('Cache refresh error:', err?.message || err);
        }
    }

    // Run once immediately to warm caches
    void refreshOnce();

    // Schedule periodic refreshes
    setInterval(() => {
        void refreshOnce();
    }, Math.max(10, intervalSeconds) * 1000);

    console.log(`Cache cron started: interval=${intervalSeconds}s`);
}

export default startCron;
