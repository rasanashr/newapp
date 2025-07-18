import * as universal from '../entries/pages/page/_slug_/_page.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/page/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/page/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/7.Bl9aa8mS.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/B9GwK8tt.js","_app/immutable/chunks/Dzz9Ws4N.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/1yZpvcLQ.js","_app/immutable/chunks/CBkoNQdp.js"];
export const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
export const fonts = [];
