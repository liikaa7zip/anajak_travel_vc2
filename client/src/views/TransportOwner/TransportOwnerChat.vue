<template>
  <div class="flex h-screen bg-gray-50 text-gray-800">
    <!-- Sidebar: User List -->
    <aside class="w-72 bg-white border-r shadow-md flex flex-col">
      <header class="p-5 border-b font-semibold text-lg text-purple-700 select-none">
        👥 Users
      </header>
      <ul class="flex-1 overflow-y-auto">
        <li
          v-for="user in users"
          :key="user.id"
          class="relative"
        >
          <button
            @click="selectUser(user)"
            :class="[
              'flex items-center gap-3 w-full text-left px-5 py-3 border-b hover:bg-purple-50 transition rounded-r-md',
              selectedUser === user ? 'bg-purple-100 font-semibold' : ''
            ]"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-purple-200 text-purple-700 font-bold select-none"
            >
              {{ getInitials(user) }}
            </div>
            <span class="truncate">{{ usernameFromEmail(user) }}</span>
          </button>

          <!-- Dropdown -->
          <div class="absolute right-4 top-4">
            <button
              @click="toggleDropdown(user)"
              class="text-gray-500 hover:text-purple-700 focus:outline-none"
              aria-label="User options"
            >
              ⋮
            </button>
          </div>

          <div
            v-if="dropdownUser === user"
            class="absolute right-5 top-11 bg-white shadow-lg rounded-md border z-20 w-36"
          >
            <button
              @click="renameUser(user)"
              class="w-full px-4 py-2 text-left hover:bg-purple-50 text-purple-700 font-medium rounded-t-md"
            >
              ✏️ Rename
            </button>
            <button
              @click="deleteUser(user)"
              class="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 font-medium rounded-b-md"
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      </ul>
    </aside>

    <!-- Chat Window -->
    <section class="flex flex-col flex-1">
      <header
        class="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm"
      >
        <h2 class="text-xl font-semibold truncate">
          Chat with
          <span class="text-purple-700">
            {{ selectedUser ? selectedUser.username || selectedUser.email : '...' }}
          </span>
        </h2>
      </header>

      <main
        ref="chatContainer"
        class="flex-1 px-6 py-5 overflow-y-auto space-y-4 bg-white"
      >
        <div
          v-for="(msg, index) in chatMessages"
          :key="index"
          :class="[
            'flex items-end max-w-full',
            msg.senderId === transportOwner.id ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'relative inline-block px-5 py-3 rounded-2xl break-words max-w-[60%] shadow-md',
              msg.senderId === transportOwner.id
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-purple-100 text-purple-900 rounded-bl-none'
            ]"
          >
            {{ msg.message }}

            <!-- Bubble tail -->
            <span
              :class="[
                'absolute bottom-0 w-4 h-4 bg-inherit',
                msg.senderId === transportOwner.id
                  ? 'right-0 -mr-2 rounded-bl-2xl rotate-45 origin-bottom-left'
                  : 'left-0 -ml-2 rounded-br-2xl rotate-45 origin-bottom-right'
              ]"
            ></span>

            <div class="text-xs mt-1 opacity-70 select-none">
              {{ formatDate(msg.createdAt) }}
            </div>
          </div>
        </div>
      </main>

      <footer
        class="flex items-center gap-4 px-6 py-4 bg-white border-t shadow-sm"
      >
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          class="flex-1 border border-purple-300 rounded-full px-4 py-2 text-gray-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Type your message"
        />
        <button
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white rounded-full px-6 py-2 font-semibold transition"
        >
          Send
        </button>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

// Current user
const transportOwner = JSON.parse(localStorage.getItem('user'))

const users = ref([])
const selectedUser = ref(null)
const chatMessages = ref([])
const newMessage = ref('')
const dropdownUser = ref(null)
const chatContainer = ref(null)

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

async function fetchUsers() {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/messages/users/${transportOwner.id}`
    )
    users.value = res.data
    if (users.value.length > 0) {
      selectedUser.value = users.value[0]
      await loadChatWithUser()
      scrollToBottom()
    }
  } catch (e) {
    console.error('fetchUsers error', e)
  }
}

async function loadChatWithUser() {
  if (!selectedUser.value || !selectedUser.value.id) {
    chatMessages.value = []
    return
  }
  try {
    const res = await axios.get(
      `http://localhost:5000/api/messages/conversation?user1=${transportOwner.id}&user2=${selectedUser.value.id}`
    )
    chatMessages.value = res.data
    scrollToBottom()
  } catch (e) {
    console.error('loadChatWithUser error', e)
  }
}

function selectUser(user) {
  selectedUser.value = user
  loadChatWithUser()
}

function usernameFromEmail(user) {
  return user.username || (user.email ? user.email.split('@')[0] : '')
}

function getInitials(user) {
  if (!user) return ''
  const name = user.username || user.email || ''
  const parts = name.split(/[\s.@]+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
}

function sendMessage() {
  if (!newMessage.value.trim()) return

  if (!selectedUser.value || !selectedUser.value.id) {
    alert('Please select a user to chat with')
    return
  }

  const msg = {
    senderId: transportOwner.id,
    receiverId: selectedUser.value.id,
    sender: transportOwner.email,
    receiver: selectedUser.value.email,
    message: newMessage.value.trim(),
  }

  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      chatMessages.value.push({ ...msg, createdAt: new Date().toISOString() })
      newMessage.value = ''
      scrollToBottom()
    } else {
      alert('Message send failed')
    }
  })
}

socket.on('receive_message', (msg) => {
  if (
    (msg.senderId === transportOwner.id && msg.receiverId === selectedUser.value?.id) ||
    (msg.senderId === selectedUser.value?.id && msg.receiverId === transportOwner.id)
  ) {
    chatMessages.value.push(msg)
    scrollToBottom()
  }
})

function formatDate(dateString) {
  return new Date(dateString).toLocaleString()
}

function toggleDropdown(user) {
  dropdownUser.value = dropdownUser.value === user ? null : user
}

async function renameUser(user) {
  // Implement rename logic if needed
}

async function deleteUser(user) {
  if (
    !confirm(
      `Are you sure you want to delete all messages from '${user.username || user.email}'?`
    )
  )
    return
  try {
    await axios.delete(`http://localhost:5000/api/messages/user/${user.id}`)
    users.value = users.value.filter((u) => u.id !== user.id)
    if (selectedUser.value && selectedUser.value.id === user.id) {
      selectedUser.value = users.value[0] || null
      await loadChatWithUser()
    }
  } catch (err) {
    console.error('Delete error', err)
  }
}

onMounted(() => {
  socket.emit('join', transportOwner.id.toString())
  fetchUsers()
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<style scoped>
/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f3f0ff;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #6b63ff88;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #6b63ffcc;
}
</style>
