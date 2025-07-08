<script>
    import { onMount } from 'svelte';
    import { fetchComments, submitComment, formatCommentDate } from '$lib/services/wordpress';

    export let postId;
    let comments = [];
    let isLoading = true;
    let showCommentForm = false;
    let formData = { author_name: '', author_email: '', content: '' };
    let submitError = '';
    let submitSuccess = false;

    onMount(async () => {
        await loadComments();
    });

    async function loadComments() {
        isLoading = true;
        comments = await fetchComments(postId);
        isLoading = false;
    }

    async function handleSubmit() {
        submitError = '';
        submitSuccess = false;

        // Only require content field
        if (!formData.content) {
            submitError = 'لطفاً متن نظر را وارد کنید';
            return;
        }

        try {
            await submitComment(postId, formData);
            submitSuccess = true;
            // نمایش پیام موفقیت و بستن پنجره بعد از ۳ ثانیه
            setTimeout(() => {
                showCommentForm = false;
                submitSuccess = false;
            }, 3000);
            formData = { author_name: '', author_email: '', content: '' };
            await loadComments();
        } catch (error) {
            submitError = 'خطا در ثبت نظر. لطفاً دوباره تلاش کنید';
        }
    }
</script>

<div class="comments-section mt-8 bg-white rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h4 class="text-xl text-black font-bold">نظرات ({comments.length})</h4>
        <button
            on:click={() => showCommentForm = true}
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
            نوشتن نظر
        </button>
    </div>

    {#if isLoading}
        <div class="text-center py-4">
            <p>در حال بارگذاری نظرات...</p>
        </div>
    {:else if comments.length === 0}
        <div class="text-center py-4 text-gray-600">
            <p>هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهید!</p>
        </div>
    {:else}
        <div class="space-y-6">
            {#each comments as comment}
                <div class="border-b pb-4 last:border-b-0">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <span class="font-bold">{comment.author_name}</span>
                            <span class="text-gray-500 text-sm mr-2">{formatCommentDate(comment.date)}</span>
                        </div>
                    </div>
                    <div class="text-gray-700 leading-relaxed">
                        {@html comment.content.rendered}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

{#if showCommentForm}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 class="text-xl text-black font-bold mb-4">ثبت نظر جدید</h3>
            
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label for="name" class="block text-gray-700 mb-1">نام*</label>
                    <input
                        type="text"
                        id="name"
                        bind:value={formData.author_name}
                        class="w-full p-2 border rounded-lg text-red-500"
                        required
                    />
                </div>

                <div>
                    <label for="email" class="block text-gray-700 mb-1">ایمیل*</label>
                    <input
                        type="email"
                        id="email"
                        bind:value={formData.author_email}
                        class="w-full p-2 border rounded-lg text-red-500"
                        required
                    />
                </div>

                <div>
                    <label for="comment" class="block text-gray-700 mb-1">نظر*</label>
                    <textarea
                        id="comment"
                        bind:value={formData.content}
                        class="w-full p-2 border rounded-lg h-32 text-red-500"
                        required
                    ></textarea>
                </div>

                {#if submitError}
                    <p class="text-red-500">{submitError}</p>
                {/if}

                {#if submitSuccess}
                    <p class="text-green-500">نظر شما با موفقیت ثبت شده
<br> است! پس از تایید مدیر سایت نمایش داده خواهد شد.

                        </p>
                {/if}

                <div class="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        on:click={() => showCommentForm = false}
                        class="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        انصراف
                    </button>
                    <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        ارسال نظر
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
