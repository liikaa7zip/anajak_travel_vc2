<template>
  <div class="flex h-screen bg-gray-100">
    <!-- User list -->
    <div class="w-64 bg-white border-r shadow relative">
      <div class="p-4 text-lg font-bold border-b">👥 Users</div>
      <ul class="overflow-y-auto h-full">
        <li
          v-for="user in users"
          :key="user"
          class="relative group"
        >
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
      <!-- Header -->
      <div class="p-4 bg-white border-b shadow flex items-center justify-between">
        <h2 class="text-xl font-bold">
          Chat with {{ selectedUser || '...' }}
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
      <div
  v-if="popupMessage"
  class="fixed bottom-4 right-4 bg-white border shadow-lg px-4 py-2 rounded text-sm text-gray-800"
>
  {{ popupMessage }}
</div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { io } from 'socket.io-client';

const adminName = 'admin';
const socket = io('http://localhost:5000');

const users = ref([]);
const selectedUser = ref('');
const chatMessages = ref([]);
const newMessage = ref('');
const dropdownUser = ref(null);
const popupMessage = ref('');
const popupType = ref('');
let popupTimeout = null;

// Show temporary popup
function showPopup(message, type = 'success') {
  popupMessage.value = message;
  popupType.value = type;

  if (popupTimeout) clearTimeout(popupTimeout);
  popupTimeout = setTimeout(() => {
    popupMessage.value = '';
  }, 3000);
}

// Fetch all users
async function fetchUsers() {
  try {
    const res = await axios.get('http://localhost:5000/api/messages/users');
    users.value = res.data;
    if (res.data.length > 0) {
      selectedUser.value = res.data[0];
      loadChatWithUser();
    }
  } catch (e) {
    console.error('fetchUsers error', e);
  }
}

// Load conversation between admin and selected user
async function loadChatWithUser() {
  if (!selectedUser.value) {
    chatMessages.value = [];
    return;
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/messages/conversation?user1=${adminName}&user2=${selectedUser.value}`);
    chatMessages.value = res.data;
  } catch (e) {
    console.error('loadChatWithUser error', e);
  }
}

// Select a user from the sidebar
function selectUser(user) {
  selectedUser.value = user;
  loadChatWithUser();
}

// Send a message from admin
function sendMessage() {
  if (!newMessage.value.trim() || !selectedUser.value) return;

  const msg = {
    sender: adminName,
    receiver: selectedUser.value,
    message: newMessage.value.trim(),
  };

  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      chatMessages.value.push({ ...msg, createdAt: new Date().toISOString() });
      newMessage.value = '';
    } else {
      alert('Message send failed');
    }
  });
}

// Socket event: receive new message
socket.on('receive_message', (msg) => {
  const isRelevant =
    (msg.sender === adminName && msg.receiver === selectedUser.value) ||
    (msg.sender === selectedUser.value && msg.receiver === adminName);

  if (isRelevant) {
    chatMessages.value.push(msg);
  }
});

// Dropdown toggle logic
function toggleDropdown(user) {
  dropdownUser.value = dropdownUser.value === user ? null : user;
}

// Rename a user (UI only)
function renameUser(user) {
  const newName = prompt('Enter new name:', user);
  if (newName && newName !== user) {
    users.value = users.value.map(u => (u === user ? newName : u));
    if (selectedUser.value === user) {
      selectedUser.value = newName;
    }
  }
  dropdownUser.value = null;
}

// Delete all messages of a user
async function deleteUser(user) {
  if (confirm(`Are you sure you want to delete all messages from '${user}'?`)) {
    try {
      await axios.delete(`http://localhost:5000/api/messages/user/${user}`);

      users.value = users.value.filter(u => u !== user);

      if (selectedUser.value === user) {
        selectedUser.value = users.value[0] || '';
        await loadChatWithUser();
      }

      showPopup(`🗑️ Messages from '${user}' have been deleted.`);
    } catch (err) {
      console.error('Failed to delete user messages:', err);
      showPopup('❌ Error deleting user messages', 'error');
    }
  }

  dropdownUser.value = null;
}

// Format timestamps
function formatDate(dateString) {
  return new Date(dateString).toLocaleTimeString();
}

// Lifecycle hooks
onMounted(() => {
  socket.emit('join', adminName);
  fetchUsers();
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>



<style scoped>
/* Optional scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>

