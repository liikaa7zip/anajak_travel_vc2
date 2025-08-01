<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.cambodiadaily.com/wp-content/uploads/2018/02/prey-veng-cambodia.jpg"
        alt="Prey Veng"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> Prey Veng <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Prey Veng</h2>
          <p class="text-sm text-gray-700">
            Prey Veng is a largely agricultural province in southeastern Cambodia, known for its vast rice fields and rural lifestyle. It offers a glimpse into traditional Khmer village life, with pagodas, markets, and festivals. The province is also home to several ancient temples, including Wat Preah En Kauv, dating back to the Angkor period.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Cambodia_Prey_Veng_locator_map.svg"
          alt="Prey Veng Map"
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
          <li>Visit ancient Wat Preah En Kauv temple</li>
          <li>Explore local floating villages</li>
          <li>Experience rural Khmer markets and festivals</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time to visit: Nov – Feb</li>
          <li>Travel by motorbike or local bus</li>
          <li>Respect local customs and traditions</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.116340637763!2d105.22914627588628!3d11.484219989592417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107a6df6db5fef9%3A0xc0513431638e2575!2sPrey%20Veng%20Province!5e0!3m2!1sen!2skh!4v1710000000019"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/3/37/Prey_Veng_Rice_Field_-_Cambodia_-_2013.JPG" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Prey Veng Rice Fields" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Wat Preah En Kauv', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Wat_Preah_En_Kauv_in_Prey_Veng.jpg' },
  { name: 'Prey Veng Floating Village', img: 'https://live.staticflickr.com/65535/49401256236_06c1e47e91_b.jpg' },
  { name: 'Local Market', img: 'https://www.cambodiadaily.com/wp-content/uploads/2018/02/prey-veng-cambodia-market.jpg' },
  { name: 'Rice Fields', img: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Prey_Veng_Rice_Field_-_Cambodia_-_2013.JPG' }
]

const galleryPhotos = [
  'https://www.cambodiadaily.com/wp-content/uploads/2018/02/prey-veng-cambodia.jpg',
  'https://live.staticflickr.com/65535/49401256236_06c1e47e91_b.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e8/Wat_Preah_En_Kauv_in_Prey_Veng.jpg',
  'https://www.cambodiadaily.com/wp-content/uploads/2018/02/prey-veng-cambodia-market.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
