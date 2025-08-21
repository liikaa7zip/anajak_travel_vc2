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
            <h1 class="text-gray-600 text-sm mb-2">
              <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>
              {{ hotel.locationName || "Unknown Location" }}
            </h1>
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

        <!-- Rooms List -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Available Rooms</h2>
          <div v-if="rooms.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
  v-for="room in rooms"
  :key="room.id"
  :class="[
    'bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform',
    unavailableRooms.includes(room.id) 
      ? 'opacity-50 cursor-not-allowed' 
      : 'hover:shadow-2xl hover:-translate-y-1'
  ]"
>
<img
  :src="room.images && room.images.length > 0
        ? room.images[0].startsWith('http')
          ? room.images[0]
          : `http://localhost:5000/${room.images[0]}`
        : 'https://placehold.co/400x250?text=No+Image'"
  :alt="`Room ${room.roomNumber}`"
  class="w-full h-[200px] object-cover"
  @error="handleImageError"
/>




  <div class="p-4 space-y-3">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold text-lg">Room #{{ room.roomNumber }}</h3>
        <p class="text-sm text-gray-500">{{ room.RoomCategory?.name || room.type }}</p>
      </div>
      <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
        ${{ room.pricePerNight?.toFixed(2) || 'N/A' }}
      </span>
    </div>

    <p class="text-gray-600 text-sm line-clamp-3">
      {{ room.RoomCategory?.description || 'No description available' }}
    </p>

    <div v-if="room.amenities && room.amenities.length" class="flex flex-wrap gap-1">
      <span v-for="(amenity, index) in room.amenities" :key="index"
            class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
        {{ amenity }}
      </span>
    </div>

    <router-link
  :to="`/book/${hotel.id}?roomId=${room.id}`"
  class="block w-full text-center bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
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

// Reactive state
const hotel = ref(null);
const rooms = ref([]);
const loading = ref(false);
const error = ref(null);
const unavailableRooms = ref([]); // Stores room IDs that are unavailable

// Helpers
const isValidPrice = (price) => typeof price === 'number' && !isNaN(price);

const handleImageError = (event) => {
  const altText = event.target.alt || 'Room/Hotel';
  console.warn(`Image load failed: ${altText}`);
  event.target.src = 'https://placehold.co/400x250?text=No+Image';
};

const fetchRooms = async (hotelId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms`);
    
    // Map over each room to ensure amenities and images are arrays
    const fetchedRooms = res.data.map(room => {
      let amenities = [];
      let images = [];

      try {
        amenities = Array.isArray(room.amenities)
          ? room.amenities
          : JSON.parse(room.amenities || '[]');
      } catch (err) {
        console.warn(`Failed to parse amenities for room ${room.id}:`, err);
      }

      try {
        images = Array.isArray(room.images)
          ? room.images
          : JSON.parse(room.images || '[]');

        // Normalize images to full URLs
        images = images.map(img => {
          if (!img) return '';
          return img.startsWith('http')
            ? img
            : `http://localhost:5000/uploads/${img.replace(/^uploads\//, '')}`;
        });
      } catch (err) {
        console.warn(`Failed to parse images for room ${room.id}:`, err);
      }

      return {
        ...room,
        amenities,
        images
      };
    });

    // Debug log: show images for all rooms
    console.log('Fetched rooms with normalized images:', fetchedRooms.map(r => ({
      id: r.id,
      images: r.images
    })));

    // Filter out unavailable rooms
    rooms.value = fetchedRooms.filter(room => !unavailableRooms.value.includes(room.id));

  } catch (err) {
    rooms.value = [];
    console.error('Error fetching rooms:', err);
  }
};



const fetchUnavailableRooms = async (hotelId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/hotel-bookings/hotel/${hotelId}`);
    const bookings = res.data;

    // Mark all rooms with pending/confirmed bookings as unavailable
    unavailableRooms.value = bookings
      .filter(b => b.status === 'confirmed' || b.status === 'pending')
      .map(b => b.roomId);
  } catch (err) {
    console.error('Failed to fetch unavailable rooms:', err);
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
    hotel.value = res.data;

    // Fetch unavailable rooms first
    await fetchUnavailableRooms(hotelId);

    // Then fetch only available rooms
    await fetchRooms(hotelId);
  } catch (err) {
    error.value = 'Failed to load hotel details. Please try again later.';
    console.error('Error fetching hotel:', err);
  } finally {
    loading.value = false;
  }
};


// Fetch hotel on component mount
onMounted(() => loadHotel());

// Watch for route changes (when user clicks another hotel)
watch(() => route.params.id, (newId) => {
  if (newId) loadHotel(newId);
});
</script>


    <style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
