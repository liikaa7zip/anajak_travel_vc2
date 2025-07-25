<template>
  <div class="container mx-auto px-4 py-8 ">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-2 ">
  <!-- Breadcrumb -->
  <div class="text-xs text-gray-600 mb-2 sm:mb-0">
    <span class="text-gray-400">Home</span> &gt; 
    <span class="text-gray-400">Tours</span> &gt; 
    <span class="text-gray-800 font-medium">Phnom Penh</span>
  </div>

  <!-- Right subtitle -->
  <div class="text-xs text-gray-700 font-medium">
     Phnom Penh Tours &amp; Excursions
  </div>
</div>

<!-- Main Title -->
<h1 class="text-3xl sm:text-4xl font-extrabold text-[#0d1b3d] mb-8 text-left sm:text-left">
  Forget Busy Work, Start Next Vacation
</h1>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-600 text-lg">
      {{ error }}
    </div>

    <!-- Hotel Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="hotel in hotels"
        :key="hotel.id"
        class="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <img
          :src="hotel.imageUrl || 'https://via.placeholder.com/400x200'"
          :alt="hotel.name || 'Hotel Image'"
          class="w-full h-56 object-cover"
        />
        <div class="p-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            {{ hotel.name || "Unnamed Hotel" }}
          </h2>
          <p class="text-gray-600 text-sm mb-2">
            <i class="fas fa-map-marker-alt mr-1"></i
            >{{ hotel.location || "Unknown Location" }}
          </p>
          <p class="text-gray-500 text-sm line-clamp-3 mb-3">
            {{ hotel.description || "No description available" }}
          </p>
          <p class="text-green-600 font-bold text-lg mb-4">
            ${{
              isValidPrice(hotel.pricePerNight)
                ? hotel.pricePerNight.toFixed(2)
                : "Price unavailable"
            }}
            / night
          </p>
          <router-link
            :to="`/hotels/${hotel.id}`"
            class="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HotelList",
  data() {
    return {
      hotels: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchHotels() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:5000/api/hotels"); // Adjust URL if needed
        console.log("API Response:", response.data); // Log to debug data
        this.hotels = response.data;
      } catch (err) {
        this.error = "Failed to load hotels. Please try again later.";
        console.error("Error fetching hotels:", err);
      } finally {
        this.loading = false;
      }
    },
    isValidPrice(price) {
      return typeof price === "number" && !isNaN(price);
    },
  },
  created() {
    this.fetchHotels();
  },
};
</script>

<style scoped>
/* Optional: Add Font Awesome for icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

/* Ensure text truncation works */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>