<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Page Title -->
    <h1 class="text-4xl font-extrabold mb-8 text-center text-purple-700 drop-shadow-md">
      🧾 Your Booking History
    </h1>

    <!-- Button to Book -->
    <div class="flex justify-end mb-6">
      <router-link
        to="/Bustickets"
        class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-200"
      >
        ➕ Book a New Ticket
      </router-link>
    </div>

    <!-- Filter Section -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 p-5 bg-gradient-to-r from-purple-100 to-white border border-blue-100 rounded-lg shadow-sm">
      <!-- Search -->
      <div class="w-full lg:w-1/2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="🔍 Search by email, from, or to..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <!-- Per Page Dropdown -->
      <div class="flex items-center gap-2">
        <label class="font-medium text-gray-700">Show:</label>
        <select
          v-model="itemsPerPage"
          class="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="30">30</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-600 animate-pulse">
      Loading your bookings...
    </div>

    <!-- Error -->
    <div v-if="error" class="text-center text-red-600 font-medium mb-4">
      {{ error }}
    </div>

    <!-- No Bookings -->
    <div v-if="filteredBookings.length === 0 && !loading" class="text-center text-gray-500 italic">
      No bookings found.
    </div>

    <!-- Table -->
    <div v-if="filteredBookings.length > 0" class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
        <thead class="bg-purple-100 text-purple-900 text-left">
          <tr>
            <th class="py-3 px-5 border-b">Booking ID</th>
            <th class="py-3 px-5 border-b">Date</th>
            <th class="py-3 px-5 border-b">From</th>
            <th class="py-3 px-5 border-b">To</th>
            <th class="py-3 px-5 border-b">Type</th>
            <th class="py-3 px-5 border-b">Travel Date</th>
            <th class="py-3 px-5 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="booking in paginatedFilteredBookings"
            :key="booking.id"
            class="hover:bg-purple-50"
          >
            <td class="py-3 px-5 border-b font-medium text-purple-800">#{{ booking.id || 'N/A' }}</td>
            <td class="py-3 px-5 border-b">{{ formatDate(booking.createdAt) }}</td>
            <td class="py-3 px-5 border-b">{{ booking.depart || 'N/A' }}</td>
            <td class="py-3 px-5 border-b">{{ booking.arrive || 'N/A' }}</td>
            <td class="py-3 px-5 border-b">
              <span v-if="booking.type === 'bus'">🚌 Bus</span>
              <span v-else-if="booking.type === 'private_car'">🚗 Private Car</span>
              <span v-else>❓</span>
            </td>
            <td class="py-3 px-5 border-b">{{ booking.date || 'N/A' }}</td>
            <td class="py-3 px-5 border-b">{{ booking.email || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex flex-col items-center gap-2">
      <!-- Page Numbers -->
      <div class="flex gap-2 flex-wrap justify-center">
        <button
          v-for="page in getPaginationRange"
          :key="page"
          @click="typeof page === 'number' && goToPage(page)"
          :class="[
            'w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition',
            page === currentPage ? 'bg-purple-600 text-white' : 'text-gray-800 hover:bg-gray-200',
            page === '...' ? 'cursor-default text-gray-400' : 'cursor-pointer'
          ]"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>

      <!-- Showing Info -->
      <div class="text-sm text-gray-600">
        Showing results
        {{ (currentPage - 1) * itemsPerPage + 1 }}–{{ Math.min(currentPage * itemsPerPage, totalResults) }}
        of {{ totalResults }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// State
const bookings = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

// Fetch bookings
const fetchBookingHistory = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get('http://localhost:5000/api/bookings')
    bookings.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load booking history'
    bookings.value = []
  } finally {
    loading.value = false
  }
}

// Format Date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return isNaN(date)
    ? 'N/A'
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Filtering
const filteredBookings = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return bookings.value.filter(b =>
    b.email?.toLowerCase().includes(q) ||
    b.depart?.toLowerCase().includes(q) ||
    b.arrive?.toLowerCase().includes(q)
  )
})

// Pagination
const totalResults = computed(() => filteredBookings.value.length)
const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value))
const paginatedFilteredBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredBookings.value.slice(start, end)
})
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
const getPaginationRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2
  const range = []

  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }

  if (range[0] > 2) range.unshift('...')
  if (range[0] !== 1) range.unshift(1)
  if (range[range.length - 1] < total - 1) range.push('...')
  if (range[range.length - 1] !== total) range.push(total)

  return range
})

// Init
onMounted(fetchBookingHistory)
</script>
