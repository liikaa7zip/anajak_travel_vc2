<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <h2 class="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
      🏨 Create a New Hotel
    </h2>

    <form @submit.prevent="createHotel" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Hotel Name -->
      <div class="flex flex-col">
        <label class="text-sm font-semibold text-gray-700 mb-1">Hotel Name</label>
        <input v-model="form.name" type="text" required class="input-field" placeholder="Hotel Sunshine" />
      </div>

      <!-- Price -->
      <div class="flex flex-col">
        <label class="text-sm font-semibold text-gray-700 mb-1">Price per Night</label>
        <input v-model.number="form.pricePerNight" type="number" step="0.01" required class="input-field" placeholder="120" />
      </div>

      <!-- Location -->
      <div class="flex flex-col">
        <label class="text-sm font-semibold text-gray-700 mb-1">Location</label>
        <select v-model="form.locationId" required class="input-field">
          <option value="" disabled>Select a location</option>
          <option v-for="loc in locations" :key="loc.id" :value="loc.id">
            {{ loc.name }}
          </option>
        </select>
      </div>

      <!-- Owner Email -->
      <div class="flex flex-col">
        <label class="text-sm font-semibold text-gray-700 mb-1">Owner Email</label>
        <input v-model="form.ownerEmail" type="email" class="input-field" placeholder="Enter owner's Gmail" />
      </div>

      <!-- Image URL -->
      <div class="flex flex-col md:col-span-2">
        <label class="text-sm font-semibold text-gray-700 mb-1">Image URL</label>
        <input v-model="form.imageUrl" type="url" class="input-field" placeholder="https://example.com/hotel.jpg" />
        <div v-if="form.imageUrl" class="mt-2">
          <img :src="form.imageUrl" alt="Preview" class="rounded-md shadow-sm max-h-28 object-cover border border-gray-200" />
        </div>
      </div>

      <!-- Description -->
      <div class="flex flex-col md:col-span-2">
        <label class="text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea v-model="form.description" rows="3" class="input-field" placeholder="A lovely hotel with a scenic view..."></textarea>
      </div>

      <!-- Submit + Cancel -->
      <div class="md:col-span-2 flex justify-end gap-2">
        <router-link
          to="/admin/admin-hotel"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg shadow-md transition flex items-center justify-center"
        >
          Cancel
        </router-link>

        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
        >
          Create Hotel
        </button>
      </div>
    </form>

    <!-- Message -->
    <div v-if="message" :class="message.includes('success') ? 'text-green-600' : 'text-red-600'" class="mt-3 font-medium">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  name: '',
  description: '',
  pricePerNight: null,
  imageUrl: '',
  locationId: null,
  ownerEmail: '' // bind email directly
})

const message = ref('')
const locations = ref([])
const token = localStorage.getItem('token')

// Fetch locations
const fetchLocations = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/locations', {
      headers: { Authorization: `Bearer ${token}` }
    })
    locations.value = res.data
  } catch (err) {
    console.error('[FETCH LOCATIONS ERROR]', err)
  }
}

// Create hotel
const createHotel = async () => {
  try {
    if (!token) {
      message.value = '❌ You are not logged in.'
      return
    }

    const response = await axios.post(
      'http://localhost:5000/api/admin-hotels',
      form.value,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    message.value = '✅ Hotel created successfully!'
    console.log('[CREATE HOTEL] Response:', response.data)

    // Reset form
    form.value = {
      name: '',
      description: '',
      pricePerNight: null,
      imageUrl: '',
      locationId: null,
      ownerEmail: ''
    }
  } catch (error) {
    console.error('[CREATE HOTEL] Error:', error)
    if (error.response?.status === 401) {
      message.value = '❌ Unauthorized. Please log in again.'
    } else if (error.response?.data?.error) {
      message.value = `❌ ${error.response.data.error}`
    } else {
      message.value = '❌ Error creating hotel.'
    }
  }
}

onMounted(fetchLocations)
</script>

<style scoped>
.input-field {
  @apply mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm
         focus:border-purple-500 focus:ring focus:ring-purple-200 transition;
}
</style>
