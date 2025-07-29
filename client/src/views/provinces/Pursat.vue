<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pursat_in_Cambodia.svg/1200px-Pursat_in_Cambodia.svg.png"
        alt="Pursat Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Pursat Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Pursat</h2>
      <p class="text-gray-700 leading-relaxed">
        Pursat province is located in western Cambodia and is known for its rich natural resources, including mountains, forests, and the Tonle Sap River. It offers a peaceful retreat with traditional Khmer culture and stunning landscapes.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31440.943840747026!2d103.0306803486032!3d12.532372376491254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3104abf2a3e88e47%3A0x1ec53f286344c3b3!2sPursat!5e0!3m2!1sen!2skh!4v1699623939000!5m2!1sen!2skh"
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
  { name: 'Phnom Chisor', description: 'Ancient temple ruins with panoramic views.' },
  { name: 'Tonle Sap River', description: 'Famous river with vibrant fishing communities.' },
  { name: 'Kulen Mountain Range', description: 'Natural beauty with hiking trails and waterfalls.' },
])

const thingsToDo = ref([
  'Visit Phnom Chisor temple ruins.',
  'Take a boat ride on Tonle Sap River.',
  'Hike in the Kulen Mountain Range.',
  'Explore local floating villages.',
])

const travelTips = ref([
  'Best time to visit is November to February.',
  'Carry insect repellent for forest areas.',
  'Local guides can enrich your experience.',
  'Respect local traditions and dress modestly.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Phnom_Chisor_Kampong_Speu.jpg',
    alt: 'Phnom Chisor Temple',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Tonle_Sap_River_in_Cambodia_2013.jpg',
    alt: 'Tonle Sap River',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Kulen_National_Park_Waterfall_2013.jpg',
    alt: 'Kulen Mountain Waterfall',
  },
])
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
