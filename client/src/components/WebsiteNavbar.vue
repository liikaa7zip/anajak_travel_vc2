<template>
  <nav class="bg-white shadow-md border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <!-- Logo -->
      <router-link to="/" class="flex items-center text-xl font-bold text-gray-900">
        <img src="@/assets/img/path-to-anajak-logo.png" alt="Anajak Travel" class="h-10 w-10 mr-2 rounded-full" />
        Anajak Travel
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-6 text-sm items-center relative">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About Us</router-link>
        <router-link to="/guide" class="nav-link">Traveling Guide</router-link>

        <!-- Travel Bookings Dropdown -->
        <div @mouseenter="showDropdown = true" @mouseleave="showDropdown = false" class="relative">
          <button class="nav-link flex items-center space-x-1">
            <span>Travel Bookings</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Two-column modern dropdown -->
          <div v-if="showDropdown" class="absolute left-0 mt-2 w-[640px] bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-6 grid grid-cols-2 gap-6">
            <!-- Transportations Column -->
            <div>
              <h3 class="text-blue-600 font-semibold text-sm mb-3">TRANSPORTATIONS</h3>
              <router-link to="/travel-bookings/flights" class="dropdown-item">✈️ Flight Reservation</router-link>
              <router-link to="/travel-bookings/cars" class="dropdown-item">🚗 Car Rental</router-link>
              <router-link to="/travel-bookings/bus" class="dropdown-item">🚌 Bus Tickets</router-link>
              <router-link to="/travel-bookings/boats" class="dropdown-item">⛴️ Boat Tickets</router-link>
            </div>

            <!-- Hotel + Restaurant Column -->
            <div>
              <h3 class="text-blue-600 font-semibold text-sm mb-3">HOTELS & DINING</h3>
              <router-link to="/travel-bookings/hotels" class="dropdown-item">🏨 Hotel Booking</router-link>
              <router-link to="/food/restaurants" class="dropdown-item">🍽️ Restaurant Reservations</router-link>
            </div>
          </div>
        </div>

        <router-link to="/blog" class="nav-link">Blog Page</router-link>
      </div>

      <!-- Buttons -->
      <div class="flex items-center space-x-4">
        <router-link to="/login" class="text-gray-700 hover:text-blue-600 transition">Login</router-link>
        <router-link to="/register" class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition font-medium">Sign Up</router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden px-4 pb-4 bg-gray-100 space-y-2">
      <router-link to="/" class="mobile-nav-link">Home</router-link>
      <router-link to="/about" class="mobile-nav-link">About Us</router-link>
      <router-link to="/guide" class="mobile-nav-link">Traveling Guide</router-link>

      <!-- Collapsible Mobile Travel Bookings -->
      <div>
        <button @click="toggleMobileDropdown" class="mobile-nav-link flex justify-between w-full items-center">
          Travel Bookings
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isMobileDropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
          </svg>
        </button>
        <div v-if="isMobileDropdownOpen" class="ml-4 mt-1 space-y-1">
          <h3 class="text-xs text-blue-600 font-semibold">TRANSPORTATIONS</h3>
          <router-link to="/travel-bookings/flights" class="mobile-sub-link">✈️ Flight Reservation</router-link>
          <router-link to="/travel-bookings/cars" class="mobile-sub-link">🚗 Car Rental</router-link>
          <router-link to="/travel-bookings/bus" class="mobile-sub-link">🚌 Bus Tickets</router-link>
          <router-link to="/travel-bookings/boats" class="mobile-sub-link">⛴️ Boat Tickets</router-link>

          <h3 class="text-xs text-blue-600 font-semibold mt-2">HOTELS & DINING</h3>
          <router-link to="/travel-bookings/hotels" class="mobile-sub-link">🏨 Hotel Booking</router-link>
          <router-link to="/food/restaurants" class="mobile-sub-link">🍽️ Restaurant Reservations</router-link>
        </div>
      </div>

      <router-link to="/blog" class="mobile-nav-link">Blog Page</router-link>
      <router-link to="/login" class="mobile-nav-link">Login</router-link>
      <router-link to="/signup" class="block py-2 mt-2 bg-purple-600 text-white text-center rounded-full hover:bg-purple-700 transition">Sign Up</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const showDropdown = ref(false)
const isMobileDropdownOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleMobileDropdown = () => {
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value
}
</script>

<style scoped>
.nav-link {
  @apply relative text-gray-700 font-medium px-3 py-2 transition-all duration-200 hover:text-blue-600 hover:underline underline-offset-4;
}

.dropdown-item {
  @apply block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-all duration-150;
}

.mobile-nav-link {
  @apply block py-2 px-2 text-base text-gray-700 font-medium hover:text-blue-600 transition;
}

.mobile-sub-link {
  @apply block pl-4 py-1 text-sm text-gray-600 hover:text-blue-500 transition;
}
</style>
