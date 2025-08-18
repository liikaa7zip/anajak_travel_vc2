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
          <tr v-for="hotel in filteredHotels" :key="hotel.id" class="odd:bg-white even:bg-indigo-50 hover:bg-indigo-100 transition">
            <td class="px-5 py-3 truncate">{{ hotel.name }}</td>
            <td class="px-5 py-3 font-semibold">${{ hotel.pricePerNight.toFixed(2) }}</td>
            <td class="px-5 py-3">{{ hotel.owner?.email || '—' }}</td>
            <td class="px-5 py-3">{{ hotel.Location?.name || '—' }}</td>
            <td class="px-5 py-3 text-center flex justify-center gap-2">
  <button @click="deleteHotel(hotel.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">Delete</button>
  <button @click="editHotel(hotel)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">Edit</button>
</td>

          </tr>
        </tbody>
      </table>
    </div>

        <!-- Edit Hotel Modal -->
<div v-if="editingHotel" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
  <div class="bg-white rounded-2xl w-96 p-6 shadow-2xl transform transition-transform duration-300 scale-95 animate-slide-in">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 border-b pb-2">
      <h3 class="text-2xl font-bold text-purple-700 flex items-center gap-2">
        ✏️ Edit Hotel
      </h3>
      <button @click="editingHotel = null" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
    </div>

    <!-- Form -->
    <div class="flex flex-col gap-4">
      <div>
        <label class="text-gray-700 font-semibold mb-1 block">Hotel Name</label>
        <input
          v-model="editingHotel.name"
          placeholder="Enter hotel name"
          class="w-full border border-purple-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
      </div>

      <div>
        <label class="text-gray-700 font-semibold mb-1 block">Price per Night ($)</label>
        <input
          v-model="editingHotel.pricePerNight"
          type="number"
          placeholder="Enter price per night"
          class="w-full border border-purple-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
      </div>

      <div>
        <label class="text-gray-700 font-semibold mb-1 block">Image URL</label>
        <input
          v-model="editingHotel.imageUrl"
          placeholder="Enter image URL"
          class="w-full border border-purple-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
      </div>

      <div>
        <label class="text-gray-700 font-semibold mb-1 block">Description</label>
        <textarea
          v-model="editingHotel.description"
          placeholder="Enter hotel description"
          class="w-full border border-purple-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm resize-none"
          rows="3"
        ></textarea>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 mt-5">
      <button
        @click="editingHotel = null"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-xl transition"
      >
        Cancel
      </button>
      <button
        @click="saveHotel"
        class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition"
      >
        Save Changes
      </button>
    </div>
  </div>
</div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const hotels = ref([])
const search = ref('')
const editingHotel = ref(null)

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
    const name = h.name.toLowerCase()
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

// Cancel hotel (just an example: set status to cancelled)
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
    Location: h.location?.name || ''
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

// Open modal to edit hotel
const editHotel = (hotel) => {
  editingHotel.value = { ...hotel } // clone so changes don't immediately affect table
  console.log('Editing hotel:', editingHotel.value)
}


// Save hotel changes
const saveHotel = async () => {
  if (!editingHotel.value) return
  try {
    const { id, name, pricePerNight, imageUrl, description } = editingHotel.value
    await axios.put(`http://localhost:5000/api/admin-hotels/${id}`, 
      { name, pricePerNight, imageUrl, description },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    // Update local hotels array
    const index = hotels.value.findIndex(h => h.id === id)
    if (index !== -1) hotels.value[index] = { ...editingHotel.value }

    editingHotel.value = null // close modal
    alert('Hotel updated successfully!')
  } catch (err) {
    console.error('[UPDATE HOTEL ERROR]', err)
    alert('Failed to update hotel.')
  }
}

</script>

<style scoped>
table {
  border-spacing: 0 !important;
}

/* Optional animation for modal */
@keyframes slide-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-slide-in {
  animation: slide-in 0.25s ease-out forwards;
}
</style>
