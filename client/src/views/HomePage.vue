<template>
  <div class="min-h-screen bg-gray-50 w-full">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center bg-gray-50 px-4 sm:px-8 lg:px-16 mx-auto">
      <div class="w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center max-w-none">
          <div class="space-y-8">
            <div
              class="bg-white-600 text-pink-500 shadow-lg px-6 py-3 rounded-full text-lg font-medium"
              style="width: fit-content;"
            >Explore the world!</div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              From
              <br />Cambodia
              <br />
              <span class="text-pink-500">to the World.</span>
            </h1>
            <p
              class="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-2xl"
            >Stay updated with recommendations and discover amazing destinations across Cambodia and beyond.</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link
                to="/guide"
                class="bg-purple-600 text-white px-5 py-3 rounded-full hover:bg-purple-700 active:bg-purple-800 transition-colors text-base font-medium text-center"
              >Explore</router-link>
              <router-link
                to="/about"
                class="border-2 border-purple-600 text-purple-600 px-5 py-3 rounded-full hover:bg-purple-700 hover:text-white active:bg-purple-800 transition-colors text-base font-medium text-center"
              >Learn More</router-link>
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
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 max-w-7xl mx-auto"
        >
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-800">Popular things to do</h2>
          <!-- <a href="/blog" class="text-purple-600 hover:text-purple-700 font-medium text-lg">See all</a> -->
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          <div
            class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256">
                <path
                  fill="#fff"
                  d="M240 208h-8V88a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v40h-48V40a8 8 0 0 0-8-8H32a8 8 0 0 0-8 8v168h-8a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16M168 96h48v112h-48Zm-16 48v64h-48v-64ZM40 48h48v160H40Zm32 24v16a8 8 0 0 1-16 0V72a8 8 0 0 1 16 0m0 48v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 16 0m0 48v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 16 0m48 16v-16a8 8 0 0 1 16 0v16a8 8 0 0 1-16 0m64 0v-16a8 8 0 0 1 16 0v16a8 8 0 0 1-16 0m0-48v-16a8 8 0 0 1 16 0v16a8 8 0 0 1-16 0"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg">City Tours</h3>
            <p class="text-sm text-gray-600">99+ Tours</p>
          </div>

          <div
            class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 14 14">
                <g
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                >
                  <path
                    d="M.707 13.438h12.75M3.86 5.687l3.222-2.53l3.222 2.53M4.35 7.813h5.464v5.625H4.35zM3.238 5.688h7.688v2.121H3.238zM1.618 7.81v5.628M12.546 7.81v5.625M.707 7.81h12.75M7.082 3.156V.674m0 0h1.25"
                  />
                  <path
                    d="M6.095 11.203a.93.93 0 0 1 .931-.93v0a.93.93 0 0 1 .931.93v2.235H6.095z"
                  />
                </g>
              </svg>
            </div>
            <h3 class="font-bold text-lg">Cultural Tours</h3>
            <p class="text-sm text-gray-600">99+ Tours</p>
          </div>

          <div
            class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div class="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="m3 13.5l8-11.47V13.5zm9.5 0c1.35-3.75 1.17-8.79 0-12.5c4.76 1.54 8.4 7.4 8.46 12.5zm8.6 3.58c-.41.64-.89 1.19-1.45 1.66c-.65-.29-1.23-.74-1.69-1.24c-1.49 1.93-4.5 1.93-5.99 0c-1.47 1.93-4.5 1.93-5.97 0c-.5.5-1.05.95-1.7 1.24c-1.14-.94-2-2.28-2.3-3.74h19.94a6.4 6.4 0 0 1-.84 2.08M20.96 23q-1.59 0-3-.75c-1.84 1-4.15 1-5.99 0c-1.84 1-4.15 1-5.97 0c-1.23.69-2.64.8-4 .75v-2c1.41.05 2.77-.1 4-1c1.74 1.25 4.21 1.25 5.97 0c1.77 1.25 4.23 1.25 5.99 0c1.21.9 2.58 1.05 3.98 1v2z"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg">Day Cruises</h3>
            <p class="text-sm text-gray-600">99+ Tours</p>
          </div>

          <div
            class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M4 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0m12 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
                  <path d="M4 17H2V6a1 1 0 0 1 1-1h14a5 7 0 0 1 5 7v5h-2m-4 0H8" />
                  <path d="m16 5l1.5 7H22M2 10h15M7 5v5m5-5v5" />
                </g>
              </svg>
            </div>
            <h3 class="font-bold text-lg">Bus Tours</h3>
            <p class="text-sm text-gray-600">99+ Tours</p>
          </div>

          <div
            class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 48 48">
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M31.407 10.425c-.796-.568-1.64-.902-2.458-1.022c-1.503-.22-3.122.247-4.52 1.677a2 2 0 1 1-2.86-2.796c2.246-2.297 5.126-3.255 7.96-2.839c1.581.232 3.083.88 4.41 1.878c-.128-1.133-.691-2.097-1.55-2.593a2 2 0 1 1 2-3.464c3.146 1.817 4.02 5.337 3.352 8.44C42.358 10.918 46 15.111 46 20.351a2 2 0 0 1-4 0c0-2.49-1.312-4.628-3.214-5.865c.608 2.852-.07 5.95-2.18 8.225a2 2 0 1 1-2.932-2.72c1.62-1.747 1.756-4.544.403-6.588c-1.083.622-2.166 1.785-3.123 3.555c-1.285 2.376-2.193 5.607-2.448 9.28c3.369.424 6.174 1.405 8.444 2.889c3.142 2.053 5.098 4.962 6.127 8.28a2 2 0 1 1-3.821 1.185c-.789-2.544-2.227-4.635-4.494-6.117C32.47 30.978 29.17 30 24.5 30c-4.667 0-8.138.977-10.634 2.506c-2.476 1.518-4.102 3.644-5.004 6.167a2 2 0 0 1-3.766-1.346c1.193-3.34 3.388-6.214 6.68-8.231c1.676-1.027 3.606-1.814 5.791-2.338c.676-7.92 6.341-14.417 13.84-16.333M17.318 43.003c-2.53 0-4.637-1.692-4.68-1.726c-1.13-.945-2.72-.94-3.845-.151a16.4 16.4 0 0 1-2.096 1.024c-1.168.473-2.504.853-3.697.853a2 2 0 0 0 0 4h42a2 2 0 1 0 0-4c-1.193 0-2.529-.38-3.697-.853a16.4 16.4 0 0 1-2.096-1.024c-1.125-.788-2.715-.795-3.845.15c-.043.035-2.15 1.727-4.68 1.727s-4.638-1.692-4.68-1.726a3.13 3.13 0 0 0-4.003 0c-.043.034-2.151 1.726-4.68 1.726m21.908-1.864q.005.003 0 0"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg">Beach Tours</h3>
            <p class="text-sm text-gray-600">99+ Tours</p>
          </div>

          <div
            class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div class="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M18.06 23h1.66c.84 0 1.53-.65 1.63-1.47L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26c1.44 1.42 2.43 2.89 2.43 5.29zM1 22v-1h15.03v1c0 .54-.45 1-1.03 1H2c-.55 0-1-.46-1-1m15.03-7C16.03 7 1 7 1 15zM1 17h15v2H1z"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg">Food Tours</h3>
            <p class="text-sm text-gray-600">99+ Tours</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Destinations -->
    <section class="py-16 lg:py-24 bg-gray-50 w-full px-4 sm:px-8 lg:px-16">
      <div class="w-full">
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 max-w-7xl mx-auto"
        >
          <h2
            class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-0"
          >Trending Destinations</h2>
          <a href="/blog" class="text-purple-600 hover:text-purple-700 font-medium text-lg">See all</a>
        </div>

        <!-- Masonry Grid Layout -->
        <div class="max-w-7xl mx-auto">
          <!-- Desktop Grid (lg and above) -->
          <div class="hidden lg:grid grid-cols-4 grid-rows-2 gap-4 h-96">
            <!-- Cruises - Small card (top-left) -->
            <div
              class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1"
            >
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
            <div
              class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-2 row-span-1"
            >
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
            <div
              class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-2"
            >
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
            <div
              class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1"
            >
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
            <div
              class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1"
            >
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
            <div
              class="relative group cursor-pointer overflow-hidden rounded-2xl col-span-1 row-span-1"
            >
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
              <!-- Feature 1 -->
              <div
                class="flex items-start space-x-6 p-6 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path
                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                      />
                      <path
                        fill="#fff"
                        d="M19.71 2.837c.733.147 1.306.72 1.453 1.453a3.56 3.56 0 0 1-.773 2.995l-2.751 3.252l1.944 7.131a1.25 1.25 0 0 1-.322 1.213l-1.302 1.302a1.01 1.01 0 0 1-1.597-.224l-2.942-5.296l-2.858 2.381l.21 1.053a1.25 1.25 0 0 1-.341 1.13L8.767 20.89a1.01 1.01 0 0 1-1.617-.263L5.89 18.11l-2.516-1.26a1.01 1.01 0 0 1-.263-1.617l1.664-1.664a1.25 1.25 0 0 1 1.129-.341l1.053.21l2.381-2.857l-5.296-2.943a1.01 1.01 0 0 1-.224-1.597L5.12 4.739a1.25 1.25 0 0 1 1.213-.322l7.13 1.944l3.253-2.751a3.56 3.56 0 0 1 2.995-.773Zm-.492 1.945a1.56 1.56 0 0 0-1.211.354l-3.65 3.089a1.01 1.01 0 0 1-.918.203L6.226 6.46l-.067.066l5.195 2.886a1.01 1.01 0 0 1 .285 1.53L8.115 15.17a1.01 1.01 0 0 1-.974.344l-1.237-.247l-.408.408l1.557.779a1.1 1.1 0 0 1 .492.492l.78 1.557l.407-.408l-.247-1.237a1.01 1.01 0 0 1 .344-.974l4.229-3.524a1.01 1.01 0 0 1 1.53.285l2.885 5.195l.066-.067l-1.967-7.213a1.01 1.01 0 0 1 .204-.918l3.088-3.65c.285-.337.412-.777.354-1.211Z"
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-3 text-lg">Select itinerary</h3>
                  <p
                    class="text-gray-600 leading-relaxed"
                  >Choose from our curated travel plans or create your own custom itinerary.</p>
                </div>
              </div>

              <!-- Feature 2 -->
              <div
                class="flex items-start space-x-6 p-6 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M12 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1m-5 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1M7 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM7 18a1 1 0 1 0-1-1a1 1 0 0 0 1 1"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-3 text-lg">Schedule your trip</h3>
                  <p
                    class="text-gray-600 leading-relaxed"
                  >Plan your perfect timing with our flexible scheduling system.</p>
                </div>
              </div>

              <!-- Feature 3 -->
              <div
                class="flex items-start space-x-6 p-6 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M8.4 21q-2.275 0-3.838-1.562T3 15.6q0-.95.325-1.85t.925-1.625L7.8 7.85L5.375 3h13.25L16.2 7.85l3.55 4.275q.6.725.925 1.625T21 15.6q0 2.275-1.575 3.838T15.6 21zm3.6-5q-.825 0-1.412-.587T10 14t.588-1.412T12 12t1.413.588T14 14t-.587 1.413T12 16M9.625 7h4.75l1-2h-6.75zM8.4 19h7.2q1.425 0 2.413-.987T19 15.6q0-.6-.213-1.162t-.587-1.013L14.525 9H9.5l-3.7 4.4q-.375.45-.587 1.025T5 15.6q0 1.425.988 2.413T8.4 19"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-3 text-lg">Big discount</h3>
                  <p
                    class="text-gray-600 leading-relaxed"
                  >Enjoy exclusive deals and discounts on all our travel packages.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative w-full">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-6">
                <img
                  src="@/assets/img-home-page/angkorwat.jpg"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover shadow-lg"
                />
              </div>
              <div class="space-y-6 mt-8">
                <img
                  src="@/assets/img-home-page/waterfall.png"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover shadow-lg"
                />
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