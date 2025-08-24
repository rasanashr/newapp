<script>
	import { onMount } from 'svelte';
	let messages = [];
	let newMessage = '';
	let isLoading = false;
	let selectedModel = 'x-ai/grok-4';

	const models = [
		{ id: 'x-ai/grok-4', name: 'Grok 4 (پیشرفته)' },
		{ id: 'x-ai/grok-3', name: 'Grok 3' },
		{ id: 'gpt-5-nano', name: 'GPT-5 Nano (سریع)' },
		{ id: 'gpt-5-turbo', name: 'GPT-5 Turbo' },
		{ id: 'gpt-4', name: 'GPT-4 (دقیق)' }
	];

	onMount(() => {
		if (typeof window !== 'undefined' && !window.puter) {
			const script = document.createElement('script');
			script.src = 'https://js.puter.com/v2/';
			script.async = true;
			document.head.appendChild(script);
		}
	});

	async function sendMessage() {
		if (!newMessage.trim()) return;
		const userMessage = newMessage;
		newMessage = '';
		isLoading = true;
		messages = [...messages, { role: 'user', content: userMessage }];
		try {
			if (typeof window === 'undefined' || !window.puter || !window.puter.ai) {
				throw new Error('Puter AI is not available');
			}
			const response = await window.puter.ai.chat(userMessage, {
				model: selectedModel,
				stream: true
			});
			let assistantMessage = '';
			messages = [...messages, { role: 'assistant', content: '', isTyping: true }];
			for await (const part of response) {
				if (part.text) {
					assistantMessage += part.text;
					messages = messages.map((msg, idx) =>
						idx === messages.length - 1 ? { ...msg, content: assistantMessage } : msg
					);
				}
			}
			messages = messages.map(msg => ({ ...msg, isTyping: false }));
		} catch (error) {
			console.error('Chat error:', error);
			messages = [...messages, { role: 'system', content: 'متأسفانه در ارتباط با AI مشکلی پیش آمد. لطفاً دوباره تلاش کنید.' }];
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
	<!-- هدر -->
	<div class="p-4 border-b border-gray-200">
		<div class="flex justify-between items-center">
			<h2 class="text-xl font-bold text-gray-800">گفتگو با هوش مصنوعی</h2>
			<select
				bind:value={selectedModel}
				class="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
			>
				{#each models as model}
					<option value={model.id}>{model.name}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- بخش پیام‌ها -->
	<div class="flex-1 overflow-y-auto p-4 space-y-4" style="height: 500px;">
		{#each messages as message}
			<div class="flex flex-col {message.role === 'user' ? 'items-end' : 'items-start'}">
				<div class="max-w-[80%] rounded-lg p-3 {message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} {message.role === 'system' ? 'bg-red-100 text-red-800' : ''}">
					{#if message.isTyping}
						<div class="flex items-center space-x-2">
							<div class="typing-animation">
								<span class="dot"></span>
								<span class="dot"></span>
								<span class="dot"></span>
							</div>
						</div>
					{:else}
						<p class="whitespace-pre-wrap text-justify">{message.content}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- بخش نوشتن پیام -->
	<div class="p-4 border-t border-gray-200">
		<form 
			on:submit|preventDefault={sendMessage}
			class="flex gap-2"
		>
			<input
				type="text"
				bind:value={newMessage}
				placeholder="پیام خود را بنویسید..."
				class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				disabled={isLoading}
			/>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
				disabled={isLoading || !newMessage.trim()}
			>
				{isLoading ? 'در حال ارسال...' : 'ارسال'}
			</button>
		</form>
	</div>
</div>

<style>
	.typing-animation {
		display: flex;
		gap: 4px;
	}
	.dot {
		width: 8px;
		height: 8px;
		background-color: #4B5563;
		border-radius: 50%;
		animation: typing 1s infinite;
		opacity: 0.3;
	}
	.dot:nth-child(2) { animation-delay: 0.2s; }
	.dot:nth-child(3) { animation-delay: 0.4s; }
	@keyframes typing {
		50% { opacity: 1; }
	}
</style>
