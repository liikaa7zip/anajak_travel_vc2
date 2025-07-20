<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen">
    <!-- Welcome Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 mb-1 tracking-tight flex items-center gap-3">
          <span class="inline-block bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">👋 Welcome back, Admin!</span>
        </h1>
        <p class="text-gray-500 text-lg">Your dashboard overview and quick insights.</p>
      </div>
      <div class="flex items-center gap-4">
        <button class="bg-gradient-to-r from-blue-100 to-pink-100 hover:from-blue-200 hover:to-pink-200 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow transition flex items-center gap-2">
          <i class="fas fa-cog"></i> Settings
        </button>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-16 h-16 rounded-full border-4 border-blue-200 shadow-lg ring-4 ring-pink-200" />
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      <div class="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-xl p-7 flex flex-col items-start border-t-4 border-blue-400 hover:-translate-y-1 hover:shadow-2xl transition group overflow-hidden">
        <div class="flex items-center gap-3 mb-2">
          <span class="bg-blue-200 text-blue-700 p-3 rounded-xl text-2xl"><i class="fas fa-users"></i></span>
          <span class="text-lg font-semibold text-gray-700">Total Users</span>
        </div>
        <span class="text-4xl font-extrabold text-blue-700 mb-1 group-hover:scale-110 transition">{{ animatedUsers }}</span>
        <span class="text-gray-400 text-sm">+12% this month</span>
        <i class="fas fa-users absolute -bottom-6 -right-6 text-blue-200 text-7xl opacity-20 pointer-events-none"></i>
      </div>
      <div class="relative bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl shadow-xl p-7 flex flex-col items-start border-t-4 border-pink-400 hover:-translate-y-1 hover:shadow-2xl transition group overflow-hidden">
        <div class="flex items-center gap-3 mb-2">
          <span class="bg-pink-200 text-pink-700 p-3 rounded-xl text-2xl"><i class="fas fa-calendar-plus"></i></span>
          <span class="text-lg font-semibold text-gray-700">Bookings</span>
        </div>
        <span class="text-4xl font-extrabold text-pink-700 mb-1 group-hover:scale-110 transition">{{ animatedBookings }}</span>
        <span class="text-gray-400 text-sm">+8% this month</span>
        <i class="fas fa-calendar-plus absolute -bottom-6 -right-6 text-pink-200 text-7xl opacity-20 pointer-events-none"></i>
      </div>
      <div class="relative bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-xl p-7 flex flex-col items-start border-t-4 border-green-400 hover:-translate-y-1 hover:shadow-2xl transition group overflow-hidden">
        <div class="flex items-center gap-3 mb-2">
          <span class="bg-green-200 text-green-700 p-3 rounded-xl text-2xl"><i class="fas fa-dollar-sign"></i></span>
          <span class="text-lg font-semibold text-gray-700">Revenue</span>
        </div>
        <span class="text-4xl font-extrabold text-green-700 mb-1 group-hover:scale-110 transition">${{ animatedRevenue }}</span>
        <span class="text-gray-400 text-sm">+5% this month</span>
        <i class="fas fa-dollar-sign absolute -bottom-6 -right-6 text-green-200 text-7xl opacity-20 pointer-events-none"></i>
      </div>
      <div class="relative bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl shadow-xl p-7 flex flex-col items-start border-t-4 border-yellow-400 hover:-translate-y-1 hover:shadow-2xl transition group overflow-hidden">
        <div class="flex items-center gap-3 mb-2">
          <span class="bg-yellow-200 text-yellow-700 p-3 rounded-xl text-2xl"><i class="fas fa-star"></i></span>
          <span class="text-lg font-semibold text-gray-700">Reviews</span>
        </div>
        <span class="text-4xl font-extrabold text-yellow-700 mb-1 group-hover:scale-110 transition">{{ animatedReviews }}</span>
        <span class="text-gray-400 text-sm">+3 new today</span>
        <i class="fas fa-star absolute -bottom-6 -right-6 text-yellow-200 text-7xl opacity-20 pointer-events-none"></i>
      </div>
    </div>

    <!-- Revenue Chart -->
    <div class="bg-white rounded-3xl shadow-2xl p-8 mb-10 relative overflow-hidden">
      <div class="flex justify-between items-center mb-6">
        <span class="font-bold text-xl text-gray-800 flex items-center gap-2">
          <i class="fas fa-chart-line text-blue-400"></i> Revenue Trend
        </span>
        <span class="bg-blue-100 px-4 py-1 rounded text-blue-600 text-sm font-semibold">This Month</span>
      </div>
      <svg viewBox="0 0 400 100" class="w-full h-32">
        <defs>
          <linearGradient id="rev-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#3b82f6"
          stroke-width="4"
          :points="revenueChartPoints"
        />
        <polygon
          :points="revenueChartPolygon"
          fill="url(#rev-gradient)"
        />
      </svg>
      <div class="flex justify-between text-xs text-gray-400 mt-2">
        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
      </div>
      <i class="fas fa-chart-area absolute -bottom-8 -right-8 text-blue-100 text-9xl opacity-20 pointer-events-none"></i>
    </div>

    <!-- Main Content: Bookings, Messages, Reviews -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <!-- Recent Bookings -->
      <div class="bg-white rounded-3xl shadow-2xl p-7 flex flex-col hover:shadow-2xl transition group overflow-hidden">
        <div class="flex items-center justify-between mb-4">
          <div class="font-bold text-lg text-gray-800 flex items-center gap-2">
            <i class="fas fa-plane-departure text-blue-400"></i> Recent Bookings
          </div>
          <button class="text-blue-600 hover:underline text-sm">View all</button>
        </div>
        <div v-for="b in recentBookings" :key="b.id" class="flex items-center justify-between py-3 border-b last:border-b-0 group-hover:bg-blue-50/30 transition">
          <div class="flex items-center gap-3">
            <img :src="b.avatar" class="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow" />
            <span class="font-medium text-gray-700">{{ b.destination }}</span>
          </div>
          <span
            class="px-3 py-0.5 rounded-full text-xs font-semibold"
            :class="{
              'bg-blue-100 text-blue-600': b.status === 'Pending',
              'bg-green-100 text-green-600': b.status === 'Complete',
              'bg-orange-100 text-orange-600': b.status === 'Continue'
            }"
          >{{ b.status }}</span>
        </div>
        <i class="fas fa-plane absolute -bottom-8 -right-8 text-blue-100 text-8xl opacity-10 pointer-events-none"></i>
      </div>
      <!-- Recent Messages -->
      <div class="bg-white rounded-3xl shadow-2xl p-7 flex flex-col hover:shadow-2xl transition group overflow-hidden">
        <div class="flex items-center justify-between mb-4">
          <div class="font-bold text-lg text-gray-800 flex items-center gap-2">
            <i class="fas fa-envelope text-pink-400"></i> Recent Messages
          </div>
          <button class="text-blue-600 hover:underline text-sm">Inbox</button>
        </div>
        <div v-for="m in recentMessages" :key="m.id" class="flex items-center justify-between py-3 border-b last:border-b-0 group-hover:bg-pink-50/30 transition">
          <div class="flex items-center gap-3">
            <img :src="m.avatar" class="w-10 h-10 rounded-full object-cover border-2 border-pink-100 shadow" />
            <div>
              <div class="font-medium text-gray-700">{{ m.name }}</div>
              <div class="text-xs text-gray-500">{{ m.text }}</div>
            </div>
          </div>
          <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-semibold">{{ m.time }}</span>
        </div>
        <i class="fas fa-envelope-open-text absolute -bottom-8 -right-8 text-pink-100 text-8xl opacity-10 pointer-events-none"></i>
      </div>
      <!-- New Reviews -->
      <div class="bg-white rounded-3xl shadow-2xl p-7 flex flex-col hover:shadow-2xl transition group overflow-hidden">
        <div class="flex items-center justify-between mb-4">
          <div class="font-bold text-lg text-gray-800 flex items-center gap-2">
            <i class="fas fa-star text-yellow-400"></i> New Reviews
          </div>
          <button class="text-blue-600 hover:underline text-sm">See all</button>
        </div>
        <div v-for="r in newReviews" :key="r.id" class="flex items-center justify-between py-3 border-b last:border-b-0 group-hover:bg-yellow-50/30 transition">
          <div class="flex items-center gap-3">
            <img :src="r.avatar" class="w-10 h-10 rounded-full border-2 border-yellow-100 shadow" />
            <div>
              <div class="font-medium text-gray-700">{{ r.name }}</div>
              <div class="text-xs text-gray-500" v-if="r.text">{{ r.text }}</div>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <span v-for="n in r.stars" :key="n" class="text-yellow-400 text-lg">★</span>
          </div>
        </div>
        <i class="fas fa-star absolute -bottom-8 -right-8 text-yellow-100 text-8xl opacity-10 pointer-events-none"></i>
      </div>
    </div>

    <!-- Pending Menus & Quick Action Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <!-- Pending Menus -->
      <div class="bg-white rounded-3xl shadow-2xl p-8 min-h-[200px] hover:shadow-2xl transition relative overflow-hidden">
        <div class="flex items-center justify-between mb-4">
          <div class="font-bold text-lg text-gray-800 flex items-center gap-2">
            <i class="fas fa-utensils text-blue-400"></i> Pending Menus
          </div>
          <button class="text-blue-600 hover:underline text-sm">Manage</button>
        </div>
        <div v-for="menu in pendingMenus" :key="menu.id" class="flex items-center justify-between mb-6 last:mb-0 group">
          <div class="flex items-center gap-4">
            <img :src="menu.avatar" class="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow" />
            <div>
              <div class="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">{{ menu.name }}</div>
              <div class="text-base text-gray-500">{{ menu.text }}</div>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="px-5 py-1.5 rounded-full font-bold shadow text-white bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition">Approve</button>
            <button class="px-5 py-1.5 rounded-full font-bold shadow text-orange-500 bg-orange-100 hover:bg-orange-200 transition">Reject</button>
          </div>
        </div>
        <i class="fas fa-utensils absolute -bottom-8 -right-8 text-blue-100 text-8xl opacity-10 pointer-events-none"></i>
      </div>
      <!-- Quick Action Button (styled as in screenshot) -->
      <div class="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center min-h-[200px] hover:shadow-2xl transition relative overflow-hidden">
        <div class="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
          <i class="fas fa-bolt text-yellow-400"></i> Quick Actions
        </div>
        <div class="grid grid-cols-2 gap-6 w-full mb-4">
          <button class="quick-action-btn bg-gradient-to-br from-orange-100 to-yellow-50 text-orange-600 hover:from-orange-200 hover:to-yellow-100">
            <i class="fas fa-plus text-2xl mb-2"></i>
            Add Destination
          </button>
          <button class="quick-action-btn bg-gradient-to-br from-pink-100 to-pink-50 text-pink-600 hover:from-pink-200 hover:to-pink-100">
            <i class="fas fa-bars text-2xl mb-2"></i>
            Add Menu
          </button>
          <button class="quick-action-btn bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 hover:from-blue-200 hover:to-blue-100">
            <i class="fas fa-user text-2xl mb-2"></i>
            View Users
          </button>
          <button class="quick-action-btn bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 hover:from-blue-200 hover:to-blue-100">
            <i class="fas fa-envelope-open-text text-2xl mb-2"></i>
            Send Notification
          </button>
        </div>
        <i class="fas fa-bolt absolute -bottom-8 -right-8 text-yellow-100 text-8xl opacity-10 pointer-events-none"></i>
      </div>
    </div>

    <!-- Top Destination -->
    <div class="bg-white rounded-3xl shadow-2xl p-8">
      <div class="flex items-center justify-between mb-6">
        <div class="font-bold text-lg text-gray-800 flex items-center gap-2">
          <i class="fas fa-map-marked-alt text-green-400"></i> Top Destinations
        </div>
        <button class="text-blue-600 hover:underline text-sm">Explore</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="dest in topDestinations" :key="dest.id" class="flex flex-col items-center hover:scale-105 transition group">
          <div class="relative w-full">
            <img :src="dest.image" class="w-full h-40 object-cover rounded-2xl mb-3 shadow-lg border-2 border-white group-hover:border-blue-200 transition" />
            <div class="absolute bottom-2 right-2 bg-white/80 rounded-full px-3 py-1 text-xs font-bold text-blue-600 shadow group-hover:bg-blue-50 transition">
              <i class="fas fa-star text-yellow-400"></i> Featured
            </div>
          </div>
          <div class="font-bold text-lg text-gray-700">{{ dest.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Animated counters
const users = 200
const bookings = 200
const revenue = 8700
const reviews = 120

const animatedUsers = ref(0)
const animatedBookings = ref(0)
const animatedRevenue = ref(0)
const animatedReviews = ref(0)

function animateValue(refVar, target, duration = 1000) {
  let start = 0
  const step = Math.ceil(target / (duration / 16))
  const interval = setInterval(() => {
    start += step
    if (start >= target) {
      refVar.value = target
      clearInterval(interval)
    } else {
      refVar.value = start
    }
  }, 16)
}

onMounted(() => {
  animateValue(animatedUsers, users)
  animateValue(animatedBookings, bookings)
  animateValue(animatedRevenue, revenue)
  animateValue(animatedReviews, reviews)
})

// Revenue chart data
const revenueChartData = [80, 90, 70, 80, 60, 70, 50, 60, 40, 60, 20]
const revenueChartPoints = revenueChartData.map((y, i) => `${i * 40},${y}`).join(' ')
const revenueChartPolygon = `0,100 ${revenueChartPoints} 400,100`

const recentBookings = [
  { id: 1, destination: 'Siemreap', status: 'Pending', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 2, destination: 'Kampot', status: 'Complete', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: 3, destination: 'Kompong Chhnang', status: 'Continue', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' }
]

const recentMessages = [
  { id: 1, name: 'Sreyka', text: 'I need a help', time: '8:33am', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { id: 2, name: 'Panha', text: 'What should I do here?', time: '8:33am', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { id: 3, name: 'Rathana', text: 'What should I do here?', time: '8:33am', avatar: 'https://randomuser.me/api/portraits/men/16.jpg' }
]

const newReviews = [
  { id: 1, name: 'Sreyka', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', stars: 5 },
  { id: 2, name: 'Panha', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', stars: 4 },
  { id: 3, name: 'Rathana', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', stars: 5 }
]

const pendingMenus = [
  { id: 1, name: 'Seyha', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', text: 'I love you service' },
  { id: 2, name: 'Vicheka', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', text: 'Your service so good' },
  { id: 1, name: 'Seyha', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', text: 'I love you service' },
]

const topDestinations = [
  { id: 1, name: 'Siem Reap', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Kampot', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Battambong', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' }
]

function approveMenu(menu) {
  console.log(`✅ Approved menu for ${menu.name}`)
}

function rejectMenu(menu) {
  console.log(`❌ Rejected menu for ${menu.name}`)
}
</script>

<style scoped>
.quick-action-btn {
  @apply flex flex-col items-center justify-center rounded-2xl py-8 font-bold text-base shadow-md transition;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.07);
  border: none;
}
</style>
