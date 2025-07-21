<template>
  <div class="bg-[#181c2f] min-h-screen p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2 mb-2">
          <span class="text-blue-400 text-3xl">👤</span>
          User Management
        </h1>
        <p class="text-gray-400 text-sm">Manage, search, and review all users in the system.</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition mt-4 md:mt-0">
        <span class="text-lg">+</span> Add New User
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-[#23263a] rounded-xl p-4 flex flex-col items-center shadow border border-gray-700">
        <span class="text-blue-400 text-2xl mb-1">👥</span>
        <div class="text-gray-300 text-sm">Total Users</div>
        <div class="text-white text-xl font-bold">200</div>
      </div>
      <div class="bg-[#23263a] rounded-xl p-4 flex flex-col items-center shadow border border-gray-700">
        <span class="text-green-400 text-2xl mb-1">✔️</span>
        <div class="text-gray-300 text-sm">Active Today</div>
        <div class="text-white text-xl font-bold">50</div>
      </div>
      <div class="bg-[#23263a] rounded-xl p-4 flex flex-col items-center shadow border border-gray-700">
        <span class="text-orange-400 text-2xl mb-1">➕</span>
        <div class="text-gray-300 text-sm">New Signups</div>
        <div class="text-white text-xl font-bold">50</div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <div class="flex items-center bg-[#23263a] rounded-lg px-3 py-2 w-full md:w-1/3 border border-gray-700">
        <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/>
        </svg>
        <input type="text" placeholder="Search by name or email" class="bg-transparent outline-none text-gray-200 w-full" />
      </div>
      <div class="flex gap-2">
        <select class="bg-[#23263a] text-gray-200 px-3 py-2 rounded-lg border border-gray-700">
          <option>Status: All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Banned</option>
        </select>
        <select class="bg-[#23263a] text-gray-200 px-3 py-2 rounded-lg border border-gray-700">
          <option>Role: All</option>
          <option>User</option>
          <option>Business</option>
          <option>Admin</option>
        </select>
      </div>
    </div>

    <!-- User Table -->
    <div class="bg-[#23263a] rounded-xl shadow border border-gray-700 overflow-x-auto">
      <table class="min-w-full text-left">
        <thead>
          <tr class="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-700">
            <th class="py-3 px-4">Name</th>
            <th class="py-3 px-4">Email</th>
            <th class="py-3 px-4">Role</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4">Created</th>
            <th class="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, idx) in users" :key="idx" class="border-b border-[#23263a] hover:bg-[#20243a] transition">
            <td class="py-3 px-4 flex items-center gap-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-7 h-7 rounded-full border-2 border-blue-500" />
              <span class="text-gray-200 font-medium">{{ user.name }}</span>
            </td>
            <td class="py-3 px-4 text-gray-200">{{ user.email }}</td>
            <td class="py-3 px-4">
              <span
                :class="{
                  ' text-blue-700 px-2 py-1 rounded text-xs': user.role === 'User',
                  ' text-yellow-700 px-2 py-1 rounded text-xs': user.role === 'Business',
                  '  text-pink-700 px-2 py-1 rounded text-xs': user.role === 'Admin'
                }"
              >{{ user.role }}</span>
            </td>
            <td class="py-3 px-4">
              <span
                :class="{
                  'bg-green-700 text-green-200 px-2 py-1 rounded-full text-xs font-semibold': user.status === 'Active',
                  'bg-yellow-700 text-yellow-200 px-2 py-1 rounded-full text-xs font-semibold': user.status === 'Inactive',
                  'bg-red-700 text-red-200 px-2 py-1 rounded-full text-xs font-semibold': user.status === 'Banned'
                }"
              >{{ user.status }}</span>
            </td>
            <td class="py-3 px-4 text-gray-400">{{ user.created }}</td>
            <td class="py-3 px-4 relative">
              <div class="relative inline-block text-left">
                <button
                  @click="toggleDropdown(idx)"
                  class="bg-[#23263a] border border-gray-700 px-3 py-1 rounded text-xs font-semibold text-gray-200 hover:bg-[#181c2f] flex items-center gap-1"
                  aria-haspopup="true"
                  :aria-expanded="dropdownOpen === idx"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                    <circle cx="5" cy="12" r="2" />
                  </svg>
                </button>
                <transition name="fade">
                  <div
                    v-if="dropdownOpen === idx"
                    class="absolute right-0 mt-2 w-36 bg-[#23263a] border border-gray-700 rounded shadow-lg z-10"
                    @click.stop
                  >
                    <button class="block w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#181c2f] flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      View
                    </button>
                    <button class="block w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-[#181c2f] flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11.293-11.293a1 1 0 000-1.414l-3.586-3.586a1 1 0 00-1.414 0L3 15v6z"/>
                      </svg>
                      Edit
                    </button>
                    <button class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#181c2f] flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Ban
                    </button>
                  </div>
                </transition>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex justify-between items-center gap-2 p-4 border-t border-gray-700">
        <span class="text-gray-400 text-xs">Showing 1-9 of 200 users</span>
        <div class="flex gap-1">
          <button class="bg-[#181c2f] text-gray-300 px-3 py-1 rounded hover:bg-[#23263a]">❮</button>
          <span class="text-gray-300 text-sm">1</span>
          <button class="bg-[#181c2f] text-gray-300 px-3 py-1 rounded hover:bg-[#23263a]">❯</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const users = [
  { name: 'kaka', email: 'kaka@gmail.com', role: 'User', status: 'Active', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'Business', status: 'Inactive', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'Business', status: 'Banned', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'Admin', status: 'Active', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'Business', status: 'Banned', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'Business', status: 'Banned', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'Business', status: 'Banned', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'User', status: 'Active', created: '12.10.2025' },
  { name: 'kaka', email: 'kaka@gmail.com', role: 'Business', status: 'Inactive', created: '12.10.2025' }
]
const dropdownOpen = ref(null)
const toggleDropdown = (idx) => {
  dropdownOpen.value = dropdownOpen.value === idx ? null : idx
}
// Optional: close dropdown on click outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.relative.inline-block')) {
      dropdownOpen.value = null
    }
  })
}
</script>

<style scoped>
/* Add subtle hover for table rows */
tr:hover td {
  background: #20243a;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
