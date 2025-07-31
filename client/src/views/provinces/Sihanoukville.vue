<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://mediaim.expedia.com/destination/1/492c45494b515ffc04169afcad554808.jpg"
        alt="Sihanoukville"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Sihanoukville <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Sihanoukville</h2>
          <p class="text-sm text-gray-700">
            Also known as Kampong Som, Sihanoukville is Cambodia’s primary coastal province, named after the late King Norodom Sihanouk. Once a backpacker's beach town, it has transformed into a city of high-rise casinos, luxury resorts, and economic development. Beyond the urban expansion, Sihanoukville offers access to some of the most beautiful islands in Southeast Asia.
          </p>
        </div>
        <img
          src="https://sdmntprwestus.oaiusercontent.com/files/00000000-69a4-6230-b84c-8098eb9e73f9/raw?se=2025-07-31T10%3A03%3A04Z&sp=r&sv=2024-08-04&sr=b&scid=00d147e2-9aab-5639-8bec-d2d6d92e55f3&skoid=61180a4f-34a9-42b7-b76d-9ca47d89946d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-31T08%3A51%3A09Z&ske=2025-08-01T08%3A51%3A09Z&sks=b&skv=2024-08-04&sig=VQXoS8ZoHnz5ssvztY8sUoSeP5tO1Pan2Yp0kamHs7o%3D"
          alt="Sihanoukville Map"
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
          <li>Relax at Otres Beach</li>
          <li>Visit Koh Rong Island</li>
          <li>Explore the casinos</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Feb</li>
          <li>Transport: Taxi, Ferry</li>
          <li>Book accommodations in advance</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d103.5000!3d10.6167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sSihanoukville!5e0!3m2!1sen!2skh!4v1627180800000"
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
  { name: 'Otres Beach', img: 'https://lp-cms-production.imgix.net/2019-06/5902494fe479aad6e14232220acf0f0d-sokha-beach.jpg' },
  { name: 'Koh Rong Island', img: 'https://travelsense.asia/wp-content/uploads/2015/07/koh_rong_island.jpg' },
  { name: 'Serendipity Beach', img: 'https://static.toiimg.com/photo/51008861.cms' },
  { name: 'Golden Lion Circle', img: 'https://www.asiaimages.net/img-get/I0000ktXwzRk6oqo/s/1200/I0000ktXwzRk6oqo.jpg' }
];

const galleryPhotos = [
  'https://media.istockphoto.com/id/1475588050/photo/beautiful-koh-rong-island-from-above-cambodia.jpg?s=612x612&w=0&k=20&c=JePEmAs_ZMjJH0-FGmBpjCl4ZV13Kuq2OxoSHYzbjh0=',
  'https://tripjive.com/wp-content/uploads/2023/12/Sihanoukville-Nightlife-1024x585.jpg',
  'https://media.audleytravel.com/-/media/images/home/southeast-asia/cambodia/places/istock_692711512_sihanoukville_beach_800x2400.jpg?q=79&w=1920&h=685',
  'https://img.freepik.com/premium-photo/streets-sihanoukville-cambodia-bridge-into-sea-sihanoukville-cambodia_221439-4196.jpg?w=360'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>