<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://media.tacdn.com/media/attractions-splice-spp-674x446/09/52/73/75.jpg"
        alt="Phnom Penh"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t("Province.PhnomPenh.PPHeroTitle") }}<br />
          <span class="text-5xl">{{ $t("Province.PhnomPenh.PPHeroSubtitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.PhnomPenh.aboutPP") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.PhnomPenh.aboutPPDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Phnom Penh Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.PhnomPenh.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.PhnomPenh.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.PhnomPenh.First") }}</li>
          <li>{{ $t("Province.PhnomPenh.Second") }}</li>
          <li>{{ $t("Province.PhnomPenh.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.PhnomPenh.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.PhnomPenh.BestTime") }}</li>
          <li>{{ $t("Province.PhnomPenh.Transport") }}</li>
          <li>{{ $t("Province.PhnomPenh.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.PhnomPenh.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.PhnomPenh.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15649.478379779292!2d104.91161978373763!3d11.556373687973436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109512e0b4a6645%3A0xd4c6e7ea441e45fb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1710000000002"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://genk.mediacdn.vn/139269124445442048/2024/8/13/google-maps-thuong-khong-chi-ngan-nhat-ma-chon-duong-vong-ly-do-vi-sao-00145298-1723531172398-17235311731771829575075-1723533715727-17235337161941703107124.png" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Map View" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Royal Palace', img: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/02/Royal-Palace.jpg' },
  { name: 'Tuol Sleng Genocide Museum', img: 'https://mediaim.expedia.com/destination/1/9fabc9ca4b5a4e145b103739bec55b73.jpg' },
  { name: 'Wat Phnom', img: 'https://gadttravel.com/uploads/cambodia/phnom-penh/Wat-Phnom.jpg' },
  { name: 'Central Market', img: 'https://i.ytimg.com/vi/wBAPApAL97s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCAlT_QYZM-bavd9epvDgZ0BWBovg' }
]

const galleryPhotos = [
  'https://www.planetware.com/photos-large/CAM/cambodia-phnom-penh-national-museum.jpg',
  'https://t4.ftcdn.net/jpg/02/96/36/55/360_F_296365523_9NsnHdkUAg5cTOBiuvi30iJbwSsFLJ1L.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/06/ea/36/caption.jpg?w=1200&h=-1&s=1',
  'https://www.shutterstock.com/image-photo/tonle-sap-river-bank-modern-600w-2572087545.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
