<template>
  <div v-if="showDebug" class="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
    <div class="font-bold mb-2">Auth Debug Info:</div>
    <div>Initialized: {{ isInitialized ? '✅' : '❌' }}</div>
    <div>Logged In: {{ isLoggedIn ? '✅' : '❌' }}</div>
    <div>Is Admin: {{ isAdmin ? '✅' : '❌' }}</div>
    <div>Username: {{ userProfile.username || 'None' }}</div>
    <div>Email: {{ userProfile.email || 'None' }}</div>
    <div>Role: {{ userProfile.role || 'None' }}</div>
    <div>Token: {{ hasToken ? '✅' : '❌' }}</div>
    <div>Route: {{ $route.path }}</div>
    <button @click="toggleDebug" class="mt-2 bg-red-600 px-2 py-1 rounded text-xs">Hide</button>
  </div>
  <button v-else @click="toggleDebug" class="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs z-50">
    Debug
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/stores/useAuth'

const { isLoggedIn, userProfile, isInitialized, isAdmin } = useAuth()

const showDebug = ref(false)

const hasToken = computed(() => {
  return !!localStorage.getItem('token')
})

const toggleDebug = () => {
  showDebug.value = !showDebug.value
}
</script>
