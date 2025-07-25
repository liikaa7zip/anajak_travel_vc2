<template>
  <div class="max-w-2xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-lg mt-12 border border-purple-100">
    <h1 class="text-3xl font-extrabold text-center text-purple-700 mb-8">
      🚌 Bus Tickets Across Cambodia
    </h1>

    <!-- Booking Form -->
    <form @submit.prevent="submitBooking" class="grid gap-5">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">From</label>
        <input
          v-model="form.depart"
          required
          type="text"
          placeholder="Departure location"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">To</label>
        <input
          v-model="form.arrive"
          required
          type="text"
          placeholder="Arrival location"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Transport Type</label>
        <select
          v-model="form.type"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="bus">🚌 Bus</option>
          <option value="private_car">🚗 Private Car</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          v-model="form.date"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          v-model="form.email"
          required
          placeholder="Enter your email"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button
        type="submit"
        class="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
      >
        Book Now
      </button>
    </form>

    <!-- Confirmation Message -->
    <div
      v-if="confirmation"
      class="mt-6 p-4 bg-purple-100 border border-purple-400 text-purple-700 rounded-lg text-center"
    >
      ✅ {{ confirmation }}
    </div>

    <!-- View Booking History -->
    <div class="mt-8 text-center">
      <router-link
        to="/booking-history"
        class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
      >
        View Booking History
      </router-link>
    </div>

    <!-- Extra Button: Go to /Bustickets -->
    <div class="mt-4 text-center">
      <router-link
        to="/Bustickets"
        class="inline-block text-purple-600 font-medium hover:underline hover:text-blue-800"
      >
        🚍 Explore Available Bus Tickets
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  depart: '',
  arrive: '',
  type: 'bus',
  date: '',
  email: ''
})

const confirmation = ref('')

const submitBooking = async () => {
  try {
    await axios.post('http://localhost:5000/api/bookings', form.value)

    router.push({
      name: 'BookingConfirmation',
      query: {
        ...form.value,
        price: 12.5 // Dummy price
      }
    })
  } catch (error) {
    confirmation.value = '❌ Booking failed. Please try again.'
    console.error(error)
  }
}
</script>
