<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let message = 'نسخه جدیدتری از وب‌سایت منتشر شده است. لطفا صفحه را تازه کنید.';

  const show = writable(false);

  let registration;

  // Listen for update event from service worker
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NEW_CONTENT_AVAILABLE') {
          show.set(true);
        }
      });
    }
  });

  async function refreshAndClearCache() {
    // Unregister all service workers and delete all caches
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) await reg.unregister();
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      for (const key of keys) await caches.delete(key);
    }
    // Reload to homepage
    window.location.href = '/';
  }
</script>

{#if $show}
  <div class="fixed bottom-4 left-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg p-4 flex items-center justify-between z-50">
    <div>
      <h3 class="font-bold text-yellow-800">بروزرسانی جدید!</h3>
      <p class="text-sm text-yellow-700">{message}</p>
    </div>
    <button class="btn btn-warning btn-sm ml-4" on:click={refreshAndClearCache}>
      تازه‌سازی
    </button>
  </div>
{/if}
