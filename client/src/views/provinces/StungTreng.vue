<template>
  <div class="font-khmer bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 sm:h-80 md:h-96">
      <img
        src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Stueng-Treng-5.jpg?fit=1001%2C683&ssl=1"
        alt="Stung Treng"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-4 sm:px-10">
        <h1 class="text-white text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
          <i class="fa-solid fa-location-dot mr-2"></i>
          {{ $t("Province.StungTreng.STHeroTitle") }}<br />
          <span class="text-xl sm:text-3xl md:text-5xl font-light">
            {{ $t("Province.StungTreng.STHeroSubtitle") }}
          </span>
        </h1>
      </div>
    </section>

    <!-- Back Button -->
    <section class="pt-6 px-4 sm:px-8 md:px-16">
      <router-link to="/guide" class="text-purple-600 hover:underline text-sm sm:text-base flex items-center gap-2">
        <i class="fa-solid fa-arrow-left"></i> {{ $t('BackToGuide') }}
      </router-link>
    </section>

    <!-- About Section -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start justify-between gap-6">
        <div class="w-full md:w-2/3">
          <h2 class="text-2xl sm:text-3xl font-semibold mb-2 text-purple-600">
            {{ $t("Province.StungTreng.aboutST") }}
          </h2>
          <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
            {{ $t("Province.StungTreng.aboutSTDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Stung Treng Map"
          class="w-full sm:w-72 h-48 sm:h-60 object-cover shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600">
        {{ $t("Province.StungTreng.Attractions.AttractionTitle") }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(attraction, index) in topAttractions"
          :key="index"
          class="bg-white rounded shadow overflow-hidden hover:scale-105 transform transition duration-300"
        >
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-sm sm:text-base font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-purple-600">
          {{ $t("Province.StungTreng.ThingsToDo") }}
        </h2>
        <ul class="list-disc pl-5 text-base sm:text-lg text-gray-700 space-y-1">
          <li>{{ $t("Province.StungTreng.First") }}</li>
          <li>{{ $t("Province.StungTreng.Second") }}</li>
          <li>{{ $t("Province.StungTreng.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-purple-600">
          {{ $t("Province.StungTreng.TravelTips") }}
        </h2>
        <ul class="list-disc pl-5 text-base sm:text-lg text-gray-700 space-y-1">
          <li>{{ $t("Province.StungTreng.BestTime") }}</li>
          <li>{{ $t("Province.StungTreng.Transport") }}</li>
          <li>{{ $t("Province.StungTreng.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600">
        {{ $t("Province.StungTreng.PhotoGallery") }}
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <img
          v-for="(photo, index) in galleryPhotos"
          :key="index"
          :src="photo"
          alt=""
          class="rounded shadow object-cover h-28 sm:h-36 w-full hover:opacity-90 transition"
        />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600">
        {{ $t("Province.StungTreng.Map") }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.615853732586!2d105.56318741579908!3d13.524648691417864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311e7ff3f4b71eab%3A0x1a4e7bbf3e2b3d9f!2sStung%20Treng%20Province!5e0!3m2!1sen!2skh!4v1710000000027"
          width="100%" height="200" class="rounded shadow h-56 sm:h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img
          src="https://genk.mediacdn.vn/139269124445442048/2024/8/13/google-maps-thuong-khong-chi-ngan-nhat-ma-chon-duong-vong-ly-do-vi-sao-00145298-1723531172398-17235311731771829575075-1723533715727-17235337161941703107124.png"
          class="w-full h-56 sm:h-60 object-cover rounded shadow"
          alt="Map Pin"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Mekong River Tours', img: 'https://flexibletourism.com/userfiles/thumbs/StungTreng-Trip.jpg' },
  { name: 'Sekong & Sre Pok Rivers', img: 'https://iucn.org/sites/default/files/content/images/2020/img_2401.jpg' },
  { name: 'Upper Mekong Forests', img: 'https://heritage-line.com/wp-content/uploads/2020/06/Heritage-Line-Laos-Upper-Mekong-River-Highlights-Scenery-near-Pakbeng-1.jpg' },
  { name: 'Local Villages', img: 'https://www.khmertimeskh.com/wp-content/uploads/2025/06/104434-750x440.jpg' }
]

const galleryPhotos = [
  'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Stueng-Treng-3.jpg?fit=1024%2C536&ssl=1',
  'https://nextjourneyahead.com/wp-content/uploads/2024/10/preah-nimith-falls-wide-shot.jpeg',
  'https://angkorfocus.com/userfiles/thumbs/new-Koh-Ksach-Resort.jpg',
  'https://mekongramsartrail.com/wp-content/uploads/2016/04/3-day-mekong-kayaking-adventures.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>