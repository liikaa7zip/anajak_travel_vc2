<template>
  <div class="container mx-auto px-6 py-12 max-w-7xl">
    <!-- Breadcrumb & Subtitle -->
    <nav
      aria-label="Breadcrumb"
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 px-2 select-none"
    >
      <ol class="flex space-x-2 text-xs text-gray-400 tracking-wide">
        <li
          class="hover:text-purple-600 cursor-pointer"
          @click="$router.push('/')"
        >
          Home
        </li>
        <li>&gt;</li>
        <li
          class="hover:text-purple-600 cursor-pointer"
          @click="$router.push('/tours')"
        >
          Tours
        </li>
        <li>&gt;</li>
        <li class="text-gray-900 font-semibold cursor-default">
          {{ currentLocationName || "Select a Location" }}
        </li>
      </ol>
      <div
        class="text-xs text-purple-600 font-semibold uppercase tracking-wider mt-2 sm:mt-0 select-none"
      >
        The 10 Best {{ currentLocationName || "All" }} Tours & Excursions
      </div>
    </nav>

    <!-- Main Title -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">
  <h1
    class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-md"
  >
    Forget Busy Work, <span class="text-purple-600"> <br>Start Your Next Vacation</span>
  </h1>

  <button
    class="flex items-center gap-2 bg-purple-700 text-white text-sm font-semibold px-5 py-3 rounded-full shadow hover:bg-purple-800 transition duration-300"
    @click="$router.push('/Hotel_history')"
  >
    <i class="fas fa-calendar-check text-white"></i>
    My Bookings
  </button>
</div>


    <div class="flex flex-col lg:flex-row gap-16">
      <!-- Sidebar: Original Most Picked Hotels -->
      <aside class="lg:w-1/3 space-y-12 sticky top-24">
        <!-- Location Selector -->
        <div>
          <label
            for="locationSelect"
            class="block mb-4 text-lg font-semibold text-gray-700 select-none"
          >
            Choose Your Destination
          </label>
          <select
            id="locationSelect"
            v-model="selectedLocationId"
            @change="onSearch"
            class="w-full bg-white border border-gray-300 text-gray-700 text-base rounded-full shadow-lg focus:ring-4 focus:ring-purple-400 focus:border-purple-600 px-6 py-4 transition duration-300 ease-in-out hover:border-purple-500 cursor-pointer"
            aria-label="Select Destination"
          >
            <option value="" disabled>🔍 Select Location</option>
            <option
              v-for="location in locations"
              :key="location.id"
              :value="location.id"
            >
              {{ location.name }}
            </option>
          </select>
        </div>

        <!-- Most Picked Hotels -->
        <section
          aria-label="Most Picked Hotels"
          class="bg-purple-50 border border-purple-300 rounded-3xl p-12 shadow-lg"
        >
          <h2
            class="text-3xl font-extrabold text-purple-700 mb-8 border-b-4 border-purple-600 inline-block pb-2 select-none tracking-wide"
          >
            Most Picked
          </h2>
          <p
            class="text-purple-800 mb-10 leading-relaxed text-sm font-medium select-none"
          >
            Discover the top favorites chosen by our travelers.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div
              v-for="picked in mostPicked"
              :key="picked.id"
              class="relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer group bg-white transition duration-400"
              @click="$router.push(`/hotels/${picked.id}`)"
              role="button"
              tabindex="0"
              @keyup.enter="$router.push(`/hotels/${picked.id}`)"
            >
              <div
                class="relative w-full h-48 overflow-hidden rounded-t-3xl will-change-transform"
              >
                <img
                  v-lazy="
                    picked.imageUrl ||
                    'https://via.placeholder.com/400x300?text=No+Image'
                  "
                  :alt="picked.name"
                  class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                  @error="onImageError"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-700"
                ></div>
              </div>
              <div
                class="absolute top-5 right-5 bg-purple-700 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-lg select-none"
              >
                ${{ picked.pricePerNight }} / night
              </div>
              <div
                class="absolute bottom-0 left-0 text-white w-full px-6 py-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
              >
                <h3 class="text-base font-semibold truncate">
                  {{ picked.name }}
                </h3>
                <p class="text-xs opacity-90 truncate">
                  {{ picked.locationName }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </aside>

      <!-- Right: 4 hotel cards in 2 columns matching Most Picked card style/size -->
      <main class="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="hotel in paginatedHotels.slice(0, 4)"
          :key="'top-' + hotel.id"
          class="bg-white shadow-xl rounded-3xl overflow-hidden transform transition duration-500 hover:shadow-3xl hover:-translate-y-3 cursor-pointer flex flex-col"
          @click="$router.push(`/hotels/${hotel.id}`)"
          role="button"
          tabindex="0"
          @keyup.enter="$router.push(`/hotels/${hotel.id}`)"
        >
          <div class="relative w-full h-48 overflow-hidden rounded-t-3xl">
            <img
              v-lazy="
                hotel.imageUrl ||
                'https://via.placeholder.com/400x300?text=No+Image'
              "
              :alt="hotel.name || 'Hotel Image'"
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              loading="lazy"
              @error="onImageError"
            />
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <h2
              class="text-xl font-semibold text-gray-900 mb-2 truncate"
              :title="hotel.name"
            >
              {{ hotel.name || "Unnamed Hotel" }}
            </h2>
            <p class="text-gray-600 text-sm mb-4 flex items-center space-x-2">
              <i class="fas fa-map-marker-alt text-purple-600"></i>
              <span>{{ hotel.locationName || "Unknown Location" }}</span>
            </p>
            <p
              class="text-green-700 font-extrabold text-lg select-none tracking-wide mb-6"
            >
              ${{
                isValidPrice(hotel.pricePerNight)
                  ? hotel.pricePerNight.toFixed(2)
                  : "Price unavailable"
              }}
              / night
            </p>
            <router-link
              :to="`/hotels/${hotel.id}`"
              class="inline-block bg-purple-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-800 shadow-lg transition duration-400 select-none text-center mt-auto"
              @click.stop
            >
              View Details
            </router-link>
          </div>
        </div>
      </main>
    </div>

    <!-- Below: other hotels in 3 columns -->
    <div class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
      <div
        v-for="hotel in paginatedHotels.slice(4)"
        :key="'rest-' + hotel.id"
        class="bg-white shadow-xl rounded-3xl overflow-hidden transform transition duration-500 hover:shadow-3xl hover:-translate-y-3 cursor-pointer flex flex-col"
         @click="viewHotelDetails(hotel.id)"
        role="button"
        tabindex="0"
        @keyup.enter="$router.push(`/hotels/${hotel.id}`)"
      >
        <div class="relative w-full h-64 overflow-hidden rounded-t-3xl">
          <img
            v-lazy="
              hotel.imageUrl ||
              'https://via.placeholder.com/400x300?text=No+Image'
            "
            :alt="hotel.name || 'Hotel Image'"
            class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            loading="lazy"
            @error="onImageError"
          />
        </div>
        <div class="p-8 flex flex-col flex-grow">
          <h2
            class="text-3xl font-semibold text-gray-900 mb-4 truncate"
            :title="hotel.name"
          >
            {{ hotel.name || "Unnamed Hotel" }}
          </h2>
          <p class="text-gray-600 text-sm mb-4 flex items-center space-x-3">
            <i class="fas fa-map-marker-alt text-purple-600"></i>
            <span>{{ hotel.locationName || "Unknown Location" }}</span>
          </p>
          <p
            class="text-gray-500 text-base line-clamp-4 mb-8 leading-relaxed flex-grow"
            :title="hotel.description"
          >
            {{ hotel.description || "No description available" }}
          </p>
          <p
            class="text-green-700 font-extrabold text-2xl mb-8 select-none tracking-wide"
          >
            ${{
              isValidPrice(hotel.pricePerNight)
                ? hotel.pricePerNight.toFixed(2)
                : "Price unavailable"
            }}
            / night
          </p>
          <router-link
            :to="`/hotels/${hotel.id}`"
            class="inline-block bg-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-800 shadow-lg transition duration-400 select-none text-center"
            @click.stop
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HotelList",
  directives: {
    lazy: {
      mounted(el, binding) {
        function loadImage() {
          el.src = binding.value;
          el.removeAttribute("data-src");
        }
        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                loadImage();
                observer.unobserve(el);
              }
            });
          });
          observer.observe(el);
        } else {
          loadImage();
        }
      },
    },
  },
  data() {
    return {
      hotels: [],
      mostPicked: [],
      locations: [],
      selectedLocationId: "",
      loading: false,
      error: null,
      currentPage: 1,
      hotelsPerPage: 8,
    };
  },
  computed: {
    paginatedHotels() {
      const start = (this.currentPage - 1) * this.hotelsPerPage;
      return this.hotels.slice(start, start + this.hotelsPerPage);
    },
    totalPages() {
      return Math.ceil(this.hotels.length / this.hotelsPerPage);
    },
    currentLocationName() {
      const loc = this.locations.find((l) => l.id === this.selectedLocationId);
      return loc ? loc.name : "";
    },
  },
  methods: {

    viewHotelDetails(hotelId) {
  this.fetchRooms(hotelId);
  this.$router.push(`/hotels/${hotelId}`);
},

    async fetchHotels() {
  this.loading = true;
  this.error = null;

  try {
    // Build query params
    const params = {};
    if (this.selectedLocationId) {
      params.locationId = this.selectedLocationId;
    }

    // Fetch hotels from backend
    const res = await axios.get("http://localhost:5000/api/hotels", { params });
    this.hotels = res.data;

    // Determine Most Picked hotels
    this.mostPicked = this.hotels
      .filter((hotel) => hotel.popularity !== undefined)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);

    // Fallback if no popularity data
    if (this.mostPicked.length === 0) {
      this.mostPicked = this.hotels.slice(0, 4);
    }

    // Reset pagination
    this.currentPage = 1;
  } catch (err) {
    // Handle errors
    this.error = "Failed to load hotels. Please try again later.";
    console.error("Error fetching hotels:", err);
  } finally {
    // Stop loading indicator
    this.loading = false;
  }
},

async fetchRooms(hotelId) {
  try {
    console.log("Fetching rooms for hotel:", hotelId);
    const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms`);
    this.rooms = res.data;
    console.log("Rooms fetched:", this.rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    this.error = "Failed to load rooms for this hotel.";
  }
},


    async fetchLocations() {
      try {
        const res = await axios.get("http://localhost:5000/api/locations");
        this.locations = res.data;
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    },
    onSearch() {
      this.fetchHotels();
    },
    isValidPrice(price) {
      return typeof price === "number" && !isNaN(price);
    },
    onImageError(event) {
      event.target.src = "https://via.placeholder.com/400x300?text=No+Image";
    },
  },
  created() {
    this.fetchLocations();
    this.fetchHotels();
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

* {
  transition: all 0.3s ease;
}

.select-none {
  user-select: none;
}
</style>
