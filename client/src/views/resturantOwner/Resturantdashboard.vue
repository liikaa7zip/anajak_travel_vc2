<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">🍽️ Restaurant Dashboard</h1>
      <button
        @click="fetchOrders"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        🔄 Refresh
      </button>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
        <h2 class="text-sm text-gray-500">Total Orders</h2>
        <p class="text-3xl font-bold text-indigo-600">{{ totalOrders }}</p>
      </div>
      <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
        <h2 class="text-sm text-gray-500">Completed Orders</h2>
        <p class="text-3xl font-bold text-green-600">{{ completedOrders }}</p>
      </div>
      <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
        <h2 class="text-sm text-gray-500">Pending Orders</h2>
        <p class="text-3xl font-bold text-yellow-600">{{ pendingOrders }}</p>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-2xl shadow p-6 mb-10">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">🛎️ Recent Orders</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 text-sm">
            <th class="p-3">Food</th>
            <th class="p-3">Customer</th>
            <th class="p-3">Room</th>
            <th class="p-3">Quantity</th>
            <th class="p-3">Total</th>
            <th class="p-3">Status</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in latestOrders" :key="order.id" class="border-t">
             <td>{{ order.food?.name }}</td>

            <td class="p-3">{{ order.customerName }}</td>
            <td class="p-3">{{ order.roomNumber }}</td>
            <td class="p-3">{{ order.quantity }}</td>
            <td class="p-3">${{ order.totalPrice }}</td>
            <td class="p-3">
              <span
                :class="order.status === 'completed'
                  ? 'bg-green-100 text-green-600'
                  : order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-red-100 text-red-600'"
                class="px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="p-3">
              <button
                v-if="order.status !== 'completed'"
                @click="completeOrder(order.id)"
                class="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 text-xs"
              >
                ✅ Complete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Top Foods Section for Owner -->
<div class="bg-white rounded-2xl shadow p-6 mb-10">
  <h2 class="text-xl font-semibold text-gray-700 mb-6 text-center">⭐ Top Foods</h2>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div
      v-for="food in topFoods"
      :key="food.id"
      class="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 overflow-hidden flex flex-col items-center"
    >
      <!-- Top Pick Badge -->
      <div v-if="food.isTopPick" class="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
        ⭐ Top Pick
      </div>

      <!-- Active / Inactive Badge -->
      <div class="absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full shadow"
           :class="food.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
        {{ food.isActive ? 'Active' : 'Inactive' }}
      </div>

      <!-- Food Image -->
      <img
        :src="food.image ? apiBase + food.image : placeholderImage"
        alt="food"
        class="h-40 w-40 object-cover rounded-t-2xl mt-4 transition-transform duration-500 hover:scale-110"
      />

      <!-- Food Info -->
      <div class="p-4 flex flex-col items-center text-center">
        <h3 class="font-semibold text-gray-700 text-lg">{{ food.name }}</h3>
        <p class="text-purple-700 font-bold text-xl mt-1">${{ food.price }}</p>
        <p class="text-gray-500 text-sm mt-2 truncate" :title="food.description">{{ food.description || "No description" }}</p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex gap-2 mb-4">
        <button 
          @click="toggleTopPick(food)" 
          class="px-3 py-1 bg-yellow-400 text-white rounded-full text-xs hover:brightness-110 transition"
        >
          {{ food.isTopPick ? 'Remove Top Pick' : 'Set Top Pick' }}
        </button>
        <button 
          @click="toggleActive(food)" 
          class="px-3 py-1 bg-green-500 text-white rounded-full text-xs hover:brightness-110 transition"
        >
          {{ food.isActive ? 'Deactivate' : 'Activate' }}
        </button>
      </div>
    </div>
  </div>
</div>



  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      apiBase: "http://127.0.0.1:5000",
      orders: [],
      topFoods: [],
      placeholderImage: "https://placehold.co/150x150?text=Food",
    }
  },
  computed: {
    latestOrders() {
      return this.orders.slice(-5).reverse()
    },
    totalOrders() {
      return this.orders.length
    },
    completedOrders() {
      return this.orders.filter(o => o.status === "completed").length
    },
    pendingOrders() {
      return this.orders.filter(o => o.status === "pending").length
    },
  },
  methods: {
    // ================= Orders =================
    async fetchOrders() {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${this.apiBase}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        // ✅ Enrich each order with food info
        const enriched = await Promise.all(
          res.data.map(async (order) => {
            try {
              const foodRes = await axios.get(`${this.apiBase}/api/foods/${order.foodId}`)
              return {
                ...order,
                foodName: foodRes.data?.name || "Unknown Food",
                foodImage: foodRes.data?.image
                  ? this.apiBase + foodRes.data.image
                  : this.placeholderImage,
              }
            } catch {
              return {
                ...order,
                foodName: "Unknown Food",
                foodImage: this.placeholderImage,
              }
            }
          })
        )

        this.orders = enriched.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err)
      }
    },

    // ================= Foods =================
    async fetchTopFoods() {
      try {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user")) // assuming user contains hotelId
        const hotelId = user?.hotelId

        const res = await axios.get(
          `${this.apiBase}/api/foods/by-hotel/${hotelId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        this.topFoods = res.data.topPicks || []
      } catch (err) {
        console.error("❌ Failed to fetch top foods:", err)
      }
    },

    async toggleTopPick(food) {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.put(
          `${this.apiBase}/api/foods/top-pick/${food.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )

        food.isTopPick = res.data.food.isTopPick
        this.$toast?.success(res.data.message)
      } catch (err) {
        console.error("❌ Failed to toggle Top Pick:", err)
        alert("❌ Failed to toggle Top Pick")
      }
    },

    async toggleActive(food) {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.put(
          `${this.apiBase}/api/foods/toggle/${food.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )

        food.isActive = res.data.food.isActive
        this.$toast?.success(res.data.message)
      } catch (err) {
        console.error("❌ Failed to toggle active status:", err)
        alert("❌ Failed to toggle active status")
      }
    },

    // ================= Order Actions =================
    async completeOrder(orderId) {
      try {
        const token = localStorage.getItem("token")
        await axios.put(
          `${this.apiBase}/api/orders/${orderId}/complete`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const order = this.orders.find(o => o.id === orderId)
        if (order) order.status = "completed"
      } catch (err) {
        console.error("❌ Failed to complete order:", err)
        alert("❌ Failed to complete order.")
      }
    },
  },

  mounted() {
    this.fetchOrders()
    this.fetchTopFoods()

    // 🔄 Auto-refresh orders every 5s
    setInterval(this.fetchOrders, 5000)
  },
}
</script>
