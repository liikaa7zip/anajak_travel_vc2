<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

      <!-- Account Security -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Account Security</h2>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input 
              v-model="currentPassword" 
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              v-model="newPassword" 
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input 
              v-model="confirmPassword" 
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button 
            type="submit"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Change Password
          </button>
        </form>
      </div>

      <!-- Notification Preferences -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p class="text-sm text-gray-500">Receive booking confirmations and updates</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="notifications.email" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">SMS Notifications</h3>
              <p class="text-sm text-gray-500">Receive text messages for important updates</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="notifications.sms" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Marketing Emails</h3>
              <p class="text-sm text-gray-500">Receive promotional offers and travel deals</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="notifications.marketing" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
        
        <button 
          @click="saveNotificationSettings"
          class="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Save Preferences
        </button>
      </div>

      <!-- Privacy Settings -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Privacy Settings</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Profile Visibility</h3>
              <p class="text-sm text-gray-500">Make your profile visible to other users</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="privacy.profileVisible" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Travel History</h3>
              <p class="text-sm text-gray-500">Show your travel history to other users</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="privacy.travelHistoryVisible" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
        
        <button 
          @click="savePrivacySettings"
          class="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Save Privacy Settings
        </button>
      </div>

      <!-- Danger Zone -->
      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <h2 class="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-2">Delete Account</h3>
            <p class="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button 
              @click="showDeleteConfirm = true"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Account Deletion</h3>
          <p class="text-sm text-gray-600 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
          <div class="flex justify-end space-x-3">
            <button 
              @click="showDeleteConfirm = false"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button 
              @click="deleteAccount"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Password change
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// Notification settings
const notifications = ref({
  email: true,
  sms: false,
  marketing: true
})

// Privacy settings
const privacy = ref({
  profileVisible: true,
  travelHistoryVisible: false
})

// Delete confirmation
const showDeleteConfirm = ref(false)

onMounted(() => {
  // Load user settings from API or localStorage
  loadUserSettings()
})

const loadUserSettings = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const response = await fetch('http://localhost:5000/api/users/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        notifications.value = { ...notifications.value, ...data.notifications }
        privacy.value = { ...privacy.value, ...data.privacy }
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }
}

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('New passwords do not match')
    return
  }

  const token = localStorage.getItem('token')
  try {
    const response = await fetch('http://localhost:5000/api/users/change-password', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value
      })
    })

    if (response.ok) {
      alert('Password changed successfully')
      currentPassword.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
    } else {
      alert('Failed to change password')
    }
  } catch (error) {
    console.error('Error changing password:', error)
  }
}

const saveNotificationSettings = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch('http://localhost:5000/api/users/settings', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notifications: notifications.value })
    })

    if (response.ok) {
      alert('Notification preferences saved')
    }
  } catch (error) {
    console.error('Error saving notification settings:', error)
  }
}

const savePrivacySettings = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch('http://localhost:5000/api/users/settings', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ privacy: privacy.value })
    })

    if (response.ok) {
      alert('Privacy settings saved')
    }
  } catch (error) {
    console.error('Error saving privacy settings:', error)
  }
}

const deleteAccount = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch('http://localhost:5000/api/users/account', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (response.ok) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/home')
    }
  } catch (error) {
    console.error('Error deleting account:', error)
  }
}
</script>