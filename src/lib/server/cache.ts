
import { dev } from '$app/environment';

type CacheEntry = {
    value: any;
    timestamp: number;
};

const cache = new Map<string, CacheEntry>();

const CACHE_DURATION_SECONDS = 60 * 10; // 10 minutes

export function set(key: string, value: any) {
    if (dev) return; // Don't cache in development
    const entry: CacheEntry = { value, timestamp: Date.now() };
    cache.set(key, entry);
}

export function get<T>(key: string): T | null {
    if (dev) return null; // Don't use cache in development

    const entry = cache.get(key);
    if (!entry) {
        return null;
    }

    const isExpired = (Date.now() - entry.timestamp) / 1000 > CACHE_DURATION_SECONDS;
    if (isExpired) {
        cache.delete(key);
        return null;
    }

    return entry.value as T;
} 