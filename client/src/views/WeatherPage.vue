<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <!-- Header -->
    <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-blue-800">Weather</h1>
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

        <div
          class="absolute inset-0 flex justify-between text-white mb-10 bg-white/20 ml-40 mr-40 mt-10"
        >
          <!-- Left Column: City, Temp, Icon, Time -->
          <div class="ml-10">
            <h2 class="text-6xl font-bold">{{ location }}</h2>
            <div class="flex items-center gap-4 mt-2">
              <span class="text-7xl font-light">{{ weather.temperature }}°</span>
              <span class="text-5xl">{{ weather.icon }}</span>
            </div>
            <p class="mt-2 text-lg">{{ formattedDateTime }}</p>
          </div>

          <!-- Right Column: Details, Forecast, Button -->
          <div class="flex flex-col mt-40 mr-10">
            <!-- Weather details -->
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
                  'rounded-lg p-4 flex flex-col items-center w-20',
                  day.isToday ? 'bg-purple-600 text-white' : 'bg-white/50 text-black'
                ]"
              >
                <span>{{ day.day }}</span>
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
                class="border border-gray-300 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option disabled value="">-- Select Province --</option>
                <option v-for="province in provinces" :key="province" :value="province">
                  {{ province }}
                </option>
              </select>

              <div class="flex justify-end gap-3">
                <button
                  @click="cancelChangeLocation"
                  class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  @click="submitNewLocation"
                  :disabled="!newLocation"
                  class="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "axios";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
const STORAGE_KEY = "weatherAppData";

// State
const location = ref('Phnom Penh');
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
  'Phnom Penh',
  'Siem Reap',
  'Sihanoukville',
  'Battambang',
  'Kampong Cham'
]);
const isLoading = ref(true);
const error = ref(null);
let timer = null;

// Computed
const formattedDateTime = computed(() => {
  return currentDateTime.value.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

const backgroundImageUrl = computed(() => {
  const hour = currentDateTime.value.getHours();
  const isDaytime = hour > 6 && hour < 18;
  return isDaytime 
    ? "url('https://images.unsplash.com/photo-1560258018-c7db7645254e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80')"
    : "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')";
});

// Methods
function getWeatherIcon(iconCode) {
  const iconMap = {
    "01d": "☀️",
    "01n": "🌑",
    "02d": "🌤️",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return iconMap[iconCode] || "❓";
}

async function fetchWeatherData(loc) {
  try {
    // Fetch current weather
    const currentResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(loc)},KH&appid=${API_KEY}&units=metric`
    );
    const currentData = currentResponse.data;

    // Fetch 5-day forecast
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(loc)},KH&appid=${API_KEY}&units=metric`
    );
    const forecastData = forecastResponse.data;

    // Process current weather
    const temperature = Math.round(currentData.main.temp);
    const icon = getWeatherIcon(currentData.weather[0].icon);
    const humidity = currentData.main.humidity;
    const wind = Math.round(currentData.wind.speed * 3.6); // Convert m/s to km/h

    // Precipitation probability from next forecast period
    const nextForecast = forecastData.list[0];
    const precipitation = nextForecast ? Math.round(nextForecast.pop * 100) : 0;

    // Process forecast data
    const forecastDays = processForecastData(forecastData);

    return {
      temperature,
      icon,
      precipitation,
      humidity,
      wind,
      forecast: forecastDays
    };
  } catch (err) {
    console.error("Failed to fetch weather data", err);
    throw new Error(err.response?.data?.message || "Failed to fetch weather data");
  }
}

function processForecastData(forecastData) {
  // Group forecasts by date
  const grouped = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    if (!grouped[dateStr]) {
      grouped[dateStr] = [];
    }
    grouped[dateStr].push(item);
  });

  // Get forecast for next 4 days
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const forecastDays = [];

  for (let i = 0; i < 4; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toLocaleDateString('en-CA');
    
    if (grouped[dateStr] && grouped[dateStr].length > 0) {
      // Find max temperature for the day
      const maxTemp = Math.round(Math.max(...grouped[dateStr].map(item => item.main.temp)));
      forecastDays.push({
        day: days[date.getDay()],
        temp: maxTemp,
        isToday: i === 0
      });
    }
  }

  return forecastDays;
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
      console.warn("Failed to parse saved weather data", e);
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
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

function cancelChangeLocation() {
  showLocationInput.value = false;
  newLocation.value = '';
}

async function submitNewLocation() {
  if (newLocation.value) {
    await updateWeather(newLocation.value);
    showLocationInput.value = false;
    newLocation.value = '';
  }
}

function retryFetchWeather() {
  updateWeather(location.value);
}

// Lifecycle
onMounted(async () => {
  timer = setInterval(() => {
    currentDateTime.value = new Date();
  }, 1000);

  if (!loadFromLocalStorage()) {
    await updateWeather(location.value);
  } else {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
}
</style>