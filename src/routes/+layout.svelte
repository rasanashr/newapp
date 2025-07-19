<script>
  import '../app.css';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import Splash from '$components/widgets/Splash.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import { page, navigating } from '$app/stores';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let data;

  // Create a writable store for categories and set it in the context
  const categories = writable(data.categories);
  setContext('categories', categories);

  $: categories.set(data.categories);
</script>

{#if $navigating}
  <div class="loading-overlay">
  <Splash />
  </div>
{/if}

<div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
  <Header {categories} />
  
  <main class="flex-grow">
    <slot />
  </main>

  <Footer />
  
  <!-- Back to Top Button -->
  <BackToTop />
</div>

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-size: 1.5em;
  }
</style>