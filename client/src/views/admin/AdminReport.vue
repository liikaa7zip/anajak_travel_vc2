<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <h1>hi</h1>
    <h1 class="text-3xl font-extrabold mb-8 text-gray-800">Reports Dashboard</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 items-center mb-6">
      <div class="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-200">
        <span class="text-gray-500">📅</span>
        <input type="date" v-model="startDate" class="outline-none border-none text-gray-700" />
        <span class="text-gray-400">—</span>
        <input type="date" v-model="endDate" class="outline-none border-none text-gray-700" />
      </div>

      <input
        v-model="search"
        placeholder="Search reports..."
        class="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
      />

      <!-- <button @click="applyFilter" class="px-5 py-2 rounded-lg bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition">
        Apply
      </button> -->

      <button @click="exportCSV" class="px-5 py-2 rounded-lg bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition">
        Export CSV
      </button>
    </div>

    <!-- Reports Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(report, index) in filteredReports"
        :key="index"
        class="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition"
      >
        <div class="flex items-center gap-3 mb-4">
          <span class="text-xl text-gray-500">{{ report.icon }}</span>
          <h2 class="text-lg font-semibold text-gray-800">{{ report.type }}</h2>
        </div>
        <p class="text-gray-600 text-base mb-6">
          <span class="text-2xl font-bold text-gray-900">{{ animatedCounts[index] }}</span>
          {{ report.unit }}
        </p>
        <div class="flex gap-3">
          <button
  @click="$router.push('report/booking-table')"
  class="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
>
  View
</button>

          <button
            @click="exportSingleCSV(report)"
            class="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

const startDate = ref('')
const endDate = ref('')
const search = ref('')
const animatedCounts = ref([])

// All reports shown in UI
const reports = ref([
  { icon: '📄', type: 'Bus Bookings', value: 0, unit: 'bookings this month', apiEndpoint: '/api/reports/bookings' },
  { icon: '🍽', type: 'Food Orders', value: 0, unit: 'orders this month', apiEndpoint: '/api/reports/food' },
  { icon: '🏨', type: 'Hotel Bookings', value: 0, unit: 'bookings this month', apiEndpoint: '/api/reports/hotels' },
  { icon: '✈', type: 'Flights Reserved', value: 0, unit: 'flights this month', apiEndpoint: '/api/reports/flights' },
  { icon: '💬', type: 'Messages', value: 0, unit: 'new contacts', apiEndpoint: '/api/reports/messages' }
])

const filteredReports = computed(() => {
  return reports.value.filter(r => r.type.toLowerCase().includes(search.value.toLowerCase()))
})

// Fetch data only for Bookings report, set others to zero
async function fetchReports() {
  try {
    const params = {}
    if (startDate.value) params.startDate = startDate.value
    if (endDate.value) params.endDate = endDate.value

    console.log('Fetching bookings with params:', params)

    const bookingIndex = reports.value.findIndex(r => r.type === 'Bus Bookings')
    if (bookingIndex !== -1) {
      const url = `http://localhost:5000${reports.value[bookingIndex].apiEndpoint}`
      console.log('Fetching from URL:', url)
      const res = await axios.get(url, { params })
      console.log('Response data:', res.data)
      reports.value[bookingIndex].value = res.data.count ?? 0
    }

    reports.value.forEach((r, i) => {
      if (i !== bookingIndex) r.value = 0
    })

    animateCounts()
  } catch (error) {
    console.error('Failed to fetch bookings report:', error)
  }
}




function animateCounts() {
  animatedCounts.value = reports.value.map(() => 0)
  reports.value.forEach((r, i) => {
    let count = 0
    const interval = setInterval(() => {
      if (count < r.value) {
        count++
        animatedCounts.value[i] = count
      } else {
        clearInterval(interval)
      }
    }, 20)
  })
}

const applyFilter = () => {
  fetchReports()
}

const exportCSV = () => {
  const csvRows = [
    ['Report Type', 'Value', 'Unit'],
    ...reports.value.map(r => [r.type, r.value, r.unit])
  ]
  downloadCSV(csvRows, 'all_reports.csv')
}

const exportSingleCSV = (report) => {
  const csvRows = [['Report Type', 'Value', 'Unit'], [report.type, report.value, report.unit]]
  downloadCSV(csvRows, `${report.type}_report.csv`)
}

const downloadCSV = (rows, filename) => {
  const csvContent = rows.map(e => e.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

watch([startDate, endDate], () => {
  fetchReports()
})

onMounted(() => {
  fetchReports()
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
