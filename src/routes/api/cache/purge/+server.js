import { json } from '@sveltejs/kit';
import { purgeAllCache, purgeCacheKey } from '$lib/services/wordpress';

const SECRET = process.env.CACHE_PURGE_SECRET || '';
const CF_ZONE = process.env.CLOUDFLARE_ZONE_ID || '';
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';

export async function POST({ request }) {
    try {
        const body = await request.json();
        const token = (request.headers.get('x-cache-purge-token') || body.token || '').toString();
        if (!SECRET || token !== SECRET) {
            return json({ ok: false, message: 'unauthorized' }, { status: 401 });
        }

        if (body.action === 'purge_all') {
            await purgeAllCache();
            // optionally purge Cloudflare if configured
            if (CF_ZONE && CF_TOKEN) {
                try {
                    await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE}/purge_cache`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${CF_TOKEN}`
                        },
                        body: JSON.stringify({ purge_everything: true })
                    });
                } catch (e) {
                    // ignore
                }
            }
            return json({ ok: true });
        }

        // purge specific keys (array of cache keys)
        if (Array.isArray(body.keys)) {
            await Promise.all(body.keys.map(k => purgeCacheKey(k)));
            return json({ ok: true });
        }

        return json({ ok: false, message: 'invalid payload' }, { status: 400 });
    } catch (e) {
        return json({ ok: false, message: 'bad request' }, { status: 400 });
    }
}
