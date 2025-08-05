<template>
  <h2 class="text-3xl font-extrabold text-gray-700 mt-6">🚌 Bus Bookings</h2>

  <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 mt-12">
    <!-- Search -->
    <div class="w-full md:w-auto">
      <input
        v-model="search"
        type="text"
        placeholder="Search by depart, arrive, or email..."
        class="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
      />
    </div>

    <!-- Status + Export -->
    <div class="flex flex-wrap gap-4 items-center w-full md:w-auto">
      <div class="relative w-full md:w-48">
        <select
          v-model="statusFilter"
          class="block appearance-none w-full bg-white border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <button
        @click="exportBookings"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
      >
        Export
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="overflow-x-auto rounded-lg shadow-inner border border-gray-200">
    <table class="min-w-full table-auto border-collapse">
      <thead class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white uppercase text-xs tracking-wider">
        <tr>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('UserId')">User ID <SortIcon :active="sortKey === 'UserId'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('depart')">Depart <SortIcon :active="sortKey === 'depart'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('arrive')">Arrive <SortIcon :active="sortKey === 'arrive'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-center cursor-pointer" @click="sortBy('type')">Type <SortIcon :active="sortKey === 'type'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-center cursor-pointer" @click="sortBy('date')">Date <SortIcon :active="sortKey === 'date'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('email')">Email <SortIcon :active="sortKey === 'email'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-center cursor-pointer" @click="sortBy('status')">Status <SortIcon :active="sortKey === 'status'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-right cursor-pointer" @click="sortBy('price')">Price <SortIcon :active="sortKey === 'price'" :asc="sortAsc" /></th>
        </tr>
      </thead>

      <transition-group tag="tbody" name="fade" class="divide-y divide-gray-200">
        <tr
          v-for="booking in paginatedBookings"
          :key="booking.id"
          class="odd:bg-white even:bg-indigo-50 hover:bg-indigo-100 transition"
        >
          <td class="px-5 py-3 text-left">{{ booking.User?.username  || '—' }}</td>
          <td class="px-5 py-3 text-left">{{ booking.depart }}</td>
          <td class="px-5 py-3 text-left">{{ booking.arrive }}</td>
          <td class="px-5 py-3 text-center">{{ booking.type }}</td>
          <td class="px-5 py-3 text-center">{{ formatDate(booking.date) }}</td>
          <td class="px-5 py-3 text-left">{{ booking.email }}</td>
          <td class="px-5 py-3 text-center">
            <span
              :class="[ 'text-xs font-semibold px-3 py-1 rounded-full',
                booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                'bg-yellow-100 text-yellow-600' ]"
            >
              {{ booking.status }}
            </span>
          </td>
          <td class="px-5 py-3 text-right font-semibold">${{ booking.price ? Number(booking.price).toFixed(2) : '—' }}</td>
        </tr>
      </transition-group>
    </table>
  </div>

  <!-- Pagination -->
  <div class="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0">
    <p class="text-gray-600 text-sm">
      Showing <span class="font-semibold">{{ paginatedBookings.length }}</span> of
      <span class="font-semibold">{{ filteredBookings.length }}</span> bookings (Page {{ page }} of {{ totalPages }})
    </p>

    <div class="inline-flex space-x-2">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-500 font-semibold hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        ❮
      </button>
      <button
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-500 font-semibold hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        ❯
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import axios from 'axios'

const bookings = ref([])
const search = ref('')
const statusFilter = ref('')
const page = ref(1)
const itemsPerPage = 10
const sortKey = ref('')
const sortAsc = ref(true)

const fetchBookings = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/bookings')
    bookings.value = response.data
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
  }
}

onMounted(fetchBookings)

const filteredBookings = computed(() => {
  const s = search.value.trim().toLowerCase()
  const status = statusFilter.value

  return bookings.value.filter(b => {
    const matchesSearch =
      !s ||
      b.depart?.toLowerCase().includes(s) ||
      b.arrive?.toLowerCase().includes(s) ||
      b.email?.toLowerCase().includes(s) ||
      b.type?.toLowerCase().includes(s)

    const matchesStatus = !status || b.status === status
    return matchesSearch && matchesStatus
  })
})

const sortedBookings = computed(() => {
  if (!sortKey.value) return filteredBookings.value

  return [...filteredBookings.value].sort((a, b) => {
    let valA = a[sortKey.value]
    let valB = b[sortKey.value]

    if (valA instanceof Date || !isNaN(Date.parse(valA))) valA = new Date(valA)
    if (valB instanceof Date || !isNaN(Date.parse(valB))) valB = new Date(valB)

    if (valA == null) valA = ''
    if (valB == null) valB = ''

    if (valA > valB) return sortAsc.value ? 1 : -1
    if (valA < valB) return sortAsc.value ? -1 : 1
    return 0
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredBookings.value.length / itemsPerPage)))
const startIndex = computed(() => (page.value - 1) * itemsPerPage)
const endIndex = computed(() => page.value * itemsPerPage)
const paginatedBookings = computed(() => sortedBookings.value.slice(startIndex.value, endIndex.value))

function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
  page.value = 1
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}

const SortIcon = {
  props: ['active', 'asc'],
  setup(props) {
    if (!props.active) return () => null
    return () =>
      props.asc
        ? h('svg', { xmlns: 'http://www.w3.org/2000/svg', class: 'inline h-3 w-3 ml-1', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
            [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '3', d: 'M5 15l7-7 7 7' })])
        : h('svg', { xmlns: 'http://www.w3.org/2000/svg', class: 'inline h-3 w-3 ml-1', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
            [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '3', d: 'M19 9l-7 7-7-7' })])
  },
}

function exportBookings() {
  const data = filteredBookings.value.map(b => ({
    User: b.User?.username || '—',
    Depart: b.depart,
    Arrive: b.arrive,
    Type: b.type,
    Date: formatDate(b.date),
    Email: b.email,
    Status: b.status,
    Price: Number(b.price).toFixed(2),
  }))

  const csvRows = []
  const headers = Object.keys(data[0] || {}).join(',')
  csvRows.push(headers)

  for (const row of data) {
    csvRows.push(Object.values(row).map(v => `"${v}"`).join(','))
  }

  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'bus_bookings_export.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
table {
  border-spacing: 0 !important;
}
</style>
