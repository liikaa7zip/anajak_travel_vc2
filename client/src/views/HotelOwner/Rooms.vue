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
          <!-- RouteLink for Add Room -->
  <router-link
    to="/hotel_owner/create-room"
    class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
  >
    Add Room
  </router-link>
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
</style>
