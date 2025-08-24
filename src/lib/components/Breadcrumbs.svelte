<script>
  export let items = []; // expected format: [{ name: string, href: string }]
  export let postTitle = '';
</script>

<nav aria-label="Breadcrumb" class="text-sm text-gray-500 mb-2">
  <ol class="flex items-center space-x-2 rtl:space-x-reverse">
    <li>
      <a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">خانه</a>
    </li>
    {#each items as item}
      <li>
        <span class="text-gray-400 dark:text-gray-600">/</span>
        <a href={item.href} class="ml-2 hover:text-gray-700 dark:hover:text-gray-300">{item.name}</a>
      </li>
    {/each}
    {#if postTitle}
      <li>
        <span class="text-gray-400 dark:text-gray-600">/</span>
        <span class="ml-2 text-gray-700 dark:text-gray-400" aria-current="page">{postTitle}</span>
      </li>
    {/if}
  </ol>
</nav>
