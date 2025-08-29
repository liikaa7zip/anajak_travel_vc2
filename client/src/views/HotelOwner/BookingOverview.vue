<template>
  <div class="p-6">
    <h1 class="text-3xl font-extrabold mb-6 flex items-center gap-2 text-purple-700">
      <span>🏨</span> Hotel Bookings
    </h1>

    <!-- Toast -->
    <div v-if="toast.message" 
      :class="toast.success ? 'bg-green-500' : 'bg-red-500'" 
      class="fixed top-6 right-6 text-white px-4 py-2 rounded-lg shadow-xl z-50 animate-fade">
      {{ toast.message }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-600 mt-6">
      <span class="animate-spin inline-block mr-2">⏳</span> Loading bookings...
    </div>

    <!-- Error -->
    <div v-if="error" class="text-red-600 text-center font-semibold mt-6">
      {{ error }}
    </div>

    <!-- Table -->
    <div v-if="!loading && bookings.length" class="overflow-x-auto bg-white shadow-lg rounded-2xl">
      <table class="w-full border-collapse rounded-2xl overflow-hidden">
        <thead class="bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 text-sm uppercase">
          <tr>
            <th class="p-3 text-left">Hotel / Location</th>
            <th class="p-3 text-left">Room</th>
            <th class="p-3 text-left">User</th>
            <th class="p-3 text-left">Dates</th>
            <th class="p-3 text-left">Guests</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Total</th>
            <th class="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in bookings" :key="b.id" 
              class="hover:bg-purple-50 transition border-t">

            <!-- Hotel / Location -->
            <td class="p-3">
              <div class="font-semibold flex items-center gap-2 text-gray-800">
                🏨 {{ b.Hotel?.name }}
              </div>
              <div class="text-sm text-gray-500 flex items-center gap-1">
                📍 {{ b.Hotel?.Location?.name }}
              </div>
            </td>

            <!-- Room -->
            <td class="p-3">
              <span class="font-semibold text-indigo-600">{{ b.Room?.roomNumber }}</span>
              <span class="ml-2 text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">
                {{ b.Room?.type }}
              </span>
            </td>

            <!-- User -->
            <td class="p-3">
              <span class="font-semibold">{{ b.User?.username }}</span>
              <br />
              <span class="text-sm text-gray-500">{{ b.User?.email }}</span>
            </td>

            <!-- Dates -->
            <td class="p-3">
              <div class="text-sm">
                <span class="font-medium text-green-600">⬅ {{ formatDate(b.checkInDate) }}</span>
                <br>
                <span class="font-medium text-red-600">➡ {{ formatDate(b.checkOutDate) }}</span>
              </div>
            </td>

            <!-- Guests -->
            <td class="p-3 text-center">
              <span class="px-2 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                👥 {{ b.guests }}
              </span>
            </td>

            <!-- Status -->
            <td class="p-3">
              <span :class="statusClass(b.status)" 
                class="px-3 py-1 rounded-full text-xs shadow-sm inline-flex items-center gap-1">
                <span v-if="b.status === 'confirmed'">✅</span>
                <span v-else-if="b.status === 'pending'">⏳</span>
                <span v-else-if="b.status === 'cancelled'">❌</span>
                <span v-else-if="b.status === 'completed'">🏁</span>
                {{ b.status.charAt(0).toUpperCase() + b.status.slice(1) }}
              </span>
            </td>

            <!-- Total -->
            <td class="p-3 text-gray-600 text-lg">${{ b.totalAmount }}</td>

            <!-- Action Column -->
<td class="p-3 text-center">
  <button
    v-if="b.status === 'pending' || b.status === 'confirmed'"
    @click="confirmComplete(b.id)"
    class="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 hover:scale-105 transition transform"
  >
    Complete
  </button>
  <span 
    v-else
    :class="b.status === 'completed' ? ' text-green-700' : ' text-red-700'"
    class="px-2 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1"
  >
    {{ b.status === 'completed' ? '✅ Completed' : '❌ Cancelled' }}
  </span>
</td>


  
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty -->
    <div v-if="!loading && !bookings.length" class="text-center text-gray-500 mt-12">
      <span class="text-4xl">📭</span>
      <div class="mt-2 text-lg">No bookings found.</div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.totalPages > 1" class="flex justify-center mt-6 space-x-2 items-center">
      <button
        :disabled="pagination.currentPage === 1"
        @click="fetchBookings(pagination.currentPage - 1)"
        class="px-3 py-1 rounded border bg-white hover:bg-purple-50 disabled:opacity-50"
      >
        &lt;
      </button>

      <span class="px-4 py-1 font-semibold text-purple-700 bg-purple-100 rounded-full">
        {{ pagination.currentPage }} / {{ pagination.totalPages }}
      </span>

      <button
        :disabled="!pagination.hasNext"
        @click="fetchBookings(pagination.currentPage + 1)"
        class="px-3 py-1 rounded border bg-white hover:bg-purple-50 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>

    <!-- Confirm Dialog -->
    <div v-if="confirmId !== null" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-2xl p-6 w-96 text-center">
        <div class="text-xl font-bold mb-2 text-purple-700">Mark Booking as Completed?</div>
        <div class="mb-4 text-gray-600">Are you sure you want to mark booking #{{ confirmId }} as completed?</div>
        <button @click="markComplete(confirmId)" 
          class="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2">Yes</button>
        <button @click="confirmId = null" 
          class="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookingsTable",
  data() {
    return {
      bookings: [],
      pagination: { currentPage: 1, totalPages: 1, hasNext: false },
      loading: false,
      error: null,
      toast: { message: "", success: true },
      confirmId: null,
    };
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    async fetchBookings(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/hotel-bookings?page=${page}&limit=10`
        );
        this.bookings = res.data.bookings;
        this.pagination = res.data.pagination;
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch bookings";
      } finally {
        this.loading = false;
      }
    },
    confirmComplete(id) {
      this.confirmId = id;
    },
    async markComplete(id) {
      try {
        await axios.put(`http://localhost:5000/api/hotel-bookings/${id}/complete`);
        this.showToast("Booking marked as completed!", true);
        this.confirmId = null;
        this.fetchBookings(this.pagination.currentPage);
      } catch (err) {
        this.showToast("Failed to mark booking as completed.", false);
        this.confirmId = null;
      }
    },
    showToast(message, success = true) {
      this.toast = { message, success };
      setTimeout(() => {
        this.toast.message = "";
      }, 2500);
    },
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
    statusClass(status) {
      switch (status) {
        case "confirmed":
          return "bg-green-100 text-green-700";
        case "pending":
          return "bg-yellow-100 text-yellow-700";
        case "cancelled":
          return "bg-red-100 text-red-700";
        case "completed":
          return "bg-blue-100 text-blue-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    },
  },
};
</script>
