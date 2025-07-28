<template>
  <aside class="w-64 h-screen bg-white text-gray-800 flex flex-col py-6 px-4 shadow-lg">
    <!-- Logo/Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold">
        <span class="text-purple-600">Admin</span>
        <span class="text-blue-600"> Panel</span>
      </h2>
    </div>

    <!-- Navigation -->
    <nav class="flex-1">
      <ul class="space-y-1 text-sm">
        <li>
          <router-link to="/home" class="nav-link" active-class="router-link-exact-active">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Go to Website
          </router-link>
        </li>

        <li>
          <router-link to="/admin/dashboard" class="nav-link" active-class="router-link-exact-active">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
            </svg>
            Dashboard
          </router-link>
        </li>

        <li>
          <router-link to="/admin/users" class="nav-link" active-class="router-link-exact-active">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h5M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Users
          </router-link>
        </li>

        <li>
          <a href="#" class="nav-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 10h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
            </svg>
            Booking
          </a>
        </li>

        <li>
          <a href="#" class="nav-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Food
          </a>
        </li>

        <li>
          <a href="#" class="nav-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m-8-8h16" />
            </svg>
            Blog
          </a>
        </li>

        <li>
          <a href="#" class="nav-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20" />
            </svg>
            Travel Guide
          </a>
        </li>

        <li>
  <router-link to="/admin/chat" class="nav-link flex items-center gap-2">
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    Contact Messages
  </router-link>
</li>


        <li>
          <a href="#" class="nav-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V5h2v6h5l-6 6-6-6h5z" />
            </svg>
            Reports
          </a>
        </li>

        <div class="relative inline-block">
    <!-- Trigger (click to toggle dropdown) -->
    <div @click="isOpen = !isOpen" class="cursor-pointer px-4 py-2 text-gray-700 hover:text-purple-600">
      Account ▼
    </div>

    <!-- Dropdown -->
    <ul
      v-if="isOpen"
      class="absolute right-0 mt-2 w-38 bg-white border border-gray-200 rounded-md shadow-lg text-sm text-gray-800 z-50 space-y-1"
    >
      <li>
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 text-purple-600">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A4 4 0 008 20h8a4 4 0 002.879-1.196l1.768-1.768a2 2 0 000-2.828l-9-9a2 2 0 00-2.828 0l-1.768 1.768a4 4 0 00-1.196 2.879v8z" />
          </svg>
          Profile
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 text-blue-600">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12H3m6-6l-6 6 6 6" />
          </svg>
          Login
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 text-pink-600">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 16l-4-4m0 0l4-4m-4 4h16" />
          </svg>
          Logout
        </a>
      </li>
    </ul>
  </div>
        <li>
          
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-weight: 600;
  border-radius: 8px;
  transition: background 0.2s;
}
.nav-link:hover {
  background-color: #f3f4f6;
}
.icon {
  width: 20px;
  height: 20px;
  stroke: black;
}
.router-link-exact-active {
  background-color: #e9d5ff;
  color: #6b21a8;
}
</style>
