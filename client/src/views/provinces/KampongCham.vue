<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-60">
      <img
        src="https://khmerplaces.com/storage/provinces/August2020/SKG2ZykZUT7xz4q6t9kF.jpg"
        alt="Kampong Cham"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          📍 Kampong Cham <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="p-6">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Kampong Cham</h2>
          <p class="text-sm text-gray-700">
            Kampong Cham Province, located along the Mekong River, is known for its rubber plantations, colonial architecture, and the historic Phnom Pros and Phnom Srei hills.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Cambodia_Kampong_Cham_locator_map.svg/200px-Cambodia_Kampong_Cham_locator_map.svg.png"
          alt="Kampong Cham Map"
          class="w-32 h-auto"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="p-6">
      <h2 class="text-xl font-semibold mb-4">Top Attractions</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-24 object-cover" />
          <p class="p-2 text-sm font-medium">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="p-6 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit Phnom Pros and Phnom Srei</li>
          <li>Explore the Bamboo Bridge</li>
          <li>Enjoy the Mekong River views</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
          <li>Transport: Bus, Motorbike</li>
          <li>Bring a hat for sun protection</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="p-6">
      <h2 class="text-xl font-semibold mb-4">Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="p-6">
      <h2 class="text-xl font-semibold mb-4">Province Map</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d105.4667!3d11.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sKampong%20Cham!5e0!3m2!1sen!2skh!4v1627180800000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
        ></iframe>
        <img src="https://img.icons8.com/color/96/marker--v1.png" class="w-16 h-16 self-center justify-self-center" alt="Map Pin" />
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Anajak Travel</h3>
          <p class="text-sm text-gray-600">Explore Kampong Cham’s rivers and hills.</p>
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
  { name: 'Phnom Pros and Phnom Srei', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Phnom_Pros_Phnom_Srei.jpg/320px-Phnom_Pros_Phnom_Srei.jpg' },
  { name: 'Bamboo Bridge', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kampong_Cham_Bamboo_Bridge.jpg/320px-Kampong_Cham_Bamboo_Bridge.jpg' },
  { name: 'Mekong River', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mekong_River_Kampong_Cham.jpg/320px-Mekong_River_Kampong_Cham.jpg' },
  { name: 'Wat Nokor', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wat_Nokor_Kampong_Cham.jpg/320px-Wat_Nokor_Kampong_Cham.jpg' }
];

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phnom_Pros_View.jpg/320px-Phnom_Pros_View.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Bamboo_Bridge_Sunset.jpg/320px-Bamboo_Bridge_Sunset.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Mekong_River_Scene.jpg/320px-Mekong_River_Scene.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wat_Nokor_Temple.jpg/320px-Wat_Nokor_Temple.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>