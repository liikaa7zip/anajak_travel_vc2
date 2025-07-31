<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://soprita.com/wp-content/uploads/2025/03/LleWYPYfulce13Kazygv.jpg"
        alt="Kandal"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          📍 Kandal <br />
          <span class="text-xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-xl font-semibold mb-2">About Kandal</h2>
          <p class="text-sm text-gray-700">
            Kandal Province surrounds Phnom Penh and is known for its rivers, rural landscapes, and historical sites. The province is a blend of traditional Cambodian life and proximity to the capital.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Cambodia_Kandal_locator_map.svg/200px-Cambodia_Kandal_locator_map.svg.png"
          alt="Kandal Map"
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
          <li>Visit Udong Mountain</li>
          <li>Explore the Mekong River islands</li>
          <li>Experience local markets</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
          <li>Transport: Bus, Taxi, Boat</li>
          <li>Dress comfortably for river trips</li>
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
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0977439857093!2d104.78398641411062!3d11.584379590479125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a8bb40e25f69%3A0xd7e2fbbadcae933a!2sKandal!5e0!3m2!1sen!2skh!4v1710000000000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
        ></iframe>
        <img src="https://img.icons8.com/color/96/marker--v1.png" class="w-16 h-16 self-center justify-self-center" alt="Map Pin" />
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Anajak Travel</h3>
          <p class="text-sm text-gray-600">Explore Kandal’s rivers and historical sites.</p>
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
  { name: 'Udong Mountain', img: 'https://example.com/udong-mountain.jpg' }, // Replace with actual image URL
  { name: 'Phnom Penh Riverside', img: 'https://example.com/riverside.jpg' },
  { name: 'Koh Dach Island', img: 'https://example.com/koh-dach.jpg' },
  { name: 'Ta Prohm Temple', img: 'https://example.com/ta-prohm.jpg' }
];

const galleryPhotos = [
  'https://example.com/gallery1.jpg', // Replace with actual image URLs
  'https://example.com/gallery2.jpg',
  'https://example.com/gallery3.jpg',
  'https://example.com/gallery4.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>