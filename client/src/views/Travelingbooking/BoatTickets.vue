<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-purple-700 text-center mb-6"> Choose a Province for Boat Booking</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="route in boatRoutes"
        :key="route.province"
        @click="selectProvince(route)"
        class="cursor-pointer p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl shadow transition"
      >
        <h3 class="text-lg font-semibold text-purple-800">{{ route.province }}</h3>
        <p class="text-sm text-gray-700 mb-2"> River: {{ route.river }}</p>
        <ul class="text-sm text-gray-600 list-disc list-inside">
          <li v-for="r in route.routes" :key="r">{{ r }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const boatRoutes = [
  { province: 'Phnom Penh', river: 'Mekong / Tonle Sap', routes: ['Phnom Penh → Kratie', 'Phnom Penh → Siem Reap'] },
  { province: 'Kampot', river: 'Kampot River', routes: ['Kampot → Kep', 'Kampot → Rabbit Island'] },
  { province: 'Kep', river: 'Gulf of Thailand', routes: ['Kep → Rabbit Island'] },
  { province: 'Sihanoukville', river: 'Gulf of Thailand', routes: ['Sihanoukville → Koh Rong'] },
  { province: 'Kratie', river: 'Mekong River', routes: ['Kratie → Stung Treng'] },
  { province: 'Stung Treng', river: 'Mekong River', routes: ['Stung Treng → Laos Border'] },
  { province: 'Siem Reap', river: 'Tonle Sap Lake', routes: ['Siem Reap → Battambang'] },
  { province: 'Battambang', river: 'Sangker River', routes: ['Battambang → Siem Reap'] },
  { province: 'Kampong Chhnang', river: 'Tonle Sap River', routes: ['Kampong Chhnang → Phnom Penh'] }
]

function selectProvince(route) {
  const destination = route.routes[0]?.split('→')[1].trim() || ''
  router.push({
    path: 'BookBoatPage',
    query: {
      origin: route.province,
      destination
    }
  })
}
</script>
