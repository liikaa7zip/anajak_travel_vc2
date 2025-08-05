

<template>
  <div class="flex min-h-screen">
    <aside class="w-64 bg-white border-r border-gray-200 shadow fixed h-full">
      <ResturantOwnerNavbarv />
    </aside>
    <main class="ml-64 flex-1 p-6 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// import AdminNavbar from '@/components/AdminNavbar.vue'
import ResturantOwnerNavbarv from '../components/ReturantOwnerNavbar.vue'
</script>

<style scoped>
/* Optional: make sure content takes full height */
html, body {
  height: 100%;
  margin: 0;
}
</style>
<style scoped>
main {
  min-height: 100vh;
  padding: 1.5rem;
  overflow-y: auto;
  width: 100%;
  transition: margin-left 0.3s ease;
}
</style>