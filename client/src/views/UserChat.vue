<template>
  <div class="chat-container">
    <div class="sidebar">
      <header class="chat-header">
        <h2>💬 Live Support Chat</h2>
        <p class="subtext">Talk with our supporter in real-time</p>
      </header>

      <section class="chat-selection">
        <div class="role-list">
          <p>Choose a role:</p>
          <ul>
            <li
              v-for="role in roles"
              :key="role.value"
              :class="{ selected: selectedRole === role.value }"
              @click="selectRole(role.value)"
            >
              {{ role.label }}
            </li>
          </ul>
        </div>

        <ul class="user-list">
          <li
            v-for="u in availableUsers"
            :key="u.id"
            @click="selectChatPartner(u)"
            :class="['user-card', selectedUser?.id === u.id ? 'active' : '']"
            :title="`${u.username || u.email} (${u.role})`"
          >
            <div class="avatar">{{ getInitials(u.username || u.email) }}</div>
            <div class="user-info">
              <strong class="username">{{ u.username || u.email }}</strong>
              <small class="role">{{ u.role.replace('_', ' ').toUpperCase() }}</small>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <div class="chat-panel">
      <section class="chat-body" ref="messagesContainer" tabindex="0" aria-label="Chat messages">
        <div
          v-for="msg in messages"
          :key="msg.id || msg.createdAt"
          :class="['chat-message-wrapper', msg.sender === username ? 'user' : 'partner']"
          v-bind:data-message-id="msg.id"
        >
          <div class="avatar message-avatar" :title="msg.sender">
            {{ getInitials(msg.sender) }}
          </div>
          <div class="chat-message" :aria-label="`Message from ${msg.sender === username ? 'You' : msg.sender}`" role="article">
            <div class="message-content">
              <p class="sender">{{ msg.sender === username ? 'You' : msg.sender }}</p>
              <p class="text">{{ msg.message }}</p>
              <time class="message-time" :datetime="msg.createdAt">
                {{ formatRelativeDate(msg.createdAt) }}
              </time>
            </div>
            <div class="bubble-tail"></div>
          </div>
        </div>

        <div v-if="typing" class="typing-indicator" aria-live="polite">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span> Typing...
        </div>
      </section>

      <footer class="chat-footer">
        <input
          v-model="newMessage"
          :disabled="!selectedUser"
          placeholder="Type here..."
          class="message-input"
          @keyup.enter="sendMessage"
          aria-label="Type your message"
        />
        <button
          @click="sendMessage"
          class="send-button"
          :disabled="!selectedUser || !newMessage.trim()"
          aria-label="Send message"
        >
          Send
        </button>
      </footer>
    </div>

    <button
      v-if="showScrollButton"
      @click="scrollToBottom"
      class="scroll-bottom-btn"
      aria-label="Scroll to bottom"
      title="Scroll to bottom"
    >
      ⬇️
    </button>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import axios from 'axios';
import { io } from 'socket.io-client';

const user = JSON.parse(localStorage.getItem('user'));
const username = user?.email || 'guest';

const socket = io('http://localhost:5000');
const messages = ref([]);
const newMessage = ref('');
const messagesContainer = ref(null);
const selectedRole = ref('');
const availableUsers = ref([]);
const selectedUser = ref(null);
const typing = ref(false);
const showScrollButton = ref(false);
const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'restaurant_owner', label: 'Restaurant Owner' },
  { value: 'hotel_owner', label: 'Hotel Owner' },
  { value: 'transport_owner', label: 'Transport Owner' },
  { value: 'user', label: 'User' },
]



function selectRole(role) {
  selectedRole.value = role
  loadUsersByRole()
}

async function loadUsersByRole() {
  if (!selectedRole.value) return;
  try {
    const res = await axios.get(`http://localhost:5000/api/users/by-role/${selectedRole.value}`);
    availableUsers.value = res.data.filter(u => u.id !== user.id);
    if (availableUsers.value.length > 0) {
      selectChatPartner(availableUsers.value[0]);
    } else {
      selectedUser.value = null;
      messages.value = [];
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

function selectChatPartner(u) {
  selectedUser.value = u;
  messages.value = [];
  loadMessages();
}

async function loadMessages() {
  if (!selectedUser.value) return;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/messages/conversation?user1=${user.id}&user2=${selectedUser.value.id}`
    );
    messages.value = response.data;
    scrollToBottom();
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

function sendMessage() {
  if (!newMessage.value.trim()) return;

  if (!selectedUser.value) {
    alert('Please select a user to chat with first.');
    return;
  }

  const msg = {
    sender: user.email,
    receiver: selectedUser.value.email,
    senderId: user.id,
    receiverId: selectedUser.value.id,
    message: newMessage.value.trim(),
  };

  socket.emit('send_message', msg, (response) => {
    if (response.status === 'ok') {
      messages.value.push({ ...msg, createdAt: new Date().toISOString() });
      newMessage.value = '';
      scrollToBottom();
    } else {
      alert('Message send failed: ' + (response.error || 'Unknown error'));
    }
  });
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      showScrollButton.value = false;
    }
  });
}

// Show scroll button if user scrolled up
function onScroll() {
  if (!messagesContainer.value) return;
  const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
  showScrollButton.value = scrollHeight - scrollTop > clientHeight + 50;
}

// Format date to relative like "5 minutes ago" or fallback locale string
function formatRelativeDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = (now - d) / 1000; // seconds

  if (diff < 10) return 'Just now';
  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;

  return d.toLocaleString();
}

function getInitials(name) {
  if (!name) return '';
  const parts = name.split(/[ @.]+/).filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
}

onMounted(() => {
  loadMessages();
  socket.emit('join', username);

  socket.on('receive_message', (msg) => {
    if (
      (msg.sender === user.email && msg.receiver === selectedUser.value?.email) ||
      (msg.sender === selectedUser.value?.email && msg.receiver === user.email)
    ) {
      messages.value.push(msg);
      scrollToBottom();
    }
  });

  if (messagesContainer.value) {
    messagesContainer.value.addEventListener('scroll', onScroll);
  }
});

onBeforeUnmount(() => {
  socket.disconnect();
  if (messagesContainer.value) {
    messagesContainer.value.removeEventListener('scroll', onScroll);
  }
});
</script>

<style scoped>
.chat-container {
  max-width: 900px;
  height: 90vh;
  margin: 40px auto;
  display: flex;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid #ddd;
  background: #fafafa;
  overflow: hidden;
}

/* Left sidebar */
.sidebar {
  width: 280px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  user-select: none;
}

/* Sidebar header */
.sidebar > .chat-header {
  background: #6b63ff;
  color: white;
  padding: 14px 24px;
  text-align: center;
  user-select: none;
  border-bottom: 1px solid #5a54d1;
  font-weight: 600;
  font-size: 1.6rem;
}

.sidebar > .chat-header .subtext {
  font-size: 0.85rem;
  color: #d6d4ffcc;
  margin-top: 6px;
  font-weight: 400;
}

/* Sidebar content */
.chat-selection {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
}

/* Role list */
.role-list p {
  font-weight: 600;
  margin-bottom: 8px;
  color: #4a4a4a;
  font-size: 1rem;
}

.role-list ul {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
}

.role-list li {
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  color: #4a4a4a;
  font-weight: 600;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.role-list li.selected,
.role-list li:hover {
  background-color: #6b63ff22; /* subtle translucent purple */
  color: #6b63ff;
}

/* User list */
.user-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: #6b63ff44 #f0f0f0;
}

.user-list::-webkit-scrollbar {
  width: 7px;
}

.user-list::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.user-list::-webkit-scrollbar-thumb {
  background-color: #6b63ff44;
  border-radius: 4px;
}

/* User card */
.user-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #f7f7f7;
  padding: 8px 12px;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(107, 99, 255, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  min-width: 150px;
  color: #444;
  user-select: none;
}

.user-card:hover {
  background: #6b63ff11;
  color: #6b63ff;
  box-shadow: 0 3px 10px rgba(107, 99, 255, 0.2);
}

.user-card.active {
  background: #6b63ff22;
  color: #6b63ff;
  box-shadow: 0 4px 14px rgba(107, 99, 255, 0.3);
}

/* Avatar */
.avatar {
  width: 40px;
  height: 40px;
  background: #6b63ff44;
  border-radius: 50%;
  color: #6b63ff;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  user-select: none;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(107, 99, 255, 0.25);
  flex-shrink: 0;
}

/* Chat panel on the right */
.chat-panel {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* Chat Body */
.chat-body {
  flex-grow: 1;
  padding: 24px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  outline: none;
}

/* Message wrapper and alignment */
.chat-message-wrapper {
  display: flex;
  align-items: flex-end;
  max-width: 75%;
  animation: fadeInUp 0.3s ease forwards;
  position: relative;
}

.chat-message-wrapper.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chat-message-wrapper.partner {
  align-self: flex-start;
}

/* Message avatar next to bubble */
.message-avatar {
  margin: 0 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  color: #6b63ff;
  background: #e5e3ff;
}

/* Message bubble */
.chat-message {
  position: relative;
  background: #e5e3ff;
  color: #2c2c2c;
  padding: 14px 20px;
  border-radius: 20px;
  box-shadow: 0 3px 8px rgba(107, 99, 255, 0.15);
  word-wrap: break-word;
  font-size: 1rem;
  max-width: 100%;
  transition: background 0.3s ease;
}

.chat-message-wrapper.user .chat-message {
  background: #d4f5e9;
  color: #064e3b;
  box-shadow: 0 3px 8px rgba(52, 211, 153, 0.25);
}

/* Bubble tail */
.bubble-tail {
  position: absolute;
  bottom: 0;
  width: 14px;
  height: 14px;
  background: inherit;
  border-radius: 50% 50% 50% 0;
  transform: rotate(45deg);
  box-shadow: inherit;
}

.chat-message-wrapper.user .bubble-tail {
  right: -7px;
  border-radius: 50% 50% 0 50%;
}

.chat-message-wrapper.partner .bubble-tail {
  left: -7px;
}

/* Sender & text */
.sender {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 4px;
  user-select: text;
}

.text {
  margin: 0;
  line-height: 1.4;
  user-select: text;
}

/* Timestamp */
.message-time {
  font-size: 0.7rem;
  color: #999;
  margin-top: 6px;
  user-select: none;
  font-style: italic;
  opacity: 0.7;
}

/* Chat Footer */
.chat-footer {
  display: flex;
  padding: 16px 20px;
  background: #fafafa;
  gap: 12px;
  border-radius: 0 0 12px 12px;
  border-top: 1px solid #eee;
}

.message-input {
  flex-grow: 1;
  padding: 14px 18px;
  border-radius: 30px;
  border: 1.5px solid #ccc;
  font-size: 1rem;
  outline: none;
  background: white;
  color: #333;
  font-weight: 600;
  transition: border-color 0.3s ease;
  user-select: text;
}

.message-input::placeholder {
  color: #bbb;
}

.message-input:focus {
  border-color: #6b63ff;
  box-shadow: 0 0 6px rgba(107, 99, 255, 0.4);
}

.message-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button {
  padding: 14px 30px;
  border-radius: 30px;
  background: #6b63ff;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(107, 99, 255, 0.6);
  transition: background 0.3s, transform 0.15s;
  user-select: none;
}

.send-button:hover:not(:disabled) {
  background: #584ddb;
  transform: scale(1.05);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Typing indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-style: italic;
  font-weight: 600;
  color: #6b63ffcc;
  margin-top: 8px;
  user-select: none;
}

.dot {
  width: 8px;
  height: 8px;
  background: #6b63ff;
  border-radius: 50%;
  animation: blink 1.4s infinite ease-in-out both;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

/* Scroll to bottom button */
.scroll-bottom-btn {
  position: fixed;
  bottom: 100px;
  right: 40px;
  background: #6b63ff;
  color: white;
  font-size: 1.7rem;
  border: none;
  border-radius: 50%;
  padding: 12px 16px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(107, 99, 255, 0.8);
  transition: background 0.3s;
  user-select: none;
  z-index: 20;
}

.scroll-bottom-btn:hover {
  background: #584ddb;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 80%, 100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
}

</style>
