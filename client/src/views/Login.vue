<template>
  <div class="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center px-4 py-12">
    <div class="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
      <!-- Left Side: Background Image with Text -->
      <div class="w-1/2 bg-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
        <img src="@/assets/img/login-bg.jpg" alt="Login Background" class="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 hover:opacity-80" />
        <div class="relative z-10 text-center animate-fade-in bg-black bg-opacity-40 p-6 rounded-lg">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-bounce-slow">Anajak Travel</h1>
          <p class="text-lg font-medium bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mt-2 drop-shadow-lg animate-pulse">Welcome back to your journey!</p>
        </div>
      </div>

      <!-- Right Side: Form -->
      <div class="w-1/2 p-10 flex flex-col justify-center bg-gradient-to-b from-white to-gray-50">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in-slow">Welcome Back</h2>
        <form @submit.prevent="login" class="space-y-6">
          <div class="relative group">
            <label for="email" class="block text-sm font-medium text-gray-700 transform transition-all duration-300 group-hover:text-purple-600">Email address</label>
            <input v-model="email" type="email" id="email" placeholder="you@example.com" autocomplete="email"
              class="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-white/90 backdrop-blur-sm" required />
          </div>

          <div class="relative group">
            <label for="password" class="block text-sm font-medium text-gray-700 transform transition-all duration-300 group-hover:text-purple-600">Password</label>
            <input v-model="password" type="password" id="password" placeholder="••••••••" autocomplete="current-password"
              class="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-white/90 backdrop-blur-sm" required />
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="rememberMe" class="form-checkbox text-purple-600 rounded border-gray-300 transition duration-300 hover:border-purple-500" />
              <span class="text-gray-700 animate-pulse-slow">Remember me</span>
            </label>
            <a href="#" class="text-purple-600 hover:underline transition-colors duration-300 animate-pulse-slow">Forgot password?</a>
          </div>

          <button type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-pulse-slow">
            Sign in
          </button>

          <p class="text-sm text-center text-gray-600 mt-4">
            Don't have an account?
            <a href="/register" class="text-purple-600 font-medium hover:underline transition-colors duration-300 animate-pulse-slow">Sign up</a>
          </p>

          <p v-if="message" class="text-center mt-2 text-sm font-medium text-red-600 animate-bounce">
            {{ message }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const message = ref('')
const router = useRouter() // ← Import router

const login = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email: email.value,
      password: password.value
    })

    const user = res.data.user
    const token = res.data.token

    message.value = 'Login successful!'
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', email.value)
    }

    // ✅ Redirect admin to dashboard
    // After successful login
if (user.role === 'admin') {
  this.$router.push('/admin/dashboard')  // <-- Use this path
} else {
  this.$router.push('/home')
}


    email.value = ''
    password.value = ''
  } catch (err) {
    message.value = err.response?.data?.message || 'Login failed'
  }
}
</script>


<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fade-in-slow {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-fade-in { animation: fade-in 1s ease-in-out; }
.animate-fade-in-slow { animation: fade-in-slow 2s ease-in-out; }
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
.animate-bounce { animation: pulse-slow 1s ease-in-out; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
</style>