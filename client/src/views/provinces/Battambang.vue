<template>
  <div class="font-sans bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-60">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt="Battambang"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          📍 Battambang <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="p-6">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Battambang</h2>
          <p class="text-sm text-gray-700">
            Battambang is Cambodia's second-largest city. Known for its rich culture, temples, and French colonial buildings.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Cambodia_Battambang_locator_map.svg/200px-Cambodia_Battambang_locator_map.svg.png"
          alt="Battambang Map"
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
          <li>Ride the Bamboo Train</li>
          <li>Join a Khmer Cooking Class</li>
          <li>Visit Art Galleries</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31315.23960491142!2d103.1831048335589!3d13.102447626101994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31050b2eb8d9311f%3A0x4b8326bd6ddeeec6!2sBattambang!5e0!3m2!1sen!2skh!4v1710000000000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
        ></iframe>
        <img src="https://img.icons8.com/color/96/marker--v1.png" class="w-16 h-16 self-center justify-self-center" alt="Map Pin" />
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Anajak Travel</h3>
          <p class="text-sm text-gray-600">Explore Battambang's beautiful sites and culture.</p>
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
  { name: 'Phnom Banan Temple', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Phnom_Banan_1.jpg/400px-Phnom_Banan_1.jpg' },
  { name: 'Bamboo Train', img: 'https://cdn.cambodiatourism.org/wp-content/uploads/2019/03/bamboo-train-battambang.jpg' },
  { name: 'Wat Ek Phnom', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Wat_Ek_Phnom_2006.jpg/400px-Wat_Ek_Phnom_2006.jpg' },
  { name: 'Local Market', img: 'https://www.movetocambodia.com/wp-content/uploads/2014/07/battambang-market.jpg' }
]

const galleryPhotos = [
  'https://cdn.getyourguide.com/img/tour/5cc1b3e1dd90e.jpeg/145.jpg',
  'https://cdn.getyourguide.com/img/location/5d2bc92a76847.jpeg/145.jpg',
  'https://images.unsplash.com/photo-1554284112-7bcd1d2a43d9?auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1586404801986-e625b1e514a2?auto=format&fit=crop&w=400&q=60'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
