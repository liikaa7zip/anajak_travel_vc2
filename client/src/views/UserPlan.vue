<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-8">✈️ Travel Itinerary Planner</h1>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left panel: Form -->
      <div class="order-1">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Create New Itinerary</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Trip Title</label>
              <input v-model="form.title" type="text" class="input" placeholder="Trip Title" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Destination</label>
              <input v-model="form.destination" type="text" class="input" placeholder="Destination" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Start Date</label>
              <input v-model="form.startDate" type="date" class="input" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">End Date</label>
              <input v-model="form.endDate" type="date" class="input" />
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="form.description" class="input w-full h-24" placeholder="Trip Description"></textarea>
          </div>

          <div class="mt-4">
            <label class="block font-semibold mb-2">Activities:</label>
            <div v-for="(activity, index) in form.activities" :key="index" class="flex gap-2 mb-2">
              <input
                v-model="form.activities[index]"
                type="text"
                placeholder="Activity"
                class="flex-1 input"
              />
              <button @click="removeActivity(index)" v-if="form.activities.length > 1" class="text-red-500 hover:underline">
                Remove
              </button>
            </div>
            <button @click="addActivity" class="text-purple-500 hover:underline">+ Add Activity</button>
          </div>

          <div class="mt-6 flex gap-4">
            <button @click="saveItinerary" class="btn-primary bg-purple-500 text-white px-4 py-2 rounded">Save</button>
            <button @click="resetForm" class="btn-secondary border px-4 py-2 rounded">Reset</button>
          </div>
        </div>
      </div>

      <!-- Right panel: Live Preview -->
      <div class="order-2">
        <div class="bg-white p-6 rounded-lg shadow-md h-full">
          <h3 class="text-lg font-semibold mb-4 border-b pb-2">📍 Live Preview</h3>
          <p class="text-xl font-bold text-pink-700">{{ form.title || 'Trip Title' }}</p>
          <p class="text-gray-700">{{ form.destination || 'Destination' }}</p>
          <p class="text-sm text-gray-500">{{ form.startDate || 'Start Date' }} → {{ form.endDate || 'End Date' }}</p>
          <p class="text-sm mt-2 italic">{{ form.description }}</p>
          <ul class="mt-2 list-disc list-inside text-sm text-gray-600">
            <li v-for="(activity, index) in nonEmptyActivities" :key="'preview-' + index">{{ activity }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Toggle Button for Saved Itineraries -->
    <div class="mt-10 text-center">
      <button @click="showItineraries = !showItineraries" class="bg-blue-500 text-white px-6 py-2 rounded shadow">
        {{ showItineraries ? 'Hide' : 'Show' }} Saved Itineraries ({{ itineraries.length }})
      </button>
    </div>

    <!-- Saved Itineraries -->
    <div v-if="showItineraries" class="max-w-6xl mx-auto mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(itinerary, index) in itineraries"
        :key="index"
        @click="viewItinerary(itinerary, index)"
        class="bg-white shadow hover:shadow-lg cursor-pointer rounded-lg p-4 border border-gray-200"
      >
        <h3 class="text-xl font-bold text-pink-600">{{ itinerary.title }}</h3>
        <p class="text-sm text-gray-600"><strong>Destination:</strong> {{ itinerary.destination }}</p>
        <p class="text-sm text-gray-600"><strong>Dates:</strong> {{ itinerary.startDate }} - {{ itinerary.endDate }}</p>
        <p class="text-gray-700 mt-2 line-clamp-3">{{ itinerary.description }}</p>
      </div>
    </div>

    <!-- Modal for itinerary details -->
    <div
      v-if="selectedItinerary"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white p-6 rounded-lg w-[90%] max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto relative">
        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl leading-none"
          aria-label="Close modal"
        >
          ×
        </button>

        <template v-if="!editMode">

          <h2 class="text-2xl font-bold mb-2">{{ selectedItinerary.title }}</h2>
          <p class="text-gray-700 mb-1"><strong>Destination:</strong> {{ selectedItinerary.destination }}</p>
          <p class="text-gray-700 mb-1"><strong>Dates:</strong> {{ selectedItinerary.startDate }} → {{ selectedItinerary.endDate }}</p>
          <p class="text-gray-700 mt-2"><strong>Description:</strong> {{ selectedItinerary.description }}</p>

          <div class="mt-4">
            <h3 class="font-semibold mb-2">Activities:</h3>
            <ul>
  <li v-for="(activity, index) in filteredActivities(selectedItinerary.activities)" :key="index">
    {{ activity }}
  </li>
</ul>

          </div>

          <div class="mt-6 flex gap-4 justify-end">
            <button @click="enterEditMode" class="btn-primary bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
            <button @click="deleteItinerary" class="btn-danger bg-red-600 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </template>

        <template v-else-if="editMode">

          <h2 class="text-2xl font-bold mb-4">Edit Itinerary</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input v-model="editForm.title" type="text" placeholder="Trip Title" class="input" />
            <input v-model="editForm.destination" type="text" placeholder="Destination" class="input" />
            <input v-model="editForm.startDate" type="date" class="input" />
            <input v-model="editForm.endDate" type="date" class="input" />
          </div>

          <textarea v-model="editForm.description" placeholder="Trip Description" class="input mt-4 w-full h-24"></textarea>

          <div class="mt-4">
            <label class="block font-semibold mb-2">Activities:</label>
            <div v-for="(activity, index) in editForm.activities" :key="index" class="flex gap-2 mb-2">
              <input
                v-model="editForm.activities[index]"
                type="text"
                placeholder="Activity"
                class="flex-1 input"
              />
              <button @click="removeEditActivity(index)" v-if="editForm.activities.length > 1" class="text-red-500 hover:underline">Remove</button>
            </div>
            <button @click="addEditActivity" class="text-blue-500 hover:underline">+ Add Activity</button>
          </div>

          <div class="mt-6 flex gap-4 justify-end">
            <button @click="saveEdit" class="btn-primary">Save</button>
            <button @click="cancelEdit" class="btn-secondary">Cancel</button>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/itineraries'
})

const showItineraries = ref(false)
const isEditing = ref(false)

const form = ref({
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
  description: '',
  activities: ['']
})

const itineraries = ref([])

const selectedItinerary = ref(null)
const selectedIndex = ref(null)
const editMode = ref(false)

const editForm = ref({
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
  description: '',
  activities: ['']
})

// Load itineraries from backend
const loadItineraries = async () => {
  try {
    const res = await api.get('/')
    itineraries.value = res.data
  } catch (err) {
    console.error('Failed to load itineraries', err)
  }
}

// Run on component mount
onMounted(loadItineraries)

// Activities management
const addActivity = () => {
  form.value.activities.push('')
}
const removeActivity = (index) => {
  form.value.activities.splice(index, 1)
}
const addEditActivity = () => {
  editForm.value.activities.push('')
}
const removeEditActivity = (index) => {
  editForm.value.activities.splice(index, 1)
}

// Create new itinerary
const saveItinerary = async () => {
  if (!form.value.title || !form.value.destination) {
    alert('Please fill out required fields.')
    return
  }

  try {
    const res = await api.post('/', form.value)
    itineraries.value.push(res.data)
    resetForm()
    alert('✅ Itinerary saved!')
  } catch (err) {
    console.error('Error saving itinerary', err)
    alert('❌ Failed to save itinerary')
  }
}

// Reset form
const resetForm = () => {
  form.value = {
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    activities: ['']
  }
}

// Open itinerary details modal
const viewItinerary = (itinerary, index) => {
  selectedItinerary.value = itinerary
  selectedIndex.value = index
  editMode.value = false
}

// Filter activities for preview and details (ignore empty)
const filteredActivities = (activities) => {
  if (!activities) return []
  if (typeof activities === 'string') {
    // Try parsing JSON string to array
    try {
      const parsed = JSON.parse(activities)
      if (Array.isArray(parsed)) return parsed.filter(act => act.trim() !== '')
      return []
    } catch {
      return []
    }
  }
  // If it's an array, filter normally
  if (Array.isArray(activities)) {
    return activities.filter(act => act.trim() !== '')
  }
  return []
}


const nonEmptyActivities = computed(() => {
  return form.value.activities.filter(act => act.trim() !== '')
})

// Close modal
const closeModal = () => {
  selectedItinerary.value = null
  editMode.value = false
}

// Enter edit mode and copy data
const enterEditMode = () => {
  if (!selectedItinerary.value) return;

  editMode.value = true;

  const itinerary = selectedItinerary.value;

  let activities = [];

  if (Array.isArray(itinerary.activities)) {
    activities = itinerary.activities;
  } else if (typeof itinerary.activities === 'string') {
    try {
      activities = JSON.parse(itinerary.activities);  // <-- Parse JSON string to array
      if (!Array.isArray(activities)) activities = [];
    } catch {
      activities = [];
    }
  }

  // Remove empty or whitespace-only strings
  activities = activities.filter(a => a.trim() !== '');

  editForm.value = {
    title: itinerary.title || '',
    destination: itinerary.destination || '',
    startDate: itinerary.startDate || '',
    endDate: itinerary.endDate || '',
    description: itinerary.description || '',
    activities
  };
};



// Cancel edit and reset form
const cancelEdit = () => {
  editMode.value = false
  editForm.value = {
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    activities: ['']
  }
}

// Save edited itinerary (PUT)
const saveEdit = async () => {
  if (!editForm.value.title || !editForm.value.destination) {
    alert('Please fill out required fields.')
    return
  }

  try {
    const id = selectedItinerary.value.id
    const res = await api.put(`/${id}`, editForm.value)
    itineraries.value[selectedIndex.value] = res.data
    selectedItinerary.value = res.data
    editMode.value = false
    alert('✅ Itinerary updated!')
  } catch (err) {
    console.error('Failed to update itinerary', err)
    alert('❌ Failed to update itinerary')
  }
}

// Delete itinerary (DELETE)
const deleteItinerary = async () => {
  if (selectedIndex.value !== null && selectedItinerary.value?.id) {
    if (confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await api.delete(`/${selectedItinerary.value.id}`)
        itineraries.value.splice(selectedIndex.value, 1)
        closeModal()
      } catch (err) {
        console.error('Failed to delete itinerary', err)
        alert('❌ Failed to delete itinerary')
      }
    }
  }
}
</script>


<style scoped>
.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400;
}
.btn-primary {
  @apply bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700;
}
.btn-secondary {
  @apply bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400;
}
.btn-danger {
  @apply bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700;
}
/* For multiline truncation in cards */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
