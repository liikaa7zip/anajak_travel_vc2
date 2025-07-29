<template>
  <div class="max-w-xl mx-auto mt-10 p-4">
    <input
      v-model="question"
      placeholder="Ask for travel advice..."
      class="w-full p-2 border rounded mb-4"
    />
    <button
      @click="sendQuestion"
      :disabled="loading || !question.trim()"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Ask
    </button>

    <div v-if="loading" class="mt-4 text-gray-600">Loading...</div>
    <div v-if="answer" class="mt-4 text-green-800">{{ answer }}</div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios'; // ✅ Required to use axios

const question = ref('');
const answer = ref('');
const loading = ref(false);

const sendQuestion = async () => {
  loading.value = true;
  answer.value = '';
  try {
    const res = await axios.post('http://localhost:5000/api/recommend', {
      message: question.value,
    });
    answer.value = res.data.reply;
  } catch (error) {
    console.error('Failed to get answer. Please try again.', error);
    answer.value = 'Failed to get answer. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>
.answer-box {
  padding: 1em;
  background-color: #f0f4f8;
  border-radius: 8px;
  white-space: pre-wrap;
}
</style>
