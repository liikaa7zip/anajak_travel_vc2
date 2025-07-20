<template>
  <nav class="bg-white-200 shadow-md border-b border-white-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <!-- Logo -->
      <router-link to="/" class="flex items-center text-xl font-bold text-black">
        <img src="@/assets/img/path-to-anajak-logo.png" alt="Anajak Travel" class="h-10 w-10 mr-2 rounded-full" />
        Anajak Travel
      </router-link>

      <!-- Links -->
      <div class="hidden md:flex space-x-6 text-sm">
        <router-link to="/" class="text-blue-600 hover:text-blue-800 font-medium">Home</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-gray-900 font-medium">About Us</router-link>
        <router-link to="/guide" class="text-gray-700 hover:text-gray-900 font-medium">Traveling Guide</router-link>
        <router-link to="/blog" class="text-gray-700 hover:text-gray-900 font-medium">Blog Page</router-link>
      </div>

      <!-- Buttons -->
      <div class="flex items-center space-x-4">
        <router-link to="/login" class="text-gray-700 hover:text-gray-900 font-medium">Login</router-link>
        <router-link to="/signup" class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 font-medium">Sign Up</router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden px-4 pb-4 bg-gray-200">
      <router-link to="/" class="block py-2 text-gray-700 hover:text-blue-600">Home</router-link>
      <router-link to="/about" class="block py-2 text-gray-700 hover:text-gray-900">About Us</router-link>
      <router-link to="/guide" class="block py-2 text-gray-700 hover:text-gray-900">Traveling Guide</router-link>
      <router-link to="/blog" class="block py-2 text-gray-700 hover:text-gray-900">Blog Page</router-link>
      <router-link to="/login" class="block py-2 text-gray-700 hover:text-gray-900">Login</router-link>
      <router-link to="/signup" class="block py-2 bg-purple-600 text-white text-center rounded-full hover:bg-purple-700">Sign Up</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>