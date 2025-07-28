<template>
  <div class="flex h-screen bg-gray-100">
    <!-- User list -->
    <div class="w-64 bg-white border-r shadow relative">
      <div class="p-4 text-lg font-bold border-b">👥 Users</div>
      <ul class="overflow-y-auto h-full">
        <li v-for="user in users" :key="user" class="relative group">
          <div
            @click="selectUser(user)"
            :class="[
              'p-4 pr-10 border-b cursor-pointer hover:bg-gray-100',
              selectedUser === user ? 'bg-gray-200 font-semibold' : ''
            ]"
          >
            {{ user }}
          </div>

          <!-- 3-dot menu -->
          <div class="absolute right-2 top-4">
            <button @click="toggleDropdown(user)" class="text-gray-600 hover:text-gray-900 focus:outline-none">
              ...
            </button>
          </div>

          <!-- Dropdown options -->
          <div
            v-if="dropdownUser === user"
            class="absolute right-2 mt-1 z-10 bg-white border rounded shadow-lg text-sm"
          >
            <button
              @click="renameUser(user)"
              class="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              ✏️ Rename
            </button>

            <button
              @click="deleteUser(user)"
              class="block px-4 py-2 hover:bg-gray-100 text-red-600 w-full text-left"
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chat window -->
    <div class="flex-1 flex flex-col">
      <div class="p-4 bg-white border-b shadow flex items-center justify-between">
        <h2 class="text-xl font-bold">Chat with {{ selectedUser || '...' }}</h2>
      </div>

      <!-- Chat messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <div
          v-for="(msg, index) in chatMessages"
          :key="index"
          :class="msg.sender === adminName ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block px-4 py-2 rounded-lg max-w-xs',
              msg.sender === adminName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            ]"
          >
            {{ msg.message }}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            {{ formatDate(msg.createdAt) }}
          </div>
        </div>
      </div>

      <!-- Message input -->
      <div class="p-4 bg-white border-t flex gap-2">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          class="flex-1 border border-gray-300 rounded px-4 py-2"
          placeholder="Type your message"
        />
        <button
          @click="sendMessage"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      <!-- Popup -->
      <div
        v-if="popupMessage"
        class="fixed bottom-4 right-4 bg-white border shadow-lg px-4 py-2 rounded text-sm text-gray-800"
      >
        {{ popupMessage }}
      </div>
    </div>

    <!-- Rename Modal -->
    <RenameUserForm
      v-if="showRenameModal"
      :user="renameTarget"
      @close="showRenameModal = false"
      @renamed="(newName) => handleRename({ oldUsername: renameTarget, newUsername: newName })"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import RenameUserForm from '@/components/RenameUserForm.vue'

const adminName = 'admin'
const socket = io('http://localhost:5000')

const users = ref([])
const selectedUser = ref('')
const chatMessages = ref([])
const newMessage = ref('')
const dropdownUser = ref(null)
const popupMessage = ref('')
const popupType = ref('')
const showRenameModal = ref(false)
const renameTarget = ref('')

let popupTimeout = null

function showPopup(message, type = 'success') {
  popupMessage.value = message
  popupType.value = type
  if (popupTimeout) clearTimeout(popupTimeout)
  popupTimeout = setTimeout(() => {
    popupMessage.value = ''
  }, 3000)
}

async function fetchUsers() {
  try {
    const res = await axios.get('http://localhost:5000/api/messages/users')
    users.value = res.data
    if (res.data.length > 0) {
      selectedUser.value = res.data[0]
      loadChatWithUser()
    }
  } catch (e) {
    console.error('fetchUsers error', e)
  }
}

async function loadChatWithUser() {
  if (!selectedUser.value) {
    chatMessages.value = []
    return
  }
  try {
    const res = await axios.get(
      `http://localhost:5000/api/messages/conversation?user1=${adminName}&user2=${selectedUser.value}`
    )
    chatMessages.value = res.data
  } catch (e) {
    console.error('loadChatWithUser error', e)
  }
}

function selectUser(user) {
  selectedUser.value = user
  loadChatWithUser()
}

function sendMessage() {
  if (!newMessage.value.trim() || !selectedUser.value) return
  const msg = {
    sender: adminName,
    receiver: selectedUser.value,
    message: newMessage.value.trim(),
  }
  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      chatMessages.value.push({ ...msg, createdAt: new Date().toISOString() })
      newMessage.value = ''
    } else {
      alert('Message send failed')
    }
  })
}

socket.on('receive_message', (msg) => {
  const isRelevant =
    (msg.sender === adminName && msg.receiver === selectedUser.value) ||
    (msg.sender === selectedUser.value && msg.receiver === adminName)
  if (isRelevant) {
    chatMessages.value.push(msg)
  }
})

function toggleDropdown(user) {
  dropdownUser.value = dropdownUser.value === user ? null : user
}

function renameUser(user) {
  renameTarget.value = user
  showRenameModal.value = true
  dropdownUser.value = null
}

async function handleRename({ oldUsername, newUsername }) {
  try {
    const res = await axios.put('http://localhost:5000/api/messages/rename', {
      oldUsername,
      newUsername
    })

    showPopup(res.data.message || 'User renamed')
    users.value = users.value.map(u => u === oldUsername ? newUsername : u)
    if (selectedUser.value === oldUsername) {
      selectedUser.value = newUsername
    }
  } catch (err) {
    console.error('Rename error', err)
    showPopup('❌ Rename failed', 'error')
  }
  showRenameModal.value = false
}

async function deleteUser(user) {
  if (!confirm(`Are you sure you want to delete all messages from '${user}'?`)) return
  try {
    await axios.delete(`http://localhost:5000/api/messages/user/${user}`)
    users.value = users.value.filter(u => u !== user)
    if (selectedUser.value === user) {
      selectedUser.value = users.value[0] || ''
      await loadChatWithUser()
    }
    showPopup(`🗑️ Messages from '${user}' have been deleted.`)
  } catch (err) {
    console.error('Delete error', err)
    showPopup('❌ Error deleting user messages', 'error')
  }
  dropdownUser.value = null
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleTimeString()
}

onMounted(() => {
  socket.emit('join', adminName)
  fetchUsers()
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>
