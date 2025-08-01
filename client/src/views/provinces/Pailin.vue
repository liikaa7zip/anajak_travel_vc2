<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.tourismcambodia.org/uploads/thumbs/6e3c0-2.jpg"
        alt="Pailin"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          📍 Pailin <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Pailin</h2>
          <p class="text-sm text-gray-700">
            Pailin Province, near the Thai border, is known for its gem mining history, waterfalls, and lush forests. It offers a tranquil escape with natural beauty and cultural heritage.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Cambodia_Pailin_locator_map.svg/200px-Cambodia_Pailin_locator_map.svg.png"
          alt="Pailin Map"
          class="w-32 h-auto"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-xl font-semibold mb-4">Top Attractions</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-24 object-cover" />
          <p class="p-2 text-sm font-medium">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-12 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit Phnom Yat Waterfall</li>
          <li>Explore O’Smach Border Area</li>
          <li>Discover local gem markets</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
          <li>Transport: Motorbike, Taxi</li>
          <li>Carry cash for small vendors</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-xl font-semibold mb-4">Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-xl font-semibold mb-4">Province Map</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d102.6167!3d12.8500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sPailin!5e0!3m2!1sen!2skh!4v1627180800000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
        ></iframe>
        <img src="https://img.icons8.com/color/96/marker--v1.png" class="w-16 h-16 self-center justify-self-center" alt="Map Pin" />
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Anajak Travel</h3>
          <p class="text-sm text-gray-600">Explore Pailin’s waterfalls and gems.</p>
          <div class="mt-2">
            <button class="text-sm bg-black text-white px-3 py-1 rounded">Download App</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Phnom Yat Waterfall', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Phnom_Yat_Waterfall.jpg/320px-Phnom_Yat_Waterfall.jpg' },
  { name: 'O’Smach Border', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/OSmach_Border_Pailin.jpg/320px-OSmach_Border_Pailin.jpg' },
  { name: 'Pailin Waterfall', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Pailin_Waterfall.jpg/320px-Pailin_Waterfall.jpg' },
  { name: 'Gem Museum', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pailin_Gem_Museum.jpg/320px-Pailin_Gem_Museum.jpg' }
];

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phnom_Yat_Landscape.jpg/320px-Phnom_Yat_Landscape.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/OSmach_Market.jpg/320px-OSmach_Market.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Pailin_Forest.jpg/320px-Pailin_Forest.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pailin_Waterfall_View.jpg/320px-Pailin_Waterfall_View.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>