import * as universal from '../entries/pages/tag/_slug_/_page.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tag/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/tag/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/10.7ZeuSCjt.js","_app/immutable/chunks/Oyg_TdfJ.js","_app/immutable/chunks/CrqCNo7s.js","_app/immutable/chunks/B6FlMjrQ.js","_app/immutable/chunks/C-zKQLXa.js","_app/immutable/chunks/iFHsnjK9.js","_app/immutable/chunks/Bu2AUss9.js","_app/immutable/chunks/CvhO7qhS.js","_app/immutable/chunks/DUB9ztRx.js","_app/immutable/chunks/BsRF2vc2.js","_app/immutable/chunks/CakbJC7y.js","_app/immutable/chunks/BThVNy5y.js","_app/immutable/chunks/3CALFuJD.js","_app/immutable/chunks/YtwqVO3i.js","_app/immutable/chunks/D9AOjJGB.js","_app/immutable/chunks/BDxagX-Y.js","_app/immutable/chunks/B4yyLVG6.js","_app/immutable/chunks/B-yy7loJ.js"];
export const stylesheets = ["_app/immutable/assets/Sidebar.DegQjX0M.css"];
export const fonts = [];
