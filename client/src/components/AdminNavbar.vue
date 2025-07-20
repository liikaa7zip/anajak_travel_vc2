<template>
  <div class="w-64 h-screen bg-gray-100 p-4 fixed">
    <h2 class="text-2xl font-bold text-pink-600 text-center mb-6">Admin Panel</h2>
    <ul class="space-y-2">
      <li><router-link to="/admin/dashboard">🏠Admin Dashboard</router-link> </li>
      <li><a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">👤 User</a></li>
      <li><a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">📖 Booking</a></li>
      <li><a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">🍽️ Food</a></li>
      <li><a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">📝 Blog</a></li>
      <li><a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">🌍 Travel Guide</a></li>
      <li><a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">✉️ Contact Messages</a></li>
      <li><a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">📊 Reports</a></li>
      <li class="relative">
        <a href="#" class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">👑 Admin</a>
        <div class="absolute left-full top-0 mt-2 w-48 bg-gray-100 shadow-lg rounded hidden group-hover:block">
          <a href="#" class="block p-2 text-gray-600 hover:bg-gray-200 rounded">👤 Profile</a>
          <a href="#" class="block p-2 text-gray-600 hover:bg-gray-200 rounded">🔓 Login</a>
          <a href="#" class="block p-2 text-gray-600 hover:bg-gray-200 rounded">🚪 Logout</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>