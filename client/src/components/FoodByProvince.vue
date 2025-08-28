<template>
  <div class="container mx-auto px-6 py-10 relative min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-4xl font-extrabold text-gray-900">
        Foods in
        <span class="text-indigo-600">{{ locationName || "Selected Province" }}</span>
      </h2>

      <div class="flex items-center space-x-4">
        <!-- Order History Button -->
        <button @click="toggleOrderHistory"
          class="p-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="View order history" title="Order History">
          📜
        </button>

        <!-- Cart Button -->
        <button @click="toggleCart"
          class="relative p-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="Toggle cart" title="Cart">
          🛒
          <span v-if="totalCartItems > 0"
            class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 select-none drop-shadow">
            {{ totalCartItems }}
          </span>
        </button>
      </div>
    </div>

    <!-- Food List -->
    <div v-if="foods.length === 0" class="text-center text-gray-500 mt-20 text-lg font-medium">
      No foods found in this province.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div v-for="food in foods" :key="food.id"
        class="bg-white rounded-3xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <router-link :to="`/foods/${food.id}`" class="block">
          <img :src="food.image" alt="Food Image" class="h-48 w-full object-cover rounded-t-3xl"
            @error="onImageError" />
        </router-link>
        <div class="p-5">
          <router-link :to="`/foods/${food.id}`" class="block hover:underline">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ food.name }}</h3>
          </router-link>
          <p class="text-indigo-600 font-semibold text-lg mb-4">$ {{ food.price.toFixed(2) }}</p>
          <button @click="addToCart(food)"
            class="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
            aria-label="Add to cart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Cart Panel -->
    <transition name="slide-fade">
      <div v-if="showCart"
        class="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl p-6 z-50 overflow-y-auto flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Your Cart</h3>
          <button @click="toggleCart" class="text-gray-600 hover:text-red-600 text-3xl font-bold leading-none"
            aria-label="Close cart">
            &times;
          </button>
        </div>

        <div v-if="cart.length === 0" class="text-center text-gray-500 mt-10 text-lg">Your cart is empty.</div>

        <div v-else class="flex-grow overflow-y-auto">
          <div v-for="item in cart" :key="item.id"
            class="mb-4 border-b border-gray-200 pb-3 flex justify-between items-center">
            <div>
              <p class="font-semibold text-gray-800">
                {{ item.name }} <span class="text-sm text-gray-500">(x{{ item.quantity }})</span>
              </p>
            </div>
            <div class="text-right space-y-1">
              <p class="font-semibold text-indigo-600">$ {{ (item.price * item.quantity).toFixed(2) }}</p>
              <button @click="removeItem(item.id)" class="text-red-600 hover:text-red-800 text-xs font-semibold"
                aria-label="Remove item">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="mt-auto pt-4 border-t border-gray-300">
          <div class="flex justify-between font-bold text-xl text-gray-900 mb-4">
            <span>Total:</span>
            <span>$ {{ totalCartPrice.toFixed(2) }}</span>
          </div>

          <button @click="submitOrder"
            class="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-full font-bold text-lg shadow-lg">
            Submit Order
          </button>
        </div>
      </div>
    </transition>

    <!-- Floating Order History Panel -->
    <!-- Floating Order History Panel -->
    <transition name="slide-fade">
      <div v-if="showOrderHistory"
        class="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl p-6 z-50 overflow-y-auto flex flex-col">
        <div class="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
          <h3 class="text-3xl font-extrabold text-gray-900">Order History</h3>
          <button @click="toggleOrderHistory"
            class="text-gray-600 hover:text-red-600 text-4xl font-bold leading-none transition"
            aria-label="Close order history" title="Close">
            &times;
          </button>
        </div>

        <div v-if="orders.length === 0" class="text-center text-gray-500 mt-10 text-lg italic">
          No past orders found.
        </div>

        <div v-else class="flex-grow overflow-y-auto">
          <div v-for="order in orders" :key="order.id"
            class="mb-6 bg-gray-50 rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-center mb-2">
              <p class="font-semibold text-lg text-gray-800">Order #{{ order.id }}</p>
              <span :class="{
                'bg-green-100 text-green-800': order.status === 'confirmed',
                'bg-red-100 text-red-800': order.status === 'cancelled',
                'bg-yellow-100 text-yellow-800': order.status !== 'confirmed' && order.status !== 'cancelled',
              }" class="px-3 py-1 rounded-full text-sm font-semibold capitalize select-none">
                {{ order.status || 'pending' }}
              </span>
            </div>

            <p class="text-gray-700 mb-1">
              <span class="font-medium">Customer:</span> {{ order.customerName }}
            </p>

            <p class="text-indigo-700 font-semibold text-lg mb-3">
              Total: ${{ order.totalPrice.toFixed(2) }}
            </p>

            <ul class="list-disc list-inside mb-4 max-h-40 overflow-y-auto text-gray-700 text-sm">
              <li v-for="food in order.Foods" :key="food.id"
                class="py-0.5 hover:text-indigo-600 transition cursor-default">
                {{ food.name }} <span class="text-gray-500">(x{{ food.OrderFoodItem.quantity }})</span>
              </li>
            </ul>

            <div class="flex justify-end">
              <button v-if="order.status !== 'cancelled'" @click="cancelOrder(order.id)"
                class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition">
                Cancel Order
              </button>
              <span v-else class="text-red-600 font-bold text-lg flex items-center space-x-2" title="Order Cancelled">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cancelled</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import axios from "axios";
import { useAuth } from "../stores/useAuth";

export default {
  name: "FoodByProvince",
  props: {
    locationId: { type: Number, required: true },
    locationName: { type: String, default: "" },
  },
  data() {
    return {
      foods: [],
      cart: [],
      showCart: false,
      showOrderHistory: false,
      orders: [],
    };
  },
  watch: {
    locationId: {
      immediate: true,
      handler() {
        this.loadFoods();
      },
    },
  },
  methods: {
    loadFoods() {
      axios
        .get(`http://localhost:5000/api/foods/by-location/${this.locationId}`)
        .then((res) => {
          this.foods = res.data;
        })
        .catch((err) => {
          console.error("Failed to load foods by province:", err);
          this.foods = [];
        });
    },
    onImageError(event) {
      event.target.src = "https://via.placeholder.com/300x200?text=No+Image";
    },
    addToCart(food) {
      const existing = this.cart.find((item) => item.id === food.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.cart.push({ ...food, quantity: 1 });
      }
      this.saveCart();
    },
    removeItem(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.saveCart();
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    toggleOrderHistory() {
      this.showOrderHistory = !this.showOrderHistory;
      if (this.showOrderHistory) {
        this.loadOrders();
      }
    },
    async loadOrders() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to view order history.");
    return;
  }

  try {
    const response = await axios.get("http://localhost:5000/api/orders", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    this.orders = response.data;
  } catch (error) {
    console.error("Failed to load order history:", error);
    this.orders = [];
    alert("Failed to load order history");
  }
},


    async cancelOrder(orderId) {
      if (!confirm("Are you sure you want to cancel this order?")) {
        return;
      }
      try {
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
        alert("Order cancelled successfully.");
        this.loadOrders(); // Refresh orders after cancel
      } catch (error) {
        console.error("Cancel order failed:", error);
        alert("Failed to cancel order.");
      }
    },
    submitOrder() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to place an order.");
        return;
      }

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      const auth = useAuth();

      const customerName = auth.userProfile.value.fullName || auth.userProfile.value.username || "Guest";

      if (this.cart.length === 0) {
        alert("Cart is empty.");
        return;
      }

      const orderPayload = {
        customerName,
        items: this.cart.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
        })),
      };

      axios.post("http://localhost:5000/api/orders", orderPayload)
        .then(() => {
          alert("Order submitted successfully!");
          this.cart = [];
          this.saveCart();
          this.showCart = false;
        })
        .catch((err) => {
          console.error("Failed to submit order:", err);
          alert("Failed to submit order");
        });
    },


    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCart() {
      const stored = localStorage.getItem("cart");
      this.cart = stored ? JSON.parse(stored) : [];
    },
  },
  computed: {
    totalCartItems() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalCartPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style scoped>
/* Slide fade for cart and order history panels */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
