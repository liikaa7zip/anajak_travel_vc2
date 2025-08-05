<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Bou_Sraa_Waterfall_in_Mondulkiri_01.jpg"
        alt="Mondulkiri"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Mondulkiri <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Mondulkiri</h2>
          <p class="text-sm text-gray-700">
            Located in eastern Cambodia, Mondulkiri is known for its cool climate, rolling hills, pine forests, and indigenous Bunong culture. Its capital, Sen Monorom, is a peaceful base for exploring waterfalls, elephant sanctuaries, and nature reserves like the Phnom Prich Wildlife Sanctuary. The name Mondulkiri means "Meeting of the Hills."
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Mondulkiri Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Top Attractions</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-2sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-6 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit Bou Sra Waterfall</li>
          <li>Interact with elephants at an ethical sanctuary</li>
          <li>Explore Bunong villages and traditional homes</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Feb (cool & dry)</li>
          <li>Transport: Bus or 4x4 from Phnom Penh</li>
          <li>Respect local Bunong customs when visiting villages</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Province Map</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.212292054529!2d107.18951857484426!3d12.455203326754926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317d179e62c8cc61%3A0xf2eb7716f30ce832!2sSen%20Monorom%2C%20Mondulkiri!5e0!3m2!1sen!2skh!4v1710000000001"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://i.ytimg.com/vi/zvhHg2f1tbY/maxresdefault.jpg" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Map Pin" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Bou Sra Waterfall', img: 'https://www.cambotours.com/uploads/posts/2021/09/23/bousra-waterfall-in-mondulkiri_1632401635.jpg' },
  { name: 'Elephant Valley Project', img: 'https://images.squarespace-cdn.com/content/v1/5c77a5c73c3a53bcad84a2ea/1568002928754-G98X3PK4U2K6Q7O1J77D/elephant+valley+project+mondulkiri+2.jpg' },
  { name: 'Sen Monorom Hills', img: 'https://www.tourismcambodia.com/img/mondulkiri/sen-monorom-city-1.jpg' },
  { name: 'Romnea Waterfall', img: 'https://angkorfocus.com/wp-content/uploads/2020/11/Romnea-Waterfall-Mondulkiri.jpg' }
]

const galleryPhotos = [
  'https://www.indochinapioneer.com/wp-content/uploads/2019/11/Bou-Sraa-Waterfall-Mondulkiri.jpg',
  'https://www.khmernokor.com/storage/photos/shares/mondulkiri/mondulkiri3.jpg',
  'https://www.tourismcambodia.com/img/mondulkiri/romnea-waterfall-1.jpg',
  'https://www.asialifemagazine.com/cambodia/wp-content/uploads/sites/3/2014/10/Eco-tourism-Mondulkiri.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
