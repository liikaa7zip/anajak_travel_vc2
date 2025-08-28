<template>
  <div class="font-khmer bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative w-full h-64 sm:h-80 md:h-96">
      <img
        src="https://aicdn.picsart.com/37b6fccf-479e-4701-953b-0a6a1d842a43.png"
        alt="Kratie"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-4 sm:px-10">
        <h1 class="text-white text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
          <i class="fa-solid fa-location-dot mr-2"></i>
          {{ $t("Province.Kratie.KTHeroTitle") }} <br />
          <span class="text-xl sm:text-3xl md:text-5xl font-light">
            {{ $t("Province.Kratie.KTHeroSubtitle") }}
          </span>
        </h1>
      </div>
    </section>

    <!-- Back Button -->
    <section class="pt-6 px-4 sm:px-8 md:px-16">
      <router-link to="/guide" class="text-purple-600 hover:underline text-sm sm:text-base flex items-center gap-2">
        <i class="fa-solid fa-arrow-left"></i> {{ $t("BackToGuide") }}
      </router-link>
    </section>

    <!-- About Section -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start justify-between gap-6">
        <div class="w-full md:w-2/3">
          <h2 class="text-2xl sm:text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.Kratie.aboutKT") }}</h2>
          <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
            {{ $t("Province.Kratie.aboutKTDescription") }}
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Kratie Map"
          class="w-full sm:w-72 h-48 sm:h-60 object-cover shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600">
        {{ $t("Province.Kratie.Attractions.AttractionTitle") }}
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
        <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.Kratie.ThingsToDo") }}</h2>
        <ul class="list-disc pl-5 text-base sm:text-lg text-gray-700 space-y-1">
          <li>{{ $t("Province.Kratie.First") }}</li>
          <li>{{ $t("Province.Kratie.Second") }}</li>
          <li>{{ $t("Province.Kratie.Third") }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-purple-600">{{ $t("Province.Kratie.TravelTips") }}</h2>
        <ul class="list-disc pl-5 text-base sm:text-lg text-gray-700 space-y-1">
          <li>{{ $t("Province.Kratie.BestTime") }}</li>
          <li>{{ $t("Province.Kratie.Transport") }}</li>
          <li>{{ $t("Province.Kratie.DressCode") }}</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-10 pb-6 px-4 sm:px-8 md:px-16">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600">{{ $t("Province.Kratie.PhotoGallery") }}</h2>
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
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600">{{ $t("Province.Kratie.Map") }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15693.486786801852!2d106.01108041776134!3d12.48874370015927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d8c33a8b2ed75%3A0xd18b1ff8aeaa4e62!2sKratie!5e0!3m2!1sen!2skh!4v1710000000004"
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
  { name: 'Irrawaddy Dolphins', img: 'https://flcchn.com/wp-content/uploads/2023/01/irrawaddy-dolphin-wwf-cambodia-compressed.jpg' },
  { name: 'Koh Trong Island', img: 'https://cambodia-travelpartner.com/wp-content/uploads/2025/02/Koh-Trong-island-biirdview-lr.png' },
  { name: 'Phnom Sombok', img: 'https://angkorfocus.com/userfiles/attraction-Wat%20Phnom%20Sam%20Bok%20Resort.jpg' },
  { name: 'Mekong River Sunset', img: 'https://media.istockphoto.com/id/1364223919/photo/sunset-on-the-mekong-river-in-cambodia.jpg?s=612x612&w=0&k=20&c=zhM_o8J0NIkVGtidrxdQxqF_14On3sL_Usn5VZ9WT9M=' }
]

const galleryPhotos = [
  'https://media-cdn.tripadvisor.com/media/photo-s/01/25/f9/f4/mekong-river.jpg',
  'https://angkorfocus.com/userfiles/attraction-Kratie%20Introduction%203.jpg',
  'https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/06/28/4d8fd718f8b2913fe2b0aed2319082e6_1000x1000.jpg',
  'https://static.information.gov.kh/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNnFYQlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--2d56f9baddb498bfc92344d50467500034fe8092/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lNT1RBd2VEWXdNQVk2QmtWVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--70cbddbba2e46c7ca8ac0c1f8b8316d88752e16d/DJI_0020-1024x683.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
