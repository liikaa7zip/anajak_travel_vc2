<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://tourismcambodia.net/wp-content/uploads/2024/05/Indigenous-Villages-1.jpg"
        alt="Rattanakiri"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> {{ $t("Province.Rattanakiri.RTKHeroTitle") }} <br />
          <span class="text-5xl">{{ $t("Province.Rattanakiri.RTKHeroTitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.Rattanakiri.aboutRTK") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.Rattanakiri.aboutRTKDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Rattanakiri Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Rattanakiri.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.Rattanakiri.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.Rattanakiri.First") }}</li>
          <li>{{ $t("Province.Rattanakiri.Second") }}</li>
          <li>{{ $t("Province.Rattanakiri.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.Rattanakiri.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.Rattanakiri.BestTime") }}</li>
          <li>{{ $t("Province.Rattanakiri.Transport") }}</li>
          <li>{{ $t("Province.Rattanakiri.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Rattanakiri.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.Rattanakiri.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.301484987755!2d106.94100421580094!3d13.86629269041935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311edcd0ea0957d5%3A0xb1e7ea26f3b22b2!2sRatanakiri%20Province!5e0!3m2!1sen!2skh!4v1710000000029"
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
  { name: 'Volcanic Lakes', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gunung_rinjani.jpg' },
  { name: 'Hill Tribe Villages', img: 'https://www.backpackadventures.org/wp-content/uploads/2023/02/IMG_6830.jpg' },
  { name: 'Virachey National Park', img: 'https://www.aseanbiodiversity.org/wp-content/uploads/2024/03/virachey-banner.jpeg' },
  { name: 'Waterfalls', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/a2/b9/09/getlstd-property-photo.jpg?w=500&h=500&s=1' }
]

const galleryPhotos = [
  'https://www.mondulkiriproject.org/wp-content/uploads/2019/06/Ratanakiri.jpg',
  'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Ratanakiri-6.jpg',
  'https://www.shutterstock.com/image-photo/ka-chanh-waterfall-ratanakiri-cambodiaa-260nw-1958737591.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/c5/91/27/ou-sean-lair-waterfall.jpg?w=500&h=500&s=1'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
