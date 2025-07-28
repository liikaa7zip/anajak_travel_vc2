<template>
  <div class="bg-white min-h-screen p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray flex items-center gap-2 mb-2">
          <span class="text-blue-400 text-3xl">👤</span>
          User Management
        </h1>
        <p class="text-gray-400 text-sm">Manage, search, and review all users in the system.</p>
      </div>
      <button
  @click="$router.push({ name: 'CreateUser' })"
  class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition mt-4 md:mt-0"
>
  <span class="text-lg">+</span> Add New User
</button>

    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 flex flex-col items-center shadow border border-orange-300">
        <span class="text-blue-400 text-2xl mb-1">👥</span>
        <div class="text-gray-500 text-sm">Total Users</div>
        <div class="text-gray text-xl font-bold">{{ filteredUsers.length }}</div>
      </div>
      <div class="bg-white rounded-xl p-4 flex flex-col items-center shadow border border-purple-300">
        <span class="text-green-400 text-2xl mb-1">✔️</span>
        <div class="text-gray-500 text-sm">Active Users</div>
        <div class="text-gray text-xl font-bold">{{ countByStatus('Active') }}</div>
      </div>
      <div class="bg-white rounded-xl p-4 flex flex-col items-center shadow border border-pink-300">
        <span class="text-orange-400 text-2xl mb-1">➕</span>
        <div class="text-gray-500 text-sm">New Signups (Last 7 days)</div>
        <div class="text-gray text-xl font-bold">{{ countNewSignups() }}</div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <div
  class="flex items-center bg-white rounded-lg px-4 py-2 w-full md:w-1/3 border border-purple-400 shadow-sm"
>
  <svg
    class="w-5 h-5 text-gray-600 mr-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
    />
  </svg>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Search users..."
    class="bg-transparent outline-none text-gray-700 w-full text-sm focus:text-gray-900"
  />
</div>

      <div class="flex gap-2">
        <select v-model="selectedStatus" class="bg-white text-gray-500 px-3 py-2 rounded-lg border border-blue-300">
          <option value="">Status: All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Banned</option>
        </select>
        <select v-model="selectedRole" class="bg-white text-gray-500 px-3 py-2 rounded-lg border border-blue-300">
          <option value="">Role: All</option>
          <option>User</option>
          <option>Business</option>
          <option>Admin</option>
        </select>
      </div>
    </div>

    <!-- User Table -->
    <div
      class="bg-white rounded-xl shadow border border-blue-700 overflow-x-auto"
    >
     <div class="relative">
    <table class="min-w-full text-sm text-gray-700 border-collapse" style="table-layout: fixed; overflow: visible;">
      <thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white uppercase text-xs tracking-wider">
        <tr>
          <th class="py-2 px-2 w-12"></th>
          <th @click="sortBy('name')" class="py-2 px-2 w-32 cursor-pointer text-left">
            Name
            <span v-if="sortKey === 'name'">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('email')" class="py-2 px-2 w-48 cursor-pointer text-left">
            Email
            <span v-if="sortKey === 'email'">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
          </th>
          <th class="py-2 px-2 w-32 text-center">Role</th>
          <th class="py-2 px-2 w-24 text-center">Status</th>
          <th class="py-2 px-2 w-32 text-center">Created</th>
          <th class="py-2 px-2 w-20 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(user, idx) in paginatedUsers"
          :key="user.id"
          class="border-b hover:bg-blue-50 even:bg-gray-50 transition duration-150"
        >
          <td class="py-2 px-2">
            <img
              :src="'https://randomuser.me/api/portraits/men/' + (idx + 30) + '.jpg'"
              class="w-8 h-8 rounded-full border border-blue-500 shadow"
              alt="avatar"
            />
          </td>
          <td class="py-2 px-2 text-left">{{ user.username }}</td>
          <td class="py-2 px-2 text-left">{{ user.email }}</td>
          <td class="py-2 px-2 text-center">
            <span
              :class="{
                'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold': user.role === 'user',
                'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold': user.role === 'hotel_owner',
                'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold': user.role === 'restaurant_owner',
                'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold': user.role === 'admin',
              }"
            >
              {{ user.role }}
            </span>
          </td>
          <td class="py-2 px-2 text-center">
            <span
              :class="{
                'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold': user.status === 'Active',
                'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold': user.status === 'Inactive',
                'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold': user.status === 'Banned',
              }"
            >
              {{ user.status }}
            </span>
          </td>
          <td class="py-2 px-2 text-center text-gray-500">{{ user.created }}</td>
          <td class="py-2 px-2 text-center">
  <div class="relative inline-block" style="position: relative; z-index: 10;">
    <button
      @click="toggleDropdown(idx)"
      class="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
    >
      ⋮
    </button>

    <transition name="fade">
      <div
        v-if="dropdownOpen === idx"
        class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50 flex flex-col"
        @click.stop
      >
        <button
          @click="editUser(user)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 text-yellow-600"
        >
          ✏️ Edit
        </button>

        <button
          @click="banUser(user)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
        >
          🚫 Ban
        </button>
      </div>
    </transition>

    <UpdateUser
      v-if="showEditForm"
      :user="selectedUser"
      @close="showEditForm = false"
      @updated="handleUserUpdated"
    />
  </div>
</td>

        </tr>
        <tr v-if="paginatedUsers.length === 0">
          <td colspan="6" class="py-2 px-2 text-center text-gray-400">No users found.</td>
        </tr>
      </tbody>
    </table>
  </div>

      <!-- Pagination -->
      <div
        class="flex justify-between items-center gap-2 p-4 border-t border-gray-700"
      >
        <span class="text-gray-400 text-xs">
          Showing {{ startUserIndex + 1 }} - {{ endUserIndex }} of {{ filteredUsers.length }} users
        </span>
        <div class="flex gap-1">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="bg-white text-gray-500 px-3 py-1 rounded hover:bg-blue-500"
          >
            ❮
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="gotoPage(page)"
            :class="{
              'bg-blue-600 text-white': currentPage === page,
              'bg-[#181c2f] text-gray-300': currentPage !== page,
            }"
            class="px-3 py-1 rounded hover:bg-blue-700"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="bg-white text-gray-500 px-3 py-1 rounded hover:bg-blue-500"
          >
            ❯
          </button>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import UpdateUser from '@/components/UpdateUser.vue'

const users = ref([])
const dropdownOpen = ref(null)
const searchQuery = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const sortKey = ref('name')
const sortOrder = ref(1) // 1 asc, -1 desc
const props = defineProps({
  users: Array
})
const emit = defineEmits(['user-deleted'])
const currentPage = ref(1)
const itemsPerPage = 6
const selectedUser = ref(null);
const showEditForm = ref(false);


// Add User Modal state
const showAddUserModal = ref(false)
const newUser = ref({
  name: '',
  email: '',
  role: '',
  status: '',
})

// Fetch users from backend (mock URL)
const fetchUsers = async () => {
  try {
    // Example: Adjust URL accordingly
    const response = await axios.get('http://localhost:5000/api/admin/users')
    users.value = response.data.map(user => ({
      id: user.id,
      username: user.username || user.name,
      email: user.email,
      // password: user.password || '********', 
      role: user.role || 'User',
      status: 'Active',
      created: new Date(user.createdAt || user.created || Date.now()).toLocaleDateString(),
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
    // Fallback sample users
    // users.value = [
    //   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', created: '2025-07-20' },
    //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', created: '2025-07-15' },
    //   { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Business', status: 'Active', created: '2025-07-10' },
    //   { id: 4, name: 'Bob Lee', email: 'bob@example.com', role: 'User', status: 'Banned', created: '2025-07-08' },
    //   { id: 5, name: 'Charlie Kim', email: 'charlie@example.com', role: 'User', status: 'Active', created: '2025-07-01' },
    //   { id: 6, name: 'Diana Green', email: 'diana@example.com', role: 'Business', status: 'Active', created: '2025-07-19' },
    //   { id: 7, name: 'Eric Wang', email: 'eric@example.com', role: 'Admin', status: 'Active', created: '2025-07-18' },
    // ]
  }
}

onMounted(() => {
  fetchUsers()
})

// Filtering users based on search, role, status
const filteredUsers = computed(() => {
  let temp = users.value

  // Search by name or email
  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase()
    temp = temp.filter(
      u =>
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    )
  }

  // Filter by role
  if (selectedRole.value) {
    temp = temp.filter(u => u.role === selectedRole.value)
  }

  // Filter by status
  if (selectedStatus.value) {
    temp = temp.filter(u => u.status === selectedStatus.value)
  }

  // Sort by selected key
  temp = [...temp].sort((a, b) => {
    const aKey = a[sortKey.value] || ''
    const bKey = b[sortKey.value] || ''
    if (typeof aKey === 'string' && typeof bKey === 'string') {
      return aKey.localeCompare(bKey) * sortOrder.value
    }
    if (typeof aKey === 'number' && typeof bKey === 'number') {
      return (aKey - bKey) * sortOrder.value
    }
    return 0
  })

  return temp
})


// Pagination
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))
const startUserIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endUserIndex = computed(() =>
  Math.min(startUserIndex.value + itemsPerPage, filteredUsers.value.length)
)
const paginatedUsers = computed(() =>
  filteredUsers.value.slice(startUserIndex.value, endUserIndex.value)
)

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function gotoPage(page) {
  currentPage.value = page
}

// Sorting
function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
  currentPage.value = 1
}

// Dropdown actions
// function toggleDropdown(idx) {
//   dropdownOpen.value = dropdownOpen.value === idx ? null : idx
// }
const toggleDropdown = (idx) => {
  dropdownOpen.value = dropdownOpen.value === idx ? null : idx
}
// Stats helpers
function countByStatus(status) {
  return users.value.filter(u => u.status === status).length
}
function countNewSignups() {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return users.value.filter(u => new Date(u.created) >= sevenDaysAgo).length
}

// Add User modal
function openAddUserModal() {
  newUser.value = {
    name: '',
    email: '',
    role: '',
    status: '',
  }
  showAddUserModal.value = true
}
function closeAddUserModal() {
  showAddUserModal.value = false
}
function submitNewUser() {
  if (
    !newUser.value.name ||
    !newUser.value.email ||
    !newUser.value.role ||
    !newUser.value.status
  ) {
    alert('Please fill all fields')
    return
  }
  // Add user to list (normally post to backend)
  const newId = users.value.length
    ? Math.max(...users.value.map(u => u.id)) + 1
    : 1
  users.value.push({
    id: newId,
    name: newUser.value.name,
    email: newUser.value.email,
    role: newUser.value.role,
    status: newUser.value.status,
    created: new Date().toLocaleDateString(),
  })
  closeAddUserModal()
  alert(`User ${newUser.value.name} added!`)
}

// Close dropdown on outside click
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.relative.inline-block')) {
      dropdownOpen.value = null
    }
  })
}

const banUser = async (user) => {
  const confirmBan = confirm(`Are you sure you want to ban (delete) user "${user.username}"?`)
  if (!confirmBan) return

  try {
    await axios.delete(`http://localhost:5000/api/admin/users/${user.id}`)
    alert(`User ${user.username} banned (deleted) successfully.`)

    // Remove user from users array
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }

    // Optionally emit event to parent if needed
    emit('user-deleted', user.id)

  } catch (error) {
    console.error('Error banning user:', error)
    alert('Failed to ban user.')
  }
}


const editUser = (user) => {
  selectedUser.value = { ...user }
  dropdownOpen.value = null
  showEditForm.value = true
}
const handleUserUpdated = (updatedUser) => {
  const index = paginatedUsers.value.findIndex(u => u.id === updatedUser.id)
  if (index !== -1) {
    // Merge updated data with existing user to preserve all fields
    paginatedUsers.value.splice(index, 1, { ...paginatedUsers.value[index], ...updatedUser })
  }
  showEditForm.value = false
}

</script>

<style scoped>
.border-collapse {
  border-collapse: collapse;
}
th, td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
table, tbody, tr, td {
  overflow: visible !important;
}
.relative {
  padding-bottom: 20px;
}
</style>
