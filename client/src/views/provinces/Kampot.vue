<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/28/Kampot_in_Cambodia.svg"
        alt="Kampot Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Kampot Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Kampot</h2>
      <p class="text-gray-700 leading-relaxed">
        Kampot is a coastal province in southern Cambodia known for its pepper plantations, scenic rivers, and charming colonial architecture.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31331.97315827817!2d104.22317719209124!3d10.608130049675132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107cdcaed4acbd1%3A0x99d4af7eb893bd65!2sKampot!5e0!3m2!1sen!2skh!4v1699625074743!5m2!1sen!2skh"
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
  { name: 'Kampot Pepper Plantations', description: 'World-famous pepper farms producing high-quality Kampot pepper.' },
  { name: 'Bokor National Park', description: 'A beautiful park with waterfalls, hiking trails, and misty mountain views.' },
  { name: 'Kampot River', description: 'A scenic riverfront area perfect for sunset cruises and relaxing walks.' },
])

const thingsToDo = ref([
  'Visit the pepper plantations.',
  'Hike in Bokor National Park.',
  'Take a boat ride on the Kampot River.',
  'Explore the colonial-era architecture in Kampot town.',
])

const travelTips = ref([
  'Best time to visit is from November to March.',
  'Bring insect repellent for outdoor activities.',
  'Try the local seafood and Kampot pepper dishes.',
  'Rent a motorbike to explore nearby countryside easily.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Kampot_Pepper_Field.jpg',
    alt: 'Kampot Pepper Field',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Bokor_National_Park_Sign.jpg',
    alt: 'Bokor National Park',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kampot_River_Sunset.jpg',
    alt: 'Kampot River Sunset',
  },
])
</script>

<style scoped>
/* Add your custom styles here */
</style>
