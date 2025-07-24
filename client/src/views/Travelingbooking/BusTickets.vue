<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">Book Your Ride</h1>

    <!-- Booking Form -->
    <form @submit.prevent="submitBooking" class="space-y-4 mb-10">
      <div>
        <label class="block font-semibold mb-1">From</label>
        <input v-model="form.depart" required class="w-full border rounded px-3 py-2 focus:outline-blue-500" />
      </div>

      <div>
        <label class="block font-semibold mb-1">To</label>
        <input v-model="form.arrive" required class="w-full border rounded px-3 py-2 focus:outline-blue-500" />
      </div>

      <div>
        <label class="block font-semibold mb-1">Transport Type</label>
        <select v-model="form.type" class="w-full border rounded px-3 py-2 focus:outline-blue-500">
          <option value="bus">🚌 Bus</option>
          <option value="private_car">🚗 Private Car</option>
        </select>
      </div>

      <div>
        <label class="block font-semibold mb-1">Date</label>
        <input type="date" v-model="form.date" required class="w-full border rounded px-3 py-2 focus:outline-blue-500" />
      </div>

      <div>
        <label class="block font-semibold mb-1">Email (for confirmation)</label>
        <input type="email" v-model="form.email" required class="w-full border rounded px-3 py-2 focus:outline-blue-500" />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Book Now
      </button>
    </form>

    <!-- Confirmation message -->
    <div v-if="confirmation" class="mb-6 p-4 bg-green-100 border border-green-400 rounded text-green-700">
      ✅ {{ confirmation }}
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
    const response = await axios.post('http://localhost:5000/api/bookings', form.value)

    router.push({
      name: 'BookingConfirmation',
      query: {
        ...form.value,
        price: 12.5 
      }
    })
  } catch (error) {
    confirmation.value = '❌ Booking failed'
    console.error(error)
  }
}
</script>

