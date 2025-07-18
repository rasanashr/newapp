import { j as json } from './index2-CvuFLVuQ.js';
import { l as fetchLatestPostId } from './wordpress-CsCrVOck.js';
import 'axios';

async function GET() {
  const latestId = await fetchLatestPostId();
  return json({ latestId });
}

export { GET };
//# sourceMappingURL=_server-9Sf7Jg5i.js.map
