<script>
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly, fade } from 'svelte/transition';

	export let open = false;
	export let onClose = () => {};

	const categories = getContext('categories') || writable([]);

	// رنگ‌های پاستیلی
	const pastelColors = [
		'bg-[#ffe5ec]', // صورتی روشن
		'bg-[#e0f7fa]' // آبی روشن
	];

	// بستن منو بعد از کلیک روی لینک
	function handleLinkClick() {
		onClose();
	}
</script>

{#if open}
	<div class="fixed inset-0 z-40" transition:fade>
		<!-- بک‌دراپ -->
		<button
			type="button"
			class="absolute inset-0 bg-black bg-opacity-40 cursor-pointer"
			aria-label="بستن منو"
			tabindex="0"
			on:click={onClose}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') onClose();
			}}
			style="border:none;outline:none;padding:0;margin:0;"
		></button>
		<!-- منوی اصلی -->
		<nav
			class="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 flex flex-col"
			transition:fly={{ x: 300, duration: 400, delay: 50, opacity: 0.7 }}
		>
			<div class="flex items-center justify-between p-4 border-b">
				<span class="font-bold text-lg flex items-center gap-2 text-red-600">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
						><path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round" /></svg
					>
					منو
				</span>
				<button class="btn btn-sm btn-ghost" on:click={onClose} aria-label="بستن">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="flex-1 overflow-y-auto px-4 py-2">
				<ul class="space-y-2">
					<li transition:fade={{ delay: 200, duration: 400 }}>
						<a
							href="/"
							class="flex items-center gap-2 text-red-600 transition-colors duration-200 rounded-lg px-3 py-2 block hover:bg-black hover:text-white"
							on:click={handleLinkClick}
							aria-label="لینک صفحه اصلی"
						>
							<svg
								class="w-5 h-5"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								><path
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/></svg
							>
							خانه
						</a>
					</li>
					<li transition:fade={{ delay: 300, duration: 400 }}>
						<span class="block py-2 font-bold text-gray-700 flex items-center gap-2">
							<svg
								class="w-5 h-5 text-red-500"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"
								/></svg
							>
							دسته‌بندی‌ها
						</span>
						<ul class="pl-2 space-y-1">
							{#each $categories as cat, i}
								<li transition:fade={{ delay: 350 + i * 50, duration: 300 }}>
									<a
										href={`/category/${cat.slug}`}
										class="{pastelColors[
											i % 2
										]} transition-colors duration-200 rounded-lg px-3 py-2 block text-gray-800 hover:bg-black hover:text-white"
										on:click={handleLinkClick}
										aria-label="لینک دسته بندی"
									>
										{cat.name}
									</a>
								</li>
							{/each}
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</div>
{/if}
