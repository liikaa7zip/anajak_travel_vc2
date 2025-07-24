<template>
  <div class="w-full font-poppins bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 overflow-hidden rounded-b-md">
      <img
        src="https://asiapioneertravel.com/wp-content/uploads/2024/04/cambodia-family-holiday.jpg"
        alt="Cambodia"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 justify-center flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold text-center">
          🗺️  Welcome to the travel guide, <br />
          <span class="text-xl">and go to your dream place in Cambodia.</span>
        </h1>
      </div>
    </section>

    <!-- Destinations List -->
    <section class="bg-white mx-6 mb-6 p-6 rounded-xl shadow-md sm:mx-1 sm:p-4">
      <h3 class="mb-4 font-semibold text-lg">Travel for destinations</h3>
      <div class="flex flex-wrap gap-8 sm:gap-4 justify-between">
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
            "https://tourismcambodia.org/storage/uploads/category_banner/ministry-of-tourism-cambodia-2019-02-11-07-23-27am-Svay-Rieng-Taxi-in-Cambodia.png",
        },
        {
          name: "Stung Treng",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Stueng-Treng-5.jpg?fit=1001%2C683&ssl=1",
        },
        {
          name: "Sihanouk ville",
          image:
            "https://mediaim.expedia.com/destination/1/492c45494b515ffc04169afcad554808.jpg",
        },
        {
          name: "Siem Reap",
          image: "https://cms.siemreaper.click/uploads/angkor_wat2712_4e0d04bf8f.jpeg",
        },
        {
          name: "Rattanakiri",
          image:
            "https://khmerplaces.com/storage/provinces/September2020/QDgd8Maca0dOirc0xI4v.jpg",
        },
        {
          name: "Pursat",
          image: "https://visitlocaltravel.com/blog/wp-content/uploads/2024/03/Pursat-Province.png",
        },
        {
          name: "Prey Veng",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkgdLEtXKbWJfrmIc-2vfaSfDEh5pOFu-RZg&s",
        },
        {
          name: "Pailin",
          image: "https://www.shutterstock.com/image-photo/pailin-city-province-cambodia-july-260nw-2332159129.jpg",
        },
        {

          name: "Oddar Meanchey",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/03/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg",
        },
        {
          name: "Mondulkiri",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Mondulkiri3.jpg?fit=1024%2C751&ssl=1",
        },
        {
          name: "Kratie",
          image: "https://visitlocaltravel.com/blog/wp-content/uploads/2024/02/Kratie-Province.png",
        },
        {
          name: "Kampong Chhnang",
          image:
            "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/img_6722.jpg",
        },
        {
          name: "Kampong Cham",
          image:
            "https://khmerplaces.com/storage/provinces/August2020/SKG2ZykZUT7xz4q6t9kF.jpg",
        },
        {
          name: "Battambang",
          image:
            "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/a_statue_of_lok_ta_dambang_kronhung_at_his_namesake_roundabout_on_national_road_5_in_battambang_town._yousos_apdoulrashim.jpg",
        },
        {
          name: "Phnom Penh",
          image:
            "https://www.angkor7thtravel.com/images/destination/1673244202_0!!-!!Independence%20Monument.jpg",
        },
        {
          name: "Tbong Khmum",
          image:
            "https://pcontrol.tourismcambodia.com/cdn/tourismcambodia.com/img/travelguides/thumbnails/360_tbong-khmom.jpg",
        },
        {
          name: "Koh Kong",
          image: "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Koh-Kong3.jpg?fit=1024%2C722&ssl=1",
        },
        {
          name: "Kep",
          image: "https://www.asiakingtravel.com/cuploads/files/Kep-2(1).jpg",
        },
        {
          name: "Kandal",
          image: "https://soprita.com/wp-content/uploads/2025/03/LleWYPYfulce13Kazygv.jpg",
        },
        {
          name: "Kampot",
          image: "https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/07.jpg",
        },
        {
          name: "Kampong Speu",
          image:
            "https://www.asiakingtravel.com/cuploads/files/Kampong-Speu-1(2).jpg",
        },
      ],
       methods: {
                viewProvince(name) {
                  if (name === 'Battambang') {
                    this.$router.push('/guide/battambang')
                  } else {
                    alert(`Exploring ${name} details! (Not available yet)`);
                  }
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
