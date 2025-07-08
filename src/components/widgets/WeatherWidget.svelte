<script lang="ts">
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import jalaliday from 'jalaliday';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(jalaliday);

  let temperature: number | null = null;
  let weatherIcon = '';
  let timeNow = '';
  let dateNow = '';

  const updateTime = () => {
    let now = dayjs().tz('Asia/Tehran').subtract(1, 'day');
    timeNow = dayjs().tz('Asia/Tehran').format('HH:mm:ss');
    dateNow = now.calendar('jalali').locale('fa').format('YYYY/MM/DD');
  };

  const fetchWeather = async () => {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=35.6892&longitude=51.389&current_weather=true'
    );
    const data = await res.json();
    temperature = data.current_weather.temperature;
    weatherIcon = data.current_weather.weathercode;
  };

  onMount(() => {
    fetchWeather();
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(fetchWeather, 10 * 60 * 1000); // هر ۱۰ دقیقه آپدیت هوا
  });

 const weatherIcons: Record<number, string> = {
    0: '☀️',  // آفتابی
    1: '🌤️',  // عمدتاً آفتابی
    2: '⛅',   // نیمه ابری
    3: '☁️',   // ابری
    45: '🌫️',  // مه
    48: '🌫️',  // مه یخ‌زده
    51: '🌦️',  // نم‌نم باران
    53: '🌧️',  // باران متوسط
    55: '🌧️',  // باران شدید
    61: '🌧️',  // باران کم
    63: '🌧️',  // باران متوسط
    65: '🌧️',  // باران شدید
    71: '🌨️',  // برف کم
    73: '🌨️',  // برف متوسط
    75: '🌨️',  // برف شدید
    77: '❄️',   // دانه‌های برف
    80: '🌧️',  // باران رگباری خفیف
    81: '🌧️',  // باران رگباری متوسط
    82: '🌧️',  // باران رگباری شدید
    85: '🌨️',  // برف رگباری خفیف
    86: '🌨️',  // برف رگباری شدید
    95: '⛈️',  // رعد و برق
    96: '⛈️',  // رعد و برق با تگرگ خفیف
    99: '⛈️'   // رعد و برق با تگرگ شدید
  };
</script>

<div class="w-full max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-lg flex flex-col items-center hidden md:flex">
  <div class="text-xl font-semibold mb-2 text-gray-800">
    وضعیت آب‌و‌هوای تهران
  </div>
  <div class="flex items-center text-4xl font-bold text-blue-600">
    {temperature !== null ? `${temperature}°C` : '...'}
    <span class="ml-2 text-3xl">{weatherIcons[weatherIcon] || ''}</span>
  </div>
  <div class="mt-4 text-center text-gray-600">
    <div>تاریخ: {dateNow}</div>
    <div>ساعت: {timeNow}</div>
  </div>
</div>



<!-- نوار موبایلی -->
<div class="md:hidden w-full mt-4">
  <div class=" my-auto px-3  overflow-hidden whitespace-nowrap">
    <div
      class="inline-block animate-marquee text-black"
      style="white-space: nowrap;"
    >
      {#if temperature !== null}
        ☀️ وضعیت آب و هوا: {weatherIcons[weatherIcon]} |
        دما: {temperature} سانتیگراد |
        📆 تاریخ: {dateNow} |
        ⏰ ساعت: {timeNow}
      {:else}
        در حال بارگذاری آب و هوا...
      {/if}
    </div>
  </div>
</div>


<style>
  @keyframes marquee {
    0% {
      transform: translateX(-70%);
    }
    100% {
      transform: translateX(70%);
    }
  }

  .animate-marquee {
    animation: marquee 15s linear infinite;
    display: inline-block;
    padding-left: 100%;
  }
</style>