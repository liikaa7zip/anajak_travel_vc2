<template>
  <div class="w-full font-poppins bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-60 overflow-hidden rounded-b-md">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt="Cambodia"
        class="w-full h-full object-cover"
      />
      <div class="absolute left-10 bottom-8 text-white text-xl font-semibold drop-shadow-md sm:left-3 sm:bottom-3 sm:text-base">
        <h2>
          Welcome to the travel guide,<br />
          and go to your dream place in Cambodia.
        </h2>
      </div>
    </section>

    <!-- Destinations List -->
    <section class="bg-white mx-6 mb-6 p-6 rounded-xl shadow-md sm:mx-1 sm:p-4">
      <h3 class="mb-4 font-semibold text-lg">Travel for destinations</h3>
      <div class="flex flex-wrap gap-8 sm:gap-4">
        <div
          v-for="(col, idx) in destinationColumns"
          :key="idx"
          class="min-w-[140px] flex flex-col gap-1 text-sm"
        >
          <span v-for="province in col" :key="province">{{ province }}</span>
        </div>
      </div>
    </section>

    <!-- Province Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="province in provinces"
        :key="province.name"
        class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition"
      >
        <img :src="province.image" :alt="province.name" class="w-full h-40 object-cover" />
        <div class="p-4 pb-2">
          <h4 class="text-lg font-semibold mb-2">{{ province.name }}</h4>
           <div class="flex flex-wrap gap-2">
                        <button @click="viewProvince(province.name)" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                        <button @click="viewFood(province.name)" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                        <button @click="bookTransport(province.name)" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                        <button @click="checkWeather(province.name)" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                    </div>
          <div class="flex gap-2">
            <span
              v-for="icon in icons"
              :key="icon"
              v-html="icon"
              class="inline-block"
            ></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinces: [
        {
          name: "Banteay Meanchey",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Banteay-Meanchey2.jpg?fit=1024%2C683&ssl=1",
        },
        {
          name: "Preah Vihear",
          image:
            "https://www.birdguideasso.org/wp-content/uploads/2018/09/Preah-Vihear-Temple-1-e1545105862913.jpg",
        },
        {
          name: "Kampong Thom",
          image: "https://www.ppmlgroup.com/wp-content/uploads/2022/02/5b2b2134f3661.jpg",
        },
        {
          name: "Takeo",
          image: "https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/21.jpg",
        },
        {
          name: "Svay Rieng",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/9/9e/Svay_Rieng_Province_Monument.jpg",
        },
        {
          name: "Stung Treng",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Stung_Treng_Province_Monument.jpg",
        },
        {
          name: "Sihanouk ville",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/2/2a/Sihanoukville_Province_Monument.jpg",
        },
        {
          name: "Siem Reap",
          image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Angkor_Wat_temple.jpg",
        },
        {
          name: "Rattanakiri",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Ratanakiri_Province_Monument.jpg",
        },
        {
          name: "Pursat",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Pursat_Province_Monument.jpg",
        },
        {
          name: "Prey Veng",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Prey_Veng_Province_Monument.jpg",
        },
        {
          name: "Pailin",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Pailin_Province_Monument.jpg",
        },
        {

          name: "Oddar Meanchey",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Oddar_Meanchey_Province_Monument.jpg",
        },
        {
          name: "Mondulkiri",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Mondulkiri_Province_Monument.jpg",
        },
        {
          name: "Kratie",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kratie_Province_Monument.jpg",
        },
        {
          name: "Kampong Chhnang",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kampong_Chhnang_Province_Monument.jpg",
        },
        {
          name: "Kampong Cham",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kampong_Cham_Province_Monument.jpg",
        },
        {
          name: "Battambang",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Battambang_Province_Monument.jpg",
        },
        {
          name: "Phnom Penh",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Phnom_Penh_Province_Monument.jpg",
        },
        {
          name: "Tbong Khmum",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tbong_Khmum_Province_Monument.jpg",
        },
        {
          name: "Koh Kong",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Koh_Kong_Province_Monument.jpg",
        },
        {
          name: "Kep",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kep_Province_Monument.jpg",
        },
        {
          name: "Kandal",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kandal_Province_Monument.jpg",
        },
        {
          name: "Kampot",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kampot_Province_Monument.jpg",
        },
        {
          name: "Kampong Speu",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kampong_Speu_Province_Monument.jpg",
        },
      ],
       methods: {
                viewProvince(name) {
                    alert(`Exploring ${name} details!`);
                    // Add logic to navigate to province details page
                },
                viewFood(name) {
                    alert(`Discovering local food in ${name}!`);
                    // Add logic to show food menu
                },
                bookTransport(name) {
                    alert(`Booking transportation for ${name}!`);
                    // Add logic for transportation booking
                },
                checkWeather(name) {
                    alert(`Checking weather for ${name}!`);
                    // Add logic to fetch and display weather
                }
            }
    };
  },
  computed: {
    destinationColumns() {
      const cols = [[], [], [], [], []];
      this.provinces.forEach((p, i) => {
        cols[i % 5].push(p.name);
      });
      return cols;
    },
  },
};
</script>
