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
        class="flex items-center bg-white rounded-lg px-3 py-2 w-full md:w-1/3 border border-purple-300"
      >
        <svg
          class="w-5 h-5 text-gray-500 mr-2"
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
          placeholder="Search by name or email"
          class="bg-transparent outline-none text-gray-500 w-full"
        />
      </div>
      <div class="flex gap-2">
        <select v-model="selectedStatus" class="bg-white text-gray-500 px-3 py-2 rounded-lg border border-pink-300">
          <option value="">Status: All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Banned</option>
        </select>
        <select v-model="selectedRole" class="bg-white text-gray-500 px-3 py-2 rounded-lg border border-pink-300">
          <option value="">Role: All</option>
          <option>User</option>
          <option>Business</option>
          <option>Admin</option>
        </select>
      </div>
    </div>

    <!-- User Table -->
    <div
      class="bg-white rounded-xl shadow border border-purple-700 overflow-x-auto"
    >
      <table class="min-w-full text-left">
    <thead>
      <tr
        class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-700"
      >
        <th @click="sortBy('name')" class="py-3 px-4 cursor-pointer select-none">
          Name
          <span v-if="sortKey === 'name'">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
        </th>
        <th @click="sortBy('email')" class="py-3 px-4 cursor-pointer select-none">
          Email
          <span v-if="sortKey === 'email'">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
        </th>
        <th class="py-3 px-4 select-none cursor-default text-center">Role</th>
        <th class="py-3 px-4 select-none cursor-default">Status</th>
        <th class="py-3 px-4 select-none cursor-default">Created</th>
        <th class="py-3 px-4 select-none cursor-default">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, idx) in paginatedUsers"
        :key="user.id"
        class="border-b border-[#6ccfdf] hover:bg-[#aab7fd] transition"
      >
        <td class="py-3 px-4 flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            class="w-7 h-7 rounded-full border-2 border-blue-500"
            alt="user avatar"
          />
          <span class="text-gray-500 font-medium">{{ user.name }}</span>
        </td>
        <td class="py-3 px-4 text-gray-500">{{ user.email }}</td>
        <td class="py-3 px-4 text-center">
          <span
            :class="{
              'text-blue-700 px-2 py-1 rounded text-sm': user.role === 'user',
              'text-yellow-700 px-2 py-1 rounded text-sm': user.role === 'food Owner',
              'text-green-700 px-2 py-1 rounded text-sm': user.role === 'restaurant Owner',
              'text-red-700 px-2 py-1 rounded text-sm': user.role === 'admin',
            }"
            class="inline-block"
          >
            {{ user.role }}
          </span>
        </td>
        <td class="py-3 px-4">
          <span
            :class="{
              'bg-green-700 text-green-200 px-2 py-1 rounded-full text-xs font-semibold':
                user.status === 'Active',
              'bg-yellow-700 text-yellow-200 px-2 py-1 rounded-full text-xs font-semibold':
                user.status === 'Inactive',
              'bg-red-700 text-red-200 px-2 py-1 rounded-full text-xs font-semibold':
                user.status === 'Banned',
            }"
          >
            {{ user.status }}
          </span>
        </td>
        <td class="py-3 px-4 text-gray-400">{{ user.created }}</td>
        <td class="py-3 px-4 relative">
          <div class="relative inline-block text-left">
            <button
              @click="toggleDropdown(idx)"
              class="bg-white border border-gray-100 px-3 py-1 rounded text-xs font-semibold text-gray-500 hover:bg-[#97a6f3] flex items-center gap-1"
              aria-haspopup="true"
              :aria-expanded="dropdownOpen === idx"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
                <circle cx="5" cy="12" r="2" />
              </svg>
            </button>
            <transition name="fade">
              <div
                v-if="dropdownOpen === idx"
                class="absolute right-0 mt-2 w-36 bg-white border border-gray-700 rounded shadow-lg z-10"
                @click.stop
              >
                <button
                  @click="viewUser(user)"
                  class="block w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#181c2f] flex items-center gap-2"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  View
                </button>
                <button
                  @click="editUser(user)"
                  class="block w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-[#181c2f] flex items-center gap-2"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11.293-11.293a1 1 0 000-1.414l-3.586-3.586a1 1 0 00-1.414 0L3 15v6z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  @click="banUser(user)"
                  class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#181c2f] flex items-center gap-2"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Ban
                </button>
              </div>
            </transition>
          </div>
        </td>
      </tr>
      <tr v-if="paginatedUsers.length === 0">
        <td colspan="6" class="text-center text-gray-400 p-4">No users found.</td>
      </tr>
    </tbody>
  </table>

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

const users = ref([])
const dropdownOpen = ref(null)
const searchQuery = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const sortKey = ref('name')
const sortOrder = ref(1) // 1 asc, -1 desc

const currentPage = ref(1)
const itemsPerPage = 6

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
    const response = await axios.get('http://localhost:5000/api/users')
    users.value = response.data.map(user => ({
      id: user.id,
      name: user.username || user.name || 'Unknown',
      email: user.email,
      role: user.role || 'User',
      status: 'Active',
      created: new Date(user.createdAt || user.created || Date.now()).toLocaleDateString(),
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
    // Fallback sample users
    users.value = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', created: '2025-07-20' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', created: '2025-07-15' },
      { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Business', status: 'Active', created: '2025-07-10' },
      { id: 4, name: 'Bob Lee', email: 'bob@example.com', role: 'User', status: 'Banned', created: '2025-07-08' },
      { id: 5, name: 'Charlie Kim', email: 'charlie@example.com', role: 'User', status: 'Active', created: '2025-07-01' },
      { id: 6, name: 'Diana Green', email: 'diana@example.com', role: 'Business', status: 'Active', created: '2025-07-19' },
      { id: 7, name: 'Eric Wang', email: 'eric@example.com', role: 'Admin', status: 'Active', created: '2025-07-18' },
      // Add more sample users here if needed
    ]
  }
}

onMounted(() => {
  fetchUsers()
})

// Filtering users based on search, role, status
const filteredUsers = computed(() => {
  let temp = users.value

  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase()
    temp = temp.filter(
      u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    )
  }

  if (selectedRole.value) {
    temp = temp.filter(u => u.role === selectedRole.value)
  }

  if (selectedStatus.value) {
    temp = temp.filter(u => u.status === selectedStatus.value)
  }

  // Sort
  temp = [...temp].sort((a, b) => {
    const aKey = a[sortKey.value] || ''
    const bKey = b[sortKey.value] || ''
    if (typeof aKey === 'string' && typeof bKey === 'string') {
      return aKey.localeCompare(bKey) * sortOrder.value
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
function toggleDropdown(idx) {
  dropdownOpen.value = dropdownOpen.value === idx ? null : idx
}
function viewUser(user) {
  alert(`Viewing user: ${user.name} (${user.email})`)
  dropdownOpen.value = null
}
function editUser(user) {
  alert(`Editing user: ${user.name}`)
  dropdownOpen.value = null
}
function banUser(user) {
  if (confirm(`Ban user ${user.name}?`)) {
    user.status = 'Banned'
    dropdownOpen.value = null
  }
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
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
}
th:first-child,
td:first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
th:last-child,
td:last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
