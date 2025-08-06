<template>
  <div class="max-w-2xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-lg mt-12 border border-purple-100">
    <h1 class="text-3xl font-extrabold text-center text-purple-700 mb-8">
      Bus Tickets Across Cambodia
    </h1>

    <!-- Booking Form -->
    <form @submit.prevent="submitBooking" class="grid gap-5">
      <!-- From -->
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

      <!-- To -->
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

      <!-- Transport Type -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">Transport Type</label>
        <select
          v-model="form.type"
          @change="updatePrice"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        >
          <option disabled value="">Select a transport type</option>
          <option value="bus">Bus</option>
          <option value="private_car">Private Car</option>
        </select>
        <p class="mt-1 text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-lg inline-block shadow-sm">
          Ticket Price: <span class="font-semibold">${{ form.price }}</span>
        </p>
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          v-model="form.date"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          v-model="form.email"
          required
          placeholder="Enter your email"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          :readonly="isLoggedIn"
          title="Email auto-filled from your account"
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        Book Now
      </button>
    </form>

    <!-- Confirmation Modal -->
    <div
      v-if="showPreConfirmationModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300"
      @click.self="cancelBookingPreConfirmation"
    >
      <div
        class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative transform transition-transform duration-300 scale-100"
        role="alertdialog"
        aria-modal="true"
      >
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
  @click="() => { confirmation = ''; resetForm() }"
  class="px-8 py-3 rounded-full bg-green-600 text-white font-bold hover:bg-green-700"
>
  OK
</button>

    </div>
  </div>
</div>


        <Payment
      v-if="showPaymentModal"
      :amount="lastBooking.price"
      :bookingType="lastBooking.type"
      :bookingId="lastBooking.id"
      @cancel="showPaymentModal = false"
      @paid="handlePaymentComplete"
    />

    <!-- View Booking History -->
    <div class="mt-8 text-center">
      <router-link
        to="/booking-history"
        class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
      >
        View Booking History
      </router-link>
    </div>

    <!-- Explore More -->
    <div class="mt-4 text-center">
      <router-link
        to="/Bustickets"
        class="inline-block text-purple-600 font-medium hover:underline hover:text-blue-800"
      >
        Explore Available Bus Tickets
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/useAuth' // Adjust path to your composable
import Payment from '@/components/Payment.vue'

const router = useRouter()
const { userProfile, isLoggedIn, initAuth } = useAuth()

// Transport type prices
const priceMap = {
  bus: 10,
  private_car: 30,
}

const resetForm = () => {
  form.value.depart = ''
  form.value.arrive = ''
  form.value.type = ''
  form.value.date = ''
  form.value.price = 0
  form.value.email = isLoggedIn.value ? userProfile.value.email : ''
  form.value.UserId = isLoggedIn.value ? userProfile.value.id : null
}


const form = ref({
  depart: '',
  arrive: '',
  type: '',
  date: '',
  email: '',
  price: 0,
  UserId: null, // Set dynamically from auth
})

const showPreConfirmationModal = ref(false)
const loading = ref(false)
const confirmation = ref('')
const isError = ref(false)
const showPaymentModal = ref(false)
const lastBooking = ref({}) 

const updatePrice = () => {
  form.value.price = priceMap[form.value.type] || 0
}

const submitBooking = () => {
  showPreConfirmationModal.value = true
}

const proceedBooking = async () => {
  loading.value = true
  showPreConfirmationModal.value = false
  isError.value = false

  form.value.UserId = userProfile.value?.id || null

  if (!form.value.UserId) {
    isError.value = true
    confirmation.value = '⚠️ You must be logged in to book tickets.'
    loading.value = false
    return
  }

  try {
    const response = await axios.post('http://localhost:5000/api/bookings', form.value)
    
    // Store booking info
    lastBooking.value = response.data.booking || form.value

    // Show payment modal first
    showPaymentModal.value = true
  } catch (error) {
    isError.value = true
    confirmation.value = error.response?.data?.message || 'Something went wrong.'
    console.error('Booking error:', error)
  } finally {
    loading.value = false
  }
}

const handlePaymentComplete = () => {
  showPaymentModal.value = false
  confirmation.value = `✅ Booking from ${lastBooking.value.depart} to ${lastBooking.value.arrive} confirmed on ${lastBooking.value.date}.`
  isError.value = false
  // Do NOT redirect here, just show the success modal
}



const cancelBookingPreConfirmation = () => {
  showPreConfirmationModal.value = false
  confirmation.value = '🚫 Booking was cancelled by user.'
  isError.value = true
}

onMounted(async () => {
  await initAuth()
  if (isLoggedIn.value && userProfile.value.email) {
    form.value.email = userProfile.value.email
    form.value.UserId = userProfile.value.id
  }
})

// Update form email and UserId if user profile changes dynamically
watch(userProfile, (newUser) => {
  if (newUser?.email) {
    form.value.email = newUser.email
    form.value.UserId = newUser.id
  }
})
</script>
