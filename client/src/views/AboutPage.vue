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
    <section class="bg-white py-16 relative overflow-hidden">
      <!-- Background Pattern -->
      <!-- Removed background pattern div -->
      <div class="max-w-7xl mx-auto px-4 relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="relative z-10">
            <p class="text-purple-600 font-medium mb-2 text-sm uppercase tracking-wide">Our Story</p>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
            <p class="text-gray-600 text-lg leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
              erat.
            </p>
            <button class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg">
              Contact Us
            </button>
          </div>
          <!-- Right Images -->
          <div class="flex justify-center items-center gap-6">
            <!-- Removed Airplane decoration -->
            <!-- First Image Container -->
            <div class="w-64 h-80 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://cambodiataxidriver.com/wp-content/uploads/2023/09/Cambodia-Taxi-Driver-2706.webp"
                alt="preah vihear"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Second Image Container -->
            <div class="w-64 h-80 rounded-2xl overflow-hidden shadow-lg ">
              <img
                src="https://i.pinimg.com/564x/72/e7/3e/72e73e179a29e7d8f4a6eafce3760423.jpg"
                alt="Cambodian Waterfall"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Destinations Section -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Discover Your Dream Destinations</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-4">FAQs</h2>
        <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Find quick answers to common questions about booking, payments, cancellations, security, and travel requirements. This section helps you get the information you need—fast and hassle-free.
        </p>
        <div class="space-y-0">
          <div v-for="faq in faqs" :key="faq.id" class="bg-white rounded-lg border-b border-blue-100 last:border-b-0">
            <button
              @click="toggleFaq(faq)"
              class="flex justify-between items-center w-full py-4 px-6 text-lg font-semibold text-gray-900 focus:outline-none"
            >
              <span>{{ faq.question }}</span>
              <svg
                class="w-5 h-5 text-blue-500 transition-transform duration-300"
                :class="{'rotate-180': faq.isOpen}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div v-if="faq.isOpen" class="px-6 pb-4 text-gray-600">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Insights Section -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900">Insights on Branding</h2>
        <button
          class="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >View All</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
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


// FAQs
const faqs = ref([
  {
    id: 1,
    question: "How do I book a trip on your website?",
    answer: "Just choose your destination, select your travel dates, click “Book Now,” fill in your details, and make the payment. You’ll get a confirmation email right after!",
    isOpen: false,
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also support payments via PayPal and bank transfers for certain bookings.",
    isOpen: false,
  },
  {
    id: 3,
    question: "Is my payment secure?",
    answer: "Yes, your payment security is our top priority. We use industry-standard encryption and secure payment gateways to protect your personal and financial information.",
    isOpen: false,
  },
  {
    id: 4,
    question: "When will my credit card be charged?",
    answer: "Your credit card will typically be charged at the time of booking confirmation. For some specific packages or services, a deposit might be charged initially, with the remaining balance due closer to your travel date.",
    isOpen: false,
  },
  {
    id: 5,
    question: "Can I cancel or modify my booking?",
    answer: "Cancellation and modification policies vary depending on the specific trip or service booked. Please refer to the terms and conditions provided during the booking process or contact our support team for assistance.",
    isOpen: false,
  },
  {
    id: 6,
    question: "What are your cancellation and refund policies?",
    answer: "Our cancellation and refund policies are detailed in the terms and conditions of each booking. Generally, refunds are subject to cancellation fees and timing relative to your departure date. We recommend reviewing these policies carefully before confirming your booking.",
    isOpen: false,
  },
  {
    id: 7,
    question: "Do I need a visa to travel to my destination?",
    answer: "Visa requirements depend on your nationality and the destination country. We advise checking the latest visa regulations with the embassy or consulate of your destination country well in advance of your travel date.",
    isOpen: false,
  },
]);

// Toggle FAQ function
function toggleFaq(selectedFaq) {
  faqs.value.forEach(faq => {
    if (faq.id === selectedFaq.id) {
      faq.isOpen = !faq.isOpen;
    } else {
      faq.isOpen = false; // Close other FAQs
    }
  });
}

// Insights
const insights = ref([
  {
    id: 1,
    title: "Sampov Mountain",
    description: "Crafting compelling visual narratives",
    image:
      "https://www.gocambodia.tours/wp-content/uploads/2016/12/On-the-top-of-Phnom-Sampeou-Mountain.jpg"
  },
  {
    id: 2,
    title: "Ta Muen Thom Temple",
    description: "Building lasting brand connections",
    image:
      "https://helloangkor.com/wp-content/uploads/2021/05/HA5D5981-HDR.jpg"
  },
  {
    id: 3,
    title: "Koh Rong",
    description: "Creating memorable brand experiences that resonate",
    image:
      "https://images.mrandmrssmith.com/images/698x522/4390977-song-saa-private-island-koh-rong-islands-cambodia.jpg"
  },
  {
    id: 4,
    title: "Kirirom",
    description: "Crafting compelling visual narratives",
    image:
      "https://www.asiakingtravel.com/cuploads/files/Kampong-Speu/Kirirom%20National%20Park/Kirirom-National-Park-1.jpg"
  },
]);

// Destinations
const destinations = ref([
  {
    id: 1,
    title: "Angkor Wat",
    description: "The world's largest religious monument",
    image:
      "https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg"
  },
  {
    id: 2,
    title: "Kampot River",
    description: "Scenic riverside and countryside life",
    image:
      "https://pippalihotel.com/wp-content/uploads/2023/03/Get-To-Know-Kampot-River-3.jpg"
  },
  {
    id: 3,
    title: "Phnom Penh",
    description: "Capital city with rich culture",
    image:
      "https://blog.bangkokair.com/wp-content/uploads/2025/01/01_phnom-penh-travel-guide.jpg"
  },
  {
    id: 4,
    title: "Banan Temple",
    description: "Many temple in Battambang",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJqvmkc5uAXt4MA0aPAawOVhKYY28coyMFiA&s"
  },
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
