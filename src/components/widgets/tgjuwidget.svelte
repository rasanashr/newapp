<!-- src/lib/TgjuWidget.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';

    onMount(() => {
        // چک کنیم که آیا ما در محیط مرورگار هستیم
        if (typeof window === 'undefined') return;

        // اگر اسکریپت قبلاً لود شده بود، دوباره اضافه نکن
        if (!document.getElementById('tgju-script')) {
            const script = document.createElement('script');
            script.id = 'tgju-script';
            script.src = 'https://api.tgju.org/v1/widget/v2 ';
            script.defer = true;
            document.head.appendChild(script);
        }

        // اطمینان از وجود المان <tgju> در DOM
        const container = document.getElementById('tgju-container');
        if (container && !container.querySelector('tgju')) {
            const tgjuElement = document.createElement('tgju') as HTMLElement;
            tgjuElement.setAttribute('type', 'ticker-tap');
            tgjuElement.setAttribute(
                'items',
                '137121,391295,137138,137137,137139,137140,137141,137203,137205'
            );
            tgjuElement.setAttribute('columns', 'dot');
            tgjuElement.setAttribute('speed', '90');
            tgjuElement.setAttribute('token', 'webservice');
            tgjuElement.setAttribute(
                'styles',
                JSON.stringify({
                    dot: '#f50000',
                    low: '#cf0a00',
                    high: '#04d600'
                })
            );

            container.appendChild(tgjuElement);
        }
    });
</script>
<div  class="tex-black" >
<div id="tgju-container"></div>
</div>