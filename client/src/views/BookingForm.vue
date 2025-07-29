<template>
  <div class="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Hotel Booking</h2>

    <form @submit.prevent="submitBooking">
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Select Hotel</label>
        <select v-model="form.hotelId" @change="updatePrice" required class="w-full border rounded px-3 py-2">
          <option value="" disabled>Select a hotel</option>
          <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">
            {{ hotel.name }} - ${{ hotel.pricePerNight }} per night
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Check-In Date</label>
        <input type="date" v-model="form.checkInDate" @change="updatePrice" required class="w-full border rounded px-3 py-2" />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Check-Out Date</label>
        <input type="date" v-model="form.checkOutDate" @change="updatePrice" required class="w-full border rounded px-3 py-2" />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Number of Guests</label>
        <input type="number" v-model.number="form.guests" min="1" required class="w-full border rounded px-3 py-2" />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Total Price</label>
        <input type="number" :value="form.totalPrice.toFixed(2)" readonly class="w-full border bg-gray-100 rounded px-3 py-2" />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
        Book Now
      </button>
    </form>

    <p v-if="message" :class="{'text-green-600': success, 'text-red-600': !success}" class="mt-4 font-semibold">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  hotelId: '',
  checkInDate: '',
  checkOutDate: '',
  guests: 1,
  userId: null,
  totalPrice: 0
})

const hotels = ref([])
const message = ref('')
const success = ref(false)

// Fetch hotels
const fetchHotels = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/hotels')
    hotels.value = res.data
  } catch (error) {
    message.value = 'Failed to load hotels.'
  }
}

// Calculate total price
const updatePrice = () => {
  const hotel = hotels.value.find(h => h.id === form.value.hotelId)
  if (!hotel || !form.value.checkInDate || !form.value.checkOutDate) {
    form.value.totalPrice = 0
    return
  }
  const checkIn = new Date(form.value.checkInDate)
  const checkOut = new Date(form.value.checkOutDate)
  const diffTime = checkOut - checkIn
  const nights = diffTime / (1000 * 60 * 60 * 24)

  if (nights <= 0) {
    form.value.totalPrice = 0
    return
  }

  form.value.totalPrice = parseFloat((nights * hotel.pricePerNight).toFixed(2))
}

// On mount: get userId from localStorage
onMounted(() => {
  fetchHotels()

  const user = localStorage.getItem('user')
  if (user) {
    form.value.userId = JSON.parse(user).id
  } else {
    message.value = 'Please log in to book a hotel.'
  }
})

// Submit booking
const submitBooking = async () => {
  message.value = ''
  success.value = false

  if (!form.value.userId) {
    message.value = 'User not logged in.'
    return
  }

  if (!form.value.hotelId || !form.value.checkInDate || !form.value.checkOutDate || !form.value.guests) {
    message.value = 'Please fill in all required fields.'
    return
  }

  if (form.value.totalPrice <= 0) {
    message.value = 'Invalid booking dates or hotel selection.'
    return
  }

  try {
    const payload = {
      hotelId: form.value.hotelId,
      userId: form.value.userId,
      checkInDate: form.value.checkInDate,
      checkOutDate: form.value.checkOutDate,
      guests: form.value.guests,
      totalPrice: form.value.totalPrice
    }

    const res = await axios.post('http://localhost:5000/api/hotel-booking', payload)
    message.value = 'Booking successful! Booking ID: ' + res.data.id
    success.value = true

    // Reset form (keep userId)
    form.value.hotelId = ''
    form.value.checkInDate = ''
    form.value.checkOutDate = ''
    form.value.guests = 1
    form.value.totalPrice = 0
  } catch (err) {
    const errMsg = err.response?.data?.error || err.message
    message.value = 'Failed to book. ' + errMsg
    success.value = false
  }
}
</script>
