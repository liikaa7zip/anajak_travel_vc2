<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Tbong_Khmum_province_map.png"
        alt="Tbong Khmum"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Tbong Khmum Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Tbong Khmum</h2>
      <p class="text-gray-700 leading-relaxed">
        Tbong Khmum is a province in eastern Cambodia known for its agricultural lands and rural charm. 
        It was separated from Kampong Cham province in 2013 and offers visitors peaceful landscapes, 
        traditional villages, and an authentic Cambodian countryside experience.
      </p>
    </section>

    <!-- Top Attractions Section -->
    <section class="bg-white px-6 py-10">
      <h2 class="text-2xl font-semibold mb-6 text-center">Top Attractions</h2>
      <ul class="space-y-4 max-w-3xl mx-auto text-gray-700">
        <li v-for="(attraction, index) in topAttractions" :key="index">
          <strong>{{ attraction.name }}:</strong> {{ attraction.description }}
        </li>
      </ul>
    </section>

    <!-- Things to Do Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Things to Do</h2>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li v-for="(thing, index) in thingsToDo" :key="index">{{ thing }}</li>
      </ul>
    </section>

    <!-- Travel Tips Section -->
    <section class="bg-white px-6 py-10">
      <h2 class="text-2xl font-semibold mb-4 text-center">Travel Tips</h2>
      <ul class="max-w-3xl mx-auto text-gray-700 space-y-2">
        <li v-for="(tip, index) in travelTips" :key="index">{{ tip }}</li>
      </ul>
    </section>

    <!-- Photo Gallery Section -->
    <section class="px-6 py-10 max-w-6xl mx-auto">
      <h2 class="text-2xl font-semibold mb-6 text-center">Photo Gallery</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          v-for="(photo, index) in galleryPhotos"
          :key="index"
          :src="photo.src"
          :alt="photo.alt"
          class="rounded-lg shadow"
        />
      </div>
    </section>

    <!-- Map Section -->
    <section class="bg-gray-200 px-6 py-10">
      <h2 class="text-2xl font-semibold mb-4 text-center">Province Map</h2>
      <div class="max-w-4xl mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.2099426418984!2d105.2040466153705!3d11.525794691883411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31074d658f16c8b7%3A0xe8a5e63d9698d45c!2sTbong%20Khmum%20Province!5e0!3m2!1sen!2skh!4v1699621725903!5m2!1sen!2skh"
          width="100%"
          height="400"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const topAttractions = ref([
  { name: 'Peam Krasop Wildlife Sanctuary', description: 'A rich mangrove forest offering wildlife watching and boat tours.' },
  { name: 'Kampong Cham Riverbank', description: 'Relaxing river views and local life along the Mekong.' },
  { name: 'Traditional Khmer Villages', description: 'Experience rural Cambodian culture and crafts.' },
])

const thingsToDo = ref([
  'Boat tours on the Mekong River.',
  'Visit local markets and try traditional Khmer food.',
  'Explore nearby temples and pagodas.',
  'Bike through the countryside and villages.',
])

const travelTips = ref([
  'Visit during the dry season from November to April.',
  'Carry cash as ATMs may be limited.',
  'Respect local customs and dress modestly.',
  'Plan transport ahead as public transport options are limited.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Peam_Krasop_Wildlife_Sanctuary_Cambodia.jpg',
    alt: 'Peam Krasop Wildlife Sanctuary',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Mekong_River_at_Kampong_Cham.JPG',
    alt: 'Kampong Cham Riverbank',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Kampong_Khmum_Countryside.jpg',
    alt: 'Rural Village',
  },
])
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>
