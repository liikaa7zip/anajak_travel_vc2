<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Koh_Kong_Cambodia_03.jpg"
        alt="Koh Kong"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-solid fa-location-dot"></i> Koh Kong <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 px-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Koh Kong</h2>
          <p class="text-sm text-gray-700">
            Koh Kong is a province located in southwest Cambodia, known for its lush rainforests, pristine beaches, and the Cardamom Mountains. It borders Thailand and offers adventure activities like trekking, waterfall visits, and wildlife spotting. The region is still largely untouched by mass tourism, offering a tranquil nature escape.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/01/Cambodia_Koh_Kong_locator_map.svg"
          alt="Koh Kong Map"
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
          <li>Explore the Cardamom Mountains and waterfalls</li>
          <li>Relax on Koh Kong’s secluded beaches</li>
          <li>Visit the Tatai River and nearby islands</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time to visit: Nov – Apr</li>
          <li>Prepare for remote travel conditions and limited facilities</li>
          <li>Use local guides for trekking and eco-tours</li>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.3492891275144!2d102.91396701580631!3d11.580879291790091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3104e1603d3f1445%3A0x6ea972ba96d412ff!2sKoh%20Kong%20Province!5e0!3m2!1sen!2skh!4v1710000000021"
          width="100%" height="200" class="rounded shadow h-60" allowfullscreen loading="lazy"
        ></iframe>
        <img 
          src="https://www.tourismcambodia.com/uploads/photos/24/24c785_8a8f63a2f75f4e24ab4e97f369d3e0a7_mv2.webp" 
          class="w-full h-60 object-cover rounded shadow" 
          alt="Koh Kong Nature" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Cardamom Mountains', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Cardamom_Mountains_Cambodia.jpg' },
  { name: 'Koh Kong Beaches', img: 'https://www.tourismcambodia.com/uploads/photos/24/24c785_8a8f63a2f75f4e24ab4e97f369d3e0a7_mv2.webp' },
  { name: 'Tatai Waterfalls', img: 'https://media.tourismcambodia.org/Waterfall_Tatai_03.jpg' },
  { name: 'Koh Kong Islands', img: 'https://media.tourismcambodia.org/koh_kong_islands.jpg' }
]

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/d/d7/Cardamom_Mountains_Cambodia.jpg',
  'https://www.tourismcambodia.com/uploads/photos/24/24c785_8a8f63a2f75f4e24ab4e97f369d3e0a7_mv2.webp',
  'https://media.tourismcambodia.org/Waterfall_Tatai_03.jpg',
  'https://media.tourismcambodia.org/koh_kong_islands.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
