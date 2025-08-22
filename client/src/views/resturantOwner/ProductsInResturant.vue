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

    <!-- Food Card -->
<div class="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div v-for="food in filteredFoods" :key="food.id"
       class="relative group rounded-2xl overflow-hidden shadow-xl transition transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105">

    <!-- Gradient border -->
    <div class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-60 group-hover:opacity-100 transition"></div>

    <!-- Card body -->
    <div class="relative bg-white/90 backdrop-blur-md rounded-2xl flex flex-col h-full">

      <!-- Image Section -->
      <div class="relative h-52 w-full overflow-hidden rounded-t-2xl">
        <img :src="food.image ? `http://localhost:5000${food.image}` : placeholderImage"
             @error="onImageError"
             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        
          <!-- Top Pick Badge OR Active/Inactive Badge -->
  <span v-if="food.isTopPick"
        class="absolute top-2 left-2 px-3 py-1 text-xs font-bold rounded-full shadow-md bg-yellow-400 text-white z-10">
    ⭐ Top Pick
  </span>
  <span v-else
        class="absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full shadow-md"
        :class="food.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
    {{ food.isActive ? 'Active' : 'Inactive' }}
  </span>

        <!-- 3-dot menu -->
        <div class="absolute top-2 right-2">
          <div class="relative" @click.stop="food.showDropdown = !food.showDropdown">
            <button class="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition">
              ⋮
            </button>
            <div v-if="food.showDropdown"
                 class="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border border-gray-200 z-50">
              <button @click="openEditModal(food)"
                      class="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition">
                ✏️ Edit
              </button>
              <button @click="toggleTopPick(food)"
                      class="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition">
                {{ food.isTopPick ? "⭐ Remove Top Pick" : "⭐ Mark Top Pick" }}
              </button>
              <button @click="deleteFood(food.id)"
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="p-5 flex flex-col flex-1">
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
          <span class="text-lg font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
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
  </div>

  <!-- Empty State -->
  <div v-if="filteredFoods.length === 0" class="col-span-full text-center mt-24">
    <p class="text-gray-500 text-xl">🍽️ No foods available yet. Add some delicious dishes!</p>
  </div>
</div>


    

    <!-- Food Modal -->
<transition name="fade">
  <div v-if="showModal"
       class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
    <div class="relative w-full max-w-lg rounded-3xl shadow-2xl p-6 bg-gradient-to-br from-white/90 to-white/80 border border-indigo-200 ring-1 ring-indigo-100">
      
      <!-- Header -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ isEditing ? "✏️ Edit Food" : "🍽️ Add New Food" }}
      </h2>
      
      <!-- Form (already styled) -->
      <form @submit.prevent="isEditing ? updateFood() : createFood()" class="space-y-6 p-4 bg-white/90 rounded-2xl shadow-inner border border-gray-100">
        <!-- Name & Price -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="name" class="font-medium text-gray-700 mb-2 flex items-center gap-2">📝 Name</label>
            <input id="name" v-model="form.name" type="text"
                   class="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                   required />
          </div>
          <div class="flex flex-col">
            <label for="price" class="font-medium text-gray-700 mb-2 flex items-center gap-2">💲 Price ($)</label>
            <input id="price" type="number" v-model="form.price" min="0" step="0.01"
       class="w-full border border-green-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
       required />

          </div>
        </div>

        <!-- Location & Category -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="location" class="font-medium text-gray-700 mb-2 flex items-center gap-2">📍 Location</label>
            <select id="location" v-model="form.locationId"
                    class="w-full border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                    required>
              <option value="" disabled>Select Location</option>
              <option v-for="loc in locations" :key="loc.id" :value="String(loc.id)">{{ loc.name }}</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="category" class="font-medium text-gray-700 mb-2 flex items-center gap-2">🗂️ Category</label>
            <select id="category" v-model="form.categoryId"
                    class="w-full border border-yellow-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                    required>
              <option value="" disabled>Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="String(cat.id)">{{ cat.name }}</option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div class="flex flex-col">
          <label for="description" class="font-medium text-gray-700 mb-2 flex items-center gap-2">🖊️ Description</label>
          <textarea id="description" v-model="form.description" rows="3"
                    class="w-full border border-pink-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                    placeholder="Write a short description about the food"></textarea>
        </div>

        <!-- Image -->
        <div class="flex flex-col">
          <label for="image" class="font-medium text-gray-700 mb-2 flex items-center gap-2">
            🖼️ Food Image
          </label>
          <input id="image" type="file" accept="image/*" @change="handleFileUpload"
            class="w-full border border-blue-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button type="button" @click="closeModal"
                  class="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold shadow-md transition">Cancel</button>
          <button type="submit"
                  class="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform">
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
        description: "",
      },
      placeholderImage: "https://dummyimage.com/100x70/cccccc/000000.png&text=No+Image",
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

   getFoodImage(imagePath) {
    if (!imagePath) return this.placeholderImage;
    // if imagePath is already full URL
    if (imagePath.startsWith("http")) return imagePath;
    // otherwise prepend backend URL
    return `http://localhost:5000${imagePath}`;
  },
  onImageError(event) {
    console.error("❌ Image load failed for:", event.target.src);
    event.target.src = this.placeholderImage;
  },

    
    handleImageError(imagePath) {
      console.error("❌ Image load failed for:", imagePath)
    },
    handleImageLoad(imagePath) {
      console.log("✅ Image loaded successfully:", imagePath)
    },
    loadFoods() {
  axios
    .get("http://localhost:5000/api/foods/my-foods", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then((res) => {
      console.log("Fetched foods:", res.data); 
      // Initialize extra properties for Vue
      this.foods = res.data.map(food => ({
        ...food,
        price: Number(food.price), 
        showDropdown: false,   // for dropdown menu
        isActive: food.isActive || false,  // for activate/deactivate button
      }));
    })
    .catch((err) => {
      console.error("Failed to load foods:", err);
      this.foods = [];
    });
},



handleFileUpload(event) {
  this.selectedFile = event.target.files[0];
},

  async uploadFile() {
    if (!this.selectedFile) return null;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data.file.filename; // the uploaded file name
    } catch (err) {
      console.error('File upload failed', err);
      return null;
    }
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
    description: "",
  };
  this.selectedFile = null;
},

    // CRUD
    async createFood() {
  const formData = new FormData();
  formData.append("name", this.form.name);
  formData.append("price", Number(this.form.price) || 0); // ensure number
  formData.append("description", this.form.description);
  formData.append("locationId", this.form.locationId);
  formData.append("categoryId", this.form.categoryId);

  if (this.selectedFile) {
    formData.append("file", this.selectedFile);
  }

  try {
    const res = await axios.post("http://localhost:5000/api/foods", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    // Ensure the price is number to avoid .toFixed errors
    const newFood = {
      ...res.data,
      price: Number(res.data.price) || 0,
      showDropdown: false,
      isActive: res.data.isActive || false,
    };

    this.foods.push(newFood);

    // Close modal and reset form
    this.closeModal();
    this.resetForm();
    this.selectedFile = null; // ✅ reset file input

    alert("Food added successfully!");
  } catch (err) {
    console.error("Error creating food:", err.response?.data || err.message);
    alert("Failed to add food.");
  }
},

    async updateFood() {
  try {
    // 1️⃣ Upload new file if selected
    if (this.selectedFile) {
      const uploadedFileName = await this.uploadFile();
      if (uploadedFileName) {
        this.form.image = `/uploads/${uploadedFileName}`;
      }
    }

    // 2️⃣ Prepare payload
    const payload = {
      ...this.form,
       price: Number(this.form.price), 
      locationId: Number(this.form.locationId),
      categoryId: Number(this.form.categoryId),
      description: this.form.description,
    };

    // 3️⃣ Send PUT request
    await axios.put(`http://localhost:5000/api/foods/${this.form.id}`, payload, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });

    // 4️⃣ Refresh and close modal
    this.loadFoods();
    this.closeModal();
    this.resetForm();
    alert("Food updated successfully!");
  } catch (err) {
    console.error("Failed to update food:", err);
    alert("Failed to update food.");
  }
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
  console.error("❌ Image load failed for:", event.target.src);
  event.target.src = this.placeholderImage; // fallback
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@keyframes fadeIn {
  from {opacity: 0; transform: scale(0.95);}
  to {opacity: 1; transform: scale(1);}
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}

/* Styles for Food Card */
.group:hover img {
  transform: scale(1.05);
}

.group:hover .relative {
  transition: transform 0.3s;
}

.backdrop-blur-md {
  backdrop-filter: blur(15px);
}

.transition {
  transition: all 0.3s ease-in-out;
}

.shadow-xl {
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.rounded-2xl {
  border-radius: 1.5rem;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #7f00ff, #e100ff);
}

</style>
