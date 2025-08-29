<template>
  <div class="max-w-xl mx-auto mt-10 space-y-6">

    <!-- Booking Form Card -->
    <div class="p-6 bg-white rounded-2xl shadow-lg space-y-5">
      <h2 class="text-2xl font-extrabold text-purple-600 mb-4 text-center">Book Your Stay</h2>

      <form @submit.prevent="showPreConfirmationModal = true" class="space-y-4">

        <!-- Hotel & Room -->
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block mb-1 font-semibold text-gray-700">🏨 Hotel</label>
            <input
              type="text"
              :value="selectedHotel?.name + ' - $' + selectedHotel?.pricePerNight?.toFixed(2) + ' per night'"
              class="w-full border rounded-lg px-3 py-2 bg-purple-50 font-medium"
              readonly
            />
          </div>

          <div>
            <label class="block mb-1 font-semibold text-gray-700">🛏 Room</label>
            <input
              type="text"
              :value="selectedRoom ? 'Room #' + selectedRoom.roomNumber + ' - ' + (selectedRoom.RoomCategory?.name || selectedRoom.type) + ' - $' + selectedRoom.pricePerNight?.toFixed(2) : ''"
              class="w-full border rounded-lg px-3 py-2 bg-purple-50 font-medium"
              readonly
            />
          </div>
        </div>

        <!-- Unavailable Dates Button -->
        <div v-if="bookedDates.length" class="text-center">
          <button
            type="button"
            @click="showUnavailableModal = true"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            View Unavailable Dates
          </button>
        </div>

        <!-- Check-in / Check-out -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-semibold text-gray-700">📅 Check-In</label>
            <input
              type="date"
              v-model="form.checkInDate"
              @change="updatePrice"
              required
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label class="block mb-1 font-semibold text-gray-700">📅 Check-Out</label>
            <input
              type="date"
              v-model="form.checkOutDate"
              @change="updatePrice"
              required
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <!-- Number of Guests -->
        <div>
          <label class="block mb-1 font-semibold text-gray-700">👤 Guests</label>
          <input
            type="number"
            v-model.number="form.guests"
            min="1"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <!-- Total Price -->
        <div class="text-center py-3 bg-purple-50 rounded-lg shadow-inner font-bold text-purple-700 text-lg">
          Total Price: ${{ form.totalPrice.toFixed(2) }}
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-4 mt-4">
          <button
            type="submit"
            class="flex-1 bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Book Now
          </button>
          <router-link
            to="/hotel"
            class="flex-1 text-center bg-gray-400 text-white px-5 py-2 rounded-xl hover:bg-gray-500 transition"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>

    <!-- Unavailable Dates Modal -->
    <div
      v-if="showUnavailableModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="showUnavailableModal = false"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <h2 class="text-center text-xl font-bold text-red-600 mb-4">Unavailable Dates for This Room</h2>
        <ul class="space-y-2 max-h-80 overflow-y-auto">
          <li
            v-for="booking in bookedDates"
            :key="booking.id"
            class="p-3 bg-red-50 rounded shadow flex justify-between items-center"
          >
            <div>
              <p class="font-semibold text-gray-800">
                📅 {{ new Date(booking.checkInDate).toLocaleDateString() }} → {{ new Date(booking.checkOutDate).toLocaleDateString() }}
              </p>
              <p class="text-sm text-gray-500">Guests: {{ booking.guests }}</p>
              <p class="text-sm font-bold" :class="booking.status==='confirmed' ? 'text-red-600' : 'text-yellow-600'">
                Status: {{ booking.status }}
              </p>
            </div>
            <div class="text-gray-400 text-sm">
              🛌 {{ Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate))/(1000*60*60*24)) }} nights
            </div>
          </li>
        </ul>
        <div class="text-center mt-4">
          <button
            @click="showUnavailableModal = false"
            class="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>

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

    <!-- Payment Modal -->
    <Payment
      v-if="showPaymentModal && lastBooking && lastBooking.id"
      :amount="form.price"
      :bookingType="form.type"
      :bookingId="lastBooking.id"
      @cancel="showPaymentModal = false"
      @paid="handlePaymentComplete"
    />

    <!-- Success Modal -->
    <div
      v-if="confirmation"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      @click.self="confirmation=''"
    >
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
import { ref, computed, onMounted, watch } from 'vue'
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
const bookedDates = ref([])
const unavailableRooms = ref([]) 
const showUnavailableModal = ref(false)


// Computed for selected hotel/room
const selectedHotel = computed(() => hotels.value.find(h => h.id === form.value.hotelId))
const selectedRoom = computed(() => rooms.value.find(r => r.id === form.value.roomId))


// Watch for selected room changes
watch(() => form.value.roomId, async (roomId) => {
  if (!roomId) {
    bookedDates.value = []
    return
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/hotel-bookings/hotel/${form.value.hotelId}`)
    bookedDates.value = res.data
      .filter(b => b.roomId === roomId && (b.status === 'confirmed' || b.status === 'pending'))
  } catch (err) {
    bookedDates.value = []
    console.error('Failed to fetch booked dates', err)
  }
})


watch(
  () => [form.value.hotelId, form.value.checkInDate, form.value.checkOutDate],
  () => updateUnavailableRooms()
)


const updateUnavailableRooms = async () => {
  if (!form.value.hotelId || !form.value.checkInDate || !form.value.checkOutDate) {
    unavailableRooms.value = []
    return
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/hotel-bookings/hotel/${form.value.hotelId}`)
    const checkIn = new Date(form.value.checkInDate)
    const checkOut = new Date(form.value.checkOutDate)
    unavailableRooms.value = res.data
      .filter(b => {
        const start = new Date(b.checkInDate)
        const end = new Date(b.checkOutDate)
        return checkIn < end && checkOut > start
      })
      .map(b => b.roomId)
  } catch (err) {
    unavailableRooms.value = []
  }
}

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
  loading.value = true

  try {
    // ✅ Check login and token
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!storedUser || !token) {
      alert("Please login to book a room.")
      loading.value = false
      return
    }

    const user = JSON.parse(storedUser)

    // Prepare booking payload
    const payload = {
      hotelId: form.value.hotelId,
      roomId: form.value.roomId,
      checkInDate: form.value.checkInDate,
      checkOutDate: form.value.checkOutDate,
      guests: form.value.guests,
      totalAmount: form.value.totalPrice
    }

    // Send booking request with token
    const res = await axios.post(
      "http://localhost:5000/api/hotel-bookings",
      payload,
      { headers: { Authorization: "Bearer " + token } }
    )

    // Close pre-confirmation modal
    showPreConfirmationModal.value = false

    // Store booking for payment
    lastBooking.value = res.data.booking
    showPaymentModal.value = true

  } catch (err) {
    if (err.response?.status === 409) {
      const conflict = err.response.data.conflictingBooking
      alert(
        `Room is not available from ${new Date(conflict.checkIn).toLocaleDateString()} ` +
        `to ${new Date(conflict.checkOut).toLocaleDateString()}`
      )
    } else {
      alert("Failed to book: " + (err.response?.data?.message || err.message))
    }
  } finally {
    loading.value = false
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
// on mounted
onMounted(async () => {
  const user = localStorage.getItem('user')
  if (user) form.value.userId = JSON.parse(user).id

  // Fetch hotels and rooms
  await fetchHotels()

  if (route.params.id) {
    form.value.hotelId = parseInt(route.params.id)
    await fetchRooms(form.value.hotelId)

    if (route.query.roomId) {
      form.value.roomId = parseInt(route.query.roomId)

      // Fetch unavailable dates for this room from backend
      // ✅ Correct: fetch all hotel bookings and filter by roomId
try {
  const res = await axios.get(`http://localhost:5000/api/hotel-bookings/hotel/${form.value.hotelId}`)
  bookedDates.value = res.data
    .filter(b => b.roomId === form.value.roomId && (b.status === 'confirmed' || b.status === 'pending'))
} catch (err) {
  bookedDates.value = []
  console.error('Failed to fetch booked dates', err)
}

    }
  }

  updateUnavailableRooms()
  updatePrice()
})

</script>

