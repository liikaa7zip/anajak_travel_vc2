<template>
  <div class="max-w-2xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-lg mt-12 border border-purple-100">
    <h1 class="text-3xl font-extrabold text-center text-purple-700 mb-8">
      Flight Reservations 
    </h1>

    <form @submit.prevent="bookFlight" class="space-y-5">
      <!-- Origin -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Origin</label>
        <input
          v-model="form.origin"
          placeholder="Enter departure province"
          required
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      <!-- Destination -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Destination</label>
        <select
          v-model="form.destination"
          required
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          <option value="" disabled>Select a destination</option>
          <option>Phnom Penh</option>
          <option>Siem Reap</option>
          <option>Sihanoukville</option>
        </select>
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Date</label>
        <input
          type="date"
          v-model="form.date"
          required
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      <!-- Airline -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Airline</label>
        <select
          v-model="form.airline"
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          :disabled="!form.destination"
          required
        >
          <option value="" disabled>Select Airline</option>
          <option
            v-for="airline in availableAirlines"
            :key="airline"
            :value="airline"
          >
            {{ airline }}
          </option>
        </select>
      </div>

      <!-- Class Type -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Class Type</label>
        <select
          v-model="form.classType"
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
        >
          <option>Economy</option>
          <option>Business</option>
        </select>
      </div>

      <!-- Passengers -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Passengers</label>
        <select
          v-model="form.passengers"
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
        >
          <option v-for="n in 5" :key="n" :value="n">{{ n }} Passenger(s)</option>
        </select>
      </div>

      <!-- Auto-Calculated Price -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Price ($)</label>
        <input
          :value="computedPrice.toFixed(2)"
          readonly
          class="w-full bg-gray-100 border border-purple-300 px-4 py-2 rounded-lg focus:outline-none"
        />
        <p class="text-sm text-gray-500 mt-1">Auto-calculated based on airline, class, and passengers.</p>
      </div>

      <!-- Your Name -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Your Name</label>
        <input
          v-model="passengerName"
          placeholder="Full Name"
          required
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
        :disabled="loading"
      >
        Book Now
      </button>

      <!-- View History -->
      <div class="mt-8 text-center">
        <router-link
          to="FlightBookHistory"
          class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          View Booking History
        </router-link>
      </div>
    </form>

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
            @click="confirmation = ''"
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
      :bookingType="'Flight'"
      :bookingId="lastBooking.id"
      @cancel="showPaymentModal = false"
      @paid="handlePaymentComplete"
    />
    <!-- Booking Summary -->
    <transition name="fade">
      <div
        v-if="bookingConfirmed"
        class="mt-8 p-5 bg-green-50 border border-green-200 rounded-lg text-green-800"
      >
        <p class="font-semibold text-lg mb-2">✅ Booking Confirmed!</p>
        <p><strong>Flight:</strong> {{ lastBooking.origin }} ➡️ {{ lastBooking.destination }}</p>
        <p><strong>Date:</strong> {{ lastBooking.date }}</p>
        <p><strong>Name:</strong> {{ lastBooking.passengerName }}</p>
        <p><strong>Email:</strong> {{ lastBooking.email }}</p>
        <p><strong>Airline:</strong> {{ lastBooking.airline }}</p>
        <p><strong>Class:</strong> {{ lastBooking.classType }}</p>
        <p><strong>Passengers:</strong> {{ lastBooking.passengers }}</p>
        <p><strong>Price:</strong> ${{ lastBooking.price.toFixed(2) }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useAuth } from '@/stores/useAuth' // Adjust to your file path
import Payment from '@/components/Payment.vue'

const { userProfile, isLoggedIn } = useAuth()

const form = ref({
  origin: '',
  destination: '',
  date: '',
  airline: '',
  classType: 'Economy',
  passengers: 1,
  UserId: null,
})

const passengerName = ref('')
const email = ref('')
const confirmation = ref('')
const bookingConfirmed = ref(false)
const showPreConfirmationModal = ref(false)
const lastBooking = ref({})
const loading = ref(false)
const error = ref('')
const showPaymentModal = ref(false)

const airlinesByDestination = {
  'Phnom Penh': ['Cambodia Angkor Air', 'Cambodia Airways', 'AirAsia'],
  'Siem Reap': ['Cambodia Angkor Air', 'AirAsia'],
  'Sihanoukville': ['Cambodia Airways', 'AirAsia'],
}

const availableAirlines = computed(() => {
  return airlinesByDestination[form.value.destination] || []
})

const basePrices = {
  'Cambodia Angkor Air': 100,
  'AirAsia': 80,
  'Cambodia Airways': 90,
}

const classMultiplier = {
  'Economy': 1,
  'Business': 1.5,
}

const computedPrice = computed(() => {
  const base = basePrices[form.value.airline] || 0
  const multiplier = classMultiplier[form.value.classType] || 1
  const passengers = form.value.passengers || 1
  return base * multiplier * passengers
})

// Sync UserId with logged-in user profile
watch(
  () => userProfile.value,
  (newUser) => {
    form.value.UserId = newUser?.id || null
  },
  { immediate: true }
)

function bookFlight() {
  if (!isLoggedIn.value) {
    alert('Please log in to book a flight.')
    return
  }
  showPreConfirmationModal.value = true
}

function cancelBookingPreConfirmation() {
  showPreConfirmationModal.value = false
}

async function proceedBooking() {
  if (!isLoggedIn.value || !form.value.UserId) {
    alert('You must be logged in to proceed with booking.')
    return
  }

  // Close confirmation modal
  showPreConfirmationModal.value = false
  loading.value = true
  error.value = ''

  // Save booking data locally (NOT submitting yet)
  lastBooking.value = {
    ...form.value,
    price: computedPrice.value,
    passengerName: passengerName.value,
    email: email.value,
  }

  // Show payment modal
  showPaymentModal.value = true
  loading.value = false
}


async function handlePaymentComplete() {
  if (!lastBooking.value) return

  loading.value = true
  error.value = ''
  try {
    const res = await axios.post('http://localhost:5000/api/flightbookings', lastBooking.value)

    confirmation.value = `Your flight from ${res.data.origin} to ${res.data.destination} on ${res.data.date} has been booked and paid successfully!`
    lastBooking.value = res.data
    bookingConfirmed.value = true

    // Reset form
    form.value = {
      origin: '',
      destination: '',
      date: '',
      airline: '',
      classType: 'Economy',
      passengers: 1,
      UserId: form.value.UserId,
    }
    passengerName.value = ''
    email.value = ''
  } catch (err) {
    error.value = '❌ Booking failed after payment. Please contact support.'
    console.error(err)
  } finally {
    showPaymentModal.value = false
    loading.value = false
  }
}


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
