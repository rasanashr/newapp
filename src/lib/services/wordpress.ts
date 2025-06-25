```typescript
import { WORDPRESS_API_URL } from '$env/static/private';

export async function fetchPosts(page = 1, perPage = 10, embed = false) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp/v2/posts?page=${page}&per_page=${perPage}${embed ? '&_embed' : ''}`);
        const posts = await response.json();
        return { posts };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [] };
    }
}

export async function fetchCategories() {
    try {
        // اول تعداد کل دسته‌ها را دریافت می‌کنیم
        const countResponse = await fetch(`${WORDPRESS_API_URL}/wp/v2/categories?per_page=1`);
        const totalCategories = parseInt(countResponse.headers.get('X-WP-Total') || '0');
        
        // محاسبه تعداد صفحات مورد نیاز
        const perPage = 100; // حداکثر تعداد مجاز در هر درخواست
        const totalPages = Math.ceil(totalCategories / perPage);
        
        // ایجاد آرایه‌ای از درخواست‌ها برای تمام صفحات
        const requests = Array.from({ length: totalPages }, (_, i) => 
            fetch(`${WORDPRESS_API_URL}/wp/v2/categories?per_page=${perPage}&page=${i + 1}&orderby=count&order=desc`)
                .then(res => res.json())
        );

        // اجرای همزمان تمام درخواست‌ها
        const responses = await Promise.all(requests);
        
        // ترکیب نتایج
        const allCategories = responses.flat().map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            count: category.count,
            description: category.description
        }));

        // فیلتر کردن دسته‌های خالی و مرتب‌سازی بر اساس تعداد پست‌ها
        return allCategories
            .filter(cat => cat.count > 0)
            .sort((a, b) => b.count - a.count);

    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
```