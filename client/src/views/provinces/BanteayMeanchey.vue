<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-60">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Banteay_Meanchey_Province_Gate.jpg/1280px-Banteay_Meanchey_Province_Gate.jpg"
        alt="Banteay Meanchey"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          📍 Banteay Meanchey <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="p-6">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Banteay Meanchey</h2>
          <p class="text-sm text-gray-700">
            This province is in the northwest of Cambodia. It’s close to Thailand and has old temples and quiet countryside. The city is called Sisophon.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Cambodia_Banteay_Meanchey_locator_map.svg/200px-Cambodia_Banteay_Meanchey_locator_map.svg.png"
          alt="Banteay Meanchey Map"
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
          <li>Visit Banteay Chhmar</li>
          <li>Go bird-watching at the Ang Trapeang Thmor lake</li>
          <li>Explore Sisophon Market to see local life</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Apr</li>
          <li>Transport: Bus, Taxi, Train, Plain</li>
          <li>Dress modestly for temple visits</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0977439857093!2d102.98398641411062!3d13.584379590479125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311b08bb40e25f69%3A0xd7e2fbbadcae933a!2sSisophon!5e0!3m2!1sen!2skh!4v1710000000000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
        ></iframe>
        <img src="https://img.icons8.com/color/96/marker--v1.png" class="w-16 h-16 self-center justify-self-center" alt="Map Pin" />
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Anajak Travel</h3>
          <p class="text-sm text-gray-600">Explore Banteay Meanchey’s temples and countryside.</p>
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
  { name: 'Banteay Chhmar Temple', img: 'https://www.visitcambodia.org/wp-content/uploads/2020/10/Banteay-Chhmar.jpg' },
  { name: 'Phnom Bak & Phnom Chenh Chiang', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Phnom_Bak_Banteay_Meanchey.jpg' },
  { name: 'Wat Banteay Neang', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Wat_Banteay_Neang.jpg' },
  { name: 'Ang Trapeang Thmor', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Ang_Trapeang_Thmor_Bird_Sanctuary.jpg' }
]

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/e/e5/Banteay_Chhmar_Temple.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/19/Banteay_Chhmar_BasRelief.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/00/Ang_Trapeang_Thmor_Bird.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/b9/Sisophon_market.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
