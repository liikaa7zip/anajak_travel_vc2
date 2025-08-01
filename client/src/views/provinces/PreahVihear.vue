<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.tourismcambodia.org/uploads/thumbs/6e3c0-11.jpg"
        alt="Preah Vihear"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          📍 Preah Vihear <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Preah Vihear</h2>
          <p class="text-sm text-gray-700">
            Preah Vihear Province, in northern Cambodia, is home to the stunning Preah Vihear Temple, a UNESCO World Heritage site perched on a cliff with panoramic views.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cambodia_Preah_Vihear_locator_map.svg/200px-Cambodia_Preah_Vihear_locator_map.svg.png"
          alt="Preah Vihear Map"
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
          <li>Visit Preah Vihear Temple</li>
          <li>Explore Koh Ker Temple</li>
          <li>Hike in the local forests</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Feb</li>
          <li>Transport: 4WD, Motorbike</li>
          <li>Prepare for remote travel</li>
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
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d104.6667!3d13.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sPreah%20Vihear!5e0!3m2!1sen!2skh!4v1627180800000"
          width="100%" height="200" class="rounded shadown h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://genk.mediacdn.vn/139269124445442048/2024/8/13/google-maps-thuong-khong-chi-ngan-nhat-ma-chon-duong-vong-ly-do-vi-sao-00145298-1723531172398-17235311731771829575075-1723533715727-17235337161941703107124.png" 
          class="w-full h-60 " alt="Map Pin" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Preah Vihear Temple', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Preah_Vihear_Temple.jpg/320px-Preah_Vihear_Temple.jpg' },
  { name: 'Koh Ker Temple', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Koh_Ker_Temple.jpg/320px-Koh_Ker_Temple.jpg' },
  { name: 'Preah Vihear Forest', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Preah_Vihear_Forest.jpg/320px-Preah_Vihear_Forest.jpg' },
  { name: 'Tbeng Meanchey Town', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Tbeng_Meanchey.jpg/320px-Tbeng_Meanchey.jpg' }
];

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Preah_Vihear_View.jpg/320px-Preah_Vihear_View.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Koh_Ker_Ruins.jpg/320px-Koh_Ker_Ruins.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Preah_Vihear_Landscape.jpg/320px-Preah_Vihear_Landscape.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Tbeng_Meanchey_Market.jpg/320px-Tbeng_Meanchey_Market.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>