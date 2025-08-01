<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Phnom_Penh_Cityscape.jpg"
        alt="Phnom Penh Province"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Phnom Penh Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Phnom Penh</h2>
      <p class="text-gray-700 leading-relaxed">
        Phnom Penh is the capital and largest city of Cambodia, known for its rich history, vibrant culture, and beautiful riverside.
      </p>
    </section>

    <!-- Top Attractions Section -->
    <section class="bg-white pt-12 pb-6 pr-16 pl-16 py-10">
      <h2 class="text-2xl font-semibold mb-6 text-center">Top Attractions</h2>
      <ul class="space-y-4 max-w-3xl mx-auto text-gray-700">
        <li v-for="(attraction, index) in topAttractions" :key="index">
          <strong>{{ attraction.name }}:</strong> {{ attraction.description }}
        </li>
      </ul>
    </section>

    <!-- Things to Do Section -->
    <section class="pt-12 pb-6 pr-16 pl-16 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Things to Do</h2>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li v-for="(thing, index) in thingsToDo" :key="index">{{ thing }}</li>
      </ul>
    </section>

    <!-- Travel Tips Section -->
    <section class="bg-white pt-12 pb-6 pr-16 pl-16 py-10">
      <h2 class="text-2xl font-semibold mb-4 text-center">Travel Tips</h2>
      <ul class="max-w-3xl mx-auto text-gray-700 space-y-2">
        <li v-for="(tip, index) in travelTips" :key="index">{{ tip }}</li>
      </ul>
    </section>

    <!-- Photo Gallery Section -->
    <section class="pt-12 pb-6 pr-16 pl-16 py-10 max-w-6xl mx-auto">
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
    <section class="bg-gray-200 pt-12 pb-6 pr-16 pl-16 py-10">
      <h2 class="text-2xl font-semibold mb-4 text-center">Province Map</h2>
      <div class="max-w-4xl mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.677346322752!2d104.89516457466644!3d11.56210844184976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095110d3bf41d1%3A0x71abf1643f3ef9e8!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1699625987310!5m2!1sen!2skh"
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
  { name: 'Royal Palace', description: 'A stunning example of Khmer architecture and residence of the King.' },
  { name: 'National Museum of Cambodia', description: 'Home to a vast collection of Khmer art and artifacts.' },
  { name: 'Wat Phnom', description: 'A Buddhist temple and the city’s namesake.' },
])

const thingsToDo = ref([
  'Visit the Royal Palace and Silver Pagoda.',
  'Explore the riverside area (Sisowath Quay).',
  'Discover the history at the Tuol Sleng Genocide Museum.',
  'Shop and eat at the Central Market (Phsar Thmei).',
])

const travelTips = ref([
  'Best time to visit is from November to February.',
  'Dress respectfully when visiting temples and royal sites.',
  'Use tuk-tuks to explore the city conveniently.',
  'Stay hydrated and watch out for the tropical heat.',
])

const galleryPhotos = ref([
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Royal_Palace_Phnom_Penh.jpg',
    alt: 'Royal Palace Phnom Penh',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/National_Museum_of_Cambodia.jpg',
    alt: 'National Museum of Cambodia',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Wat_Phnom%2C_Phnom_Penh_01.jpg',
    alt: 'Wat Phnom Temple',
  },
])
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
