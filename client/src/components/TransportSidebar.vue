<template>
  <aside
    class="w-64 h-screen bg-gradient-to-b from-white via-purple-50 to-purple-100 text-gray-500 flex flex-col py-6 px-4 shadow-2xl rounded-r-xl"
  >
    <!-- Logo/Header -->
    <div class="mb-8 text-center">
      <h2
        class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"
      >
        Transport Panel
      </h2>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto space-y-6 p-4 bg-white h-screen rounded-lg shadow-inner">
      <!-- Main Section -->
      <div>
        <p class="text-xs uppercase text-gray-400 px-2 mb-1">Main</p>
        <ul class="space-y-1 text-sm">
          <li>
            <router-link
              to="/home"
              class="nav-link"
              active-class="router-link-exact-active"
            >
              <i class="icon ri-global-line"></i>
              Go to Website
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/dashboard"
              class="nav-link"
              active-class="router-link-exact-active"
            >
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
            <router-link
              to="/transport_owner/transportuser"
              class="nav-link"
              active-class="router-link-exact-active"
            >
              <i class="icon ri-user-line"></i>
              Users
            </router-link>
          </li>

          <!-- Booking Dropdown -->
          <li>
            <button
              @click="showBookingMenu = !showBookingMenu"
              class="nav-link flex items-center justify-between w-full cursor-pointer"
            >
              <span class="flex items-center space-x-2">
                <i class="icon ri-calendar-check-line"></i>
                <span>Booking</span>
              </span>
              <svg
                :class="[showBookingMenu ? 'rotate-180' : 'rotate-0']"
                class="w-4 h-4 transform transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Booking Submenu -->
            <ul
              v-show="showBookingMenu"
              class="ml-8 mt-1 space-y-1 transition-all"
            >
              <li>
                <router-link
                  to="/transport_owner/transportboat"
                  class="block py-1 hover:text-blue-500"
                >
                  Boat
                </router-link>
              </li>
              <li>
                <router-link
                  to="/transport_owner/transportbus"
                  class="block py-1 hover:text-blue-500"
                >
                  Bus
                </router-link>
              </li> 
            </ul>
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
      <div
        @click="isOpen = !isOpen"
        class="cursor-pointer px-4 py-2 text-sm font-medium rounded-lg hover:bg-purple-100 flex items-center justify-between"
      >
        <span class="text-purple-700">Account</span>
        <i class="ri-arrow-down-s-line text-purple-700"></i>
      </div>

      <transition name="fade">
        <ul
          v-if="isOpen"
          class="absolute bottom-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-sm"
        >
          <li>
            <div class="border-t border-gray-100">
              <button
                @click="logout"
                class="w-full text-left dropdown-item text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <i class="ri-logout-box-r-line mr-2 text-red-400"></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../stores/useAuth'

const isOpen = ref(false)
const showBookingMenu = ref(false)
const { logout } = useAuth()
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
  transition: background-color 0.2s ease, color 0.2s ease;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
}

.nav-link:hover {
  background-color: #ede9fe;
  color: #7c3aed;
}

.icon {
  font-size: 18px;
  color: #4b5563;
  transition: color 0.2s ease;
}

.router-link-exact-active {
  background-color: #d8b4fe;
  color: #6b21a8;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  transition: background-color 0.2s ease;
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
