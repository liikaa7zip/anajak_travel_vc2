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
        <input
          v-model="form.destination"
          placeholder="Enter destination province"
          required
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
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
        >
          <option value="" disabled>Select Airline</option>
          <option>Cambodia Angkor Air</option>
          <option>AirAsia</option>
          <option>Cambodia Airways</option>
        </select>
      </div>

      <!-- Class Type -->
      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1"> Class Type</label>
        <select
          v-model="form.classType"
          class="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
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
        >
          <option v-for="n in 5" :key="n" :value="n">{{ n }} Passenger(s)</option>
        </select>
      </div>

      <!-- Passenger Name -->
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
      >
        Book Now
      </button>

      <!-- View History -->
        <div class="mt-8 text-center">
        <router-link
            to="/bookingflight-history"
            class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
            View Booking History
        </router-link>
        </div>
    </form>


    <!-- Pre-confirmation Modal -->
    <div
      v-if="showPreConfirmationModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="cancelBookingPreConfirmation"
    >
      <div
        class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
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

    <!-- Booking Confirmed Message -->
    <transition name="fade">
      <div
        v-if="bookingConfirmed"
        class="mt-8 p-5 bg-green-50 border border-green-200 rounded-lg text-green-800"
      >
        <p class="font-semibold text-lg mb-2">✅ Booking Confirmed!</p>
        <p><strong>Flight:</strong> {{ lastBooking.origin }} ➡️ {{ lastBooking.destination }}</p>
        <p><strong>Date:</strong> {{ lastBooking.date }}</p>
        <p><strong>Name:</strong> {{ lastBooking.name }}</p>
        <p><strong>Email:</strong> {{ lastBooking.email }}</p>
        <p><strong>Airline:</strong> {{ lastBooking.airline }}</p>
        <p><strong>Class:</strong> {{ lastBooking.classType }}</p>
        <p><strong>Passengers:</strong> {{ lastBooking.passengers }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  origin: '',
  destination: '',
  date: '',
  airline: '',
  classType: 'Economy',
  passengers: 1
})

const passengerName = ref('')
const email = ref('')
const confirmation = ref('')
const bookingConfirmed = ref(false)
const showPreConfirmationModal = ref(false)
const lastBooking = ref({})
const loading = ref(false)
const error = ref('')

function bookFlight() {
  showPreConfirmationModal.value = true
}

function cancelBookingPreConfirmation() {
  showPreConfirmationModal.value = false
}

async function proceedBooking() {
  showPreConfirmationModal.value = false
  loading.value = true
  error.value = ''

  const bookingData = {
    origin: form.value.origin,
    destination: form.value.destination,
    date: form.value.date,
    airline: form.value.airline,
    classType: form.value.classType,
    passengers: form.value.passengers,
    passengerName: passengerName.value,
    email: email.value
  }

  try {
    const res = await axios.post('http://localhost:5000/api/flightbookings', bookingData)

    confirmation.value = `Your flight from ${res.data.origin} to ${res.data.destination} on ${res.data.date} has been booked successfully!`
    lastBooking.value = res.data
    bookingConfirmed.value = true

    form.value = {
      origin: '',
      destination: '',
      date: '',
      airline: '',
      classType: 'Economy',
      passengers: 1
    }
    passengerName.value = ''
    email.value = ''
  } catch (err) {
    error.value = '❌ Booking failed. Please check your inputs or try again later.'
    console.error(err)
  } finally {
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

