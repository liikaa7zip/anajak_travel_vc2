


<!-- <template>
  <div>
    <h2>User Chat</h2>
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id">
        <strong>{{ msg.sender }}:</strong> {{ msg.message }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';

const username = 'user1';  // dynamically set, e.g. from login
const receiver = 'admin';

const socket = io('http://localhost:5000');
const messages = ref([]);
const newMessage = ref('');

function sendMessage() {
  if (!newMessage.value.trim()) return;

  const msg = {
    sender: username,
    receiver,
    message: newMessage.value,
  };

  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      newMessage.value = '';
    } else {
      alert('Message send failed');
    }
  });
}

onMounted(() => {
  socket.emit('join', username);

  socket.on('receive_message', (msg) => {
    if (msg.sender === username || msg.receiver === username) {
      messages.value.push(msg);
    }
  });
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script> -->


<template>
  <div class="chat-container">
    <header class="chat-header">
      <h2>💬 Live Support Chat</h2>
      <p class="subtext">Talk with our Admin in real-time</p>
    </header>

    <div class="chat-body" ref="messagesContainer">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['chat-message', msg.sender === username ? 'user' : 'admin']"
      >
        <div class="message-content">
          <p class="sender">{{ msg.sender === username ? 'You' : msg.sender }}</p>
          <p class="text">{{ msg.message }}</p>
          <span class="time">{{ formatDate(msg.createdAt) }}</span>
        </div>
      </div>
    </div>

    <div class="chat-footer">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        class="message-input"
      />
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import axios from 'axios';
import { io } from 'socket.io-client';

// Get logged-in user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const username = user?.email || 'guest';  // current logged-in user's email
const adminName = 'admin';

const socket = io('http://localhost:5000');
const messages = ref([]);
const newMessage = ref('');
const messagesContainer = ref(null);

async function loadMessages() {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/messages/conversation?user1=${username}&user2=${adminName}`
    );
    messages.value = response.data;
    scrollToBottom();
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

function sendMessage() {
  if (!newMessage.value.trim()) return;
  const msg = {
    sender: username,
    receiver: adminName,
    message: newMessage.value.trim(),
  };

  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      messages.value.push({ ...msg, createdAt: new Date() });
      newMessage.value = '';
      scrollToBottom();
    } else {
      alert('Message send failed');
    }
  });
}

function scrollToBottom() {
  nextTick(() => {
    const container = document.querySelector('.messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
}

function messageClass(msg) {
  return msg.sender === username ? 'user-message' : 'admin-message';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

onMounted(() => {
  loadMessages();
  socket.emit('join', username);

  socket.on('receive_message', (msg) => {
    if (
      (msg.sender === username && msg.receiver === adminName) ||
      (msg.sender === adminName && msg.receiver === username)
    ) {
      messages.value.push(msg);
      scrollToBottom();
    }
  });
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>


<style scoped>
.chat-container {
  max-width: 700px;
  height: 90vh;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
}

.chat-header {
  background: #4f46e5;
  color: white;
  padding: 20px;
  text-align: center;
}

.chat-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.chat-header .subtext {
  font-size: 0.9rem;
  margin-top: 5px;
  color: #c7d2fe;
}

.chat-body {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-message {
  display: flex;
  max-width: 80%;
}

.chat-message.admin {
  justify-content: flex-start;
}

.chat-message.user {
  justify-content: flex-end;
  align-self: flex-end;
}

.message-content {
  padding: 12px 16px;
  border-radius: 16px;
  position: relative;
  background-color: #e0e7ff;
  color: #1e3a8a;
  max-width: 100%;
}

.chat-message.admin .message-content {
  background-color: #f3f4f6;
  color: #111827;
}

.sender {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.text {
  margin: 0;
}

.time {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 6px;
  display: block;
  text-align: right;
}

.chat-footer {
  display: flex;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background-color: #f3f4f6;
}

.message-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  margin-right: 12px;
  font-size: 1rem;
  outline: none;
}

.send-button {
  padding: 12px 20px;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #4338ca;
}
</style>

