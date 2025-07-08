export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["404.svg","duc.png","favicon.png","fonts/Estedad-Black.woff2","fonts/Estedad-Bold.woff2","fonts/Estedad-ExtraBold.woff2","fonts/Estedad-ExtraLight.woff2","fonts/Estedad-Light.woff2","fonts/Estedad-Medium.woff2","fonts/Estedad-Regular.woff2","fonts/Estedad-SemiBold.woff2","googlec3d0122c1f8ba5ed.html","googlec9ce5425c3754070.html","icon-192.png","icon-512.png","logo.svg","manifest.json","offline.html","placeholder.jpg","robots.txt","screenshot/scrinshot1.jpg","screenshot/scrinshot2.jpg","service-worker.js","splash.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".woff2":"font/woff2",".html":"text/html",".json":"application/json",".jpg":"image/jpeg",".txt":"text/plain",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.DE1AS-Yj.js",app:"_app/immutable/entry/app.BsWRBHlH.js",imports:["_app/immutable/entry/start.DE1AS-Yj.js","_app/immutable/chunks/B118DP3z.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/entry/app.BsWRBHlH.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/C7mwA5k6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/latest-post-id",
				pattern: /^\/api\/latest-post-id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/latest-post-id/_server.js'))
			},
			{
				id: "/author/[slug]",
				pattern: /^\/author\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/categories",
				pattern: /^\/categories\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/category/[slug]",
				pattern: /^\/category\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/news-sitemap.xml",
				pattern: /^\/news-sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/news-sitemap.xml/_server.js'))
			},
			{
				id: "/page/[slug]",
				pattern: /^\/page\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.js'))
			},
			{
				id: "/tag/[slug]",
				pattern: /^\/tag\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/[id]/[slug]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/[...catchall]",
				pattern: /^(?:\/(.*))?\/?$/,
				params: [{"name":"catchall","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/lastnews"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set(["/lastnews"]);

export const base = "";