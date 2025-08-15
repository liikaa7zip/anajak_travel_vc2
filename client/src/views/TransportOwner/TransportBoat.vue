<template>
  <h2 class="text-3xl font-extrabold text-gray-700 mt-6">⛵ Boat Bookings</h2>

  <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 mt-12">
    <!-- Left side: Search Input -->
    <div class="w-full md:w-auto">
      <input
        v-model="search"
        type="text"
        placeholder="Search by passenger, origin, or destination..."
        class="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
      />
    </div>

    <!-- Right side: Status Dropdown + Export Button -->
    <div class="flex flex-wrap gap-4 items-center w-full md:w-auto">
      <!-- Status Dropdown -->
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

      <!-- Export Button -->
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
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('userId')">User ID <SortIcon :active="sortKey === 'userId'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('passengerName')">Passenger Name <SortIcon :active="sortKey === 'passengerName'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('email')">Email <SortIcon :active="sortKey === 'email'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('origin')">Origin <SortIcon :active="sortKey === 'origin'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-left cursor-pointer" @click="sortBy('destination')">Destination <SortIcon :active="sortKey === 'destination'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-center cursor-pointer" @click="sortBy('boatType')">Boat Type <SortIcon :active="sortKey === 'boatType'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-center cursor-pointer" @click="sortBy('date')">Date <SortIcon :active="sortKey === 'date'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-right cursor-pointer" @click="sortBy('price')">Price <SortIcon :active="sortKey === 'price'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-center cursor-pointer" @click="sortBy('status')">Status <SortIcon :active="sortKey === 'status'" :asc="sortAsc" /></th>
          <th class="px-5 py-3 text-right cursor-pointer" @click="sortBy('action')">
            Action
            <SortIcon :active="sortKey === 'action'" :asc="sortAsc" />
          </th>
        </tr>
      </thead>

      <transition-group tag="tbody" name="fade" class="divide-y divide-gray-200">
        <tr
          v-for="booking in paginatedBookings"
          :key="booking.id"
          class="odd:bg-white even:bg-indigo-50 hover:bg-indigo-100 transition"
        >
          <td class="px-5 py-3 text-left">{{ booking.User?.username  || '—' }}</td>
          <td class="px-5 py-3 text-left">{{ booking.passengerName }}</td>
          <td class="px-5 py-3 text-left">{{ booking.email }}</td>
          <td class="px-5 py-3 text-left">{{ booking.origin }}</td>
          <td class="px-5 py-3 text-left">{{ booking.destination }}</td>
          <td class="px-5 py-3 text-center">{{ booking.boatType }}</td>
          <td class="px-5 py-3 text-center">{{ formatDate(booking.date) }}</td>
          <td class="px-5 py-3 text-right font-semibold">${{ booking.price ? Number(booking.price).toFixed(2) : '—' }}</td>
          <td class="px-5 py-3 text-center">
            <span
              :class="[
                'text-xs font-semibold px-3 py-1 rounded-full',
                booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                'bg-yellow-100 text-yellow-600'
              ]"
            >
              {{ booking.status }}
            </span>
          </td>
          <td class="px-5 py-3 text-right relative">
  <div class="inline-block text-left">
    <!-- Toggle Dropdown -->
    <button
      @click="toggleDropdown(booking.id)"
      class="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
    >
      ⋮ 
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="openDropdownId === booking.id"
      class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10"
      ref="dropdownRef"
    >
      <button
        @click="() => { markAsCompleted(booking.id); closeDropdown() }"
        class=" transport block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
      >
        ✅ Complete
      </button>
      <button
        @click="() => { deleteBooking(booking.id); closeDropdown() }"
        class="transport block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
      >
        🗑️ Delete
      </button>
    </div>
  </div>
</td>
        </tr>
      </transition-group>
    </table>
  </div>

  <!-- Pagination Controls -->
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
import { ref, computed, onMounted, h, onBeforeUnmount } from 'vue'
import axios from 'axios'

const bookings = ref([])
const search = ref('')
const statusFilter = ref('')
const page = ref(1)
const itemsPerPage = 10
const sortKey = ref('')
const sortAsc = ref(true)
const openDropdownId = ref(null)
const dropdownRef = ref(null)

function toggleDropdown(id) {
  openDropdownId.value = openDropdownId.value === id ? null : id
}

function closeDropdown() {
  openDropdownId.value = null
}


function handleClickOutside(event) {
  const el = dropdownRef.value;
  if (el && el.contains && !el.contains(event.target)) {
    showDropdown.value = false;
  }
}


onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

async function markAsCompleted(id) {
  try {
    await axios.put(`http://localhost:5000/api/boatbookings/${id}/complete`);
    const booking = bookings.value.find(b => b.id === id);
    if (booking) {
      booking.status = 'completed';
    }
  } catch (error) {
    console.error('Failed to complete booking:', error);
  }
}


async function deleteBooking(id) {
  if (!confirm('Are you sure you want to complete this booking?')) return;

  try {
    await axios.put(`http://localhost:5000/api/boatbookings/${id}/complete`);
    const completed = bookings.value.find(b => b.id === id);
    if (completed) {
      completedUsers.value.push(completed); // store in completed
      bookings.value = bookings.value.filter(b => b.id !== id); // remove from list
    }
    alert('Booking marked as completed.');
  } catch (error) {
    console.error('Failed to complete booking:', error);
    alert('Failed to complete booking.');
  }
}

const fetchBookings = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/boatbookings')
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
      b.origin?.toLowerCase().includes(s) ||
      b.destination?.toLowerCase().includes(s) ||
      b.passengerName?.toLowerCase().includes(s) ||
      b.email?.toLowerCase().includes(s) ||
      b.boatType?.toLowerCase().includes(s)

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
    PassengerName: b.passengerName,
    Email: b.email,
    Origin: b.origin,
    Destination: b.destination,
    BoatType: b.boatType,
    Date: formatDate(b.date),
    Price: Number(b.price).toFixed(2),
    Status: b.status,
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
  a.download = 'boat_bookings_export.csv'
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

.transport{
    font-size: 15px;
}
</style>
