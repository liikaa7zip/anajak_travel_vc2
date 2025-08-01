<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/21.jpg"
        alt="Takeo"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> Takeo <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Takeo</h2>
          <p class="text-sm text-gray-700">
            Takeo, often referred to as the "Cradle of Khmer Civilization", is a province rich in ancient history and archaeological wonders. It is home to Angkor Borei and Phnom Da, two sites that provide a glimpse into Cambodia's pre-Angkorian past. Surrounded by rice paddies and small fishing communities, the province offers a peaceful and cultural escape.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Cambodia_Takeo_locator_map.svg"
          alt="Takeo Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Top Attractions</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Explore Angkor Borei archaeological site</li>
          <li>Climb Phnom Da Temple mountain</li>
          <li>Visit the ancient Ta Prohm Temple in Tonle Bati</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit during dry season (Nov–Mar) for best access</li>
          <li>Bring sunscreen, hat, and water for temple hikes</li>
          <li>Local guides can enrich your historical experience</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="py-6 px-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Province Map</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.548383897516!2d104.78860427588804!3d10.982785089281598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31099f1c4e7a2f01%3A0x415c14b79eb4a589!2sTakeo%20Province!5e0!3m2!1sen!2skh!4v1710000000017"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://www.advantour.com/img/cambodia/images/takeo.jpg" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Takeo Scenic" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Angkor Borei', img: 'https://www.tourismcambodia.com/images/destination/2021/08/11/1840_1615896883_takeo-1.jpg' },
  { name: 'Phnom Da', img: 'https://www.tourismcambodia.com/images/destination/2018/06/11/1685_1530603444_phnomda.jpg' },
  { name: 'Tonle Bati', img: 'https://www.movetocambodia.com/wp-content/uploads/2017/06/Ta-Prohm-Tonle-Bati.jpg' },
  { name: 'Ta Prohm Temple', img: 'https://www.angkordestination.com/wp-content/uploads/2020/06/TA-PROHM-TAKEO-03.jpg' }
]

const galleryPhotos = [
  'https://www.tourismcambodia.com/images/destination/2019/10/17/1766_1571291365_tonlebati.jpg',
  'https://www.movetocambodia.com/wp-content/uploads/2017/06/phnom-da-temple.jpg',
  'https://www.tourismcambodia.com/images/destination/2021/08/11/1840_1615896883_takeo-1.jpg',
  'https://www.cambodiasite.nl/images/phnom_da.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
