


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
        :class="['chat-message-wrapper', msg.sender === username ? 'user' : 'admin']"
      >
        <!-- Message Bubble -->
        <div class="chat-message">
          <div class="message-content">
            <p class="sender">{{ msg.sender === username ? 'You' : msg.sender }}</p>
            <p class="text">{{ msg.message }}</p>
          </div>
        </div>

        <!-- Date/Time Under Bubble -->
        <div class="message-time">
          {{ formatDate(msg.createdAt) }}
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
  max-width: 720px;
  height: 90vh;
  margin: -40px auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  border: 1px solid #e5e7eb;
}

/* Header */
.chat-header {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  padding: 2px;
  text-align: center;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.15);
}

.chat-header h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.chat-header .subtext {
  font-size: 0.95rem;
  color: #e0e7ff;
  margin-top: 6px;
}

/* Chat Body */
.chat-body {
  flex-grow: 1;
  padding: 24px 20px;
  overflow-y: auto;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;
}

/* Message wrapper for alignment */
.chat-message-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin-bottom: 14px;
}

.chat-message-wrapper.user {
  align-self: flex-end;
  align-items: flex-end;
}

.chat-message-wrapper.admin {
  align-self: flex-start;
  align-items: flex-start;
}

/* Chat message bubble */
.chat-message {
  display: flex;
}

.message-content {
  display: flex;
  flex-direction: column;
  padding: 14px 18px;
  border-radius: 18px;
  background-color: #e0e7ff;
  color: #1e3a8a;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  max-width: 100%;
  word-wrap: break-word;
}

.chat-message-wrapper.user .message-content {
  background-color: #bbf7d0;
  color: #065f46;
}

.chat-message-wrapper.admin .message-content {
  background-color: #f3f4f6;
  color: #111827;
}

/* Sender & Message Text */
.sender {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.text {
  margin: 0;
  font-size: 1rem;
}

/* Time under message bubble */
.message-time {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
}

/* Footer Input Area */
.chat-footer {
  display: flex;
  padding: 16px 20px;
  background-color: #f3f4f6;
  border-top: 1px solid #e2e8f0;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  font-size: 1rem;
  transition: border 0.3s;
  outline: none;
  background-color: white;
}

.message-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.send-button {
  margin-left: 12px;
  padding: 12px 22px;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.send-button:hover {
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  transform: translateY(-1px);
}
</style>


