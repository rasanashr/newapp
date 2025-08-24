<script>
    export let show = false;
    export let title = '';
    
    function closeModal() {
        show = false;
    }
</script>

{#if show}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black opacity-50" on:click={closeModal}></div>
        
        <!-- Modal -->
        <div class="bg-white rounded-lg shadow-xl z-50 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            
            <!-- Content -->
            <div class="px-6 py-4 overflow-y-auto">
                <slot></slot>
            </div>
            
            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-200">
                <slot name="footer">
                    <button
                        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        on:click={closeModal}
                    >
                        بستن
                    </button>
                </slot>
            </div>
        </div>
    </div>
{/if}
