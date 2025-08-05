<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">🏨 Your Hotels</h2>

    <div v-if="hotels.length === 0" class="text-gray-500">
      No hotels created yet.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="hotel in hotels" :key="hotel.id" class="bg-white shadow p-4 rounded-xl">
        <img :src="hotel.imageUrl" alt="Hotel Image" class="w-full h-48 object-cover rounded mb-2">
        <h3 class="text-xl font-semibold">{{ hotel.name }}</h3>
        <p class="text-gray-600 text-sm">{{ hotel.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      hotels: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5000/api/owner/hotels', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.hotels = response.data
    } catch (error) {
      console.error('Error loading hotels:', error)
    }
  }
}
</script>
