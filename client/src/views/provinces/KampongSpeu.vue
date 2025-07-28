<template>
  <div class="font-poppins bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 overflow-hidden rounded-b-md">
      <img
        src="https://images.unsplash.com/photo-1581317849586-b8dc240134f5?auto=format&fit=crop&w=1200&q=80"
        alt="Kampong Speu"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-3xl md:text-5xl text-white font-bold">Kampong Speu Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="px-6 py-10 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">About Kampong Speu</h2>
      <p class="text-gray-700 leading-relaxed">
        Kampong Speu, located just west of Phnom Penh, is known for its scenic countryside,
        mountain ranges, and palm sugar production. It is a province rich in natural beauty and
        traditional Khmer lifestyle. Kampong Speu offers eco-tourism experiences, hiking trails,
        and cultural sites, making it a perfect getaway from the city.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d391689.4628322239!2d104.57845173726902!3d11.473598974501187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310fa8f01961c1ab%3A0xd2b61b7c3d2df4e7!2sKampong%20Speu%20Province!5e0!3m2!1sen!2skh!4v1721861276722"
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
  { name: 'Phnom Aural', description: 'Cambodia’s highest peak, great for trekking and adventure.' },
  { name: 'Kirirom National Park', description: 'Known for pine forests, cool climate, and waterfalls.' },
  { name: 'Chambok Ecotourism Site', description: 'Community-based eco experiences and nature trails.' },
  { name: 'Te Teuk Pus Hot Springs', description: 'Natural hot spring with therapeutic benefits.' },
  { name: 'Historical Temples', description: 'Ancient Khmer architecture scattered across the province.' },
])

const thingsToDo = ref([
  'Hike to the top of Phnom Aural for breathtaking views.',
  'Camp overnight at Kirirom National Park.',
  'Visit sugar palm farms and taste fresh palm sugar.',
  'Explore waterfalls and hidden trails around Chambok.',
  'Take a relaxing dip in natural hot springs.',
])

const travelTips = ref([
  '🌤 Best time to visit is during the dry season (November–March).',
  '🚗 Bring a motorbike or rent a car for rural exploration.',
  '🥾 Wear sturdy shoes if planning to hike Phnom Aural or Kirirom.',
  '💧 Bring your own water and snacks for remote areas.',
  '📱 Limited mobile signal in mountainous areas — plan ahead.',
])

const galleryPhotos = ref([
  {
    src: 'https://images.unsplash.com/photo-1565372510940-2360ed0c305c?auto=format&fit=crop&w=800&q=80',
    alt: 'Phnom Aural',
  },
  {
    src: 'https://images.unsplash.com/photo-1613605324724-e0425ab5adfd?auto=format&fit=crop&w=800&q=80',
    alt: 'Kirirom National Park',
  },
  {
    src: 'https://images.unsplash.com/photo-1608354706496-fb804dd6d41c?auto=format&fit=crop&w=800&q=80',
    alt: 'Palm Sugar Production',
  },
])
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
