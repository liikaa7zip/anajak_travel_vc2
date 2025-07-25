<template>
  <div class="min-h-screen bg-gray-50 w-full">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center bg-gray-50 px-4 sm:px-8 lg:px-16 mx-auto">
      <div class="w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center max-w-none">
          <div class="space-y-8">
            <div
                class="bg-white-600 text-pink-500 shadow-lg px-8 py-4 rounded-full text-lg font-medium"
                style="width: fit-content;"
              >Explore the world!</div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              From 
              <br />
              Cambodia
              <br />
              <span class="text-pink-500">to the World.</span>
            </h1>
            <p
              class="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-2xl"
            >Stay updated with recommendations and discover amazing destinations across Cambodia and beyond.</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="explore"
                class="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition-colors text-lg font-medium"
              >Explore</button>
              <button
                class="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-50 transition-colors text-lg font-medium"
              >Learn More</button>
            </div>
          </div>

          <div class="relative w-full">
            <div class="grid grid-cols-2 gap-4 h-full">
              <div class="space-y-4">
                <img
                  :src="heroImages[0].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover shadow-lg"
                />
                <img
                  :src="heroImages[1].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-32 sm:h-36 lg:h-40 xl:h-44 object-cover shadow-lg"
                />
              </div>
              <div class="space-y-4 mt-8">
                <img
                  :src="heroImages[2].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-32 sm:h-36 lg:h-40 xl:h-44 object-cover shadow-lg"
                />
                <img
                  :src="heroImages[3].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Things to Do Section -->
    <section class="py-16 bg-purple-100 w-full lg:px-16">
      <div class="w-full mb-4">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 max-w-7xl mx-auto">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-800">Popular things to do</h2>
          <a href="#" class="text-purple-600 hover:text-purple-700 font-medium text-lg">See all</a>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
              <span class="text-white text-2xl">🏙️</span>
            </div>
            <h3 class="font-bold text-lg">City Tours</h3>
            <p class="text-sm text-gray-600">100+ Tours</p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <span class="text-white text-2xl">🏛️</span>
            </div>
            <h3 class="font-bold text-lg">Cultural Tours</h3>
            <p class="text-sm text-gray-600">100+ Tours</p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
            <div class="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mb-2">
              <span class="text-white text-2xl">🚢</span>
            </div>
            <h3 class="font-bold text-lg">Day Cruises</h3>
            <p class="text-sm text-gray-600">100+ Tours</p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
            <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-2">
              <span class="text-white text-2xl ">🚌</span>
            </div>
            <h3 class="font-bold text-lg">Bus Tours</h3>
            <p class="text-sm text-gray-600">100+ Tours</p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
            <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-2">
              <span class="text-white text-2xl">🏖️</span>
            </div>
            <h3 class="font-bold text-lg">Beach Tours</h3>
            <p class="text-sm text-gray-600">100+ Tours</p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
            <div class="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-2">
              <span class="text-white text-2xl">🍽️</span>
            </div>
            <h3 class="font-bold text-lg">Food Tours</h3>
            <p class="text-sm text-gray-600">100+ Tours</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Destinations -->
    <section class="py-16 lg:py-24 bg-gray-50 w-full px-4 sm:px-8 lg:px-16">
      <div class="w-full">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 max-w-7xl mx-auto">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">Trending Destinations</h2>
          <a href="#" class="text-purple-600 hover:text-purple-700 font-medium text-lg">See all</a>
        </div>

        <!-- Masonry Grid Layout -->
        <div class="max-w-7xl mx-auto">
          <!-- Desktop Grid (lg and above) -->
          <div class="hidden lg:grid grid-cols-4 grid-rows-2 gap-4 h-96">
            <!-- Cruises - Small card (top-left) -->
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1">
              <img
                :src="destinations[0].src"
                :alt="destinations[0].name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-bold mb-1">{{ destinations[0].name }}</h3>
                <p class="text-sm text-white/90">{{ destinations[0].description }}</p>
              </div>
              <div
                v-if="destinations[0].badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destinations[0].badge }}</div>
            </div>

            <!-- Beach Tours - Large horizontal card (top-center) -->
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-2 row-span-1">
              <img
                :src="destinations[1].src"
                :alt="destinations[1].name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-xl font-bold mb-1">{{ destinations[1].name }}</h3>
                <p class="text-sm text-white/90">{{ destinations[1].description }}</p>
              </div>
              <div
                v-if="destinations[1].badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destinations[1].badge }}</div>
            </div>

            <!-- City Tours - Tall vertical card (right side, spans 2 rows) -->
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-2">
              <img
                :src="destinations[5].src"
                :alt="destinations[5].name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-xl font-bold mb-1">{{ destinations[5].name }}</h3>
                <p class="text-sm text-white/90">{{ destinations[5].description }}</p>
              </div>
              <div
                v-if="destinations[5].badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destinations[5].badge }}</div>
            </div>

            <!-- Museum Tour - Medium card (bottom-left) -->
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1">
              <img
                :src="destinations[2].src"
                :alt="destinations[2].name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-bold mb-1">{{ destinations[2].name }}</h3>
                <p class="text-sm text-white/90">{{ destinations[2].description }}</p>
              </div>
              <div
                v-if="destinations[2].badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destinations[2].badge }}</div>
            </div>

            <!-- Food - Small card (bottom-center-left) -->
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1">
              <img
                :src="destinations[3].src"
                :alt="destinations[3].name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-bold mb-1">{{ destinations[3].name }}</h3>
                <p class="text-sm text-white/90">{{ destinations[3].description }}</p>
              </div>
              <div
                v-if="destinations[3].badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destinations[3].badge }}</div>
            </div>

            <!-- Hiking - Medium card (bottom-center-right) -->
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1">
              <img
                :src="destinations[4].src"
                :alt="destinations[4].name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-bold mb-1">{{ destinations[4].name }}</h3>
                <p class="text-sm text-white/90">{{ destinations[4].description }}</p>
              </div>
              <div
                v-if="destinations[4].badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destinations[4].badge }}</div>
            </div>
          </div>

          <!-- Tablet Grid (md to lg) -->
          <div class="hidden md:grid lg:hidden grid-cols-3 gap-4">
            <div class="grid grid-cols-2 gap-4 col-span-2">
              <!-- Top row -->
              <div class="relative group cursor-pointer overflow-hidden rounded-2xl h-48">
                <img
                  :src="destinations[0].src"
                  :alt="destinations[0].name"
                  class="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-lg font-bold mb-1">{{ destinations[0].name }}</h3>
                  <p class="text-sm text-white/90">{{ destinations[0].description }}</p>
                </div>
                <div
                  v-if="destinations[0].badge"
                  class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >{{ destinations[0].badge }}</div>
              </div>

              <div class="relative group cursor-pointer overflow-hidden rounded-2xl h-48">
                <img
                  :src="destinations[1].src"
                  :alt="destinations[1].name"
                  class="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-lg font-bold mb-1">{{ destinations[1].name }}</h3>
                  <p class="text-sm text-white/90">{{ destinations[1].description }}</p>
                </div>
                <div
                  v-if="destinations[1].badge"
                  class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >{{ destinations[1].badge }}</div>
              </div>

              <!-- Bottom row -->
              <div class="relative group cursor-pointer overflow-hidden rounded-2xl h-48">
                <img
                  :src="destinations[2].src"
                  :alt="destinations[2].name"
                  class="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-lg font-bold mb-1">{{ destinations[2].name }}</h3>
                  <p class="text-sm text-white/90">{{ destinations[2].description }}</p>
                </div>
                <div
                  v-if="destinations[2].badge"
                  class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >{{ destinations[2].badge }}</div>
              </div>

              <div class="relative group cursor-pointer overflow-hidden rounded-2xl h-48">
                <img
                  :src="destinations[3].src"
                  :alt="destinations[3].name"
                  class="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-lg font-bold mb-1">{{ destinations[3].name }}</h3>
                  <p class="text-sm text-white/90">{{ destinations[3].description }}</p>
                </div>
                <div
                  v-if="destinations[3].badge"
                  class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >{{ destinations[3].badge }}</div>
              </div>
            </div>

            <!-- Right column - tall card -->
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl h-full">
              <img
                :src="destinations[5].src"
                :alt="destinations[5].name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-xl font-bold mb-1">{{ destinations[5].name }}</h3>
                <p class="text-sm text-white/90">{{ destinations[5].description }}</p>
              </div>
              <div
                v-if="destinations[5].badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destinations[5].badge }}</div>
            </div>
          </div>

          <!-- Mobile Grid (sm and below) -->
          <div class="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="destination in destinations"
              :key="destination.id"
              class="relative group cursor-pointer overflow-hidden rounded-2xl h-64"
            >
              <img
                :src="destination.src"
                :alt="destination.name"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-bold mb-1">{{ destination.name }}</h3>
                <p class="text-sm text-white/90">{{ destination.description }}</p>
              </div>
              <div
                v-if="destination.badge"
                class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
              >{{ destination.badge }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="py-16 lg:py-24 bg-white w-full px-4 sm:px-8 lg:px-16">
      <div class="w-full max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-8">
            <div>
              <h2 class="text-pink-500 text-2xl lg:text-3xl font-bold mb-2">KEY FEATURES</h2>
              <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">We offer best services</h2>
              <p class="text-gray-600 text-lg leading-relaxed">
                Hay! Anajak Travel there to help you find your dream holiday.
                Easy you just find where you want to go and
                buy the ticket.
              </p>
            </div>

            <div class="space-y-6">
              <div
                v-for="feature in features"
                :key="feature.id"
                class="flex items-start space-x-6 p-6 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="feature.bgColor"
                >
                  <span class="text-white text-xl">{{ feature.icon }}</span>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-3 text-lg">{{ feature.name }}</h3>
                  <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative w-full">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-6">
                <img src="@/assets/img-home-page/angkorwat.jpg" alt="Cambodia destination" class="rounded-2xl w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover shadow-lg">
              </div>
              <div class="space-y-6 mt-8">
                <img src="@/assets/img-home-page/waterfall.png" alt="Cambodia destination" class="rounded-2xl w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover shadow-lg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Reviews -->
    <section class="py-16 lg:py-24 relative overflow-hidden w-full">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img
          src="@/assets/img-home-page/royal.jpg"
          alt="Cambodia temple background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-white w-full px-4 sm:px-8 lg:px-16">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">Customer Reviews</h2>
          <div class="w-16 h-1 bg-white mx-auto"></div>
        </div>

        <!-- Carousel Container -->
        <div class="relative w-full max-w-7xl mx-auto">
          <!-- Navigation Arrows -->
          <button
            @click="previousSlide"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300"
            :disabled="currentSlide === 0"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            @click="nextSlide"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300"
            :disabled="currentSlide >= maxSlides"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <!-- Reviews Carousel -->
          <div class="overflow-hidden px-12">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
            >
              <div
                v-for="review in allReviews"
                :key="review.id"
                class="flex-shrink-0 px-4"
                :class="cardsPerSlideClass"
              >
                <div
                  class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <!-- User Info -->
                  <div class="flex items-center mb-6">
                    <img
                      :src="review.avatar"
                      :alt="review.name"
                      class="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div class="ml-4">
                      <h4 class="font-bold text-gray-800 text-lg">{{ review.name }}</h4>
                      <p class="text-gray-600 text-sm">{{ review.role }}</p>
                      <!-- Star Rating -->
                      <div class="flex items-center mt-1">
                        <div class="flex text-yellow-400">
                          <span
                            v-for="star in 5"
                            :key="star"
                            class="text-lg"
                          >{{ star = review.stars ? '★' : '☆' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Review Text -->
                  <p class="text-gray-700 leading-relaxed italic">"{{ review.comment }}"</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination Dots -->
          <div class="flex justify-center mt-12 space-x-2">
            <button
              v-for="(dot, index) in totalSlides"
              :key="index"
              @click="goToSlide(index)"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'"
            ></button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Import local images
import heroImg1 from "@/assets/img-home-page/heroimg1.jpg";
import angkor from "@/assets/img-home-page/angkor.webp";
import beach from "@/assets/img-home-page/beach.jpg";
import mountain from "@/assets/img-home-page/mountain.jpg";

import cruises from "@/assets/img-home-page/cruises.webp";
import kohrong from "@/assets/img-home-page/kohrong.webp";
import museum from "@/assets/img-home-page/museum.jpg";
import food from "@/assets/img-home-page/food.jpg";
import hiking from "@/assets/img-home-page/hiking.jpg";
import city from "@/assets/img-home-page/city.jpg";

export default {
  data() {
    return {
      heroImages: [
        { id: 1, src: heroImg1 },
        {
          id: 2,
          src: angkor
        },
        {
          id: 3,
          src: mountain
        },
        {
          id: 4,
          src: beach
        }
      ],
      activities: [
        {
          id: 1,
          icon: "🏛️",
          name: "City Tours",
          bgColor: "bg-purple-100",
          iconBg: "bg-purple-500"
        },
        {
          id: 2,
          icon: "🎭",
          name: "Culture Tours",
          bgColor: "bg-blue-100",
          iconBg: "bg-blue-500"
        },
        {
          id: 3,
          icon: "🏖️",
          name: "Beach Tours",
          bgColor: "bg-green-100",
          iconBg: "bg-green-500"
        },
        {
          id: 4,
          icon: "🛣️",
          name: "Road Tours",
          bgColor: "bg-red-100",
          iconBg: "bg-red-500"
        },
        {
          id: 5,
          icon: "🏔️",
          name: "Adventure",
          bgColor: "bg-yellow-100",
          iconBg: "bg-yellow-500"
        },
        {
          id: 6,
          icon: "🍜",
          name: "Food Tours",
          bgColor: "bg-pink-100",
          iconBg: "bg-pink-500"
        }
      ],
      destinations: [
        {
          id: 1,
          src: cruises,
          name: "Cruises",
          description: "Scenic island cruise adventure",
          badge: "Popular"
        },
        {
          id: 2,
          src: kohrong,
          name: "Beach Tours",
          description: "Tropical beach getaway"
        },
        {
          id: 3,
          src: museum,
          name: "Museum Tour",
          description: "Explore Khmer history and culture",
          badge: "Trending"
        },
        {
          id: 4,
          src: food,
          name: "Food",
          description: "Authentic Khmer dishes by the river"
        },
        {
          id: 5,
          src: hiking,
          name: "Hiking",
          description: "Jungle trek and nature walk"
        },
        {
          id: 6,
          src: city,
          name: "City Tours",
          description: "Discover Phnom Penh's urban charm"
        }
      ],
      features: [
        {
          id: 1,
          icon: "✈️",
          name: "Select itinerary",
          description:
            "Choose from our curated travel plans or create your own custom itinerary.",
          bgColor: "bg-purple-500"
        },
        {
          id: 2,
          icon: "📅",
          name: "Schedule your trip",
          description:
            "Plan your perfect timing with our flexible scheduling system.",
          bgColor: "bg-blue-500"
        },
        {
          id: 3,
          icon: "💰",
          name: "Big discount",
          description:
            "Enjoy exclusive deals and discounts on all our travel packages.",
          bgColor: "bg-green-500"
        }
      ],

      currentSlide: 0,
      allReviews: [
        {
          id: 1,
          avatar:
            "https://i.pinimg.com/736x/cb/64/9e/cb649e7906a9afcd911dc59b5c4b28c0.jpg",
          name: "Sebastian",
          role: "Graphic Designer",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          stars: 5
        },
        {
          id: 2,
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
          name: "Evangeline",
          role: "Model",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          stars: 4
        },
        {
          id: 3,
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
          name: "Alexander",
          role: "Software Engineer",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          stars: 3
        },
        {
          id: 4,
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
          name: "Michael",
          role: "Travel Blogger",
          comment:
            "Amazing experience exploring Cambodia with Anajak Travel. The guides were knowledgeable and the destinations were breathtaking.",
          stars: 5
        },
        {
          id: 5,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
          name: "Sarah",
          role: "Photographer",
          comment:
            "Perfect trip planning and execution. Highly recommend for anyone visiting Cambodia! The cultural sites were incredible.",
          stars: 4
        },
        {
          id: 6,
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
          name: "David",
          role: "Adventure Seeker",
          comment:
            "Unforgettable memories created with professional service and great attention to detail. Will definitely book again!",
          stars: 5
        }
      ]
    };
  },
  computed: {
    cardsPerSlide() {
      // Responsive cards per slide
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) return 3; // lg screens
        if (window.innerWidth >= 768) return 2; // md screens
        return 1; // sm screens
      }
      return 3; // default for SSR
    },
    cardsPerSlideClass() {
      return {
        "w-full": this.cardsPerSlide === 1,
        "w-1/2": this.cardsPerSlide === 2,
        "w-1/3": this.cardsPerSlide === 3
      };
    },
    slideWidth() {
      return 100 / this.cardsPerSlide;
    },
    totalSlides() {
      return Math.ceil(this.allReviews.length / this.cardsPerSlide);
    },
    maxSlides() {
      return this.totalSlides - 1;
    }
  },
  methods: {
    explore() {
      alert("Exploring destinations!");
    },
    nextSlide() {
      if (this.currentSlide < this.maxSlides) {
        this.currentSlide++;
      }
    },
    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    handleResize() {
      // Reset slide position on resize to prevent layout issues
      this.currentSlide = 0;
    }
  },
  mounted() {
    // Add resize listener for responsive behavior
    window.addEventListener("resize", this.handleResize);

    // Auto-play carousel (optional)
    this.autoPlayInterval = setInterval(() => {
      if (this.currentSlide >= this.maxSlides) {
        this.currentSlide = 0;
      } else {
        this.nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  },
  beforeUnmount() {
    // Clean up listeners and intervals
    window.removeEventListener("resize", this.handleResize);
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
};
</script>

<style scoped>
/* Custom styles for the Popular Things to Do section */
.bg-purple-100 {
  background-color: #f3e8ff; /* Soft light purple */
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.transition-transform {
  transition: transform 0.3s ease; /* Smooth scaling effect */
}

.hover\:scale-105:hover {
  transform: scale(1.05); /* Slightly enlarge on hover */
}

/* Additional styles can be added here */
</style>