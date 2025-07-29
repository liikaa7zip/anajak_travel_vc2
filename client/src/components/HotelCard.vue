<template>
  <div class="p-4 border rounded shadow hover:shadow-lg transition">
    <img :src="hotel.imageUrl" alt="Hotel Image" class="w-full h-48 object-cover mb-2" />
    <h2 class="text-xl font-bold">{{ hotel.name }}</h2>
    <p class="text-gray-600">{{ hotel.location }}</p>
    <p class="text-sm">{{ hotel.description }}</p>
    <router-link :to="'/hotels/' + hotel.id" class="text-blue-500 underline mt-2 block">
      View Details
    </router-link>
  </div>
</template>

<script setup>
defineProps(['hotel']);
</script>
