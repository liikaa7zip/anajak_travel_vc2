<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Pursat_Cambodia_01.jpg"
        alt="Pursat"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> Pursat <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Pursat</h2>
          <p class="text-sm text-gray-700">
            Pursat province lies in western Cambodia, nestled between the Tonle Sap lake and the Cardamom Mountains. Known for its rich natural landscapes, including rivers and waterfalls, Pursat is also famous for its skilled stone carvers and traditional silk weaving. The province offers a mix of cultural heritage and scenic beauty.
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Pursat Map"
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
          <li>Visit Phnom Sampov and its caves</li>
          <li>Explore Tonle Sap lake fishing villages</li>
          <li>Discover traditional stone carving workshops</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best season: Nov – Feb for cool weather</li>
          <li>Use local boats to explore lakeside areas</li>
          <li>Hire guides for mountain trekking and cave visits</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.315974401594!2d103.58106221580523!3d11.585547591672619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3106297db63b38af%3A0xc5ee4a388a30ceaf!2sPursat%20Province!5e0!3m2!1sen!2skh!4v1710000000025"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img
          src="https://genk.mediacdn.vn/139269124445442048/2024/8/13/google-maps-thuong-khong-chi-ngan-nhat-ma-chon-duong-vong-ly-do-vi-sao-00145298-1723531172398-17235311731771829575075-1723533715727-17235337161941703107124.png"
          class="w-full h-60" alt="Map Pin"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Phnom Sampov', img: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Phnom_Sampov_01.jpg' },
  { name: 'Tonle Sap Fishing Villages', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Tonle_Sap_lake_fishing_village.jpg' },
  { name: 'Stone Carving Workshops', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Stone_carving_Cambodia_02.jpg' },
  { name: 'Pursat River', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Pursat_river_cambodia.jpg' }
]

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/6/66/Phnom_Sampov_01.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f4/Tonle_Sap_lake_fishing_village.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c4/Stone_carving_Cambodia_02.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9a/Pursat_river_cambodia.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
