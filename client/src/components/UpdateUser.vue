<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['user'])
const emit = defineEmits(['close', 'updated'])

// Create a local copy of user to edit
const form = ref({ ...props.user })

const updateUser = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${form.value.id}`, form.value)

    // Emit the updated user to parent
    emit('updated', response.data) // or form.value if response doesn’t return updated data
    emit('close')
  } catch (error) {
    console.error('Failed to update user:', error)
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Edit User</h2>

      <input v-model="form.name" placeholder="Name" class="w-full border mb-3 px-2 py-1 rounded" />
      <input v-model="form.email" placeholder="Email" class="w-full border mb-3 px-2 py-1 rounded" />
      <!-- Add other fields if needed -->

      <div class="flex justify-end gap-2">
        <button @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button @click="updateUser" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </div>
    </div>
  </div>
</template>
