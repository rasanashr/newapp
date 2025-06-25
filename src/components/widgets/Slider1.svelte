<script lang="ts">
  export let posts: any[] = [];
  let currentSlide = 0;
  $: totalSlides = posts.length;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
  }

  function prevSlide() {
    currentSlide = currentSlide <= 0 ? totalSlides - 1 : currentSlide - 1;
  }

  import { onMount } from 'svelte';
  let interval: any;

  onMount(() => {
    interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  });
</script>

<style>
  .carousel-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 350px; /* ارتفاع ثابت برای اسلایدر */
    direction: ltr;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
  }

  .carousel-slide {
    flex: 0 0 100%;
    width: 100%;
    direction: rtl;
    position: relative;
  }

  .carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

{#if posts && posts.length > 0}
  <div class="w-full relative">
    <div class="carousel-container">
      <div
        class="carousel-track"
        style="transform: translateX({-currentSlide * 100}%)"
      >
        {#each posts as post, i}
          <div class="carousel-slide">
            <!-- Container تصویر -->
            <div class="w-full h-[330px] overflow-hidden bg-base-400 rounded-[20px]">
              <a href={`/${post.id}/${post.slug}`}>
                <img
                  src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                  alt={post.title.rendered}
                  class="carousel-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </a>
            </div>

            <!-- عنوان و خلاصه -->
            <div class="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 rounded-b-[20px]">
              <a href={`/${post.id}/${post.slug}`}>
                <h2 class="font-bold text-lg text-justify line-clamp-1">
                  {@html post.title.rendered}
                </h2>
              </a>
              <div class="text-sm text-gray-700 line-clamp-2 mt-2">
                {@html post.excerpt.rendered}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    
    <!-- دکمه قبلی -->
    <button
      class="btn btn-circle absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white z-10"
      on:click={prevSlide}
       aria-label="دکمه قبلی اسلاید"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- دکمه بعدی -->
    <button
      class="btn btn-circle absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white z-10"
      on:click={nextSlide}
       aria-label="دکمه بعدی اسلاید"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
{:else}
  <div class="text-center p-4">در حال بارگذاری...</div>
{/if}