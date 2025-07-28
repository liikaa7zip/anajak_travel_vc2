<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Kratie_province_locator_map_Cambodia.svg/1200px-Kratie_province_locator_map_Cambodia.svg.png"
        alt="Kratie Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Kratie Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Kratie</h2>
      <p class="text-gray-700 leading-relaxed">
        Kratie is a province in eastern Cambodia known for its beautiful Mekong River views and rare Irrawaddy dolphins. 
        It offers a peaceful atmosphere with rich biodiversity and traditional Khmer culture.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.984953938115!2d105.4851593153704!3d12.4888130910411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31082df9a0bc0cd5%3A0x27e72e789a3b4f60!2sKratie!5e0!3m2!1sen!2skh!4v1699622725000!5m2!1sen!2skh"
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
  { name: 'Irrawaddy Dolphins', description: 'Rare freshwater dolphins found in the Mekong River.' },
  { name: 'Kampi Waterfalls', description: 'Scenic waterfalls and natural pools perfect for swimming.' },
  { name: 'Kratie Riverside', description: 'Peaceful riverbanks lined with cafes and local markets.' },
])

const thingsToDo = ref([
  'Take a boat tour to spot Irrawaddy dolphins.',
  'Visit the Kampi waterfalls for a refreshing swim.',
  'Explore local markets and enjoy Khmer cuisine.',
  'Bike through rural villages and experience local life.',
])

const travelTips = ref([
  'Best visited during the dry season from November to April.',
  'Bring binoculars for dolphin watching.',
  'Cash is preferred as card facilities are limited.',
  'Respect local customs and dress modestly when visiting temples.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Kratie_riverfront_Cambodia_2010.jpg',
    alt: 'Kratie Riverside',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Kampi_Waterfalls.jpg',
    alt: 'Kampi Waterfalls',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Irrawaddy_dolphins_in_Kratie_2016.jpg',
    alt: 'Irrawaddy Dolphins',
  },
])
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
