<template>
  <div class="container mx-auto p-6 min-h-screen">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-6">🍽️ Food Management</h1>

      <!-- Header: Title & Buttons -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 class="text-2xl font-bold text-gray-800">📂 Categories</h2>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-4">
          <button @click="openCategoryModal"
            class="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-md transition">
            ➕ Add Category
          </button>
          <button @click="openAddModal"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition">
            ➕ Add Food
          </button>
        </div>
      </div>

      <!-- Category Tags -->
      <div class="flex flex-wrap gap-3 mb-6">
        <div v-for="cat in categories" :key="cat.id"
          class="px-4 py-2 bg-gray-100 rounded-lg shadow text-sm font-semibold text-gray-800">
          {{ cat.name }}
        </div>
      </div>

      <!-- Filter Dropdown -->
      <div class="sm:flex sm:items-center sm:justify-between gap-4">
        <label for="filterCategory" class="block text-lg font-medium text-gray-700 mb-2 sm:mb-0">
          🔍 Filter by Category
        </label>
        <select id="filterCategory" v-model="selectedCategoryId"
          class="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="String(cat.id)">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Food Cards -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      
      <div v-for="food in filteredFoods" :key="food.id"
  class="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-400 cursor-pointer group">

  <!-- Image Section -->
  <div class="relative h-44 overflow-hidden rounded-t-2xl">
    <img :src="food.image || placeholderImage" alt="Food"
      class="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
      @error="onImageError" />

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/50 transition-all duration-500"></div>

    <!-- Status Badge (Top-left) -->
    <span class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md"
      :class="food.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'">
      {{ food.isActive ? 'Active' : 'Inactive' }}
    </span>

    <!-- 3-dot Dropdown (Top-right) -->
<div class="absolute top-3 right-3 text-gray-500">
  <div class="relative" @click.stop="food.showDropdown = !food.showDropdown">
    <button class="p-1 rounded-full hover:bg-gray-100 transition">
      ⋮
    </button>
    <div v-if="food.showDropdown"
      class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-50">
      
      <!-- Edit -->
      <button @click="openEditModal(food)"
        class="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition">
        ✏️ Edit
      </button>

      <!-- Toggle Top Pick -->
      <button @click="toggleTopPick(food)"
        class="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition">
        {{ food.isTopPick ? "⭐ Remove Top Pick" : "⭐ Mark as Top Pick" }}
      </button>

      <!-- Delete -->
      <button @click="deleteFood(food.id)"
        class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
        🗑️ Delete
      </button>
    </div>
  </div>
</div>

  </div>

  <!-- Content Section -->
  <div class="p-5 flex flex-col h-[280px]">
    <!-- Food Name -->
    <h3 class="text-lg font-bold text-gray-900 mb-2 truncate" :title="food.name">{{ food.name }}</h3>

    <!-- Category & Location -->
    <div class="flex flex-wrap gap-2 mb-3 text-sm">
      <span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
        🗂️ {{ food.category ? food.category.name : 'No Category' }}
      </span>
      <span v-if="food.Location" class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md truncate max-w-[140px]">
        📍 {{ food.Location.name }}
      </span>
    </div>

    <!-- Price -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-gray-700 text-sm font-medium">Price</span>
      <span
        class="text-lg font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
        ${{ food.price.toFixed(2) }}
      </span>
    </div>

    <!-- Extra Info -->
    <div class="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
      <div>Created: <span class="font-medium text-gray-700">{{ new Date(food.createdAt).toLocaleDateString() }}</span></div>
      <div>Updated: <span class="font-medium text-gray-700">{{ new Date(food.updatedAt).toLocaleDateString() }}</span></div>
      <div>Times Ordered: <span class="font-medium text-gray-700">{{ food.timesOrdered || 0 }}</span></div>
      <div>Hotel: <span class="font-medium text-gray-700">{{ food.hotelName || 'N/A' }}</span></div>
    </div>

    <!-- Activate / Deactivate Listing Button -->
<div class="mt-auto">
  <button @click="toggleSell(food)"
    :class="food.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
    class="w-full text-white py-2 rounded-lg font-semibold transition">
    {{ food.isActive ? "Deactivate Listing" : "Activate Listing" }}
    
  </button>
</div>

  </div>
</div>



      <div v-if="foods.length === 0" class="col-span-full text-center mt-24">
        <p class="text-gray-500 text-xl">🍽️ No foods available yet. Add some delicious dishes!</p>
      </div>
    </div>

    <!-- Food Modal -->
    <transition name="fade">
      <div v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-8 relative">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">
            {{ isEditing ? "Edit Food" : "Add New Food" }}
          </h2>
          <form @submit.prevent="isEditing ? updateFood() : createFood()" class="space-y-5">
            <!-- Name -->
            <div>
              <label for="name" class="block font-medium text-gray-700 mb-1">Name</label>
              <input id="name" v-model="form.name" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required />
            </div>

            <!-- Price -->
            <div>
              <label for="price" class="block font-medium text-gray-700 mb-1">Price ($)</label>
              <input id="price" v-model.number="form.price" type="number" min="0" step="0.01"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required />
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="block font-medium text-gray-700 mb-1">Location</label>
              <select id="location" v-model="form.locationId"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required>
                <option value="" disabled>Select Location</option>
                <option v-for="loc in locations" :key="loc.id" :value="String(loc.id)">{{ loc.name }}</option>
              </select>
            </div>

            <!-- Category -->
            <div>
              <label for="category" class="block font-medium text-gray-700 mb-1">Category</label>
              <select id="category" v-model="form.categoryId"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required>
                <option value="" disabled>Select Category</option>
                <option v-for="cat in categories" :key="cat.id" :value="String(cat.id)">{{ cat.name }}</option>
              </select>
            </div>



            <!-- Image -->
            <div>
              <label for="image" class="block font-medium text-gray-700 mb-1">Image URL</label>
              <input id="image" v-model="form.image" type="url" placeholder="http://example.com/image.jpg"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button type="button" @click="closeModal"
                class="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold">
                Cancel
              </button>
              <button type="submit"
                class="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                {{ isEditing ? "Update" : "Add" }}
              </button>
            </div>
          </form>

          <!-- Close Button -->
          <button @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
            aria-label="Close modal">
            &times;
          </button>
        </div>
      </div>
    </transition>

    <!-- Category Modal -->
    <transition name="fade">
      <div v-if="showCategoryModal"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl p-8 relative">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">➕ Add New Category</h2>
          <form @submit.prevent="submitCategory" class="space-y-5">
            <div>
              <label for="newCategoryName" class="block font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input id="newCategoryName" v-model="newCategoryName" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required />
            </div>

            <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button type="button" @click="closeCategoryModal"
                class="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold">
                Cancel
              </button>
              <button type="submit"
                class="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold">
                Add
              </button>
            </div>
          </form>

          <!-- Close Button -->
          <button @click="closeCategoryModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
            aria-label="Close modal">
            &times;
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      foods: [],
      locations: [],
      categories: [],
      showModal: false,
      showCategoryModal: false,
      isEditing: false,
      newCategoryName: "",
      selectedCategoryId: "", 

      form: {
        id: null,
        name: "",
        price: 0,
        image: "",
        locationId: "",
        categoryId: "",
        hotelName: "", 
      },
      placeholderImage: "https://via.placeholder.com/100x70?text=No+Image",
    };
  },
  computed: {
    filteredFoods() {
      if (!this.selectedCategoryId) return this.foods;
      const selectedIdNum = Number(this.selectedCategoryId);
      return this.foods.filter(food => food.categoryId === selectedIdNum);
    },
  },
  methods: {
    loadFoods() {
  axios
    .get("http://localhost:5000/api/foods/my-foods", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then((res) => {
      // Initialize extra properties for Vue
      this.foods = res.data.map(food => ({
        ...food,
        showDropdown: false,   // for dropdown menu
        isActive: food.isActive || false,  // for activate/deactivate button
      }));
    })
    .catch((err) => {
      console.error("Failed to load foods:", err);
      this.foods = [];
    });
},

toggleTopPick(food) {
    axios.put(`http://localhost:5000/api/foods/top-pick/${food.id}`, {}, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then(res => {
      food.isTopPick = res.data.food.isTopPick; // ✅ update in UI instantly
      alert(`"${food.name}" has been ${food.isTopPick ? "added to" : "removed from"} Top Picks.`);
    })
    .catch(err => {
      console.error("Failed to toggle Top Pick:", err);
      alert("Failed to update Top Pick status.");
    });
  },

    loadLocations() {
      axios
        .get("http://localhost:5000/api/locations")
        .then((res) => {
          this.locations = res.data;
        })
        .catch((err) => {
          console.error("Failed to load locations:", err);
        });
    },
    loadCategories() {
      axios
        .get("http://localhost:5000/api/categories")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.error("Failed to load categories:", err);
        });
    },

    // Modal Controls
    openAddModal() {
      this.resetForm();
      this.isEditing = false;
      this.showModal = true;
    },
    openEditModal(food) {
  this.form = {
    id: food.id,
    name: food.name,
    price: food.price,
    image: food.image,
    locationId: food.locationId ? String(food.locationId) : "",
    categoryId: food.categoryId ? String(food.categoryId) : "",
  };
  this.isEditing = true;
  this.showModal = true;
},

    closeModal() {
      this.showModal = false;
    },
    resetForm() {
      this.form = {
        id: null,
        name: "",
        price: 0,
        image: "",
        locationId: "",
        categoryId: "",
      };
    },

    // CRUD
    createFood() {
      const payload = {
  name: this.form.name,
  price: Number(this.form.price),
  image: this.form.image,
  locationId: Number(this.form.locationId),
  categoryId: Number(this.form.categoryId),
};


      axios.post("http://localhost:5000/api/foods", payload, {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
})
.then(() => { this.loadFoods(); })

        .catch((err) => {
          console.error("Failed to create food:", err);
          alert("Failed to create food.");
        });
    },
    updateFood() {
      const payload = {
        ...this.form,
        price: Number(this.form.price),
        locationId: Number(this.form.locationId),
        categoryId: Number(this.form.categoryId),
        hotelName: this.form.hotelName, // 🔹
      };

      axios
        .put(`http://localhost:5000/api/foods/${this.form.id}`, payload)
        .then(() => {
          this.loadFoods();
          this.closeModal();
          alert("Food updated successfully!");
        })
        .catch((err) => {
          console.error("Failed to update food:", err);
          alert("Failed to update food.");
        });
    },
    deleteFood(id) {
      if (!confirm("Are you sure you want to delete this food?")) return;
      axios
        .delete(`http://localhost:5000/api/foods/${id}`)
        .then(() => {
          this.loadFoods();
        })
        .catch((err) => {
          console.error("Failed to delete food:", err);
          alert("Failed to delete food.");
        });
    },

    onImageError(event) {
      event.target.src = this.placeholderImage;
    },

    // Category Modal
    openCategoryModal() {
      this.newCategoryName = "";
      this.showCategoryModal = true;
    },
    closeCategoryModal() {
      this.showCategoryModal = false;
    },
    submitCategory() {
      if (!this.newCategoryName.trim()) return;
      axios
        .post("http://localhost:5000/api/categories", { name: this.newCategoryName })
        .then(() => {
          this.loadCategories();
          this.closeCategoryModal();
          alert("Category added successfully!");
        })
        .catch((err) => {
          console.error("Failed to create category:", err);
          alert("Failed to create category.");
        });
    },
    toggleSell(food) {
  axios.put(`http://localhost:5000/api/foods/toggle/${food.id}`, {}, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  })
  .then(res => {
    food.isActive = res.data.food.isActive;
  })
  .catch(err => {
    console.error('Failed to update selling status:', err);
    alert('Failed to update selling status');
  });
},
  },
  mounted() {
    this.loadFoods();
    this.loadLocations();
    this.loadCategories();
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
