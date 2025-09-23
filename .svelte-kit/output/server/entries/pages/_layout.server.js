import { b as fetchCategories } from "../../chunks/wordpress.js";
async function load() {
  const categories = await fetchCategories();
  return {
    categories
  };
}
export {
  load
};
