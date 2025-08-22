<template>
  <div class="font-khmer bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.ppmlgroup.com/wp-content/uploads/2022/02/takeo-icon_orig.jpg"
        alt="Takeo"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> {{ $t("Province.Takeo.TKHeroTitle") }} <br />
          <span class="text-5xl">{{ $t("Province.Takeo.TKHeroSubtitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.Takeo.aboutTK") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.Takeo.aboutTKDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Takeo Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Takeo.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.Takeo.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.Takeo.First") }}</li>
          <li>{{ $t("Province.Takeo.Second") }}</li>
          <li>{{ $t("Province.Takeo.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.Takeo.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.Takeo.BestTime") }}</li>
          <li>{{ $t("Province.Takeo.Transport") }}</li>
          <li>{{ $t("Province.Takeo.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Takeo.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Takeo.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.548383897516!2d104.78860427588804!3d10.982785089281598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31099f1c4e7a2f01%3A0x415c14b79eb4a589!2sTakeo%20Province!5e0!3m2!1sen!2skh!4v1710000000017"
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
  { name: 'Angkor Borei', img: 'https://guiaportuguesdeangkorwat.com/userfiles/angkor-borei-takeo.jpg' },
  { name: 'Phnom Da', img: 'https://www.cambotours.com/userfiles/thumbs/phnom-da-takeo.jpg' },
  { name: 'Tonle Bati', img: 'https://www.greeneratravel.com/userfiles/850tonlebati.jpg' },
  { name: 'Chiso Mountain', img: 'https://www.angkor-temples-in-cambodia.com/uploads/3/0/0/4/30047791/phnom-chisor-05-600_orig.jpg' }
]

const galleryPhotos = [
  'https://www.shutterstock.com/shutterstock/videos/34041901/thumb/1.jpg?ip=x480',
  'https://saigonlandtravel.com/img_data/images/cam-5.jpg',
  'https://www.tour-cambodia.com/cdn/kh-public/phnom_da.jpg',
  'https://www.indochinavoyages.com/wp-content/uploads/2014/12/29-12Takeo-Province-1200x675.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
