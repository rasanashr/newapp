import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// حالت پیش‌فرض: SSR روی Serverless Functions (Node.js)
			// اگر می‌خواهید از Edge Functions استفاده کنید، خط زیر را اضافه کنید:
			// runtime: 'edge'
		}),
		alias: {
			$components: 'src/components',
			$lib: 'src/lib'
		},
		csp: {
			mode: 'auto'
		},
		prerender: {
			handleMissingId: 'warn'
		}
	}
};

export default config;