<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Manage Food</h1>

    <!-- Add Food Form -->
    <form @submit.prevent="createFood" class="mb-6 grid gap-3 max-w-md">
      <input v-model="form.name" placeholder="Name" class="border p-2" />
      <input v-model.number="form.price" type="number" placeholder="Price" class="border p-2" />
      <textarea v-model="form.description" placeholder="Description" class="border p-2"></textarea>
      <input type="file" @change="handleImage" class="border p-2" />
      <button type="submit" class="bg-blue-600 text-white py-2 rounded">Create Food</button>
    </form>

    <!-- Food List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="f in foods" :key="f.id" class="border p-4 rounded relative">
        <img :src="`http://localhost:5000/uploads/${f.image}`" alt="Food Image" class="w-full h-32 object-cover rounded mb-2" />
        <h3 class="text-lg font-semibold">{{ f.name }}</h3>
        <p class="text-sm">${{ f.price }}</p>
        <button @click="deleteFood(f.id)" class="absolute top-2 right-2 text-red-500">🗑</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const foods = ref([])
const form = ref({ name: '', price: '', description: '', image: null })

const fetchFoods = async () => {
  const res = await axios.get('http://localhost:5000/api/foods')
  foods.value = res.data
}

const handleImage = (e) => {
  form.value.image = e.target.files[0]
}

const createFood = async () => {
  const data = new FormData()
  data.append('name', form.value.name)
  data.append('price', form.value.price)
  data.append('description', form.value.description)
  data.append('image', form.value.image)

  await axios.post('http://localhost:5000/api/foods', data)
  form.value = { name: '', price: '', description: '', image: null }
  fetchFoods()
}

const deleteFood = async (id) => {
  await axios.delete(`http://localhost:5000/api/foods/${id}`)
  fetchFoods()
}

onMounted(fetchFoods)
</script>
