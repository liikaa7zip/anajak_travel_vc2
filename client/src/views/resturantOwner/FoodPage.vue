<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Hero Section -->
    <div class="relative mb-12 rounded-3xl overflow-hidden shadow-xl">
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80"
        alt="Food Hero"
        class="w-full h-72 object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 class="text-5xl font-extrabold mb-3 drop-shadow-lg">🍽️ Food Menu</h1>
        <p class="text-lg max-w-2xl">Discover delicious meals freshly prepared for you. Choose from our special selections below.</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin h-16 w-16 rounded-full border-t-4 border-purple-600"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 text-lg">
      {{ error }}
    </div>

    <!-- Top 3 Featured Foods -->
    <div v-else-if="foods.length > 0" class="mb-14">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">🔥 Top Picks</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="food in foods.slice(0, 3)"
          :key="'top-'+food.id"
          class="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
        >
          <img :src="food.image" :alt="food.name" class="w-full h-48 object-cover" />
          <div class="p-5 text-center space-y-3">
            <h3 class="text-xl font-bold text-gray-800">{{ food.name }}</h3>
            <p class="text-gray-600 italic">Chef’s special</p>
            <p class="text-lg font-semibold text-purple-700">${{ food.price.toFixed(2) }}</p>
            <button
              @click="buyFood(food)"
              class="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:scale-105 transition flex items-center justify-center gap-2 mx-auto"
            >
              <span>Buy Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18l-1.5 9h-15L3 3z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Food Grid -->
    <div v-if="foods.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="food in foods"
        :key="food.id"
        class="relative group rounded-2xl overflow-hidden shadow-xl transition transform hover:-translate-y-2 hover:shadow-2xl"
      >
        <!-- Gradient border glow -->
        <div class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-70 group-hover:opacity-100 transition"></div>

        <!-- Card Content -->
        <div class="relative bg-white/80 backdrop-blur-md rounded-2xl p-5 flex flex-col h-full">
          <!-- Image -->
          <div class="relative">
            <img
              :src="food.image || 'https://via.placeholder.com/400x250?text=No+Image'"
              :alt="food.name"
              class="w-full h-48 object-cover rounded-xl"
              @error="handleImageError"
            />
            <span
              v-if="food.category"
              class="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
            >
              {{ food.category.name }}
            </span>
            <!-- New/Fresh Badge -->
            <span class="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Fresh
            </span>
          </div>

          <!-- Info -->
          <div class="flex-1 flex flex-col justify-between mt-4 space-y-3">
            <div>
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">{{ food.name }}</h3>
              <p class="text-gray-600 text-sm">Delicious and fresh!</p>
            </div>
            <div>
              <p class="inline-block bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
                ${{ food.price.toFixed(2) }}
              </p>
              <!-- Buy Button -->
              <button
                @click="buyFood(food)"
                class="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-md transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No foods -->
    <div v-else class="flex flex-col items-center justify-center mt-16 text-center text-gray-500">
      <img src="https://placehold.co/200x200?text=No+Food" alt="No food" class="mb-4">
      <p class="text-lg italic">No foods available for this hotel yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const hotelId = route.params.id;

const foods = ref([]);
const loading = ref(false);
const error = ref(null);

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x250?text=No+Image';
};

const fetchFoods = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(`http://localhost:5000/api/foods/by-hotel/${hotelId}`);
    if (res.data.message) {
      foods.value = [];
      error.value = res.data.message;
    } else {
      foods.value = res.data;
    }
  } catch (err) {
    error.value = 'Failed to load foods. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Example Buy function
const buyFood = (food) => {
  alert(`You clicked Buy for "${food.name}" - $${food.price.toFixed(2)}`);
};

onMounted(() => {
  fetchFoods();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
