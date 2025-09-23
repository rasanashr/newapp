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
		client: {start:"_app/immutable/entry/start.BhvOVd-T.js",app:"_app/immutable/entry/app.CKrO4al6.js",imports:["_app/immutable/entry/start.BhvOVd-T.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/entry/app.CKrO4al6.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/YtwqVO3i.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DNXr0mIY.js')),
			__memo(() => import('./chunks/1-DvttH9o5.js')),
			__memo(() => import('./chunks/2-Dc5WppMa.js')),
			__memo(() => import('./chunks/3-B4XphwRh.js')),
			__memo(() => import('./chunks/4-DuHBU2oX.js')),
			__memo(() => import('./chunks/5-BoKJyamb.js')),
			__memo(() => import('./chunks/6-BJqQ0O91.js')),
			__memo(() => import('./chunks/7-BSPJxNIS.js')),
			__memo(() => import('./chunks/8-Bjz8Wl2w.js')),
			__memo(() => import('./chunks/9--nmEysr9.js')),
			__memo(() => import('./chunks/10-BefcYANQ.js')),
			__memo(() => import('./chunks/11-Bhu6fTTu.js')),
			__memo(() => import('./chunks/12-DCq2Wq3k.js'))
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
				endpoint: __memo(() => import('./chunks/_server-iZgmT82K.js'))
			},
			{
				id: "/api/ai/verify",
				pattern: /^\/api\/ai\/verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DmgwRKXA.js'))
			},
			{
				id: "/api/latest-post-id",
				pattern: /^\/api\/latest-post-id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => Promise.resolve().then(function () { return _server$4; }))
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
				endpoint: __memo(() => import('./chunks/_server-YVCvPuAg.js'))
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
				endpoint: __memo(() => import('./chunks/_server-CkK1YuoY.js'))
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
				endpoint: __memo(() => Promise.resolve().then(function () { return _server$3; }))
			},
			{
				id: "/sitemap-index.xml",
				pattern: /^\/sitemap-index\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => Promise.resolve().then(function () { return _server$2; }))
			},
			{
				id: "/sitemap-posts-[page].xml",
				pattern: /^\/sitemap-posts-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => Promise.resolve().then(function () { return _server$1; }))
			},
			{
				id: "/sitemap-tags-[page].xml",
				pattern: /^\/sitemap-tags-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => Promise.resolve().then(function () { return _server; }))
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-C9MOmnUz.js'))
			},
			{
				id: "/sitemaps/authors.xml",
				pattern: /^\/sitemaps\/authors\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DAMd0q94.js'))
			},
			{
				id: "/sitemaps/categories.xml",
				pattern: /^\/sitemaps\/categories\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-C_tco8gh.js'))
			},
			{
				id: "/sitemaps/pages.xml",
				pattern: /^\/sitemaps\/pages\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BEl29PXM.js'))
			},
			{
				id: "/sitemaps/posts-[page].xml",
				pattern: /^\/sitemaps\/posts-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DsQWxGN4.js'))
			},
			{
				id: "/sitemaps/tags-[page].xml",
				pattern: /^\/sitemaps\/tags-([^/]+?)\.xml\/?$/,
				params: [{"name":"page","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DnMRzJ32.js'))
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

const prerendered = new Set([]);

const base = "";

var _server$4 = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var _server$3 = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var _server$2 = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var _server$1 = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var _server = /*#__PURE__*/Object.freeze({
	__proto__: null
});

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
