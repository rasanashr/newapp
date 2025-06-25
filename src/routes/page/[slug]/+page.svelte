<script>
    import PageSEO from '$lib/components/seo/PageSEO.svelte';
    import Sidebar from '$components/Sidebar.svelte';
    import { page } from '$app/stores';
    import { sanitizeHtml } from '$lib/utils/sanitize';

    /** @type {import('./$types').PageData} */
    export let data;

    $: pageData = data.page;
    $: currentUrl = `https://rasanashr.ir${$page.url.pathname}`;

    // پاکسازی محتوای HTML با استفاده از utils
    $: content = pageData?.content?.rendered ? sanitizeHtml(pageData.content.rendered) : '';
</script>

<PageSEO pageData={data.page} />

    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <div class="w-full lg:w-2/3">
            {#if pageData}
                <article class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="p-8">
                        <h1 class="text-3xl font-bold mb-8 text-right">
                            {@html pageData.title.rendered}
                        </h1>

                        <div class="prose prose-lg max-w-none rtl">
                            {@html content}
                        </div>
                    </div>
                </article>
            {:else}
                <div class="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h1 class="text-3xl font-bold mb-4">صفحه مورد نظر یافت نشد</h1>
                    <p class="text-xl text-gray-600 mb-6">متأسفانه صفحه مورد نظر شما در سایت وجود ندارد.</p>
                    <a href="/" class="btn btn-primary">
                        بازگشت به صفحه اصلی
                    </a>
                </div>
            {/if}
            <div class="mb-5"></div>
        </div>

        <!-- Sidebar -->
      
<Sidebar lasttextPosts={data.lasttextPosts} backlinks={data.backlinks} />      
    
 </div>
 <div class="mb-10"></div>

