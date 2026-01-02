<script>
  export let posts = [];
  const limit = 30;
</script>

{#if posts && posts.length > 0}
  <div class="widget-container">
    <h3 class="widget-title">آخرین خبرها</h3>
    <ul class="news-list">
      {#each posts.slice(0, limit) as post}
        <li>
          <a href={`/${post.id}/${post.slug}`} class="news-link">
            {@html post.title.rendered}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <div class="loading-message">در حال بارگذاری...</div>
{/if}

<style>
  .widget-container {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }

  .widget-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: right;
  }

  .news-list {
    list-style-type: disc; /* This adds the bullet points */
    padding-right: 2rem; /* Adjust padding to make space for bullets on the right for RTL */
    margin: 0;
    text-align: right;
  }

  .news-list li {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .news-link {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease-in-out;
  }

  .news-link:hover {
    color: #3b82f6; /* A nice blue color for hover */
  }

  .loading-message {
    text-align: center;
    padding: 1rem;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .widget-container {
      padding: 0.5rem;
    }
    .widget-title {
      font-size: 1.1rem;
    }
    .news-list li {
      font-size: 0.85rem;
    }
  }
</style>
