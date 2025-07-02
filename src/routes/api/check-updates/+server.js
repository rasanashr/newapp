export async function GET() {
  const res = await fetch('https://rasanashr.ir/wp-json/wp/v2/posts?per_page=1');
  const posts = await res.json();
  return new Response(JSON.stringify({ latestId: posts[0]?.id || null }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
