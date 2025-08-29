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
      class="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden"
    >
      <!-- Hero Image -->
      <div class="relative group">
        <img
          :src="hotel.imageUrl || 'https://via.placeholder.com/800x400'"
          :alt="hotel.name || 'Hotel Image'"
          class="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          @error="handleImageError"
        />
        <!-- Overlay info -->
        <div class="absolute bottom-4 left-4 bg-black/50 text-white p-4 rounded-xl shadow-lg">
          <h2 class="text-2xl font-bold">{{ hotel.name }}</h2>
          <p class="text-sm flex items-center gap-1">
            <i class="fas fa-map-marker-alt text-blue-400"></i>
            {{ hotel.locationName || 'Unknown Location' }}
          </p>
        </div>
        <span class="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
          ${{ isValidPrice(hotel.pricePerNight) ? hotel.pricePerNight.toFixed(2) : 'N/A' }} / night
        </span>
      </div>

      <!-- Details Section -->
      <div class="p-6 sm:p-10 space-y-6">

        <!-- Description -->
        <div>
          <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
            {{ hotel.description || 'No description available' }}
          </p>
        </div>

        <!-- Food Menu Button -->
        <router-link
  v-if="hotel.hasRestaurant"
  :to="`/hotel/${hotel.id}/food-menu`"
  class="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg transition transform hover:-translate-y-1"
>
  🍽️ View Food Menu
</router-link>





        <!-- Amenities -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Amenities</h2>
          <div v-if="hotel.amenities && hotel.amenities.length" class="flex flex-wrap gap-2">
            <span
              v-for="(amenity, index) in hotel.amenities"
              :key="index"
              class="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium shadow-sm hover:bg-blue-200 transition"
            >
              {{ amenity }}
            </span>
          </div>
          <div v-else class="text-gray-500 italic">
            No amenities listed
          </div>
        </div>

        <!-- Rooms List -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Available Rooms</h2>
          <div v-if="rooms.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="room in rooms" :key="room.id" class="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2">
  <div class="relative group">
    <!-- Room Image -->
    <img
      :src="room.images && room.images.length > 0 ? room.images[0] : 'https://placehold.co/400x250?text=No+Image'"
      :alt="`Room ${room.roomNumber}`"
      class="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
      @error="handleImageError"
    />

    <!-- Top Pick Badge -->
    <span v-if="room.isTopPick" class="absolute top-3 left-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
      ⭐ Top Pick
    </span>

    <!-- Price Badge -->
    <span class="absolute top-3 right-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
      ${{ room.pricePerNight?.toFixed(2) || 'N/A' }}
    </span>

    <!-- Unavailable Dates -->
    <div v-if="room.bookings && room.bookings.length > 0" class="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow max-w-[90%]">
      <span v-for="(b, idx) in room.bookings" :key="idx" class="block">
        {{ new Date(b.startDate).toLocaleDateString() }} → {{ new Date(b.endDate).toLocaleDateString() }}
      </span>
    </div>
  </div>

  <!-- Room Details -->
  <div class="p-4 space-y-2">
    <h3 class="font-bold text-lg text-center">
  Room #{{ room.roomNumber }} - {{ room.type }}
</h3>

    <p class="text-sm text-gray-500">{{ room.RoomCategory?.name || room.type }}</p>

    <!-- Room Description -->
<p class="text-sm text-gray-500 line-clamp-3 text-center">
  {{ room.description || 'No description available' }}
</p>


    <!-- Amenities -->
    <div v-if="room.amenities && room.amenities.length" class="flex flex-wrap gap-1">
      <span v-for="(amenity, index) in room.amenities" :key="index" class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs shadow-sm">
        {{ amenity }}
      </span>
    </div>

    <!-- Book Button -->
    <router-link
      :to="`/book/${hotel.id}?roomId=${room.id}`"
      class="block w-full text-center py-2 rounded-lg font-medium transition bg-purple-600 text-white hover:bg-purple-700 transform hover:-translate-y-1"
    >
      Book This Room
    </router-link>
  </div>
</div>


            
          </div>

          <div v-else class="text-gray-500 italic">No available rooms for this hotel.</div>
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const hotel = ref(null);
const rooms = ref([]);
const loading = ref(false);
const error = ref(null);
const unavailableRooms = ref([]);

const isValidPrice = (price) => typeof price === 'number' && !isNaN(price);

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x250?text=No+Image';
};

const fetchRooms = async (hotelId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms`);
    const fetchedRooms = res.data.map(room => {
      let amenities = [];
      let images = [];

      try {
        amenities = Array.isArray(room.amenities) ? room.amenities : JSON.parse(room.amenities || '[]');
      } catch {
        amenities = [];
      }

      try {
        images = Array.isArray(room.images) ? room.images : JSON.parse(room.images || '[]');
        images = images.map(img => {
          if (img.startsWith('http')) return img;
          if (img.startsWith('/uploads/')) return `http://localhost:5000${img}`;
          return `http://localhost:5000/uploads/${img}`;
        });
      } catch {
        images = [];
      }

      return { ...room, amenities, images };
    });

    // ❌ Remove filter — keep all rooms
    rooms.value = fetchedRooms;

  } catch (err) {
    rooms.value = [];
    console.error('Error fetching rooms:', err);
  }
};



const fetchUnavailableRooms = async (hotelId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/hotel-bookings/hotel/${hotelId}`);
    unavailableRooms.value = res.data.filter(b => b.status === 'confirmed' || b.status === 'pending').map(b => b.roomId);
  } catch {
    unavailableRooms.value = [];
  }
};

const loadHotel = async (hotelId = route.params.id) => {
  loading.value = true;
  error.value = null;
  rooms.value = [];
  hotel.value = null;
  unavailableRooms.value = [];

  try {
    const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
    const data = res.data;

    // Extract hasRestaurant from amenities
    let amenities = {};
    let hasRestaurant = false;

    if (data.amenities) {
      try {
        amenities = typeof data.amenities === 'string' ? JSON.parse(data.amenities) : data.amenities;
        hasRestaurant = amenities.hasRestaurant === true || amenities.hasRestaurant === 'true';
      } catch (err) {
        console.warn('Failed to parse amenities', err);
        amenities = {};
      }
    }

    hotel.value = {
      ...data,
      amenities,
      hasRestaurant
    };

    console.log('Hotel loaded:', hotel.value); // Check if hasRestaurant is true

    await fetchUnavailableRooms(hotelId);
    await fetchRooms(hotelId);

  } catch (err) {
    error.value = 'Failed to load hotel details. Please try again later.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};







onMounted(() => loadHotel());
watch(() => route.params.id, (newId) => { if (newId) loadHotel(newId); });
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

/* Optional: line clamp */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
