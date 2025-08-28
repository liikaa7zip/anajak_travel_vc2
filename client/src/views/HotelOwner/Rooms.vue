<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-3xl font-bold text-purple-600">Rooms Management</h1>
      
      <!-- Search + Add Room -->
      <div class="flex gap-2 w-full sm:w-auto">
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Search by room number or type"
    class="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
  />

  <!-- Add Room Button -->
  <router-link
    to="/hotel_owner/create-room"
    class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
  >
    Add Rooms
  </router-link>
    <!-- New Category Button -->
  <button
    @click="showModal = true"
    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
  >
    New Category
  </button>
</div>


    </div>

    <!-- Rooms Table -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin h-16 w-16 rounded-full border-t-4 border-purple-600"></div>
    </div>

    <div v-else>
      <div v-if="filteredRooms.length > 0" class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow-lg overflow-hidden text-center">
          <thead class="bg-purple-600 text-white">
            <tr>
              <th class="px-4 py-2">Room #</th>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Category</th>
              <th class="px-4 py-2">Price/Night</th>
              <th class="px-4 py-2">Max Occupancy</th>
              <th class="px-4 py-2">Amenities</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="room in filteredRooms" :key="room.id" class="border-b hover:bg-gray-50 transition text-center">
              <td class="px-4 py-2">{{ room.roomNumber }}</td>
              <td class="px-4 py-2">{{ room.type }}</td>
              <td class="px-4 py-2">{{ room.RoomCategory?.name || 'N/A' }}</td>
              <td class="px-4 py-2">${{ room.pricePerNight?.toFixed(2) || 'N/A' }}</td>
              <td class="px-4 py-2">{{ room.maxOccupancy }}</td>
              
              <td class="px-4 py-2">
                <span v-for="(amenity, index) in room.amenities" :key="index" class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs mr-1 mb-1 inline-block">
                  {{ amenity }}
                </span>
              </td>
              <td class="px-4 py-2">
  <span
    :class="{
      'bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm': room.status === 'available',
      'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm': room.status === 'occupied',
      'bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm': room.status === 'maintenance'
    }"
  >
    {{ room.status.charAt(0).toUpperCase() + room.status.slice(1) }}
  </span>
</td>

              <td class="px-4 py-2 flex gap-2">
                <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="editRoom(room.id)">Edit</button>
                <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" @click="deleteRoom(room.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center text-gray-500 mt-8">
        No rooms found.
      </div>
    </div>

    <!-- Feedback -->
    <div v-if="message" class="mt-4 text-center text-green-600 font-medium">{{ message }}</div>
    <div v-if="error" class="mt-4 text-center text-red-600 font-medium">{{ error }}</div>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <transition name="slide-down">
          <div class="bg-white rounded-3xl p-10 w-1/2 max-w-4xl relative shadow-2xl transform transition-transform duration-300 scale-90">
            <h2 class="text-3xl font-bold mb-6 text-purple-600">Create Room Category</h2>
            
            <form @submit.prevent="createCategory">
              <div class="mb-6">
                <label class="block mb-2 font-medium text-gray-700 text-lg">Name</label>
                <input
                  type="text"
                  v-model="form.name"
                  class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
                  required
                />
              </div>
              <div class="mb-6">
                <label class="block mb-2 font-medium text-gray-700 text-lg">Description</label>
                <textarea
                  v-model="form.description"
                  class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
                  rows="4"
                ></textarea>
              </div>
              <div class="mb-6">
                <label class="block mb-2 font-medium text-gray-700 text-lg">Base Price</label>
                <input
                  type="number"
                  v-model="form.basePrice"
                  class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
                  required
                />
              </div>
              <div class="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  @click="showModal = false"
                  class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg"
                >
                  Create
                </button>
              </div>
            </form>
            
            <!-- Close button -->
            <button
              @click="showModal = false"
              class="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition text-2xl"
            >
              ✕
            </button>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const rooms = ref([]);
const loading = ref(false);
const error = ref('');
const message = ref('');
const searchQuery = ref('');
const router = useRouter();
const showModal = ref(false);

const form = ref({
  name: '',
  description: '',
  basePrice: ''
});

const createCategory = async () => {
  try {
    await axios.post('http://localhost:5000/api/hotel-owners/room-categories', form.value);
    message.value = 'Category created successfully!';
    showModal.value = false;
    form.value = { name: '', description: '', basePrice: '' };
    // Optionally: fetch updated categories list
  } catch (err) {
    console.error(err);
    error.value = 'Failed to create category.';
  }
};

const fetchRooms = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await axios.get('http://localhost:5000/api/hotel-owners/rooms');
    rooms.value = res.data.map(room => ({
      ...room,
      amenities: Array.isArray(room.amenities) ? room.amenities : JSON.parse(room.amenities || '[]')
    }));
  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch rooms.';
  } finally {
    loading.value = false;
  }
};

const filteredRooms = computed(() => {
  if (!searchQuery.value) return rooms.value;
  const q = searchQuery.value.toLowerCase();
  return rooms.value.filter(room =>
    room.roomNumber.toString().includes(q) ||
    room.type.toLowerCase().includes(q)
  );
});

const goToAddRoom = () => {
  router.push('/rooms/create'); // adjust route if your CreateRoom.vue path is different
};

const editRoom = (id) => {
  router.push(`/rooms/edit/${id}`); // you can implement edit page later
};

const deleteRoom = async (id) => {
  if (!confirm('Are you sure you want to delete this room?')) return;
  try {
    await axios.delete(`http://localhost:5000/api/hotel-owners/rooms/${id}`);
    message.value = 'Room deleted successfully!';
    fetchRooms();
  } catch (err) {
    console.error(err);
    error.value = 'Failed to delete room.';
  }
};

onMounted(fetchRooms);
</script>

<style scoped>
/* Optional: table hover animation */
table tbody tr:hover {
  transform: translateY(-1px);
}

/* Fade-in modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide-down modal */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}
.slide-down-enter-from {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0) scale(1);
  opacity: 1;
}
</style>
