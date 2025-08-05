<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://img.harbor-property.com/bkarticle/2021/10/25/173634624.jpg"
        alt="Kep"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Kep <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Kep</h2>
          <p class="text-sm text-gray-700">
            Kep is Cambodia’s smallest province, located in the country’s southern coastal region. Once a vibrant beach retreat for French colonials and Cambodian elites in the 1960s, today it offers a quiet, charming escape with a mix of crumbling villas, seafood delights, serene beaches, and natural beauty. Known for its blue crab, pepper farms, and lush hills, Kep is a perfect destination for relaxation and eco-tourism, with nearby access to islands and national parks.
          </p>
        </div>
        <img
          src="https://cdn.imgbin.com/14/23/4/imgbin-phnom-penh-provinces-of-cambodia-world-map-cambodia-1DUAxbindDxxWDi3BGS7VFGm5.jpg"
          alt="Kep Map"
          class="w-80 h-60 shadow rounded"
        />
      </div>
    </section>

    <!-- Top Attractions -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Top Attractions</h2>
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
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit the famous Kep Crab Market</li>
          <li>Hike in Kep National Park</li>
          <li>Take a boat to Rabbit Island (Koh Tonsay)</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Mar (cool and dry)</li>
          <li>Pack light clothing and insect repellent</li>
          <li>Consider renting a scooter for flexible travel</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <img v-for="(photo, index) in galleryPhotos" :key="index" :src="photo" alt="" class="rounded shadow object-cover h-28 w-full" />
      </div>
    </section>

    <!-- Province Map -->
    <section class="pt-6 pb-6 pr-16 pl-16">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Province Map</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.326799889947!2d104.29208197588686!3d10.486838389682713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3107e9cb4d3f982b%3A0x43a6fc1c2a7e48d4!2sKep%20Province!5e0!3m2!1sen!2skh!4v1710000000005"
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
  { name: 'Kep Crab Market', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5g_LONXFCdoIiFLhryzkzg9FQkXrztYVIg&s' },
  { name: 'Koh Tonsay', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/42/5d/1a/koh-tonsay.jpg?w=1100&h=1100&s=1' },
  { name: 'Kep National Park', img: 'https://angkorfocus.com/userfiles/thumbs/new-Kep-National-Park.jpg' },
  { name: 'Abandoned Villas', img: 'https://www.kathmanduandbeyond.com/wp-content/uploads/2021/04/Kep-Cambodia-140.jpg' }
]

const galleryPhotos = [
  'https://www.shutterstock.com/image-photo/golden-sands-tranquility-kep-beach-260nw-2576969449.jpg',
  'https://evendo-pimcore-unified-modified.s3.eu-west-2.amazonaws.com/public/assets/Images/Product%20Images/0001/86242427-460b-484f-8156-9877edb13692.jpg',
  'https://www.khmertimeskh.com/wp-content/uploads/2023/12/72954.jpg',
  'https://camboticket.com/blog/wp-content/uploads/2024/10/kep-edited.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
