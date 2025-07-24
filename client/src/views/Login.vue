<template>
<div class="min-h-screen flex items-center justify-center px-4 py-12 mt-[-120px]">
  <div class="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden  h-[80vh]">
    <!-- Left Side: Background Image with Text -->
    <div class="w-1/2 bg-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
            <img src="@/assets/img/login-bg.jpg" alt="Login Background" class="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 hover:opacity-80" />

      <div class="relative z-10 text-center bg-black bg-opacity-40 p-6 rounded-lg">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
          Anajak Travel
        </h1>
        <p class="text-lg font-medium bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mt-2 drop-shadow-lg">
          Welcome back!
        </p>
      </div>
    </div>
    
    <!-- Right Side: Form -->
    <div class="w-1/2 p-10 flex flex-col justify-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Sign In
      </h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="name@gmail.com" 
            autocomplete="email"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500"
            required
          />
        </div>
        
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            autocomplete="current-password"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500"
            required
          />
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50"
        >
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
        
        <p class="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-purple-600 font-medium hover:underline transition-colors duration-300">
            Register
          </router-link>
        </p>
        
        <p v-if="message" class="text-center mt-2 text-sm font-medium" :class="messageClass">
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/useAuth'

const router = useRouter()

// Form data
const email = ref('')
const password = ref('')
const message = ref('')
const messageType = ref('error')

// Use auth composable
const { login, loading, getRedirectPath } = useAuth()

// Computed properties
const messageClass = computed(() => {
  return messageType.value === 'success' 
    ? 'text-green-600' 
    : 'text-red-600'
})

// Methods
const handleLogin = async () => {
  message.value = ''
  
  const result = await login(email.value, password.value)
  
  if (result.success) {
    message.value = result.message
    messageType.value = 'success'
    
    // Clear form
    email.value = ''
    password.value = ''
    
    // Get redirect path based on user role
    const redirectPath = getRedirectPath(result.user)
    
    // Show different messages based on role
    if (result.user.role === 'admin') {
      message.value = 'Welcome Admin! Redirecting to dashboard...'
    } else {
      message.value = 'Login successful! Welcome back!'
    }
    
    // Redirect after short delay
    setTimeout(() => {
      router.push(redirectPath)
    }, 1500)
    
  } else {
    message.value = result.message
    messageType.value = 'error'
  }
}
</script>

<style scoped>
@keyframes fade-in {
from { opacity: 0; }
to { opacity: 1; }
}

.animate-fade-in { 
animation: fade-in 1s ease-in-out; 
}
</style>
