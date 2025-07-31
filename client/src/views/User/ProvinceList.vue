<template>
  <div class="container mx-auto px-4 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <h1 class="text-4xl font-extrabold mb-8 text-gray-900 text-center sm:text-left">
    Food in Siem Reap Province
  </h1>

  <div class="flex gap-6">
    <!-- Left side: temple image with bigger width -->
    <div class="flex-1 rounded-2xl shadow-lg overflow-hidden">
      <img
        src="https://www.beautifulworld.com/wp-content/uploads/2024/11/angkor-wat-cambodia.png.webp"
        alt="Siem Reap Temple"
        class="w-full h-full object-cover rounded-2xl"
        style="min-height: 520px;"
      />
    </div>

    <!-- Right side: two stacked images matching height -->
    <div class="flex flex-col gap-6 w-1/3">
      <img
        src="https://newasiatours.com/uploads/Travel%20Guide/Luot6/Nom%20Banh%20Chok%20Taste%20the%20Heritage/2-nom-banh-chok-is-a-traditional-dish-that-uses-fresh-local-ingredients.jpg"
        alt="Nom Banh Chok"
        class="rounded-2xl w-full object-cover flex-1 shadow-md"
        style="min-height: 250px;"
      />
      <img
        src="https://www.bestdressedchicken.com/wp-content/uploads/2018/04/herb-roasted-chicken.jpg"
        alt="Roast Chicken"
        class="rounded-2xl w-full object-cover flex-1 shadow-md"
        style="min-height: 250px;"
      />
    </div>
  </div>
</div>





    <!-- Other Provinces -->
    <div>
      <h2 class="text-3xl font-semibold mb-6">Popular food in other provinces</h2>
      <p class="text-gray-500 mb-6">
        We consider all the chains of change given to you the components you need to change to create a truly happiness.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="province in provinces"
          :key="province.id"
          class="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer"
          @click="goToProvince(province)"
        >
          <img
            :src="province.image"
            :alt="province.name"
            class="h-40 w-full object-cover rounded-lg mb-3"
          />
          <h3 class="text-xl font-semibold">{{ province.name }}</h3>
          <p class="text-gray-600 text-sm">{{ province.country }}</p>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <button
          class="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          View More →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProvinceList',
  data() {
    return {
      provinces: []
    };
  },
  created() {
    axios
      .get('http://localhost:5000/api/locations')
      .then(res => {
        this.provinces = res.data;
      })
      .catch(err => {
        console.error('Failed to fetch provinces:', err);
      });
  },
  methods: {
  goToProvince(province) {
    this.$router.push({
      name: 'FoodsByProvince',    // use exact route name
      params: { locationId: province.id },  // param name = locationId
      query: { name: province.name }         // query string for locationName
    });
  }
}
};
</script>

<style scoped>
/* Add more styling if needed */
</style>
