<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.sarahdegheselle.com/wp-content/uploads/2024/05/Sarah-De-Gheselle-110237666-1024x682.jpg"
        alt="Kampot"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t("Province.Kampot.KPHeroTitle") }}<br />
          <span class="text-4xl">{{ $t("Province.Kampot.KPHeroSubtitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.Kampot.aboutKP") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.Kampot.aboutKPDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Kampot Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Kampot.Attractions.AttractionTitle") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(attraction, index) in topAttractions" :key="index" class="bg-white rounded shadow overflow-hidden">
          <img :src="attraction.img" alt="" class="w-full h-40 object-cover" />
          <p class="p-2 text-2sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-6 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.Kampot.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>{{ $t("Province.Kampot.First") }}</li>
          <li>{{ $t("Province.Kampot.Second") }}</li>
          <li>{{ $t("Province.Kampot.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.Kampot.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>{{ $t("Province.Kampot.BestTime") }}</li>
          <li>{{ $t("Province.Kampot.Transport") }}</li>
          <li>{{ $t("Province.Kampot.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Kampot.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Kampot.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7893.646757754671!2d104.27935997783012!3d10.609217872894795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107d0cd7d9a2675%3A0x47147b9d0662db58!2sKampot!5e0!3m2!1sen!2skh!4v1710000000003"
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
  { name: 'Bokor National Park', img: 'https://www.asiakingtravel.com/cuploads/files/Cambodia/Bokor%20National%20Park/Bokor-National-Park-2.jpg' },
  { name: 'Kampot Pepper Farms', img: 'https://www.asiakingtravel.com/cuploads/files/Cambodia/Kampot%20Pepper%20Plantations/Kampot-Pepper-Plantations-0.jpg' },
  { name: 'Kampot River', img: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/10/27195813/Kampot_0_Feature-1600x900.jpg' },
  { name: 'Old French Quarter', img: 'https://upload.wikimedia.org/wikipedia/commons/6/64/2016_Kampot%2C_Budynek_ze_sklepami.jpg' }
]

const galleryPhotos = [
  'https://cambotours.com/userfiles/thumbs/countryside-rabbit-island-tour.jpg',
  'https://cambodia-images.com/wp-content/uploads/2023/07/kampot-10-2-kep.jpg',
  'https://images.adsttc.com/media/images/63c9/4211/760d/d26d/8167/3c82/medium_jpg/amber-kampot-resort-bloom-architecture_1.jpg?1674134095',
  'https://cf.bstatic.com/xdata/images/hotel/max1024x768/526322498.jpg?k=7601993762a7546af244600d8484e6e0b1100d302965a386154b62dbf79aeae9&o=&hp=1'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
