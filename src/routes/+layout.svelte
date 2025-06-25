<script>
  import '../app.css';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import Splash from '$components/widgets/Splash.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import { page, navigating } from '$app/stores';
  import { fetchCategories } from '$lib/services/wordpress';
  import { onMount } from 'svelte';

  let categories = [];

  onMount(async () => {
    categories = await fetchCategories();
  });

</script>

{#if $navigating}
  <div class="loading-overlay">
  <Splash />
  </div>
{/if}

<div class="flex flex-col min-h-screen">
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