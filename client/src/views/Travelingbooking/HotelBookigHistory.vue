<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-4xl font-extrabold mb-8 text-center text-purple-700 drop-shadow-md">
      Your Hotel Booking History
    </h1>

    <!-- Search Bar + Button -->
    <div class="flex justify-between items-center mb-6 gap-4 flex-wrap">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by hotel name..."
        class="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <router-link
        to="/hotel"
        class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-200"
      >
        Book a New Hotel
      </router-link>
    </div>

    <div v-if="filteredBookings.length === 0" class="text-center text-gray-500 italic">
      No bookings found.
    </div>

    <div v-else class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
        <thead class="bg-purple-100 text-purple-900 text-left">
          <tr>
            <th class="py-3 px-5 border-b">Hotel</th>
            <th class="py-3 px-5 border-b">Check-In</th>
            <th class="py-3 px-5 border-b">Check-Out</th>
            <th class="py-3 px-5 border-b">Guests</th>
            <th class="py-3 px-5 border-b">Total Price</th>
            <th class="py-3 px-5 border-b">Status</th>
            <th class="py-3 px-5 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="hover:bg-purple-50 transition duration-150"
          >
            <td class="py-3 px-5 border-b font-medium text-purple-800">
              {{ booking.Hotel?.name || 'N/A' }}
            </td>
            <td class="py-3 px-5 border-b">{{ formatDate(booking.checkInDate) }}</td>
            <td class="py-3 px-5 border-b">{{ formatDate(booking.checkOutDate) }}</td>
            <td class="py-3 px-5 border-b">{{ booking.guests }}</td>
            <td class="py-3 px-5 border-b">{{ booking.totalPrice }} USD</td>
            <td class="py-3 px-5 border-b">
              <span
                :class="statusBadgeClass(booking.status)"
                class="px-2 py-1 rounded text-xs font-semibold uppercase"
              >
                {{ booking.status }}
              </span>
            </td>
            <td class="py-3 px-5 border-b">
              <button
                v-if="booking.status !== 'cancelled'"
                @click="cancelBooking(booking.id)"
                class="px-4 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
              <span v-else class="italic text-gray-500">Cancelled</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookings: [],
      userId: null,
      searchQuery: '',
    }
  },
  computed: {
    filteredBookings() {
      if (!this.searchQuery) return this.bookings
      const q = this.searchQuery.toLowerCase()
      return this.bookings.filter(booking =>
        booking.Hotel?.name?.toLowerCase().includes(q)
      )
    },
  },
  methods: {
    async fetchBookings() {
      try {
        const response = await axios.get('http://localhost:5000/api/hotel-booking')
        this.bookings = response.data.filter(b => b.userId === this.userId)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    },
    async cancelBooking(id) {
      if (!confirm('Are you sure you want to cancel this booking?')) return
      try {
        await axios.delete(`http://localhost:5000/api/hotel-booking/${id}`)
        this.bookings = this.bookings.map(b =>
          b.id === id ? { ...b, status: 'cancelled' } : b
        )
      } catch (error) {
        console.error('Error cancelling booking:', error)
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString()
    },
    statusBadgeClass(status) {
      switch (status) {
        case 'confirmed':
          return 'bg-green-100 text-green-800'
        case 'cancelled':
          return 'bg-red-100 text-red-800'
        case 'pending':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-600'
      }
    }
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem('user'))?.id
    this.fetchBookings()
  }
}
</script>
