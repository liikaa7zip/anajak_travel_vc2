<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-10">
    <h2 class="text-2xl font-bold text-purple-700 mb-6 text-center"> Book Your Boat</h2>

    <form @submit.prevent="showPreConfirmationModal = true" class="space-y-4">
      <input
        v-model="form.origin"
        type="text"
        readonly
        class="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
      />

      <input
        v-model="form.destination"
        type="text"
        placeholder="Destination"
        required
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <select
        v-model="form.boatType"
        required
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option disabled value="">Select Boat Type</option>
        <option>Speed Boat</option>
        <option>Ferry</option>
        <option>Longtail Boat</option>
      </select>

      <input
        v-model="form.date"
        type="date"
        required
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <input
        v-model="form.passengerName"
        type="text"
        placeholder="Your Full Name"
        required
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <input
        v-model="form.email"
        type="email"
        placeholder="Your Email"
        required
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        type="submit"
        class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-200"
      >
        Book Now
      </button>
    </form>

    <!-- Back and History Buttons -->
    <div class="mt-6 flex flex-col sm:flex-row justify-between gap-4 text-center">
      <router-link
        to="/Boatickets"
        class="w-full sm:w-auto inline-block bg-gray-200 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-300 transition"
      >
        Back to Province Selection
      </router-link>
      <router-link
        to="/BookBoatHistory"
        class="w-full sm:w-auto inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
      >
         View Boat Booking History
      </router-link>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showPreConfirmationModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="cancelBookingPreConfirmation"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
        <h2 class="text-center text-xl font-bold text-gray-800 mb-4">Confirm Your Booking</h2>
        <p class="text-center text-gray-600 mb-6">Do you want to continue with this booking?</p>
        <div class="flex justify-center gap-4">
          <button
            @click="cancelBookingPreConfirmation"
            class="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            @click="proceedBooking"
            class="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Yes, Book Now
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="confirmation"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="confirmation = ''"
    >
      <div class="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative">
        <button
          @click="confirmation = ''"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <div class="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-600 text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 class="text-center text-2xl font-extrabold mb-3 text-green-800">Booking Successful!</h2>
        <p class="text-center text-gray-700 mb-8 text-base leading-relaxed">
          {{ confirmation }}
        </p>

        <div class="flex justify-center">
          <button
            @click="confirmation = ''"
            class="px-8 py-3 rounded-full bg-green-600 text-white font-bold hover:bg-green-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const form = ref({
  origin: '',
  destination: '',
  boatType: '',
  date: '',
  passengerName: '',
  email: ''
})

const confirmation = ref('')
const showPreConfirmationModal = ref(false)

onMounted(() => {
  form.value.origin = route.query.origin || ''
  form.value.destination = route.query.destination || ''
})

function cancelBookingPreConfirmation() {
  showPreConfirmationModal.value = false
}

async function proceedBooking() {
  try {
    const res = await axios.post('http://localhost:5000/api/boatbookings', form.value)
    confirmation.value = `Your boat from ${res.data.origin} to ${res.data.destination} on ${res.data.date} has been booked successfully!`

    // Reset the form
    form.value = {
      origin: '',
      destination: '',
      boatType: '',
      date: '',
      passengerName: '',
      email: ''
    }

    showPreConfirmationModal.value = false
  } catch (err) {
    console.error(err)
    confirmation.value = '❌ Booking failed. Please try again.'
    showPreConfirmationModal.value = false
  }
}
</script>
