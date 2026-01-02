// src/routes/[...catchall]/+page.server.ts
import { error } from '@sveltejs/kit';

export const load = () => {
  // هر لینکی که به اینجا برسد، وجود ندارد
  throw error(404, 'Page not found.');
};