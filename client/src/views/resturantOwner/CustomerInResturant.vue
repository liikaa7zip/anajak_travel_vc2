<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Customer List</h2>

    <div v-if="loading" class="text-gray-500">Loading customers...</div>
    <div v-else-if="users.length === 0" class="text-gray-500">
      No customers found.
    </div>

    <table v-else class="min-w-full border border-gray-300 shadow-sm">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="px-4 py-2">No</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Created At</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="user.id"
          class="border-t hover:bg-gray-50"
        >
          <td class="px-4 py-2">{{ index + 1 }}</td>
          <td class="px-4 py-2">{{ user.username }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">
            <span
              class="px-2 py-1 rounded text-sm"
              :class="{
                'bg-green-200 text-green-800': user.status === 'active',
                'bg-yellow-200 text-yellow-800': user.status === 'pending',
                'bg-red-200 text-red-800': user.status === 'inactive'
              }"
            >
              {{ user.status || 'N/A' }}
            </span>
          </td>
          <td class="px-4 py-2">{{ formattedDate(user.createdAt) }}</td>
          <td class="px-4 py-2 space-x-2">
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              @click="editUser(user)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              @click="deleteUser(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit User Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded shadow-md w-96">
        <h3 class="text-lg font-semibold mb-4">Edit User</h3>
        <label class="block mb-2">
          Username:
          <input
            v-model="editForm.username"
            class="w-full border px-2 py-1 rounded"
            type="text"
          />
        </label>
        <label class="block mb-2">
          Email:
          <input
            v-model="editForm.email"
            class="w-full border px-2 py-1 rounded"
            type="email"
          />
        </label>
        <label class="block mb-4">
          Status:
          <select
            v-model="editForm.status"
            class="w-full border px-2 py-1 rounded"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <div class="flex justify-end space-x-2">
          <button
            @click="cancelEdit"
            class="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            :disabled="updating"
            @click="updateUser"
            class="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Update
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
      showEditModal: false,
      editForm: {
        id: null,
        username: "",
        email: "",
        status: "active",
      },
      loading: false,
      updating: false,
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    getAuthHeader() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
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

        // Show only customers (not admin or owner)
        this.users = response.data.filter((user) => user.role === "user");
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized. Please log in again.");
          localStorage.removeItem("token");
          this.$router.push("/login");
        } else if (error.response && error.response.status === 403) {
          alert("You are not authorized to view this data.");
        } else {
          alert("An error occurred while fetching users.");
        }
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) return;

      try {
        const headers = this.getAuthHeader();
        if (!headers) return;

        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers,
        });

        this.users = this.users.filter((user) => user.id !== id);
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    },

    editUser(user) {
      this.editForm = { ...user };
      this.showEditModal = true;
    },

    cancelEdit() {
      this.showEditModal = false;
      this.clearEditForm();
    },

    clearEditForm() {
      this.editForm = {
        id: null,
        username: "",
        email: "",
        status: "active",
      };
    },

    async updateUser() {
      this.updating = true;
      try {
        const headers = this.getAuthHeader();
        if (!headers) return;

        await axios.put(
          `http://localhost:5000/api/users/${this.editForm.id}`,
          this.editForm,
          { headers }
        );

        await this.fetchUsers();
        this.showEditModal = false;
        this.clearEditForm();
        alert("User updated successfully.");
      } catch (error) {
        console.error("Failed to update user:", error);
        alert("Failed to update user.");
      } finally {
        this.updating = false;
      }
    },

    formattedDate(dateStr) {
      if (!dateStr) return "N/A";
      return new Date(dateStr).toLocaleDateString();
    },
  },
};
</script>
