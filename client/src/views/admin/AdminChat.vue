<!-- <template>
  <div>
    <h2>Admin Chat</h2>
    <select v-model="selectedUser" @change="loadChatWithUser">
      <option disabled value="">Select User</option>
      <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
    </select>

    <div style="border: 1px solid #ccc; height: 300px; overflow-y: auto; margin-top: 10px; padding: 10px;">
      <div v-for="msg in chatMessages" :key="msg.id">
        <b>{{ msg.sender }}:</b> {{ msg.message }}
        <br />
        <small>{{ formatDate(msg.createdAt) }}</small>
      </div>
    </div>

    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type your message"
      style="width: 80%; padding: 5px; margin-top: 10px;"
    />
    <button @click="sendMessage">Send</button>
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

async function fetchUsers() {
  try {
    const res = await axios.get('http://localhost:5000/api/messages/users');
    users.value = res.data;
    if (users.value.length > 0) {
      selectedUser.value = users.value[0];
      loadChatWithUser();
    }
  } catch (e) {
    console.error('fetchUsers error', e);
  }
}

async function loadChatWithUser() {
  if (!selectedUser.value) {
    chatMessages.value = [];
    return;
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/messages/conversation?user1=admin&user2=${selectedUser.value}`);
    chatMessages.value = res.data;
  } catch (e) {
    console.error('loadChatWithUser error', e);
  }
}

function sendMessage() {
  if (!newMessage.value.trim() || !selectedUser.value) return;
  const msg = {
    sender: adminName,
    receiver: selectedUser.value,
    message: newMessage.value.trim(),
  };

  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      chatMessages.value.push(msg);
      newMessage.value = '';
    } else {
      alert('Message send failed');
    }
  });
}

socket.on('receive_message', (msg) => {
  if (
    (msg.sender === adminName && msg.receiver === selectedUser.value) ||
    (msg.sender === selectedUser.value && msg.receiver === adminName)
  ) {
    chatMessages.value.push(msg);
  }
});

onMounted(() => {
  socket.emit('join', adminName);
  fetchUsers();
});

onBeforeUnmount(() => {
  socket.disconnect();
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}
</script> -->

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- User list -->
    <div class="w-64 bg-white border-r shadow">
      <div class="p-4 text-lg font-bold border-b">👥 Users</div>
      <ul class="overflow-y-auto h-full">
        <li
          v-for="user in users"
          :key="user"
          @click="selectUser(user)"
          :class="['p-4 border-b cursor-pointer hover:bg-gray-100', selectedUser === user ? 'bg-gray-200 font-semibold' : '']"
        >
          {{ user }}
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

async function loadChatWithUser() {
  if (!selectedUser.value) {
    chatMessages.value = [];
    return;
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/messages/conversation?user1=admin&user2=${selectedUser.value}`);
    chatMessages.value = res.data;
  } catch (e) {
    console.error('loadChatWithUser error', e);
  }
}

function selectUser(user) {
  selectedUser.value = user;
  loadChatWithUser();
}

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

socket.on('receive_message', (msg) => {
  if (
    (msg.sender === adminName && msg.receiver === selectedUser.value) ||
    (msg.sender === selectedUser.value && msg.receiver === adminName)
  ) {
    chatMessages.value.push(msg);
  }
});

onMounted(() => {
  socket.emit('join', adminName);
  fetchUsers();
});

onBeforeUnmount(() => {
  socket.disconnect();
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleTimeString();
}
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

