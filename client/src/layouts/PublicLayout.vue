<template>
  <div>
    <WebsiteNavbar />
    <main class="mt-16 p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import WebsiteNavbar from '../components/WebsiteNavbar.vue'

export default {
  components: {
    WebsiteNavbar
  }
}
</script>

<style scoped>
/* Add any styles if needed */
</style>
