import { b as fetchCategories } from "../../../chunks/wordpress.js";
async function load() {
  try {
    const categories = await fetchCategories();
    return {
      categories,
      status: 200
    };
  } catch (error) {
    console.error("Error loading categories:", error);
    return {
      categories: [],
      status: 500
    };
  }
}
export {
  load
};
