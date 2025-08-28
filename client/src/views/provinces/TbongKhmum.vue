<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://aicdn.picsart.com/d6b60b9c-5f43-4da7-b5a7-2c8cbb52d06e.jpg"
        alt="Tbong Khmum"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> {{ $t("Province.TbongKhmum.TBKHeroTitle") }} <br />
          <span class="text-5xl">{{ $t("Province.TbongKhmum.TBKHeroSubtitle") }}</span>
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
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.TbongKhmum.aboutTBK") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.TbongKhmum.aboutTBKDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Tbong Khmum Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.TbongKhmum.Attractions.AttractionTitle") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-2sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="py-6 px-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.TbongKhmum.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.TbongKhmum.First") }}</li>
          <li>{{ $t("Province.TbongKhmum.Second") }}</li>
          <li>{{ $t("Province.TbongKhmum.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.TbongKhmum.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>{{ $t("Province.TbongKhmum.BestTime") }}</li>
          <li>{{ $t("Province.TbongKhmum.Transport") }}</li>
          <li>{{ $t("Province.TbongKhmum.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.TbongKhmum.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.TbongKhmum.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.703143731221!2d105.14028941580488!3d11.969702490092672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107d73d8752e93d%3A0xc3447b4504eaee3c!2sTbong%20Khmum%20Province!5e0!3m2!1sen!2skh!4v1710000000031"
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
  { name: 'Wat Ek Phnom', img: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Ek_Phnom3.JPG' },
  { name: 'Rubber Plantations', img: 'https://image.vietnamnews.vn/uploadvnnews/Article/2023/10/11/310178_rubber.jpg' },
  { name: 'Local Villages', img: 'https://static.vecteezy.com/system/resources/thumbnails/057/288/752/small_2x/tbong-khmum-province-aerial-views-of-cambodia-s-countryside-video.jpg' },
  { name: 'Traditional Festivals', img: 'https://thebettercambodia.com/wp-content/uploads/2024/01/fishing-day-1024x601-1.jpg' }
]

const galleryPhotos = [
  'https://live.staticflickr.com/7904/32616193198_b58909e868_h.jpg',
  'https://helloangkor.com/wp-content/uploads/2022/06/IMG_20220619_135125.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQlJKrtWg_gfwvgzVGKRC3gjoxy28c9UUkiBJpTtxY-4NWJcHiMdXYY7n5oPQ1BypsSPs&usqp=CAU',
  'https://tourismcambodia.net/wp-content/uploads/2024/05/Ho-O-Ktong-Water-Amusement-Park.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
