<template>
  <nav class="bg-white shadow-md border-b border-gray-200 w-full">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <!-- Logo -->
      <router-link to="/" class="flex items-center text-xl font-bold text-gray-900">
        <div class="h-10 w-10 mr-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
          <img
            src="@/assets/img/path-to-anajak-logo.png"
            alt="Anajak Travel"
            class="h-10 w-10 rounded-full"
          />
        </div>
        Anajak Travel
      </router-link>

      <!-- Links -->
      <!-- <div class="hidden md:flex space-x-6 text-sm"> -->
        <!-- <router-link to="/" class="text-blue-600 hover:text-blue-800 font-medium">Home</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-gray-900 font-medium">About Us</router-link>
        <router-link to="/guide" class="text-gray-700 hover:text-gray-900 font-medium">Traveling Guide</router-link>
        <router-link to="/blog" class="text-gray-700 hover:text-gray-900 font-medium">Blog Page</router-link>
        <router-link to="/chat" class="text-gray-700 hover:text-gray-900 font-medium">Chat</router-link> -->
      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-6 text-sm items-center relative">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About Us</router-link>
        <router-link to="/guide" class="nav-link">Traveling Guide</router-link>
        <!-- <router-link to="/chat" class="nav-link">Chat</router-link> -->

        <!-- Travel Bookings Dropdown -->
        <div @mouseenter="showDropdown = true" @mouseleave="showDropdown = false" class="relative">
          <button class="nav-link flex items-center space-x-1">
            <span>Travel Bookings</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            v-if="showDropdown"
            class="absolute left-0 mt-2 w-[640px] bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-6 grid grid-cols-2 gap-6"
          >
            <div>
              <h3 class="text-blue-600 font-semibold text-sm mb-3">TRANSPORTATIONS</h3>
              <router-link to="/FlightReservation" class="dropdown-item">✈️ Flight Reservation</router-link>
              <router-link to="/CarRental" class="dropdown-item">🚗 Car Rental</router-link>
              <router-link to="/Bustickets" class="dropdown-item">🚌 Bus Tickets</router-link>
              <router-link to="/Boatickets" class="dropdown-item">⛴️ Boat Tickets</router-link>
            </div>
            <div>
              <h3 class="text-blue-600 font-semibold text-sm mb-3">HOTELS & DINING</h3>
              <router-link to="/hotel" class="dropdown-item">🏨 Hotel Booking</router-link>
              <router-link to="/province" class="dropdown-item">🍽️ Restaurant Reservations</router-link>
            </div>
            <div>
              <h3 class="text-blue-600 font-semibold text-sm mb-3">New Feature</h3>
              <router-link to="/user-plan" class="dropdown-item">🗺️ User Plan</router-link>
              <router-link to="/TravelItinerary" class="dropdown-item">📅 Travel Itinerary</router-link>
            </div>
          </div>
        </div>

        <router-link to="/blog" class="nav-link">Blog Page</router-link>
      </div>

      <!-- Auth Buttons / Profile Dropdown -->
      <div class="flex items-center space-x-4">
        <div v-if="showDebug" class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Init: {{ isInitialized ? '✓' : '✗' }} | 
          Auth: {{ isLoggedIn ? '✓' : '✗' }} | 
          Admin: {{ isAdmin ? '✓' : '✗' }}
        </div>

        <div v-if="!isInitialized" class="flex items-center space-x-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
          <span class="text-sm text-gray-500">Loading...</span>
        </div>

        <template v-if="isInitialized">
          <!-- Not logged in -->
          <div v-if="!isLoggedIn" class="flex items-center space-x-4">
            <router-link to="/login" class="text-gray-700 hover:text-blue-600 transition">
              Login
            </router-link>
            <router-link
              to="/register"
              class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition font-medium"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Logged in -->
          <div
            v-else
            @mouseenter="showProfileDropdown = true"
            @mouseleave="showProfileDropdown = false"
            class="relative"
          >
            <button class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
              <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <img 
                  v-if="userProfile.avatar" 
                  :src="userProfile.avatar" 
                  :alt="displayName"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span v-else class="text-white text-sm font-medium">{{ userInitials }}</span>
              </div>
              <span class="font-medium">{{ displayName }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              v-if="showProfileDropdown"
              class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-10 py-2"
            >
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-sm font-medium text-gray-900">{{ displayName }}</p>
                <p class="text-xs text-gray-500">{{ userProfile.email }}</p>
                <p v-if="isAdmin" class="text-xs text-purple-600 font-medium">Admin</p>
                <p v-if="isHotelowner" class="text-xs text-purple-600 font-medium">HotelOwner</p>
                <p v-if="isReturantowner" class="text-xs text-purple-600 font-medium">ReturantOwner</p>
                
              </div>
              
              <router-link to="/profile" class="profile-dropdown-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </router-link>
              
              <router-link to="/settings" class="profile-dropdown-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </router-link>

             <router-link v-if="isAdmin" to="/admin/dashboard" class="profile-dropdown-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Admin Dashboard
            </router-link>

            <router-link v-if="isHotelowner" to="/hotel_owner/hoteldashboard" class="profile-dropdown-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 17v-2a2 2 0 012-2h4a2 2 0 012 2v2M7 10V7a2 2 0 012-2h6a2 2 0 012 2v3M4 21h16" />
              </svg>
              Hotel Dashboard
            </router-link>

            <router-link v-if="isReturantowner" to="/restaurant_owner/fooddashboard" class="profile-dropdown-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 10h16M10 14h10M10 18h10M6 14h.01M6 18h.01" />
              </svg>
              Restaurant Dashboard
            </router-link>


              <hr class="my-1 border-gray-200">

              <button @click="logout" class="profile-dropdown-item text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Mobile Menu Toggle -->
      <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu (you can fill in your mobile nav as needed) -->
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from '../stores/useAuth';

const { isLoggedIn, userProfile, userInitials, displayName, isAdmin, isInitialized, logout, initAuth,  isHotelowner,
  isReturantowner  } = useAuth();

const isMenuOpen = ref(false);
const showDropdown = ref(false);
const isMobileDropdownOpen = ref(false);
const showProfileDropdown = ref(false);
const showDebug = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}

const closeMenu = () => {
  isMenuOpen.value = false;
}

const toggleMobileDropdown = () => {
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value;
}

onMounted(async () => {
  await initAuth();
});
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

.profile-dropdown-item {
  @apply flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-150;
}

/* New styles for the navbar */
nav {
  @apply bg-white shadow-lg border-b border-gray-300 w-full; /* Ensure full width */
}

nav .max-w-screen-xl {
  @apply mx-auto px-4 sm:px-6 lg:px-8; /* Center and add padding */
}

nav .nav-link:hover {
  @apply text-blue-600 bg-gray-100 rounded-md;
}

nav .dropdown-item:hover {
  @apply bg-gray-200;
}

/* Mobile Menu Styles */
.mobile-menu {
  @apply absolute top-16 left-0 w-full bg-white shadow-lg border border-gray-200 rounded-lg z-20;
}

.mobile-menu .mobile-nav-link {
  @apply block text-center py-2 text-gray-700 font-medium hover:bg-gray-100 transition;
}

/* Profile Dropdown Styles */
.profile-dropdown-item:hover {
  @apply bg-gray-200;
}
</style>