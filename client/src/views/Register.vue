<template>
  <div>
    <!-- Register Form Section -->
    <div class="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 py-12">
      <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl px-10 py-12 w-full max-w-lg transition-all duration-300">
        <h2 class="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-2">Create your account</h2>
        <p class="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">Join us and start your journey today.</p>

        <form @submit.prevent="register" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input v-model="username" type="text" placeholder="Your username" autocomplete="username"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input v-model="email" type="email" placeholder="you@example.com" autocomplete="email"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input v-model="password" type="password" placeholder="••••••••" autocomplete="new-password"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 font-semibold">
            Create account
          </button>
        </form>

        <p class="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?
          <a href="/login" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">Sign in</a>
        </p>

        <p v-if="message" class="text-center mt-4 text-sm font-medium text-red-600 dark:text-red-400">
          {{ message }}
        </p>
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
    const res = await axios.post('http://localhost:5000/api/users/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      role: 'student' // Default role
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