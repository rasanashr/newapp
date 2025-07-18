import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.D9f0t1Jt.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/CBkoNQdp.js","_app/immutable/chunks/B0j1-IUC.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/B9GwK8tt.js","_app/immutable/chunks/Dzz9Ws4N.js"];
export const stylesheets = ["_app/immutable/assets/2.D690OItg.css"];
export const fonts = [];
