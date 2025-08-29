<template>
  <div class="p-8 space-y-8 min-h-screen bg-gray-50">
    <!-- Header + Month Picker -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Booking Dashboard</h2>
        <p class="text-gray-500">{{ selectedMonthYearText }}</p>
      </div>
      <div class="flex items-center space-x-4">
        <select v-model="selectedMonth" class="border rounded px-3 py-2">
          <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}</option>
        </select>
        <select v-model="selectedYear" class="border rounded px-3 py-2">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
    </div>

    <!-- Weekly Calendar -->
    <div class="bg-white rounded-2xl p-6 shadow-lg">
      <h3 class="text-xl font-semibold mb-4">Room Availability (Week)</h3>

      <!-- Week Days Header -->
      <div class="flex border-b border-gray-200">
        <div class="w-24 font-semibold text-gray-700 p-2">Room #</div>
        <div v-for="day in weekDays" :key="day.date" class="flex-1 p-2 text-center font-semibold text-gray-600">
          <div>{{ day.day }}</div>
          <div class="text-sm text-gray-400">{{ day.date.getDate() }}</div>
        </div>
      </div>

      <!-- Room Rows -->
      <div v-for="room in rooms" :key="room.id" class="flex border-b border-gray-100 items-center">
        <div class="w-24 font-bold text-gray-700 p-2">{{ room.number }}</div>
        <div v-for="day in weekDays" :key="day.date" class="flex-1 p-1">
          <div :class="getStatusClass(room, day.date)" class="h-12 flex items-center justify-center rounded-lg shadow-sm">
            {{ getGuestName(room, day.date) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

// Months and Years
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const currentYear = new Date().getFullYear()
const years = Array.from({length: 5}, (_, i) => currentYear - 2 + i)

// Selected month/year
const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(currentYear)

// Rooms and bookings
const rooms = ref([])
const weekDays = ref([])
const loading = ref(false)
const error = ref(null)

const selectedMonthYearText = computed(() => months[selectedMonth.value] + " " + selectedYear.value)

// Generate week (Sunday-Saturday)
const generateWeek = () => {
  const startDate = new Date(selectedYear.value, selectedMonth.value, 1)
  const dayOfWeek = startDate.getDay()
  const sunday = new Date(startDate)
  sunday.setDate(startDate.getDate() - dayOfWeek)

  const week = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday)
    d.setDate(sunday.getDate() + i)
    week.push({ day: d.toLocaleString('en-US', { weekday: 'short' }), date: new Date(d) })
  }
  weekDays.value = week
}

// Watch month/year changes
watch([selectedMonth, selectedYear], generateWeek, { immediate: true })

// Fetch all rooms and bookings for hotel owner
const fetchData = async () => {
  loading.value = true
  try {
    // 1. Fetch rooms created by hotel owner
    const roomsRes = await axios.get('http://localhost:5000/api/hotel-owners/rooms')
    const ownerRooms = roomsRes.data || []

    // Initialize rooms with empty bookings
    const roomsMap = {}
    ownerRooms.forEach(r => {
      roomsMap[r.id] = { id: r.id, number: r.roomNumber, bookings: [] }
    })

    // 2. Fetch all bookings for this hotel
    const bookingsRes = await axios.get('http://localhost:5000/api/hotel-bookings')
    const bookings = bookingsRes.data.bookings || []

    // 3. Attach bookings to rooms
    bookings.forEach(b => {
      const room = roomsMap[b.Room.id]
      if (!room) return // skip rooms not created by owner
      const checkIn = new Date(b.checkInDate)
      const checkOut = new Date(b.checkOutDate)
      for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
        room.bookings.push({ date: new Date(d), guest: b.User.username })
      }
    })

    rooms.value = Object.values(roomsMap)
  } catch (err) {
    console.error('Failed to fetch data:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

// Helpers
const getStatusClass = (room, date) => {
  const booking = room.bookings.find(b => b.date.toDateString() === date.toDateString())
  return booking
    ? 'bg-red-100 text-red-600 border border-red-300'
    : 'bg-green-100 text-green-700 border border-green-300'
}

const getGuestName = (room, date) => {
  const booking = room.bookings.find(b => b.date.toDateString() === date.toDateString())
  return booking ? booking.guest : 'Free'
}
</script>
