import { w as push, K as escape_html, y as pop, M as getContext } from './index-Dyzm0Ju0.js';
import { s as stores } from './client-BOFmO4Ow.js';
import './exports-bw_aLFL-.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-BSyTpQDA.js.map
