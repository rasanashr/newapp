
import { fetchCategories } from '$lib/services/wordpress';

export async function load({ setHeaders }) {
    const categories = await fetchCategories();

    // Cache for 10 minutes on CDN and browser
    setHeaders({
        'Cache-Control': 'public, max-age=600, s-maxage=600'
    });

    return {
        categories
    };
} 