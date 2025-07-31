<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-4xl font-extrabold mb-8 text-center text-purple-700 drop-shadow-md">
      Your Boat Booking History
    </h1>

    <!-- Filter and Search -->
    <div class="flex justify-end mb-6 gap-4">
      <router-link
        to="Boatickets"
        class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-200"
      >
        Book a New Boat
      </router-link>
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 p-5 bg-gradient-to-r from-purple-100 to-white border border-purple-200 rounded-lg shadow-sm">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍 Search by email, origin, or destination..."
        class="w-full lg:w-1/2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <div class="flex items-center gap-2">
        <label class="font-medium text-gray-700">Show:</label>
        <select
          v-model="itemsPerPage"
          class="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
    </div>

    <!-- Success message -->
    <div v-if="successMessage" class="mb-4 text-green-700 bg-green-100 border border-green-300 rounded-lg p-4 shadow-sm">
      {{ successMessage }}
    </div>

    <!-- Table -->
    <div v-if="filteredBookings.length" class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200 text-sm">
        <thead class="bg-purple-100 text-purple-900 text-left">
          <tr>
            <th class="py-3 px-5 border-b">ID</th>
            <th class="py-3 px-5 border-b">Date</th>
            <th class="py-3 px-5 border-b">From</th>
            <th class="py-3 px-5 border-b">To</th>
            <th class="py-3 px-5 border-b">Type</th>
            <th class="py-3 px-5 border-b">Name</th>
            <th class="py-3 px-5 border-b">Email</th>
            <th class="py-3 px-5 border-b">Status</th>
            <th class="py-3 px-5 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="booking in paginatedBookings"
            :key="booking.id"
            class="hover:bg-purple-50"
          >
            <td class="py-3 px-5 border-b font-medium text-purple-800">#{{ booking.id }}</td>
            <td class="py-3 px-5 border-b">{{ formatDate(booking.date) }}</td>
            <td class="py-3 px-5 border-b">{{ booking.origin }}</td>
            <td class="py-3 px-5 border-b">{{ booking.destination }}</td>
            <td class="py-3 px-5 border-b">{{ booking.boatType }}</td>
            <td class="py-3 px-5 border-b">{{ booking.passengerName }}</td>
            <td class="py-3 px-5 border-b">{{ booking.email }}</td>
            <td class="py-3 px-5 border-b">
              <span
                :class="statusBadgeClass(booking.status)"
                class="px-2 py-1 rounded text-xs font-semibold uppercase"
              >
                {{ booking.status || 'confirmed' }}
              </span>
            </td>
            <td class="py-3 px-5 border-b">
              <button
                v-if="booking.status !== 'cancelled'"
                @click="confirmCancel(booking.id)"
                :disabled="isPastDate(booking.date)"
                :title="isPastDate(booking.date) ? 'Cannot cancel past bookings' : 'Cancel booking'"
                class="px-4 py-1 text-sm rounded text-white"
                :class="isPastDate(booking.date) ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'"
              >
                Cancel
              </button>
              <span v-else class="italic text-gray-500">Cancelled</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Data -->
    <div v-else class="text-center text-gray-500 italic mt-8">
      No boat bookings found.
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex justify-center gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 rounded-full text-sm font-semibold',
          currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-100 text-purple-700 hover:bg-purple-200'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const bookings = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const successMessage = ref('')

const fetchBookings = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/boatbookings')
    bookings.value = res.data
  } catch (err) {
    console.error('Failed to fetch boat bookings', err)
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return isNaN(date) ? 'N/A' : date.toLocaleDateString()
}

const statusBadgeClass = (status) => {
  if (!status) return 'bg-green-100 text-green-800' // default active green
  switch (status.toLowerCase()) {
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const isPastDate = (dateStr) => {
  if (!dateStr) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const bookingDate = new Date(dateStr)
  bookingDate.setHours(0, 0, 0, 0)
  return bookingDate < today
}

const filteredBookings = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return bookings.value.filter(b =>
    b.email.toLowerCase().includes(q) ||
    b.origin.toLowerCase().includes(q) ||
    b.destination.toLowerCase().includes(q)
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredBookings.value.length / itemsPerPage.value)
)

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredBookings.value.slice(start, start + itemsPerPage.value)
})

// Confirm before cancel
const confirmCancel = async (id) => {
  if (!confirm('Are you sure you want to cancel this booking?')) return

  try {
    // Call API to update booking status to 'cancelled'
    await axios.put(`http://localhost:5000/api/boatbookings/${id}/cancel`)

    successMessage.value = '✅ Booking cancelled successfully.'
    await fetchBookings() // refresh list

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    alert('Failed to cancel booking. Please try again.')
    console.error(err)
  }
}

onMounted(fetchBookings)
</script>
