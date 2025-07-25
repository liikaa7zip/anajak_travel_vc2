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

    <!-- Our Works Section -->
    <section class="py-16">
      <h2 class="text-3xl font-bold text-center mb-1">Our Works</h2>
      <p
        class="mt-4 text-xl text-center mb-8"
      >As a family run business, nothing is more important than our relationship with our clients.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src="@/assets/img-about-page/temple.jpg"
            alt="Wildlife"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold">Wildlife</h3>
            <p class="text-gray-600">Experience the diverse wildlife of Cambodia.</p>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img src="https://placehold.co/300x200" alt="Waterfall" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Waterfalls</h3>
            <p class="text-gray-600">Discover the stunning waterfalls in the region.</p>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img src="https://placehold.co/300x200" alt="Waterfall" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Waterfalls</h3>
            <p class="text-gray-600">Discover the stunning waterfalls in the region.</p>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img src="https://placehold.co/300x200" alt="Waterfall" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Waterfalls</h3>
            <p class="text-gray-600">Discover the stunning waterfalls in the region.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="py-16 flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
      <div class="lg:w-1/2 p-4">
        <h2 class="text-3xl font-bold">About Us</h2>
        <p class="mt-4 text-gray-600">We are dedicated to providing the best travel experiences.</p>
        <button
          class="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >Read More</button>
      </div>
      <div class="lg:w-1/2 flex justify-center">
        <div class="relative">
          <img src="https://placehold.co/300x200" alt="Scenery" class="rounded-lg shadow-lg" />
        </div>
        <div class="relative ml-4">
          <img src="https://placehold.co/300x200" alt="Temple" class="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Featured Destinations Section -->
    <section class="py-16">
      <h2 class="text-3xl font-bold text-center mb-8">Discover Your Dream Destinations</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src="https://placehold.co/300x200"
            alt="Destination 1"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold">Destination 1</h3>
            <p class="text-gray-600">Description of Destination 1.</p>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src="https://placehold.co/300x200"
            alt="Destination 2"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold">Destination 2</h3>
            <p class="text-gray-600">Description of Destination 2.</p>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src="https://placehold.co/300x200"
            alt="Destination 3"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold">Destination 3</h3>
            <p class="text-gray-600">Description of Destination 3.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16">
      <h2 class="text-3xl font-bold text-center mb-8">FAQ</h2>
      <div class="max-w-7xl mx-auto">
        <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-lg shadow-lg mb-4">
          <button
            @click="toggleFAQ(index)"
            class="w-full text-left p-4 flex justify-between items-center"
          >
            <span class="font-bold">{{ faq.question }}</span>
            <svg
              :class="{'transform rotate-180': faq.isOpen}"
              class="w-4 h-4 transition-transform"
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
          <div v-if="faq.isOpen" class="p-4 text-gray-600">{{ faq.answer }}</div>
        </div>
      </div>
    </section>

    <!-- Explore by Location Section -->
    <section class="py-16">
      <h2 class="text-3xl font-bold text-center mb-8">Explore by Location</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img src="https://placehold.co/300x200" alt="Location 1" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Location 1</h3>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img src="https://placehold.co/300x200" alt="Location 2" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Location 2</h3>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img src="https://placehold.co/300x200" alt="Location 3" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Location 3</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
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
      ],
      faqs: [
        {
          question: "What is Anajak Travel?",
          answer:
            "Anajak Travel is a travel agency that offers various travel services.",
          isOpen: false
        },
        {
          question: "How can I book a trip?",
          answer:
            "You can book a trip through our website or contact our support.",
          isOpen: false
        },
        {
          question: "What destinations do you cover?",
          answer:
            "We cover a wide range of destinations across Cambodia and beyond.",
          isOpen: false
        }
      ]
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    goToContactPage() {
      this.$router.push('/contact'); // Use Vue Router to navigate to contact page
    },
    startSlideshow() {
      setInterval(this.nextSlide, 5000); // Change slide every 5 seconds
    }
  },
  mounted() {
    this.startSlideshow();
  }
};
</script>

<style scoped>
/* Additional styles can be added here */
</style>