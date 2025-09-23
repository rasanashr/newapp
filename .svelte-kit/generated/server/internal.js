
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: true,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"fa\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <link rel=\"icon\" href=\"/favicon.png\" />\n    <link rel=\"manifest\" href=\"/manifest.json\">\n    <link rel=\"alternate\" type=\"application/rss+xml\" href=\"https://rasarooz.ir/feed\">\n    <meta name=\"theme-color\" content=\"#f40000\">\n    <link rel=\"apple-touch-icon\" href=\"/icon-192.png\">\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n  \n    \n" + head + "</head>\n  <body>\n    <div id=\"svelte\"> " + body + "</div>\n    <script>\n      if ('serviceWorker' in navigator) {\n        window.addEventListener('load', () => {\n          navigator.serviceWorker.register('/service-worker.js', { scope: '/' })\n            .then(registration => {\n              console.log('SW registered:', registration);\n            })\n            .catch(error => {\n              console.log('SW registration failed:', error);\n            });\n        });\n      }\n    </script>\n  </body>\n</html>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "wnt6ep"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };
