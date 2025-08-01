<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://cdn.tourismcambodia.org/uploads/2023/10/19/Phnom-Penh-City.jpg"
        alt="Phnom Penh"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Phnom Penh <br />
          <span class="text-4xl">Capital City</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Phnom Penh</h2>
          <p class="text-sm text-gray-700">
            Phnom Penh is Cambodia’s bustling capital located at the confluence of the Mekong and Tonle Sap Rivers. The city blends French colonial charm with modern development and Khmer culture. Attractions include the Royal Palace, Silver Pagoda, and historic sites like the Killing Fields and Tuol Sleng Genocide Museum.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Cambodia_Phnom_Penh_locator_map.svg"
          alt="Phnom Penh Map"
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
          <li>Tour the Royal Palace and Silver Pagoda</li>
          <li>Visit Tuol Sleng Genocide Museum (S21)</li>
          <li>Shop at Central and Russian Markets</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Feb</li>
          <li>Transport: Tuk-tuks, taxis, Grab app</li>
          <li>Stay alert in busy traffic and markets</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15649.478379779292!2d104.91161978373763!3d11.556373687973436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109512e0b4a6645%3A0xd4c6e7ea441e45fb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1710000000002"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://i0.wp.com/www.movetocambodia.com/wp-content/uploads/2020/02/phnom-penh-skyline.jpg?fit=1024%2C576&ssl=1" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Map View" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Royal Palace', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Phnom_Penh_-_Royal_Palace.jpg' },
  { name: 'Tuol Sleng Genocide Museum', img: 'https://media-cdn.tripadvisor.com/media/photo-s/17/89/18/88/tuol-sleng-genocide.jpg' },
  { name: 'Wat Phnom', img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Wat_Phnom_Pagoda.jpg' },
  { name: 'Central Market', img: 'https://cdn.getyourguide.com/img/tour/5c02db1e2e4c1.jpeg/145.jpg' }
]

const galleryPhotos = [
  'https://www.vietnamplus.vn/media/uploaded/xsgy/2022/03/21/phnompenh.jpg',
  'https://c1.wallpaperflare.com/preview/943/131/415/phnom-penh-cambodia-cityscape-mekong-river.jpg',
  'https://travelhome.vn/uploads/news/2021_11/phnom-penh-travelhome-03.jpg',
  'https://cdn.britannica.com/65/176565-050-BFA0E1D0/Night-view-riverside-Phnom-Penh-Cambodia.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
