<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/48/Stung_Treng_Cambodia_01.jpg"
        alt="Stung Treng"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> Stung Treng <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Stung Treng</h2>
          <p class="text-sm text-gray-700">
            Stung Treng is a northern Cambodian province situated along the Mekong River and near the Laos border. It is known for its dense forests, rich biodiversity, and beautiful river landscapes. The province offers excellent opportunities for ecotourism, including fishing, boat tours, and visits to protected wildlife areas.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/88/Cambodia_Stung_Treng_locator_map.svg"
          alt="Stung Treng Map"
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
          <li>Boat tours on the Mekong River</li>
          <li>Visit the Sekong and Sre Pok river confluence</li>
          <li>Explore the Upper Mekong protected forests</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time to visit: Nov – Mar</li>
          <li>Bring insect repellent for forested areas</li>
          <li>Hire local guides for nature excursions</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.615853732586!2d105.56318741579908!3d13.524648691417864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311e7ff3f4b71eab%3A0x1a4e7bbf3e2b3d9f!2sStung%20Treng%20Province!5e0!3m2!1sen!2skh!4v1710000000027"
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
  { name: 'Mekong River Tours', img: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Mekong_river_in_Cambodia.jpg' },
  { name: 'Sekong & Sre Pok Rivers', img: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Sekong_River_Cambodia.jpg' },
  { name: 'Upper Mekong Forests', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Upper_Mekong_forest.jpg' },
  { name: 'Local Villages', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Cambodian_village.jpg' }
]

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/8/85/Mekong_river_in_Cambodia.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/7/73/Sekong_River_Cambodia.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e7/Upper_Mekong_forest.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f4/Cambodian_village.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
