<template>
  <div :class="darkMode ? 'bg-gray-900 text-gray-100' : 'text-indigo-900'" class="min-h-screen p-8 transition-colors duration-500 max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold mb-8">Admin Blog Management</h2>

    <!-- Dark mode toggle -->
    <div class="mb-6 flex justify-end">
      <label class="flex items-center space-x-2 cursor-pointer select-none">
        <input type="checkbox" v-model="darkMode" />
        <span>Dark Mode</span>
      </label>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-6 border-b pb-3 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="activeTab === tab
          ? (darkMode ? 'border-yellow-400 text-yellow-400' : 'border-indigo-700 text-indigo-700')
          : 'text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-yellow-400'"
        class="border-b-2 pb-1 font-semibold transition"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Featured Stories Management -->
    <section v-if="activeTab === 'Featured Stories'">
      <div class="mb-4 flex items-center space-x-4">
        <input v-model="searchFeatured" placeholder="Search stories..." class="flex-grow p-2 border rounded" />
        <button @click="clearFeaturedForm" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Clear</button>
      </div>
      <form @submit.prevent="saveFeatured" :class="darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'" class="p-6 rounded shadow mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input v-model="featuredForm.title" placeholder="Title" required class="p-3 border rounded" />
          <input v-model="featuredForm.image" placeholder="Image URL" required class="p-3 border rounded" />
          <input v-model="featuredForm.excerpt" placeholder="Excerpt" required class="p-3 border rounded md:col-span-2" />
          <input v-model="featuredForm.link" placeholder="External Link (optional)" class="p-3 border rounded md:col-span-2" />
        </div>
        <button type="submit" class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded hover:bg-indigo-800 transition">
          {{ featuredEditIndex === -1 ? 'Add Featured Story' : 'Update Featured Story' }}
        </button>
      </form>

      <ul :class="darkMode ? 'divide-gray-700' : 'divide-gray-300'" class="divide-y max-h-96 overflow-y-auto">
        <li v-for="(post, i) in filteredFeaturedPosts" :key="post.id" class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <img :src="post.image" alt="thumb" class="w-16 h-16 rounded object-cover shadow" />
            <div>
              <h4 class="font-semibold text-lg">{{ post.title }}</h4>
              <p class="text-sm opacity-80">{{ post.excerpt }}</p>
              <a v-if="post.link" :href="post.link" target="_blank" class="text-indigo-600 hover:underline">Read more</a>
            </div>
          </div>
          <div class="space-x-3">
            <button @click="editFeatured(post, i)" class="text-yellow-500 hover:text-yellow-600" aria-label="Edit featured story">✏️</button>
            <button @click="deleteFeatured(i)" class="text-red-600 hover:text-red-700" aria-label="Delete featured story">🗑️</button>
          </div>
        </li>
      </ul>
    </section>

    <!-- Travel Guides Management -->
    <section v-if="activeTab === 'Travel Guides'">
      <div class="mb-4 flex items-center space-x-4">
        <input v-model="searchGuides" placeholder="Search guides..." class="flex-grow p-2 border rounded" />
        <button @click="clearGuideForm" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Clear</button>
      </div>

      <form @submit.prevent="saveGuide" :class="darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'" class="p-6 rounded shadow mb-6">
        <input v-model="guideForm.title" placeholder="Title" required class="p-3 border rounded mb-4 w-full" />
        <textarea v-model="guideForm.description" placeholder="Description" required rows="4" class="p-3 border rounded mb-4 w-full resize-none"></textarea>
        <input v-model="guideForm.tags" placeholder="Tags (comma separated)" class="p-3 border rounded mb-4 w-full" />
        <button type="submit" class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded hover:bg-indigo-800 transition">
          {{ guideEditIndex === -1 ? 'Add Travel Guide' : 'Update Travel Guide' }}
        </button>
      </form>

      <ul :class="darkMode ? 'divide-gray-700' : 'divide-gray-300'" class="divide-y max-h-96 overflow-y-auto">
        <li v-for="(guide, i) in filteredGuides" :key="guide.id" class="py-4 flex justify-between items-start">
          <div>
            <h4 class="font-semibold text-lg">{{ guide.title }}</h4>
            <p class="opacity-80">{{ guide.description }}</p>
            <div class="mt-1 space-x-2">
              <span
                v-for="tag in guide.tags"
                :key="tag"
                class="inline-block bg-indigo-300 text-indigo-900 rounded-full px-3 py-0.5 text-xs font-semibold"
                >
                {{ tag }}
              </span>

            </div>
          </div>
          <div class="space-x-3 flex-shrink-0 pt-1">
            <button @click="editGuide(guide, i)" class="text-yellow-500 hover:text-yellow-600" aria-label="Edit guide">✏️</button>
            <button @click="deleteGuide(i)" class="text-red-600 hover:text-red-700" aria-label="Delete guide">🗑️</button>
          </div>
        </li>
      </ul>
    </section>

    <!-- Gallery Photos Management -->
    <section v-if="activeTab === 'Gallery Photos'">
      <div class="mb-4 flex items-center space-x-4">
        <input v-model="searchPhotos" placeholder="Search photos by title..." class="flex-grow p-2 border rounded" />
        <button @click="clearPhotoForm" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Clear</button>
      </div>

      <form @submit.prevent="savePhoto" :class="darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'" class="p-6 rounded shadow mb-6">
        <input v-model="photoForm.title" placeholder="Photo Title" required class="p-3 border rounded mb-4 w-full" />
        <input v-model="photoForm.url" placeholder="Image URL" required class="p-3 border rounded mb-4 w-full" />
        <textarea v-model="photoForm.description" placeholder="Description" rows="3" class="p-3 border rounded mb-4 w-full resize-none"></textarea>
        <button type="submit" class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded hover:bg-indigo-800 transition">
          {{ photoEditIndex === -1 ? 'Add Photo' : 'Update Photo' }}
        </button>
      </form>

      <ul :class="darkMode ? 'divide-gray-700' : 'divide-gray-300'" class="divide-y max-h-96 overflow-y-auto">
        <li v-for="(photo, i) in filteredPhotos" :key="photo.id" class="py-4 flex justify-between items-center space-x-4">
          <img :src="photo.url" alt="photo-thumb" class="w-20 h-20 rounded object-cover shadow flex-shrink-0" />
          <div class="flex-grow">
            <h4 class="font-semibold text-lg">{{ photo.title }}</h4>
            <p class="text-sm opacity-80">{{ photo.description }}</p>
          </div>
          <div class="space-x-3 flex-shrink-0">
            <button @click="editPhoto(photo, i)" class="text-yellow-500 hover:text-yellow-600" aria-label="Edit photo">✏️</button>
            <button @click="deletePhoto(i)" class="text-red-600 hover:text-red-700" aria-label="Delete photo">🗑️</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

// Dark mode state
const darkMode = ref(false)

// Tabs
const tabs = ['Featured Stories', 'Travel Guides', 'Gallery Photos']
const activeTab = ref(tabs[0])

// === Featured Stories ===
const featuredPosts = ref([])
const featuredForm = ref({ title: '', excerpt: '', image: '', link: '' })
const featuredEditIndex = ref(-1)
const searchFeatured = ref('')
const searchPhotos = ref('')
const filteredPhotos = computed(() => {
  if (!searchPhotos.value) return galleryPhotos.value;
  return galleryPhotos.value.filter(photo =>
    photo.title.toLowerCase().includes(searchPhotos.value.toLowerCase())
  );
});




const filteredFeaturedPosts = computed(() => {
  if (!searchFeatured.value) return featuredPosts.value
  return featuredPosts.value.filter(post =>
    post.title.toLowerCase().includes(searchFeatured.value.toLowerCase())
  )
})

async function fetchFeatured() {
  try {
    const res = await axios.get(`${API_BASE}/featured-stories`)
    featuredPosts.value = res.data
  } catch (err) {
    console.error('Error fetching featured stories:', err)
  }
}

async function saveFeatured() {
  try {
    if (featuredEditIndex.value === -1) {
      await axios.post(`${API_BASE}/featured-stories`, featuredForm.value)
    } else {
      const id = featuredPosts.value[featuredEditIndex.value].id
      await axios.put(`${API_BASE}/featured-stories/${id}`, featuredForm.value)
    }
    await fetchFeatured()
    clearFeaturedForm()
  } catch (err) {
    console.error('Error saving featured:', err)
  }
}

function editFeatured(post, index) {
  featuredForm.value = { ...post }
  featuredEditIndex.value = index
}

async function deleteFeatured(index) {
  if (!confirm('Delete this post?')) return
  try {
    const id = featuredPosts.value[index].id
    await axios.delete(`${API_BASE}/featured-stories/${id}`)
    await fetchFeatured()
  } catch (err) {
    console.error('Error deleting featured:', err)
  }
}

function clearFeaturedForm() {
  featuredForm.value = { title: '', excerpt: '', image: '', link: '' }
  featuredEditIndex.value = -1
  searchFeatured.value = ''
}

// === Travel Guides ===
const guides = ref([])
const guideForm = ref({ title: '', description: '', tags: '' })
const guideEditIndex = ref(-1)
const searchGuides = ref('')

const filteredGuides = computed(() => {
  if (!searchGuides.value) return guides.value
  return guides.value.filter(g =>
    g.title.toLowerCase().includes(searchGuides.value.toLowerCase())
  )
})

async function fetchGuides() {
  try {
    const res = await axios.get(`${API_BASE}/travel-guides`)
    guides.value = res.data.map(g => ({
      ...g,
      tags: Array.isArray(g.tags) ? g.tags : (g.tags || '').split(',')
    }))
  } catch (err) {
    console.error('Error fetching travel guides:', err)
  }
}

async function saveGuide() {
  try {
    const formToSend = {
      ...guideForm.value,
      tags: guideForm.value.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
        .join(',')
    }

    if (guideEditIndex.value === -1) {
      await axios.post(`${API_BASE}/travel-guides`, formToSend)
    } else {
      const id = guides.value[guideEditIndex.value].id
      await axios.put(`${API_BASE}/travel-guides/${id}`, formToSend)
    }

    await fetchGuides()
    clearGuideForm()
  } catch (err) {
    console.error('Error saving guide:', err)
  }
}

function editGuide(g, index) {
  guideForm.value = {
    ...g,
    tags: Array.isArray(g.tags) ? g.tags.join(', ') : g.tags || ''
  }
  guideEditIndex.value = index
}

async function deleteGuide(index) {
  if (!confirm('Delete this guide?')) return
  try {
    const id = guides.value[index].id
    await axios.delete(`${API_BASE}/travel-guides/${id}`)
    await fetchGuides()
  } catch (err) {
    console.error('Error deleting guide:', err)
  }
}

function clearGuideForm() {
  guideForm.value = { title: '', description: '', tags: '' }
  guideEditIndex.value = -1
  searchGuides.value = ''
}

// === Gallery Photos ===
const galleryPhotos = ref([])
const photoForm = ref({ title: '', url: '', description: '' })
const photoEditIndex = ref(-1)



async function fetchGallery() {
  try {
    const res = await axios.get(`${API_BASE}/gallery-photos`)
    galleryPhotos.value = res.data
  } catch (err) {
    console.error('Error fetching gallery photos:', err)
  }
}

async function savePhoto() {
  try {
    if (photoEditIndex.value === -1) {
      await axios.post(`${API_BASE}/gallery-photos`, photoForm.value)
    } else {
      const id = galleryPhotos.value[photoEditIndex.value].id
      await axios.put(`${API_BASE}/gallery-photos/${id}`, photoForm.value)
    }
    await fetchGallery()
    clearPhotoForm()
  } catch (err) {
    console.error('Error saving photo:', err)
  }
}

function editPhoto(photo, index) {
  photoForm.value = { ...photo }
  photoEditIndex.value = index
}

async function deletePhoto(index) {
  if (!confirm('Delete this photo?')) return
  try {
    const id = galleryPhotos.value[index].id
    await axios.delete(`${API_BASE}/gallery-photos/${id}`)
    await fetchGallery()
  } catch (err) {
    console.error('Error deleting photo:', err)
  }
}

function clearPhotoForm() {
  photoForm.value = { title: '', url: '', description: '' }
  photoEditIndex.value = -1
  searchPhotos.value = ''
}

// Initial fetches on mount
onMounted(() => {
  fetchFeatured()
  fetchGuides()
  fetchGallery()
})
</script>
