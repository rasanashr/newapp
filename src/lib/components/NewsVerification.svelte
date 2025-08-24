<script>
    import Modal from '$lib/components/Modal.svelte';
    import { onMount } from 'svelte';
    
    export let post;
    
    onMount(() => {
        // بررسی وجود اسکریپت Puter
        if (typeof window !== 'undefined' && !window.puter) {
            console.log('Loading Puter script...');
            const script = document.createElement('script');
            script.src = 'https://js.puter.com/v2/';
            script.async = true;
            document.head.appendChild(script);
            
            script.onload = () => {
                console.log('Puter script loaded successfully');
            };
            
            script.onerror = () => {
                console.error('Failed to load Puter script');
            };
        }
    });

    let questionLoading = false; // برای لودینگ دکمه پرسیدن
    let selectedQuestion = ''; // برای نگهداری سوال انتخاب شده از لینک‌ها
    
    let showModal = false;
    let isLoading = false;
    let result = '';
    let modalTitle = '';
    let showAnalyzeButton = false;
    let showQuestionInput = false;
    let userQuestion = '';

    async function callPuterAI(prompt, type) {
        console.log('Starting callPuterAI with type:', type);
        
        // اطمینان از اینکه puter در دسترس است
        if (typeof window === 'undefined' || !window.puter || !window.puter.ai) {
            console.error('Puter AI is not available');
            throw new Error('Puter AI is not available');
        }

        try {
            console.log('Calling puter.ai.chat with Grok...');
            
            // تنظیمات Grok
            const chatConfig = {
                model: 'x-ai/grok-4',
                stream: true
            };

            // @ts-ignore
            const response = await window.puter.ai.chat(prompt, chatConfig);
            
            let fullResponse = '';
            // دریافت پاسخ به صورت stream
            for await (const part of response) {
                if (part.text) {
                    fullResponse += part.text;
                    // بروزرسانی تدریجی نتیجه در رابط کاربری
                    result = fullResponse;
                }
            }
            
            console.log('Final response:', fullResponse);
            return fullResponse;
        } catch (error) {
            console.error(`Error in ${type}:`, error);
            throw error;
        }
    }
    
    async function handleVerifyNews() {
        modalTitle = 'بررسی اصالت محتوا{کمی صبر کنید}';
        showModal = true;
        isLoading = true;
        questionLoading = false;
        showAnalyzeButton = false;
        
        try {
            const content = post.content.rendered.replace(/<[^>]*>/g, ''); // حذف HTML tags
            const prompt = `
خب، فرض کن خبرنگار و محقق حرفه‌ای و دقیقی هستی که به بررسی اصالت و اعتبار اخبار و مطالب عادت داری. 
من یه خبر یا یک مطلب بهت می‌دم که در تاریخ ${new Date().toLocaleDateString('fa-IR')} منتشر شده. لطفاً با دقت تحلیلش کن و به زبان ساده، شفاف و خودمونی جواب بده.

نکته مهم: اگر اطلاعات تو درباره وقایع و شخصیت‌های این خبر مربوط به قبل از تاریخ انتشار خبر هست، حتماً اشاره کن و بگو "با توجه به اینکه احتمالا اطلاعات من برای قبل از انتشار این محتوا، نمی‌تونم درباره وقایع اخیر نظر قطعی بدم."

خبر یا مقاله زیر رو بررسی کن و به این موارد توجه کن:

1. **اول اینکه بررسی کن و بگو این مطلب یک خبر یا گزارش هست و یا یک مقاله؟**
1. **آیا این خبر یا محتوا از نظر ساختار، زبان و سبک، شبیه یه خبر واقعی یا یک مطلب  حرفه‌ای هست یا بیشتر شبیه یه مطلب تبلیغاتی، احساسی یا جعلی؟**
2. ** آیا نام افراد، سازمان‌ها، شهرها یا رویدادهای ذکر شده، واقعی و معروف هستند؟ آیا استفاده از نام‌ها منطقی به نظر می‌رسه؟ اگر اطلاعاتی از این موارد داری به طور خلاصه بگو**
3. **آیا تاریخ یا زمان اتفاق، با واقعیت همخوانی داره؟ (مثلاً اگر گفته "دیروز" ولی تاریخ امروز با مطلب فاصله داره، اشاره کن)**
4. **آیا ادعاهای خبر یا محتوا بیش از حد حساس، شوکه‌کننده یا غیرمنطقی هستند؟ (مثل "رئیس جمهور فرار کرد" بدون منبع)**
5. **آیا منبع یا مصاحبه‌شونده مشخص و قابل‌اعتماد به نظر می‌رسه؟**
6. **آیا می‌تونی شباهتی با رویدادهای مشابه قبلی پیدا کنی؟ (با توجه به دانش تو تا 2024)**
7. **آیا این خبر احتمالاً قدیمیه ولی دوباره منتشر شده؟ (تله‌تازی)**
8. **در نهایت اگر نتونستی دلیل محکمی بر جعلی بودن مطلب ارائه بدی  اشاره کن که با توجه به اینکه پایگاه خبری رسا نشر یک رسانه دارای مجوز رسمی هست، احتمال اینکه این مطلب نادرست باشه کمه**

در آخر جمع‌بندی کن و با یکی از این علامت‌ها نظرت رو اعلام کن:
- 🔎 **احتمالاً واقعی هست** (اگر همه چیز منطقی بود و اطلاعاتت به روز هست)
- ⚠️ **نیاز به بررسی بیشتر داره** (اگر تناقض یا ابهام داشت)
- ❌ **احتمالاً جعلی یا گمراه‌کننده هست** (اگر علائم تقلب داشت)
- 📅 **نیاز به اطلاعات به‌روزتر دارم** (اگر خبر مربوط به بعد از 2024 هست و نمی‌تونی نظر قطعی بدی)

نکته مهم: اگر نتونی چیزی پیدا کنی، نگو "نمی‌دونم"، بلکه بگو بر اساس اطلاعات موجود، چه نتیجه‌ای می‌شه گرفت.

خبر:
عنوان: ${post.title.rendered}
متن: ${content}

جوابت رو خیلی خودمونی، کوتاه (حداکثر 4-5 خط)، ولی پر از نکته بنویس. 
در انتها هم یه دکمه مثل "🔍 تحلیل بیشتر محتوا" اضافه کن (این رو توی HTML سایت خودت اضافه می‌کنی، نیازی به نوشتن این قسمت در خروجی نیست).
`;

            
            result = await callPuterAI(prompt, 'verify');
            showAnalyzeButton = true;
        } catch (error) {
            result = 'متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.';
        } finally {
            isLoading = false;
        }
    }
    
    async function handleAnalyzeNews() {
        modalTitle = 'تحلیل این محتوا با هوش مصنوعی GROK';
        isLoading = true;
        questionLoading = false;
        showAnalyzeButton = false;
        
        try {
            const content = post.content.rendered.replace(/<[^>]*>/g, ''); // حذف HTML tags
            const deepPrompt = `
خب، فرض کن یه تحلیلگر حرفه‌ای و دقیق هستی که سال‌هاست داره روندهای رسانه‌ای و خبری رو رصد می‌کنه. 
یه خبر یا حتی یک مطلب غیر خبری بهت داده شده و می‌خوای یه تحلیل عمیق، هوشمندانه و بدون تعارف ازش ارائه بدی.

خبر:
عنوان: ${post.title.rendered}
متن: ${content}

لطفاً یه تحلیل منسجم و طبیعی بنویس که شامل این موارد بشه:

1. **چه چیزی در این خبر واقعاً مهم یا غیرمعمول هست؟** (نکته برجسته یا نقطه عطف)
2. **این خبر چه پیامدهایی می‌تونه داشته باشه؟** (سیاسی، اجتماعی، اقتصادی، فرهنگِ، ورزشی (بر اساس استنباطی که از محتوا می گیری) — نه لیست، بلکه توضیح منطقی)
3. **آیا این خبر یا نوشته، مشابه هم داره؟** (مثلاً یک مقاله علمی، یا یک خبر مشابه در رابطه با همین موضوع؟)
4. **چه سوالاتی از این خبر پیش میاد که رسانه نپرسیده؟** (3 سوال هوشمندانه و مهم — در هر زمینه ای که مرتبطه - سیاسی، اجتماعی، اقتصادی و ....)

لحن تحلیل رو حرفه‌ای، ولی قابل فهم و کمی تیزبینانه نگه دار — مثل یه مقاله تحلیلی خوب تو یه روزنامه معتبر.
طولش زیاد نباشه (حدود 6-7 خط)، ولی پر از محتوا باشه.

در انتها هم یه دعوت به تعامل بنویس، مثلاً:
"اگر دوست داری بیشتر در مورد [یکی از جنبه‌های تحلیل] بحث کنیم، فقط بگو — می‌تونم بیشتر توضیح بدم و ازش بخواه که سوالی اگر داره بپرسه."
`;
            
            result = await callPuterAI(deepPrompt, 'analyze');
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
                    {#if result && typeof result === 'string' && result.includes('سوالات مهم برای بحث بیشتر')}
                        {#each result.split('\n') as line}
                            {#if line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')}
                                <p>
                                    <button 
                                        class="text-blue-600 hover:text-blue-800 hover:underline text-right"
                                        on:click={() => {
                                            const question = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
                                            questionLoading = true;
                                            callPuterAI(`در مورد این خبر: ${post.title.rendered}\n\nاین سوال مطرح شده: ${question}`, 'question')
                                                .then(response => {
                                                    result = response;
                                                })
                                                .finally(() => {
                                                    questionLoading = false;
                                                });
                                        }}
                                    >
                                        {line}
                                    </button>
                                </p>
                            {:else}
                                <p>{line}</p>
                            {/if}
                        {/each}
                    {:else}
                        {result}
                    {/if}
                {/if}
            </div>
        {/if}
    </div>
    
    <svelte:fragment slot="footer">
        <div class="flex flex-col gap-4">
            {#if !isLoading}
                <div class="flex items-center gap-2">
                    <input
                        type="text"
                        bind:value={userQuestion}
                        placeholder="سوال خود را درباره این خبر بپرسید..."
                        class="flex-1 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        disabled={questionLoading}
                    />
                    <button
                        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        disabled={questionLoading || !userQuestion.trim()}
                        on:click={() => {
                            if (userQuestion.trim() && !questionLoading) {
                                questionLoading = true;
                                callPuterAI(`در مورد این خبر: ${post.title.rendered}\n\nاین سوال مطرح شده: ${userQuestion}`, 'question')
                                .then(response => {
                                    result = response;
                                    userQuestion = '';
                                })
                                .finally(() => {
                                    questionLoading = false;
                                });
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
