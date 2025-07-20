<template>
  <div class="app-container flex min-h-screen">
    <!-- Admin Navbar on the left, fixed width -->
    <AdminNavbar v-if="isAdmin" class="w-64 h-screen fixed top-0 left-0" />

    <!-- Website Navbar for non-admin (optional) -->
    <WebsiteNavbar v-else />

    <!-- Main content area -->
    <main 
      :class="isAdmin ? 'ml-64 flex-grow p-6' : 'flex-grow p-6'"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminNavbar from './components/AdminNavbar.vue'
import WebsiteNavbar from './components/WebsiteNavbar.vue'

const isAdmin = ref(false)

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.role === 'admin') {
    isAdmin.value = true
  }
})
</script>

<style scoped>
/* Optional: Ensure body and html fill height */
html, body, #app {
  height: 100%;
  margin: 0;
}

/* For smooth layout */
.app-container {
  /* flex container with horizontal layout */
  display: flex;
  min-height: 100vh;
}
</style>
