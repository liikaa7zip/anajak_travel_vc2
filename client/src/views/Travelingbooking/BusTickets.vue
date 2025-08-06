<template>
  <div class="max-w-2xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-lg mt-12 border border-purple-100">
    <h1 class="text-3xl font-extrabold text-center text-purple-700 mb-8">
      Bus Tickets Across Cambodia
    </h1>

    <!-- Booking Form -->
    <!-- Booking Form -->
<form @submit.prevent="submitBooking" class="bg-white border border-purple-200 rounded-xl shadow-lg overflow-hidden md:flex">
  <!-- Left Panel (Form) -->
  <div class="md:w-3/4 p-6 space-y-4">
    <h2 class="text-xl font-bold text-purple-700 mb-4">Book Your Trip</h2>

    <!-- From / To -->
    <div class="flex gap-3">
      <input
        v-model="form.depart"
        required
        placeholder="From"
        class="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
      />
      <input
        v-model="form.arrive"
        required
        placeholder="To"
        class="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
      />
    </div>

    <!-- Date & Type -->
    <div class="flex gap-3">
      <input
        type="date"
        v-model="form.date"
        required
        class="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
      />
      <select
        v-model="form.type"
        @change="updatePrice"
        required
        class="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
      >
        <option disabled value="">Type</option>
        <option value="bus">Bus</option>
        <option value="private_car">Private Car</option>
      </select>
    </div>

    <!-- Email -->
    <input
      type="email"
      v-model="form.email"
      required
      placeholder="Your Email"
      :readonly="isLoggedIn"
      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
    />

    <!-- Submit -->
    <button
      type="submit"
      class="w-full mt-2 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
      :disabled="loading"
    >
      Book Now
    </button>
  </div>

  <!-- Right Panel (Seat selection + price) -->
  <div class="md:w-1/2 bg-purple-50 p-6 flex flex-col justify-between">
   <div>
    <h3 class="text-lg font-bold text-purple-800 mb-2">Choose Seat</h3>
    <div class="grid grid-cols-[1fr_auto_1fr] gap-2 w-full max-w-md mx-auto">
      <!-- Left side seats (6 rows x 2 columns) -->
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="seat in leftSeats"
          :key="seat.number"
          :class="[
            'py-2 rounded text-xs font-bold w-full h-10',
            seat.booked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
            form.seatNumber === seat.number ? 'bg-purple-600 text-white' :
            'bg-white border border-purple-400 text-purple-700 hover:bg-purple-100'
          ]"
          :disabled="seat.booked"
          @click="form.seatNumber = seat.number"
          type="button"
        >
          {{ seat.number }}
        </button>
      </div>

      <!-- Middle aisle with 1 special seat aligned with L11, L12, R11, R12 -->
      <div class="grid grid-rows-6">
        <div v-for="i in 5" :key="i" class="flex-grow"></div>
        <button
          v-if="middleSeat"
          :key="middleSeat.number"
          :class="[
            'py-2 rounded text-xs font-bold w-8 h-10 mt-2',
            middleSeat.booked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
            form.seatNumber === middleSeat.number ? 'bg-purple-600 text-white' :
            'bg-white border border-purple-400 text-purple-700 hover:bg-purple-100'
          ]"
          :disabled="middleSeat.booked"
          @click="form.seatNumber = middleSeat.number"
          type="button"
        >
          {{ middleSeat.number }}
        </button>
      </div>

      <!-- Right side seats (6 rows x 2 columns) -->
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="seat in rightSeats"
          :key="seat.number"
          :class="[
            'py-2 rounded text-xs font-bold w-full h-10',
            seat.booked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
            form.seatNumber === seat.number ? 'bg-purple-600 text-white' :
            'bg-white border border-purple-400 text-purple-700 hover:bg-purple-100'
          ]"
          :disabled="seat.booked"
          @click="form.seatNumber = seat.number"
          type="button"
        >
          {{ seat.number }}
        </button>
      </div>
    </div>
  </div>

    <!-- Price and seat summary -->
    <div class="mt-6 bg-white border border-purple-300 rounded-lg p-4 text-center shadow">
      <p class="text-sm text-gray-500">Selected Seat</p>
      <p class="text-lg font-bold text-purple-800">{{ form.seatNumber || 'None' }}</p>
      <p class="mt-2 text-sm text-gray-500">Ticket Price</p>
      <p class="text-xl font-extrabold text-purple-700">${{ form.price }}</p>
    </div>
  </div>
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

    <!-- Success Confirmation Modal -->
    <div
      v-if="confirmation"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300 ease-out"
      @click.self="confirmation = ''"
    >
      <div
        class="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative transform scale-95 transition-transform duration-300 ease-out"
        role="alertdialog"
        aria-modal="true"
      >
        <button
          @click="confirmation = ''"
          aria-label="Close"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none text-2xl"
        >
          &times;
        </button>

        <div
          class="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-600 text-white shadow-lg relative overflow-hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-10 h-10 animate-pulse-once"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <div class="absolute inset-0 rounded-full bg-white opacity-10 blur-xl scale-125"></div>
        </div>

        <h2 class="text-center text-2xl font-extrabold mb-3 text-green-800">
          Booking Successful!
        </h2>

        <p class="text-center text-gray-700 mb-8 text-base leading-relaxed">
          {{ confirmation }}
        </p>

        <div class="flex justify-center gap-4">
          <button
            @click="confirmation = ''"
            class="px-8 py-3 rounded-full bg-green-600 text-white font-bold transition-all duration-200 shadow-md hover:bg-green-700 hover:shadow-lg"
          >
            OK
          </button>
        </div>
      </div>
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
  seatNumber: 'null', 
  UserId: null, // Set dynamically from auth
})

const showPreConfirmationModal = ref(false)
const loading = ref(false)
const confirmation = ref('')
const isError = ref(false)
const showPaymentModal = ref(false)
const lastBooking = ref({}) 
const seats = ref([])

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
  await loadSeats()
})

// Update form email and UserId if user profile changes dynamically
watch(userProfile, (newUser) => {
  if (newUser?.email) {
    form.value.email = newUser.email
    form.value.UserId = newUser.id
  }
})

const loadSeats = async () => {
  const totalSeats = 25
  const bookedSeats = [3, 7, 12, 18] // ← Replace with real data from backend later

  seats.value = Array.from({ length: totalSeats }, (_, i) => {
    const number = i + 1
    return {
      number,
      booked: bookedSeats.includes(number)
    }
  })
}

const leftSeats = ref(
  Array.from({ length: 12 }, (_, i) => ({
    number: `L${i + 1}`,
    booked: false
  }))
);

const middleSeat = ref({
  number: 'M1',
  booked: false
});

const rightSeats = ref(
  Array.from({ length: 12 }, (_, i) => ({
    number: `R${i + 1}`,
    booked: false
  }))
);
</script>


<style scoped>
.grid.grid-cols-2 {
  grid-template-rows: repeat(6, minmax(0, 1fr)); /* Ensure consistent row heights */
}

.flex-col.relative {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* Match the height of the side grids */
}

/* Align middle seat with the third row (L11, L12, R11, R12) */
.flex-col.relative button {
  position: relative;
  top: calc(2 * (100% / 5)); /* Align with the third row (2 rows down in a 6-row grid) */
  transform: translateY(-50%); /* Center the button vertically within its row */
}
</style>