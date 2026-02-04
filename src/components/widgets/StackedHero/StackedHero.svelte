<script>
  import { onMount, onDestroy } from 'svelte';
  import { fetchPostsByTag, fetchTag } from '$lib/services/wordpress';

  export let tagId = null; // number or slug
  export let count = 10;
  export let posts = null; // optional preloaded posts
  export let interval = 10000;

  let tag = null;
  let items = (posts && Array.isArray(posts)) ? posts.slice(0, count) : [];
  let current = 0;
  let timer;
  let loading = false;

  const isNumber = v => typeof v === 'number' || (!isNaN(Number(v)) && String(v).trim() !== '');

  async function loadPosts() {
    // If caller passed `posts` (server-side rendered), prefer that and skip fetching
    if (posts && Array.isArray(posts) && posts.length) {
      items = posts.slice(0, count);
      console.debug('StackedHero: using posts prop, count=', items.length);
      return;
    }
    if (!tagId) return;
    loading = true;
    try {
      let idToUse = tagId;
      if (!isNumber(tagId)) {
        tag = await fetchTag(tagId);
        if (tag) idToUse = tag.id;
      }
      const res = await fetchPostsByTag(idToUse, 1, count);
      items = res?.posts || [];
    } catch (e) {
      console.error('StackedHero load error', e);
    } finally {
      loading = false;
    }
  }

  // Keep items in sync if `posts` prop changes (useful during client navigation)
  $: if (posts && Array.isArray(posts)) {
    items = posts.slice(0, count);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => next(), interval);
  }
  function stopAutoplay() { if (timer) { clearInterval(timer); timer = null; } }

  function next() {
    current = (current + 1) % Math.max(1, items.length);
  }
  function goTo(i) {
    current = i % Math.max(1, items.length);
    startAutoplay();
  }

  function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  }

  onMount(async () => {
    // Only fetch from API when we don't already have server-provided posts
    if (!items || items.length === 0) {
      await loadPosts();
    }
    startAutoplay();
  });

  onDestroy(() => stopAutoplay());
</script>

<style>
  :global(.stacked-hero) { width:100%; box-sizing:border-box; }
  .hero { display:flex; gap:28px; align-items:stretch; width:100%; height:620px;  padding:28px; background: #ECDCBF;
background: linear-gradient(135deg, rgba(236, 220, 191, 0.78) 0%, rgba(236, 220, 191, 0) 45%); box-shadow:0 10px 20px rgba(0,0,0,0.35); border-radius:10px;}
  @media (max-width: 900px) { .hero { flex-direction:column; height:auto; padding:16px; } }

  .left { flex:1; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
  .stack { width:75%; height:85%; position:relative; perspective:1200px; }

  .card { position:absolute; left:50%; top:50%; transform-origin:center center; transform:translate(-50%,-50%); width:720px; max-width:90vw; height:420px; box-shadow:0 20px 40px rgba(0,0,0,0.35); border-radius:8px; overflow:hidden; transition:transform 700ms cubic-bezier(.2,.9,.3,1), opacity 700ms ease; }
  .card img { width:100%; height:100%; object-fit:cover; display:block; }

  /* stacking transforms based on data-index */
  .card[data-index="0"] { z-index:6; transform: translate(-50%,-50%) rotate(-2deg) scale(1); }
  .card[data-index="1"] { z-index:5; transform: translate(-48%,-46%) rotate(2deg) scale(.98); filter:brightness(.95) contrast(.95); }
  .card[data-index="2"] { z-index:4; transform: translate(-46%,-42%) rotate(-4deg) scale(.96); filter:brightness(.9); }
  .card[data-index="3"] { z-index:3; transform: translate(-44%,-38%) rotate(4deg) scale(.94); filter:grayscale(.05) brightness(.88); }
  .card[data-index="4"] { z-index:2; transform: translate(-42%,-34%) rotate(-6deg) scale(.92); opacity:.85; }
  .card[data-index="5"] { z-index:1; transform: translate(-40%,-30%) rotate(6deg) scale(.9); opacity:.8; }

  .card.hidden { opacity:0; transform: translate(-50%,-80%) scale(.9) rotate(0deg); pointer-events:none; }

  .right { width:460px; max-width:40%; display:flex; flex-direction:column; gap:12px; }
  @media (max-width: 1200px) { .right { width:380px; } }
  @media (max-width: 900px) { .right { width:100%; max-width:100%; order:2; } }

  .meta { display:flex; gap:8px; align-items:center; }
  .btn { background:#454545; color:#fff; padding:8px 12px; border-radius:6px; text-decoration:none; font-weight:700; font-size:14px; }
  .tagbtn { background:rgba(0,0,0,0.85); }

  .hero-title { color: #FF0B55; text-decoration:none; }
  .hero-title:hover { color:#454545; text-decoration:none; }

  /* special label shown above the large stacked images */
  .special-label { position:absolute; width:80%; text-align:center; top:1px; left:50%; transform:translateX(-50%); background:#454545; padding:10px; border-radius:10px; box-shadow:0 6px 18px rgba(0,0,0,0.12); font-weight:900; z-index:50; color:#FF0B55; }

  h2 { margin:0; font-size:30px; line-height:1.07; }
  .excerpt { background:#DED0B6; color:#876f40; padding:12px; border-radius:8px; font-size:15px; }
  .content { color:#564d3a; line-height:1.6; max-height:360px; overflow:auto; }

  /* thumbnails centered over the bottom-center of the stack (desktop) */
  .thumbs { position:absolute; left:50%; transform:translateX(-50%); display:flex; gap:8px; bottom:18px; z-index:30; }
  .thumb { width:72px; height:54px; border-radius:6px; overflow:hidden; box-shadow:0 6px 12px rgba(0,0,0,0.2); cursor:pointer; border:2px solid rgba(255,255,255,0.25); transition:transform .2s ease, border-color .2s ease; }
  .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
  .thumb.active { transform:translateY(-6px) scale(1.03); border-color:#fff; }

  .excerpt, .content { text-align:justify; }

  @media (max-width: 900px) {
    .thumbs { position:relative; left:auto; transform:none; bottom:auto; margin-top:12px; }
  }

  /* small visual polish */
  .left:after { content:''; position:absolute; inset:0; pointer-events:none; background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0.04)); mix-blend-mode:overlay; }

</style>

{#if loading}
  <div class="stacked-hero">در حال بارگذاری...</div>
{:else}
  {#if items && items.length}
    <section class="stacked-hero">
      <div class="hero">
        <div class="left">
          <h2 class="special-label">پرونده ویژه: ایران و آمریکا؛ جنگ یا صلح؟!</h2>
          <div class="stack" aria-hidden>
            {#each items as post, i (post.id)}
              {@const idx = (i - current + items.length) % items.length}
              <article class="card" data-index={idx} class:hidden={idx >= items.length - 1} style="transition-delay: {i * 60}ms;">
                {#if post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]}
                  <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} loading="lazy"/>
                {:else}
                  <div style="width:100%;height:100%;background:#eee;display:flex;align-items:center;justify-content:center;color:#999">تصویر ندارد</div>
                {/if}
              </article>
            {/each}
          </div>
          <!-- thumbnails placed below the stack so they don't sit underneath the main image -->
          <div class="thumbs">
            {#each items as post, i}
              <div role="button" tabindex="0" class="thumb" class:active={i===current} on:click={() => goTo(i)} on:keydown={(e)=> e.key==='Enter' && goTo(i)}>
                {#if post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]}
                  <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered}/>
                {:else}
                  <div style="width:100%;height:100%;background:#ddd"></div>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <div class="right">
          {#if items[current]}
            {@const p = items[current]}
              <div class="meta">
                {#if p._embedded && p._embedded['wp:term'] && p._embedded['wp:term'][0] && p._embedded['wp:term'][0][0]}
                  {@const cat = p._embedded['wp:term'][0][0]}
                    <a class="btn" href={'/category/' + (cat.slug || cat.id)}>{cat.name}</a>
                {/if}

                {#if tag}
                  <a class="btn tagbtn" href={'/tag/' + (tag.slug || tag.id)}>{tag.name}</a>
                {:else}
                  <!-- if tag not preloaded show fallback button linking to tagId -->
                  {#if tagId}
                    <a class="btn tagbtn" href={'/tag/' + tagId}>برچسب</a>
                  {/if}
                {/if}
              </div>

              <h2><a class="hero-title" href={p.link} rel="bookmark">{@html p.title.rendered}</a></h2>

              <div class="excerpt">{@html p.excerpt.rendered}</div>

              <div class="content">{stripHtml(p.content?.rendered).slice(0,1000)}{stripHtml(p.content?.rendered).length>1000? '...':''}</div>
          {/if}
        </div>
      </div>
    </section>
  {:else}
    <div class="stacked-hero">پستی برای نمایش یافت نشد.</div>
  {/if}
{/if}
