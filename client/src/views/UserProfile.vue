<template>
  <div class="max-w-3xl mx-auto mt-10">
    <!-- Profile Card -->
    <div class="bg-white shadow-2xl rounded-3xl p-6">
      <!-- Profile Image -->
      <div class="flex flex-col items-center">
        <div
          class="relative w-36 h-36 border-4 border-pink-400 rounded-full overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <img
  :src="preview || user.profileImageUrl"
  alt="Profile"
  class="w-full h-full object-cover"
  @error="onImageError"
/>

          <input type="file" ref="fileInput" class="hidden" @change="onFileChange" />
          <div
            v-if="!preview && !user.profileImageUrl"
            class="absolute inset-0 flex items-center justify-center text-pink-500 font-bold"
          >
            Upload
          </div>
        </div>
        <!-- Upload New Image Button -->
        <button
          class="mt-3 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
          @click="selectFile"
        >
          Upload New Image
        </button>

        <h3 class="mt-4 text-2xl font-bold text-gray-800">{{ user.username }}</h3>
        <p class="text-gray-600">{{ user.email }}</p>
        <p class="text-sm text-gray-500 capitalize">{{ user.role }}</p>
        <p class="mt-2 text-gray-700 italic" v-if="user.bio">“{{ user.bio }}”</p>
        <p class="mt-2 text-gray-400 italic" v-else>Bio not provided.</p>
      </div>

      <!-- Travel Stats -->
      <div class="grid grid-cols-3 gap-6 mt-6 text-center">
        <div class="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-lg font-bold text-pink-600">{{ stats.trips }}</p>
          <p class="text-gray-600 text-sm">Trips</p>
        </div>
        <div class="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-lg font-bold text-purple-600">{{ stats.countries }}</p>
          <p class="text-gray-600 text-sm">Countries</p>
        </div>
        <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-lg font-bold text-indigo-600">{{ stats.favorites }}</p>
          <p class="text-gray-600 text-sm">Favorites</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-8">
        <div class="flex gap-6 border-b overflow-x-auto">
          <button
            class="pb-2 text-lg font-semibold"
            :class="activeTab === 'profile' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'"
            @click="activeTab = 'profile'"
          >
            Profile Info
          </button>
          <button
            class="pb-2 text-lg font-semibold"
            :class="activeTab === 'activity' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'"
            @click="activeTab = 'activity'"
          >
            Travel History
          </button>
          <button
            class="pb-2 text-lg font-semibold"
            :class="activeTab === 'upcoming' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'"
            @click="activeTab = 'upcoming'"
          >
            Upcoming Trips
          </button>
          <button
            class="pb-2 text-lg font-semibold"
            :class="activeTab === 'badges' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'"
            @click="activeTab = 'badges'"
          >
            Badges
          </button>
        </div>

        <!-- Profile Info -->
        <div v-if="activeTab === 'profile'" class="mt-4">
          <form @submit.prevent="saveProfile" class="flex flex-col gap-4">
            <div>
              <label class="block mb-1 font-semibold">Username</label>
              <input v-model="form.username" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
            <div>
              <label class="block mb-1 font-semibold">Email</label>
              <input v-model="form.email" type="email" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
            <div>
              <label class="block mb-1 font-semibold">Bio</label>
              <textarea v-model="form.bio" rows="2" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-400"></textarea>
            </div>
            <button type="submit" class="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
              Save Changes
            </button>
          </form>
        </div>

        <!-- Travel History -->
        <div v-if="activeTab === 'activity'" class="mt-4">
          <ul class="divide-y">
            <li v-for="(item, index) in recentActivity" :key="index" class="py-2 flex justify-between">
              <span class="font-semibold">{{ item.destination }}</span>
              <span class="text-gray-500">{{ item.date }}</span>
            </li>
            <li v-if="recentActivity.length === 0" class="text-gray-400 text-center py-4">No trips yet</li>
          </ul>
        </div>

        <!-- Upcoming Trips -->
        <div v-if="activeTab === 'upcoming'" class="mt-4">
          <ul class="space-y-3">
            <li v-for="(trip, i) in upcomingTrips" :key="i" class="p-3 bg-gray-50 rounded-lg shadow flex justify-between">
              <span>✈️ {{ trip.destination }}</span>
              <span class="text-gray-500">{{ trip.date }}</span>
            </li>
            <li v-if="upcomingTrips.length === 0" class="text-gray-400 text-center py-4">No upcoming trips</li>
          </ul>
        </div>

        <!-- Badges -->
        <div v-if="activeTab === 'badges'" class="mt-4 flex gap-3 flex-wrap">
          <span v-for="(badge, i) in badges" :key="i"
            class="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full shadow text-sm font-semibold">
            🏅 {{ badge }}
          </span>
          <span v-if="badges.length === 0" class="text-gray-400">No badges earned yet</span>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="successMessage"
      class="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce"
    >
      {{ successMessage }}
    </div>

    <!-- Login Prompt -->
    <div v-if="!isLoggedIn" class="text-center text-red-500 font-bold py-8">
      Please log in to view your profile.
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeTab: "profile",
      user: { profileImageUrl: "/default-profile.png", bio: "" },
      form: { username: "", email: "", bio: "" },
      selectedFile: null,
      preview: null,
      successMessage: "",
      stats: { trips: 0, countries: 0, favorites: 0 },
      recentActivity: [],
      upcomingTrips: [],
      badges: [],
      isLoggedIn: !!localStorage.token,
      fallbackImage: "http://localhost:5000/uploads/profile/default.png"

    };
  },
  mounted() {
    if (this.isLoggedIn) {
      this.loadProfile();
    }
  },
  methods: {
    async loadProfile() {
      if (!localStorage.token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: "Bearer " + localStorage.token },
        });

        const imageUrl =
  res.data.profileImage && res.data.profileImage !== "default.png"
    ? `http://localhost:5000/uploads/profile/${res.data.profileImage}`
    : `http://localhost:5000/uploads/profile/default.png`; // always absolute

        this.user = { ...res.data, profileImageUrl: imageUrl, bio: res.data.bio || "" };
        this.preview = null; // Only use preview for temporary preview during upload

        this.form.username = res.data.username;
        this.form.email = res.data.email;
        this.form.bio = res.data.bio || "";
        this.stats = res.data.stats || { trips: 0, countries: 0, favorites: 0 };
        this.recentActivity = res.data.recentActivity || [];
        this.upcomingTrips = res.data.upcomingTrips || [];
        this.badges = res.data.badges || [];
      } catch (err) {
        console.error(err);
        alert("Failed to load profile.");
      }
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.selectedFile = file;
      this.preview = URL.createObjectURL(file);
      this.uploadImage();
    },
    handleDrop(e) {
      const file = e.dataTransfer.files[0];
      if (!file) return;

      this.selectedFile = file;
      this.preview = URL.createObjectURL(file);
      this.uploadImage();
    },
    async uploadImage() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append("profileImage", this.selectedFile);

      try {
        const res = await axios.post(
          "http://localhost:5000/api/users/profile/image",
          formData,
          { headers: { Authorization: "Bearer " + localStorage.token } }
        );

        // After upload, reload profile from database and clear preview
        this.selectedFile = null;
        this.preview = null;
        this.successMessage = "Profile image updated!";
        setTimeout(() => (this.successMessage = ""), 3000);
        this.loadProfile();
      } catch (err) {
        console.error(err);
        alert("Failed to upload image.");
      }
    },
    async saveProfile() {
      try {
        await axios.put("http://localhost:5000/api/users/profile", this.form, {
          headers: { Authorization: "Bearer " + localStorage.token },
        });
        this.successMessage = "Profile info updated!";
        setTimeout(() => (this.successMessage = ""), 3000);
        this.loadProfile();
      } catch (err) {
        console.error(err);
        alert("Failed to save profile.");
      }
    },
    onImageError(e) {
  if (e.target.src !== "http://localhost:5000/uploads/profile/default.png") {
    e.target.src = "http://localhost:5000/uploads/profile/default.png";
  }
},
  },
};


</script>
