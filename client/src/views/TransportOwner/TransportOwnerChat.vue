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
              'p-4 pr-10 border-b cursor-pointer hover:bg-gray-100',
              selectedUser === user ? 'bg-gray-200 font-semibold' : ''
            ]"
          >
            {{ usernameFromEmail(user) }}

          </div>

          <!-- Dropdown -->
          <div class="absolute right-2 top-4">
            <button @click="toggleDropdown(user)" class="text-gray-600 hover:text-gray-900 focus:outline-none">
              ...
            </button>
          </div>

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
        <h2 class="text-xl font-bold">
          Chat with {{ selectedUser ? selectedUser.username || selectedUser.email : '...' }}
        </h2>


      </div>

      <!-- Chat messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <div
          v-for="(msg, index) in chatMessages"
          :key="index"
          :class="msg.senderId === transportOwner.id ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block px-4 py-2 rounded-lg max-w-xs',
              msg.senderId === transportOwner.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
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
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

// Transport owner details from localStorage
const transportOwner = JSON.parse(localStorage.getItem('user'))

const users = ref([])
const selectedUser = ref(null)
const chatMessages = ref([])
const newMessage = ref('')
const dropdownUser = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const chatContainer = ref(null)

function scrollToBottom() {
  if (chatContainer.value) {
    // Scroll to the bottom smoothly
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
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
    (msg.senderId === user.id && msg.receiverId === selectedUser.value?.id) ||
    (msg.senderId === selectedUser.value?.id && msg.receiverId === user.id)
  ) {
    chatMessages.value.push(msg);
    scrollToBottom();
  }
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}


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

onMounted(() => {
  socket.emit('join', transportOwner.id.toString());

  fetchUsers()
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>
