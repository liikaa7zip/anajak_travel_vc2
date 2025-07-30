<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-8">✈️ Travel Itinerary Planner</h1>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Left panel: form + live preview -->
      <div>
        <!-- Form -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Create New Itinerary</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="title" class="block text-sm font-medium mb-1">Trip Title</label>
                <input v-model="form.title" type="text" placeholder="Trip Title" class="input" />
            </div>

            <div>
                <label for="destination" class="block text-sm font-medium mb-1">Destination</label>
                <input v-model="form.destination" type="text" placeholder="Destination" class="input" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1" for="startDate">Start Date</label>
                <input id="startDate" v-model="form.startDate" type="date" class="input" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1" for="endDate">End Date</label>
                <input id="endDate" v-model="form.endDate" type="date" class="input" />
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium mb-1" for="description">Description</label>
            <textarea v-model="form.description" placeholder="Trip Description" class="input mt-4 w-full h-24"></textarea>
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
              <button @click="removeActivity(index)" v-if="form.activities.length > 1" class="text-red-500 hover:underline">Remove</button>
            </div>
            <button @click="addActivity" class="text-purple-500 hover:underline">+ Add Activity</button>
          </div>

          <div class="mt-6 flex gap-4">
            <button @click="saveItinerary" class="btn-primary bg-purple-500">Save Itinerary</button>
            <button @click="resetForm" class="btn-secondary">Reset</button>
          </div>
        </div>

        <!-- Live Preview -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4 border-b pb-2">📍 Live Preview</h3>
          <p class="text-xl font-bold text-pink-700">{{ form.title || 'Trip Title' }}</p>
          <p class="text-gray-700">{{ form.destination || 'Destination' }}</p>
          <p class="text-sm text-gray-500">{{ form.startDate || 'Start Date' }} - {{ form.endDate || 'End Date' }}</p>
          <p class="text-sm mt-2 italic">{{ form.description }}</p>
          <ul class="mt-2 list-disc list-inside text-sm text-gray-600">
            <li v-for="(activity, index) in nonEmptyActivities" :key="'preview-' + index">
              {{ activity }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Right panel: Itinerary List -->
      <div>
        <h2 class="text-2xl font-bold mb-4">🗂️ Saved Itineraries ({{ itineraries.length }})</h2>
        <div v-if="itineraries.length === 0" class="text-gray-500">No itineraries created yet.</div>

        <div class="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-h-[70vh] overflow-y-auto">
          <div
            v-for="(itinerary, index) in itineraries"
            :key="index"
            @click="viewItinerary(itinerary, index)"
            class="bg-white shadow hover:shadow-lg transition cursor-pointer rounded-lg p-4 border border-gray-300"
          >
            <h3 class="text-xl font-bold text-pink-600">{{ itinerary.title }}</h3>
            <p class="text-sm text-gray-600 mb-1"><strong>Destination:</strong> {{ itinerary.destination }}</p>
            <p class="text-sm text-gray-600 mb-1"><strong>Dates:</strong> {{ itinerary.startDate }} - {{ itinerary.endDate }}</p>
            <p class="text-gray-700 mt-2 line-clamp-3">{{ itinerary.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for itinerary details / edit -->
    <div
      v-if="selectedItinerary"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white p-6 rounded-lg w-[90%] max-w-2xl shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl leading-none">×</button>

        <template v-if="!editMode">
          <h2 class="text-2xl font-bold mb-2">{{ selectedItinerary.title }}</h2>
          <p class="text-gray-700 mb-1"><strong>Destination:</strong> {{ selectedItinerary.destination }}</p>
          <p class="text-gray-700 mb-1"><strong>Dates:</strong> {{ selectedItinerary.startDate }} → {{ selectedItinerary.endDate }}</p>
          <p class="text-gray-700 mt-2"><strong>Description:</strong> {{ selectedItinerary.description }}</p>

          <div class="mt-4">
            <h3 class="font-semibold mb-2">Activities:</h3>
            <ul class="list-disc pl-5 text-gray-700">
              <li v-for="(act, i) in filteredActivities(selectedItinerary.activities)" :key="i">{{ act }}</li>
            </ul>
          </div>

          <div class="mt-6 flex gap-4 justify-end">
            <button @click="enterEditMode" class="btn-primary">Edit</button>
            <button @click="deleteItinerary" class="btn-danger">Delete</button>
          </div>
        </template>

        <template v-else>
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
import { ref, computed } from 'vue'

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

const saveItinerary = () => {
  if (!form.value.title || !form.value.destination) {
    alert('Please fill out required fields.')
    return
  }
  itineraries.value.push({ ...form.value })
  resetForm()
  alert('✅ Itinerary saved!')
}

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

const viewItinerary = (itinerary, index) => {
  selectedItinerary.value = itinerary
  selectedIndex.value = index
  editMode.value = false
}

const filteredActivities = (activities) => {
  return activities.filter(act => act.trim() !== '')
}

const nonEmptyActivities = computed(() => {
  return form.value.activities.filter(act => act.trim() !== '')
})

const closeModal = () => {
  selectedItinerary.value = null
  editMode.value = false
}

const enterEditMode = () => {
  if (!selectedItinerary.value) return
  editMode.value = true
  // Copy selected itinerary into edit form
  editForm.value = JSON.parse(JSON.stringify(selectedItinerary.value))
}

const cancelEdit = () => {
  editMode.value = false
  // Reset edit form
  editForm.value = {
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    activities: ['']
  }
}

const saveEdit = () => {
  if (!editForm.value.title || !editForm.value.destination) {
    alert('Please fill out required fields.')
    return
  }
  // Update itinerary in list
  if (selectedIndex.value !== null) {
    itineraries.value[selectedIndex.value] = JSON.parse(JSON.stringify(editForm.value))
    selectedItinerary.value = itineraries.value[selectedIndex.value]
  }
  editMode.value = false
  alert('✅ Itinerary updated!')
}

const deleteItinerary = () => {
  if (selectedIndex.value !== null) {
    if (confirm('Are you sure you want to delete this itinerary?')) {
      itineraries.value.splice(selectedIndex.value, 1)
      closeModal()
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
