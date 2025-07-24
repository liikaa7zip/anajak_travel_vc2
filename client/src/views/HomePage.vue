<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <section class="py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-5xl font-bold text-gray-800 leading-tight mb-6">
              From Cambodia
              <br />
              <span class="text-purple-600">to the World.</span>
            </h1>
            <p
              class="text-gray-600 text-lg mb-8"
            >Stay updated with recommendations and discover amazing destinations across Cambodia and beyond.</p>
            <div class="flex space-x-4">
              <button
                @click="explore"
                class="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors"
              >Explore</button>
              <button
                class="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-colors"
              >Learn More</button>
            </div>
          </div>

          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <img
                  :src="heroImages[0].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 lg:h-56 object-cover shadow-lg"
                />
                <img
                  :src="heroImages[1].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-32 lg:h-36 object-cover shadow-lg"
                />
              </div>
              <div class="space-y-4 mt-8">
                <img
                  :src="heroImages[2].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-32 lg:h-36 object-cover shadow-lg"
                />
                <img
                  :src="heroImages[3].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 lg:h-56 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Things to Do -->
      <section class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Popular things to do</h2>
          <div class="w-16 h-1 bg-purple-600 mx-auto"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="text-center group cursor-pointer"
          >
            <div
              class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              :class="activity.bgColor"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="activity.iconBg"
              >
                <span class="text-white text-sm">{{ activity.icon }}</span>
              </div>
            </div>
            <p class="text-gray-700 font-medium">{{ activity.name }}</p>
          </div>
        </div>
      </section>

      <!-- Trending Destinations -->
      <section class="py-16">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800">Trending Destinations</h2>
          <a href="#" class="text-purple-600 hover:text-purple-700 font-medium">View All</a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="destination in destinations"
            :key="destination.id"
            class="relative group cursor-pointer overflow-hidden rounded-2xl"
          >
            <img
              :src="destination.src"
              :alt="destination.name"
              class="w-full h-64 object-cover transition-transform group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <h3 class="text-xl font-bold">{{ destination.name }}</h3>
              <p class="text-sm opacity-90">{{ destination.description }}</p>
            </div>
            <div
              v-if="destination.badge"
              class="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
            >{{ destination.badge }}</div>
          </div>
        </div>
      </section>

      <!-- Key Features -->
      <section class="py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-4">We offer best services</h2>
            <p class="text-gray-600 mb-8">Hey Agent! We help your perfect holiday.</p>

            <div class="space-y-6">
              <div
                v-for="feature in features"
                :key="feature.id"
                class="flex items-start space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all"
              >
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="feature.bgColor"
                >
                  <span class="text-white text-lg">{{ feature.icon }}</span>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-2">{{ feature.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <img
                  :src="heroImages[0].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 lg:h-56 object-cover shadow-lg"
                />
              </div>
              <div class="space-y-4 mt-8">
                <img
                  :src="heroImages[3].src"
                  alt="Cambodia destination"
                  class="rounded-2xl w-full h-48 lg:h-56 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Customer Reviews -->
      <section
        class="py-16 bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl text-white relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="relative z-10">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Customer Reviews</h2>
            <div class="w-16 h-1 bg-white mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all"
            >
              <div class="flex items-center mb-4">
                <img
                  :src="review.avatar"
                  :alt="review.name"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 class="font-bold">{{ review.name }}</h4>
                  <div class="text-yellow-400">{{ review.rating }}</div>
                </div>
              </div>
              <p class="text-white/90 italic">"{{ review.comment }}"</p>
            </div>
          </div>

          <!-- Carousel indicators -->
          <div class="flex justify-center mt-8 space-x-2">
            <div
              v-for="n in 3"
              :key="n"
              class="w-2 h-2 rounded-full bg-white/50 hover:bg-white cursor-pointer transition-colors"
              :class="{ 'bg-white': n === 1 }"
            ></div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-16 bg-white mt-16">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <span class="text-white font-bold text-sm">AT</span>
              </div>
              <span class="text-xl font-bold text-gray-800">Angkor Travel</span>
            </div>
            <p
              class="text-gray-600 mb-6"
            >Travel with us for an amazing experience! Discover the beauty of Cambodia and beyond.</p>
            <div class="flex space-x-3">
              <a href="#" class="hover:opacity-80">
                <img
                  src="https://placehold.co/120x40/000000/FFFFFF/png?text=App+Store"
                  alt="Download on App Store"
                  class="h-10"
                />
              </a>
              <a href="#" class="hover:opacity-80">
                <img
                  src="https://placehold.co/120x40/000000/FFFFFF/png?text=Google+Play"
                  alt="Get it on Google Play"
                  class="h-10"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">About</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Contact</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-gray-800 mb-4">About</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Our Story</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Team</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Careers</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Press</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-gray-800 mb-4">Cambodia Info</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Tours</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Packages</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Support</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-purple-600">Travel Guide</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p class="text-gray-600 text-sm">© 2024 Angkor Travel. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-purple-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-purple-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-purple-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
// Import local images
import heroImg1 from '@/assets/img-home-page/heroimg1.jpg'
import angkor from '@/assets/img-home-page/angkor.webp'
import beach from '@/assets/img-home-page/beach.jpg'
import mountain from '@/assets/img-home-page/mountain.jpg'

import cruises from '@/assets/img-home-page/cruises.webp'
import kohrong from '@/assets/img-home-page/kohrong.webp'
import museum from '@/assets/img-home-page/museum.jpg'
import food from '@/assets/img-home-page/food.jpg'
import hiking from '@/assets/img-home-page/hiking.jpg'
import city from '@/assets/img-home-page/city.jpg'


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
          name: "Koh Rong",
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
          name: "City Tour",
          description: "Discover Phnom Penh’s urban charm"
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
      featureImages: [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=80"
      ],
      reviews: [
        {
          id: 1,
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b9e0d9d4?auto=format&fit=crop&w=100&q=80",
          name: "Sarah Johnson",
          comment:
            "Amazing experience! The tour guides were knowledgeable and the destinations were breathtaking.",
          rating: "★★★★★"
        },
        {
          id: 2,
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
          name: "David Chen",
          comment:
            "Perfect trip planning and execution. Highly recommend for anyone visiting Cambodia!",
          rating: "★★★★★"
        },
        {
          id: 3,
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
          name: "Maria Garcia",
          comment:
            "Unforgettable memories created with professional service and great attention to detail.",
          rating: "★★★★☆"
        }
      ]
    };
  },
  methods: {
    explore() {
      alert("Exploring destinations!");
    }
  }
};
</script>

<style scoped>
/* Custom animations and transitions */
.group:hover .group-hover:scale-110 {
  transform: scale(1.1);
}

/* Smooth scrolling for carousel */
.carousel-container {
  scroll-behavior: smooth;
}
</style>