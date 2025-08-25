  <template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 text-purple-700">📦 Restaurant Orders</h1>

      <!-- Filter & Export -->
      <div class="mb-4 flex gap-3 flex-wrap items-center justify-between">
<div class="flex gap-2 relative">
  <button
    v-for="s in ['all','pending','completed','cancelled']"
    :key="s"
    @click="filterStatus = s"
    :class="[
      'relative py-2 px-5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105',
      filterStatus === s 
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    ]"
  >
    <span v-if="s === 'pending'">⏳</span>
    <span v-else-if="s === 'completed'">✅</span>
    <span v-else-if="s === 'cancelled'">❌</span>
    <span v-else>📋</span>
    {{ s.charAt(0).toUpperCase() + s.slice(1) }}
    
    <span
      v-if="filterStatus === s"
      class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-md"
    ></span>
  </button>
</div>


        <!-- Export Button -->
        <button
          @click="exportCSV"
          class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          📥 Export CSV
        </button>
      </div>

      <!-- Orders Table -->
      <div class="overflow-x-auto shadow-lg rounded-xl mt-10">
        <table class="min-w-full bg-white">
          <thead class="bg-purple-600 text-white">
            <tr>
              <th class="py-3 px-4 text-left">Food</th>
              <th class="py-3 px-4 text-left">Customer</th>
              <th class="py-3 px-4 text-left">Phone</th>
              <th class="py-3 px-4 text-left">Room</th>
              <th class="py-3 px-4 text-left">Quantity</th>
              <th class="py-3 px-4 text-left">Total</th>
              <th class="py-3 px-4 text-left">Status</th>
              <th class="py-3 px-4 text-left">Ordered At</th>
              <th class="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id" class="border-b hover:bg-purple-50 transition">

              <td class="py-3 px-4 flex items-center gap-2 ">
                <img :src="order.foodImage || placeholderImage" class="w-12 h-12 rounded-lg object-cover"/>
                <span>{{ order.foodName || 'Unknown Food' }}</span>
              </td>
              <td class="py-3 px-4">{{ order.customerName || 'Unknown' }}</td>
              <td class="py-3 px-4">{{ order.customerPhone || 'N/A' }}</td>
              <td class="py-3 px-4">{{ order.roomNumber || 'N/A' }}</td>
              <td class="py-3 px-4">{{ order.quantity }}</td>
              <td class="py-3 px-4 font-bold text-green-600">${{ order.totalPrice.toFixed(2) }}</td>
              <td class="py-3 px-4">
                <span :class="statusClass(order.status) + ' px-2 py-1 rounded-full text-xs font-semibold'">
                  {{ normalizeStatus(order.status) }}
                </span>
              </td>
              <td class="py-3 px-4">{{ formatDate(order.createdAt) }}</td>

              <td class="py-3 px-4 text-center align-middle whitespace-nowrap">
  <div class="inline-flex space-x-2">
    <!-- Complete button -->
    <button
      v-if="order.status === 'pending'"
      @click="completeOrder(order.id)"
      class="bg-green-200 text-green-800 min-w-[70px] py-1 px-2 text-xs rounded-full shadow-sm hover:bg-green-300 transition"
    >
      ✅ Complete
    </button>

    <!-- Cancel button -->
    <button
      v-if="order.status === 'pending'"
      @click="cancelOrder(order.id)"
      class="bg-red-200 text-red-800 min-w-[70px] py-1 px-2 text-xs rounded-full shadow-sm hover:bg-red-300 transition"
    >
      ❌ Cancel
    </button>

    <!-- Delete button -->
    <button
      v-if="order.status === 'completed' || order.status === 'cancelled'"
      @click="deleteOrder(order.id)"
      class="bg-gray-200 text-gray-800 min-w-[70px] py-1 px-2 text-xs rounded-full shadow-sm hover:bg-gray-300 transition"
    >
      🗑 Delete
    </button>
  </div>
</td>





            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="9" class="text-center py-6 text-gray-500 italic">No orders found.</td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center items-center gap-2 py-4">
    <button 
      :disabled="currentPage === 1"
      @click="currentPage--"
      class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
    >
      Prev
    </button>

    <span>Page {{ currentPage }} / {{ totalPages }}</span>

    <button 
      :disabled="currentPage === totalPages"
      @click="currentPage++"
      class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
    >
      Next
    </button>
  </div>

      </div>
    </div>
  </template>

  <script>
  import axios from "axios";
  import { useOrdersStore } from '@/stores/orders'

  export default {
    data() {
      return {
        orders: [],
        loading: true,
        apiBase: "http://localhost:5000",
        placeholderImage: "https://via.placeholder.com/50x50?text=No+Image",
        filterStatus: "all",
        currentPage: 1,      // current page
        pageSize: 10,   
        dropdownOpen: null, 
      };
    },

    directives: {
    clickOutside: {
      beforeMount(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event); // call the method
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
    computed: {
    filteredOrders() {
      let filtered = this.filterStatus === "all" ? this.orders : this.orders.filter(o => o.status === this.filterStatus);
      return filtered;
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredOrders.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.pageSize);
    }
  },

    mounted() {
      this.fetchOrders();
    },
    methods: {
      toggleDropdown(orderId) {
      this.dropdownOpen = this.dropdownOpen === orderId ? null : orderId;
    },
    closeDropdown(orderId) {
      if (this.dropdownOpen === orderId) {
        this.dropdownOpen = null;
      }
    },
      async fetchOrders() {
        this.loading = true;
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${this.apiBase}/api/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const ordersWithFood = await Promise.all(
            res.data.map(async (order) => {
              try {
                const foodRes = await axios.get(`${this.apiBase}/api/foods/${order.foodId}`);
                return {
                  ...order,
                  foodName: foodRes.data.name,
                  foodImage: foodRes.data.image ? this.apiBase + foodRes.data.image : this.placeholderImage,
                };
              } catch {
                return { ...order, foodName: "Unknown Food", foodImage: this.placeholderImage };
              }
            })
          );

          this.orders = ordersWithFood.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } catch (err) {
          console.error("Error fetching orders:", err);
          alert("Failed to load orders.");
        } finally {
          this.loading = false;
        }
      },
      normalizeStatus(status) {
        if (status === "pending") return "⏳ Pending";
        if (status === "completed") return "✅ Completed";
        if (status === "cancelled") return "❌ Cancelled";
        return status;
      },
      statusClass(status) {
        if (status === "pending") return "bg-yellow-100 text-yellow-700";
        if (status === "completed") return "bg-green-100 text-green-700";
        if (status === "cancelled") return "bg-red-100 text-red-700";
        return "bg-gray-100 text-gray-700";
      },
      formatDate(date) {
    return new Date(date).toLocaleDateString();
  },
      async completeOrder(orderId) {
        try {
          const token = localStorage.getItem("token");
          await axios.put(`${this.apiBase}/api/orders/${orderId}/complete`, {}, { headers: { Authorization: `Bearer ${token}` } });
          this.fetchOrders();
        } catch {
          alert("Failed to complete order.");
        }
      },
      async cancelOrder(orderId) {
        if (!confirm("Cancel this order?")) return;
        try {
          const token = localStorage.getItem("token");
          await axios.put(`${this.apiBase}/api/orders/${orderId}/cancel`, {}, { headers: { Authorization: `Bearer ${token}` } });
          this.fetchOrders();
        } catch {
          alert("Failed to cancel order.");
        }
      },
      async deleteOrder(orderId) {
        if (!confirm("Delete this order?")) return;
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${this.apiBase}/api/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });
          this.fetchOrders();
        } catch {
          alert("Failed to delete order.");
        }
      },

      // ================= Export CSV =================
      exportCSV() {
    if (this.filteredOrders.length === 0) {
      alert("No orders to export.");
      return;
    }

    const header = ["Food", "Customer", "Phone", "Room", "Quantity", "Total", "Status", "Ordered At"];
    const rows = this.filteredOrders.map(o => [
      o.foodName || "",
      o.customerName || "",
      o.customerPhone || "",
      o.roomNumber || "",
      o.quantity,
      o.totalPrice.toFixed(2),
      this.normalizeStatus(o.status),
      this.formatDate(o.createdAt),
    ]);

    // Add UTF-8 BOM
    const bom = "\uFEFF";

    let csvContent = bom 
      + header.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_${this.filterStatus}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


  },

    },};
  </script>
