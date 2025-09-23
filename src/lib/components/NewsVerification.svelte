<script>
    import Modal from '$lib/components/Modal.svelte';
    import * as aiService from '$lib/services/aiService.js';
    
    export let post;

    let questionLoading = false;
    let selectedQuestion = '';
    let remainingQuestions = 2;
    
    let showModal = false;
    let isLoading = false;
    let result = '';
    let modalTitle = '';
    let showAnalyzeButton = false;
    let showQuestionInput = false;
    let userQuestion = '';

    async function handleVerifyNews() {
        modalTitle = 'بررسی اصالت محتوا{کمی صبر کنید}';
        showModal = true;
        isLoading = true;
        questionLoading = false;
        showAnalyzeButton = false;
        
        try {
            const content = post.content.rendered.replace(/<[^>]*>/g, '');
            result = await aiService.verifyNews(post.title.rendered, content);
            showAnalyzeButton = true;
            aiService.resetQuestionCount();
            remainingQuestions = 2;
        } catch (error) {
            result = 'متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.';
        } finally {
            isLoading = false;
        }
    }
    
    async function handleAnalyzeNews() {
        modalTitle = 'تحلیل محتوا';
        isLoading = true;
        questionLoading = false;
        showAnalyzeButton = false;
        
        try {
            const content = post.content.rendered.replace(/<[^>]*>/g, '');
            result = await aiService.analyzeNews(post.title.rendered, content);
        } catch (error) {
            result = 'متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.';
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="flex gap-2 mt-4">
    <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        on:click={handleVerifyNews}
        disabled={isLoading}
    >
        {#if isLoading}
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        {/if}
        بررسی محتوا با هوش مصنوعی
    </button>
</div>

<Modal bind:show={showModal} title={modalTitle}>
    <div class="prose max-w-none">
        {#if isLoading}
            <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        {:else}
            <div class="whitespace-pre-wrap text-justify">
                {#if questionLoading}
                    <div class="flex flex-col items-center justify-center py-8">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p class="text-gray-600">در حال دریافت پاسخ، لطفاً منتظر بمانید...</p>
                    </div>
                {:else if result}
                    {result}
                {/if}
            </div>
        {/if}
    </div>
    
    <svelte:fragment slot="footer">
        <div class="flex flex-col gap-4">
            {#if !isLoading}
                <div class="flex flex-col gap-2">
                    <div class="text-sm text-gray-600 text-left">
                        سوالات باقیمانده: {remainingQuestions}
                    </div>
                    <div class="flex items-center gap-2">
                        <input
                            type="text"
                            bind:value={userQuestion}
                            placeholder="سوال خود را درباره این خبر بپرسید..."
                            class="flex-1 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            disabled={questionLoading || !aiService.canAskMoreQuestions()}
                        />
                        <button
                            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            disabled={questionLoading || !userQuestion.trim()}
                            on:click={async () => {
                                if (userQuestion.trim() && !questionLoading) {
                                    if (!aiService.canAskMoreQuestions()) {
                                        result = 'شما مجاز به پرسیدن بیش از ۲ سوال نیستید.';
                                        return;
                                    }
                                    questionLoading = true;
                                    try {
                                        const content = post.content.rendered.replace(/<[^>]*>/g, '');
                                        result = await aiService.askUserQuestion(userQuestion, post.title.rendered, content);
                                        remainingQuestions--;
                                        userQuestion = '';
                                    } catch (error) {
                                        result = 'متأسفانه در پاسخ به سوال خطایی رخ داد.';
                                    } finally {
                                        questionLoading = false;
                                    }
                                }
                            }}
                        >
                            {#if questionLoading}
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            {/if}
                            {questionLoading ? 'در حال پردازش...' : 'پرسیدن'}
                        </button>
                    </div>
                </div>
            {/if}

            <div class="flex justify-between">
                <button
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    on:click={() => showModal = false}
                >
                    بستن
                </button>
                
                {#if showAnalyzeButton && !isLoading}
                    <button
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        on:click={handleAnalyzeNews}
                    >
                        تحلیل بیشتر محتوا
                    </button>
                {/if}
            </div>
        </div>
    </svelte:fragment>
</Modal>