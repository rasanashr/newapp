
<script>
	import Sidebar from '$components/Sidebar.svelte';
	import GrokChat from '$lib/components/GrokChat.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;
</script>


<div class="flex flex-col lg:flex-row gap-8">
	<!-- Main Content -->
	<div class="w-full lg:w-2/3">
		<div class="bg-white rounded-lg shadow-lg overflow-hidden">
			<div class="p-6">
				<h1 class="text-2xl font-bold mb-4">گفتگوی آزاد با هوش مصنوعی</h1>
				<p class="text-gray-600 mb-6">
					در این بخش می‌توانید به صورت آزاد با هوش مصنوعی گفتگو کنید. نوع مدل هوش مصنوعی را انتخاب کنید و سوالات خود را بپرسید.
				</p>
				<GrokChat />
			</div>
		</div>
	</div>

	<!-- Sidebar -->
	    {#if data?.lasttextPosts || data?.backlinks}
        <Sidebar lasttextPosts={data.lasttextPosts || []} backlinks={data.backlinks || []} />
    {:else}
        <!-- اگر اطلاعات سایدبار در دسترس نباشد، فقط یک div خالی نمایش می‌دهیم -->
        <div class="w-full lg:w-1/3"></div>
    {/if}
</div>
