<template>
  <div class="max-w-2xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-xl mt-12 border border-purple-100">
    <h1 class="text-3xl font-extrabold text-center text-purple-700 mb-8">Car Ticket Booking</h1>

    <!-- Booking Form -->
    <form @submit.prevent="submitBooking" class="grid gap-5">
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1">Pickup Location</label>
        <input
          v-model="form.depart"
          required
          type="text"
          placeholder="e.g., Phnom Penh"
          class="w-full border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1">Drop-off Location</label>
        <input
          v-model="form.arrive"
          required
          type="text"
          placeholder="e.g., Siem Reap"
          class="w-full border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div class="relative">
        <label class="block text-sm font-semibold text-purple-700 mb-2 tracking-wide">Vehicle Type</label>
        <div class="relative">
          <select
            v-model="form.type"
            required
            class="appearance-none w-full bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-300 text-purple-800 font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm hover:shadow-md transition duration-200"
          >
            <option value="private_car">Private Car</option>
            <option value="van">Van</option>
            <option value="luxury">Luxury Car</option>
          </select>
          <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-purple-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-purple-600 mt-2 bg-purple-50 px-3 py-1 rounded-lg inline-block shadow-sm">
          Current Price: <span class="font-semibold text-purple-800">${{ form.price }}</span>
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1">Travel Date</label>
        <input
          type="date"
          v-model="form.date"
          required
          class="w-full border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1">Email</label>
        <input
          type="email"
          v-model="form.email"
          required
          placeholder="you@example.com"
          class="w-full border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button
        type="submit"
        class="bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-200 font-semibold"
        :disabled="loading"
      >
        Book Car
      </button>
    </form>

    <!-- Confirmation Modal -->
    <div
      v-if="showPreConfirmationModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="cancelBookingPreConfirmation"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
        <h2 class="text-center text-xl font-bold text-gray-800 mb-4">Confirm Your Booking</h2>
        <p class="text-center text-gray-600 mb-6">
          Proceed with booking from {{ form.depart }} to {{ form.arrive }} for ${{ form.price }}?
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="cancelBookingPreConfirmation"
            class="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="proceedBooking"
            class="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700"
            :disabled="loading"
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
        <div class="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-600 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-center text-2xl font-extrabold mb-3 text-green-800">Booking Successful!</h2>
        <p class="text-center text-gray-700 mb-8">{{ confirmation }}</p>
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

    <!-- Navigation -->
    <div class="mt-8 text-center">
      <router-link to="/booking-history" class="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-purple-800">
        View Booking History
      </router-link>
    </div>
    <div class="mt-4 text-center">
      <router-link to="/CarTickets" class="text-purple-600 hover:underline hover:text-purple-800">
        Explore Car Tickets
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/useAuth'

const router = useRouter()
const { userProfile } = useAuth()

const form = ref({
  depart: '',
  arrive: '',
  type: 'private_car',
  date: '',
  email: '',
  price: 0,
  UserId: null
})

const confirmation = ref('')
const showPreConfirmationModal = ref(false)
const loading = ref(false)

onMounted(() => {
  if (userProfile.value?.id) {
    form.value.UserId = userProfile.value.id
    form.value.email = userProfile.value.email
  }
})

// Price based on type
watch(
  () => form.value.type,
  (newType) => {
    form.value.price = newType === 'private_car' ? 25 :
                       newType === 'van' ? 18 :
                       newType === 'luxury' ? 40 : 0
  },
  { immediate: true }
)

const submitBooking = () => {
  showPreConfirmationModal.value = true
}

const cancelBookingPreConfirmation = () => {
  showPreConfirmationModal.value = false
  confirmation.value = '🚫 Booking was cancelled by user.'
}

const proceedBooking = async () => {
  showPreConfirmationModal.value = false
  loading.value = true

  try {
    await axios.post('http://localhost:5000/api/bookings', form.value)

    confirmation.value = `✅ Car booking from ${form.value.depart} to ${form.value.arrive} on ${form.value.date} confirmed. Vehicle: ${form.value.type}, Price: $${form.value.price}. Email sent to ${form.value.email}.`

    router.push({
      name: 'BookingConfirmation',
      query: { ...form.value }
    })
  } catch (error) {
    confirmation.value = '❌ Booking failed. Please try again.'
    console.error('Booking error:', error.response?.data || error.message)
  } finally {
    loading.value = false
  }
}
</script>
