<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-purple-700 text-center mb-6"> {{ $t('BoatTickets.Title') }}</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="route in boatRoutes"
        :key="route.province"
        @click="selectProvince(route)"
        class="cursor-pointer p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl shadow transition"
      >
        <h3 class="text-lg font-semibold text-purple-800">{{ route.province }}</h3>
        <p class="text-sm text-gray-700 mb-2"> {{ $t('BoatTickets.River') }} {{ route.river }}</p>
        <ul class="text-sm text-gray-600 list-disc list-inside">
          <li v-for="r in route.routes" :key="r">{{ r }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const router = useRouter()

const boatRoutes = [
  { province: 'Phnom Penh', river: t('BoatTickets.PhnomPenh.MekongTonleSap'), routes: [t('BoatTickets.PhnomPenh.PhnomPenhToKratie'), t('BoatTickets.PhnomPenh.PhnomPenhToSiemReap')] },
  { province: 'Kampot', river: t('BoatTickets.Kampot.KampotRiver'), routes: [t('BoatTickets.Kampot.KampotToKep'), t('BoatTickets.Kampot.KampotToRabbitIsland')] },
  { province: 'Kep', river: t('BoatTickets.Kep.GulfOfThailand'), routes: [t('BoatTickets.Kep.KepToRabbitIsland')] },
  { province: 'Sihanoukville', river: t('BoatTickets.Sihanoukville.GulfOfThailand'), routes: [t('BoatTickets.Sihanoukville.SihanoukvilleToKohRong')] },
  { province: 'Kratie', river: t('BoatTickets.Kratie.MekongRiver'), routes: [t('BoatTickets.Kratie.KratieToStungTreng')] },
  { province: 'Stung Treng', river: t('BoatTickets.StungTreng.MekongRiver'), routes: [t('BoatTickets.StungTreng.StungTrengToLaosBorder')] },
  { province: 'Siem Reap', river: t('BoatTickets.SiemReap.TonleSapLake'), routes: [t('BoatTickets.SiemReap.SiemReapToBattambang')] },
  { province: 'Battambang', river: t('BoatTickets.Battambang.SangkerRiver'), routes: [t('BoatTickets.Battambang.BattambangToSiemReap')] },
  { province: 'Kampong Chhnang', river: t('BoatTickets.KampongChhnang.TonleSapRiver'), routes: [t('BoatTickets.KampongChhnang.KampongChhnangToPhnomPenh')] }
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
