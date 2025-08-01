<template>
  <div class="min-h-screen bg-gray-100 flex">
  

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto ml-64">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500">Total Orders (This month)</p>
          <h2 class="text-3xl font-bold text-purple-600">1178</h2>
          <p class="text-xs text-gray-400 mt-1">Highest order recorded: 140 in 1 day</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500">Average Order</p>
          <h2 class="text-3xl font-bold text-indigo-600">22.6 / Hour</h2>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500">Average Revenue</p>
          <h2 class="text-3xl font-bold text-green-600">32542.7 / Day</h2>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Categories Distribution for 2024</h3>
          <canvas id="pieChart"></canvas>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Chart Order</h3>
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// import Chart from 'chart.js/auto'

onMounted(() => {
  const pieCtx = document.getElementById('pieChart')
  const lineCtx = document.getElementById('lineChart')

  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Italian', 'Korean', 'North Indian', 'Chinese', 'South Indian'],
      datasets: [{
        data: [20, 25, 15, 30, 10],
        backgroundColor: ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444']
      }]
    }
  })

  new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Orders',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4
      }]
    }
  })
})
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
