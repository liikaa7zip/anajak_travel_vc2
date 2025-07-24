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
            <div class="w-16 h-16 bg-maroon-600 rounded-full flex items-center justify-center mb-2">
              <span class="text-white text-2xl">🚌</span>
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
            <div class="w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center mb-2">
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
                          >{{ star <= review.stars ? '★' : '☆' }}</span>
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

    <!-- Footer -->
    <footer class="py-16 lg:py-24 bg-white w-full px-4 sm:px-8 lg:px-16">
      <div class="w-full max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div class="lg:col-span-1">
            <div class="flex items-center space-x-2 mb-6">
              <img
                src="@/assets/img/path-to-anajak-logo.png"
                alt="Anajak Travel"
                class="h-10 w-10 mr-2 rounded-full"
              />
              
              <span
                class="text-xl lg:text-2xl font-bold text-gray-800"
              >Angkor Travel</span>
            </div>
            <p
              class="text-gray-600 mb-8 leading-relaxed"
            >Travel with us for an amazing experience! Discover the beauty of Cambodia and beyond.</p>
            <div class="flex space-x-4">
              <a href="#" class="hover:opacity-80 transition-opacity">
                <img
                  src="https://placehold.co/120x40/000000/FFFFFF/png?text=App+Store"
                  alt="Download on App Store"
                  class="h-12"
                />
              </a>
              <a href="#" class="hover:opacity-80 transition-opacity">
                <img
                  src="https://placehold.co/120x40/000000/FFFFFF/png?text=Google+Play"
                  alt="Get it on Google Play"
                  class="h-12"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-gray-800 mb-6 text-lg">Quick Links</h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">About</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-600 hover:text-purple-600 transition-colors"
                >Privacy Policy</a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-600 hover:text-purple-600 transition-colors"
                >Terms of Service</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-gray-800 mb-6 text-lg">About</h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Team</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Press</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-gray-800 mb-6 text-lg">Cambodia Info</h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Tours</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Packages</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">Support</a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-600 hover:text-purple-600 transition-colors"
                >Travel Guide</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p class="text-gray-600 mb-4 md:mb-0">© 2024 Angkor Travel. All rights reserved.</p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
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