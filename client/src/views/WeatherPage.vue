<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <!-- Header -->
    <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-blue-800">Weather</h1>
    </header>

    <!-- Hero Section -->
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

          <!-- Location Input Board -->
          <div
            v-if="showLocationInput"
            class="mt-4 p-4 bg-white rounded shadow-md text-black max-w-xs"
          >
            <label class="block mb-2 font-semibold" for="newLocation">
              Enter new location:
            </label>
            <input
              id="newLocation"
              v-model="newLocation"
              type="text"
              placeholder="Type location"
              class="border border-gray-300 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              @keyup.enter="submitNewLocation"
            />
            <div class="flex justify-end gap-3">
              <button
                @click="cancelChangeLocation"
                class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                @click="submitNewLocation"
                class="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const STORAGE_KEY = "weatherAppData";

const location = ref("Siem Reap");
const searchQuery = ref("");
const weather = ref({
  temperature: 16,
  icon: "☁️",
  precipitation: 0,
  humidity: 42,
  wind: 3,
});
const forecast = ref([
  { day: "Tue", temp: 30, isToday: false },
  { day: "Wed", temp: 22, isToday: true },
  { day: "Thu", temp: 6, isToday: false },
  { day: "Fri", temp: 26, isToday: false },
]);
const currentDateTime = ref(new Date());

const formattedDateTime = computed(() => {
  const d = currentDateTime.value;
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "2-digit",
  };
  return d.toLocaleString("en-US", options);
});

const provinceBackgrounds = {
  "siem reap":
    "https://images.unsplash.com/photo-1599283787923-51b965a58b05?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
  "phnom penh":
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
  "kampong cham":
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
  "prey veng":
    "https://images.unsplash.com/photo-1465156799769-72f2a0f59a27?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
  "kampong speu":
    "https://images.unsplash.com/photo-1519181245277-cffeb31da2a2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
  "sihanoukville":
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
};

const backgroundImageUrl = computed(() => {
  const key = location.value.toLowerCase();
  const imageUrl = provinceBackgrounds[key] || provinceBackgrounds["siem reap"];
  return `url('${imageUrl}')`;
});

let timer;
onMounted(() => {
  timer = setInterval(() => {
    currentDateTime.value = new Date();
  }, 1000);

  // Load from localStorage if exists
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.location) location.value = parsed.location;
      if (parsed.weather) weather.value = parsed.weather;
      if (parsed.forecast) forecast.value = parsed.forecast;
    } catch (e) {
      console.warn("Failed to parse saved weather data", e);
    }
  } else {
    // If nothing saved, initialize default weather
    updateWeather(location.value);
  }
});
onUnmounted(() => {
  clearInterval(timer);
});

const showLocationInput = ref(false);
const newLocation = ref("");

function fetchWeatherData(loc) {
  if (loc.toLowerCase() === "phnom penh") {
    return {
      temperature: 32,
      icon: "☀️",
      precipitation: 10,
      humidity: 60,
      wind: 7,
      forecast: [
        { day: "Tue", temp: 33, isToday: false },
        { day: "Wed", temp: 34, isToday: true },
        { day: "Thu", temp: 30, isToday: false },
        { day: "Fri", temp: 31, isToday: false },
      ],
    };
  } else if (loc.toLowerCase() === "siem reap") {
    return {
      temperature: 16,
      icon: "☁️",
      precipitation: 0,
      humidity: 42,
      wind: 3,
      forecast: [
        { day: "Tue", temp: 30, isToday: false },
        { day: "Wed", temp: 22, isToday: true },
        { day: "Thu", temp: 6, isToday: false },
        { day: "Fri", temp: 26, isToday: false },
      ],
    };
  } else {
    return {
      temperature: 25,
      icon: "🌤️",
      precipitation: 5,
      humidity: 50,
      wind: 5,
      forecast: [
        { day: "Tue", temp: 25, isToday: false },
        { day: "Wed", temp: 24, isToday: true },
        { day: "Thu", temp: 23, isToday: false },
        { day: "Fri", temp: 22, isToday: false },
      ],
    };
  }
}

function saveToLocalStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      location: location.value,
      weather: weather.value,
      forecast: forecast.value,
    })
  );
}

function updateWeather(loc) {
  const data = fetchWeatherData(loc);
  weather.value = {
    temperature: data.temperature,
    icon: data.icon,
    precipitation: data.precipitation,
    humidity: data.humidity,
    wind: data.wind,
  };
  forecast.value = data.forecast;
  location.value = loc;

  saveToLocalStorage(); // Save updated data persistently
}

function cancelChangeLocation() {
  showLocationInput.value = false;
  newLocation.value = "";
}

function submitNewLocation() {
  if (newLocation.value.trim() === "") return;
  updateWeather(newLocation.value.trim());
  searchQuery.value = "";
  cancelChangeLocation();
}

function handleSearch() {
  if (searchQuery.value.trim() !== "") {
    updateWeather(searchQuery.value.trim());
  }
}

</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
}
</style>
