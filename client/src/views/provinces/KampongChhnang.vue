<template>
  <div class="font-khmer bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/04.jpg"
        alt="Kampong Chhnang"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t("Province.KampongChhnang.KPCHHeroTitle") }}<br />
          <span class="text-5xl">{{ $t("Province.KampongChhnang.KPCHeroSubtitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-4 sm:px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KampongChhnang.aboutKPCH") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.KampongChhnang.aboutKPCHDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Kampong Chhnang Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-12 pb-6 px-4 sm:px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KampongChhnang.Attractions.AttractionTitle") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-12 pb-6 px-4 sm:px-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KampongChhnang.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.KampongChhnang.First") }}</li>
          <li>{{ $t("Province.KampongChhnang.Second") }}</li>
          <li>{{ $t("Province.KampongChhnang.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KampongChhnang.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.KampongChhnang.BestTime") }}</li>
          <li>{{ $t("Province.KampongChhnang.Transport") }}</li>
          <li>{{ $t("Province.KampongChhnang.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 px-4 sm:px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KampongChhnang.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-12 pb-6 px-4 sm:px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KampongChhnang.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d104.6667!3d12.2500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sKampong%20Chhnang!5e0!3m2!1sen!2skh!4v1627180800000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
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
  { name: 'Pottery Villages', img: 'https://static.vinwonders.com/production/Thanh-Ha-Pottery-Village-in-Vietnam.jpg' },
  { name: 'Floating Villages', img: 'https://walkaboutmonkey.com/wp-content/uploads/2023/01/Floating-village-4-optimized.png' },
  { name: 'Tonle Sap River', img: 'https://www.khmertimeskh.com/wp-content/uploads/2023/01/52627.jpg' },
  { name: 'Makong River', img: 'https://thumbs.dreamstime.com/b/province-kampong-chhnang-located-heart-cambodia-its-bordering-kampong-thom-to-north-kampong-cham-to-east-237121740.jpg' }
];

const galleryPhotos = [
  'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Kampong-Chhnang-2.webp?fit=1024%2C646&ssl=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/0b/bc/86/kampong-chhnang-villaggio.jpg?w=900&h=500&s=1',
  'https://hanoivoyage.com/uploads/Blogs/Cambodia/Kampong-Chhnang/kampong-chhnang-kong-rey-mountain-02.jpg',
  'https://authentiktravel.com/media/ckeditor/What%20to%20do%20in%20Kampong%20Chhnang%20oudong.jpg'
];
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
