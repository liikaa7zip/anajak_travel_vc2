<template>
  <div class="font-sans bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Banteay-Meanchey2.jpg?fit=1024%2C683&ssl=1"
        alt="Banteay Meanchey"
        class="w-full h-full object-cover rounded-b-md"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center px-10">
        <h1 class="text-white text-3xl sm:text-6xl font-bold">
          <i class="fa-notdog fa-solid fa-location-dot"></i>Banteay Meanchey <br />
          <span class="text-4xl">Province</span>
        </h1>
      </div>
    </section>

    <!-- About Section -->
    <section class="pt-12 pb-6 pr-16 pl-16">
      <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start  justify-between gap-4">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold mb-2 text-purple-600">About Banteay Meanchey</h2>
          <p class="text-sm text-gray-700">
            This province is in the northwest of Cambodia. It’s close to Thailand and has old temples and quiet countryside. The city is called Sisophon.Banteay Meanchey lies in northwestern Cambodia, bordering Thailand, with its capital Sisophon (Serei Saophoan) and the historic temple of Banteay Chhmar. Highlights include hilltop shrines like Phnom Bak and Phnom Chenh Chiang, wetlands at Ang Trapeang Thma, and unique local markets.
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/18/Cambodia_Banteay_Meanchey.png"
          alt="Banteay Meanchey Map"
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
          <p class="p-2 text-sm font-medium text-center">{{ attraction.name }}</p>
        </div>
      </div>
    </section>

    <!-- Things to Do & Travel Tips -->
    <section class="pt-6 pb-6 pr-16 pl-16 grid sm:grid-cols-2 gap-6">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Things to Do</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Visit Banteay Chhmar</li>
          <li>Go bird-watching at the Ang Trapeang Thmor lake</li>
          <li>Explore Sisophon Market to see local life</li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-purple-600">Travel Tips</h2>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>Best time: Nov – Apr</li>
          <li>Transport: Bus, Taxi, Train, Plain</li>
          <li>Dress modestly for temple visits</li>
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
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0977439857093!2d102.98398641411062!3d13.584379590479125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311b08bb40e25f69%3A0xd7e2fbbadcae933a!2sSisophon!5e0!3m2!1sen!2skh!4v1710000000000"
          width="100%" height="200" class="rounded shadow" allowfullscreen loading="lazy"
        ></iframe>
        <img src="https://img.icons8.com/color/96/marker--v1.png" class="w-16 h-16 self-center justify-self-center" alt="Map Pin" />
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Anajak Travel</h3>
          <p class="text-sm text-gray-600">Explore Banteay Meanchey’s temples and countryside.</p>
          <div class="mt-2">
            <button class="text-sm bg-black text-white px-3 py-1 rounded">Download App</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const topAttractions = [
  { name: 'Banteay Chhmar Temple', img: 'https://www.devata.org/dat-devata/uploads/2010/12/001-Banteay-Chhmar-architectural-reconstruction.jpg' },
  { name: 'Phnom Bak', img: 'https://www.greeneratravel.com/userfiles/850phnombakphnomchenhchang.jpg' },
  { name: 'Wat Banteay Neang', img: 'https://visitlocaltravel.com/blog/wp-content/uploads/2024/03/Banteay-Neang-Temple.png' },
  { name: 'Ang Trapeang Thmor', img: 'https://scckampongthom.wordpress.com/wp-content/uploads/2015/10/ang-trapeang-thmor.jpg' }
]

const galleryPhotos = [
  'https://upload.wikimedia.org/wikipedia/commons/e/e5/Banteay_Chhmar_Temple.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/19/Banteay_Chhmar_BasRelief.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/00/Ang_Trapeang_Thmor_Bird.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/b9/Sisophon_market.jpg'
]
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
