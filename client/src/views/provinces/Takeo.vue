<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/90/Takeo_province_landscape.jpg"
        alt="Takeo Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Takeo Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Takeo</h2>
      <p class="text-gray-700 leading-relaxed">
        Takeo is a province in southern Cambodia, known as the "cradle of Khmer civilization" with many ancient temples and rich history.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.123456789!2d104.778045!3d10.984569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b01b4ed7f5f0b%3A0x123456789abcdef!2sTakeo%20Province!5e0!3m2!1sen!2skh!4v1699630000000!5m2!1sen!2skh"
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
  { name: 'Angkor Borei', description: 'Ancient archaeological site with ruins dating back to the Funan period.' },
  { name: 'Takéo Museum', description: 'Displays artifacts and history of the province.' },
  { name: 'Phnom Da Temple', description: 'One of Cambodia’s oldest Hindu temples with panoramic views.' },
])

const thingsToDo = ref([
  'Visit the ancient temples and archaeological sites.',
  'Explore local markets and traditional crafts.',
  'Take boat rides on the Tonle Sap river.',
  'Enjoy local Khmer cuisine specialties.',
])

const travelTips = ref([
  'Best time to visit is from November to February.',
  'Wear comfortable shoes for temple visits.',
  'Carry water and sunscreen for daytime excursions.',
  'Respect local customs and traditions.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Angkor_Borei_Takeo.jpg',
    alt: 'Angkor Borei',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Phnom_Da_Temple.jpg',
    alt: 'Phnom Da Temple',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Takeo_Museum.jpg',
    alt: 'Takeo Museum',
  },
])
</script>

<style scoped>
/* Your styles here */
</style>
