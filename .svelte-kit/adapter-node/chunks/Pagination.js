import { E as fallback, N as ensure_array_like, Q as attr_class, G as attr, D as escape_html, F as bind_props, C as pop, z as push, P as stringify } from "./index.js";
function Pagination($$payload, $$props) {
  push();
  let currentPage = fallback($$props["currentPage"], 1);
  let totalPages = fallback($$props["totalPages"], 1);
  let onPageChange = fallback($$props["onPageChange"], (page) => {
  });
  let pages = [];
  {
    pages = [];
    const maxVisiblePages = 3;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
  }
  const each_array = ensure_array_like(pages);
  $$payload.out += `<div class="flex justify-center mt-8"><div class="join rtl"><button${attr_class(`join-item btn ${stringify(currentPage === 1 ? "btn-disabled" : "")}`)} aria-label="دکمه صفحه قبلی"${attr("disabled", currentPage === 1, true)}>قبلی</button> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let page = each_array[$$index];
    if (page === "...") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="join-item btn btn-disabled">...</button>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<button${attr_class(`join-item btn ${stringify(page === currentPage ? "btn-primary" : "")}`)}${attr("aria-label", `دکمه صفحه ${stringify(page)}`)}>${escape_html(page)}</button>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> <button${attr_class(`join-item btn ${stringify(currentPage === totalPages ? "btn-disabled" : "")}`)} aria-label="دکمه صفحه بعدی"${attr("disabled", currentPage === totalPages, true)}>بعدی</button></div></div>`;
  bind_props($$props, { currentPage, totalPages, onPageChange });
  pop();
}
export {
  Pagination as P
};
