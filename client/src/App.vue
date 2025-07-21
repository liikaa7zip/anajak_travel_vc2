<template>
  <div class="app-container flex flex-col min-h-screen">
    <!-- Show AdminNavbar only on admin routes and if user is admin -->
    <AdminNavbar v-if="showAdminNavbar" class="w-64 h-screen fixed top-0 left-0" />

    <!-- Main content -->
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminNavbar from './components/AdminNavbar.vue'

const isAdmin = ref(false)
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.role === 'admin') {
    isAdmin.value = true
    // Redirect to admin dashboard if not already on an admin route
    if (!route.path.startsWith('/admin')) {
      router.replace('/admin') // or '/admin/dashboard' if that's your main admin page
    }
  } else {
    isAdmin.value = false
  }
})

// Show AdminNavbar only if user is admin and route starts with /admin
const showAdminNavbar = computed(() => {
  return isAdmin.value && route.path.startsWith('/admin')
})
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
