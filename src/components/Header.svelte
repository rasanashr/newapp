<script>
    export let mojavez = '/duc.png'; // Replace with your logo URL
    export let mlogo = '/logo.svg'; 
    export let logoUrl = 'https://rooidadha.ir/wp-content/uploads/2023/04/1402logo.png'; // Replace with your logo URL
    import WeatherWidget from '$components/widgets/WeatherWidget.svelte';
    import MobileMenu from '$components/MobileMenu.svelte';
    let menuOpen = false;
   </script>

<header>
  <div class="w-full bg-[#f40000] flex flex-col items-center pt-4 pb-0 hidden md:flex">    
    <div class="w-full flex flex-row justify-between items-start px-0">
        <div class=" w-[25px] h-[176px] mt-2 ml-[10vw]"></div>
      <!-- Left Box -->
      <div class="bg-white rounded-lg w-[250px] h-[176px] mt-2 ml-[10vw]"><img src={mojavez} alt="پایگاه خبری رسا نشر" class=" w-[250px] h-[176px]  select-none" draggable="false" /></div>
      <!-- Logo -->
      <div class="flex flex-col items-center justify-center">
        <a href="/" aria-label="صفحه اصلی رسا نشر"><img src={logoUrl} alt="لوگو رسا نشر" class="h-[120px] mt-2 select-none" draggable="false" /></a>
      </div>
      <!-- Right Box -->
      <div class="bg-white rounded-lg w-[250px] h-[176px] mt-2 mr-[10vw]"><WeatherWidget /></div>
            <div class=" w-[25px] h-[176px] mt-2 ml-[10vw]"></div>
  
    </div>
    <!-- Navigation Bar -->
    <div class="w-[95%] flex flex-row items-center justify-center mt-4 mb-2">
      <div class="w-full flex flex-row items-center justify-center bg-[#f7f0f0] rounded-full py-2">
              <div class="flex-1 text-center  text-l font-bold">
                <a href="/" aria-label="صفحه اصلی"><span  class="text-black px-2">خانه</span></a><span class="text-lime-300">|</span>
                <a href="/category/اجتماعی/" aria-label="اخبار اجتماعی"><span  class="text-black px-2">اجتماعی</span></a>  <span class="text-lime-300">|</span>
                <a href="/category/سیاسی/" aria-label="اخبار سیاسی"><span  class="text-black px-2">سیاسی</span></a><span class="text-lime-300">|</span>
                <a href="/category/فرهنگ-و-هنر/" aria-label="اخبار فرهنگی"><span  class="text-black px-2">فرهنگ و هنر</span></a><span class="text-lime-300">|</span>
                <a href="/category/اخبار-هوش-مصنوعی/" aria-label="خبرهای هوش مصنوعی"><span  class="text-black px-2">هوش مصنوعی</span></a><span class="text-lime-300">|</span>
                <a href="/category/فیلم-و-سینما/" aria-label="اخبار سینما"><span class="text-black px-2">سینما</span></a>

              </div>
        <!-- Center Live Icon -->
        <div class="flex items-center justify-center m-auto">
          <div class="rounded-full bg-[#39e600] border-4 border-white flex items-center justify-center w-15 h-15 -mt-8 z-10">
            <a href="/categories" aria-label="همه دسته بندی ها"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#fff" d="M20.023 17.484c-1.732-.205-3.022-.908-4.212-1.7l-.558.278l-2.578 8.924c1.217.805 2.905 1.707 4.682 1.914c2.686.312 5.56-.744 6.39-1.195l2.618-9.06l-.56-.28s-2.61 1.492-5.78 1.12zm-5.6-2.66c-1.266-.87-2.577-1.65-4.374-1.815a10 10 0 0 0-.926-.043c-3.01 0-4.948 1.347-4.948 1.347L1.61 23.19l.527.282a10.1 10.1 0 0 1 5.09-.984c1.665.113 2.92.78 4.117 1.53l.507-.26l2.574-8.933zm-4.222-2.73c1.665.114 2.922.78 4.118 1.533l.51-.26L17.4 4.43c-1.27-.87-2.58-1.652-4.377-1.815a10 10 0 0 0-.924-.042c-3.012 0-4.95 1.347-4.95 1.347l-2.566 8.878l.526.282a10.1 10.1 0 0 1 5.09-.986zM28.78 5.97c0 .002-2.61 1.493-5.78 1.12c-1.734-.204-3.023-.907-4.213-1.7l-.56.28l-2.576 8.923c1.216.803 2.907 1.71 4.68 1.915c2.688.312 5.56-.745 6.393-1.197l2.615-9.058l-.56-.28z"/></svg></a>
          </div>
        </div>
        <div class="flex-1 text-center text-l font-bold">
          <a href="/category/اقتصادی/" aria-label="اخبار اقتصادی"><span  class="text-black px-2">اقتصادی</span></a><span class="text-lime-300">|</span>
          <a href="/category/ورزشی" aria-label="اخبار ورزشی"><span  class="text-black px-2">ورزشی</span></a>  <span class="text-lime-300">|</span>
          <a href="/category/lifestyle/" aria-label="سبک زندگی"><span class="text-black px-2">سبک زندگی</span></a><span class="text-lime-300">|</span>
          <a href="/category/فناوری_اطلاعات" aria-label="تازه های فناوری"><span class="text-black px-2">فناوری</span></a><span class="text-lime-300">|</span>
          <a href="/category/بین-الملل/" aria-label="اخبار بین الملل"><span class="text-black px-2">بین الملل</span></a><span class="text-lime-300">|</span>
          <a href="/category/چندرسانه-ای/" aria-label="عکس و فیلم"><span class="text-black px-2">چند رسانه ای</span></a>
        </div>
      </div>
    </div>
  </div>
  </header>

  
  
 
  

<!-- Container -->
<div class="lg:hidden relative">

  <!-- کادر قرمز بالایی -->
  <div class="bg-red-600 h-14 flex items-center justify-center shadow-sm relative z-0">
    <!-- فقط برای زمینه قرمز -->
  </div>

  <!-- کادر طوسی پایینی -->
  <div class="bg-gray-300 h-10 pb-3 flex items-center justify-center z-0">
    <div class="md:hidden"><WeatherWidget /></div>
  </div>

  <!-- دایره سفید -->
  <div class="absolute inset-x-0 top-3 flex items-center justify-center z-10">
    <div class="w-24 h-24 rounded-full bg-white border-2 border-red-600 flex items-center justify-center">
      <a href="/" aria-label="صفحه اصلی رسا نشر">
        <img src={mlogo} alt="لوگو رسا نشر" class="h-20 select-none animate-pulse " draggable="false" />
      </a>
    </div>
  </div>

  <!-- دکمه منو (سه خط) -->
  <div class="absolute right-4 top-4 z-20">
    <button
      class="btn btn-ghost btn-circle text-white"
      on:click={() => menuOpen = true}
      aria-label="باز کردن منوی اصلی"
    >
      <!-- SVG همبرگر -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  </div>

</div>

<!-- منوی همبرگر -->
<MobileMenu open={menuOpen} onClose={() => menuOpen = false} />