<template>
  <div class="container mx-auto p-6">
    <h2 class="text-4xl font-bold mb-8 text-gray-900">🍽️ Available Foods</h2>

    <div class="flex flex-col md:flex-row md:space-x-8">
      <!-- Food List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
        <div
          v-for="food in foods"
          :key="food.id"
          class="bg-white rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-1 transition relative group overflow-hidden"
        >
          <!-- Optional Badge -->
          <span
            v-if="food.badge"
            class="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
          >
            {{ food.badge }}
          </span>

          <!-- Food Image -->
          <img
            :src="food.image"
            alt="food image"
            class="h-52 w-full object-cover rounded-t-2xl"
          />

          <!-- Info Block -->
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">
              {{ food.name }}
            </h3>
            <p class="text-gray-500 text-sm mb-3 line-clamp-3">
              {{ food.description }}
            </p>

            <div class="flex justify-between items-center mt-4">
              <span class="text-green-600 font-bold text-lg"
                >${{ food.price }}</span
              >
            </div>
          </div>

          <!-- Hover Add-to-Cart Overlay -->
          <div
            class="absolute bottom-0 left-0 right-0 bg-purple-600 bg-opacity-90 text-white text-sm font-medium px-4 py-3 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            <button
              @click.stop="addToCart(food)"
              class="flex items-center gap-2 hover:bg-purple-700 px-4 py-2 rounded-full"
              aria-label="Add to Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19m-8-8v8m4-8v8"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div
        v-if="cart.length"
        class="mt-10 md:mt-0 md:w-80 bg-white rounded-2xl shadow p-6 sticky top-6 h-max"
      >
        <h3 class="text-2xl font-bold mb-4 text-gray-900">🛒 Cart Summary</h3>
        <ul class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          <li
            v-for="item in cart"
            :key="item.id"
            class="py-3 flex justify-between items-center"
          >
            <div>
              <p class="font-semibold text-gray-800">{{ item.name }}</p>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
            <div class="flex items-center gap-3">
              <p class="text-green-600 font-bold">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </p>
              <button
                @click="removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700"
                aria-label="Remove"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <p class="mt-6 text-right font-extrabold text-lg text-gray-900">
          Total: ${{ cartTotal.toFixed(2) }}
        </p>
        <button
          class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition"
          @click="checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "FoodListView",
  data() {
    return {
      foods: [],
      cart: [],
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    addToCart(food) {
      const existing = this.cart.find((item) => item.id === food.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cart.push({ ...food, quantity: 1 });
      }
    },
    removeFromCart(foodId) {
      this.cart = this.cart.filter((item) => item.id !== foodId);
    },
    checkout() {
      alert("Checkout functionality coming soon!");
      // Implement your checkout logic here
    },
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5000/api/foods");
      this.foods = response.data;
    } catch (error) {
      console.error("Failed to load foods:", error);
    }
  },
};
</script>

<style scoped>
/* For truncating description text */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
