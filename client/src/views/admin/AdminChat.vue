<template>
  <div class="flex h-screen bg-gray-100">
    <!-- User list -->
    <div class="w-64 bg-white border-r shadow relative">
      <div class="p-4 text-lg font-bold border-b">👥 Users</div>
      <ul class="overflow-y-auto h-full">
        <li v-for="user in users" :key="user.id" class="relative group">

          <div
  @click="selectUser(user)"
  :class="[
    'user-name',
    selectedUser === user ? 'selected-user' : '',
  ]"
>
  {{ usernameFromEmail(user) }}

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
            class="dropdown-menu absolute right-2 mt-1 z-10 bg-white border rounded shadow-lg text-sm"
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
        <h2 class="text-xl font-bold">
          Chat with {{ selectedUser ? selectedUser.username || selectedUser.email : '...' }}
        </h2>
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
const selectedUser = ref(null)
const chatMessages = ref([])
const newMessage = ref('')
const dropdownUser = ref(null)
const popupMessage = ref('')
const popupType = ref('')
const showRenameModal = ref(false)
const renameTarget = ref('')
const adminUser = JSON.parse(localStorage.getItem('user'));
let popupTimeout = null
const user = JSON.parse(localStorage.getItem('user'))
const chatContainer = ref(null)

function scrollToBottom() {
  if (chatContainer.value) {
    // Scroll to the bottom smoothly
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}


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
    // pass current user ID to backend to filter
    const res = await axios.get(`http://localhost:5000/api/messages/users/${user.id}`)
    console.log('Fetched users:', res.data)
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
  if (!selectedUser.value || !selectedUser.value.id) {
    chatMessages.value = []
    console.warn('loadChatWithUser: selectedUser is invalid', selectedUser.value)
    return
  }
  try {
    console.log('Loading conversation between:', user.id, selectedUser.value.id)
    const res = await axios.get(
      `http://localhost:5000/api/messages/conversation?user1=${user.id}&user2=${selectedUser.value.id}`
    )
    chatMessages.value = res.data
  } catch (e) {
    console.error('loadChatWithUser error', e)
  }
}


function selectUser(user) {
  console.log('Sending message to:', selectedUser.value);

  selectedUser.value = user
  loadChatWithUser()
}

function usernameFromEmail(user) {
  return user.username || (user.email ? user.email.split('@')[0] : '');
}



function sendMessage() {
  if (!newMessage.value.trim()) return;

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert('You must be logged in to send messages');
    return;
  }

  if (!selectedUser.value || !selectedUser.value.id) {
    alert('Please select a user to chat with');
    return;
  }

  const msg = {
    senderId: user.id,
    receiverId: selectedUser.value.id,
    sender: user.email,
    receiver: selectedUser.value.email,
    message: newMessage.value.trim(),
  };

  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      chatMessages.value.push({ ...msg, createdAt: new Date().toISOString() });
      newMessage.value = '';
      scrollToBottom();
    } else {
      alert('Message send failed');
    }
  });
}



socket.on('receive_message', (msg) => {
  if (
    (msg.senderId === user.id && msg.receiverId === selectedUser.id) ||
    (msg.senderId === selectedUser.id && msg.receiverId === user.id)
  ) {
    messages.value.push(msg);
  }
});


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
  socket.emit('join', adminUser.id.toString());// always join using user ID as string
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

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #a78bfa;
  border-radius: 6px;
  border: 2px solid #f5f5f5;
}

/* Container & layout */
.flex {
  display: flex;
}

.h-screen {
  height: 100vh;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

/* User list panel */
.w-64 {
  width: 16rem;
}

.bg-white {
  background-color: #fff;
}

.border-r {
  border-right: 1px solid #e2e8f0;
}

.shadow {
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
}

.relative {
  position: relative;
}

/* Sticky header */
.p-4 {
  padding: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: 700;
}

.border-b {
  border-bottom: 1px solid #e2e8f0;
}

.sticky {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

/* User list scroll area */
.overflow-y-auto {
  overflow-y: auto;
}

.h-full {
  height: 100%;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Each user row */
.group {
  position: relative;
}

.border-b {
  border-bottom: 1px solid #e2e8f0;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.bg-gray-200 {
  background-color: #edf2f7;
}

.font-semibold {
  font-weight: 600;
}

/* Active user highlight */
.selected-user {
  background-color: #a78bfa;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(167, 139, 250, 0.4);
  border-radius: 0 12px 12px 0;
}

/* Username styling */
.user-name {
  padding: 1rem 2.5rem 1rem 1rem;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: #4a5568;
  transition: color 0.3s ease;
}

.user-name:hover {
  color: #6b46c1;
}

/* 3-dot button */
.absolute.right-2.top-4 {
  position: absolute;
  right: 0.5rem;
  top: 1rem;
}

button.text-gray-600 {
  color: #718096;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  user-select: none;
}

button.text-gray-600:hover {
  color: #6b46c1;
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  right: 0.5rem;
  top: 2.5rem;
  z-index: 20;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 8px 16px rgba(107, 70, 193, 0.2);
  min-width: 140px;
  font-size: 0.875rem;
}

.dropdown-menu button {
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #4a5568;
  transition: background-color 0.2s ease;
  user-select: none;
}

.dropdown-menu button:hover {
  background-color: #f7fafc;
  color: #6b46c1;
}

.dropdown-menu button.text-red-600:hover {
  background-color: #fed7d7;
  color: #c53030;
}

/* Chat window panel */
.flex-1 {
  flex: 1 1 0%;
}

.flex-col {
  flex-direction: column;
}

.border-b {
  border-bottom: 1px solid #e2e8f0;
}

.p-4 {
  padding: 1rem;
}

.bg-white {
  background-color: #fff;
}

.shadow {
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);
}

.flex.items-center.justify-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-xl {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
}

.text-gray-600 {
  color: #718096;
}

.text-gray-500 {
  color: #a0aec0;
}

/* Chat messages area */
.overflow-y-auto {
  overflow-y: auto;
}

.p-4 {
  padding: 1rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

/* Message bubbles */
.inline-block {
  display: inline-block;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded-lg {
  border-radius: 0.75rem;
}

.max-w-xs {
  max-width: 20rem;
}

.bg-blue-500 {
  background-color: #6b46c1;
  color: white;
  box-shadow: 0 2px 8px rgb(107 70 193 / 0.35);
}

.bg-blue-700 {
  background-color: #553c9a;
}

.bg-gray-200 {
  background-color: #edf2f7;
  color: #2d3748;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.05);
}

.text-black {
  color: #1a202c;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

/* Timestamp */
.text-xs {
  font-size: 0.75rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

/* Input area */
.border {
  border: 1px solid #cbd5e0;
}

.rounded {
  border-radius: 0.375rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.bg-blue-600 {
  background-color: #805ad5;
  color: white;
  box-shadow: 0 3px 6px rgba(128, 90, 213, 0.6);
  transition: background-color 0.3s ease;
}

.bg-blue-600:hover {
  background-color: #6b46c1;
}

.text-white {
  color: white;
}

.cursor-pointer {
  cursor: pointer;
}

/* Popup */
.fixed {
  position: fixed;
}

.bottom-4 {
  bottom: 1rem;
}

.right-4 {
  right: 1rem;
}

.border {
  border: 1px solid #e2e8f0;
}

.rounded {
  border-radius: 0.375rem;
}

.shadow-lg {
  box-shadow: 0 8px 24px rgba(107, 70, 193, 0.3);
}

.text-sm {
  font-size: 0.875rem;
}


/* Responsive tweaks */
@media (max-width: 768px) {
  .w-64 {
    width: 12rem;
  }
}

</style>
