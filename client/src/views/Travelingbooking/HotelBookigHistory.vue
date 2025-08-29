<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-4xl font-extrabold mb-10 text-center text-purple-700 drop-shadow-md">
      Your Hotel Booking History
    </h1>

    <!-- Search Bar + Book New Hotel -->
    <div class="flex justify-between items-center mb-6 gap-4 flex-wrap">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by hotel or room number..."
        class="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <router-link
        to="/hotel"
        class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-200"
      >
        Book a New Hotel
      </router-link>
    </div>

    <!-- No bookings -->
    <div v-if="filteredBookings.length === 0" class="text-center text-gray-500 italic py-10">
      No bookings found.
    </div>

    <!-- Bookings Table -->
    <div v-else class="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table class="min-w-full bg-white rounded-lg text-sm">
        <thead class="bg-purple-100 text-purple-900 text-left">
          <tr>
            <th class="py-3 px-5 border-b">Hotel</th>
            <th class="py-3 px-5 border-b">Room</th>
            <th class="py-3 px-5 border-b">Check-In</th>
            <th class="py-3 px-5 border-b">Check-Out</th>
            <th class="py-3 px-5 border-b">Guests</th>
            <th class="py-3 px-5 border-b">Total Price</th>
            <th class="py-3 px-5 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="hover:bg-purple-50 transition duration-150"
          >
            <td class="py-3 px-5 border-b font-medium text-purple-800">{{ booking.Hotel?.name || 'N/A' }}</td>
            <td class="py-3 px-5 border-b">{{ booking.Room?.roomNumber || 'N/A' }}</td>
            <td class="py-3 px-5 border-b">{{ formatDate(booking.checkInDate) }}</td>
            <td class="py-3 px-5 border-b">{{ formatDate(booking.checkOutDate) }}</td>
            <td class="py-3 px-5 border-b">{{ booking.guests }}</td>
            <td class="py-3 px-5 border-b font-semibold text-purple-700">{{ booking.totalAmount.toFixed(2) }} USD</td>
            <td class="py-3 px-5 border-b">
  <div class="flex items-center gap-2">
    <span
      v-if="!isCancellable(booking) || booking.status === 'cancelled'"
      class="px-2 py-1 bg-gray-200 text-gray-500 rounded text-xs font-semibold"
    >
      Cannot Cancel
    </span>
    <button
      v-else
      @click="confirmCancel(booking.id)"
      class="px-3 py-1 text-white bg-red-500 rounded text-sm font-semibold hover:bg-red-600 transition"
    >
      Cancel
    </button>
  </div>
</td>


          </tr>
        </tbody>
      </table>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div
      v-if="showCancelModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="showCancelModal = false"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
        <h2 class="text-center text-xl font-bold text-gray-800 mb-4">Cancel Booking</h2>
        <p class="text-gray-700 mb-6 text-center">Are you sure you want to cancel this booking?</p>
        <div class="flex justify-center gap-4">
          <button
            @click="showCancelModal = false"
            class="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            No
          </button>
          <button
            @click="cancelBooking"
            class="px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            :disabled="loading"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookings: [],
      searchQuery: '',
      userId: null,
      showCancelModal: false,
      bookingToCancel: null,
      loading: false
    }
  },
  computed: {
    filteredBookings() {
      if (!this.searchQuery) return this.bookings
      const q = this.searchQuery.toLowerCase()
      return this.bookings.filter(
        b => b.Hotel?.name?.toLowerCase().includes(q) || b.Room?.roomNumber?.toString().includes(q)
      )
    }
  },
  methods: {
    isCancellable(booking) {
  if (!booking.checkInDate || !booking.checkOutDate) return false;

  const today = new Date();
  const checkIn = new Date(booking.checkInDate);
  const checkOut = new Date(booking.checkOutDate);

  // Only allow cancel if today is before check-in
  return today < checkIn && booking.status !== 'cancelled';
},
    async fetchBookings() {
      try {
        const res = await axios.get('http://localhost:5000/api/hotel-bookings/my-bookings', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        console.log(res.data);
        this.bookings = res.data
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString()
    },
    confirmCancel(id) {
      this.bookingToCancel = id
      this.showCancelModal = true
    },
    async cancelBooking() {
      if (!this.bookingToCancel) return
      this.loading = true
      try {
        await axios.delete(`http://localhost:5000/api/hotel-bookings/${this.bookingToCancel}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        this.bookings = this.bookings.map(b =>
          b.id === this.bookingToCancel ? { ...b, status: 'cancelled' } : b
        )
        this.showCancelModal = false
        this.bookingToCancel = null
      } catch (err) {
        console.error('Failed to cancel booking:', err)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchBookings()
  }
}
</script>
