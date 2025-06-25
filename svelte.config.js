import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
export default {
  kit: {
	adapter: adapter({
	  out: 'build',
	  precompress: true,
	  envPrefix: 'PUBLIC_'
	}),
	alias: {
	  $components: 'src/components',
	  $lib: 'src/lib',
	},
	csp: {
	  mode: 'auto'
	},
	prerender: {
	  handleMissingId: 'warn'
	}
  }
};




