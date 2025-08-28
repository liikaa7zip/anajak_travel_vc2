<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-purple-700">Hotel Owner Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <p class="text-gray-500">Total Revenue</p>
        <h2 class="text-2xl font-bold text-purple-700">$25,430</h2>
        <p class="text-sm text-green-600">+12% from last month</p>
      </div>
      <div class="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <p class="text-gray-500">Bookings</p>
        <h2 class="text-2xl font-bold text-purple-700">340</h2>
        <p class="text-sm text-green-600">+30 this week</p>
      </div>
      <div class="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <p class="text-gray-500">Occupancy</p>
        <h2 class="text-2xl font-bold text-purple-700">82%</h2>
        <p class="text-sm text-blue-600">High season</p>
      </div>
      <div class="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <p class="text-gray-500">Cancellations</p>
        <h2 class="text-2xl font-bold text-purple-700">12</h2>
        <p class="text-sm text-red-600">-5 compared to last month</p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Line Chart -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-lg font-semibold mb-4">📈 Booking Trend</h2>
        <LineChart :chart-data="chartData" :chart-options="chartOptions" />
      </div>

      <!-- Pie Chart -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-lg font-semibold mb-4">🥧 Booking Status</h2>
        <PieChart :chart-data="pieData" :chart-options="pieOptions" />
      </div>
    </div>

    <!-- Upcoming Reservations -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-lg font-semibold mb-4">📅 Upcoming Reservations</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-left bg-purple-100">
            <th class="p-3">Guest</th>
            <th class="p-3">Room</th>
            <th class="p-3">Check-in</th>
            <th class="p-3">Check-out</th>
            <th class="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, index) in reservations" :key="index" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ booking.guest }}</td>
            <td class="p-3">{{ booking.room }}</td>
            <td class="p-3">{{ booking.checkIn }}</td>
            <td class="p-3">{{ booking.checkOut }}</td>
            <td class="p-3">
              <span
                class="px-3 py-1 text-sm rounded-full"
                :class="{
                  'bg-green-100 text-green-700': booking.status === 'Confirmed',
                  'bg-yellow-100 text-yellow-700': booking.status === 'Pending',
                  'bg-red-100 text-red-700': booking.status === 'Cancelled'
                }"
              >
                {{ booking.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Recent Reviews -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-lg font-semibold mb-4">⭐ Recent Reviews</h2>
      <div v-for="(review, index) in reviews" :key="index" class="border-b py-3">
        <p class="font-semibold">{{ review.guest }} 
          <span class="text-yellow-500">({{ review.rating }}★)</span>
        </p>
        <p class="text-gray-600">{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { LineChart, PieChart } from "vue-chart-3"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

// Line Chart Data
const chartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Bookings",
      data: [12, 19, 8, 15, 22, 30],
      borderColor: "rgb(106, 90, 205)",
      backgroundColor: "rgba(106, 90, 205, 0.3)",
      fill: true,
      tension: 0.3
    }
  ]
})
const chartOptions = ref({ responsive: true })

// Pie Chart Data
const pieData = ref({
  labels: ["Confirmed", "Pending", "Cancelled"],
  datasets: [
    {
      data: [65, 20, 15],
      backgroundColor: ["#4CAF50", "#FFC107", "#F44336"]
    }
  ]
})
const pieOptions = ref({ responsive: true })

// Dummy Reservations
const reservations = ref([
  { guest: "John Doe", room: "101", checkIn: "2025-08-20", checkOut: "2025-08-25", status: "Confirmed" },
  { guest: "Jane Smith", room: "202", checkIn: "2025-08-18", checkOut: "2025-08-22", status: "Pending" },
  { guest: "Mark Lee", room: "305", checkIn: "2025-08-21", checkOut: "2025-08-26", status: "Cancelled" }
])

// Dummy Reviews
const reviews = ref([
  { guest: "Alice", rating: 5, comment: "Amazing stay, very clean and friendly staff!" },
  { guest: "Bob", rating: 4, comment: "Great location but room was a bit small." },
  { guest: "Charlie", rating: 3, comment: "Average experience, could improve breakfast." }
])
</script>
