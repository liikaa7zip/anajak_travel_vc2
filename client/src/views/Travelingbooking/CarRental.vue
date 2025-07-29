<template>
  <div class="max-w-2xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-xl mt-12 border border-purple-100">
    <h1 class="text-3xl font-extrabold text-center text-purple-700 mb-8">
       Car Ticket Booking
    </h1>

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

      <div>
        <label class="block text-sm font-medium text-purple-700 mb-1">Vehicle Type</label>
        <select
          v-model="form.type"
          class="w-full border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="private_car"> Private Car</option>
          <option value="van"> Van</option>
          <option value="luxury"> Luxury Car</option>
        </select>
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
      >
        Book Car
      </button>
    </form>

    <!-- Confirmation Message Modal -->
<div
    v-if="showPreConfirmationModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300 ease-out"
    :class="{ 'opacity-100': showPreConfirmationModal, 'opacity-0': !showPreConfirmationModal }"
    @click.self="cancelBookingPreConfirmation"
  >
    <div
      class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative transform scale-95 transition-transform duration-300 ease-out"
      :class="{ 'scale-100': showPreConfirmationModal }"
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

    <!-- Success Confirmation Modal -->
    <div
      v-if="confirmation"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300 ease-out"
      @click.self="confirmation = ''"
    >
      <div
        class="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative transform scale-95 transition-transform duration-300 ease-out scale-100"
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

    <!-- Booking History -->
    <div class="mt-8 text-center">
      <router-link
        to="/booking-history"
        class="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        View Booking History
      </router-link>
    </div>

    <!-- Explore Car Tickets -->
    <div class="mt-4 text-center">
      <router-link
        to="/CarTickets"
        class="text-purple-600 hover:underline hover:text-purple-800"
      >
         Explore Car Tickets
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

const showPreConfirmationModal = ref(false)

const proceedBooking = async () => {
  showPreConfirmationModal.value = false; 

  try {
    await axios.post('http://localhost:5000/api/bookings', form.value)

    confirmation.value = `✅ Booking successfully completed from ${form.value.depart} to ${form.value.arrive} on ${form.value.date}. Details have been sent to ${form.value.email}.`

    router.push({
      name: 'BookingConfirmation',
      query: {
        ...form.value,
        price: 12.5
      }
    })
  } catch (error) {
    confirmation.value = '.'
    console.error('Booking error:', error.response ? error.response.data : error.message)
  } finally {
    loading.value = false
  }
}

const submitBooking = () => {
  showPreConfirmationModal.value = true
}

const cancelBookingPreConfirmation = () => {
  showPreConfirmationModal.value = false
  confirmation.value = '🚫 Booking was cancelled by user.'
}

</script>
