
import { fetchCategories } from '$lib/services/wordpress';

export async function load() {
    const categories = await fetchCategories();
    return {
        categories
    };
} 