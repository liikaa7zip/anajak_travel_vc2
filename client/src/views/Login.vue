<template>
  <section class="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-200 min-h-screen flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-md bg-white/90 backdrop-blur-sm dark:bg-gray-900 rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2 animate-fade-in">
        Welcome back 👋
      </h2>
      <p class="text-center text-sm text-gray-500 dark:text-gray-400 mb-6 animate-fade-in-slow">
        Sign in to explore the world with Anajak Travel
      </p>

      <form @submit.prevent="login" class="space-y-6">
        <div class="relative group">
          <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white transform transition-all duration-300 group-hover:text-purple-600">Email address</label>
          <input v-model="email" type="email" id="email" placeholder="you@example.com" autocomplete="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-gray-50/90 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
        </div>

        <div class="relative group">
          <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white transform transition-all duration-300 group-hover:text-purple-600">Password</label>
          <input v-model="password" type="password" id="password" placeholder="••••••••" autocomplete="current-password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-gray-50/90 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="rememberMe" class="form-checkbox text-purple-600 rounded border-gray-300 dark:border-gray-600 transition duration-300 hover:border-purple-500" />
            <span class="text-gray-700 dark:text-gray-300 animate-pulse-slow">Remember me</span>
          </label>
          <a href="#" class="text-purple-600 hover:underline dark:text-purple-400 transition-colors duration-300 animate-pulse-slow">Forgot password?</a>
        </div>

        <button type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg py-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-pulse-slow">
          Sign in
        </button>

        <p class="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?
          <a href="/register" class="text-purple-600 dark:text-purple-400 font-medium hover:underline transition-colors duration-300 animate-pulse-slow">Sign up</a>
        </p>

        <p v-if="message" class="text-center mt-4 text-sm font-medium text-red-600 dark:text-red-400 animate-bounce">
          {{ message }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const message = ref('')

const login = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email: email.value,
      password: password.value
    })
    message.value = 'Login successful!'
    localStorage.setItem('token', res.data.token)
    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', email.value)
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
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-fade-in { animation: fade-in 1s ease-in-out; }
.animate-fade-in-slow { animation: fade-in-slow 2s ease-in-out; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
.animate-bounce { animation: pulse-slow 1s ease-in-out; }
</style>