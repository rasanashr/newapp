<script>
  import { onMount } from 'svelte';

  let deferredPrompt;
  let showInstallPrompt = false;

  onMount(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      showInstallPrompt = true;
    });
  });

  async function installApp() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showInstallPrompt = false;
    }
    deferredPrompt = null;
  }

  function closePrompt() {
    showInstallPrompt = false;
  }
</script>

{#if showInstallPrompt}
  <div class="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center justify-between">
    <div>
      <h3 class="font-bold">نصب اپلیکیشن رسا نشر</h3>
      <p class="text-sm text-gray-600">برای دسترسی سریع‌تر، اپلیکیشن را نصب کنید</p>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary btn-sm" on:click={installApp}>نصب آسان</button>
      <button class="btn btn-ghost btn-sm" on:click={closePrompt}>بعداً</button>
    </div>
  </div>
{/if}
