<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-[400px] p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 class="text-2xl font-bold mb-6 text-gray-700 text-center">
        Add New User
      </h2>

      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- Username -->
        <div>
          <label for="username" class="block mb-1 text-gray-600 font-medium">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            placeholder="Enter username"
            class="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block mb-1 text-gray-600 font-medium">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
            class="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block mb-1 text-gray-600 font-medium">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
            class="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
        </div>

        <!-- Role -->
        <div>
          <label for="role" class="block mb-1 text-gray-600 font-medium">Role</label>
          <select
            id="role"
            v-model="form.role"
            required
            class="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
            <option disabled value="">-- Select role --</option>
            <option value="user">User</option>
            <option value="restaurant_owner">Restaurant Owner</option>
            <option value="hotel_owner">Hotel Owner</option>
            <option value="transport_owner">Transport Owner</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between">
          <button
            type="submit"
            class="w-5/12 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition"
          >
            Create
          </button>
          <button
            type="button"
            @click="resetForm"
            class="w-5/12 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow transition"
          >
            Cancel
          </button>
        </div>

        <!-- Message -->
        <p
          v-if="message"
          :class="[success
            ? 'text-green-700 bg-green-100 border border-green-400'
            : 'text-red-700 bg-red-100 border border-red-400',
            'px-4 py-2 rounded-lg mt-4 text-center font-medium']"
          role="alert"
        >
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  username: '',
  email: '',
  password: '',
  role: '',
})

const message = ref('')
const success = ref(false)

const submitForm = async () => {
  message.value = '';
  success.value = false;

  try {
    const adminToken = localStorage.getItem('token');
    if (!adminToken) {
      message.value = 'Admin token missing. Please log in again.';
      success.value = false;
      return;
    }

    const res = await fetch('http://localhost:5000/api/users/admin/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken,
      },
      body: JSON.stringify(form),
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);

      if (!res.ok) {
        message.value = data.message || 'Failed to create user';
        success.value = false;
        return;
      }

      message.value = data.message || 'User created successfully!';
      success.value = true;
      resetForm();

    } catch (parseError) {
      console.error('Response is not JSON:', text);
      message.value = 'Server error or invalid response received:\n' + text;
      success.value = false;
    }
  } catch (err) {
    message.value = 'Network or server error: ' + err.message;
    success.value = false;
  }
};



const resetForm = () => {
  form.username = ''
  form.email = ''
  form.password = ''
  form.role = ''
}
</script>

<style scoped>
p[role='alert'] {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
