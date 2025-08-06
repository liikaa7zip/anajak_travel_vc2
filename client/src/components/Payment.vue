<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
    <div
      class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fadeIn"
      @keydown.esc="$emit('cancel')"
    >
      <h2 class="text-2xl font-semibold mb-4">Complete Your Payment</h2>

      <div class="mb-4 text-gray-700">
        <p><strong>Booking:</strong> {{ bookingType }} #{{ bookingId }}</p>
        <p><strong>Amount Due:</strong> ${{ amount.toFixed(2) }}</p>
      </div>

      <form @submit.prevent="submitPayment" novalidate>
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700" for="cardName">Cardholder Name</label>
          <input
            id="cardName"
            v-model="cardName"
            type="text"
            placeholder="Name on card"
            required
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700" for="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            v-model="cardNumber"
            type="text"
            inputmode="numeric"
            maxlength="19"
            placeholder="1234 5678 9012 3456"
            @input="formatCardNumber"
            required
            class="w-full border rounded px-3 py-2 tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div class="flex space-x-4 mb-4">
          <div class="flex-1">
            <label class="block mb-1 font-medium text-gray-700" for="expiry">Expiry (MM/YY)</label>
            <input
              id="expiry"
              v-model="expiry"
              type="text"
              maxlength="5"
              placeholder="MM/YY"
              @input="formatExpiry"
              required
              class="w-full border rounded px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div class="flex-1">
            <label class="block mb-1 font-medium text-gray-700" for="cvv">CVV</label>
            <input
              id="cvv"
              v-model="cvv"
              type="password"
              maxlength="4"
              placeholder="123"
              required
              class="w-full border rounded px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="mb-3 text-red-600 font-medium">{{ errorMessage }}</div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('cancel')"
            :disabled="loading"
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
          >
            <span v-if="loading" class="inline-block animate-spin mr-2">⏳</span>
            Pay ${{ amount.toFixed(2) }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  amount: { type: Number, required: true },
  bookingType: { type: String, required: true },
  bookingId: { type: [String, Number], required: true },
})

const emit = defineEmits(['paid', 'cancel'])

const cardName = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')
const loading = ref(false)
const errorMessage = ref('')

function formatCardNumber() {
  cardNumber.value = cardNumber.value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry() {
  const cleaned = expiry.value.replace(/\D/g, '')
  if (cleaned.length >= 3) {
    expiry.value = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
  } else {
    expiry.value = cleaned
  }
}

function validate() {
  if (!cardName.value) {
    errorMessage.value = 'Cardholder name is required.'
    return false
  }
  if (!/^(\d{4} ){3}\d{4}$/.test(cardNumber.value)) {
    errorMessage.value = 'Card number must be 16 digits.'
    return false
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value)) {
    errorMessage.value = 'Expiry date must be MM/YY.'
    return false
  }
  if (!/^\d{3,4}$/.test(cvv.value)) {
    errorMessage.value = 'CVV must be 3 or 4 digits.'
    return false
  }
  errorMessage.value = ''
  return true
}

async function submitPayment() {
  if (!validate()) return

  loading.value = true
  errorMessage.value = ''

  try {
    await axios.post('http://localhost:5000/api/payments', {
      bookingId: props.bookingId,
      bookingType: props.bookingType,
      amount: props.amount,
      method: 'Credit Card',
      cardName: cardName.value,
    })

    emit('paid', {
      method: 'Credit Card',
      cardName: cardName.value,
      bookingId: props.bookingId,
      amount: props.amount,
    })
  } catch (error) {
    errorMessage.value = 'Payment failed, please try again.'
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
