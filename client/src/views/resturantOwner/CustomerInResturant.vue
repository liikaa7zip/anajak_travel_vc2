<template>
  <div class="bg-gray-50 min-h-screen py-10 px-5">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-1">👥 Customer Management</h1>
          <p class="text-gray-500 text-sm">Manage your registered users efficiently.</p>
        </div>
        <button
          @click="showAddModal = true"
          class="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition"
        >
          ➕ Add New User
        </button>
      </div>

      <!-- Table -->
      <div class="bg-white shadow-xl rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-indigo-50">
              <tr class="text-left text-sm font-medium text-indigo-700 uppercase tracking-wider">
                <th class="px-6 py-3">No</th>
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Email</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3">Created At</th>
                <th class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100 text-gray-700 text-sm">
              <tr v-for="(user, index) in paginatedUsers" :key="user.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">{{ index + 1 + (currentPage - 1) * perPage }}</td>
                <td class="px-6 py-4 font-semibold">{{ user.username }}</td>
                <td class="px-6 py-4">{{ user.email }}</td>
                <td class="px-6 py-4">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-green-100 text-green-700': user.status === 'active',
                      'bg-yellow-100 text-yellow-700': user.status === 'pending',
                      'bg-red-100 text-red-700': user.status === 'inactive',
                    }"
                  >
                    {{ user.status || 'N/A' }}
                  </span>
                </td>
                <td class="px-6 py-4">{{ formattedDate(user.createdAt) }}</td>
                <td class="px-6 py-4 space-x-2">
                  <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-800 font-medium transition">Edit</button>
                  <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-800 font-medium transition">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
          <div class="text-sm text-gray-600">
            Showing {{ (currentPage - 1) * perPage + 1 }} -
            {{ Math.min(currentPage * perPage, users.length) }} of {{ users.length }}
          </div>
          <div class="space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50">
              &larr; Prev
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50">
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative animate-fade-in">
        <h3 class="text-xl font-semibold mb-4">🧑‍💻 Add New User</h3>

        <label class="block mb-3">
          <span class="text-sm text-gray-700">Username</span>
          <input v-model="newUser.username" type="text" class="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </label>
        <label class="block mb-3">
          <span class="text-sm text-gray-700">Email</span>
          <input v-model="newUser.email" type="email" class="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </label>
        <label class="block mb-3">
          <span class="text-sm text-gray-700">Password</span>
          <input v-model="newUser.password" type="password" class="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </label>

        <div class="flex justify-end space-x-3">
          <button @click="cancelAdd" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          <button :disabled="creating" @click="createUser" class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50">
            {{ creating ? "Creating..." : "Create" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerInRestaurant",
  data() {
    return {
      users: [],
      showAddModal: false,
      newUser: {
        username: "",
        email: "",
        password: "",
      },
      creating: false,
      loading: false,
      currentPage: 1,
      perPage: 8,
    };
  },
  async created() {
    await this.fetchUsers();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.users.slice(start, start + this.perPage);
    },
  },
  methods: {
    getAuthHeader() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        this.$router.push("/login");
        return null;
      }
      return { Authorization: "Bearer " + token };
    },

    async fetchUsers() {
      this.loading = true;
      try {
        const headers = this.getAuthHeader();
        if (!headers) return;

        const response = await axios.get("http://localhost:5000/api/users", {
          headers,
        });

        this.users = response.data.filter((user) => user.role === "user");
      } catch (err) {
        alert("Error fetching users");
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async createUser() {
      if (
        !this.newUser.username.trim() ||
        !this.newUser.email.trim() ||
        !this.newUser.password.trim()
      ) {
        alert("Please fill in all fields.");
        return;
      }

      this.creating = true;
      try {
        const payload = {
          username: this.newUser.username,
          email: this.newUser.email,
          password: this.newUser.password,
          role: "user",
        };

        const headers = this.getAuthHeader();
        if (!headers) return;

        await axios.post(
          "http://localhost:5000/api/users/restaurant-owner/create-user",
          payload,
          { headers }
        );

        await this.fetchUsers();
        alert("User created successfully.");
        this.showAddModal = false;
        this.clearNewUserForm();
      } catch (error) {
        console.error("Failed to create user:", error);
        alert(
          error.response?.data?.message || "Failed to create user. Please try again."
        );
      } finally {
        this.creating = false;
      }
    },

    cancelAdd() {
      this.showAddModal = false;
      this.clearNewUserForm();
    },

    clearNewUserForm() {
      this.newUser = {
        username: "",
        email: "",
        password: "",
      };
    },

    deleteUser(id) {
      if (!confirm("Delete this user?")) return;

      const headers = this.getAuthHeader();
      if (!headers) return;

      axios
        .delete(`http://localhost:5000/api/users/${id}`, { headers })
        .then(() => {
          this.users = this.users.filter((u) => u.id !== id);
          alert("User deleted.");
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Failed to delete user.");
        });
    },

    formattedDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}
</style>
