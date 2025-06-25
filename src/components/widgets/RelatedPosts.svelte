<script lang="ts">
  export let relatedPosts: any[] = [];
</script>


{#if relatedPosts?.length > 0}
  <div class="my-8">
    <!-- عنوان با نوار عمودی -->
    <div class="flex items-center gap-2 mb-4">
      <div class="w-1 h-6 bg-red-600 rounded-full"></div>
      <h3 class="text-lg font-bold">مطالب مرتبط</h3>
    </div>

    <div class="space-y-2">
      {#each relatedPosts.slice(0, 3) as post}
        <a 
          href={`/${post.id}/${post.slug}`}
          class="block p-3 bg-red-50 hover:bg-red-100 transition-colors rounded-lg border-r-4 border-red-500"
        >
          <h4 class="font-medium text-gray-800 line-clamp-1">
            {@html post.title.rendered}
          </h4>
        </a>
      {/each}
    </div>
  </div>
{/if}