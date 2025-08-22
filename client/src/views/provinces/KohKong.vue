<template>
  <div class="font-khmer bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Koh-Kong3.jpg?fit=1024%2C722&ssl=1"
        alt="Koh Kong"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i>{{ $t("Province.KohKong.KKHeroTitle") }}<br />
          <span class="text-5xl">{{ $t("Province.KohKong.KKHeroSubtitle") }}</span>
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
          <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.KohKong.aboutKK") }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t("Province.KohKong.aboutKKDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Koh Kong Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KohKong.Attractions.AttractionTitle") }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KohKong.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.KohKong.First") }}</li>
          <li>{{ $t("Province.KohKong.Second") }}</li>
          <li>{{ $t("Province.KohKong.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t("Province.KohKong.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t("Province.KohKong.BestTime") }}</li>
          <li>{{ $t("Province.KohKong.Transport") }}</li>
          <li>{{ $t("Province.KohKong.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KohKong.PhotoGallery") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t("Province.KohKong.Map") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.3492891275144!2d102.91396701580631!3d11.580879291790091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3104e1603d3f1445%3A0x6ea972ba96d412ff!2sKoh%20Kong%20Province!5e0!3m2!1sen!2skh!4v1710000000021"
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
  { name: 'Cardamom Mountains', img: 'https://api.asiavivatravel.com/wp-content/uploads/2024/12/Visiting-Cardamom-Mountains-768x511.jpg' },
  { name: 'Koh Kong Beaches', img: 'https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/06/28/8c4057c240baa1896cfdf8c85a58899a_1000x1000.jpg' },
  { name: 'Tatai Waterfalls', img: 'https://www.asiakingtravel.com/cuploads/files/Tatai-waterfall-2.jpg' },
  { name: 'Koh Kong Islands', img: 'https://img1.wsimg.com/isteam/ip/4f643cb8-c431-452f-87d9-04a44f5ff07e/9be8aa51cfaea6cfb0680ac21a73d0bd-6f9f769.jpg/:/cr=t:0%25,l:12.59%25,w:74.81%25,h:100%25/rs=w:400,h:300.7518796992481,cg:true' }
]

const galleryPhotos = [
  'https://www.shutterstock.com/image-photo/traditional-floating-village-on-koh-260nw-1648267441.jpg',
  'https://angkorfocus.com/userfiles/attraction-Mangrove%20Forest%20Koh%20Kong%203.jpg',
  'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Koh-Kong6.jpg?fit=1024%2C539&ssl=1',
  'https://cache2.travelfish.org/b/assets/2015/gallery/thumbR/gallery_location_thumbR_409_1448195298.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
