import { json } from '@sveltejs/kit';
import { fetchLatestPostId } from '$lib/services/wordpress.js';

export async function GET() {
    const latestId = await fetchLatestPostId();
    return json({ latestId });
}
