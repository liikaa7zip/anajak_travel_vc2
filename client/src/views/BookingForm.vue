<template>
  <div class=" mt-0 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 md:max-w-3xl    md:shadow-2xl md:mx-auto">
    <!-- Hotel Image -->
    <img
      v-if="hotel && hotel.imageUrl"
      :src="hotel.imageUrl"
      alt="Hotel Image"
      class="w-full h-56 object-cover"
      @error="handleImageError"
    />

    <!-- Booking Form -->
    <div class="p-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">
        Book Your Stay at {{ hotel?.name || 'Hotel' }}
      </h2>

      <form @submit.prevent="submitBooking" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1">Check-in Date</label>
          <input v-model="checkInDate" type="date" class="w-full border p-3 rounded focus:ring-2 focus:ring-green-400" required />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Check-out Date</label>
          <input v-model="checkOutDate" type="date" class="w-full border p-3 rounded focus:ring-2 focus:ring-green-400" required />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Guests</label>
          <input v-model.number="guests" type="number" min="1" class="w-full border p-3 rounded focus:ring-2 focus:ring-green-400" required />
        </div>

        <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded text-lg transition">
          Confirm Booking
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const router = useRouter();

const checkInDate = ref('');
const checkOutDate = ref('');
const guests = ref(1);
const hotel = ref(null);

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/600x300?text=Hotel+Image';
};

const submitBooking = async () => {
  await api.post('/hotel-bookings', {
    hotelId: parseInt(route.params.id),
    userId: 1,
    checkInDate: checkInDate.value,
    checkOutDate: checkOutDate.value,
    guests: guests.value,
    totalPrice: 100 * guests.value
  });
  router.push('/');
};

onMounted(async () => {
  try {
    const res = await api.get(`/hotels/${route.params.id}`);
    hotel.value = res.data;
  } catch (err) {
    console.error('Failed to load hotel details:', err);
  }
});
</script>
