<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Header -->
    <h1 class="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-lg shadow-lg">
      🍽️ Food Menu
    </h1>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin h-16 w-16 rounded-full border-t-4 border-purple-600"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 text-lg">
      {{ error }}
    </div>

    <!-- Food Grid -->
    <div v-else>
      <div v-if="foods.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="food in foods"
          :key="food.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
        >
          <!-- Image -->
          <div class="relative">
            <img
              :src="food.image || 'https://via.placeholder.com/400x250?text=No+Image'"
              :alt="food.name"
              class="w-full h-48 object-cover"
              @error="handleImageError"
            />
            <span
              v-if="food.category"
              class="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
            >
              {{ food.category.name }}
            </span>
          </div>

          <!-- Info -->
          <div class="p-5 space-y-3">
            <h3 class="text-xl font-bold text-gray-800">{{ food.name }}</h3>
            <p class="text-gray-600">Delicious and fresh!</p>
            <p class="inline-block bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
              ${{ food.price.toFixed(2) }}
            </p>

            <!-- Buy Button -->
            <button
              @click="buyFood(food)"
              class="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <!-- No foods -->
      <div v-else class="flex flex-col items-center justify-center mt-16 text-center text-gray-500">
        <img src="https://placehold.co/200x200?text=No+Food" alt="No food" class="mb-4">
        <p class="text-lg italic">No foods available for this hotel yet.</p>
      </div>
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

// Example Buy function (you can connect to your cart or checkout)
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
