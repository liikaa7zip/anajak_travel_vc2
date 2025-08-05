<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/03/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg"
        alt="Oddar Meanchey"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Oddar Meanchey <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Oddar Meanchey</h2>
          <p class="text-sm text-gray-700">
            Oddar Meanchey Province, located in northern Cambodia, is known for its remote landscapes, historical sites, and proximity to the Thai border. It offers a glimpse into rural Cambodian life.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Cambodia_Oddar_Meanchey_locator_map.svg/200px-Cambodia_Oddar_Meanchey_locator_map.svg.png"
          alt="Oddar Meanchey Map"
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
          <p class="p-2 text-sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-12 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit Anlong Veng</li>
          <li>Explore the Preah Vihear Temple area</li>
          <li>Experience local village life</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
          <li>Transport: Bus, Motorbike</li>
          <li>Prepare for remote areas</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d103.5000!3d14.1167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sOddar%20Meanchey!5e0!3m2!1sen!2skh!4v1627180800000"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
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
  { name: 'Anlong Veng', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Anlong_Veng_Oddar_Meanchey.jpg/320px-Anlong_Veng_Oddar_Meanchey.jpg' },
  { name: 'Preah Vihear Temple', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Preah_Vihear_Temple_Oddar.jpg/320px-Preah_Vihear_Temple_Oddar.jpg' },
  { name: 'Samraong Town', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Samraong_Oddar_Meanchey.jpg/320px-Samraong_Oddar_Meanchey.jpg' },
  { name: 'Border Markets', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Oddar_Meanchey_Border_Market.jpg/320px-Oddar_Meanchey_Border_Market.jpg' }
];

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Anlong_Veng_Landscape.jpg/320px-Anlong_Veng_Landscape.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Preah_Vihear_View.jpg/320px-Preah_Vihear_View.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Oddar_Meanchey_Village.jpg/320px-Oddar_Meanchey_Village.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Oddar_Meanchey_Road.jpg/320px-Oddar_Meanchey_Road.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>