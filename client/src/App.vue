<template>
  <div class="app-container">
    <!-- Loading screen while auth is being initialized -->
    <div v-if="!isInitialized" class="min-h-screen flex items-center justify-center bg-gray-50 w-full">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
        <p class="text-xs text-gray-400 mt-2">Checking authentication status</p>
      </div>
    </div>
    
    <!-- Main app layout -->
    <div v-else class="flex min-h-screen bg-white">
      <!-- Admin Sidebar - only show on admin routes -->
      <div v-if="showAdminNavbar" class="w-64 h-screen fixed top-0 left-0 z-10 bg-white shadow flex-shrink-0">
        <AdminNavbar />
      </div>
      
      <!-- Main content area -->
      <div :class="['flex-1 h-screen overflow-auto w-full', showAdminNavbar ? 'ml-64' : '']">
        <router-view />
      </div>
    </div>
    
    <!-- Debug component -->
    <!-- <AuthDebug /> -->
  </div>
</template>

<script setup>
import { computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminNavbar from './components/AdminNavbar.vue'
// import AuthDebug from './components/AuthDebug.vue'
import { useAuth } from './stores/useAuth'

const route = useRoute()
const router = useRouter()
const { isAdmin, userProfile, initAuth, isInitialized, isLoggedIn } = useAuth()

// Initialize auth immediately when component mounts
onMounted(async () => {
  console.log('[APP] Component mounted')
  console.log('[APP] Current route:', route.path)
  console.log('[APP] Pre-init auth state:', {
    initialized: isInitialized.value,
    loggedIn: isLoggedIn.value,
    isAdmin: isAdmin.value,
    userProfile: userProfile.value
  })
  
  await initAuth()
  
  console.log('[APP] Post-init auth state:', {
    initialized: isInitialized.value,
    loggedIn: isLoggedIn.value,
    isAdmin: isAdmin.value,
    userProfile: userProfile.value
  })
})

// Show sidebar only if initialized AND user is admin AND route is /admin/*
const showAdminNavbar = computed(() => {
  const shouldShow = isInitialized.value && isLoggedIn.value && isAdmin.value && route.path.startsWith('/admin')
  console.log('[APP] showAdminNavbar:', shouldShow, {
    initialized: isInitialized.value,
    loggedIn: isLoggedIn.value,
    isAdmin: isAdmin.value,
    routeStartsWithAdmin: route.path.startsWith('/admin'),
    currentRoute: route.path
  })
  return shouldShow
})

// Watch for auth state changes and handle redirects
watch([isInitialized, isLoggedIn, isAdmin], ([initialized, loggedIn, admin]) => {
  if (!initialized) return

  console.log("[APP] Auth state changed:", { 
    initialized, 
    loggedIn, 
    admin, 
    currentPath: route.path,
    userProfile: userProfile.value
  })

  if (loggedIn && admin && !route.path.startsWith('/admin') && route.path !== '/login' && route.path !== '/register') {
    console.log('[APP] Admin user detected, redirecting to admin dashboard')
    nextTick(() => {
      router.replace('/admin/dashboard')
    })
  }
  
  if (loggedIn && !admin && route.path.startsWith('/admin')) {
    console.log('[APP] Non-admin user trying to access admin route, redirecting to home')
    nextTick(() => {
      router.replace('/home')
    })
  }
}, { immediate: true })

// Watch route changes to handle admin access
watch(() => route.path, (newPath) => {
  if (!isInitialized.value) return

  console.log("[APP] Route changed to:", newPath, "Auth state:", {
    initialized: isInitialized.value,
    loggedIn: isLoggedIn.value,
    isAdmin: isAdmin.value
  })

  if (newPath.startsWith('/admin') && (!isLoggedIn.value || !isAdmin.value)) {
    console.log('[APP] Unauthorized admin access attempt, redirecting to login')
    router.replace('/login')
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}

html, body {
  height: 100%;
  margin: 0;
}
</style>