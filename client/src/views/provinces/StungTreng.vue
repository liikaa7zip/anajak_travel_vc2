<template>
  <div class="font-poppins bg-gray-100 text-gray-900 min-h-screen px-4 py-6">
    <!-- Hero Section -->
    <section class="relative w-full h-60 overflow-hidden rounded-b-md mb-6">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Wat_Stung_Treng_%282%29.jpg/1200px-Wat_Stung_Treng_%282%29.jpg"
        alt="Stung Treng"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-white text-4xl font-bold text-center">📍 Stung Treng Province</h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="bg-white p-6 rounded-md shadow mb-6 flex flex-col md:flex-row justify-between gap-4">
      <div class="flex-1">
        <h2 class="text-2xl font-bold mb-2">About Stung Treng</h2>
        <p>
          Stung Treng is a northern province of Cambodia. It is located at the confluence of the Mekong and Sekong rivers.
        </p>
      </div>
      <div class="w-32">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cambodia_Stung_Treng_locator_map.svg/250px-Cambodia_Stung_Treng_locator_map.svg.png"
          alt="Map of Stung Treng"
          class="w-full h-auto"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="bg-white p-6 rounded-md shadow mb-6">
      <h2 class="text-2xl font-bold mb-4">Top Attractions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in attractions" :key="index" class="text-center">
          <img :src="attraction.image" :alt="attraction.name" class="rounded-md h-28 w-full object-cover mb-2" />
          <p class="font-medium">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do + Travel Tips -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white p-6 rounded-md shadow">
        <h2 class="text-2xl font-bold mb-4">Things to Do</h2>
        <ul class="list-disc list-inside space-y-1">
          <li>Visit Sopheakmit Waterfall</li>
          <li>Take a boat ride on Mekong River</li>
          <li>Explore local markets</li>
        </ul>
      </div>
      <div class="bg-white p-6 rounded-md shadow">
        <h2 class="text-2xl font-bold mb-4">Travel Tips</h2>
        <ul class="space-y-1">
          <li><strong>Best time:</strong> December - May</li>
          <li><strong>Transport:</strong> Bus, Taxi, Boat, Plane</li>
          <li><strong>Dress:</strong> For hot weather and rain</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="bg-white p-6 rounded-md shadow mb-6">
      <h2 class="text-2xl font-bold mb-4">Photo Gallery</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img
          v-for="(photo, i) in gallery"
          :key="i"
          :src="photo"
          alt="Gallery"
          class="rounded-md h-28 w-full object-cover"
        />
      </div>
    </section>

    <!-- Province Map -->
    <section class="bg-white p-6 rounded-md shadow mb-6">
      <h2 class="text-2xl font-bold mb-4">Province Map</h2>
      <img
        src="https://www.google.com/maps/d/thumbnail?mid=1-ypk-PSMphExu4Q3yrAFAJKcezk&hl=en"
        alt="Stung Treng Map"
        class="rounded-md w-full h-60 object-cover"
      />
    </section>
  </div>

   <router-link to="/guide" class="mt-6 inline-block text-blue-500 hover:underline">
      ← Back to Traveling Guide
    </router-link>
</template>

<script setup>
const attractions = [
  {
    name: 'Mekong River Dolphins',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Irrawaddy_Dolphin_in_Cambodia.jpg',
  },
  {
    name: 'Sopheakmit Waterfall',
    image: 'https://www.travellercrossing.com/images/sopheakmit-waterfall.jpg',
  },
  {
    name: 'Thala Barivat Temple',
    image: 'https://www.travellercrossing.com/images/thala-barivat.jpg',
  },
  {
    name: 'Sekong River',
    image: 'https://www.travellercrossing.com/images/sekong-river.jpg',
  },
];

const gallery = [
  'https://www.travellercrossing.com/images/thala-barivat.jpg',
  'https://www.travellercrossing.com/images/sopheakmit-waterfall.jpg',
  'https://www.travellercrossing.com/images/sekong-river.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/10/Mekong_river_near_Stung_Treng_Cambodia.jpg',
];
</script>

<style scoped>
/* You can include additional custom styles here */
</style>
