import * as universal from '../entries/pages/_id_/_slug_/_page.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_id_/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/[id]/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/11.qzDLK1II.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js","_app/immutable/chunks/CENBFzmi.js","_app/immutable/chunks/B118DP3z.js","_app/immutable/chunks/C7mwA5k6.js","_app/immutable/chunks/B9VSjDm6.js","_app/immutable/chunks/CBkoNQdp.js"];
export const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
export const fonts = [];
