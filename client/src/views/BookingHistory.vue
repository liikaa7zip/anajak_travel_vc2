<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-4xl font-extrabold mb-8 text-center text-purple-700 drop-shadow-md">
      Your Booking History
    </h1>

    <div class="flex justify-end mb-6 gap-4">
      <router-link
        to="/Bustickets"
        class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-200"
      >
        Book a New Bus Ticket
      </router-link>
      <router-link
        to="/carRental"
        class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-200"
      >
        Go to Car Rental
      </router-link>
    </div>

    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 p-5 bg-gradient-to-r from-purple-100 to-white border border-blue-100 rounded-lg shadow-sm">
      <div class="w-full lg:w-1/2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="🔍 Search by email, from, or to..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
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

    <div v-if="loading" class="text-center text-gray-600 animate-pulse">
      Loading your bookings...
    </div>

    <div v-if="error" class="text-center text-red-600 font-medium mb-4">
      {{ error }}
    </div>

    <div v-if="filteredBookings.length === 0 && !loading" class="text-center text-gray-500 italic">
      No bookings found.
    </div>

    <div v-if="filteredBookings.length > 0" class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
        <thead class="bg-purple-100 text-purple-900 text-left">
          <tr>
            <th class="py-3 px-5 border-b">Booking ID</th>
            <th class="py-3 px-5 border-b">Date</th>
            <th class="py-3 px-5 border-b">From</th>
            <th class="py-3 px-5 border-b">To</th>
            <th class="py-3 px-5 border-b">Travel Date</th>
            <th class="py-3 px-5 border-b">Phone</th>
            <th class="py-3 px-5 border-b">Price</th>
            <th class="py-3 px-5 border-b">Seat</th>
            <th class="py-3 px-5 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="booking in paginatedFilteredBookings"
            :key="booking.id"
            class="hover:bg-purple-50"
          >
            <td class="py-3 px-5 border-b font-medium text-purple-800">#{{ booking.id }}</td>
            <td class="py-3 px-5 border-b">{{ formatDate(booking.createdAt) }}</td>
            <td class="py-3 px-5 border-b">{{ booking.depart }}</td>
            <td class="py-3 px-5 border-b">{{ booking.arrive }}</td>
            <td class="py-3 px-5 border-b">{{ booking.date }}</td>
            <td class="py-3 px-5 border-b">{{ booking.phone }}</td>
            <td class="py-3 px-5 border-b font-semibold text-green-700">${{ booking.price?.toFixed(2) || '0.00' }}</td>
            <td class="py-3 px-5 border-b">
              {{ Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : booking.seatNumbers || '—' }}
            </td>
            <td class="py-3 px-5 border-b">
      <button
        v-if="booking.status !== 'cancelled'"
        @click="confirmCancel(booking.id)"
        :disabled="isTravelDatePast(booking.date) || booking.status === 'completed'"
        :class="[
          'px-4 py-1 text-sm rounded text-white',
          (isTravelDatePast(booking.date) || booking.status === 'completed')
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        ]"
        :title="(isTravelDatePast(booking.date) ? 'Cannot cancel past travel date' : '') + (booking.status === 'completed' ? ' Cannot cancel completed booking' : '')"
      >
        Cancel
      </button>
      <span v-else class="italic text-gray-500">Cancelled</span>
    </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="mt-6 flex flex-col items-center gap-2">
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
import { useAuth } from '@/stores/useAuth'

const { userProfile, initAuth } = useAuth()
const bookings = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

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

const confirmCancel = async (id) => {
  const confirmed = window.confirm('Are you sure you want to cancel this booking?')
  if (!confirmed) return

  try {
    await axios.patch(`http://localhost:5000/api/bookings/${id}/cancel`)
    await fetchBookingHistory()
    alert('Booking cancelled successfully.')
  } catch (err) {
    const msg = err.response?.data?.message || 'Failed to cancel booking.'
    alert(msg)
  }
}


const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return isNaN(date)
    ? 'N/A'
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusBadgeClass = (status) => {
  if (!status) return 'bg-gray-100 text-gray-600'
  switch (status.toLowerCase()) {
    case 'confirmed': return 'bg-green-100 text-green-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'completed': return 'bg-gray-100 text-gray-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const isTravelDatePast = (travelDateStr) => {
  if (!travelDateStr) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const travelDate = new Date(travelDateStr)
  travelDate.setHours(0, 0, 0, 0)
  return travelDate < today
}

const userBookings = computed(() => {
  if (!userProfile.value?.id) return []
  return bookings.value.filter(b => b.UserId === userProfile.value.id)
})

const filteredBookings = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return userBookings.value.filter(b =>
    b.email?.toLowerCase().includes(q) ||
    b.depart?.toLowerCase().includes(q) ||
    b.arrive?.toLowerCase().includes(q)
  )
})

const totalResults = computed(() => filteredBookings.value.length)
const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value))
const paginatedFilteredBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredBookings.value.slice(start, start + itemsPerPage.value)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
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

onMounted(async () => {
  await initAuth()
  await fetchBookingHistory()
})
</script>
