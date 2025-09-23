import { p as push, h as escape_html, e as pop, i as getContext } from './index2-D34Xi-nR.js';
import { s as stores } from './client-CMxLMNR_.js';
import './exports-Djz9nIiK.js';

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
//# sourceMappingURL=error.svelte-DGyfjrF_.js.map
