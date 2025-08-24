<script lang="ts">
  export let backlinks = [];
  export let loading = false;

  import { onMount } from 'svelte';

  onMount(() => {
    // اضافه کردن اسکریپت اعتماد الکترونیکی
    const script = document.createElement('script');
    script.src = 'https://trustseal.e-rasaneh.ir/trustseal.js';
    script.async = true;
    script.onload = () => {
      if (window.eRasaneh_Trustseal) {
        window.eRasaneh_Trustseal(80537, false);
      }
    };
    script.onerror = () => {
      console.error('Failed to load trustseal.js');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });
</script>

<style>
  .backlinks-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .backlink-item {
    padding: 0.2rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .backlink-item:hover {
    background-color: #f0f0f0;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }
</style>

{#if loading}
  <div class="grid gap-3">
    {#each Array(4) as _, i}
      <div key={i} class="skeleton h-8 w-full"></div>
    {/each}
  </div>
{:else if backlinks.length > 0}
  <div class="backlinks-container">
    {#each backlinks as link (link.id)}
      <div class="backlink-item text-sm font-reqular text-gray-700">
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.name}
        </a>
      </div>
    {/each}
  </div>
{:else}
  <div class="text-center my-8">هیچ بک‌لینکی وجود ندارد.</div>
{/if}

<div id="div_eRasanehTrustseal_80537"></div>
