<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Hotel Booking</h2>

    <!-- Booking Form -->
    <form @submit.prevent="showPreConfirmationModal = true">
      <!-- Hotel Selection -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Select Hotel</label>
        <select v-model="form.hotelId" @change="onHotelChange" required class="w-full border rounded px-3 py-2">
          <option value="" disabled>Select a hotel</option>
          <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">
            {{ hotel.name }} - ${{ hotel.pricePerNight }} per night
          </option>
        </select>
      </div>

      <!-- Room Selection -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Select Room</label>
        <select v-model="form.roomId" required class="w-full border rounded px-3 py-2" :disabled="rooms.length === 0">
          <option value="" disabled>Select a room</option>
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            Room #{{ room.roomNumber }} - {{ room.RoomCategory?.name || room.type }} - ${{ room.pricePerNight?.toFixed(2) || 'N/A' }}
          </option>
        </select>
      </div>

      <!-- Check-in / Check-out -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Check-In Date</label>
        <input type="date" v-model="form.checkInDate" @change="updatePrice" required class="w-full border rounded px-3 py-2" />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Check-Out Date</label>
        <input type="date" v-model="form.checkOutDate" @change="updatePrice" required class="w-full border rounded px-3 py-2" />
      </div>

      <!-- Number of Guests -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Number of Guests</label>
        <input type="number" v-model.number="form.guests" min="1" required class="w-full border rounded px-3 py-2" />
      </div>

      <!-- Total Price -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Total Price</label>
        <input type="number" :value="form.totalPrice.toFixed(2)" readonly class="w-full border bg-gray-100 rounded px-3 py-2" />
      </div>

      <!-- Submit -->
      <!-- Submit + Cancel -->
<div class="flex gap-4 mt-4">
  <button type="submit" class="flex-1 bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
    Book Now
  </button>

  <router-link
    to="/hotel"
    class="flex-1 text-center bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition"
  >
    Cancel
  </router-link>
</div>

    </form>

    <!-- Pre-confirmation Modal -->
    <div
      v-if="showPreConfirmationModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="cancelBookingPreConfirmation"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
        <h2 class="text-center text-xl font-bold text-gray-800 mb-4">Confirm Your Booking</h2>
        <p class="text-gray-700 mb-2"><strong>Hotel:</strong> {{ selectedHotel?.name }}</p>
        <p class="text-gray-700 mb-2"><strong>Room:</strong> #{{ selectedRoom?.roomNumber }} - {{ selectedRoom?.type }}</p>
        <p class="text-gray-700 mb-2"><strong>Check-In:</strong> {{ form.checkInDate }}</p>
        <p class="text-gray-700 mb-2"><strong>Check-Out:</strong> {{ form.checkOutDate }}</p>
        <p class="text-gray-700 mb-2"><strong>Guests:</strong> {{ form.guests }}</p>
        <p class="text-gray-700 mb-4"><strong>Total:</strong> ${{ form.totalPrice.toFixed(2) }}</p>

        <div class="flex justify-center gap-4">
          <button @click="cancelBookingPreConfirmation" class="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
          <button @click="proceedBooking" class="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700" :disabled="loading">Yes, Book Now</button>
        </div>
      </div>
    </div>

    <Payment
  v-if="showPaymentModal && lastBooking && lastBooking.id"
  :amount="form.price"
  :bookingType="form.type"
  :bookingId="lastBooking.id"
  @cancel="showPaymentModal = false"
  @paid="handlePaymentComplete"
/>


    <!-- Success Modal -->
    <div v-if="confirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" @click.self="confirmation=''">
      <div class="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative">
        <button @click="confirmation=''" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <div class="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-600 text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-center text-2xl font-extrabold mb-3 text-green-800">Booking Successful!</h2>
        <p class="text-center text-gray-700 mb-8 text-base leading-relaxed">{{ confirmation }}</p>
        <div class="flex justify-center">
          <button @click="confirmation=''" class="px-8 py-3 rounded-full bg-green-600 text-white font-bold hover:bg-green-700">OK</button>
        </div>
      </div>
    </div>
    </div>

  </template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Payment from '@/components/Payment.vue'// import your Payment component

// Reactive form
const form = ref({
  hotelId: '',
  roomId: '',
  checkInDate: '',
  checkOutDate: '',
  guests: 1,
  userId: null,
  totalPrice: 0,
  type: 'hotel', // for Payment component
  price: 0       // for Payment component
})

// State
const hotels = ref([])
const rooms = ref([])
const loading = ref(false)
const showPreConfirmationModal = ref(false)
const showPaymentModal = ref(false)
const confirmation = ref('')
const lastBooking = ref(null) // store booking before payment

// Computed for selected hotel/room
const selectedHotel = computed(() => hotels.value.find(h => h.id === form.value.hotelId))
const selectedRoom = computed(() => rooms.value.find(r => r.id === form.value.roomId))

// Fetch hotels
const fetchHotels = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/hotels')
    hotels.value = res.data
  } catch (err) {
    console.error('Failed to fetch hotels', err)
  }
}

// Fetch rooms
const fetchRooms = async (hotelId) => {
  if (!hotelId) {
    rooms.value = []
    return
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms`)
    rooms.value = res.data.map(room => ({
      ...room,
      amenities: Array.isArray(room.amenities) ? room.amenities : JSON.parse(room.amenities || '[]'),
      images: Array.isArray(room.images) ? room.images : JSON.parse(room.images || '[]')
    }))
  } catch (err) {
    console.error('Failed to fetch rooms', err)
    rooms.value = []
  }
}

// Handle hotel change
const onHotelChange = async () => {
  await fetchRooms(form.value.hotelId)
  form.value.roomId = ''
  updatePrice()
}

// Calculate total price
const updatePrice = () => {
  const room = rooms.value.find(r => r.id === form.value.roomId)
  if (!room || !form.value.checkInDate || !form.value.checkOutDate) {
    form.value.totalPrice = 0
    return
  }
  const checkIn = new Date(form.value.checkInDate)
  const checkOut = new Date(form.value.checkOutDate)
  const nights = (checkOut - checkIn) / (1000*60*60*24)
  if (nights <= 0) {
    form.value.totalPrice = 0
    return
  }
  form.value.totalPrice = parseFloat((nights * room.pricePerNight).toFixed(2))
  form.value.price = form.value.totalPrice // set for Payment
}

// Cancel modal
const cancelBookingPreConfirmation = () => showPreConfirmationModal.value = false

// Proceed booking
const proceedBooking = async () => {
  if (!form.value.userId) {
    alert('Please login to book a room.')
    return
  }
  loading.value = true
  try {
    const payload = {
      hotelId: form.value.hotelId,
      roomId: form.value.roomId,
      userId: form.value.userId,
      checkInDate: form.value.checkInDate,
      checkOutDate: form.value.checkOutDate,
      guests: form.value.guests,
      totalAmount: form.value.totalPrice
    }
    const res = await axios.post('http://localhost:5000/api/hotel-bookings', payload)
    showPreConfirmationModal.value = false
    lastBooking.value = res.data.booking
    showPaymentModal.value = true // show payment modal before success
  } catch (err) {
  if (err.response?.status === 409) {
    const conflict = err.response.data.conflictingBooking;
    alert(
      `Room is not available from ${new Date(conflict.checkIn).toLocaleDateString()} ` +
      `to ${new Date(conflict.checkOut).toLocaleDateString()}`
    );
  } else {
    alert('Failed to book: ' + (err.response?.data?.message || err.message));
  }
}
}

// Handle payment completion
const handlePaymentComplete = () => {
  showPaymentModal.value = false
  confirmation.value = `Your booking #${lastBooking.value.id} has been successfully created!`
  resetForm()
}

// Reset form
const resetForm = () => {
  form.value.hotelId = ''
  form.value.roomId = ''
  form.value.checkInDate = ''
  form.value.checkOutDate = ''
  form.value.guests = 1
  form.value.totalPrice = 0
  form.value.price = 0
  lastBooking.value = null
}

// On mount
const route = useRoute()
onMounted(async () => {
  const user = localStorage.getItem('user')
  if (user) form.value.userId = JSON.parse(user).id

  await fetchHotels()

  if (route.params.id) {
    form.value.hotelId = parseInt(route.params.id)
    await fetchRooms(form.value.hotelId)
    if (route.query.roomId) form.value.roomId = parseInt(route.query.roomId)
    updatePrice()
  }
})
</script>

