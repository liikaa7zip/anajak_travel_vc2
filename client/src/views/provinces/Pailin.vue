<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://aicdn.picsart.com/e9156f57-4811-491c-9a9f-9d7d02da460a.png"
        alt="Pailin"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Pailin <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Pailin</h2>
          <p class="text-sm text-gray-700">
            Pailin is a small, quiet province located in western Cambodia, near the border with Thailand. Once infamous as a Khmer Rouge stronghold and a hub for gem mining, Pailin today is a peaceful area known for its scenic landscapes, gemstone markets, and cultural blend influenced by both Cambodian and Thai traditions. Surrounded by the beautiful Cardamom Mountains, it offers a tranquil getaway for nature lovers, history buffs, and off-the-beaten-path travelers.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Cambodia_Pailin_locator_map.svg/200px-Cambodia_Pailin_locator_map.svg.png"
          alt="Pailin Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Top Attractions</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-12 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit Phnom Yat Waterfall</li>
          <li>Explore O’Smach Border Area</li>
          <li>Discover local gem markets</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
          <li>Transport: Motorbike, Taxi</li>
          <li>Carry cash for small vendors</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Province Map</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d102.6167!3d12.8500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sPailin!5e0!3m2!1sen!2skh!4v1627180800000"
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
  { name: 'Phnom Yat Waterfall', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/1e/ae/7a/eight-doors-direction.jpg?w=1200&h=-1&s=1' },
  { name: 'Wat Rattanak Sophoan', img: 'https://pcontrol.tourismcambodia.com/cdn/tourismcambodia.com/img/travelguides/thumbnails/360_pailin.gif' },
  { name: 'Pailin Waterfall', img: 'https://cambotours.com/userfiles/thumbs/otavao-waterfall-eco-tourism.jpg' },
  { name: 'Gem Museum', img: 'https://www.attractionsinsrilanka.com/wp-content/uploads/2019/07/Natural-Gems-and-Gemological-Museum.jpg' }
];

const galleryPhotos = [
  'https://www.cambotours.com/userfiles/thumbs/phnom-keu-waterfall.jpg',
  'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/pailin-6.jpg?fit=1024%2C768&ssl=1',
  'https://www.greeneratravel.com/userfiles/850goh-aymountain.jpg',
  'https://www.passionindochinatravel.com/uploads/thumbs/new-Sek%20Sork%20Natural%20Resort.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>