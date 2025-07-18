const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["404.svg","duc.png","favicon.png","fonts/Estedad-Black.woff2","fonts/Estedad-Bold.woff2","fonts/Estedad-ExtraBold.woff2","fonts/Estedad-ExtraLight.woff2","fonts/Estedad-Light.woff2","fonts/Estedad-Medium.woff2","fonts/Estedad-Regular.woff2","fonts/Estedad-SemiBold.woff2","googlec3d0122c1f8ba5ed.html","googlec9ce5425c3754070.html","icon-192.png","icon-512.png","logo.svg","manifest.json","offline.html","placeholder.jpg","robots.txt","screenshot/scrinshot1.jpg","screenshot/scrinshot2.jpg","service-worker.js","splash.png","service-worker.js"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".woff2":"font/woff2",".html":"text/html",".json":"application/json",".jpg":"image/jpeg",".txt":"text/plain",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.ptE6rXPz.js",app:"_app/immutable/entry/app.0MwDuBqk.js",imports:["_app/immutable/entry/start.ptE6rXPz.js","_app/immutable/chunks/Dzz9Ws4N.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/entry/app.0MwDuBqk.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/C7mwA5k6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-B1Gy5oZB.js')),
			__memo(() => import('./chunks/1-DJoxANmz.js')),
			__memo(() => import('./chunks/2-C9kjuIC_.js')),
			__memo(() => import('./chunks/3-D6KoLItY.js')),
			__memo(() => import('./chunks/4-ClWexRwR.js')),
			__memo(() => import('./chunks/5-BNWIocsx.js')),
			__memo(() => import('./chunks/6-BEhNTzYj.js')),
			__memo(() => import('./chunks/7-DFCZERLU.js')),
			__memo(() => import('./chunks/8-Da_EZdTT.js')),
			__memo(() => import('./chunks/9-Dkyx3aND.js')),
			__memo(() => import('./chunks/10-WNq3QBzD.js')),
			__memo(() => import('./chunks/11-CgXp7Wkz.js'))
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
				endpoint: __memo(() => import('./chunks/_server-9Sf7Jg5i.js'))
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
				id: "/lastnews",
				pattern: /^\/lastnews\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/news-sitemap.xml",
				pattern: /^\/news-sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CEH7jfbZ.js'))
			},
			{
				id: "/page/[slug]",
				pattern: /^\/page\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-nrX6JGqE.js'))
			},
			{
				id: "/tag/[slug]",
				pattern: /^\/tag\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/[id]/[slug]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/[...catchall]",
				pattern: /^(?:\/(.*))?\/?$/,
				params: [{"name":"catchall","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
