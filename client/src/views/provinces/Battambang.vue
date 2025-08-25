<template>
  <div class="font-khmer bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://evaanmarket.com/cdn/shop/articles/106489599-3358969204116339-1429054520239499131-o.jpg?v=1680882823"
        alt="Battambang"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t('Province.Battambang.btbHeroTitle') }}<br />
          <span class="text-5xl">{{ $t('Province.Battambang.btbHeroSubtitle') }}</span>
        </h1>
      </div>
    </section>

    <!-- Back Button -->
    <section class="pt-6 pr-16 pl-16">
      <router-link to="/guide" class="text-purple-600 hover:underline">
        <i class="fa-solid fa-arrow-left"></i> {{ $t('BackToGuide') }}
      </router-link>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-10">
          <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t('Province.Battambang.aboutBTB') }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t('Province.Battambang.aboutBTBDescription') }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Battambang Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t('Province.Battambang.Attractions') }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-12 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6 m-6">
      <div>
        <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t('Province.Battambang.ThingsToDo') }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t('Province.Battambang.BambooTrain') }}</li>
          <li>{{ $t('Province.Battambang.CookingClass') }}</li>
          <li>{{ $t('Province.Battambang.ArtGalleries') }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t('Province.Battambang.TravelTips') }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t('Province.Battambang.BestTime') }}</li>
          <li>{{ $t('Province.Battambang.Transport') }}</li>
          <li>{{ $t('Province.Battambang.DressCode') }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t('Province.Battambang.PhotoGallery') }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t('Province.Battambang.Map') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31315.23960491142!2d103.1831048335589!3d13.102447626101994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31050b2eb8d9311f%3A0x4b8326bd6ddeeec6!2sBattambang!5e0!3m2!1sen!2skh!4v1710000000000"
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
  { name: 'Phnom Banan Temple', img: 'https://www.battambang.com/wp-content/uploads/2020/11/battambang_phnom-banan-att-b.jpg' },
  { name: 'Bamboo Train', img: 'https://www.asiakingtravel.com/images/thumbs/2024/09/15227/banner_1900x700xcrop.webp' },
  { name: 'Wat Ek Phnom', img: 'https://d2d3n9ufwugv3m.cloudfront.net/w800-h600-cfill-q80/topics/NEP3d-Wat%20Ek%20Phnom%20battambang%201.jpg' },
  { name: 'Local Market', img: 'https://media.istockphoto.com/id/1170303885/photo/a-variety-of-fresh-produce-for-sale-at-a-local-indoor-market-in-cambodia-typical-of-southeast.jpg?s=612x612&w=0&k=20&c=ijf8BOPXPAS7CxtM-C3qjg_m7QyzaRYEVWZd_z6Oe4M=' }
]

const galleryPhotos = [
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0e/e9/b7/68.jpg',
  'https://images.trvl-media.com/lodging/10000000/10000000/10000000/9999909/3aa28a54.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
  'https://media.istockphoto.com/id/1492808484/photo/view-of-phnom-banan-temple-in-battambang-cambodia-surrounded-by-lush-greenery.jpg?s=612x612&w=0&k=20&c=aYeMbCLtguXDR6YM-vP1VFgNMtHsIhVvb1TCD4-9VO4=',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4d/55/b1/caption.jpg?w=800&h=400&s=1'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
