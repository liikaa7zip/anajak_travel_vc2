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
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i>Kandal <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Kandal</h2>
          <p class="text-sm text-gray-700">
            Kandal Province surrounds Cambodia’s capital, Phnom Penh, making it a strategically important and accessible region. Despite its proximity to the bustling capital, Kandal retains a peaceful, rural atmosphere with traditional Khmer villages, lush rice fields, and tranquil riverfronts.

            The province is divided by the mighty Mekong and Bassac Rivers, offering beautiful landscapes and fertile farmlands. It’s a great destination for travelers seeking a short escape from Phnom Penh to experience authentic countryside life, local industries, and pagoda-filled scenery.
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Kandal Map"
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
          <li>Visit Udong Mountain</li>
          <li>Explore the Mekong River islands</li>
          <li>Experience local markets</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar</li>
          <li>Transport: Bus, Taxi, Boat</li>
          <li>Dress comfortably for river trips</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0977439857093!2d104.78398641411062!3d11.584379590479125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a8bb40e25f69%3A0xd7e2fbbadcae933a!2sKandal!5e0!3m2!1sen!2skh!4v1710000000000"
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
  { name: 'Udong Mountain', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/4f/f0/8d/caption.jpg?w=800&h=800&s=1' }, // Replace with actual image URL
  { name: 'Takhmao Town', img: 'https://i.ytimg.com/vi/qpXz0WV0p7E/maxresdefault.jpg' },
  { name: 'Koh Dach Island', img: 'https://angkorfocus.com/userfiles/thumbs/new-Koh-Dach,-Phnom-Penh.jpg' },
  { name: 'Kien Svay Floating Market', img: 'https://i.ytimg.com/vi/SSARVBNcNvk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1dCCLXQb4OeSAR2VZ1J7ueJcPtA' }
];

const galleryPhotos = [
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0d/cf/e0/71.jpg', // Replace with actual image URLs
  'https://thumbs.dreamstime.com/b/oudong-old-capital-city-cambodia-27758187.jpg',
  'https://visitlocaltravel.com/blog/wp-content/uploads/2024/02/Kandal-Travel-Attractions.jpeg',
  'https://media.istockphoto.com/id/2156011002/photo/kampong-luong-floating-village-on-tonle-sap-river-kandal-province-cambodia.jpg?s=612x612&w=0&k=20&c=-t_hn-1_aJQc2lGIm-j0AwgMK3DXFEWETVDfslMwgpo='
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>