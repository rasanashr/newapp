<script>
  export let currentPage = 1;
  export let totalPages = 1;
  export let onPageChange = (page) => {};

  let pages = [];
  
  $: {
    pages = [];
    const maxVisiblePages = 3; // تغییر از 5 به 3
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    // اضافه کردن صفحه اول
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }
    
    // اضافه کردن صفحات میانی
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // اضافه کردن صفحه آخر
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
  }

  function handlePageClick(page) {
    if (typeof page === 'number' && page !== currentPage) {
      // اجرای اسکرول به بالای صفحه قبل از تغییر صفحه
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // تغییر صفحه بعد از مکث کوتاه
      setTimeout(() => {
        onPageChange(page);
      }, 300);
    }
  }
</script>

<div class="flex justify-center mt-8">
  <div class="join rtl">
    <!-- دکمه قبلی -->
    <button 
      class="join-item btn {currentPage === 1 ? 'btn-disabled' : ''}" 
      on:click={() => handlePageClick(currentPage - 1)}
      aria-label="دکمه صفحه قبلی"
      disabled={currentPage === 1}
    >
      قبلی
    </button>

    <!-- شماره صفحات -->
    {#each pages as page}
      {#if page === '...'}
        <button class="join-item btn btn-disabled">...</button>
      {:else}
        <button 
          class="join-item btn {page === currentPage ? 'btn-primary' : ''}"
          on:click={() => handlePageClick(page)}
          aria-label="دکمه صفحه {page}"
        >
          {page}
        </button>
      {/if}
    {/each}

    <!-- دکمه بعدی -->
    <button 
      class="join-item btn {currentPage === totalPages ? 'btn-disabled' : ''}"
      on:click={() => handlePageClick(currentPage + 1)}
      aria-label="دکمه صفحه بعدی"
      disabled={currentPage === totalPages}
    >
      بعدی
    </button>
  </div>
</div>