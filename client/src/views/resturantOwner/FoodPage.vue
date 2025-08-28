<template>
  <div class="container mx-auto px-4 py-10">

    <!-- Hero Section with button -->
    <div class="relative mb-16 rounded-3xl overflow-hidden shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80"
        alt="Food Hero"
        class="w-full h-96 object-cover transform transition-transform duration-500 hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
        <h1 class="text-5xl font-extrabold mb-3 drop-shadow-lg animate-fadeIn">🍽️ Food Menu</h1>
        <p class="text-lg max-w-2xl animate-fadeIn delay-200 mb-6">Discover delicious meals freshly prepared for you. Choose from our special selections below.</p>
        <button @click="scrollToFoods"
          class="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transition flex items-center gap-2"
        >
          Explore Menu
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin h-16 w-16 rounded-full border-t-4 border-purple-600"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 text-lg">
      {{ error }}
    </div>

    <!-- Top Picks Carousel -->
<div v-if="topPicks.length > 0" class="mb-14">
  <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">🔥 Top Picks</h2>
  <div class="flex justify-center space-x-6 overflow-x-auto py-2 px-1 scrollbar-hide">
    <div
      v-for="food in topPicks.slice(0, 3)"
      :key="'top-'+food.id"
      class="w-72 h-96 bg-white rounded-2xl shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
    >
      <!-- Top Pick Ribbon -->
      <div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">
        TOP PICK
      </div>

      <!-- Image -->
      <img
        :src="food.image ? `http://localhost:5000${food.image}` : placeholderImage"
        @error="onImageError"
        class="w-full h-48 object-cover rounded-t-2xl transform transition-transform duration-500 group-hover:rotate-1 group-hover:scale-110"
      />

      <!-- Content -->
      <div class="p-4 flex flex-col flex-1 justify-between text-center relative z-10">
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-1">{{ food.name }}</h3>
          <p class="text-gray-600 text-sm truncate" :title="food.description">
            {{ food.description || "No description yet." }}
          </p>
        </div>
        <div class="mt-4 flex flex-col gap-2">
          <p class="text-lg font-semibold text-purple-700">${{ food.price.toFixed(2) }}</p>
          <button
            @click="buyFood(food)"
            class="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Buy Now
          </button>
        </div>
      </div>

      <!-- Overlay for depth -->
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition rounded-2xl pointer-events-none"></div>
    </div>
  </div>
</div>



    <!-- Category Filters -->
<div class="flex flex-wrap justify-center gap-3 mb-2 relative">
  <div class="flex flex-wrap gap-3">
    <button v-for="cat in categories" :key="cat.id"
      @click="filterByCategory(cat.id)"
      class="px-4 py-2 rounded-full border border-purple-400 text-purple-600 hover:bg-purple-600 hover:text-white transition"
    >
      {{ cat.name }}
    </button>
    <button @click="filterByCategory(null)"
      class="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-600 hover:text-white transition"
    >
      All
    </button>
  </div>

  <!-- Right-aligned button -->
  <div class="w-full flex justify-end mt-2">
    <router-link
      to="/my-orders"
      class="px-4 py-2 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
    >
      View My Orders
    </router-link>
  </div>
</div>


    

    <!-- Regular Foods Grid -->
<div ref="foodSection" v-if="filteredFoods.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  <div
    v-for="food in filteredFoods"
    :key="food.id"
    class="relative group rounded-2xl overflow-hidden shadow-lg transform transition hover:-translate-y-2 hover:scale-105 hover:shadow-2xl h-96 flex flex-col"
  >
    <!-- Gradient Border -->
    <div class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-40 group-hover:opacity-70 transition"></div>

    <!-- Card Content -->
    <div class="relative bg-white/80 backdrop-blur-md rounded-2xl p-5 flex flex-col h-full overflow-hidden">
      
      <!-- Image -->
      <div class="relative">
        <img
          :src="food.image ? `http://localhost:5000${food.image}` : placeholderImage"
          @error="onImageError"
          class="w-full h-40 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
        />
        
        <!-- Floating Price Tag -->
        <div class="absolute -bottom-3 right-4 bg-white/90 backdrop-blur-md text-green-800 font-bold px-3 py-1 rounded-full shadow-lg border border-green-400 text-sm transition-transform duration-300 group-hover:scale-105">
          ${{ food.price.toFixed(2) }}
        </div>
      </div>

      <!-- Content -->
      <div class="mt-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">{{ food.name }}</h3>
          <p class="text-gray-600 text-sm mb-2 truncate" :title="food.description">
            {{ food.description || "No description yet." }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="mt-2 flex gap-2">
          <button
            @click="addToCart(food)"
            class="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
          >
            Add to Cart
          </button>
          <button
            @click="quickView(food)"
            class="flex-1 border border-purple-500 text-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition"
          >
            Quick View
          </button>
        </div>
      </div>

      <!-- Overlay for subtle depth effect -->
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition rounded-2xl pointer-events-none"></div>
    </div>
  </div>
</div>

    <!-- No Foods -->
    <div v-else class="flex flex-col items-center justify-center mt-16 text-center text-gray-500">
      <img src="https://placehold.co/200x200?text=No+Food" alt="No food" class="mb-4">
      <p class="text-lg italic">No foods available for this hotel yet.</p>
    </div>

    <!-- Floating Cart Button -->
<div class="fixed bottom-6 left-6 z-50">
  <button @click="showCartModal = true"
    class="bg-pink-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-pink-600 transition">
    🛒 Cart ({{ cart.length }})
  </button>
</div>

<!-- Cart Modal -->
<div v-if="showCartModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
    <button @click="showCartModal = false"
      class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">✕</button>
    
    <h2 class="text-2xl font-bold text-purple-700 mb-4">🛒 Your Cart</h2>

    <div v-if="cart.length > 0" class="space-y-4 max-h-96 overflow-y-auto">
      <div v-for="item in cart" :key="item.food.id" class="flex justify-between items-center border-b pb-2">
        <div>
          <p class="font-semibold">{{ item.food.name }}</p>
          <p class="text-sm text-gray-500">Price: ${{ item.food.price.toFixed(2) }}</p>
          <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <button @click="item.quantity++" class="text-green-600 font-bold">+</button>
          <button @click="item.quantity = item.quantity > 1 ? item.quantity - 1 : 1" class="text-yellow-600 font-bold">-</button>
          <button @click="removeFromCart(item.food.id)" class="text-red-600 font-bold">🗑</button>
        </div>
      </div>

      <!-- User Info Inputs -->
      <div class="mt-4 space-y-2">
        <input v-model="cartOrderForm.name" type="text" placeholder="Your Name"
          class="w-full border px-3 py-2 rounded-lg" required />
        <input v-model="cartOrderForm.phone" type="text" placeholder="Phone Number"
          class="w-full border px-3 py-2 rounded-lg" required />
        <input v-model="cartOrderForm.room" type="text" placeholder="Room Number (optional)"
          class="w-full border px-3 py-2 rounded-lg" />
      </div>

      <p class="font-semibold text-lg text-right mt-2">
        Total: ${{ cartTotal.toFixed(2) }}
      </p>
    </div>

    <div v-else class="text-gray-500 text-center">Your cart is empty.</div>

    <button @click="placeCartOrder"
      class="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
      :disabled="cart.length === 0 || !cartOrderForm.name || !cartOrderForm.phone">
      Confirm Order
    </button>
  </div>
</div>


  </div>



</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const hotelId = route.params.id

const topPicks = ref([])
const regularFoods = ref([])
const categories = ref([])
const filteredFoods = ref([])
const loading = ref(false)
const error = ref(null)
const placeholderImage = 'https://via.placeholder.com/400x250?text=No+Image'
const showCartModal = ref(false)
const cart = ref([])

const showOrderModal = ref(false)
const selectedFood = ref(null)
const orderForm = ref({
  name: '',
  phone: '',
  room: '',
  quantity: 1
})

const cartOrderForm = ref({
  name: '',
  phone: '',
  room: ''
})

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.food.price * item.quantity, 0)
})

const removeFromCart = (foodId) => {
  const index = cart.value.findIndex(i => i.food.id === foodId)
  if (index !== -1) cart.value.splice(index, 1)
}

const cartItems = cart.value.map(item => ({
  foodId: item.food.id,
  quantity: item.quantity
}));


const addToCart = (food) => {
  // Check if already in cart
  const existing = cart.value.find(item => item.food.id === food.id)
  if (existing) {
    existing.quantity += 1 // increment quantity if already in cart
  } else {
    cart.value.push({ food, quantity: 1 }) // add new food
  }
  alert(`✅ ${food.name} added to cart!`)
}

// Place cart order
async function placeCartOrder() {
  try {
    if (!cartOrderForm.value.name || !cartOrderForm.value.phone) {
      alert("Please enter your name and phone");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('user')) || null;
    if (!currentUser) {
      alert("You must be logged in to place an order.");
      return;
    }

    const token = localStorage.getItem('token'); // your JWT

    // Use cart.value.map instead of cart.map
    const orderPayload = cart.value.map(item => ({
      userId: currentUser.id,
      foodId: item.food.id,
      hotelId: item.food.hotelId,
      customerName: cartOrderForm.value.name,
      customerPhone: cartOrderForm.value.phone,
      roomNumber: cartOrderForm.value.room,
      quantity: item.quantity,
      totalPrice: item.food.price * item.quantity
    }));

    for (let order of orderPayload) {
      await axios.post('http://localhost:5000/api/orders', order, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    alert("✅ Order placed successfully!");
    cart.value = [];
    cartOrderForm.value = { name: '', phone: '', room: '' };
    showCartModal.value = false;

  } catch (err) {
    console.error(err);
    alert("❌ Failed to place order. Check console for details.");
  }
}



const fetchFoods = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`http://localhost:5000/api/foods/by-hotel/${hotelId}`)
    topPicks.value = res.data.topPicks || []
    regularFoods.value = res.data.regularFoods || []
    filteredFoods.value = regularFoods.value
    categories.value = res.data.categories || []
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load foods. Please try again.'
  } finally { loading.value = false }
}

const buyFood = (food) => {
  selectedFood.value = food
  showOrderModal.value = true
}

const placeOrder = async () => {
  if (!selectedFood.value) return

  try {
    // Get logged-in user
    const currentUser = JSON.parse(localStorage.getItem('user')) || null

    // Build payload
    const payload = {
      userId: currentUser ? currentUser.id : null,   // assign logged-in user if exists
      foodId: selectedFood.value.id,
      hotelId,
      customerName: orderForm.value.name,
      customerPhone: orderForm.value.phone,
      roomNumber: orderForm.value.room || null,
      quantity: orderForm.value.quantity,
      totalPrice: selectedFood.value.price * orderForm.value.quantity,
      status: "pending"
    }

    // Send order to backend
    await axios.post('http://localhost:5000/api/orders', payload)

    alert('✅ Your order has been placed! Food will be delivered to your room.')

    // Reset modal and form
    showOrderModal.value = false
    orderForm.value = { name: '', phone: '', room: '', quantity: 1 }

  } catch (err) {
    console.error('Error placing order:', err)
    alert('❌ Failed to place order. Try again.')
  }
}



const quickView = (food) => {
  alert(`Quick view for "${food.name}": \nPrice: $${food.price.toFixed(2)} \nDescription: ${food.description || 'Delicious!'}`)
}

const filterByCategory = (catId) => {
  filteredFoods.value = catId ? regularFoods.value.filter(f => f.category?.id === catId) : regularFoods.value
}

onMounted(() => fetchFoods())
</script>


<style scoped>
.container { max-width: 1200px; }

.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Animations */
@keyframes fadeIn { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}
.animate-fadeIn { animation: fadeIn 0.8s ease forwards; }

@keyframes bounce { 
  0%, 100% { transform: translateY(0); } 
  50% { transform: translateY(-8px); } 
}
.animate-bounce { animation: bounce 1.5s infinite; }

@keyframes pulse { 
  0%, 100% { transform: scale(1); opacity: 1; } 
  50% { transform: scale(1.05); opacity: 0.8; } 
}
.animate-pulse { animation: pulse 1.5s infinite; }

/* Hero */
.hero-text h1 { text-shadow: 0 4px 20px rgba(0,0,0,0.6); }
.hero-text p { text-shadow: 0 2px 12px rgba(0,0,0,0.5); }

/* Top Picks */
.top-pick-card {
  background: linear-gradient(135deg, #fbc2eb, #a18cd1, #fad0c4);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform 0.4s, box-shadow 0.4s;
  position: relative;
}
.top-pick-card:hover {
  transform: scale(1.08) rotate(-1deg);
  box-shadow: 0 15px 40px rgba(0,0,0,0.35);
}
.top-pick-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 1.5rem;
  transition: transform 0.5s;
}
.top-pick-card:hover img {
  transform: scale(1.1) rotate(1deg);
}
.top-pick-card h3 {
  background: linear-gradient(to right, #ff6ec4, #7873f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.top-pick-card p {
  color: #555;
}

/* Glassmorphism for regular foods */
.food-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  border-radius: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  transition: transform 0.3s, box-shadow 0.3s;
}
.food-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}

/* Regular Foods */
.food-card img {
  width: 100%;
  height: 220px; /* fixed height for all regular food images */
  object-fit: cover;
  border-radius: 1.5rem;
  transition: transform 0.4s;
}

.food-card:hover img {
  transform: scale(1.08) rotate(-1deg);
}

/* Buttons */
button {
  transition: all 0.3s;
}
button:hover {
  transform: scale(1.05) translateY(-2px);
}
.bg-gradient-pulse {
  background: linear-gradient(270deg, #ff6ec4, #7873f5, #42e695);
  background-size: 600% 600%;
  animation: pulseGradient 6s ease infinite;
}

/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Hover animations for card and image */
.group:hover img {
  transform: scale(1.1) rotate(1deg);
}

/* Floating price tag animation */
.group:hover .absolute.-bottom-3 {
  transform: scale(1.05);
  transition: transform 0.3s;
}

/* Glassmorphism card style */
.bg-white\/80 {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 1.5rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  transition: transform 0.3s, box-shadow 0.3s;
}
@keyframes pulseGradient {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
</style>

