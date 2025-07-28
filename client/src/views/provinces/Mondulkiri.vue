<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Mondulkiri_landscape.jpg"
        alt="Mondulkiri Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Mondulkiri Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Mondulkiri</h2>
      <p class="text-gray-700 leading-relaxed">
        Mondulkiri is Cambodia’s largest province by area, known for its beautiful rolling hills, waterfalls, and indigenous Bunong culture.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.457684270248!2d106.70219341504793!3d12.431764690830973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a1a0490ec41c7%3A0x7f83613111e71504!2sMondulkiri%20Province!5e0!3m2!1sen!2skh!4v1699629000000!5m2!1sen!2skh"
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
  { name: 'Sen Monorom Waterfall', description: 'A beautiful waterfall surrounded by forest.' },
  { name: 'Keo Seima Wildlife Sanctuary', description: 'Home to diverse wildlife and jungle trekking.' },
  { name: 'Bunong Villages', description: 'Experience indigenous culture and traditions.' },
])

const thingsToDo = ref([
  'Hike in the forest and hills.',
  'Visit local indigenous communities.',
  'Explore waterfalls and natural parks.',
  'Enjoy coffee plantations and scenic views.',
])

const travelTips = ref([
  'Best to visit during dry season (Nov to Feb).',
  'Prepare for limited internet connectivity.',
  'Bring insect repellent and appropriate hiking shoes.',
  'Respect local cultures and traditions.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Sen_Monorom_Waterfall_1.jpg',
    alt: 'Sen Monorom Waterfall',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Mondulkiri_forest_2020.jpg',
    alt: 'Mondulkiri Forest',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Bunong_House_Mondulkiri.jpg',
    alt: 'Bunong Village House',
  },
])
</script>

<style scoped>
/* Add custom styles if needed */
</style>
