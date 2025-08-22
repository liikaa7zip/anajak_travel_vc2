<template>
  <div class="font-khmer bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/20.jpg"
        alt="Svay Rieng"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> {{ $t("Province.SvayRieng.SRHeroTitle") }} <br />
          <span class="text-4xl">{{ $t("Province.SvayRieng.SRHeroSubtitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.SvayRieng.aboutSR") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.SvayRieng.aboutSRDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Svay Rieng Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.SvayRieng.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.SvayRieng.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.SvayRieng.First") }}</li>
          <li>{{ $t("Province.SvayRieng.Second") }}</li>
          <li>{{ $t("Province.SvayRieng.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.SvayRieng.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.SvayRieng.BestTime") }}</li>
          <li>{{ $t("Province.SvayRieng.Transport") }}</li>
          <li>{{ $t("Province.SvayRieng.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.SvayRieng.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.SvayRieng.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.0387118120456!2d105.7900093158052!3d11.086174692535875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31080075e4646ae7%3A0x301dc7e0d2990a2e!2sSvay%20Rieng%20Province!5e0!3m2!1sen!2skh!4v1710000000023"
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
  { name: 'Local Pagodas', img: 'https://www.cambotours.com/userfiles/thumbs/angkor-chey-pagoda-kandal.jpg' },
  { name: 'Rural Villages', img: 'https://i.ytimg.com/vi/ystwU2ey8W0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC-eAd-z35mnl3az6-boyErnWGO7w' },
  { name: 'Seasonal Festivals', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFF51b6ChPbmAI2vZiCbVCerIbUgnK04pzA&s' },
  { name: 'Rice Fields', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTt6XvZSToIrrzWRcyUeQZf89dyz-Elnm-E2Nvg9PmkFmV5zdgvCcctJuXeIsf1sC8_c4&usqp=CAU' }
]

const galleryPhotos = [
  'https://angkorfocus.com/userfiles/Introduction-To-Svay-Rieng-2.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/83/a1/73/ba-chua-xu-temple.jpg?w=600&h=400&s=1',
  'https://angkorfocus.com/userfiles/Where-to-Eat-In-Svay-Rieng.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/8b/e8/53/external.jpg?w=400&h=300&s=1'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
