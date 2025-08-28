<template>
  <div class="font-khmer max-w-3xl mx-auto p-6 space-y-8">
    <!-- Review List -->
    <div>
      <h2 class="text-3xl font-bold mb-6 text-gray-800">{{ $t("Reviews.Title") }}</h2>

      <div v-if="reviews.length">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="mb-6 p-6 rounded-2xl border bg-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <div class="flex gap-4">
            <!-- Image (show only first one if exists) -->
            <div v-if="review.images?.length" class="flex-shrink-0">
              <img
                :src="review.images[0]"
                class="w-28 h-28 object-cover rounded-xl shadow-md"
              />
            </div>

            <!-- Content -->
            <div class="flex-1">
              <!-- User info -->
              <div class="flex items-center mb-3">
                <div
                  class="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full"
                >
                  {{ review.user?.username?.charAt(0).toUpperCase() || "U" }}
                </div>
                <div class="ml-3">
                  <p class="font-semibold text-gray-900">
                    {{ review.user?.username || "Anonymous" }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ $t("Reviews.Posted") }} {{ new Date(review.createdAt).toLocaleDateString() }}
                  </p>
                </div>
              </div>

              <!-- Rating stars -->
              <div class="flex items-center mb-2">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-lg transition"
                  :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                >
                  ★
                </span>
              </div>

              <!-- Comment -->
              <p class="text-gray-700 leading-relaxed">
                {{ review.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center text-gray-500 italic">
        {{ $t("Reviews.NoReviews") }}
      </div>
    </div>

    <!-- Write Review (only if logged in) -->
    <div v-if="isLoggedIn" class="bg-white p-6 rounded-2xl shadow-md border">
      <h2 class="text-2xl font-bold mb-5 text-gray-800">{{ $t("Reviews.WriteReview") }}</h2>

      <!-- Rating -->
      <div class="flex items-center mb-4">
        <span
          v-for="i in 5"
          :key="i"
          class="cursor-pointer text-3xl transition transform hover:scale-110"
          :class="i <= rating ? 'text-yellow-400' : 'text-gray-300'"
          @click="rating = i"
        >
          ★
        </span>
      </div>

      <!-- Comment -->
      <textarea
        v-model="comment"
        placeholder="Share your experience..."
        class="w-full border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        rows="4"
      ></textarea>

      <!-- Image input -->
      <div class="flex items-center space-x-2 mb-4">
        <input
          v-model="imageUrl"
          type="text"
          placeholder="Paste an image URL"
          class="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        <button
          @click="addImage"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
        >
          {{ $t("Reviews.Add") }}
        </button>
      </div>

      <!-- Image preview -->
      <div class="flex flex-wrap gap-3 mb-4">
        <div
          v-for="(img, idx) in images"
          :key="idx"
          class="relative w-24 h-24"
        >
        <img
          :src="getReviewImage(review)"
          class="w-28 h-28 object-cover rounded-xl shadow-md"
        />
          <button
            @click="removeImage(idx)"
            class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Submit -->
      <button
        @click="submitReview"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
      >
        {{ $t("Reviews.SubmitReview") }}
      </button>
    </div>

    <!-- Not logged in -->
    <div v-else class="text-center text-gray-500 italic">
      {{ $t("Reviews.NotLogIn") }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"

// State
const reviews = ref([])
const rating = ref(0)
const comment = ref("")
const imageUrl = ref("")
const images = ref([])

// Check login
const isLoggedIn = computed(() => !!localStorage.getItem("token"))

// ✅ Helper function to safely get first image
const getReviewImage = (review) => {
  return review.images?.[0] || "https://via.placeholder.com/150"
}

// Fetch reviews on load
const fetchReviews = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/reviews")
    reviews.value = res.data
  } catch (err) {
    console.error("Error fetching reviews", err)
  }
}

// Add image
const addImage = () => {
  if (imageUrl.value.trim()) {
    images.value.push(imageUrl.value.trim())
    imageUrl.value = ""
  }
}

const removeImage = (idx) => {
  images.value.splice(idx, 1)
}

// Submit review
const submitReview = async () => {
  const token = localStorage.getItem("token")
  if (!token) return alert("You must log in first!")

  try {
    const newReview = {
      userId: JSON.parse(localStorage.getItem("user")).id,
      rating: rating.value,
      comment: comment.value,
      images: images.value
    }

    const res = await axios.post("http://localhost:5000/api/reviews", newReview, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // Push new review into list
    reviews.value.unshift(res.data)

    // Reset form
    rating.value = 0
    comment.value = ""
    images.value = []

    alert("Review submitted successfully!")
  } catch (err) {
    alert("Error submitting review: " + (err.response?.data?.message || err.message))
  }
}

onMounted(fetchReviews)
</script>

