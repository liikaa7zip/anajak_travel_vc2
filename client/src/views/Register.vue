<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
      <!-- Left Side: Background Image with Text -->
      <div class="w-1/2 bg-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
        <img src="@/assets/img/register-bg.jpg" alt="Register Background" class="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 hover:opacity-80" />
        <div class="relative z-10 text-center animate-fade-in bg-black bg-opacity-40 p-6 rounded-lg">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-bounce-slow">Anajak Travel</h1>
          <p class="text-lg font-medium bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mt-2 drop-shadow-lg animate-pulse">Explore the world with us!</p>
        </div>
      </div>

      <!-- Right Side: Form -->
      <div class="w-1/2 p-10 flex flex-col justify-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Account</h2>
        <form @submit.prevent="register" class="space-y-6">
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="username" type="text" placeholder="Enter your name" autocomplete="username"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500" />
          </div>

          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" type="email" placeholder="name@gmail.com" autocomplete="email"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500" />
          </div>

          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="password" type="password" placeholder="••••••••" autocomplete="new-password"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500" />
          </div>

          <p class="text-xs text-gray-500 animate-fade-in-slow">By signing up you agree to terms and conditions at blah.</p>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1">
            Register
          </button>

          <p class="mt-4 text-sm text-center text-gray-600">
            Already have an account?
            <a href="/login" class="text-purple-600 font-medium hover:underline transition-colors duration-300">Login</a>
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

const username = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

const register = async () => {
  try {
    // POST data without role, backend assigns 'user' role automatically
    const res = await axios.post('http://localhost:5000/api/users/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })
    message.value = 'Registration successful!'
    username.value = ''
    email.value = ''
    password.value = ''
  } catch (err) {
    message.value = err.response?.data?.message || 'Registration failed'
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
.animate-fade-in { animation: fade-in 1s ease-in-out; }
.animate-fade-in-slow { animation: fade-in-slow 2s ease-in-out; }
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
.animate-bounce { animation: bounce-slow 1s ease-in-out; }
</style>
