<script>
    import { onMount } from 'svelte';
    
    let visible = false;
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    function handleScroll() {
        // نمایش دکمه بعد از 300 پیکسل اسکرول
        visible = window.scrollY > 300;
    }
    
    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

{#if visible}
    <button
        on:click={scrollToTop}
        class="fixed bottom-15 left-12 btn btn-circle btn-primary shadow-lg opacity-80 bg-red-500  hover:opacity-100 transition-all duration-300 z-50"
        aria-label="برگشت به بالای صفحه"
        style="animation: fadeIn 0.3s ease-in-out"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M12.955.893a1.35 1.35 0 0 0-1.91 0L.894 11.045a1.35 1.35 0 0 0 0 1.91l10.151 10.15a1.35 1.35 0 0 0 1.91 0l10.151-10.15a1.35 1.35 0 0 0 0-1.91zM12.53 6.47a.75.75 0 0 0-1.071.01l-4 4.167a.75.75 0 1 0 1.082 1.04l2.709-2.823V16a.75.75 0 0 0 1.5 0V8.81l2.72 2.72a.75.75 0 1 0 1.06-1.06z" clip-rule="evenodd"/></svg>
    </button>
{/if}

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 0.8;
            transform: translateY(0);
        }
    }
</style>
