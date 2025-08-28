<!-- components/BookingTable.vue -->
<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <h1 class="text-2xl font-bold mb-6">All Bus Bookings</h1>

    <table class="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border-b">ID</th>
          <th class="px-4 py-2 border-b">Customer Name</th>
          <th class="px-4 py-2 border-b">Date</th>
          <th class="px-4 py-2 border-b">Seats</th>
          <th class="px-4 py-2 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 border-b">{{ booking.id }}</td>
          <td class="px-4 py-2 border-b">{{ booking.customerName }}</td>
          <td class="px-4 py-2 border-b">{{ booking.date }}</td>
          <td class="px-4 py-2 border-b">{{ booking.seats }}</td>
          <td class="px-4 py-2 border-b">{{ booking.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const bookings = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/reports/bookings/all');
    bookings.value = res.data;
  } catch (err) {
    console.error('Failed to fetch bookings', err);
  }
});
</script>
