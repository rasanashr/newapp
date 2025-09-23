import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.C2PdMMUQ.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/B-yy7loJ.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/3CALFuJD.js"];
export const stylesheets = ["_app/immutable/assets/2.D690OItg.css"];
export const fonts = [];
