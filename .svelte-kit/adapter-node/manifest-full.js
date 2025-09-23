export const manifest = (() => {
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
		client: {start:"_app/immutable/entry/start.BhvOVd-T.js",app:"_app/immutable/entry/app.CKrO4al6.js",imports:["_app/immutable/entry/start.BhvOVd-T.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/entry/app.CKrO4al6.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/YtwqVO3i.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js'))
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
				id: "/api/ai/analyze",
				pattern: /^\/api\/ai\/analyze\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/ai/analyze/_server.js'))
			},
			{
				id: "/api/ai/verify",
				pattern: /^\/api\/ai\/verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/ai/verify/_server.js'))
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
				id: "/feed",
				pattern: /^\/feed\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/feed/_server.js'))
			},
			{
				id: "/freegrokchat",
				pattern: /^\/freegrokchat\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/lastnews",
				pattern: /^\/lastnews\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
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
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/sitemap-categories.xml",
				pattern: /^\/sitemap-categories\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap-categories.xml/_server.js'))
			},
			{
				id: "/sitemap-index.xml",
				pattern: /^\/sitemap-index\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap-index.xml/_server.js'))
			},
			{
				id: "/sitemap-posts-[page].xml",
				pattern: /^\/sitemap-posts-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap-posts-_page_.xml/_server.js'))
			},
			{
				id: "/sitemap-tags-[page].xml",
				pattern: /^\/sitemap-tags-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap-tags-_page_.xml/_server.js'))
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.js'))
			},
			{
				id: "/sitemaps/authors.xml",
				pattern: /^\/sitemaps\/authors\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemaps/authors.xml/_server.js'))
			},
			{
				id: "/sitemaps/categories.xml",
				pattern: /^\/sitemaps\/categories\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemaps/categories.xml/_server.js'))
			},
			{
				id: "/sitemaps/pages.xml",
				pattern: /^\/sitemaps\/pages\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemaps/pages.xml/_server.js'))
			},
			{
				id: "/sitemaps/posts-[page].xml",
				pattern: /^\/sitemaps\/posts-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemaps/posts-_page_.xml/_server.js'))
			},
			{
				id: "/sitemaps/tags-[page].xml",
				pattern: /^\/sitemaps\/tags-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemaps/tags-_page_.xml/_server.js'))
			},
			{
				id: "/tag/[slug]",
				pattern: /^\/tag\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/[id]/[slug]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/[...catchall]",
				pattern: /^(?:\/(.*))?\/?$/,
				params: [{"name":"catchall","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
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
