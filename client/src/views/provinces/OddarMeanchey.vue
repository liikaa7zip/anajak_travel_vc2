<template>
  <div class="font-khmer bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/03/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg"
        alt="Oddar Meanchey"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t('Province.OddarMeanchey.OMCHeroTitle') }}<br />
          <span class="text-5xl">{{ $t('Province.OddarMeanchey.OMCHeroSubtitle') }}</span>
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
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-xl font-semibold mb-2">{{ $t('Province.OddarMeanchey.aboutOMC') }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t('Province.OddarMeanchey.aboutOMCDescription') }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Oddar Meanchey Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-xl font-semibold mb-4">{{ $t('Province.OddarMeanchey.Attractions.AttractionTitle') }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-24 object-cover" />
          <p class="p-2 text-sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-12 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">{{ $t('Province.OddarMeanchey.ThingsToDo') }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t('Province.OddarMeanchey.First') }}</li>
          <li>{{ $t('Province.OddarMeanchey.Second') }}</li>
          <li>{{ $t('Province.OddarMeanchey.Third') }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">{{ $t('Province.OddarMeanchey.TravelTips') }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t('Province.OddarMeanchey.BestTime') }}</li>
          <li>{{ $t('Province.OddarMeanchey.Transport') }}</li>
          <li>{{ $t('Province.OddarMeanchey.DressCode') }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-xl font-semibold mb-4">{{ $t('Province.OddarMeanchey.PhotoGallery') }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-xl font-semibold mb-4">{{ $t('Province.OddarMeanchey.Map') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d103.5000!3d14.1167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sOddar%20Meanchey!5e0!3m2!1sen!2skh!4v1627180800000"
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
  { name: 'Anlong Veng', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Anlong_Veng_Oddar_Meanchey.jpg/320px-Anlong_Veng_Oddar_Meanchey.jpg' },
  { name: 'Preah Vihear Temple', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Preah_Vihear_Temple_Oddar.jpg/320px-Preah_Vihear_Temple_Oddar.jpg' },
  { name: 'Samraong Town', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Samraong_Oddar_Meanchey.jpg/320px-Samraong_Oddar_Meanchey.jpg' },
  { name: 'Border Markets', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Oddar_Meanchey_Border_Market.jpg/320px-Oddar_Meanchey_Border_Market.jpg' }
];

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Anlong_Veng_Landscape.jpg/320px-Anlong_Veng_Landscape.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Preah_Vihear_View.jpg/320px-Preah_Vihear_View.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Oddar_Meanchey_Village.jpg/320px-Oddar_Meanchey_Village.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Oddar_Meanchey_Road.jpg/320px-Oddar_Meanchey_Road.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>