<template>
  <nav class="bg-white shadow-md border-b border-gray-200 w-full z-50 relative">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <!-- Logo -->
      <router-link to="/" class="flex items-center text-xl font-bold text-gray-900">
        <div
          class="h-10 w-10 mr-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
          <img src="@/assets/img/path-to-anajak-logo.png" alt="Anajak Travel"
            class="h-10 w-10 rounded-full object-cover" />
        </div>
        {{ $t('logo') }}
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-6 text-sm items-center relative">
        <router-link to="/" class="nav-link">{{ $t('home') }}</router-link>
        <router-link to="/about" class="nav-link"> {{ $t('about') }}</router-link>
        <router-link to="/guide" class="nav-link">{{ $t('guide') }}</router-link>

        <!-- Travel Bookings Dropdown -->
        <div class="relative" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <button class="nav-link flex items-center gap-1">
            <span>{{ $t('travelBookings') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition name="fade">
      <div
        v-if="showDropdown"
        class="absolute left-0 mt-3 w-max min-w-[600px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-6 grid grid-cols-3 gap-6 animate-fade-in"
      >
        <div>
          <h3 class="text-blue-600 font-semibold text-sm mb-3">
            {{ $t('transportations') }}
          </h3>
          <router-link
            to="/FlightReservation"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >✈️ {{ $t('flight') }}</router-link>
          <router-link
            to="/CarRental"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >🚗 {{ $t('car') }}</router-link>
          <router-link
            to="/Bustickets"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >🚌 {{ $t('bus') }}</router-link>
          <router-link
            to="/Boatickets"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >⛴️ {{ $t('boat') }}</router-link>
        </div>
        <div>
          <h3 class="text-blue-600 font-semibold text-sm mb-3">
            {{ $t('hotelsDining') }}
          </h3>
          <router-link
            to="/hotel"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >🏨 {{ $t('hotel') }}</router-link>
          <router-link
            to="/province"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >🍽️ {{ $t('restaurant') }}</router-link>
        </div>
        <div>
          <h3 class="text-blue-600 font-semibold text-sm mb-3">
            {{ $t('moreServices') }}
          </h3>
          <router-link
            to="/user-plan"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >🗺️ {{ $t('plan') }}</router-link>
          <router-link
            to="/TravelItinerary"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >📅 {{ $t('itinerary') }}</router-link>
          <router-link
            to="/favorites"
            class="dropdown-item"
            @click="handleClick"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': !isLoggedIn }"
          >❤️ {{ $t('favorite') }}</router-link>
        </div>
      </div>
    </transition>
        </div>

        <router-link to="/blog" class="nav-link">{{ $t('blog') }}</router-link>

        <select v-model="locale" @change="changeLanguage"
          class="border text-sm px-2 py-1 rounded-md focus:outline-none">
          <option value="en">{{ $t('english') }}</option>
          <option value="km">{{ $t('khmer') }}</option>
        </select>

      </div>

      <!-- Auth Buttons / Profile -->
      <div class="flex items-center space-x-4">
        <!-- Loading Debug -->
        <div v-if="showDebug" class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Init: {{ isInitialized ? "✓" : "✗" }} | Auth:
          {{ isLoggedIn ? "✓" : "✗" }} | Admin: {{ isAdmin ? "✓" : "✗" }}
        </div>

        <div v-if="!isInitialized" class="flex items-center space-x-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
          <span class="text-sm text-gray-500">Loading...</span>
        </div>

        <template v-if="isInitialized">
          <!-- Not Logged In -->
          <div v-if="!isLoggedIn" class="flex items-center space-x-4">
            <router-link to="/login" class="text-gray-700 hover:text-blue-600 transition">
              {{ $t('login') }}
            </router-link>
            <router-link to="/register"
              class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition font-medium">
              {{ $t('signup') }}
            </router-link>
          </div>

          <!-- Logged In -->
          <div v-else class="relative" @mouseenter="showProfileDropdown = true"
            @mouseleave="showProfileDropdown = false">
            <button class="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-all group">
              <!-- Avatar -->
              <div class="w-10 h-10 bg-purple-600 rounded-full overflow-hidden flex items-center justify-center">
                <img v-if="userProfile.avatar" :src="userProfile.avatar" alt="avatar"
                  class="w-full h-full object-cover" />
                <span v-else class="text-white font-semibold text-sm">
                  {{ userInitials }}
                </span>
              </div>

              <!-- Name & Role -->
              <div class="text-left hidden md:block">
                <div class="font-medium text-gray-800 leading-tight">
                  {{ displayName }}
                </div>
                <div class="text-xs text-purple-600 font-semibold">
                  <span v-if="isAdmin">Admin</span>
                  <span v-else-if="isHotelowner">Hotel Owner</span>
                  <span v-else-if="isReturantowner">Restaurant Owner</span>
                  <span v-else-if="isTransportowner">Transport Owner</span>
                </div>
              </div>

              <!-- Chevron -->
              <svg class="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Profile Dropdown -->
            <transition name="fade">
              <div v-if="showProfileDropdown"
                class="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 z-50 overflow-hidden">
                <!-- Profile Header -->
                <div class="px-5 py-4 bg-gray-50 border-b border-gray-200">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
                      <img v-if="userProfile.avatar" :src="userProfile.avatar" alt="Avatar"
                        class="w-full h-full object-cover" />
                      <span v-else class="text-white text-sm font-semibold">
                        {{ userInitials }}
                      </span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-800">
                        {{ displayName }}
                      </p>
                      <p class="text-xs text-gray-500 truncate">
                        {{ userProfile.email }}
                      </p>
                      <span
                        class="inline-block text-[10px] mt-1 font-medium rounded-full px-2 py-0.5 bg-purple-100 text-purple-700"
                        v-if="isAdmin">Admin</span>
                      <span
                        class="inline-block text-[10px] mt-1 font-medium rounded-full px-2 py-0.5 bg-green-100 text-green-700"
                        v-if="isHotelowner">Hotel Owner</span>
                      <span
                        class="inline-block text-[10px] mt-1 font-medium rounded-full px-2 py-0.5 bg-yellow-100 text-yellow-700"
                        v-if="isReturantowner">Restaurant Owner</span>
                      >
                      <span
                        class="inline-block text-[10px] mt-1 font-medium rounded-full px-2 py-0.5 bg-yellow-100 text-yellow-700"
                        v-if="isTransportowner"
                        >Transport Owner</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Links -->
                <div class="py-1">
                  <router-link to="/profile" class="dropdown-item">
                    <i class="ri-user-line mr-2 text-gray-500"></i> {{ $t('profile') }}
                  </router-link>

                  <router-link to="/settings" class="dropdown-item">
                    <i class="ri-settings-3-line mr-2 text-gray-500"></i>
                    {{ $t('settings') }}
                  </router-link>

                  <router-link v-if="isAdmin" to="/admin/dashboard" class="dropdown-item">
                    <i class="ri-dashboard-line mr-2 text-gray-500"></i> {{ $t('adminDashboard') }}
                  </router-link>

                  <router-link v-if="isHotelowner" to="/hotel_owner/hoteldashboard" class="dropdown-item">
                    <i class="ri-hotel-bed-line mr-2 text-gray-500"></i> {{ $t('hotelDashboard') }}
                  </router-link>

                  <router-link v-if="isReturantowner" to="/restaurant_owner/fooddashboard" class="dropdown-item">
                    <i class="ri-restaurant-line mr-2 text-gray-500"></i>
                    {{ $t('restaurantDashboard') }}
                  </router-link>
                  <router-link
                    v-if="isTransportowner"
                    to="/transport_owner/transportdashboard"
                    class="dropdown-item"
                  >
                    <i class="ri-bus-2-line mr-2 text-gray-500"></i>

                    transport_owner Dashboard
                  </router-link>
                </div>

                <!-- Logout -->
                <div class="border-t border-gray-100">
                  <button @click="logout"
                    class="w-full text-left dropdown-item text-red-600 hover:bg-red-50 hover:text-red-700">
                    <i class="ri-logout-box-r-line mr-2 text-red-400"></i>
                    {{ $t('logout') }}
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../stores/useAuth";
import { useI18n } from 'vue-i18n'

const {
  isLoggedIn,
  userProfile,
  userInitials,
  displayName,
  isAdmin,
  isInitialized,
  logout,
  initAuth,
  isHotelowner,
  isReturantowner,
  isTransportowner
} = useAuth();

const showDropdown = ref(false);
const showProfileDropdown = ref(false);
const showDebug = ref(false);

// i18n
const { locale } = useI18n()
const changeLanguage = () => {
  localStorage.setItem('locale', locale.value)
}

function handleClick(event) {
  if (!isLoggedIn.value) {
    event.preventDefault()
    alert('Please log in to access this feature.')
    // router.push('/login') // optional redirect
  }
}

onMounted(async () => {
  await initAuth();
});
</script>

<style scoped>
.nav-link {
  @apply relative text-gray-700 font-medium px-3 py-2 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100;
}

.dropdown-item {
  @apply block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-all duration-150;
}

.profile-dropdown-item {
  @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>