<template>
  <div class="min-h-screen flex items-center justify-center bg-white-900">
    <div class="w-[400px] p-6 bg-white-800 bg-opacity-90 rounded-xl shadow-lg border border-gray-200 backdrop-blur-sm">
      <h2 class="text-2xl font-bold mb-6 text-gray text-center">
        Add New User
      </h2>

      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- Name -->
        <div>
          <label for="username" class="block mb-1 text-gray-300 font-medium">
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            placeholder="Enter name"
            class="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block mb-1 text-gray-300 font-medium">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="admin@gmail.com"
            class="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block mb-1 text-gray-300 font-medium">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
            class="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <!-- Role -->
        <div>
          <label for="role" class="block mb-1 text-gray-300 font-medium">
            Role
          </label>
          <select
            id="role"
            v-model="form.role"
            required
            class="w-full px-4 py-2 bg-gray-100 border border-gray-600 rounded-lg text-gray focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          >
            <option disabled value="">-- Select role --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="restaurant_owner">Restaurant Owner</option>
            <option value="food_owner">Food Owner</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between">
          <button
            type="submit"
            class="w-5/12 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition"
          >
            Create
          </button>
          <button
            type="button"
            @click="resetForm"
            class="w-5/12 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition"
          >
            Cancel
          </button>
        </div>

        <!-- Message -->
        <p
          v-if="message"
          :class="[
            success
              ? 'text-green-400 bg-green-900 border border-green-700'
              : 'text-red-400 bg-red-900 border border-red-700',
            'px-4 py-2 rounded-lg mt-4 text-center font-medium',
          ]"
          role="alert"
        >
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNewUser',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        role: '',
      },
      message: '',
      success: false,
    }
  },
  methods: {
    async submitForm() {
      this.message = ''
      this.success = false

      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        })

        const data = await response.json()

        if (!response.ok) {
          this.message = data.message || 'Failed to create user'
          this.success = false
          return
        }

        this.message = 'User created successfully!'
        this.success = true

        this.resetForm()
      } catch (error) {
        this.message = 'Error: ' + error.message
        this.success = false
      }
    },
    resetForm() {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.form.role = ''
    },
  },
}
</script>

<style scoped>
/* Smooth fade-in for messages */
p[role='alert'] {
  animation: fadeIn 0.4s ease forwards;
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