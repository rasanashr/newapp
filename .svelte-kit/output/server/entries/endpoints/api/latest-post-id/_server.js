import { j as json } from "../../../../chunks/index2.js";
import { f as fetchLatestPostId } from "../../../../chunks/wordpress.js";
async function GET() {
  const latestId = await fetchLatestPostId();
  return json({ latestId });
}
export {
  GET
};
