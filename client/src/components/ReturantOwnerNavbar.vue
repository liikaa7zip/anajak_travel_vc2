<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md h-screen p-6 flex flex-col">
       <div class="flex items-center gap-3 mb-10">
        <img
          src="@/assets/img/path-to-anajak-logo.png"
          alt="Anajak Travel"
          class="h-10 w-10 rounded-full border border-purple-200 shadow"
        />
        <h1 class="text-xl font-semibold text-purple-600">Food Management</h1>
      </div>

      <nav class="flex flex-col space-y-4 flex-1">
       
            <router-link to="/" class="nav-link" active-class="router-link-exact-active">
              <i class="icon ri-global-line"></i>
              Go to Website
            </router-link>
         
        <router-link
          to="/owner/dashboard"
          class="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition duration-200"
        >
          <i class="fas fa-chart-line"></i> <span>Dashboard</span>
        </router-link>
        <router-link
          to="/owner/customers"
          class="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition duration-200"
        >
          <i class="fas fa-users"></i> <span>Customer</span>
        </router-link>
        <router-link
          to="/owner/products"
          class="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition duration-200"
        >
          <i class="fas fa-utensils"></i> <span>Products</span>
        </router-link>
        <router-link
          to="/owner/orders"
          class="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition duration-200"
        >
          <i class="fas fa-receipt"></i> <span>Orders</span>
        </router-link>
      </nav>

      <button class="flex items-center gap-3 text-red-500 hover:text-red-700 transition duration-200">
        <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
      </button>
    </aside>
  

  </div>
</template>

<script setup>
// Optional: Logic for logout or auth
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
