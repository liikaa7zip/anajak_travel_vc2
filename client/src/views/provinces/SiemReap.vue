<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://images.unsplash.com/photo-1599283787923-51b965a58b05?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5na29yJTIwd2F0fGVufDB8fDB8fHww"
        alt="Siem Reap"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t("Province.SiemReap.SRHeroTitle") }}<br />
          <span class="text-5xl">{{ $t("Province.SiemReap.SRHeroSubtitle") }}</span>
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
        <div class="max-w-xl m-8">
          <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.SiemReap.aboutSR") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.SiemReap.aboutSRDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Siem Reap Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.SiemReap.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.SiemReap.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.SiemReap.First") }}</li>
          <li>{{ $t("Province.SiemReap.Second") }}</li>
          <li>{{ $t("Province.SiemReap.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.SiemReap.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.SiemReap.BestTime") }}</li>
          <li>{{ $t("Province.SiemReap.Transport") }}</li>
          <li>{{ $t("Province.SiemReap.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.SiemReap.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.SiemReap.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d103.8600!3d13.3600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sSiem%20Reap!5e0!3m2!1sen!2skh!4v1627180800000"
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
  { name: 'Angkor Wat', img: 'https://lp-cms-production.imgix.net/2025-01/Cambodia-Angkor-Wat-Waj-shutterstockRF312461543-crop.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop' },
  { name: 'Bayon Temple', img: 'https://img.traveltriangle.com/blog/wp-content/uploads/2024/06/Bayon-Temple-Cambodia-og1.jpg' },
  { name: 'Ta Prohm', img: 'https://www.asiakingtravel.com/images/thumbs/2023/12/7460/banner_1900x700xcrop.webp' },
  { name: 'Tonle Sap Lake', img: 'https://autourasia.com/uploads/Travel-Guide-Cambodia/siemreap/visit-tonle-sap-lake-in-cambodia/700-Kampong-Khleang-floating-village.jpg' }
];

const galleryPhotos = [
  'https://plus.unsplash.com/premium_photo-1661963188432-5de8a11f21a7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtYm9kaWF8ZW58MHx8MHx8fDA%3D',
  'https://afar.brightspotcdn.com/dims4/default/8af48b4/2147483647/strip/false/crop/3000x1997+0+0/resize/1486x989!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F34%2F8c%2F0a3f548947909b5b8d79b935b03f%2Ftravelguides-siemreap-guitarphotographer-shutterstock.jpg',
  'https://i.pinimg.com/474x/d7/e9/06/d7e906c6977ecfa491e0aa0800a9ce44.jpg?nii=t',
  'https://media.istockphoto.com/id/512117110/photo/night-view-in-siemreap-cambodia.jpg?s=612x612&w=0&k=20&c=5WO24j8hvEWdq0JL64cxsnzjS56He0XtfcIVFzBL-Iw='
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>