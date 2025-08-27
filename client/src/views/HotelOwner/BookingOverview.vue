  <template>
    <div class="p-8 space-y-8 min-h-screen">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">Booking Dashboard</h2>
          <p class="text-gray-500">06 Aug 2024 · All Rooms</p>
        </div>
        <button
          class="px-5 py-2.5 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 shadow-md transition"
        >
          + Create New Booking
        </button>
      </div>

      <!-- Rooms + Availability -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Rooms -->
        <div class="col-span-9 bg-white rounded-2xl p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-6 text-gray-700">Rooms</h3>

          <!-- Days header -->
          <div class="grid grid-cols-8 text-center font-semibold text-gray-600 mb-3">
            <div></div>
            <div v-for="day in days" :key="day.date">
              <p>{{ day.day }}</p>
              <p class="text-xs text-gray-400">{{ day.date }}</p>
            </div>
          </div>

          <!-- Room rows -->
          <div
            v-for="room in rooms"
            :key="room.id"
            class="grid grid-cols-8 items-center text-center text-sm font-medium mb-2"
          >
            <div class="font-bold text-gray-700">{{ room.number }}</div>
            <div
              v-for="status in room.statuses"
              :key="status.date"
              :class="status.booked
                ? 'bg-red-100 text-red-600 border border-red-300'
                : 'bg-green-100 text-green-700 border border-green-300'"
              class="p-2 rounded-lg shadow-sm hover:scale-105 transition text-xs"
            >
              {{ status.booked ? status.guest : 'Free' }}
            </div>
          </div>
        </div>

        <!-- Availability -->
        <div class="col-span-3 bg-white rounded-2xl p-6 shadow-lg space-y-4">
          <h3 class="text-xl font-semibold text-gray-700">Availability</h3>
          <div
            v-for="item in availability"
            :key="item.type"
            class="flex justify-between items-center bg-gray-50 rounded-xl p-4 shadow-sm hover:bg-gray-100 transition"
          >
            <span class="text-gray-600">{{ item.type }}</span>
            <span class="font-bold text-indigo-600">{{ item.count }}</span>
          </div>
        </div>
      </div>

      <!-- Today Bookings -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-xl font-semibold mb-6 text-gray-700">Today’s Bookings</h3>
        <table class="w-full text-sm border-collapse">
          <thead class="text-gray-600 border-b">
            <tr>
              <th class="py-3">Name</th>
              <th>Room #</th>
              <th>Price</th>
              <th>Check-in</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="booking in bookings"
              :key="booking.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="py-3">{{ booking.name }}</td>
              <td>{{ booking.room }}</td>
              <td>{{ booking.price }}</td>
              <td>{{ booking.checkin }}</td>
              <td>
                <span
                  :class="{
                    'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium': booking.status === 'online payment',
                    'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium': booking.status === 'pending'
                  }"
                >
                  {{ booking.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Chart -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-xl font-semibold mb-6 text-gray-700">Reservation Statistics</h3>
        <div class="w-full h-80">
          <LineChart width="100%" height="100%" :data="chartData">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="checkIn" stroke="#4F46E5" strokeWidth="2" />
            <Line type="monotone" dataKey="checkOut" stroke="#22C55E" strokeWidth="2" />
          </LineChart>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

  const days = [
    { day: "MON", date: 21 },
    { day: "TUE", date: 22 },
    { day: "WED", date: 23 },
    { day: "THU", date: 24 },
    { day: "FRI", date: 25 },
    { day: "SAT", date: 26 },
    { day: "SUN", date: 27 },
  ]

  const rooms = [
    { id: 1, number: "102", statuses: [
      { date: 21, booked: false },
      { date: 22, booked: true, guest: "Mr John" },
      { date: 23, booked: false },
      { date: 24, booked: true, guest: "Ms Sara" },
      { date: 25, booked: false },
      { date: 26, booked: false },
      { date: 27, booked: true, guest: "Mr Alex" }
    ]},
    { id: 2, number: "103", statuses: [
      { date: 21, booked: false },
      { date: 22, booked: false },
      { date: 23, booked: true, guest: "Mr Peter" },
      { date: 24, booked: false },
      { date: 25, booked: false },
      { date: 26, booked: false },
      { date: 27, booked: false }
    ]},
  ]

  const availability = [
    { type: "Double Room AC", count: 50 },
    { type: "Double Room Non AC", count: 22 },
    { type: "Triple Room AC", count: 45 },
    { type: "Triple Room Non AC", count: 78 },
    { type: "Family Room", count: 55 },
  ]

  const bookings = [
    { id: 1, name: "Aisulu Zhumaga", room: 122, price: 5000, checkin: "01.10.2023", status: "online payment" },
    { id: 2, name: "Name Surname 1", room: 605, price: 10000, checkin: "01.10.2023", status: "pending" },
    { id: 3, name: "Name Surname 2", room: 798, price: 7000, checkin: "01.10.2023", status: "online payment" },
  ]

  const chartData = [
    { name: "01", checkIn: 200, checkOut: 300 },
    { name: "02", checkIn: 400, checkOut: 100 },
    { name: "03", checkIn: 150, checkOut: 250 },
    { name: "04", checkIn: 350, checkOut: 200 },
    { name: "05", checkIn: 420, checkOut: 320 },
  ]
  </script>
