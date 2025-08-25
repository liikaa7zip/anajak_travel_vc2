<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">🍽️ My Orders</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center py-16">
      <div class="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-3 text-purple-600 font-semibold">Loading your orders...</p>
    </div>

    <!-- No Orders -->
    <div v-else-if="orders.length === 0" class="text-center text-gray-500 py-16">
      <img :src="placeholderImage" class="mx-auto mb-4 w-28 h-28 object-contain" />
      <p class="text-lg italic">You haven't placed any orders yet.</p>
    </div>

    <!-- Last Order -->
    <section v-else-if="lastOrder" class="bg-white rounded-2xl shadow-lg p-5 border border-gray-200 mb-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-900">Your Last Order</h2>
        <span :class="['px-2 py-1 rounded-full text-xs font-semibold', statusPillClass(lastOrder.status)]">
          {{ normalizeStatus(lastOrder.status) }}
        </span>
      </div>

      <!-- Food details -->
      <div class="flex gap-4 items-center">
        <img
          :src="lastOrder.food?.image ? apiBase + lastOrder.food.image : placeholderImage"
          class="w-24 h-24 object-cover rounded-lg shadow"
        />
        <div class="flex-1">
          <h3 class="font-bold text-gray-900">{{ lastOrder.food?.name || 'Food Name' }}</h3>
          <p class="text-sm text-gray-600 truncate">{{ lastOrder.food?.description || 'Delicious food' }}</p>
          <p class="text-green-600 font-bold mt-1">${{ lastOrder.totalPrice.toFixed(2) }}</p>
          <p class="text-xs text-gray-500">Ordered: {{ formatDate(lastOrder.createdAt) }}</p>
        </div>
      </div>

      <!-- Progress -->
      <div class="mt-4">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all"
            :style="{ width: progressWidth(lastOrder.status) }"
          ></div>
        </div>
        <p class="mt-2 text-sm text-gray-700">
          Status: <b>{{ normalizeStatus(lastOrder.status) }}</b>
        </p>
      </div>

      <!-- Actions -->
      <div class="mt-4 flex gap-2">
        <button @click="reorder(lastOrder)"
          class="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg font-semibold">
          Reorder
        </button>
        <button v-if="lastOrder.status === 'pending'" @click="cancelOrder(lastOrder)"
          class="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold">
          Cancel
        </button>
      </div>
    </section>

    <!-- Previous Orders -->
<section v-if="previousOrders.length > 0">
  <h2 class="text-lg font-semibold mb-3 text-gray-900">Previous Orders</h2>
  <div class="space-y-3">
    <div
      v-for="order in previousOrders"
      :key="order.id"
      @click="showAsLastOrder(order)"  
      class="bg-white rounded-xl shadow p-4 flex items-center justify-between cursor-pointer hover:bg-purple-50 transition"
    >
      <div>
        <p class="font-semibold text-gray-900">{{ order.food?.name || 'Food Name' }}</p>
        <p class="text-sm text-gray-500">${{ order.totalPrice.toFixed(2) }}</p>
        <p class="text-xs text-gray-400">Ordered: {{ formatDate(order.createdAt) }}</p>
      </div>
      <span :class="['px-2 py-1 rounded-full text-xs font-semibold', statusPillClass(order.status)]">
        {{ normalizeStatus(order.status) }}
      </span>
    </div>
  </div>
</section>



  </div>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      orders: [],
      loading: true,
      placeholderImage: "https://placehold.co/150x150?text=No+Image",
      apiBase: "http://localhost:5000",
    };
  },
  computed: {
    lastOrder() {
      return this.orders.length ? this.orders[0] : null; // latest order
    },
    previousOrders() {
      return this.orders.slice(1);
    },
  },
  methods: {
    async fetchOrders() {
  this.loading = true;
  try {
    const token = localStorage.getItem("token");

    // Step 1: Fetch all orders of the current user
    const res = await axios.get(`${this.apiBase}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    let orders = res.data;

    // Step 2: For each order, fetch its food details
    orders = await Promise.all(
      orders.map(async (order) => {
        if (order.foodId) {
          try {
            const foodRes = await axios.get(`${this.apiBase}/api/foods/${order.foodId}`);
            order.food = foodRes.data; // attach food info
          } catch (err) {
            console.error(`Failed to fetch food for order ${order.id}`, err);
            order.food = null;
          }
        }
        return order;
      })
    );

    // Step 3: Sort orders by createdAt descending (latest first)
    this.orders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  } catch (err) {
    console.error("Error fetching orders:", err);
    alert("Failed to fetch orders. Please try again.");
  } finally {
    this.loading = false;
  }
},
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    normalizeStatus(status) {
      if (status === "pending") return "Pending";
      if (status === "completed") return "Delivered";
      if (status === "cancelled") return "Cancelled";
      return status;
    },
    statusPillClass(status) {
      if (status === "pending") return "bg-yellow-100 text-yellow-700";
      if (status === "completed") return "bg-green-100 text-green-700";
      if (status === "cancelled") return "bg-red-100 text-red-700";
      return "bg-gray-100 text-gray-700";
    },
    progressWidth(status) {
      if (status === "pending") return "25%";
      if (status === "completed") return "100%";
      if (status === "cancelled") return "100%";
      return "50%";
    },
    async reorder(order) {
  if (!confirm(`Reorder ${order.food?.name}?`)) return;

  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${this.apiBase}/api/orders`,
      {
        userId: order.userId,          // the user
        foodId: order.foodId,          // same food
        hotelId: order.hotelId,        // same hotel
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        roomNumber: order.roomNumber,
        quantity: order.quantity,      // same quantity
        totalPrice: order.totalPrice,  // same price
        status: "pending"
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Order placed successfully!");
    this.fetchOrders(); // refresh list so the reordered one shows at the top
  } catch (err) {
    console.error("Error reordering:", err);
    alert("Failed to reorder. Please try again.");
  }
},

    showAsLastOrder(order) {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index > -1) {
      // Swap clicked order with the first element
      const temp = this.orders[0];
      this.orders[0] = this.orders[index];
      this.orders[index] = temp;
    }
  },
    async cancelOrder(order) {
      if (!confirm("Cancel this order?")) return;
      const token = localStorage.getItem("token");
      try {
        await axios.put(
          `${this.apiBase}/api/orders/${order.id}/cancel`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.fetchOrders();
      } catch (err) {
        console.error(err);
        alert("Failed to cancel order");
      }
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
/* Hover effect for previous orders */
section div:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}
</style>
