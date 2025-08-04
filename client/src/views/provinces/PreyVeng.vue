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
  { name: 'Wat Preah En Kauv', img: 'https://www.angkor-temples-in-cambodia.com/uploads/3/0/0/4/30047791/wat-an-ko-sai-02_orig.jpg' },
  { name: 'Prey Veng Floating Village', img: 'https://visitlocaltravel.com/blog/wp-content/uploads/2024/01/Kampong-Chhang-Floating-Village-3.png' },
  { name: 'Local Market', img: 'https://i.ytimg.com/vi/Y8Ju-cAug2Q/maxresdefault.jpg' },
  { name: 'Rice Fields', img: 'https://www.khmertimeskh.com/wp-content/uploads/2020/06/The-field-rice-at-Prey-Veng-Province-2.jpg' }
]

const galleryPhotos = [
  'https://media.istockphoto.com/id/675809600/photo/the-path-towards-to-neak-pean-temple-on-artificial-island-siem-reap-cambodia.jpg?s=612x612&w=0&k=20&c=CiGYdQO0s5biq5Mxma0YKyYYFjjxfYX-B3KsMMD8NpQ=',
  'https://angkorfocus.com/userfiles/Where-to-stay-in-Prey-Veng.jpg',
  'https://media.istockphoto.com/id/953984144/photo/neak-pean-is-an-artificial-island-with-a-buddhist-temple-on-a-circular-island-in-preah-khan.jpg?s=612x612&w=0&k=20&c=n0mPtyWEUFlq30YD8exCHPTdVWmUnSrxnI24ifr6zd8=',
  'https://angkorfocus.com/userfiles/Prey-Veng-Introduction,-Cambodia-3.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
