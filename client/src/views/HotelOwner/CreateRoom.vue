<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
    <h2 class="text-2xl font-bold text-purple-600 mb-6">Create New Room</h2>

    <form @submit.prevent="submitRoom" class="space-y-4">
      <!-- Room Number -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Room Number</label>
        <input
          type="text"
          v-model="room.roomNumber"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          required
        />
      </div>

      <!-- Room Type -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Room Type</label>
        <input
          type="text"
          v-model="room.type"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="e.g., Deluxe, Suite"
          required
        />
      </div>

      <!-- Price -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Price Per Night ($)</label>
        <input
          type="number"
          v-model.number="room.pricePerNight"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          min="0"
          step="0.01"
          required
        />
      </div>

      <!-- Max Occupancy -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Max Occupancy</label>
        <input
          type="number"
          v-model.number="room.maxOccupancy"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          min="1"
          required
        />
      </div>

      <!-- Room Category -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Room Category</label>
        <select
          v-model="room.categoryId"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="">Select a category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Amenities -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Amenities</label>
        <div class="flex gap-2 flex-wrap">
          <span
            v-for="(amenity, index) in room.amenities"
            :key="index"
            class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1"
          >
            {{ amenity }}
            <button type="button" @click="removeAmenity(index)" class="text-purple-800 font-bold">&times;</button>
          </span>
        </div>
        <div class="flex mt-2 gap-2">
          <input
            type="text"
            v-model="newAmenity"
            placeholder="Add amenity"
            class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button type="button" @click="addAmenity" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Add
          </button>
        </div>
      </div>

      <!-- Images -->
      <!-- Images -->
<div>
  <label class="block text-gray-700 font-medium mb-1">Upload Images</label>
  <input
    type="file"
    @change="onFileChange"
    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
    multiple
  />
  <div class="mt-2 flex gap-2 flex-wrap">
    <img
      v-for="(img, index) in room.images"
      :key="index"
      :src="img.preview"
      class="w-24 h-24 object-cover rounded-lg border"
      alt="Room Image"
    />
  </div>
</div>




      <!-- Submit Button -->
      <div class="mt-6">
        <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">
          Create Room
        </button>
      </div>
    </form>

    <!-- Feedback -->
    <div v-if="message" class="mt-4 text-center text-green-600 font-medium">{{ message }}</div>
    <div v-if="error" class="mt-4 text-center text-red-600 font-medium">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const room = ref({
  roomNumber: '',
  type: '',
  pricePerNight: null,
  maxOccupancy: null,
  categoryId: '',
  amenities: [],
  images: [],
});

const newAmenity = ref('');
const categories = ref([]);
const message = ref('');
const error = ref('');

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/hotel-owners/room-categories');
    categories.value = res.data;
  } catch (err) {
    console.error('Error fetching categories:', err);
  }
};

const addAmenity = () => {
  if (newAmenity.value.trim() && !room.value.amenities.includes(newAmenity.value.trim())) {
    room.value.amenities.push(newAmenity.value.trim());
    newAmenity.value = '';
  }
};

const removeAmenity = (index) => {
  room.value.amenities.splice(index, 1);
};

const removeImage = (index) => {
  room.value.images.splice(index, 1);
};

const submitRoom = async () => {
  try {
    message.value = '';
    error.value = '';

    const formData = new FormData();
    formData.append('roomNumber', room.value.roomNumber);
    formData.append('type', room.value.type);
    formData.append('pricePerNight', room.value.pricePerNight);
    formData.append('maxOccupancy', room.value.maxOccupancy);
    formData.append('categoryId', room.value.categoryId);
    formData.append('amenities', JSON.stringify(room.value.amenities));

    // Append files
    room.value.images.forEach(img => {
      if (img.file) formData.append('images', img.file);
    });

    const res = await axios.post('http://localhost:5000/api/hotel-owners/rooms', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    message.value = 'Room created successfully!';
    room.value = { roomNumber: '', type: '', pricePerNight: null, maxOccupancy: null, categoryId: '', amenities: [], images: [] };
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.error || 'Failed to create room';
  }
};


const onFileChange = (e) => {
  const files = e.target.files;
  room.value.images = [];
  for (let i = 0; i < files.length; i++) {
    room.value.images.push({
      file: files[i],
      preview: URL.createObjectURL(files[i]),
    });
  }
};


const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    room.value.images[index].file = file;
    room.value.images[index].preview = URL.createObjectURL(file);
  }
};

onMounted(fetchCategories);
</script>

<style scoped>
/* Optional: add smooth hover/transition effects */
</style>
