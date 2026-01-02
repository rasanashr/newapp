// src/hooks.server.ts
import { error } from '@sveltejs/kit';
import { startCron } from '$lib/server/cron';

// Start cache-refresh cron on server start (only when appropriate)
try {
  startCron();
} catch (e) {
  console.error('Failed to start cache cron:', e?.message || e);
}

/** الگوهای مسیرهای اسپم/قدیمی که قطعاً وجود ندارند */
const SPAM_PATH_PATTERNS = [
  /^\/amp\//,
  /^\/b\//,
  /^\/gmd\//,
  /^\/frm\//,
  /^\/azteb1\//,
  /^\/multipara-vs\//,
  /^\/a0lzgwb\//,
  /^\/98\/|\/99\/|\/9\//,
  /^\/old\//,
  /^\/index\//,
  /^\/note\//,
  /^\/doc\//,
  /^\/s\//,
  /^\/manager\//,
  /^\/author\/manager\//,
  /^\/chugoku\//,
  /^\/entry\//,
  /^\/p\//,
  /^\/ostad\//,
  /^\/event\//,
  /^\/photo\//,
  /^\/store\//,
  /^\/139[5-9]\//,
  /^\/date\/139[6-9]\//,
  /^\/product(s)?\//,
  /^\/news\//, // فقط اگر واقعاً وجود ندارد
  /^\/pcmypage/,
  /^\/safe_search/,
  /^\/items\//,
  /^\/ghost-login/,
];

/** پارامترهای URL که نشانه اسپم یا امنیتی هستند */
const SPAM_QUERY_PARAMS = ['g', 'y', 'c', 'key', 'callback', 'return_url', 'noamp', 's'];

export const handle = async ({ event, resolve }) => {
  const { url } = event;

  // بررسی مسیرها
  if (SPAM_PATH_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    throw error(410, 'This page has been permanently removed.');
  }

  // بررسی پارامترهای اسپم
  if (SPAM_QUERY_PARAMS.some(param => url.searchParams.has(param))) {
    throw error(410, 'Invalid request parameters.');
  }

  // سایر درخواست‌ها را عادی پردازش کن
  return resolve(event);
};

