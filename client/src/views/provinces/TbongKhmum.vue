<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Tbong_Khmum_Cambodia_01.jpg"
        alt="Tbong Khmum"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> Tbong Khmum <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Tbong Khmum</h2>
          <p class="text-sm text-gray-700">
            Tbong Khmum is a province in eastern Cambodia that was created in 2013 after splitting from Kampong Cham. It features rich agricultural lands, especially for rubber and rice production. The province offers rural charm with traditional Khmer culture and is home to several temples and natural sites.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Cambodia_Tbong_Khmum_locator_map.svg"
          alt="Tbong Khmum Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Top Attractions</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-2sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="py-6 px-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit local temples and pagodas</li>
          <li>Explore rural villages and rubber plantations</li>
          <li>Experience traditional Khmer festivals</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Feb for pleasant weather</li>
          <li>Use motorbikes or tuk-tuks for local transport</li>
          <li>Respect local customs and dress modestly</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Province Map</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.703143731221!2d105.14028941580488!3d11.969702490092672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107d73d8752e93d%3A0xc3447b4504eaee3c!2sTbong%20Khmum%20Province!5e0!3m2!1sen!2skh!4v1710000000031"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Tbong_Khmum_Cambodia_01.jpg" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Tbong Khmum Nature" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Wat Ek Phnom', img: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Wat_Ek_Phnom.jpg' },
  { name: 'Rubber Plantations', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Rubber_plantation_in_Cambodia.jpg' },
  { name: 'Local Villages', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Cambodian_village_road.jpg' },
  { name: 'Traditional Festivals', img: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Cambodian_festival.jpg' }
]

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/4/48/Wat_Ek_Phnom.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d7/Rubber_plantation_in_Cambodia.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2a/Cambodian_village_road.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/23/Cambodian_festival.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
