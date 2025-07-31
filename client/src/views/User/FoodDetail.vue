<template>
  <div class="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
    <div v-if="!food" class="text-gray-500 text-center text-xl font-medium">
      Loading...
    </div>

    <div
      v-else
      class="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center"
    >
      <img
        v-if="food.image"
        :src="food.image"
        alt="Food Image"
        class="w-full max-h-96 object-cover rounded-2xl mb-8 shadow-md"
        @error="onImageError"
      />
      <h1 class="text-4xl font-extrabold mb-4 text-gray-900 text-center">
        {{ food.name }}
      </h1>
      <p class="text-indigo-600 text-2xl font-semibold mb-6">
        ${{ food.price.toFixed(2) }}
      </p>
      <p
        v-if="food.Location"
        class="flex items-center text-gray-500 text-sm mb-8 space-x-2"
      >
        <svg
          class="w-5 h-5 text-indigo-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M12 21C12 21 18 13.5 18 9a6 6 0 1 0-12 0c0 4.5 6 12 6 12z"
          ></path>
          <circle cx="12" cy="9" r="2"></circle>
        </svg>
        <span>Location: {{ food.Location.name }}</span>
      </p>

      <router-link
        to="/province"
        class="inline-block mt-auto px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
      >
        ← Back to Menu
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const food = ref(null);

function onImageError(event) {
  event.target.src = "https://via.placeholder.com/600x400?text=No+Image";
}

onMounted(async () => {
  const foodId = route.params.id;
  try {
    const res = await axios.get(`http://localhost:5000/api/foods/${foodId}`);
    food.value = res.data;
  } catch (err) {
    console.error("Failed to load food detail:", err);
  }
});
</script>

<style scoped>
/* Add subtle zoom on image hover */
img:hover {
  transform: scale(1.03);
  transition: transform 0.3s ease;
}
</style>
