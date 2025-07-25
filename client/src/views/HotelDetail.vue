<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin h-16 w-16 rounded-full border-t-4 border-blue-600"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 text-lg">
      {{ error }}
    </div>

    <!-- Hotel Content -->
    <div
      v-else-if="hotel"
      class="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden"
    >
      <!-- Hero Image -->
      <img
        :src="hotel.imageUrl || 'https://via.placeholder.com/800x400'"
        :alt="hotel.name || 'Hotel Image'"
        class="w-full h-[400px] object-cover"
        @error="handleImageError"
      />

      <!-- Details Section -->
      <div class="p-6 sm:p-10 space-y-6">
        <!-- Title, Location, Price -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {{ hotel.name || 'Unnamed Hotel' }}
            </h1>
            <p class="text-gray-600 mt-1 text-sm sm:text-base flex items-center">
              <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>
              {{ hotel.location || 'Unknown Location' }}
            </p>
          </div>
          <p class="text-purple-600 font-bold text-2xl sm:text-3xl">
            ${{ isValidPrice(hotel.pricePerNight) ? hotel.pricePerNight.toFixed(2) : 'N/A' }}
            <span class="text-sm text-gray-500">/ night</span>
          </p>
        </div>

        <!-- Description -->
        <div>
          <p class="text-gray-700 leading-relaxed text-base">
            {{ hotel.description || 'No description available' }}
          </p>
        </div>

        <!-- Amenities -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Amenities</h2>
          <div v-if="hotel.amenities && hotel.amenities.length" class="flex flex-wrap gap-2">
            <span
              v-for="(amenity, index) in hotel.amenities"
              :key="index"
              class="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium"
            >
              {{ amenity }}
            </span>
          </div>
          <div v-else class="text-gray-500 italic">
            No amenities listed
          </div>
        </div>

        <!-- CTA -->
        <div>
          <router-link
            :to="`/book/${hotel.id}`"
            class="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
          >
            Book Now
          </router-link>
        </div>
      </div>
    </div>

    <!-- Fallback -->
    <div v-else class="text-center text-gray-600 text-lg">
      Hotel not found.
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const hotel = ref(null);
const loading = ref(false);
const error = ref(null);

const isValidPrice = (price) => {
  return typeof price === 'number' && !isNaN(price);
};

const handleImageError = (event) => {
  console.warn(`Image load failed for hotel ${route.params.id}`);
  event.target.src = 'https://via.placeholder.com/800x400';
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await api.get(`/hotels/${route.params.id}`);
    hotel.value = res.data;
  } catch (err) {
    error.value = 'Failed to load hotel details. Please try again later.';
    console.error('Error fetching hotel:', err);
  } finally {
    loading.value = false;
  }
});
</script>
    <style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
