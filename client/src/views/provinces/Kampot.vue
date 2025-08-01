<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.movetocambodia.com/wp-content/uploads/2022/11/kampot-river-cambodia-1024x683.jpg"
        alt="Kampot"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Kampot <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Kampot</h2>
          <p class="text-sm text-gray-700">
            Kampot is a charming province in southern Cambodia, famous for its French colonial architecture, riverside atmosphere, and world-renowned Kampot pepper. The town lies along the Praek Tuek Chhu River with scenic views of nearby Bokor Mountain. Kampot offers a blend of natural beauty, history, and relaxed vibes.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/Cambodia_Kampot_locator_map.svg"
          alt="Kampot Map"
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
          <li>Take a boat ride on Kampot River</li>
          <li>Visit Bokor National Park</li>
          <li>Explore the pepper plantations</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
          <li>Transport: Minivan, taxi, or motorbike</li>
          <li>Bring insect repellent for nature areas</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7893.646757754671!2d104.27935997783012!3d10.609217872894795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107d0cd7d9a2675%3A0x47147b9d0662db58!2sKampot!5e0!3m2!1sen!2skh!4v1710000000003"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://gttp.imgix.net/242681/x/0/kampot-guide-main-image.jpg" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Kampot River" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Bokor National Park', img: 'https://cdn.tourismcambodia.com/uploads/posts/2019/09/26/bokor-bridge-view.jpg' },
  { name: 'Kampot Pepper Farms', img: 'https://www.growjourney.com/wp-content/uploads/2018/03/kampot-pepper-farm.jpg' },
  { name: 'Kampot River', img: 'https://www.movetocambodia.com/wp-content/uploads/2022/11/kampot-riverfront.jpg' },
  { name: 'Old French Quarter', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Kampot_french_buildings.jpg' }
]

const galleryPhotos = [
  'https://i.pinimg.com/originals/7b/3b/ce/7b3bce34f3b5fd7fbb57b38c5ab0cf94.jpg',
  'https://angkorfocus.com/wp-content/uploads/2019/12/Bokor-Hill-Station-Kampot-2.jpg',
  'https://southeastasiabackpacker.com/wp-content/uploads/2023/01/kampot-cambodia.jpg',
  'https://www.travelfish.org/images/photos/kampot/Kampot_BokorHillStation_Ruins_1000.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
