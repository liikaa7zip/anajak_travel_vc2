

<template>
  <div class="flex min-h-screen bg-white">
    <!-- Sidebar: fixed width -->
    <aside class="w-64 h-screen fixed top-0 left-0 z-10 bg-white shadow">
      <HotelOwnerNavbar/>
    </aside>
    
    <!-- Main content: shifted right by sidebar width -->
    <main >
      <router-view />
    </main>
  </div>
</template>

<script setup>
// import AdminNavbar from '@/components/AdminNavbar.vue'
import HotelOwnerNavbar from '../components/HotelOwnerNavbar.vue'
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