<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['user'])
const emit = defineEmits(['close', 'updated'])

// Create a local copy of user to edit, preserving all fields
const form = ref({ ...props.user })

const updateUser = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${form.value.id}`, form.value)
    const updatedUser = response.data.id ? { ...props.user, ...response.data } : form.value
    emit('updated', updatedUser)
    emit('close')
  } catch (error) {
    console.error('Failed to update user:', error)
  }
}
</script>

<template>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
    <div class="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out border border-indigo-200">
      <h2 class="text-xl font-bold mb-4 text-indigo-800 flex items-center gap-2">
        <span class="material-icons">edit</span> Edit User
      </h2>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700">Username</label>
          <input v-model="form.username" placeholder="Username" class="w-full border border-gray-200 rounded-lg px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700">Email</label>
          <input v-model="form.email" placeholder="Email" class="w-full border border-gray-200 rounded-lg px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700">Role</label>
          <input v-model="form.role" placeholder="Role" class="w-full border border-gray-200 rounded-lg px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" placeholder="Password" class="w-full border border-gray-200 rounded-lg px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-medium text-gray-700">Status</label>
          <input v-model="form.status" placeholder="Status" class="w-full border border-gray-200 rounded-lg px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-medium text-gray-700">Created</label>
          <input v-model="form.created" placeholder="Created date" class="w-full border border-gray-200 rounded-lg px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" disabled />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-4">
        <button @click="emit('close')" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition duration-200 flex items-center gap-1">
          <span class="material-icons text-sm">cancel</span> 
        </button>
        <button @click="updateUser" class="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition duration-200 flex items-center gap-1">
          <span class="material-icons text-sm">save</span> 
        </button>
      </div>
    </div>
  </div>
</template>