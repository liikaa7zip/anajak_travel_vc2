<template>
  <div>
    <h2 class="text-3xl font-extrabold text-gray-700 mt-6">🏨 Hotel Management</h2>

    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 mt-12">
      <!-- Search -->
      <div class="w-full md:w-auto">
        <input
          v-model="search"
          type="text"
          placeholder="Search by Hotel name or Owner..."
          class="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap gap-4 items-center w-full md:w-auto">
        <!-- Create Hotel Button -->
        <router-link
          to="/admin/create-hotel"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition inline-block"
        >
          ➕ Create Hotel
        </router-link>

        <!-- Export Button -->
        <button
          @click="exportHotels"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
        >
          Export
        </button>
      </div>
    </div>

    <!-- Hotel Table -->
    <div class="overflow-x-auto rounded-lg shadow-inner border border-gray-200">
      <table class="min-w-full table-auto border-collapse">
        <thead class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white uppercase text-xs tracking-wider">
          <tr>
            <th class="px-5 py-3 text-left">Hotel Name</th>
            <th class="px-5 py-3 text-left">Price/Night</th>
            <th class="px-5 py-3 text-left">Owner Email</th>
            <th class="px-5 py-3 text-left">Location</th>
            <th class="px-5 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="hotel in filteredHotels"
            :key="hotel.id"
            class="odd:bg-white even:bg-indigo-50 hover:bg-indigo-100 transition"
          >
            <td class="px-5 py-3 truncate">{{ hotel.name }}</td>
            <td class="px-5 py-3 font-semibold">${{ hotel.pricePerNight.toFixed(2) }}</td>
            <td class="px-5 py-3">{{ hotel.owner?.email || '—' }}</td>
            <td class="px-5 py-3">{{ hotel.Location?.name || '—' }}</td>
            <td class="px-5 py-3 text-center flex justify-center gap-2">
              <button
                @click="deleteHotel(hotel.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
              >
                Delete
              </button>
              <button
                @click="cancelHotel(hotel.id)"
                class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-sm transition"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const hotels = ref([])
const search = ref('')

const token = localStorage.getItem('token')

// Fetch all hotels
const fetchHotels = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/admin-hotels', {
      headers: { Authorization: `Bearer ${token}` }
    })
    hotels.value = res.data
  } catch (err) {
    console.error('[FETCH HOTELS ERROR]', err)
  }
}

onMounted(fetchHotels)

// Filter by name or owner email
const filteredHotels = computed(() => {
  const s = search.value.trim().toLowerCase()
  return hotels.value.filter(h => {
    const name = h.name?.toLowerCase() || ''
    const ownerEmail = h.owner?.email?.toLowerCase() || ''
    return !s || name.includes(s) || ownerEmail.includes(s)
  })
})

// Delete hotel
const deleteHotel = async (id) => {
  if (!confirm('Are you sure you want to delete this hotel?')) return
  try {
    await axios.delete(`http://localhost:5000/api/admin-hotels/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    hotels.value = hotels.value.filter(h => h.id !== id)
    alert('Hotel deleted successfully!')
  } catch (err) {
    console.error('[DELETE HOTEL ERROR]', err)
    alert('Failed to delete hotel.')
  }
}

// Cancel hotel
const cancelHotel = async (id) => {
  try {
    await axios.patch(`http://localhost:5000/api/admin-hotels/${id}/cancel`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const hotel = hotels.value.find(h => h.id === id)
    if (hotel) hotel.status = 'cancelled'
    alert('Hotel cancelled successfully!')
  } catch (err) {
    console.error('[CANCEL HOTEL ERROR]', err)
    alert('Failed to cancel hotel.')
  }
}

// Export hotels to CSV
const exportHotels = () => {
  const data = filteredHotels.value.map(h => ({
    Name: h.name,
    Price: h.pricePerNight.toFixed(2),
    Owner: h.owner?.email || '',
    Location: h.Location?.name || ''
  }))
  if (!data.length) return

  const csvRows = []
  const headers = Object.keys(data[0]).join(',')
  csvRows.push(headers)
  for (const row of data) {
    csvRows.push(Object.values(row).map(v => `"${v}"`).join(','))
  }

  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hotels_export.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
table {
  border-spacing: 0 !important;
}
</style>
