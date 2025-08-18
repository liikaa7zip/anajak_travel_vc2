  <template>
    <div class="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Hotel Booking</h2>

      <form @submit.prevent="showPreConfirmationModal = true">
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Select Hotel</label>
          <select v-model="form.hotelId" @change="onHotelChange" required class="w-full border rounded px-3 py-2">
            <option value="" disabled>Select a hotel</option>
            <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">
              {{ hotel.name }} - ${{ hotel.pricePerNight }} per night
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block mb-1 font-semibold">Select Room</label>
          <select v-model="form.roomId" required class="w-full border rounded px-3 py-2" :disabled="rooms.length === 0">
            <option value="" disabled>Select a room</option>
            <option v-for="room in rooms" :key="room.id" :value="room.id">
              Room #{{ room.roomNumber }} - {{ room.RoomCategory?.name || room.type }} - ${{ room.pricePerNight?.toFixed(2) || 'N/A' }}
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

        <button type="submit" class="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
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
        :bookingType="lastBooking.type"
        :bookingId="lastBooking.id"
        @cancel="showPaymentModal = false"
        @paid="handlePaymentComplete"
      />
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Payment from '@/components/Payment.vue'

  const form = ref({
    hotelId: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    userId: null,
    totalPrice: 0
  })

  const hotels = ref([])
  const rooms = ref([])
  const message = ref('')
  const success = ref(false)
  const showPreConfirmationModal = ref(false)
  const loading = ref(false)
  const confirmation = ref('')
  const isError = ref(false)
  const showPaymentModal = ref(false)
  const lastBooking = ref({}) 

  const resetForm = () => {
    form.value.hotelId = ''
    form.value.roomId = ''
    form.value.checkInDate = ''
    form.value.checkOutDate = ''
    form.value.guests = 1
    form.value.totalPrice = 0
  }

  // Fetch hotels
  const fetchHotels = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hotels')
      hotels.value = res.data
    } catch (error) {
      message.value = 'Failed to load hotels.'
    }
  }

  // Fetch rooms for selected hotel
  const fetchRooms = async (hotelId) => {
    if (!hotelId) {
      rooms.value = []
      return
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms`)
      rooms.value = res.data
    } catch (error) {
      rooms.value = []
    }
  }

  // When hotel changes, fetch rooms and reset room selection
  const onHotelChange = async () => {
    await fetchRooms(form.value.hotelId)
    form.value.roomId = ''
    updatePrice()
  }

  // Calculate total price based on selected room
  const updatePrice = () => {
    const room = rooms.value.find(r => r.id === form.value.roomId)
    if (!room || !form.value.checkInDate || !form.value.checkOutDate) {
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

    form.value.totalPrice = parseFloat((nights * room.pricePerNight).toFixed(2))
  }

  // On mount: get userId from localStorage and preselect hotel/room if in URL
  import { onMounted as vueOnMounted } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()

  vueOnMounted(async () => {
    await fetchHotels()

    const user = localStorage.getItem('user')
    if (user) {
      form.value.userId = JSON.parse(user).id
    } else {
      message.value = 'Please log in to book a hotel.'
    }

    // Preselect hotel/room if provided in URL
    if (route.params.id) {
      form.value.hotelId = parseInt(route.params.id)
      await fetchRooms(form.value.hotelId)
      if (route.query.roomId) {
        form.value.roomId = parseInt(route.query.roomId)
      }
    }
  })

  const proceedBooking = async () => {
    message.value = ''
    success.value = false
    loading.value = true

    if (!form.value.userId) {
      message.value = 'User not logged in.'
      loading.value = false
      return
    }

    if (!form.value.hotelId || !form.value.roomId || !form.value.checkInDate || !form.value.checkOutDate || !form.value.guests) {
      message.value = 'Please fill in all required fields.'
      loading.value = false
      return
    }

    if (form.value.totalPrice <= 0) {
      message.value = 'Invalid booking dates or room selection.'
      loading.value = false
      return
    }

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

      const res = await axios.post('http://localhost:5000/api/hotel-booking', payload)

      // Save booking for Payment modal
      lastBooking.value = {
        id: res.data.id,
        price: res.data.totalPrice,
        type: 'hotel'
      }

      showPreConfirmationModal.value = false
      showPaymentModal.value = true
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message
      message.value = 'Failed to book. ' + errMsg
      success.value = false
    } finally {
      loading.value = false
    }
  }

  const handlePaymentComplete = () => {
    showPaymentModal.value = false
    confirmation.value = 'Your hotel booking has been confirmed and paid successfully!'
    resetForm()
  }

  </script>
