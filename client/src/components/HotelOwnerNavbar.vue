<template>
  <div class="min-h-screen bg-gray-50 flex font-sans">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-white border-r border-gray-200 shadow-md p-6 flex flex-col justify-between"
    >
      <!-- Logo -->
      <div>
        <div class="flex items-center gap-3 mb-8">
          <img
            src="../assets/img/path-to-anajak-logo.png"
            alt="Hotel Management"
            class="h-13 w-12 rounded-full border border-purple-200 shadow"
          />
          <h1 class="text-xl font-bold text-purple-700">Hotel Panel</h1>
        </div>
        <div class="border-b border-purple-700 mb-4"></div>
        <!-- Navigation -->
        <nav class="flex flex-col gap-2">
          <router-link
          to="/"
          class="nav-link"
          active-class="router-link-exact-active"
        >
          <i class="icon ri-global-line"></i>
          Go to Website
        </router-link>
          <router-link to="/hotel_owner/hoteldashboard" class="nav-link" active-class="active">
  <i class="fas fa-tachometer-alt w-5"></i>
  <span>Dashboard</span>
</router-link>

<router-link to="/hotel_owner/housekeeping" class="nav-link" active-class="active">
  <i class="fas fa-broom w-5"></i>
  <span>Housekeeping</span>
</router-link>

<router-link to="/hotel_owner/rooms" class="nav-link" active-class="active">
  <i class="fas fa-bed w-5"></i>
  <span>Rooms</span>
</router-link>

<router-link to="/hotel_owner/reversations" class="nav-link" active-class="active">
  <i class="fas fa-book w-5"></i>
  <span>Reservations</span>
</router-link>

<router-link to="/hotel_owner/bookingoverview" class="nav-link" active-class="active">
  <i class="fas fa-chart-line w-5"></i>
  <span>Booking Overview</span>
</router-link>

        </nav>
      </div>

      <!-- Logout -->
      <div class="mt-10">
        <button
          class="flex items-center gap-3 px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 transition rounded-md w-full duration-200"
        >
          <i class="fas fa-sign-out-alt w-5"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  </div>  
</template>

<script setup>
// Optional: add logout logic here
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md transition duration-200 transform hover:bg-purple-100 hover:text-purple-800 hover:scale-[1.02];
}

.router-link-exact-active,
.active {
  @apply bg-purple-200 text-purple-800 font-semibold;
}
</style>