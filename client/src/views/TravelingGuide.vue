<template>
  <div class="font-khmer font-poppins bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-60 sm:h-72 md:h-96 overflow-hidden rounded-b-md">
      <img
        src="https://asiapioneertravel.com/wp-content/uploads/2024/04/cambodia-family-holiday.jpg"
        alt="Cambodia"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 sm:px-6"
      >
        <h1
          class="text-white text-2xl sm:text-3xl md:text-5xl font-bold text-center leading-snug"
        >
          {{ $t("heroTitle") }} <br />
          <span class="text-lg sm:text-2xl md:text-3xl font-medium">{{ $t("heroSubtitle") }}</span>
        </h1>
      </div>
    </section>

    <!-- Travel Guide -->
    <section
      class="bg-white mx-3 sm:mx-4 md:mx-8 lg:mx-12 my-6 p-4 sm:p-6 rounded-xl shadow-md"
    >
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-purple-800 text-center sm:text-left">
        {{ $t("travelGuideTitle") }}
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        <span v-for="item in [
            'BanteayMeanchey','KampongThom','StungTreng','Rattanakiri','OddarMeanchey',
            'PreahVihear','Takeo','SihanoukVille','Pursat','Mondulkiri',
            'SvayRieng','SiemReap','PreyVeng','Kratie','KampongChhnang',
            'KampongCham','Battambang','PhnomPenh','TbongKhmum','KohKong',
            'Kep','Kandal','Kampot','KampongSpeu','Pailin'
          ]"
          :key="item"
          class="text-sm sm:text-base"
        >
          {{ $t(item) }}
        </span>
      </div>
    </section>

    <!-- Weather Section -->
    <section
      class="mx-3 sm:mx-4 md:mx-8 lg:mx-12 mb-6 p-4 sm:p-6 rounded-xl shadow-md bg-white flex flex-col items-center text-center"
    >
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-purple-800">
        {{ $t("CheckWeather") }}
      </h2>
      <router-link to="/WeatherPage">
        <button
          class="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-purple-700 transition text-sm sm:text-base font-semibold flex items-center gap-2"
        >
          <i class="fa-solid fa-cloud-sun"></i>
          {{ $t("GoToWeatherPage") }}
        </button>
      </router-link>
      <!-- Back Button -->
      <div class="mt-4">
        <router-link to="/" class="text-purple-600 hover:underline text-sm sm:text-base">
          <i class="fa-solid fa-arrow-left"></i> {{ $t("BackToHome") }}
        </router-link>
      </div>
    </section>

    <!-- Destinations List -->
    <section class="px-3 sm:px-6 md:px-10 lg:px-16 py-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="province in provinces"
          :key="province.name"
          class="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <!-- Image -->
          <router-link :to="`/guide/${toKebab(province.routeName)}`" class="block relative">
            <img
              :src="province.image"
              :alt="province.name"
              class="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-105 transition duration-300"
            />
          </router-link>

          <!-- Content -->
          <div class="flex flex-col flex-grow p-4">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{{ province.name }}</h3>
            <p class="text-xs sm:text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
              {{ province.description }}
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3">
              <router-link :to="`/guide/${toKebab(province.routeName)}`">
                <button
                  class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-xs sm:text-sm"
                >
                  <i class="fa-solid fa-house-chimney"></i>
                </button>
              </router-link>
              <router-link
                :to="`/guide/${toKebab(province.routeName)}/ProvinceList`"
                class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-xs sm:text-sm"
              >
                <i class="fa-solid fa-hotel"></i>
              </router-link>

              <!-- Booking Options -->
              <div class="relative">
                <button
                  @click.stop.prevent="toggleBookingOptions(province)"
                  class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-xs sm:text-sm"
                >
                  <i class="fa-solid fa-ticket"></i>
                </button>
                <div
                  v-if="province.showBookingOptions"
                  class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg w-52 sm:w-64 p-4 text-sm z-30 border border-gray-200"
                  @mouseleave="closeBookingOptions(province)"
                >
                  <label class="block mb-2 font-semibold text-purple-800">
                    {{ $t("SelectBookingOptions") }}
                  </label>
                  <router-link
                    :to="`/guide/${toKebab(province.routeName)}/BusTickets`"
                    class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 block mb-2 text-left flex items-center gap-2"
                  >
                    <i class="fa-solid fa-bus"></i> Bus
                  </router-link>
                  <router-link
                    :to="`/guide/${toKebab(province.routeName)}/CarRental`"
                    class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 block mb-2 text-left flex items-center gap-2"
                  >
                    <i class="fa-solid fa-car"></i> Car
                  </router-link>
                  <router-link
                    :to="`/guide/${toKebab(province.routeName)}/FlightReservation`"
                    class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 block text-left flex items-center gap-2"
                  >
                    <i class="fa-solid fa-plane"></i> Flight
                  </router-link>
                </div>
              </div>

              <!-- Weather -->
              <router-link
                :to="{ path: '/WeatherPage', query: { province: province.name } }"
                class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-xs sm:text-sm"
              >
                <i class="fa-solid fa-cloud-sun"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "TravelingGuide",
  data() {
    return {
      provinces: [
        {
          name: this.$t("provinces.Battambang.name"),
          routeName: "Battambang",
          image:
            "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/a_statue_of_lok_ta_dambang_kronhung_at_his_namesake_roundabout_on_national_road_5_in_battambang_town._yousos_apdoulrashim.jpg",
          description: this.$t("provinces.Battambang.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.SiemReap.name"),
          routeName: "SiemReap",
          image: "https://cms.siemreaper.click/uploads/angkor_wat2712_4e0d04bf8f.jpeg",
          description: this.$t("provinces.SiemReap.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.PhnomPenh.name"),
          routeName: "PhnomPenh",
          image:
            "https://www.angkor7thtravel.com/images/destination/1673244202_0!!-!!Independence%20Monument.jpg",
          description: this.$t("provinces.PhnomPenh.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Kampot.name"),
          routeName: "Kampot",
          image:
            "https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/07.jpg",
          description: this.$t("provinces.Kampot.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Kep.name"),
          routeName: "Kep",
          image: "https://img.harbor-property.com/bkarticle/2021/10/25/173634624.jpg",
          description: this.$t("provinces.Kep.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Sihanoukville.name"),
          routeName: "Sihanoukville",
          image:
            "https://mediaim.expedia.com/destination/1/492c45494b515ffc04169afcad554808.jpg",
          description: this.$t("provinces.Sihanoukville.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Pailin.name"),
          routeName: "Pailin",
          image:
            "https://www.shutterstock.com/image-photo/pailin-city-province-cambodia-july-260nw-2332159129.jpg",
          description: this.$t("provinces.Pailin.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.KohKong.name"),
          routeName: "KohKong",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Koh-Kong3.jpg?fit=1024%2C722&ssl=1",
          description: this.$t("provinces.KohKong.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Takeo.name"),
          routeName: "Takeo",
          image:
            "https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/21.jpg",
          description: this.$t("provinces.Takeo.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Kandal.name"),
          routeName: "Kandal",
          image:
            "https://soprita.com/wp-content/uploads/2025/03/LleWYPYfulce13Kazygv.jpg",
          description: this.$t("provinces.Kandal.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.KampongCham.name"),
          routeName: "KampongCham",
          image:
            "https://khmerplaces.com/storage/provinces/August2020/SKG2ZykZUT7xz4q6t9kF.jpg",
          description: this.$t("provinces.KampongCham.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.KampongChhnang.name"),
          routeName: "KampongChhnang",
          image:
            "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/img_6722.jpg",
          description: this.$t("provinces.KampongChhnang.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.KampongSpeu.name"),
          routeName: "KampongSpeu",
          image: "https://www.asiakingtravel.com/cuploads/files/Kampong-Speu-1(2).jpg",
          description: this.$t("provinces.KampongSpeu.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.KampongThom.name"),
          routeName: "KampongThom",
          image: "https://www.ppmlgroup.com/wp-content/uploads/2022/02/5b2b2134f3661.jpg",
          description: this.$t("provinces.KampongThom.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Kratie.name"),
          routeName: "Kratie",
          image:
            "https://visitlocaltravel.com/blog/wp-content/uploads/2024/02/Kratie-Province.png",
          description: this.$t("provinces.Kratie.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.PreyVeng.name"),
          routeName: "PreyVeng",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkgdLEtXKbWJfrmIc-2vfaSfDEh5pOFu-RZg&s",
          description: this.$t("provinces.PreyVeng.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.SvayRieng.name"),
          routeName: "SvayRieng",
          image: "https://aicdn.picsart.com/755df232-46fb-452f-b47d-4f640d33b6e0.jpg",
          description: this.$t("provinces.SvayRieng.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Pursat.name"),
          routeName: "Pursat",
          image:
            "https://visitlocaltravel.com/blog/wp-content/uploads/2024/03/Pursat-Province.png",
          description: this.$t("provinces.Pursat.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.OddarMeanchey.name"),
          routeName: "OddarMeanchey",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/03/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg",
          description: this.$t("provinces.OddarMeanchey.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.PreahVihear.name"),
          routeName: "PreahVihear",
          image:
            "https://www.birdguideasso.org/wp-content/uploads/2018/09/Preah-Vihear-Temple-1-e1545105862913.jpg",
          description: this.$t("provinces.PreahVihear.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.StungTreng.name"),
          routeName: "StungTreng",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Stueng-Treng-5.jpg?fit=1001%2C683&ssl=1",
          description: this.$t("provinces.StungTreng.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Rattanakiri.name"),
          routeName: "Rattanakiri",
          image:
            "https://khmerplaces.com/storage/provinces/September2020/QDgd8Maca0dOirc0xI4v.jpg",
          description: this.$t("provinces.Rattanakiri.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.Mondulkiri.name"),
          routeName: "Mondulkiri",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Mondulkiri3.jpg?fit=1024%2C751&ssl=1",
          description: this.$t("provinces.Mondulkiri.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.TbongKhmum.name"),
          routeName: "TbongKhmum",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Tbong-Khmum-3.jpg?fit=600%2C428&ssl=1",
          description: this.$t("provinces.TbongKhmum.description"),
          showBookingOptions: false,
        },
        {
          name: this.$t("provinces.BanteayMeanchey.name"),
          routeName: "BanteayMeanchey",
          image:
            "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Banteay-Meanchey2.jpg?fit=1024%2C683&ssl=1",
          description: this.$t("provinces.BanteayMeanchey.description"),
          showBookingOptions: false,
        },
      ],
    };
  },
  methods: {
    toggleBookingOptions(selectedProvince) {
      // Always show dropdown only for the clicked province, close all others
      this.provinces.forEach(province => {
        province.showBookingOptions = (province === selectedProvince);
      });
    },
    closeBookingOptions(province) {
      province.showBookingOptions = false;
    },
    toggleFavorite(province) {
      province.favorite = !province.favorite;
      let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (province.favorite) {
        // Add to favorites if not already there
        if (!favorites.find((p) => p.routeName === province.routeName)) {
          favorites.push({
            name: province.name,
            routeName: province.routeName,
            image: province.image,
            description: province.description,
          });
        }
      } else {
        // Remove from favorites
        favorites = favorites.filter((p) => p.routeName !== province.routeName);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
    toKebab(str) {
      return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    },
  },
  created() {
    const stored = localStorage.getItem("favorites");
    const favorites = stored ? JSON.parse(stored) : [];
    this.provinces.forEach((p) => {
      p.favorite = !!favorites.find((f) => f.routeName === p.routeName);
    });
  },
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
