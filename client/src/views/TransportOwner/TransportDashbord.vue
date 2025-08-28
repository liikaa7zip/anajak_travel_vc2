<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">🚍 Transport Owner Dashboard</h1>

    <!-- Top Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat-card bg-blue-500">
        <h2>👥 Users</h2>
        <p>{{ stats.users }}</p>
      </div>
      <div class="stat-card bg-green-500">
        <h2>🚌 Bus Bookings</h2>
        <p>{{ stats.bus }}</p>
      </div>
      <div class="stat-card bg-purple-500">
        <h2>⛴️ Boat Bookings</h2>
        <p>{{ stats.boat }}</p>
      </div>
      <div class="stat-card bg-yellow-500">
        <h2>💰 Total Revenue</h2>
        <p>\${{ stats.revenue.toLocaleString() }}</p>
      </div>
    </div>

    <!-- Middle section: Recent Bookings & Upcoming Arrivals -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Recent Bookings -->
      <div class="bg-white p-6 rounded-xl shadow-lg max-w-full overflow-x-auto">
  <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
    <span class="text-3xl">🆕</span> Recent Bookings
  </h2>
  <table class="w-full table-auto border-collapse">
    <thead class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase text-sm tracking-wider">
      <tr>
        <th class="py-3 px-6 rounded-tl-lg">ID</th>
        <th class="py-3 px-6">User</th>
        <th class="py-3 px-6">Type</th>
        <th class="py-3 px-6 rounded-tr-lg">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="b in recentBookings" :key="b.id" class="border-b border-gray-200 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer">
        <td class="py-3 px-6 font-mono text-gray-700">{{ b.id }}</td>
        <td class="py-3 px-6 font-semibold text-indigo-700">{{ b.User?.username || '—' }}</td>
        <td class="py-3 px-6">
          <span
            :class="{
              'bg-blue-100 text-blue-800': b.type === 'bus',
              'bg-green-100 text-green-800': b.type === 'boat',
              'bg-gray-100 text-gray-600': !b.type
            }"
            class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
          >
            {{ b.type || 'Unknown' }}
          </span>
        </td>
        <td class="py-3 px-6">
          <span
            :class="{
              'bg-yellow-100 text-yellow-800': b.status === 'pending',
              'bg-orange-100 text-orange-800': b.status === 'completed',
              'bg-green-100 text-green-800': b.status === 'confirmed',
              'bg-red-100 text-red-800': b.status === 'cancelled'
            }"
            class="inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize"
          >
            {{ b.status }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>


      <!-- Payment Summary as horizontal chat line -->
<div class="bg-white p-6 rounded-xl shadow">
  <h2 class="text-xl font-semibold mb-4">💳 Payment Summary</h2>

  <p class="text-3xl font-bold text-green-600 mb-6">
    ${{ totalPayments.toLocaleString() }}
  </p>

  <div class="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
    <div
      v-for="p in payments"
      :key="p.id"
      :class="[
        'flex-shrink-0 px-4 py-2 rounded-lg shadow',
        p.bookingType === 'bus' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
      ]"
      style="min-width: 160px;"
    >
      <p class="text-sm font-semibold">{{ p.bookingType.toUpperCase() }}</p>
      <p class="text-lg font-bold">${{ p.amount }}</p>
      <p class="text-xs text-gray-600">via {{ p.method }}</p>
    </div>
  </div>
</div>



    </div>

    <!-- Active Chats -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">💬 Active Chats</h2>
      <p class="text-3xl font-bold">{{ activeChats }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

const stats = ref({
  users: 0,
  bus: 0,
  boat: 0,
  revenue: 0
});
const recentBookings = ref([]);
const upcomingArrivals = ref([]);
const activeChats = ref(0);
const bookings = ref([])
const payments = ref([]);
const totalPayments = ref(0);

const socket = io("http://localhost:5000");

onMounted(async () => {
  await fetchStats();
  await fetchRecentBookings();
  await fetchUpcomingArrivals();
  await fetchPayments(); 

  socket.on("booking_created", () => {
    fetchStats();
    fetchRecentBookings();
  });

  socket.on("chat_update", (count) => {
    activeChats.value = count;
  });
});

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/bookings/recent')
    bookings.value = res.data
  } catch (err) {
    console.error('Failed to fetch recent bookings:', err)
    bookings.value = []
  }
})

async function fetchPayments() {
  try {
    const res = await axios.get("http://localhost:5000/api/payments");
    payments.value = res.data;
    totalPayments.value = res.data.reduce((sum, p) => sum + (p.amount || 0), 0);
  } catch (err) {
    console.error("Failed to fetch payments:", err);
  }
}

async function fetchStats() {
  const usersRes = await axios.get("http://localhost:5000/api/users");
  const busRes = await axios.get("http://localhost:5000/api/bookings?type=bus");
  const boatRes = await axios.get("http://localhost:5000/api/boatbookings");

  stats.value.users = usersRes.data.length;
  stats.value.bus = busRes.data.length;
  stats.value.boat = boatRes.data.length;

  const revenue = busRes.data.reduce((sum, b) => sum + (b.price || 0), 0)
    + boatRes.data.reduce((sum, b) => sum + (b.price || 0), 0);
  stats.value.revenue = revenue;
}

async function fetchRecentBookings() {
  const res = await axios.get("http://localhost:5000/api/bookings/recent");
  recentBookings.value = res.data;
}



async function fetchUpcomingArrivals() {
  const res = await axios.get("http://localhost:5000/api/bookings");
  upcomingArrivals.value = res.data.filter(b => b.arrivalTime && new Date(b.arrivalTime) > new Date()).slice(0, 5);
}
</script>

<style scoped>
.stat-card {
  color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
}
.stat-card h2 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.stat-card p {
  font-size: 2rem;
  font-weight: bold;
}
table {
  border-collapse: collapse;
  width: 100%;
}
thead {
  background-color: #f3f4f6;
}
th, td {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>
