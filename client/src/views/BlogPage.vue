<template>
  <div :class="darkMode ? 'bg-gray-900 text-gray-100' : ' text-indigo-900'" class="min-h-screen transition-colors  font-sans">

    <!-- Hero with Dynamic Stats -->
 <section
  class="relative min-h-[600px] p-14 text-center overflow-hidden text-white  shadow-lg bg-cover bg-center"
  style="background-image: url('https://i.natgeofe.com/n/fdbadebb-1db9-41a9-9ac6-e7ee41f199aa/ta-prohm-siem-reap-cambodia.jpg');"
>
  <!-- Optional: dark overlay for readability -->
  <div class="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>

  <!-- Content -->
  <h1 class="text-6xl font-extrabold mb-6 drop-shadow-lg z-10 relative">
    Explore the World with Us
  </h1>
  <p class="max-w-3xl mx-auto mb-8 text-xl font-light drop-shadow-md z-10 relative">
    Discover inspiring travel stories, expert tips, and stunning photo galleries from around the globe.
  </p>

  <!-- Stats -->
  <div class="flex justify-center space-x-12 text-yellow-300 mb-8 select-none font-semibold text-lg z-10 relative">
    <div>
      <div class="text-5xl font-bold">{{ featuredPosts.length }}</div>
      <div>Stories Shared</div>
    </div>
    <div>
      <div class="text-5xl font-bold">{{ travelGuides.length }}</div>
      <div>Travel Guides</div>
    </div>
    <div>
      <div class="text-5xl font-bold">{{ galleryPhotos.length }}</div>
      <div>Photos Captured</div>
    </div>
  </div>

  <!-- Button -->
  <button
    class="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition transform hover:-translate-y-1 z-10 relative"
  >
    Start Your Journey
  </button>
</section>


    <!-- Featured Stories with author and reading time -->
    <section class="max-w-7xl mx-auto px-4">
      <h2
        class="text-4xl font-bold mt-12  mb-8 text-gray-700 border-b-4 border-pink-300 inline-block pb-3"
      >
        Featured Stories
      </h2>
      <div class="grid md:grid-cols-3 gap-10">
        <article
          v-for="post in featuredPosts"
          :key="post.id"
          :class="darkMode ? 'bg-gray-800' : 'bg-white'"
          class="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
        >
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-56 object-cover"
          />
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-3 text-sm text-pink-600 dark:text-white-300 font-semibold">
              <span class="bg-indigo-200 dark:bg-pink-400 rounded-full px-3 py-1 uppercase tracking-wide">{{ post.category || 'Travel' }}</span>
              <span>By {{ post.author || 'Admin' }}</span>
              <time>{{ post.date || 'Aug 2025' }}</time>
              <span>• {{ post.readingTime || 5 }} min read</span>
            </div>
            <h3 class="text-2xl text-gray-700 font-semibold mb-3">{{ post.title }}</h3>
            <p
              :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
              class="mb-4 line-clamp-3"
            >
              {{ post.excerpt }}
            </p>
            <button
              @click="bookmarkPost(post.id)"
              class="mr-3 px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              ⭐ Bookmark
            </button>
            <a
              v-if="post.link"
              :href="post.link"
              target="_blank"
              class="inline-block text-indigo-600 dark:text-yellow-400 hover:underline font-semibold"
            >
              Read More →
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- Travel Guides with expandable summaries -->
    <section class="max-w-5xl mx-auto px-4">
      <h2 class="text-4xl font-bold mb-8 mt-10 border-b-4 text-gray-700 border-pink-300 inline-block pb-3">
        Travel Guides & Tips
      </h2>
      <ul class="space-y-10">
        <li
          v-for="guide in travelGuides"
          :key="guide.id"
          :class="darkMode ? 'bg-gray-800' : 'bg-white'"
          class="rounded-lg shadow-md p-8 hover:shadow-lg transition cursor-pointer"
          @click="toggleGuide(guide.id)"
        >
          <h3 class="text-3xl font-semibold mb-3 flex justify-between items-center">
            {{ guide.title }}
            <span class="text-indigo-500 dark:text-yellow-400 text-xl select-none">
              {{ expandedGuides.includes(guide.id) ? '▲' : '▼' }}
            </span>
          </h3>
          <p v-if="expandedGuides.includes(guide.id)" class="mb-4 text-lg">{{ guide.description }}</p>
          <p v-else class="mb-4 text-lg line-clamp-3">{{ guide.description }}</p>
          <div class="space-x-3">
            <span
              v-for="tag in guide.tags"
              :key="tag"
              class="inline-block bg-gradient-to-tr from-purple-400 to-purple-600 text-yellow-200 rounded-full px-4 py-1 text-sm font-semibold"
            >
              {{ tag }}
            </span>
          </div>
          <div v-if="guide.isPopular" class="mt-3 inline-block bg-yellow-400 text-indigo-900 rounded-full px-3 py-1 font-semibold text-sm select-none">
            Popular
          </div>
        </li>
      </ul>
    </section>

    <!-- Popular Destinations Section -->
    <section class="max-w-7xl mx-auto px-4">
      <h2
        class="text-4xl text-gray-700 font-bold mb-8 mt-10 border-b-4 border-pink-300 inline-block pb-3"
      >
        Popular Destinations
      </h2>
      <div class="grid md:grid-cols-4 gap-8">
        <div v-for="dest in popularDestinations" :key="dest.id" class="rounded-lg shadow-md overflow-hidden bg-white dark:bg-white-800 cursor-pointer hover:shadow-xl transition">
          <img :src="dest.image" :alt="dest.name" class="w-full h-44 object-cover"/>
          <div class="p-5">
            <h3 class="text-xl font-semibold mb-2">{{ dest.name }}</h3>
            <p class="text-sm mb-3 line-clamp-3">{{ dest.description }}</p>
            <button
              @click="goToDestination(dest.id)"
              class="bg-indigo-600 dark:bg-purple-600 text-white dark:text-white-900 px-4 py-2 rounded hover:bg-purple-700 dark:hover:bg-white-500 transition"
            >
              Explore →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery with captions -->
    <section>
      <h2 class="text-4xl font-bold mb-6 ml-10 mt-10 border-b text-gray-700 border-pink-300 pb-2">Travel Photo Gallery</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div
          v-for="photo in galleryPhotos"
          :key="photo.id"
          class="cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          @click="openModal(photo.url)"
        >
          <img :src="photo.image" :alt="photo.title" class="w-full h-36 object-cover" />
          <div class="p-3 bg-white dark:bg-white">
            <h3 class="font-semibold text-lg text-gray-900 dark:text-purple-700">{{ photo.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-500">{{ photo.description }}</p>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-pointer"
        @click="closeModal"
      >
        <img :src="modalImage" alt="Modal photo" class="max-h-[90vh] max-w-[90vw] rounded shadow-lg" />
      </div>
    </section>

    <!-- Newsletter with interests -->
    <section
      class="bg-purple-100 rounded-lg mt-10 p-12 text-center text-gray-600 max-w-xl mx-auto shadow-lg"
    >
      <h3 class="text-3xl font-bold mb-6">Subscribe to our newsletter</h3>
      <p class="mb-4 italic">Join {{ subscriberCount }}+ travelers for exclusive tips!</p>
      <form
        @submit.prevent="subscribe"
        class="flex flex-col sm:flex-row justify-center items-center gap-5"
      >
        <div class="relative flex-grow max-w-md w-full">
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            required
            class="rounded-full px-6 py-4 text-indigo-900 w-full focus:outline-none focus:ring-4 focus:ring-purple-400"
          />
        </div>
        <button
          type="submit"
          class="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-300 shadow-lg transition transform hover:-translate-y-1"
        >
          Subscribe
        </button>
      </form>
      <div class="mt-6 text-left max-w-md mx-auto">
        <p class="mb-2 font-semibold">Select your travel interests:</p>
        <div class="flex flex-wrap justify-center gap-3">
          <label
            v-for="interest in travelInterests"
            :key="interest"
            class="inline-flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              :value="interest"
              v-model="selectedInterests"
              class="rounded"
            />
            <span>{{ interest }}</span>
          </label>
        </div>
      </div>
      <p
        class="mt-5 font-semibold transition-colors duration-300"
        :class="message.includes('Thanks') ? 'text-green-400' : 'text-red-400'"
      >
        {{ message }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const featuredPosts = ref([])
const travelGuides = ref([])
const galleryPhotos = ref([])
const popularDestinations = ref([
  {
    id: 1,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with beaches, culture, and rice terraces.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Paris, France',
    description: 'City of lights, romance, and world-class cuisine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    description: 'Historic temples, beautiful gardens, and traditional culture.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'New York City, USA',
    description: 'The city that never sleeps with iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
  },
])

const email = ref('')
const message = ref('')
const showModal = ref(false)
const modalImage = ref('')
const darkMode = ref(false)

const newsItems = [
  'New travel restrictions in Europe starting August 2025',
  'Top 5 beaches to visit this summer',
  'How to travel sustainably in 2025',
  'Latest airline deals you don’t want to miss',
]
const newsLinks = [
  'https://news.example.com/restrictions',
  'https://news.example.com/beaches',
  'https://news.example.com/sustainable-travel',
  'https://news.example.com/airline-deals',
]

const newsIndex = ref(0)
let newsInterval = null

const subscriberCount = ref(2315)
const travelInterests = ['Beaches', 'Mountains', 'Cities', 'Adventure', 'Culture', 'Food']
const selectedInterests = ref([])

const expandedGuides = ref([])

const API_BASE = 'http://localhost:5000/api'

async function fetchData() {
  try {
    const [featuredRes, guideRes, galleryRes] = await Promise.all([
      axios.get(`${API_BASE}/featured-stories`),
      axios.get(`${API_BASE}/travel-guides`),
      axios.get(`${API_BASE}/gallery-photos`),
    ]);

    featuredPosts.value = featuredRes.data.map(post => ({
      ...post,
      image: post.image ? `http://localhost:5000${post.image}` : null,
    }));

    travelGuides.value = guideRes.data.map(g => ({
      ...g,
      tags: typeof g.tags === 'string' ? g.tags.split(',').map(t => t.trim()) : [],
      isPopular: g.isPopular || false,
    }));

    galleryPhotos.value = galleryRes.data.map(photo => ({
  ...photo,
  image: photo.image || null,  // already a full URL
}));



  } catch (err) {
    console.error('Error fetching data:', err);
  }
}



function subscribe() {
  if (!validateEmail(email.value)) {
    message.value = 'Please enter a valid email address.'
    return
  }
  // Imagine sending email + interests to backend here
  message.value = `Thanks for subscribing, ${email.value}! ✈️`
  subscriberCount.value++
  email.value = ''
  selectedInterests.value = []
}

function validateEmail(e) {
  return /\S+@\S+\.\S+/.test(e)
}

function openModal(url) {
  modalImage.value = url
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  modalImage.value = ''
}

function toggleGuide(id) {
  if (expandedGuides.value.includes(id)) {
    expandedGuides.value = expandedGuides.value.filter(x => x !== id)
  } else {
    expandedGuides.value.push(id)
  }
}

function bookmarkPost(id) {
  alert(`You bookmarked post #${id}! (This is just a demo)`)
}

function goToDestination(id) {
  alert(`Go to destination #${id} page (demo
)`)
}

onMounted(() => {
  fetchData();
});
</script>