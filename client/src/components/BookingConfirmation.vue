<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-white py-10 px-4">
    <div class="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-6 border border-blue-200">
      <h1 class="text-2xl font-bold text-blue-700 mb-6 text-center">🎉 Booking Confirmed!</h1>

      <div class="space-y-4 text-gray-800">
        <div>
          <strong>From:</strong> {{ booking.depart }}
        </div>
        <div>
          <strong>To:</strong> {{ booking.arrive }}
        </div>
        <div>
          <strong>Transport:</strong> {{ booking.type === 'bus' ? 'Bus' : 'Private Car' }}
        </div>
        <div>
          <strong>Date:</strong> {{ booking.date }}
        </div>
        <div>
          <strong>Price:</strong> ${{ booking.price.toFixed(2) }}
        </div>
        <div>
          <strong>Email:</strong> {{ booking.email }}
        </div>
      </div>

      <div class="mt-6 text-center">
        <p class="text-green-600 text-lg">✅ Thank you for booking with Anajak Travel!</p>
        <router-link to="/" class="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const booking = {
  ...route.query,
  price: parseFloat(route.query.price) || 0
}
</script>
