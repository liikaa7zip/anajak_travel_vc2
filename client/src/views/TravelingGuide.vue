<template>
  <div class="w-full font-poppins bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 overflow-hidden rounded-b-md">
      <img src="https://asiapioneertravel.com/wp-content/uploads/2024/04/cambodia-family-holiday.jpg" alt="Cambodia"
        class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-40 justify-center flex items-center px-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold text-center">
          {{ $t('heroTitle') }} <br />
          <span class="text-xl">{{ $t('heroSubtitle') }}</span>
        </h1>
      </div>
    </section>

    <section class="bg-white mx-6 mb-6 p-6 rounded-xl shadow-md sm:mx-1 sm:p-4">
      <h2 class="text-3xl font-bold mb-6 text-purple-800">{{ $t('travelGuideTitle') }}</h2>
      <div class="flex flex-wrap gap-8 sm:gap-4 justify-between">
        <div class="min-w-[140px] flex flex-col gap-1 text-sm">
          <span>{{ $t('BanteayMeanchey') }}</span>
          <span>{{ $t('KampongThom') }}</span>
          <span>{{ $t('StungTreng') }}</span>
          <span>{{ $t('Rattanakiri') }}</span>
          <span>{{ $t('OddarMeanchey') }}</span>
        </div>
        <div class="min-w-[140px] flex flex-col gap-1 text-sm">
          <span>{{ $t('PreahVihear') }}</span>
          <span>{{ $t('Takeo') }}</span>
          <span>{{ $t('SihanoukVille') }}</span>
          <span>{{ $t('Pursat') }}</span>
          <span>{{ $t('Mondulkiri') }}</span>
        </div>
        <div class="min-w-[140px] flex flex-col gap-1 text-sm">
          <span>{{ $t('SvayRieng') }}</span>
          <span>{{ $t('SiemReap') }}</span>
          <span>{{ $t('PreyVeng') }}</span>
          <span>{{ $t('Kratie') }}</span>
          <span>{{ $t('KampongChhnang') }}</span>
        </div>
        <div class="min-w-[140px] flex flex-col gap-1 text-sm">
          <span>{{ $t('KampongCham') }}</span>
          <span>{{ $t('Battambang') }}</span>
          <span>{{ $t('PhnomPenh') }}</span>
          <span>{{ $t('TbongKhmum') }}</span>
          <span>{{ $t('KohKong') }}</span>
        </div>
        <div class="min-w-[140px] flex flex-col gap-1 text-sm">
          <span>{{ $t('Kep') }}</span>
          <span>{{ $t('Kandal') }}</span>
          <span>{{ $t('Kampot') }}</span>
          <span>{{ $t('KampongSpeu') }}</span>
          <span>{{ $t('Pailin') }}</span>
        </div>
      </div>
    </section>

    <!-- Destinations List -->
    <section class="px-6 md:px-12 lg:px-18 py-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="province in provinces" :key="province.name" :to="{ name: province.routeName }"
          class="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
          <div class="relative">
            <router-link :to="`/guide/${toKebab(province.routeName)}`">
              <img :src="province.image" :alt="province.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
            </router-link>

            <router-link :to="`/guide/${toKebab(province.routeName)}/favorite`"
              class="absolute top-2 right-2 px-3 py-2 rounded-full" aria-label="Favorite">
              <button @click.stop="toggleFavorite(province)"
                class="absolute top-2 right-2 px-3 py-2 rounded-full transition text-sm shadow-lg"
                aria-label="Favorite">
                <svg v-if="province.favorite" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                  viewBox="0 0 24 24">
                  <!-- Filled heart -->
                  <path fill="pink" fill-rule="evenodd"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <!-- Outlined heart -->
                  <path fill="pink" fill-rule="evenodd"
                    d="m12.012 5.572l-1.087-1.087a5.5 5.5 0 1 0-7.778 7.778l8.839 8.839l.002-.002l.026.026l8.839-8.839a5.5 5.5 0 1 0-7.778-7.778zm-.024 12.7l4.936-4.937l1.45-1.4h.002l1.063-1.062a3.5 3.5 0 1 0-4.95-4.95L12.013 8.4l-.007-.007h-.001L9.511 5.9a3.5 3.5 0 1 0-4.95 4.95l2.54 2.54l.001-.003z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </router-link>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ province.name }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ province.description }}</p>
            <div class="flex items-center gap-3">
              <router-link :to="`/guide/${toKebab(province.routeName)}`">
                <button class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm">
                  <i class="fa-solid fa-house-chimney"></i>
                </button>
              </router-link>
              <router-link :to="`/guide/${toKebab(province.routeName)}/ProvinceList`"
                class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm">
                <i class="fa-solid fa-utensils"></i>
              </router-link>
              <!-- Booking Toggle Button -->
              <button @click.stop.prevent="toggleBookingOptions(province)"
                class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm">
                <i class="fa-solid fa-ticket"></i>
              </button>

              <!-- Booking Options Dropdown -->
              <div v-if="province.showBookingOptions"
                class="absolute top-12  flex flex-col items-center gap-2 bg-white shadow-md rounded p-2 w-40 z-10">
                <router-link :to="`/guide/${toKebab(province.routeName)}/BusTickets`"
                  class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm w-full text-left">
                  <i class="fa-solid fa-bus"></i> Bus
                </router-link>
                <router-link :to="`/guide/${toKebab(province.routeName)}/CarRental`"
                  class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm w-full text-left">
                  <i class="fa-solid fa-car"></i> Car
                </router-link>
                <router-link :to="`/guide/${toKebab(province.routeName)}/FlightReservation`"
                  class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm w-full text-left">
                  <i class="fa-solid fa-plane"></i> Flight
                </router-link>
              </div>

              <router-link :to="`/guide/${toKebab(province.routeName)}/weather`"
                class="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm">
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
    toggleBookingOptions(province) {
      // Toggle the showBookingOptions flag for the selected province
      province.showBookingOptions = !province.showBookingOptions;
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
