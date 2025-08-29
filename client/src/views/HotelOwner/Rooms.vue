<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-3xl font-bold text-purple-600">Rooms Management</h1>
      
      <div class="flex gap-2 w-full sm:w-auto">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by room number or type"
          class="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <router-link
          to="/hotel_owner/create-room"
          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
        >
          Add Rooms
        </router-link>

        <button
          @click="showCategoryModal = true"
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
                <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="openEditModal(room)">Edit</button>
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

       <!-- Edit Room Modal -->
    <!-- Edit Room Modal -->
    <transition name="fade">
      <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <transition name="scale">
          <div class="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl transform transition-all duration-500 bg-gradient-to-br from-gray-50 to-white">
            <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6 flex items-center gap-2">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Edit Room
            </h2>
            
            <form @submit.prevent="saveRoom" class="space-y-6">
              <div class="relative">
                <label class="block mb-1 font-medium text-gray-700 text-sm">Room Number</label>
                <input 
                  type="text" 
                  v-model="editRoomData.roomNumber" 
                  class="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white shadow-md hover:shadow-lg" 
                  placeholder="Enter room number"
                />
              </div>
              <div class="relative">
                <label class="block mb-1 font-medium text-gray-700 text-sm">Type</label>
                <input 
                  type="text" 
                  v-model="editRoomData.type" 
                  class="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white shadow-md hover:shadow-lg" 
                  placeholder="Enter room type"
                />
              </div>
              <div class="relative">
                <label class="block mb-1 font-medium text-gray-700 text-sm">Price/Night</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input 
                    type="number" 
                    v-model="editRoomData.pricePerNight" 
                    class="w-full border-2 border-gray-200 pl-8 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white shadow-md hover:shadow-lg" 
                    placeholder="Enter price per night"
                  />
                </div>
              </div>
              <div class="relative">
                <label class="block mb-1 font-medium text-gray-700 text-sm">Max Occupancy</label>
                <input 
                  type="number" 
                  v-model="editRoomData.maxOccupancy" 
                  class="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white shadow-md hover:shadow-lg" 
                  placeholder="Enter max occupancy"
                />
              </div>
              <div class="relative">
                <label class="block mb-1 font-medium text-gray-700 text-sm">Status</label>
                <select 
                  v-model="editRoomData.status" 
                  class="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white shadow-md hover:shadow-lg appearance-none"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <svg class="absolute right-3 top-10 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div class="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  @click="closeEditModal" 
                  class="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            </form>

            <button 
              @click="closeEditModal" 
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-300 transform hover:scale-110"
            >
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
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

const rooms = ref([]);
const loading = ref(false);
const error = ref('');
const message = ref('');
const searchQuery = ref('');

const showEditModal = ref(false);
const editRoomData = ref({});

const showCategoryModal = ref(false);
const form = ref({ name: '', description: '', basePrice: '' });

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

// Open edit modal
const openEditModal = (room) => {
  editRoomData.value = { ...room };
  showEditModal.value = true;
};

// Close edit modal
const closeEditModal = () => {
  showEditModal.value = false;
};

// Save room changes
const saveRoom = async () => {
  try {
    await axios.put(`http://localhost:5000/api/hotel-owners/rooms/${editRoomData.value.id}`, editRoomData.value);
    const index = rooms.value.findIndex(r => r.id === editRoomData.value.id);
    if (index !== -1) rooms.value[index] = { ...editRoomData.value };
    message.value = 'Room updated successfully!';
    showEditModal.value = false;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to update room.';
  }
};

// Delete room
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
