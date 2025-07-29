<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Rattanakiri_landscape.jpg"
        alt="Rattanakiri Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Rattanakiri Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Rattanakiri</h2>
      <p class="text-gray-700 leading-relaxed">
        Rattanakiri is a remote province in northeastern Cambodia, famous for its scenic highlands, waterfalls, and ethnic minority cultures.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.123456789!2d106.929765!3d13.750123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa123456789ab%3A0xabcdef1234567890!2sRattanakiri%20Province!5e0!3m2!1sen!2skh!4v1699629000000!5m2!1sen!2skh"
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
  { name: 'Yeak Laom Lake', description: 'A stunning volcanic lake surrounded by forest.' },
  { name: 'Kachanh Waterfall', description: 'Beautiful waterfall near Banlung town.' },
  { name: 'Rattanakiri Provincial Museum', description: 'Learn about local ethnic cultures and history.' },
])

const thingsToDo = ref([
  'Hike and trek in the hills and forests.',
  'Visit ethnic minority villages.',
  'Swim in natural lakes and waterfalls.',
  'Explore local markets and crafts.',
])

const travelTips = ref([
  'Best to visit during dry season (Nov to Feb).',
  'Carry cash; ATMs are rare in remote areas.',
  'Prepare for limited mobile coverage.',
  'Respect local customs and environment.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Yeak_Laom_Lake_2019.jpg',
    alt: 'Yeak Laom Lake',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Kachanh_Waterfall_Rattanakiri.jpg',
    alt: 'Kachanh Waterfall',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Rattanakiri_Museum.jpg',
    alt: 'Rattanakiri Museum',
  },
])
</script>

<style scoped>
/* Your styles here if needed */
</style>
