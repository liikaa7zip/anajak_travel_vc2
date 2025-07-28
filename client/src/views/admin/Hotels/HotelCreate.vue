<template>
  <div class="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded">
    <h2 class="text-2xl font-bold mb-4">Create New Hotel</h2>
    <form @submit.prevent="submitHotel" class="space-y-4">
      <input v-model="form.name" placeholder="Hotel Name" class="input" required />
      <textarea v-model="form.description" placeholder="Description" class="input" />
      <input v-model.number="form.pricePerNight" type="number" placeholder="Price Per Night" class="input" required />

      <select v-model="form.locationId" class="input" required>
        <option disabled value="">Select Location</option>
        <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
      </select>

      <input type="file" @change="handleImage" class="input" />
      <img v-if="imagePreview" :src="imagePreview" class="h-32 object-cover rounded" />

      <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const form = ref({
  name: '',
  description: '',
  pricePerNight: '',
  locationId: '',
  amenities: ''
});

const locations = ref([]);
const selectedImage = ref(null);
const imagePreview = ref(null);

const handleImage = (e) => {
  selectedImage.value = e.target.files[0];
  imagePreview.value = URL.createObjectURL(selectedImage.value);
};

const submitHotel = async () => {
  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }
  if (selectedImage.value) {
    formData.append('image', selectedImage.value);
  }

  await api.post('/hotels', formData);
  alert('Hotel created!');
};

onMounted(async () => {
  const res = await api.get('/locations');
  locations.value = res.data;
});
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
</style>
