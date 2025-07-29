<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Svay_Rieng_in_Cambodia.svg/1200px-Svay_Rieng_in_Cambodia.svg.png"
        alt="Svay Rieng Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Svay Rieng Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Svay Rieng</h2>
      <p class="text-gray-700 leading-relaxed">
        Svay Rieng province is located in southeastern Cambodia. It shares a border with Vietnam and is known for its rich agricultural land, cultural heritage, and traditional Khmer lifestyle.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31440.71335183087!2d106.6285448839339!3d11.121162517418434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31051ee2bca932e3%3A0xb3c73984af6f2283!2sSvay%20Rieng%20Province!5e0!3m2!1sen!2skh!4v1699624637000!5m2!1sen!2skh"
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
  { name: 'Chrey Thom Pagoda', description: 'A beautiful and peaceful pagoda known for its architecture.' },
  { name: 'Tonle Basak Lake', description: 'A scenic lake ideal for fishing and relaxing.' },
  { name: 'Svay Rieng Rice Fields', description: 'Expansive rice fields showcasing traditional farming.' },
])

const thingsToDo = ref([
  'Visit the Chrey Thom Pagoda.',
  'Explore the Tonle Basak Lake area.',
  'Tour traditional rice farming villages.',
  'Enjoy local markets and Khmer cuisine.',
])

const travelTips = ref([
  'Visit during the dry season from November to April.',
  'Bring sun protection for outdoor activities.',
  'Try local dishes unique to the province.',
  'Be respectful of local customs and traditions.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Chrey_Thom_Pagoda%2C_Svay_Rieng.jpg',
    alt: 'Chrey Thom Pagoda',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Tonle_Basak_Lake_Svay_Rieng.jpg',
    alt: 'Tonle Basak Lake',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Svay_Rieng_rice_fields.jpg',
    alt: 'Rice Fields in Svay Rieng',
  },
])
</script>

<style scoped>
/* Add your styles here */
</style>
