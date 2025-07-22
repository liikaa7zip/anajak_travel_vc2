<template>
  <div class="bg-white min-h-screen p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-extrabold flex items-center gap-2 text-gray-800 tracking-tight drop-shadow-lg">
          <span>🏠</span> Admin Dashboard
        </h1>
        <p class="mt-1 text-base text-gray-600 font-medium">
          Welcome back, <span class="text-gray-800 font-bold">Admin</span>! Here’s a quick summary of your platform.
        </p>
      </div>
      <div class="mt-4 md:mt-0 flex gap-2">
        <button class="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-200 border border-purple-300 transition">+ New Report</button>
        <button class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-200 border border-blue-300 transition">+ New Blog</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <div class="bg-purple-100 rounded-xl p-6 flex flex-col items-center shadow hover:scale-105 transition border border-gray-200">
        <span class="text-3xl mb-2">👤</span>
        <div class="text-lg font-semibold text-gray-700">Total Users</div>
        <div class="text-3xl font-bold text-gray-800 mt-1">2,340</div>
        <span class="text-purple-500 text-xs mt-2">+5% this month</span>
      </div>
      <div class="bg-orange-100 rounded-xl p-6 flex flex-col items-center shadow hover:scale-105 transition border border-gray-200">
        <span class="text-3xl mb-2">🗂️</span>
        <div class="text-lg font-semibold text-gray-700">Bookings</div>
        <div class="text-3xl font-bold text-gray-800 mt-1">1,120</div>
        <span class="text-blue-500 text-xs mt-2">+12% this month</span>
      </div>
      <div class="bg-green-100 rounded-xl p-6 flex flex-col items-center shadow hover:scale-105 transition border border-gray-200">
        <span class="text-3xl mb-2">💵</span>
        <div class="text-lg font-semibold text-gray-700">Revenue</div>
        <div class="text-3xl font-bold text-gray-800 mt-1">$8,500</div>
        <span class="text-pink-500 text-xs mt-2">+8% this month</span>
      </div>
      <div class="bg-pink-100 rounded-xl p-6 flex flex-col items-center shadow hover:scale-105 transition border border-gray-200">
        <span class="text-3xl mb-2">📝</span>
        <div class="text-lg font-semibold text-gray-700">Blogs</div>
        <div class="text-3xl font-bold text-gray-800 mt-1">320</div>
        <span class="text-purple-500 text-xs mt-2">+2 new</span>
      </div>
      <div class="bg-blue-100 rounded-xl p-6 flex flex-col items-center shadow hover:scale-105 transition border border-gray-200">
        <span class="text-3xl mb-2">⭐</span>
        <div class="text-lg font-semibold text-gray-700">Avg. Rating</div>
        <div class="text-3xl font-bold text-gray-800 mt-1">4.8</div>
        <span class="text-pink-500 text-xs mt-2">+0.1 this month</span>
      </div>
    </div>

    <!-- Revenue Chart & Quick Actions & System Health -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <!-- Revenue Chart -->
      <div class="bg-white rounded-xl p-6 shadow col-span-2 flex flex-col border border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-800 font-semibold text-lg">Revenue This Month</span>
          <span class="text-gray-500 text-sm">April 2024</span>
        </div>
        <!-- Line Chart -->
        <canvas ref="revenueChart" id="revenue-line-chart" height="120"></canvas>
      </div>
      <!-- System Health -->
      <div class="bg-white rounded-xl p-6 shadow flex flex-col gap-4 border border-gray-200">
        <div class="font-semibold text-gray-800 mb-2">System Health</div>
        <div class="flex items-center gap-3">
          <span class="text-purple-500 text-2xl">●</span>
          <span class="text-gray-700">API Server</span>
          <span class="ml-auto text-purple-500 font-bold">Online</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-blue-500 text-2xl">●</span>
          <span class="text-gray-700">Database</span>
          <span class="ml-auto text-blue-500 font-bold">Connected</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-pink-500 text-2xl">●</span>
          <span class="text-gray-700">Email Service</span>
          <span class="ml-auto text-pink-500 font-bold">Warning</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-purple-500 text-2xl">●</span>
          <span class="text-gray-700">Storage</span>
          <span class="ml-auto text-purple-500 font-bold">OK</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-xl p-6 shadow flex flex-col gap-4 border border-gray-200 mt-8">
      <div class="font-semibold text-gray-800 mb-2">Quick Actions</div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button class="bg-purple-100 text-purple-800 rounded-lg py-3 font-semibold shadow hover:bg-purple-200 border border-purple-300 transition flex flex-col items-center">
          <span class="text-2xl mb-1">🌍</span>
          Add Destination
        </button>
        <button class="bg-blue-100 text-blue-800 rounded-lg py-3 font-semibold shadow hover:bg-blue-200 border border-blue-300 transition flex flex-col items-center">
          <span class="text-2xl mb-1">🍽️</span>
          Add Menu
        </button>
        <button class="bg-purple-100 text-purple-800 rounded-lg py-3 font-semibold shadow hover:bg-purple-200 border border-purple-300 transition flex flex-col items-center">
          <span class="text-2xl mb-1">👤</span>
          View Users
        </button>
        <button class="bg-blue-100 text-blue-800 rounded-lg py-3 font-semibold shadow hover:bg-blue-200 border border-blue-300 transition flex flex-col items-center">
          <span class="text-2xl mb-1">✉️</span>
          Send Notification
        </button>
      </div>
    </div>

    <!-- Main Grid: Recent Activity & Top Users -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <!-- Recent Bookings -->
      <div class="bg-white rounded-xl p-6 shadow border border-gray-200 md:col-span-2">
        <div class="font-semibold text-gray-800 mb-4">Recent Bookings</div>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-700">Siem Reap</span>
            <span class="bg-blue-500 px-3 py-1 rounded-full text-xs text-white">Confirmed</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-700">Kampot</span>
            <span class="bg-purple-500 px-3 py-1 rounded-full text-xs text-white">Completed</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-700">Kompong Chhnang</span>
            <span class="bg-pink-500 px-3 py-1 rounded-full text-xs text-white">Pending</span>
          </div>
        </div>
      </div>
      <!-- Recent Messages -->
      <div class="bg-white rounded-xl p-6 shadow border border-gray-200">
        <div class="font-semibold text-gray-800 mb-4">Recent Messages</div>
        <div class="space-y-3">
          <div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700">Sreyk</span>
              <span class="text-xs text-gray-500">8:31am</span>
            </div>
            <div class="text-xs text-gray-500">I need a help</div>
          </div>
          <div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700">Panha</span>
              <span class="text-xs text-gray-500">8:31am</span>
            </div>
            <div class="text-xs text-gray-500">What should I do here?</div>
          </div>
        </div>
      </div>
      <!-- Top Users -->
      <div class="bg-white rounded-xl p-6 shadow border border-gray-200">
        <div class="font-semibold text-gray-800 mb-4">Top Users</div>
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <img src="https://randomuser.me/api/portraits/women/1.jpg" class="w-8 h-8 rounded-full" />
            <span class="text-gray-700 font-semibold">Sreyk</span>
            <span class="bg-purple-500 px-2 py-1 rounded text-xs text-white ml-auto">Active</span>
          </div>
          <div class="flex items-center gap-2">
            <img src="https://randomuser.me/api/portraits/men/2.jpg" class="w-8 h-8 rounded-full" />
            <span class="text-gray-700 font-semibold">Panha</span>
            <span class="bg-blue-500 px-2 py-1 rounded text-xs text-white ml-auto">Premium</span>
          </div>
          <div class="flex items-center gap-2">
            <img src="https://randomuser.me/api/portraits/men/3.jpg" class="w-8 h-8 rounded-full" />
            <span class="text-gray-700 font-semibold">Rathana</span>
            <span class="bg-pink-500 px-2 py-1 rounded text-xs text-white ml-auto">New</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Destinations -->
    <div class="bg-white rounded-xl p-6 shadow mt-8 border border-gray-200">
      <div class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span class="text-2xl">🌍</span>
        Top Destinations
        <span class="ml-auto text-xs text-gray-500 font-normal">Updated: Today</span>
      </div>
      <div class="flex gap-6 overflow-x-auto pb-2">
        <div
          v-for="(dest, i) in destinations"
          :key="i"
          class="flex flex-col items-center min-w-[140px] bg-white rounded-lg p-3 shadow hover:scale-105 transition border border-gray-200 group"
        >
          <div class="relative w-28 h-16 mb-2">
            <img :src="dest.img" :alt="dest.name" class="w-full h-full object-cover rounded-lg shadow" />
            <span
              v-if="dest.badge"
              class="absolute top-1 left-1 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow group-hover:bg-purple-400 transition"
            >{{ dest.badge }}</span>
            <span
              v-if="dest.trend"
              class="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow group-hover:bg-blue-400 transition flex items-center gap-1"
            >⬆ {{ dest.trend }}</span>
          </div>
          <span class="text-sm mt-1 text-gray-800 font-semibold">{{ dest.name }}</span>
          <span class="text-xs text-gray-500">{{ dest.visitors }} visitors</span>
          <div class="flex items-center gap-1 mt-1">
            <span v-for="n in Math.floor(dest.rating)" :key="n" class="text-yellow-400 text-xs">★</span>
            <span v-if="dest.rating % 1" class="text-yellow-400 text-xs">☆</span>
            <span class="text-xs text-gray-500 ml-1">({{ dest.rating }})</span>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button class="text-xs text-purple-500 hover:underline">View All Destinations</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const revenueChart = ref(null)

onMounted(async () => {
  await nextTick()
  if (window.Chart && revenueChart.value) {
    new window.Chart(revenueChart.value.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Revenue',
          data: [1200, 1900, 3000, 2500, 3200, 4000, 3800],
          borderColor: '#8b5cf6', // Purple
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#8b5cf6',
          pointBorderColor: '#fff',
          pointRadius: 5,
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: '#e5e7eb' },
            ticks: { color: '#6b7280' }
          },
          y: {
            grid: { color: '#e5e7eb' },
            ticks: { color: '#6b7280' }
          }
        }
      }
    })
  }
})

const destinations = [
  {
    name: 'Siem Reap',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
    badge: 'Popular',
    trend: '+12%',
    visitors: '2.1k',
    rating: 4.8
  },
  {
    name: 'Kampot',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
    badge: 'Trending',
    trend: '+8%',
    visitors: '1.5k',
    rating: 4.6
  },
  {
    name: 'Battambang',
    img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=200&q=80',
    badge: '',
    trend: '+5%',
    visitors: '1.2k',
    rating: 4.5
  },
  {
    name: 'Phnom Penh',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80',
    badge: 'New',
    trend: '+15%',
    visitors: '900',
    rating: 4.7
  }
]
</script>

<style scoped>
/* Custom scrollbar for light background */
::-webkit-scrollbar {
  width: 8px;
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 8px;
}
</style>