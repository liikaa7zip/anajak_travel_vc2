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
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>
            </div>
        </div>




        <!-- Food Cards -->
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="food in filteredFoods" :key="food.id"
                class="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-400 cursor-pointer">
                <div class="relative h-48 overflow-hidden rounded-t-3xl">
                    <img :src="food.image || placeholderImage" alt="Food"
                        class="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
                        @error="onImageError" />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 hover:opacity-60 transition-opacity duration-500">
                    </div>
                </div>

                <div class="p-6 flex flex-col h-[210px]">
                    <h3 class="text-2xl font-extrabold text-gray-900 mb-2 truncate" :title="food.name">
                        {{ food.name }}
                    </h3>

                    <div class="flex items-center gap-3 mb-4">
                        <span
                            class="inline-block bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                            ${{ food.price.toFixed(2) }}
                        </span>
                        <span v-if="food.Location"
                            class="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium shadow-inner truncate max-w-[150px]"
                            :title="food.Location.name">
                            📍 {{ food.Location.name }}
                        </span>
                    </div>

                    <div class="mt-auto flex gap-4">
                        <button @click="openEditModal(food)"
                            class="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 flex items-center justify-center gap-2"
                            title="Edit food">
                            ✏️ Edit
                        </button>
                        <button @click="deleteFood(food.id)"
                            class="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 flex items-center justify-center gap-2"
                            title="Delete food">
                            🗑️ Delete
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
                                <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
                            </select>
                        </div>

                        <!-- Category -->
                        <div>
                            <label for="category" class="block font-medium text-gray-700 mb-1">Category</label>
                            <select id="category" v-model="form.categoryId"
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required>
                                <option value="" disabled>Select Category</option>
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
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
            selectedCategoryId: "", // used for filtering

            form: {
                id: null,
                name: "",
                price: 0,
                image: "",
                locationId: "",
                categoryId: "",
            },
            placeholderImage: "https://via.placeholder.com/100x70?text=No+Image",
        };
    },
    computed: {
        filteredFoods() {
            if (!this.selectedCategoryId) return this.foods;
            return this.foods.filter(food => food.categoryId === this.selectedCategoryId);
        },
    },
    methods: {
        loadFoods() {
            axios
                .get("http://localhost:5000/api/foods?includeLocation=true")
                .then((res) => {
                    this.foods = res.data;
                })
                .catch((err) => {
                    console.error("Failed to load foods:", err);
                    this.foods = [];
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
                locationId: food.locationId || "",
                categoryId: food.categoryId || "",
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
            axios
                .post("http://localhost:5000/api/foods", this.form)
                .then(() => {
                    this.loadFoods();
                    this.closeModal();
                })
                .catch((err) => {
                    console.error("Failed to create food:", err);
                    alert("Failed to create food.");
                });
        },
        updateFood() {
            axios
                .put(`http://localhost:5000/api/foods/${this.form.id}`, this.form)
                .then(() => {
                    this.loadFoods();
                    this.closeModal();
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
                })
                .catch((err) => {
                    console.error("Failed to create category:", err);
                    alert("Failed to create category.");
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
