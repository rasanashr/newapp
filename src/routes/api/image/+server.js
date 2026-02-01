import fs from 'fs';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), 'static', 'cache_images');

function mimeFromExt(extOrContent) {
  if (!extOrContent) return 'application/octet-stream';
  const s = extOrContent.toLowerCase();
  if (s.includes('webp') || s === '.webp') return 'image/webp';
  if (s.includes('jpeg') || s.includes('jpg') || s === '.jpg' || s === '.jpeg') return 'image/jpeg';
  if (s.includes('png') || s === '.png') return 'image/png';
  if (s.includes('gif') || s === '.gif') return 'image/gif';
  if (s.includes('svg') || s === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

async function ensureCacheDir() {
  await fs.promises.mkdir(CACHE_DIR, { recursive: true });
}

export async function GET({ url }) {
  const src = url.searchParams.get('src');
  if (!src) return new Response('src query param required', { status: 400 });

  await ensureCacheDir();

  const hash = crypto.createHash('sha1').update(src).digest('hex').slice(0, 16);
  let ext = '';
  try {
    const parsed = new URL(src);
    ext = path.extname(parsed.pathname) || '';
  } catch (e) {
    ext = '';
  }

  const candidates = ext ? [`${hash}${ext}`] : [];
  // also consider common extensions
  candidates.push(`${hash}.webp`, `${hash}.jpg`, `${hash}.png`, `${hash}.gif`, `${hash}.svg`);

  for (const name of candidates) {
    const p = path.join(CACHE_DIR, name);
    try {
      const stat = await fs.promises.stat(p);
      if (stat && stat.isFile()) {
        const mime = mimeFromExt(path.extname(name));
        const stream = fs.createReadStream(p);
        return new Response(stream, { headers: { 'Content-Type': mime, 'Cache-Control': 'public, max-age=31536000', 'X-Cache': 'HIT', 'X-Cache-File': name } });
      }
    } catch (e) {
      // not found -> continue
    }
  }

  // Not cached: fetch from origin, save, and return
  try {
    const resp = await axios.get(src, { responseType: 'arraybuffer', timeout: 20000 });
    const contentType = resp.headers['content-type'] || '';
    const derivedExt = ext || (contentType ? (contentType.includes('jpeg') ? '.jpg' : contentType.includes('webp') ? '.webp' : contentType.includes('png') ? '.png' : contentType.includes('gif') ? '.gif' : contentType.includes('svg') ? '.svg' : '') : '');
    const filename = `${hash}${derivedExt || '.img'}`;
    const filePath = path.join(CACHE_DIR, filename);

    await fs.promises.writeFile(filePath, Buffer.from(resp.data));

    const stream = fs.createReadStream(filePath);
    return new Response(stream, { headers: { 'Content-Type': contentType || mimeFromExt(derivedExt), 'Cache-Control': 'public, max-age=31536000', 'X-Cache': 'MISS', 'X-Cache-File': filename } });
  } catch (err) {
    console.error('Image proxy fetch error for', src, err && err.message);
    return new Response('Failed to fetch image', { status: 502 });
  }
}
