// src/routes/category/+layout.server.ts

import { redirect } from '@sveltejs/kit';

const CATEGORY_REDIRECTS = {
  'هوش_مصنوعی': 'ai-news',
  'اجتماعی': 'community',
  'حوادث': 'events',
  'اخبارتهران': 'tehran',
  'اعتقادی': 'belief',
  'اقتصادی': 'economic',
  'اخبار-رمز-ارزها': 'cryptocurrency',
  'کار-و-کسب': 'business',
  'بین-الملل': 'international',
  'پزشکی-و-سلامت': 'medicine',
  'چندرسانه-ای': 'multimedia',
  'اخبار-موسیقی': 'music',
  'عکس-خبری': 'photos',
  'گزارش-ویدیویی': 'videos',
  'خبرهای-رسانه': 'media-news',
  'مُدوزیبایی': 'fashion',
  'طنز-و-سرگرمی': 'entertainment',
  'سیاسی': 'political',
  'صفحه-نخست': 'top-news',    
  'علم-و-فناوری': 'science',
  'فرهنگ-و-هنر': 'culture',
  'فیلم-و-سینما': 'cinema',
  'کتابخانه': 'books',
  'فناوری_اطلاعات': 'technology',
  'اخبار-هوش-مصنوعی': 'ai-news',
  'تلفن-همراه': 'mobile',
  'دیجیتال-مارکتینگ': 'digital-marketing',
  'نرم-افزار': 'software',
  'ورزشی': 'sports',
  'یادداشت-روز': 'daily-notes'
};

export const load = async ({ params, url }) => {
  const slug = params.slug; // اسلگ از URL

  if (slug && CATEGORY_REDIRECTS[slug]) {
    const newUrl = `/category/${CATEGORY_REDIRECTS[slug]}${url.search}`;
    throw redirect(301, newUrl);
  }

  // اگر اسلگ قدیمی نبود، ادامه بده
  return {};
};