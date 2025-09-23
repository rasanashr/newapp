<script>
  export let items = [];
  export let postTitle = '';
</script>

<nav aria-label="Breadcrumb" class="text-sm text-gray-500 mb-2">
  <ol class="flex flex-wrap items-center gap-1 sm:gap-2 rtl:space-x-reverse">
    <li>
      <a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">خانه</a>
    </li>
    {#each items as item}
      <li class="flex items-center">
        <span class="text-gray-400 dark:text-gray-600">/</span>
        <a 
          href={item.href} 
          class="ml-2 hover:text-gray-700 dark:hover:text-gray-300 max-w-[120px] sm:max-w-none whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {item.name}
        </a>
      </li>
    {/each}
    {#if postTitle}
      <li class="flex items-center">
        <span class="text-gray-400 dark:text-gray-600">/</span>
        <span 
          class="ml-2 text-gray-700 dark:text-gray-400 max-w-[120px] sm:max-w-none whitespace-nowrap overflow-hidden text-ellipsis"
          aria-current="page"
        >
           {postTitle}
        </span>
      </li>
    {/if}
  </ol>
</nav>