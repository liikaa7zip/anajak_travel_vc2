<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://img.harbor-property.com/bkarticle/2021/10/25/173634624.jpg"
        alt="Kep"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Kep <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Kep</h2>
          <p class="text-sm text-gray-700">
            Kep is a small seaside province in southern Cambodia known for its tranquil beaches, French colonial villas, and fresh seafood—especially crab. It offers a peaceful escape from the busier tourist hubs and is a gateway to natural beauty, including the scenic Kep National Park and nearby Rabbit Island.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Cambodia_Kep_locator_map.svg"
          alt="Kep Map"
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
          <li>Visit the famous Kep Crab Market</li>
          <li>Hike in Kep National Park</li>
          <li>Take a boat to Rabbit Island (Koh Tonsay)</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar (cool and dry)</li>
          <li>Pack light clothing and insect repellent</li>
          <li>Consider renting a scooter for flexible travel</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.326799889947!2d104.29208197588686!3d10.486838389682713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107e9cb4d3f982b%3A0x43a6fc1c2a7e48d4!2sKep%20Province!5e0!3m2!1sen!2skh!4v1710000000005"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://cdn.getyourguide.com/img/location/5e86ffb0b60ef.jpeg/88.jpg" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Kep Seaside" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Kep Crab Market', img: 'https://images.squarespace-cdn.com/content/v1/5b07f4c12b6a28c7fa5594ef/1583539513320-3K2RP3NHL06X1Y9XIFL7/Kep-Crab-Market-Cambodia.jpg' },
  { name: 'Rabbit Island', img: 'https://www.movetocambodia.com/wp-content/uploads/2016/08/koh-tonsay-rabbit-island.jpg' },
  { name: 'Kep National Park', img: 'https://www.travelfish.org/img/thumbnails/620x465x1/53049.jpg' },
  { name: 'Abandoned Villas', img: 'https://i.pinimg.com/originals/19/9e/fc/199efc7d9a64d3936de24d7fd68134f0.jpg' }
]

const galleryPhotos = [
  'https://visitkep.com/assets/images/places/Kep.jpg',
  'https://www.canbypublications.com/images/kep/kep-villa-ruin.jpg',
  'https://www.cambodiasite.nl/images/kep2.jpg',
  'https://www.wayfarerfootprints.com/wp-content/uploads/2020/01/Kep-Crab-Market.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
