<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://privateangkorwattour.com/wp-content/uploads/preah-vihear-temple-tour-1.jpg"
        alt="Preah Vihear"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t("Province.PreahVihear.PVHeroTitle") }}<br />
          <span class="text-5xl">{{ $t("Province.PreahVihear.PVHeroSubtitle") }}</span>
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
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.PreahVihear.aboutPV") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.PreahVihear.aboutPVDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Preah Vihear Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.PreahVihear.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.PreahVihear.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.PreahVihear.First") }}</li>
          <li>{{ $t("Province.PreahVihear.Second") }}</li>
          <li>{{ $t("Province.PreahVihear.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.PreahVihear.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.PreahVihear.BestTime") }}</li>
          <li>{{ $t("Province.PreahVihear.Transport") }}</li>
          <li>{{ $t("Province.PreahVihear.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.PreahVihear.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.PreahVihear.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d104.6667!3d13.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sPreah%20Vihear!5e0!3m2!1sen!2skh!4v1627180800000"
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
  { name: 'Preah Vihear Temple', img: 'https://www.khmertimeskh.com/wp-content/uploads/2023/12/Preah-Vihear-temple-1.jpg' },
  { name: 'Koh Ker Temple', img: 'https://www.siemreaptaxidrivertours.com/wp-content/uploads/2024/02/KOH-KER-TEMPLE-1024x644.jpeg' },
  { name: 'Preah Vihear Forest', img: 'https://napv.gov.kh/uploads//images/Gallery/Archaeological%20Site/Preah%20Vihear%20Gallery/gopura1/DJI_0931.JPG' },
  { name: 'Tbeng Meanchey Town', img: 'https://media.evendo.com/locations-resized/AttractionImages/360x263/412c4c61-6d15-4f15-a3db-9b6e4ba14fba' }
];

const galleryPhotos = [
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/ed/8d/bb.jpg',
  'https://threeland.com/_next/image?url=https%3A%2F%2Fbackend.threeland.com%2Fstorage%2Fimages%2Fgallery%2Fpreah-vihear-discovery-2.jpg&w=640&q=75',
  'https://napv.gov.kh/uploads//images/Gallery/Archaeological%20Site/Preah%20Vihear%20Gallery/gopura5/DSC026871.jpg',
  'https://mindtrip.ai/cdn-cgi/image/w=640,format=webp,h=640,fit=cover/https://iorigin.mindtrip.ai/attractions/2309/9b9b/2b61/1f5e/bb33/2940/2c1f/f5d8'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>