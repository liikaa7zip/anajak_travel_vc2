<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>

      <!-- Profile Content -->
      <div v-else>
        <!-- Profile Header -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <div class="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
                <img 
                  v-if="userProfile.avatar" 
                  :src="userProfile.avatar" 
                  :alt="userProfile.fullName"
                  class="w-24 h-24 rounded-full object-cover"
                />
                <span v-else class="text-white text-2xl font-bold">{{ userInitials }}</span>
              </div>
              <button 
                @click="showAvatarUpload = true"
                class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ userProfile.fullName || userProfile.username || 'User Name' }}</h1>
              <p class="text-gray-600">{{ userProfile.email }}</p>
              <p class="text-sm text-gray-500">Member since {{ formatDate(userProfile.createdAt) }}</p>
              <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full" 
                    :class="getRoleBadgeClass(userProfile.role)">
                {{ userProfile.role }}
              </span>
            </div>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Profile Information</h2>
            <button 
              v-if="!isEditing"
              @click="startEditing"
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Edit Profile
            </button>
          </div>

          <form @submit.prevent="updateProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  v-model="editForm.fullName" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  :disabled="!isEditing"
                  :class="{ 'bg-gray-100': !isEditing }"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="editForm.email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  :disabled="!isEditing"
                  :class="{ 'bg-gray-100': !isEditing }"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input 
                  v-model="editForm.mobile" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  :disabled="!isEditing"
                  :class="{ 'bg-gray-100': !isEditing }"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  v-model="editForm.location" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  :disabled="!isEditing"
                  :class="{ 'bg-gray-100': !isEditing }"
                />
              </div>
            </div>
            
            <div v-if="isEditing" class="flex justify-end space-x-3 pt-4">
              <button 
                @click="cancelEdit"
                type="button"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="updating"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
              >
                {{ updating ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Travel Statistics -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Travel Statistics</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ userStats.totalBookings }}</div>
              <div class="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ userStats.countriesVisited }}</div>
              <div class="text-sm text-gray-600">Countries Visited</div>
            </div>
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">${{ userStats.totalSpent }}</div>
              <div class="text-sm text-gray-600">Total Spent</div>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg">
              <div class="text-2xl font-bold text-orange-600">{{ userStats.upcomingTrips }}</div>
              <div class="text-sm text-gray-600">Upcoming Trips</div>
            </div>
          </div>
        </div>

        <!-- Success/Error Messages -->
        <div v-if="message" class="fixed top-4 right-4 z-50">
          <div :class="messageClass" class="px-4 py-2 rounded-md shadow-lg">
            {{ message }}
          </div>
        </div>

        <!-- Avatar Upload Modal -->
        <div v-if="showAvatarUpload" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Update Profile Picture</h3>
            <input 
              type="file" 
              @change="handleAvatarUpload" 
              accept="image/*"
              class="w-full mb-4"
            />
            <div class="flex justify-end space-x-3">
              <button 
                @click="showAvatarUpload = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button 
                @click="uploadAvatar"
                :disabled="!selectedFile"
                class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(true)
const updating = ref(false)
const isEditing = ref(false)
const message = ref('')
const messageType = ref('success')
const showAvatarUpload = ref(false)
const selectedFile = ref(null)

// User data
const userProfile = ref({})
const userStats = ref({
  totalBookings: 0,
  countriesVisited: 0,
  totalSpent: 0,
  upcomingTrips: 0
})

// Edit form
const editForm = ref({
  fullName: '',
  email: '',
  mobile: '',
  location: ''
})

// Store original values for cancel functionality
const originalValues = ref({})

// API base URL
const API_BASE = 'http://localhost:5000/api/users'

// Computed properties
const userInitials = computed(() => {
  const name = userProfile.value.fullName || userProfile.value.username || 'U'
  return name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase()
})

const messageClass = computed(() => {
  return messageType.value === 'success' 
    ? 'bg-green-500 text-white' 
    : 'bg-red-500 text-white'
})

// Methods
const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const response = await axios.get(`${API_BASE}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    userProfile.value = response.data
    
    // Populate edit form
    editForm.value = {
      fullName: response.data.fullName || '',
      email: response.data.email || '',
      mobile: response.data.mobile || '',
      location: response.data.location || ''
    }

    // Store original values
    originalValues.value = { ...editForm.value }
    
  } catch (error) {
    console.error('Error fetching profile:', error)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
    showMessage('Failed to load profile', 'error')
  }
}

const fetchUserStats = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_BASE}/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    userStats.value = response.data
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const startEditing = () => {
  isEditing.value = true
  originalValues.value = { ...editForm.value }
}

const cancelEdit = () => {
  editForm.value = { ...originalValues.value }
  isEditing.value = false
}

const updateProfile = async () => {
  updating.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await axios.put(`${API_BASE}/profile`, editForm.value, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    userProfile.value = { ...userProfile.value, ...response.data.user }
    originalValues.value = { ...editForm.value }
    isEditing.value = false
    showMessage('Profile updated successfully!', 'success')
    
  } catch (error) {
    console.error('Error updating profile:', error)
    showMessage(error.response?.data?.message || 'Failed to update profile', 'error')
  } finally {
    updating.value = false
  }
}

const handleAvatarUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const uploadAvatar = async () => {
  if (!selectedFile.value) return

  try {
    const formData = new FormData()
    formData.append('avatar', selectedFile.value)

    const token = localStorage.getItem('token')
    const response = await axios.put(`${API_BASE}/profile`, {
      avatar: 'data:image/jpeg;base64,' + await fileToBase64(selectedFile.value)
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    userProfile.value.avatar = response.data.user.avatar
    showAvatarUpload.value = false
    selectedFile.value = null
    showMessage('Profile picture updated!', 'success')
    
  } catch (error) {
    console.error('Error uploading avatar:', error)
    showMessage('Failed to upload avatar', 'error')
  }
}

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = error => reject(error)
  })
}

const formatDate = (dateString) => {
  if (!dateString) return 'Recently'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getRoleBadgeClass = (role) => {
  const classes = {
    admin: 'bg-red-100 text-red-800',
    user: 'bg-blue-100 text-blue-800',
    restaurant_owner: 'bg-green-100 text-green-800',
    hotel_owner: 'bg-purple-100 text-purple-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchUserProfile(),
    fetchUserStats()
  ])
  loading.value = false
})
</script>