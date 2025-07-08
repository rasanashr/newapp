import * as universal from '../entries/pages/lastnews/_page.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/lastnews/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/lastnews/+page.js";
export const imports = ["_app/immutable/nodes/6.DJJFlnOE.js","_app/immutable/chunks/24e2lO8G.js","_app/immutable/chunks/XjSzAxxV.js","_app/immutable/chunks/DuS9CJ1Y.js","_app/immutable/chunks/j7d9bldu.js","_app/immutable/chunks/DzluJWIa.js","_app/immutable/chunks/BQQYos4s.js","_app/immutable/chunks/t2VtURLR.js","_app/immutable/chunks/CoueGlLg.js"];
export const stylesheets = [];
export const fonts = [];
