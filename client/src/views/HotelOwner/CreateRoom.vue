<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
    <h2 class="text-2xl font-bold text-purple-600 mb-6">Create New Room</h2>

<form @submit.prevent="submitRoom" class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Room Number -->
  <div class="relative">
    <input type="text" v-model="room.roomNumber" id="roomNumber" class="input-floating" placeholder=" " required />
    <label for="roomNumber">Room Number</label>
  </div>

  <!-- Room Type -->
  <div class="relative">
    <input type="text" v-model="room.type" id="roomType" class="input-floating" placeholder=" " required />
    <label for="roomType">Room Type</label>
  </div>

  <!-- Type Price -->
  <div class="relative">
    <input type="number" v-model.number="room.typePrice" id="typePrice" class="input-floating" min="0" step="0.01" placeholder=" " @input="calculatePrice" />
    <label for="typePrice">Type Price ($)</label>
  </div>

  <!-- Room Category -->
  <div class="relative">
    <select v-model="room.categoryId" @change="onCategoryChange" id="category" class="input-floating">
      <option value="">Select a category</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>
    <label for="category">Room Category</label>
  </div>

  <!-- Max Occupancy -->
  <div class="relative">
    <input type="number" v-model.number="room.maxOccupancy" id="maxOccupancy" class="input-floating" min="1" required placeholder=" " />
    <label for="maxOccupancy">Max Occupancy</label>
  </div>

  <!-- Price Per Night -->
  <div class="relative">
    <input type="number" v-model.number="room.pricePerNight" id="pricePerNight" class="input-floating bg-purple-50" readonly placeholder=" " />
    <label for="pricePerNight">Price Per Night ($)</label>
  </div>

  <!-- Room Description -->
<div class="md:col-span-2 relative">
  <textarea
    v-model="room.description"
    id="description"
    class="input-floating h-24 resize-none"
    placeholder=" "
    required
  ></textarea>
  <label for="description">Room Description</label>
</div>


  <!-- Amenities (full width) -->
  <div class="md:col-span-2">
    <label class="block text-gray-700 font-medium mb-2">Amenities</label>
    <div class="flex gap-2 flex-wrap mb-2">
      <span v-for="(amenity, index) in room.amenities" :key="index" class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1 transition hover:bg-purple-200">
        {{ amenity }}
        <button type="button" @click="removeAmenity(index)" class="text-purple-800 font-bold">&times;</button>
      </span>
    </div>
    <div class="flex gap-2">
      <input type="text" v-model="newAmenity" placeholder="Add amenity" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500 outline-none" @keyup.enter="addAmenity" />
      <button type="button" @click="addAmenity" class="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-600 transition">Add</button>
    </div>
  </div>

  <!-- Images (full width) -->
  <div class="md:col-span-2">
    <label class="block text-gray-700 font-medium mb-2">Upload Images</label>
    <div class="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center cursor-pointer hover:bg-purple-50 transition" @click="$refs.fileInput.click()">
      Drag & drop images here or click to upload
      <input type="file" ref="fileInput" @change="onFileChange" class="hidden" multiple />
    </div>
    <div class="mt-2 flex gap-2 flex-wrap">
      <div v-for="(img, index) in room.images" :key="index" class="relative">
        <img :src="img.preview" class="w-24 h-24 object-cover rounded-lg border" />
        <button type="button" @click="removeImage(index)" class="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 hover:bg-red-700">&times;</button>
      </div>
    </div>
  </div>

  <!-- Submit Button (full width) -->
  <div class="md:col-span-2">
    <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-600 transition">
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
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const room = ref({
  roomNumber: '',
  type: '',
  typePrice: null,        // price entered for room type
  pricePerNight: null,    // final price
  maxOccupancy: null,
  categoryId: '',
  amenities: [],
  images: [],
  description: '',
});

const newAmenity = ref('');
const categories = ref([]);
const message = ref('');
const error = ref('');

// Fetch categories for select
const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/hotel-owners/room-categories');
    categories.value = res.data;
  } catch (err) {
    console.error('Error fetching categories:', err);
  }
};

// When category changes, recalc price using category base + typePrice
const onCategoryChange = () => {
  const selectedCat = categories.value.find(cat => cat.id === room.value.categoryId);
  if (selectedCat) {
    room.value.pricePerNight = (room.value.typePrice || 0) + selectedCat.basePrice;
  } else {
    room.value.pricePerNight = room.value.typePrice || null;
  }
};

// Amenities
const addAmenity = () => {
  if (newAmenity.value.trim()) {
    room.value.amenities.push(newAmenity.value.trim());
    newAmenity.value = '';
  }
};
const removeAmenity = (index) => room.value.amenities.splice(index, 1);

// Images
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
const removeImage = (index) => room.value.images.splice(index, 1);

// Submit Room
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
    formData.append('description', room.value.description); // <-- Add this line

    room.value.images.forEach(img => {
      if (img.file) formData.append('images', img.file);
    });

    await axios.post('http://localhost:5000/api/hotel-owners/rooms', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    message.value = 'Room created successfully!';
    room.value = {
      roomNumber: '',
      type: '',
      typePrice: null,
      pricePerNight: null,
      maxOccupancy: null,
      categoryId: '',
      amenities: [],
      images: [],
      description: '' // Reset description
    };
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.error || 'Failed to create room';
  }
};


onMounted(fetchCategories);
</script>

<style scoped>
.input-floating {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1.2rem 0.75rem 0.4rem;
  outline: none;
  transition: all 0.2s;
}
.input-floating:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 2px rgba(124,58,237,0.2);
}
.input-floating + label {
  position: absolute;
  left: 0.75rem;
  top: 1.2rem;
  color: #9ca3af;
  font-size: 0.875rem;
  pointer-events: none;
  transition: all 0.2s;
}
.input-floating:focus + label,
.input-floating:not(:placeholder-shown) + label {
  top: 0.2rem;
  left: 0.75rem;
  font-size: 0.75rem;
  color: #7c3aed;
  background: white;
  padding: 0 0.25rem;
}
</style>
