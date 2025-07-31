<template>
  <div class="container mx-auto px-6 py-10 relative min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-4xl font-extrabold text-gray-900">
        Foods in
        <span class="text-indigo-600">{{
          locationName || "Selected Province"
        }}</span>
      </h2>

      <button
  @click="toggleCart"
  class="relative p-3  text-white rounded-full shadow-md hover:bg-white-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
  aria-label="Toggle cart"
>
  🛒
  <span
    v-if="totalCartItems > 0"
    class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 select-none drop-shadow"
  >
    {{ totalCartItems }}
  </span>
</button>

    </div>

    <!-- Food List -->
    <div
      v-if="foods.length === 0"
      class="text-center text-gray-500 mt-20 text-lg font-medium"
    >
      No foods found in this province.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <div
        v-for="food in foods"
        :key="food.id"
        class="bg-white rounded-3xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
      >
        <router-link :to="`/foods/${food.id}`" class="block">
          <img
            :src="food.image"
            alt="Food Image"
            class="h-48 w-full object-cover rounded-t-3xl"
            @error="onImageError"
          />
        </router-link>
        <div class="p-5">
          <router-link :to="`/foods/${food.id}`" class="block hover:underline">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ food.name }}
            </h3>
          </router-link>
          <p class="text-indigo-600 font-semibold text-lg mb-4">
            $ {{ food.price.toFixed(2) }}
          </p>
          <button
            @click="addToCart(food)"
            class="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Cart Panel -->
    <transition name="slide-fade">
      <div
        v-if="showCart"
        class="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl p-6 z-50 overflow-y-auto flex flex-col"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Your Cart</h3>
          <button
            @click="toggleCart"
            class="text-gray-600 hover:text-red-600 text-3xl font-bold leading-none"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div
          v-if="cart.length === 0"
          class="text-center text-gray-500 mt-10 text-lg"
        >
          Your cart is empty.
        </div>

        <div v-else class="flex-grow overflow-y-auto">
          <div
            v-for="item in cart"
            :key="item.id"
            class="mb-4 border-b border-gray-200 pb-3 flex justify-between items-center"
          >
            <div>
              <p class="font-semibold text-gray-800">
                {{ item.name }}
                <span class="text-sm text-gray-500"
                  >(x{{ item.quantity }})</span
                >
              </p>
            </div>
            <div class="text-right space-y-1">
              <p class="font-semibold text-indigo-600">
                $ {{ (item.price * item.quantity).toFixed(2) }}
              </p>
              <button
                @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-800 text-xs font-semibold"
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="mt-auto pt-4 border-t border-gray-300">
          <div
            class="flex justify-between font-bold text-xl text-gray-900 mb-4"
          >
            <span>Total:</span>
            <span>$ {{ totalCartPrice.toFixed(2) }}</span>
          </div>

          <button
            @click="submitOrder"
            class="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-full font-bold text-lg shadow-lg"
          >
            Submit Order
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { useAuth } from "../stores/useAuth"; // Adjust the path accordingly

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
    submitOrder() {
      const auth = useAuth();
      const user = auth.userProfile.value;

      if (!user || (!user.fullName && !user.username)) {
        alert("User not logged in or name missing.");
        return;
      }
      if (this.cart.length === 0) {
        alert("Cart is empty.");
        return;
      }

      const customerName = user.fullName || user.username;

      const orderPayload = {
        customerName,
        items: this.cart.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
        })),
      };

      axios
        .post("http://localhost:5000/api/orders", orderPayload)
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
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style scoped>
/* Slide fade for cart panel */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
