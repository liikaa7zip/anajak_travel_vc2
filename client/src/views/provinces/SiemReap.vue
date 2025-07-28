<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-60">
      <img
        src="https://cms.siemreaper.click/uploads/angkor_wat2712_4e0d04bf8f.jpeg"
        alt="Siem Reap"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          📍 Siem Reap <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="p-6">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Siem Reap</h2>
          <p class="text-sm text-gray-700">
            Siem Reap Province is famous for the Angkor Wat temple complex, a UNESCO World Heritage site. It blends ancient history with vibrant modern culture and is a gateway to Cambodia’s rich heritage.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Cambodia_Siem_Reap_locator_map.svg/200px-Cambodia_Siem_Reap_locator_map.svg.png"
          alt="Siem Reap Map"
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
          <li>Explore Angkor Wat</li>
          <li>Visit the Floating Villages on Tonle Sap Lake</li>
          <li>Enjoy the night market</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Feb</li>
          <li>Transport: Tuk-tuk, Taxi, Bicycle</li>
          <li>Wear comfortable shoes for temple visits</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d103.8600!3d13.3600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sSiem%20Reap!5e0!3m2!1sen!2skh!4v1627180800000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
        ></iframe>
        <img src="https://img.icons8.com/color/96/marker--v1.png" class="w-16 h-16 self-center justify-self-center" alt="Map Pin" />
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Anajak Travel</h3>
          <p class="text-sm text-gray-600">Discover Siem Reap’s temples and culture.</p>
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
  { name: 'Angkor Wat', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Angkor_Wat.jpg/320px-Angkor_Wat.jpg' },
  { name: 'Bayon Temple', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bayon_Temple.jpg/320px-Bayon_Temple.jpg' },
  { name: 'Ta Prohm', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ta_Prohm_Siem_Reap.jpg/320px-Ta_Prohm_Siem_Reap.jpg' },
  { name: 'Tonle Sap Lake', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Tonle_Sap_Lake.jpg/320px-Tonle_Sap_Lake.jpg' }
];

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Angkor_Wat_Sunrise.jpg/320px-Angkor_Wat_Sunrise.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Bayon_Faces.jpg/320px-Bayon_Faces.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Ta_Prohm_Trees.jpg/320px-Ta_Prohm_Trees.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Siem_Reap_Market.jpg/320px-Siem_Reap_Market.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>