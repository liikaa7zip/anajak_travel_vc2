<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://www.viajeacamboya.com/wp-content/uploads/kratie-camboya.jpg"
        alt="Kratie"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Kratie <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Kratie</h2>
          <p class="text-sm text-gray-700">
            Kratie is a charming riverside province in northeastern Cambodia along the Mekong River. It's best known for being one of the few places in the world to spot the rare Irrawaddy dolphins. The town itself has a relaxed vibe, with French colonial architecture and access to nearby natural wonders and villages.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Cambodia_Kratie_locator_map.svg"
          alt="Kratie Map"
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
          <li>Watch Irrawaddy dolphins in the Mekong River</li>
          <li>Cycle around Koh Trong Island</li>
          <li>Explore Phnom Sombok and the countryside</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Dec – Mar (dry season)</li>
          <li>Transport: Bus or minivan from Phnom Penh</li>
          <li>Respect local communities and dolphins’ space</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15693.486786801852!2d106.01108041776134!3d12.48874370015927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d8c33a8b2ed75%3A0xd18b1ff8aeaa4e62!2sKratie!5e0!3m2!1sen!2skh!4v1710000000004"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://www.asialifemagazine.com/cambodia/wp-content/uploads/sites/3/2022/03/Kratie-Riverfront.jpg" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Kratie River" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Irrawaddy Dolphins', img: 'https://www.movetocambodia.com/wp-content/uploads/2022/11/kratie-dolphins.jpg' },
  { name: 'Koh Trong Island', img: 'https://images.squarespace-cdn.com/content/v1/5c84be7694d71a74f67eb60f/1577007935542-HX8PR1YW9U5KJ49NLIOF/kratie+cambodia+island' },
  { name: 'Phnom Sombok', img: 'https://cambodiatravel.com/wp-content/uploads/2019/07/Phnom-Sambok-Kratie.jpg' },
  { name: 'Mekong River Sunset', img: 'https://www.travelcambodiaonline.com/images/kratie/kratie-cambodia.jpg' }
]

const galleryPhotos = [
  'https://theculturetrip.com/wp-content/uploads/2022/02/kratie-cambodia.jpg',
  'https://blog.chasingplaces.com/wp-content/uploads/2016/01/Sunset-over-the-Mekong-in-Kratie-Cambodia.jpg',
  'https://www.orientalarchitecture.com/gallery/cambodia/kratie/photos/kratie01.jpg',
  'https://live.staticflickr.com/5070/5667657806_00e5bc315b_b.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
