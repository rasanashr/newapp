<script lang="ts">
     import HomeSEO from '$lib/components/seo/HomeSEO.svelte';
          /** @type {import('./$types').PageData} */
    export let data;
    
    let categories = data.categories;
    
    const colors = [
        'bg-yellow-200 text-yellow-800 hover:bg-yellow-300',
        'bg-red-500 text-white hover:bg-red-600',
        'bg-blue-300 text-blue-800 hover:bg-blue-400',
        'bg-indigo-500 text-white hover:bg-indigo-600',
        'bg-green-300 text-green-800 hover:bg-green-400',
        'bg-pink-200 text-pink-800 hover:bg-pink-300',
        'bg-sky-500 text-white hover:bg-indigo-600',
        'bg-fuchsia-400 text-green-800 hover:bg-green-400',
        'bg-orange-400 text-pink-800 hover:bg-pink-300',
    ];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
</script>

<HomeSEO />
<title>دسته بندی خبرها | رسا نشر</title>


<main class="container mx-auto px-4 py-8">
    <h1 class="text-2xl text-black font-bold text-center mb-12">دسته بندی مطالب منتشر شده در رسا نشر</h1>
    
    {#if categories.length === 0}
        <div class="text-center py-8">
            <div class="loading loading-spinner loading-lg"></div>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each categories as category}
                <a 
                    href="/category/{category.slug}"
                    class="transform transition-all duration-300 hover:scale-105 group"
                >
                    <div class="
                        relative
                        rounded-2xl
                        p-6
                        shadow-lg
                        hover:shadow-xl
                        transition-all
                        duration-300
                        {getRandomColor()}
                        flex
                        items-center
                        justify-between
                        rtl
                    ">
                        <div>
                            <span class="text-xl font-bold">{category.name}</span>
                            <span class="text-sm opacity-75">({category.count} مطلب)</span>
                        </div>
                        <span class="text-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-300">#</span>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</main>

<style>
    :global(body) {
        background-color: #f8f9fa;
    }
    
    .rtl {
        direction: rtl;
    }
    
    a {
        text-decoration: none;
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    .grid > a:hover {
        animation: float 2s ease-in-out infinite;
    }
</style>