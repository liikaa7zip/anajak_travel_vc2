<template>
  <aside class="w-64 h-screen bg-[#23263a] text-white flex flex-col py-6 px-4 shadow-lg">
    <!-- Logo/Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold">
        <span class="text-orange-400">Admin</span>
        <span class="text-pink-400"> Panel</span>
      </h2>
    </div>
    <!-- Navigation -->
    <nav class="flex-1">
      <ul class="space-y-1">
        <li>
          <router-link to="/admin/dashboard" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f] font-semibold"
            active-class="bg-[#181c2f] text-yellow-300">
            <span>🏠</span> Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/admin/users" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f] font-semibold"
            active-class="bg-[#181c2f] text-yellow-300">
            <span>👤</span> Users
          </router-link>
        </li>
        <li>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f]">
            <span>📖</span> Booking
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f]">
            <span>🍽️</span> Food
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f]">
            <span>📝</span> Blog
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f]">
            <span>🌍</span> Travel Guide
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f]">
            <span>✉️</span> Contact Messages
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f]">
            <span>📊</span> Reports
          </a>
        </li>
        <!-- Admin Section with submenu -->
        <li>
          <div class="group">
            <div class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f] cursor-pointer">
              <span>👑</span> Admin
              <svg class="ml-auto w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul class="ml-6 mt-1 space-y-1">
              <li>
                <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f] text-sm">
                  <span>👤</span> Profile
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f] text-sm">
                  <span>🔓</span> Login
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#181c2f] text-sm">
                  <span>🚪</span> Logout
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
// ...existing code...
</script>

<style scoped>
/* Highlight active link */
.router-link-exact-active {
  background-color: #181c2f;
  color: #facc15;
}
</style>