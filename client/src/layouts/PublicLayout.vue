<template>
  <div>
    <WebsiteNavbar />
    <main>
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
/* Remove any padding that might restrict full-width */
main {
  width: 100%;
}
</style>
