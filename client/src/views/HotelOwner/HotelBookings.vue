<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-3xl font-bold text-purple-600">Hotel Bookings</h1>

      <!-- Search + Optional Add Booking Button -->
      <div class="flex gap-2 w-full sm:w-auto">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by user, hotel, or room"
          class="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin h-16 w-16 rounded-full border-t-4 border-purple-600"></div>
    </div>

    <!-- Bookings Table -->
    <div v-else>
      <div v-if="filteredBookings.length > 0" class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow-lg overflow-hidden text-center">
          <thead class="bg-purple-600 text-white">
            <tr>
              <th class="px-4 py-2">Booking ID</th>
              <th class="px-4 py-2">User ID</th>
              <th class="px-4 py-2">Hotel ID</th>
              <th class="px-4 py-2">Room ID</th>
              <th class="px-4 py-2">Check-In</th>
              <th class="px-4 py-2">Check-Out</th>
              <th class="px-4 py-2">Guests</th>
              <th class="px-4 py-2">Total ($)</th>
              <th class="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="booking in filteredBookings"
              :key="booking.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-4 py-2">{{ booking.id }}</td>
              <td class="px-4 py-2">{{ booking.userId }}</td>
              <td class="px-4 py-2">{{ booking.hotelId }}</td>
              <td class="px-4 py-2">{{ booking.roomId }}</td>
              <td class="px-4 py-2">{{ formatDate(booking.checkInDate) }}</td>
              <td class="px-4 py-2">{{ formatDate(booking.checkOutDate) }}</td>
              <td class="px-4 py-2">{{ booking.guests }}</td>
              <td class="px-4 py-2">{{ booking.totalAmount.toFixed(2) }}</td>
              <td class="px-4 py-2">
                <span
                  :class="{
                    'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm': booking.status === 'pending',
                    'bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm': booking.status === 'confirmed',
                    'bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm': booking.status === 'cancelled'
                  }"
                >
                  {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center text-gray-500 mt-8">
        No bookings found.
      </div>
    </div>

    <!-- Feedback -->
    <div v-if="error" class="mt-4 text-center text-red-600 font-medium">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const bookings = ref([]);
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');

const fetchBookings = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await axios.get('http://localhost:5000/api/hotel-owners/bookings');
    bookings.value = res.data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch bookings.';
  } finally {
    loading.value = false;
  }
};

// Filter bookings by search query (userId, hotelId, roomId)
const filteredBookings = computed(() => {
  if (!searchQuery.value) return bookings.value;
  const q = searchQuery.value.toLowerCase();
  return bookings.value.filter(b =>
    b.userId.toString().includes(q) ||
    b.hotelId.toString().includes(q) ||
    b.roomId.toString().includes(q)
  );
});

// Format date nicely
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

onMounted(fetchBookings);
</script>

<style scoped>
table tbody tr:hover {
  transform: translateY(-1px);
}
</style>
