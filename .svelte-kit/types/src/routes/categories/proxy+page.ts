// @ts-nocheck
import { fetchCategories } from '$lib/services/wordpress';

/** */
export async function load() {
    try {
        const categories = await fetchCategories();
        return {
            categories,
            status: 200
        };
    } catch (error) {
        console.error('Error loading categories:', error);
        return {
            categories: [],
            status: 500
        };
    }
}
