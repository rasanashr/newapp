<script>
  import Lasttext from '$components/widgets/Lasttext.svelte'; 
  import BackLinks from '$components/BackLinks.svelte';
  import { goto } from '$app/navigation';

  export let lasttextPosts = [];
   export let backlinks = [];

  let searchQuery = '';

  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      goto(`/search?q=${encodeURIComponent(searchQuery.trim())}`, {
        replaceState: true
      });
    }
  }
</script>

<aside class="w-full lg:w-1/3 space-y-8">
  <!-- Search Form -->
  <div class="bg-white rounded-lg shadow p-4 hidden md:block">
    <form on:submit={handleSearch} class="flex flex-col gap-2">
      <input
        type="search"
        bind:value={searchQuery}
        placeholder="جستجو در مطالب..."
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
      />
      <button
        type="submit"
        class="w-full bg-[#12ed65] text-black px-4 py-2 rounded hover:bg-[#0acb54] transition-colors"
      >
        جستجو
      </button>
    </form>
  </div>

  <div class="bg-[#12ed65] rounded-lg shadow p-3">
    <Lasttext posts={lasttextPosts} />
  </div>


  <div class="bg-violet-50 rounded-lg shadow p-3">
  <BackLinks backlinks={backlinks} loading={false} />
  </div>
</aside>