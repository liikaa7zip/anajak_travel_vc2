<template>
  <div class="font-khmer bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.ppmlgroup.com/wp-content/uploads/2022/02/5b2b2134f3661.jpg"
        alt="Kampong Thom"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i>{{ $t("Province.KampongThom.KPTHeroTitle") }}<br />
          <span class="text-5xl">{{ $t("Province.KampongThom.KPTHeroSubtitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KampongThom.aboutKPT") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.KampongThom.aboutKPTDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Kampong Thom Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KampongThom.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KampongThom.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.KampongThom.First") }}</li>
          <li>{{ $t("Province.KampongThom.Second") }}</li>
          <li>{{ $t("Province.KampongThom.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KampongThom.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.KampongThom.BestTime") }}</li>
          <li>{{ $t("Province.KampongThom.Transport") }}</li>
          <li>{{ $t("Province.KampongThom.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KampongThom.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KampongThom.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d105.0000!3d12.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sKampong%20Thom!5e0!3m2!1sen!2skh!4v1627180800000"
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
  { name: 'Sambor Prei Kuk', img: 'https://www.gocambodia.tours/wp-content/uploads/2024/06/Sambor-Prei-Kuk-exploration-with-go-cambodia-tours-4.jpg' },
  { name: 'Stung Sen River', img: 'https://eacnews.asia/uploads/images/15711/EAC-NEWS-2022-10-04_5.jpg' },
  { name: 'Prasat Andet', img: 'https://indochinacharmtravel.com/wp-content/uploads/2023/03/kampong-thom-Prasat-Andet-Temple-1024x768.jpg' },
  { name: 'Phnom Santuk', img: 'https://scckampongthom.wordpress.com/wp-content/uploads/2015/10/santuk.jpg?w=604' }
];

const galleryPhotos = [
  'https://www.asiakingtravel.com/cuploads/images/Cambodia/Kampong%20Thom/kampong-thom-2.jpg',
  'https://www.asiakingtravel.com/cuploads/images/Cambodia/Kampong%20Thom/kampong-thom-8.jpg',
  'https://lh3.googleusercontent.com/p/AF1QipMkBECEp4Hte1NOrkni6L1eaHoZ1fZo_S3xh_6C=h2172-w1082',
  'https://angkorfocus.com/userfiles/thumbs/new-Wat-Kampong-Thom.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>