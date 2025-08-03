<template>
  <aside class="w-64 h-screen bg-gradient-to-b from-white via-purple-50 to-purple-100 text-gray-500 flex flex-col py-6 px-4 shadow-2xl rounded-r-xl">
    <!-- Logo/Header -->
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
        Admin Panel
      </h2>
    </div>

    <!-- Navigation -->
 <nav class="flex-1 overflow-y-auto space-y-6 p-4 bg-white h-screen">
    <!-- Main Section -->
    <div>
      <p class="text-xs uppercase text-gray-400 px-2 mb-1">Main</p>
      <ul class="space-y-1 text-sm">
        <li>
          <router-link to="/home" class="nav-link" active-class="router-link-exact-active">
            <i class="icon ri-global-line"></i>
            Go to Website
          </router-link>
        </li>
        <li>
          <router-link to="/admin/dashboard" class="nav-link" active-class="router-link-exact-active">
            <i class="icon ri-dashboard-3-line"></i>
            Dashboard
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Manage Section -->
    <div>
      <p class="text-xs uppercase text-gray-400 px-2 mb-1">Manage</p>
      <ul class="space-y-1 text-sm">
        <!-- Users -->
        <li>
          <router-link to="/admin/users" class="nav-link" active-class="router-link-exact-active">
            <i class="icon ri-user-line"></i>
            Users
          </router-link>
        </li>

        <!-- Booking Dropdown -->
        <li>
          <button @click="showBookingMenu = !showBookingMenu" class="nav-link flex items-center justify-between w-full">
            <span class="flex items-center space-x-2">
              <i class="icon ri-calendar-check-line"></i>
              <span>Booking</span>
            </span>
            <svg :class="{ 'rotate-180': showBookingMenu }" class="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Booking Submenu -->
          <ul v-show="showBookingMenu" class="ml-8 mt-1 space-y-1 transition-all">
            <li>
              <router-link to="/admin/flight" class="block py-1 hover:text-blue-500">Flight</router-link>
            </li>
            <li>
              <router-link to="/admin/boat" class="block py-1 hover:text-blue-500">Boat</router-link>
            </li>
            <li>
              <router-link to="/admin/booking/bus" class="block py-1 hover:text-blue-500">Bus</router-link>
            </li>
            <li>
              <router-link to="/admin/hotel" class="block py-1 hover:text-blue-500">Hotel</router-link>
            </li>
          </ul>
        </li>

        <!-- Other Items -->
        <li>
          <a href="#" class="nav-link">
            <i class="icon ri-restaurant-line"></i>
            Food
          </a>
        </li>
        <li>
          <router-link to="/admin/blog" class="nav-link" active-class="router-link-exact-active">
            <i class="icon ri-article-line"></i>
            Blog
          </router-link>
        </li>
        <li>
          <a href="#" class="nav-link">
            <i class="icon ri-map-pin-line"></i>
            Travel Guide
          </a>
        </li>
        <li>
          <router-link to="/admin/chat" class="nav-link" active-class="router-link-exact-active">
            <i class="icon ri-message-3-line"></i>
            Contact Messages
          </router-link>
        </li>
        <li>
          <a href="#" class="nav-link">
            <i class="icon ri-bar-chart-2-line"></i>
            Reports
          </a>
        </li>
      </ul>
    </div>
  </nav>

    <!-- Account Dropdown -->
    <div class="relative mt-auto">
      <div @click="isOpen = !isOpen" class="cursor-pointer px-4 py-2 text-sm font-medium rounded-lg hover:bg-purple-100 flex items-center justify-between">
        <span class="text-purple-700">Account</span>
        <i class="ri-arrow-down-s-line text-purple-700"></i>
      </div>

      <transition name="fade">
        <ul
          v-if="isOpen"
          class="absolute bottom-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-sm"
        >
          <li>
            <a href="#" class="dropdown-item text-purple-600">
              <i class="ri-user-settings-line mr-2"></i> Profile
            </a>
          </li>
          <li>
            <a href="#" class="dropdown-item text-blue-600">
              <i class="ri-login-box-line mr-2"></i> Login
            </a>
          </li>
          <li>
            <a href="#" class="dropdown-item text-pink-600">
              <i class="ri-logout-box-line mr-2"></i> Logout
            </a>
          </li>
        </ul>
      </transition>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
const showBookingMenu = ref(false)
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.2s;
}
.nav-link:hover {
  background-color: #ede9fe;
  color: #7c3aed;
}
.icon {
  font-size: 18px;
  color: #4b5563;
}
.router-link-exact-active {
  background-color: #d8b4fe;
  color: #6b21a8;
}
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  transition: 0.2s;
}
.dropdown-item:hover {
  background-color: #f3f4f6;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
