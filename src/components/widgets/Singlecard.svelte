<script>
    export let posts = [];
    export let bgColor = 'bg-yellow-100';
    export let hoverColor = 'hover:bg-yellow-50';
</script>

{#if posts && posts.length > 0}
    <div class="grid gap-4">
        {#each posts as post}
            <div class={`flex flex-col md:flex-row p-4 rounded-xl shadow ${bgColor} gap-4 
                transition duration-300 hover:-translate-y-1 hover:scale-[1.02] 
                ${hoverColor} hover:ring-2 hover:ring-yellow-300`}>
                <!-- تصویر شاخص -->
                {#if post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                    <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered}
                        class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mx-auto md:mx-0"
                    />
                {:else}
                    <div class="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full mx-auto md:mx-0 flex items-center justify-center">
                        <span class="text-gray-400">بدون تصویر</span>
                    </div>
                {/if}

                <a href={`/${post.id}/${post.slug}`} class="flex flex-col justify-between flex-1 text-inherit no-underline">
                    <div>
                        <h2 class="font-bold text-base md:text-lg text-gray-900 mb-2 text-center md:text-right">
                            {@html post.title.rendered}
                        </h2>
                        <div class="text-sm text-gray-700 line-clamp-3 mb-3 text-justify px-2 md:px-0">
                            {@html post.excerpt.rendered}
                        </div>
                    </div>

                    <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-auto">
                        {#if post.categories_info?.length > 0}
                            <span class="text-sm bg-gray-200 px-3 py-1 rounded-full text-gray-800">
                                دسته: {post.categories_info[0].name}
                            </span>
                        {/if}
                        {#if post.tags_info?.length > 0}
                            <span class="text-sm bg-white border px-3 py-1 rounded-full text-gray-700">
                                #{post.tags_info[0].name}
                            </span>
                        {/if}
                    </div>
                </a>
            </div>
        {/each}
    </div>
{:else}
    <div class="text-center p-4">در حال بارگذاری...</div>
{/if}

