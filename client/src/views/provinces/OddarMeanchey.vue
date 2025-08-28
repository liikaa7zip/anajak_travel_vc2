<template>
  <div class="font-khmer bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 sm:h-80 md:h-96">
      <img
        src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/03/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg"
        alt="Oddar Meanchey"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-4 sm:px-10">
        <h1 class="text-white text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
          <i class="fa-solid fa-location-dot mr-2"></i>
          {{ $t("Province.OddarMeanchey.OMCHeroTitle") }}<br />
          <span class="text-xl sm:text-3xl md:text-5xl font-light">
            {{ $t("Province.OddarMeanchey.OMCHeroSubtitle") }}
          </span>
        </h1>
      </div>
    </section>

    <!-- Back Button -->
    <section class="pt-6 px-4 sm:px-8 md:px-16">
      <router-link
        to="/guide"
        class="text-purple-600 hover:underline text-sm sm:text-base flex items-center gap-2"
      >
        <i class="fa-solid fa-arrow-left"></i> {{ $t("BackToGuide") }}
      </router-link>
    </section>

    <!-- About Section -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <div
        class="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start justify-between gap-6"
      >
        <div class="w-full md:w-2/3">
          <h2 class="text-2xl sm:text-3xl font-semibold mb-2 text-purple-600">
            {{ $t("Province.OddarMeanchey.aboutOMC") }}
          </h2>
          <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
            {{ $t("Province.OddarMeanchey.aboutOMCDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Oddar Meanchey Map"
          class="w-full sm:w-72 h-48 sm:h-60 object-cover shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <h2
        class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600"
      >
        {{ $t("Province.OddarMeanchey.Attractions.AttractionTitle") }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(attraction, index) in topAttractions"
          :key="index"
          class="bg-white rounded shadow overflow-hidden hover:scale-105 transform transition duration-300"
        >
          <img
            :src="attraction.img"
            alt=""
            class="w-full h-40 object-cover"
          />
          <p
            class="p-2 text-sm sm:text-base font-medium text-center"
          >
            {{ attraction.name }}
          </p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section
      class="pt-10 pb-6 px-4 sm:px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <h2
          class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-purple-600"
        >
          {{ $t("Province.OddarMeanchey.ThingsToDo") }}
        </h2>
        <ul
          class="list-disc pl-5 text-base sm:text-lg text-gray-700 space-y-1"
        >
          <li>{{ $t("Province.OddarMeanchey.First") }}</li>
          <li>{{ $t("Province.OddarMeanchey.Second") }}</li>
          <li>{{ $t("Province.OddarMeanchey.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2
          class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-purple-600"
        >
          {{ $t("Province.OddarMeanchey.TravelTips") }}
        </h2>
        <ul
          class="list-disc pl-5 text-base sm:text-lg text-gray-700 space-y-1"
        >
          <li>{{ $t("Province.OddarMeanchey.BestTime") }}</li>
          <li>{{ $t("Province.OddarMeanchey.Transport") }}</li>
          <li>{{ $t("Province.OddarMeanchey.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <h2
        class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600"
      >
        {{ $t("Province.OddarMeanchey.PhotoGallery") }}
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
      <h2
        class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600"
      >
        {{ $t("Province.OddarMeanchey.Map") }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890123!2d103.5000!3d14.1167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a5f5f5f5f5f5f%3A0x9b1c2d3e4f5a6b7c!2sOddar%20Meanchey!5e0!3m2!1sen!2skh!4v1627180800000"
          width="100%"
          height="200"
          class="rounded shadow h-56 sm:h-60"
          allowfullscreen
          loading="lazy"
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
  { name: "Anlong Veng", img: "https://www.cambotours.com/userfiles/thumbs/anlong-veng.jpg" },
  { name: "Prasat Ta Krabey", img: "https://www.guidetrip.info/asset/img/gallery_resort/5b25f72a6b5f9.jpg" },
  { name: "Prasat Ta Moan Thom", img: "https://www.guidetrip.info/asset/img/gallery_resort/5b25f1a0e561d.jpg" },
  { name: "Samraong Town", img: "https://www.khmertimeskh.com/wp-content/uploads/2024/04/80804.jpg" },
];

const galleryPhotos = [
  "https://www.vivutravel.com/images/des-cambodia3/oddor-meanchey-travel-guide.jpg",
  "https://nenow.in/wp-content/uploads/2025/07/ta-muen-thom_temple19.jpg",
  "https://helloangkor.com/wp-content/uploads/2021/05/IMG_20211224_093508-1024x768.jpg",
  "https://angkorfocus.com/userfiles/Oddor-Meanchey-Introduction-2.jpg",
];
</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
}
</style>
