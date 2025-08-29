<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <!-- Header -->
    <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-blue-800">Weather</h1>
      <!-- Back Button -->
    <section>
      <router-link to="/guide" class="text-purple-600 hover:underline">
        <i class="fa-solid fa-arrow-left"></i> {{ $t('BackToGuide') }}
      </router-link>
    </section>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-[550px]">
      <p class="text-xl">Loading weather data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col justify-center items-center h-[550px] p-8">
      <p class="text-xl text-red-600 mb-4">Error: {{ error }}</p>
      <button 
        @click="retryFetchWeather"
        class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
      >
        Retry
      </button>
    </div>

    <!-- Weather Display -->
    <template v-else>
      <section
        class="relative w-full h-[550px] bg-cover bg-center"
        :style="{ backgroundImage: backgroundImageUrl }"
      >
        <div class="absolute inset-0 bg-black/30"></div>

        <div class="absolute inset-0 flex justify-between text-white mb-10 bg-white/20 ml-40 mr-40 mt-10">
          <!-- Left Column -->
          <div class="ml-10">
            <h2 class="text-6xl font-bold">{{ location }}</h2>
            <div class="flex items-center gap-4 mt-2">
              <span class="text-7xl font-light">{{ weather.temperature }}°</span>
              <span class="text-5xl">{{ weather.icon }}</span>
            </div>
            <p class="mt-2 text-lg">
              <span v-if="displayedDay">{{ getFullDayName(displayedDay) }} - {{ formattedDateTime.split(' - ')[1] || formattedDateTime }}</span>
              <span v-else>{{ formattedDateTime }}</span>
            </p>
          </div>

          <!-- Right Column -->
          <div class="flex flex-col mt-40 mr-10">
            <!-- Details -->
            <div class="space-y-1 text-sm flex gap-40">
              <div class="flex flex-col space-y-2">
                <span class="font-bold">PRECIPITATION</span>
                <span class="font-bold">HUMIDITY</span>
                <span class="font-bold">WIND</span>
              </div>
              <div class="flex flex-col space-y-2">
                <p>{{ weather.precipitation }}%</p>
                <p>{{ weather.humidity }}%</p>
                <p>{{ weather.wind }} km/h</p>
              </div>
            </div>

            <!-- Forecast -->
            <div class="mt-6 flex gap-0.5">
              <div
                v-for="day in forecast"
                :key="day.day"
                :class="[
                  'rounded-lg p-4 flex flex-col items-center w-20 cursor-pointer',
                  day.isToday ? '' : '',
                  selectedDay && selectedDay.day === day.day ? 'bg-purple-600 text-white' : 'bg-white/50 text-black'
                ]"
                @click="onDayClick(day)"
              >
                <span>{{ day.day }}</span>
                <!-- ✅ Add this line for the forecast icon -->
                <span class="text-2xl">{{ day.icon }}</span>
                <span class="text-xl font-semibold">{{ day.temp }}°C</span>
              </div>
            </div>

            <!-- Change Location Button -->
            <button
              @click="showLocationInput = true"
              class="mt-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full transition"
            >
              Change Location
            </button>

            <!-- Location Selection Board -->
            <div
              v-if="showLocationInput"
              class="mt-4 p-4 bg-white rounded shadow-md text-black max-w-xs"
            >
              <label class="block mb-2 font-semibold" for="provinceSelect">
                Choose a province:
              </label>
              <select
                id="provinceSelect"
                v-model="newLocation"
                @change="submitNewLocation"
                class="border border-gray-300 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option disabled value="">-- Select Province --</option>
                <option v-for="province in provinces" :key="province" :value="province">
                  {{ province }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { io } from 'socket.io-client';

const STORAGE_KEY = 'weatherAppData';

// State
const route = useRoute();
const location = ref(route.query.province || 'Phnom Penh');

// Watch for province query changes and update weather
watch(() => route.query.province, async (newProvince) => {
  if (newProvince && newProvince !== location.value) {
    location.value = newProvince;
    await updateWeather(newProvince);
  }
});

const weather = ref({
  temperature: null,
  icon: '',
  precipitation: 0,
  humidity: 0,
  wind: 0
});
const forecast = ref([]);
const currentDateTime = ref(new Date());
const showLocationInput = ref(false);
const newLocation = ref('');
const provinces = ref([
  'Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang', 'Kampong Speu',
  'Kampong Thom', 'Kampot', 'Kandal', 'Kep', 'Koh Kong', 'Kratié', 'Mondulkiri',
  'Oddar Meanchey', 'Pailin', 'Phnom Penh', 'Preah Sihanouk', 'Preah Vihear',
  'Pursat', 'Prey Veng', 'Ratanakiri', 'Siem Reap', 'Stung Treng', 'Svay Rieng',
  'Takeo', 'Tbong Khmum'
]);
const isLoading = ref(true);
const error = ref(null);
let timer = null;

// Socket.IO connection
const socket = io('http://localhost:5000');

// Computed
const formattedDateTime = computed(() => {
  return currentDateTime.value.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
});

const backgroundImageUrl = computed(() => {
  const hour = currentDateTime.value.getHours();
  const isDaytime = hour > 6 && hour < 18;
  return isDaytime 
    ? "url('https://images.unsplash.com/photo-1560258018-c7db7645254e?auto=format&fit=crop&w=2089&q=80')"
    : "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=2071&q=80')";
});


// Methods
const selectedDay = ref(null);
const displayedDay = ref('');
function onDayClick(day) {
  selectedDay.value = day;
  weather.value = {
    temperature: day.temp,
    icon: day.icon || '',
    precipitation: day.precipitation !== undefined ? day.precipitation : weather.value.precipitation,
    humidity: day.humidity !== undefined ? day.humidity : weather.value.humidity,
    wind: day.wind !== undefined ? day.wind : weather.value.wind
  };
  displayedDay.value = day.day;
}

async function fetchWeatherData(loc) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/weather?location=${encodeURIComponent(loc)}`
    );
    const data = response.data;
    return {
      temperature: data.weather.temperature,
      icon: data.weather.icon,
      precipitation: data.weather.precipitation,
      humidity: data.weather.humidity,
      wind: data.weather.wind,
      forecast: data.forecast
    };
  } catch (err) {
    console.error('Failed to fetch weather data', err);
    throw new Error(err.response?.data?.error || 'Failed to fetch weather data');
  }
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    location: location.value,
    weather: weather.value,
    forecast: forecast.value
  }));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.location) location.value = parsed.location;
      if (parsed.weather) weather.value = parsed.weather;
      if (parsed.forecast) forecast.value = parsed.forecast;
      return true;
    } catch (e) {
      console.warn('Failed to parse saved weather data', e);
    }
  }
  return false;
}


async function updateWeather(loc) {
  isLoading.value = true;
  error.value = null;
  try {
    const data = await fetchWeatherData(loc);
    weather.value = {
      temperature: data.temperature,
      icon: data.icon,
      precipitation: data.precipitation,
      humidity: data.humidity,
      wind: data.wind,
    };
    forecast.value = data.forecast;
    location.value = loc;
    saveToLocalStorage();
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

function cancelChangeLocation() {
  showLocationInput.value = false;
  newLocation.value = '';
}

async function submitNewLocation() {
  if (newLocation.value && newLocation.value !== location.value) {
    await updateWeather(newLocation.value);
    socket.emit('changeLocation', newLocation.value);
    showLocationInput.value = false;
    newLocation.value = '';
  }
}

function retryFetchWeather() {
  updateWeather(location.value);
}

function getFullDayName(shortDay) {
  const days = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday'
  };
  return days[shortDay] || shortDay;
}

// Lifecycle
onMounted(async () => {
  timer = setInterval(() => {
    currentDateTime.value = new Date();
  }, 1000);

  socket.on('locationUpdate', (data) => {
    location.value = data.location;
    weather.value = data.weather;
    forecast.value = data.forecast;
  });

  // Use province from query if present, otherwise fallback to localStorage/default
  const initialProvince = route.query.province || location.value;
  if (!loadFromLocalStorage()) {
    await updateWeather(initialProvince);
  } else {
    // If localStorage loaded, but query param is present and different, update to query
    if (route.query.province && route.query.province !== location.value) {
      await updateWeather(route.query.province);
    } else {
      isLoading.value = false;
    }
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  socket.disconnect();
});
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>