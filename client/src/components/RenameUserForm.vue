<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Rename "{{ user }}"</h2>
      <form @submit.prevent="submitRename">
        <input
          v-model="newUsername"
          class="w-full border px-4 py-2 rounded mb-4"
          placeholder="Enter new name"
          required
        />
        <div class="flex justify-end space-x-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Rename</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  user: String,
})

const emit = defineEmits(['close', 'renamed'])

const newUsername = ref(props.user || '')

watch(() => props.user, (val) => {
  newUsername.value = val
})

function submitRename() {
  const trimmed = newUsername.value.trim()
  if (trimmed && trimmed !== props.user) {
    emit('renamed', trimmed)
  }
  emit('close')
}
</script>
