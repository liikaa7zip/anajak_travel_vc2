<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md h-screen p-6 flex flex-col">
      <div class="flex items-center gap-3 mb-10">
        <img
          src="@/assets/img/path-to-anajak-logo.png"
          alt="Anajak Travel"
          class="h-13 w-12 rounded-full border border-purple-200 shadow"
        />
        <h1 class="text-xl font-semibold text-purple-600">Food Panel</h1>
      </div>

      <nav class="flex flex-col space-y-4 flex-1">
        <router-link
          to="/"
          class="nav-link"
          active-class="router-link-exact-active"
        >
          <i class="icon ri-global-line"></i>
          Go to Website
        </router-link>

        <router-link
          to="/restaurant_owner/fooddashboard"
          class="nav-link"
        >
          <i class="fas fa-chart-line"></i> <span>Dashboard</span>
        </router-link>
        <router-link
          to="CustomersInResturant"
          class="nav-link"
        >
          <i class="fas fa-users"></i> <span>Customer</span>
        </router-link>
        <router-link
          to="ProductsInResturant"
          class="nav-link"
        >
          <i class="fas fa-utensils"></i> <span>Products</span>
        </router-link>
        <router-link
          to="foodOrder"
          class="nav-link"
        >
          <i class="fas fa-receipt"></i> <span>Orders</span>
        </router-link>
      </nav>

      <button
                    @click="logout"
                    class="w-full text-left dropdown-item text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <i class="ri-logout-box-r-line mr-2 text-red-400"></i>
                    Logout
                  </button>
    </aside>
  </div>
</template>

<script setup>
import { useAuth } from "../stores/useAuth";

const {logout}= useAuth();
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}

/* Sidebar link style with left border on hover */
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem 0.5rem 1.5rem; /* left padding for border space */
  color: #4b5563; /* text-gray-700 */
  border-radius: 0.375rem; /* rounded-md */
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
}

.nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: transparent;
  border-radius: 0.375rem 0 0 0.375rem;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #f3e8ff; /* purple-50 */
  color: #fe0256; /* purple-600 */
}

.nav-link:hover::before {
  background-color: #e31f60; /* purple-600 */
}

/* Active link styling */
.router-link-exact-active {
  background-color: #e0d7ff; /* lighter purple */
  color: #5b21b6; /* purple-700 */
}

.router-link-exact-active::before {
  background-color: #5b21b6; /* purple-700 */
}
</style>
