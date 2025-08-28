<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold mb-6">🍛 Available Foods</h1>

    <!-- Food Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="food in foods"
        :key="food.id"
        class="bg-white shadow rounded-xl p-4 flex flex-col"
      >
        <img
          v-if="food.imageUrl"
          :src="food.imageUrl"
          class="w-full h-40 object-cover rounded mb-2"
        />
        <h2 class="text-xl font-semibold">{{ food.name }}</h2>
        <p class="text-gray-600 mb-2">Price: ${{ food.price }}</p>

        <div class="flex items-center space-x-2 mt-auto">
          <input
            v-model.number="quantities[food.id]"
            type="number"
            min="1"
            class="border rounded px-2 py-1 w-20"
          />
          <button
            @click="addToCart(food)"
            class="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Section -->
    <div class="mt-10 bg-gray-50 p-6 rounded-xl shadow">
      <h2 class="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      <div v-if="cart.length === 0" class="text-gray-500">
        No items in cart.
      </div>
      <div v-else>
        <ul class="space-y-2">
          <li
            v-for="item in cart"
            :key="item.foodId"
            class="flex justify-between items-center bg-white p-3 rounded"
          >
            <div>
              {{ item.name }} x {{ item.quantity }}
            </div>
            <div>${{ item.quantity * item.price }}</div>
          </li>
        </ul>

        <div class="text-right font-semibold mt-4">
          Total: ${{ cartTotal }}
        </div>

        <!-- Customer Name -->
        <div class="mt-4">
          <input
            v-model="customerName"
            type="text"
            placeholder="Enter your name"
            class="border px-4 py-2 w-full sm:w-1/2"
          />
        </div>

        <!-- Submit Button -->
        <button
          @click="submitOrder"
          class="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const foods = ref([])
const cart = ref([])
const quantities = ref({})
const customerName = ref('')

// Load food list
onMounted(async () => {
  try {
    const res = await axios.get('/api/foods')
    foods.value = res.data
    loadCart()
  } catch (err) {
    console.error('Failed to fetch foods', err)
  }
})

// Add to cart
function addToCart(food) {
  const qty = quantities.value[food.id] || 1
  if (qty <= 0) return

  const existing = cart.value.find((item) => item.foodId === food.id)
  if (existing) {
    existing.quantity += qty
  } else {
    cart.value.push({
      foodId: food.id,
      name: food.name,
      price: food.price,
      quantity: qty,
    })
  }

  quantities.value[food.id] = 1
  saveCart()
}

// Save/load cart from localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
function loadCart() {
  const stored = localStorage.getItem('cart')
  if (stored) {
    cart.value = JSON.parse(stored)
  }
}

const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// Submit order
async function submitOrder() {
  if (!customerName.value || cart.value.length === 0) {
    alert('Please fill your name and add items.')
    return
  }

  const payload = {
    customerName: customerName.value,
    items: cart.value.map((item) => ({
      foodId: item.foodId,
      quantity: item.quantity,
    })),
  }

  try {
    const res = await axios.post('/api/orders', payload)
    alert('Order submitted! ID: ' + res.data.orderId)
    cart.value = []
    customerName.value = ''
    localStorage.removeItem('cart')
  } catch (err) {
    console.error(err)
    alert('Failed to submit order')
  }
}
</script>
