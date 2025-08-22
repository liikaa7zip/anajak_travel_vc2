<template>
  <div class="font-khmer bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Banteay-Meanchey2.jpg?fit=1024%2C683&ssl=1"
        alt="Banteay Meanchey"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>{{ $t('Province.BanteayMeanchey.BMCHeroTitle') }}<br />
          <span class="text-5xl">{{ $t('Province.BanteayMeanchey.BMCHeroSubtitle') }}</span>
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
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start  justify-between gap-4">
        <div class="max-w-xl m-8">
          <h2 class="text-3xl font-semibold mb-2 text-purple-600">{{ $t('Province.BanteayMeanchey.aboutBMC') }}</h2>
          <p class="text-lg text-gray-700">
            {{ $t('Province.BanteayMeanchey.aboutBMCDescription') }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Banteay Meanchey Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t('Province.BanteayMeanchey.Attractions.AttractionTitle') }}</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t('Province.BanteayMeanchey.ThingsToDo') }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t('Province.BanteayMeanchey.First') }}</li>
          <li>{{ $t('Province.BanteayMeanchey.Second') }}</li>
          <li>{{ $t('Province.BanteayMeanchey.Third') }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">{{ $t('Province.BanteayMeanchey.TravelTips') }}</h2>
        <ul class="list-disc pl-5 text-lg text-gray-700">
          <li>{{ $t('Province.BanteayMeanchey.BestTime') }}</li>
          <li>{{ $t('Province.BanteayMeanchey.Transport') }}</li>
          <li>{{ $t('Province.BanteayMeanchey.DressCode') }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t('Province.BanteayMeanchey.PhotoGallery') }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">{{ $t('Province.BanteayMeanchey.Map') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0977439857093!2d102.98398641411062!3d13.584379590479125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311b08bb40e25f69%3A0xd7e2fbbadcae933a!2sSisophon!5e0!3m2!1sen!2skh!4v1710000000000"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://genk.mediacdn.vn/139269124445442048/2024/8/13/google-maps-thuong-khong-chi-ngan-nhat-ma-chon-duong-vong-ly-do-vi-sao-00145298-1723531172398-17235311731771829575075-1723533715727-17235337161941703107124.png" 
          class="w-full h-60 " alt="Map Pin" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Banteay Chhmar Temple', img: 'https://mblogthumb-phinf.pstatic.net/MjAxODA5MTJfMTAg/MDAxNTM2NzU5NDQzNTU3.r5Wi9Kj3nljQ7bEQQhr8TyH2_xD8k8VoBqfp2Zri9TAg.pS0u5GWfE2YdSMcE1NUatCgxwM88lQe5bc0a0yB2eKgg.JPEG.ilovecambodia/IMG_3197.jpg?type=w800' },
  { name: 'Phnom Bak', img: 'https://www.greeneratravel.com/userfiles/850phnombakphnomchenhchang.jpg' },
  { name: 'Wat Banteay Neang', img: 'https://visitlocaltravel.com/blog/wp-content/uploads/2024/03/Banteay-Neang-Temple.png' },
  { name: 'Ang Trapeang Thmor', img: 'https://scckampongthom.wordpress.com/wp-content/uploads/2015/10/ang-trapeang-thmor.jpg' }
]

const galleryPhotos = [
  'https://www.devata.org/dat-devata/uploads/2010/12/001-Banteay-Chhmar-architectural-reconstruction.jpg',
  'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Banteay-Meanchey4.jpg?fit=1280%2C1280&ssl=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/2d/e3/76/banteay-chhmar.jpg?w=1200&h=700&s=1',
  'https://www.orientalarchitecture.com/gallery/cambodia/banteay-meanchey/banteay-torp/photos/banteay-torp01.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
