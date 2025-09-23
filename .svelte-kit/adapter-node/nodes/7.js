import * as universal from '../entries/pages/lastnews/_page.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/lastnews/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/lastnews/+page.js";
export const imports = ["_app/immutable/nodes/7.C9c91OpQ.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CakbJC7y.js"];
export const stylesheets = [];
export const fonts = [];
