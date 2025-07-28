<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative h-[550px] overflow-hidden">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide((index + 1) % slides.length)"
        class="absolute inset-0 transition-opacity duration-700 focus:outline-none"
        :class="{'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index}"
        :style="`background-image: url('${slide.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;`"
      >
        <div class="absolute inset-0 bg-black/30"></div>
        <div
          class="relative flex flex-col items-center justify-center h-full text-white text-center"
        >
          <h2 class="text-4xl font-bold text-5xl">{{ slide.title }}</h2>
          <p class="mt-4 text-4xl">{{ slide.subtitle }}</p>
          <button
            @click="goToContactPage"
            class="border-2 border-purple-600 text-purple-600 px-8 py-2 mt-8 rounded-full text-lg font-medium hover:bg-purple-700 hover:text-white transition-colors z-10"
          >Contact</button>
        </div>
      </button>
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full"
          :class="{'bg-white': currentSlide === index, 'bg-white/50': currentSlide !== index}"
        ></button>
      </div>
    </section>

    <!-- Our word section -->
    <section class="py-16 bg-gray-50 relative">
      <div class="max-w-7xl mx-auto px-4">
        <div class="mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Worlds</h2>
          <p
            class="text-lg text-gray-600 max-w-2xl"
          >As a family run business, nothing is more important than our relationship with our clients.</p>
        </div>
        <!-- Image Cards -->
        <div class="relative">
          <!-- Dynamic Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div v-for="card in visibleCards" :key="card.id" class="relative group cursor-pointer">
              <div
                class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div class="relative h-80">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
                  >
                    <div
                      class="w-32 h-32 border-2 border-white border-dashed rounded-full flex items-center justify-center"
                    >
                      <span class="text-white text-lg font-semibold">{{ card.title }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Navigation Controls -->
          <div class="flex items-center justify-between">
            <!-- Left Arrow -->
            <button
              @click="previousCardGroup"
              class="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              :disabled="currentCardIndex === 0"
              :class="{'opacity-50 cursor-not-allowed': currentCardIndex === 0}"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <!-- Dots Navigation for Cards -->
            <div class="flex space-x-2">
              <button
                v-for="(dot, index) in Math.max(1, worldCards.length - 2)"
                :key="index"
                @click="currentCardIndex = index"
                :class="[
                  'w-3 h-3 rounded-full transition-colors',
                  currentCardIndex === index ? 'bg-purple-600' : 'bg-gray-300'
                ]"
              ></button>
            </div>
            <!-- Right Arrow -->
            <button
              @click="nextCardGroup"
              class="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              :disabled="currentCardIndex >= Math.max(0, worldCards.length - 3)"
              :class="{'opacity-50 cursor-not-allowed': currentCardIndex >= Math.max(0, worldCards.length - 3)}"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="bg-gradient-to-br from-purple-100 to-purple-200 py-16 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle, #8b5cf6 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="relative z-10">
            <p class="text-purple-600 font-medium mb-2 text-sm uppercase tracking-wide">Our Story</p>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
            <p class="text-gray-600 text-lg leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse varius enim in eros elementum tristique. Duis 
              cursus, mi quis viverra ornare, eros dolor interdum nulla, ut 
              commodo diam libero vitae erat.
            </p>
            <button class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg">
              Contact Us
            </button>
          </div>
          
          <!-- Right Images -->
          <div class="relative flex justify-center items-center">
            <!-- Airplane decoration -->
            <div class="absolute -top-8 -right-4 z-20">
              <svg class="w-8 h-8 text-gray-700 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              <!-- Dotted line -->
              <div class="absolute top-4 left-4 w-16 h-0.5 border-t-2 border-dotted border-gray-400"></div>
            </div>
            
            <!-- First Image Container -->
            <div class="relative w-64 h-80 rounded-3xl overflow-hidden shadow-2xl transform -rotate-6 z-10">
              <img
                src="https://tourismcambodia.org/storage/uploads/category_banner/ministry-of-tourism-cambodia-2021-06-13-03-16-47pm.jpg"
                alt="preah vihear"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Second Image Container -->
            <div class="relative w-48 h-64 rounded-3xl overflow-hidden shadow-2xl transform rotate-12 -ml-16 mt-8 z-20">
              <img
                src="https://i.pinimg.com/564x/72/e7/3e/72e73e179a29e7d8f4a6eafce3760423.jpg"
                alt="Ancient temple corridor"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Destinations Section -->
    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Discover Your Dream Destinations</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="destination in destinations"
          :key="destination.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img :src="destination.image" :alt="destination.title" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ destination.title }}</h3>
            <p class="text-gray-600">{{ destination.description }}</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <button
          class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >View All</button>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-gray-100 py-16">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-12">FAQs</h2>
        <div class="space-y-6">
          <div v-for="faq in faqs" :key="faq.id" class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ faq.question }}</h3>
            <p class="text-gray-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Insights Section -->
    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900">Insights on Branding</h2>
        <button
          class="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >View All</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="insight in insights"
          :key="insight.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img :src="insight.image" :alt="insight.title" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ insight.title }}</h3>
            <p class="text-gray-600 text-sm">{{ insight.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Current slide state for hero section
const currentSlide = ref(0);

// Hero slides
const slides = ref([
  {
    title: "Unveil the Mysteries of Ancient Cambodia",
    subtitle: "Explore the beauty and culture of Cambodia and beyond.",
    image:
      "https://blog.takemetour.com/wp-content/uploads/2019/07/Ta-Prohm-Temple-1024x681.jpg"
  },
  {
    title: "Embrace the Serenity of Sunset Temples",
    subtitle: "Join us for unforgettable experiences.",
    image:
      "https://plus.unsplash.com/premium_photo-1661907933652-9f43a2a6031c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtYm9kaWElMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "Journey Through Rural Traditions",
    subtitle: "Immerse yourself in local traditions.",
    image:
      "https://beta-planet.gvi.co.uk/wp-content/uploads/2023/02/1662325452-2023-feb-24-16-17-14-000000-tonle-sap-cambodia-2021-08-26-18-15-03-utc.jpg"
  }
]);

// Our Worlds card navigation state
const currentCardIndex = ref(0);

// All card items
const worldCards = ref([
  {
    id: 1,
    title: "Zoo",
    image:
      "https://english.cambodiadaily.com/wp-content/uploads/2016/04/cam-photo-tiger.jpg"
  },
  {
    id: 2,
    title: "Beach",
    image:
      "https://hanoivoyage.com/uploads//Blogs/Cambodia/Visit-Cambodia/thumnail/sihanoukville-thumbnail-01.jpg"
  },
  {
    id: 3,
    title: "Waterfall",
    image:
      "https://www.guidingcambodia.com/wp-content/uploads/2023/12/Phnom-Kulen-Waterfall-02-853x640-1.jpg"
  },
  {
    id: 4,
    title: "Mountain",
    image: "https://khmerplaces.com/storage/posts/May2020/36WfY2yWwYZV6ll9icXs.jpg"
  },
  {
    id: 5,
    title: "Forest",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/99/03/fd.jpg"
  }
]);

// Show only 3 cards at a time
const visibleCards = computed(() => {
  return worldCards.value.slice(
    currentCardIndex.value,
    currentCardIndex.value + 3
  );
});

// Card navigation functions
function nextCardGroup() {
  const maxIndex = Math.max(0, worldCards.value.length - 3);
  if (currentCardIndex.value < maxIndex) {
    currentCardIndex.value += 1;
  }
}

function previousCardGroup() {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value -= 1;
  }
}

// Hero slideshow functions
function goToSlide(index) {
  currentSlide.value = index;
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function previousSlide() {
  currentSlide.value =
    currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1;
}

// Fallback image
function handleImageError(event) {
  event.target.src = "https://via.placeholder.com/400x300?text=No+Image";
}

// FAQs
const faqs = ref([
  {
    id: 1,
    question: "What is Anajak Travel?",
    answer:
      "Anajak Travel is a travel agency that offers various travel services."
  },
  {
    id: 2,
    question: "How can I book a trip?",
    answer: "You can book a trip through our website or contact our support."
  },
  {
    id: 3,
    question: "What destinations do you cover?",
    answer: "We cover a wide range of destinations across Cambodia and beyond."
  }
]);

// Insights
const insights = ref([
  {
    id: 1,
    title: "Brand Identity",
    description: "Creating memorable brand experiences that resonate",
    image:
      "https://blog.takemetour.com/wp-content/uploads/2019/07/Ta-Prohm-Temple-1024x681.jpg"
  },
  {
    id: 2,
    title: "Visual Design",
    description: "Crafting compelling visual narratives",
    image:
      "https://blog.takemetour.com/wp-content/uploads/2019/07/Ta-Prohm-Temple-1024x681.jpg"
  },
  {
    id: 3,
    title: "Brand Strategy",
    description: "Building lasting brand connections",
    image:
      "https://blog.takemetour.com/wp-content/uploads/2019/07/Ta-Prohm-Temple-1024x681.jpg"
  }
]);

// Destinations
const destinations = ref([
  {
    id: 1,
    title: "Angkor Wat",
    description: "The world's largest religious monument",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Angkor_Wat_temple.jpg"
  },
  {
    id: 2,
    title: "Kampot River",
    description: "Scenic riverside and countryside life",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Kampot_river.jpg"
  },
  {
    id: 3,
    title: "Phnom Penh",
    description: "Capital city with rich culture",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Phnom_Penh_at_night.jpg"
  }
]);

// Contact button
function goToContactPage() {
  router.push("/contact");
}

// Auto slideshow for hero section only
function startSlideshow() {
  setInterval(nextSlide, 5000);
}

// Start slideshow when mounted
onMounted(() => {
  startSlideshow();
});
</script>

<style scoped>
.group:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
