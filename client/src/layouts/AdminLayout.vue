<template>
  <div class="flex h-screen">
    <AdminNavbar />
    <main class="flex-grow p-4 ml-64 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import AdminNavbar from '../components/AdminNavbar.vue'
export default {
  components: { AdminNavbar }
}
</script>
