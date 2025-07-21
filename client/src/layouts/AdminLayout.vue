<!-- <template>
  <main class="flex-grow p-4 overflow-auto h-screen">
    <router-view />
  </main>
</template>

<script>
export default {
}
</script> -->

<template>
  <div class="flex min-h-screen bg-[#181c2f]">
    <!-- Sidebar: fixed width -->
    <aside class="w-64 h-screen fixed top-0 left-0 z-10 bg-[#23263a] shadow">
      <AdminNavbar />
    </aside>

    <!-- Main content: shifted right by sidebar width -->
    <main class="ml-64 flex-grow p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue'
</script>

<style scoped>
/* Optional: make sure content takes full height */
html, body {
  height: 100%;
  margin: 0;
}
</style>
