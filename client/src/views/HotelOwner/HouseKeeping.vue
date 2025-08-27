<template>
  <div class="p-6 space-y-6">
    <h2 class="text-3xl font-bold text-gray-800">🏨 Housekeeping Management</h2>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-blue-50 p-4 rounded-lg shadow">
        <p class="text-gray-500 text-sm">Total Tasks</p>
        <p class="text-2xl font-bold text-blue-700">{{ housekeeping.length }}</p>
      </div>
      <div class="bg-yellow-50 p-4 rounded-lg shadow">
        <p class="text-gray-500 text-sm">In Progress</p>
        <p class="text-2xl font-bold text-yellow-600">
          {{ housekeeping.filter(h => h.status === 'in_progress').length }}
        </p>
      </div>
      <div class="bg-green-50 p-4 rounded-lg shadow">
        <p class="text-gray-500 text-sm">Completed</p>
        <p class="text-2xl font-bold text-green-600">
          {{ housekeeping.filter(h => h.status === 'completed').length }}
        </p>
      </div>
    </div>

    <!-- Assign Housekeeper -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">➕ Assign Housekeeper</h3>
      <form @submit.prevent="assignHousekeeper" class="grid grid-cols-4 gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Room</label>
          <select v-model="form.roomId" class="w-full border p-2 rounded">
            <option disabled value="">Select Room</option>
            <option v-for="room in rooms" :key="room.id" :value="room.id">
              Room {{ room.roomNumber }} ({{ room.RoomCategory?.name || 'Standard' }})
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Housekeeper</label>
          <input v-model="form.housekeeperName" type="text" placeholder="Housekeeper Name"
                 class="w-full border p-2 rounded" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Scheduled Time</label>
          <input v-model="form.scheduledTime" type="datetime-local" class="w-full border p-2 rounded" />
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Assign
        </button>
      </form>
    </div>

    <!-- Housekeeping Status -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">🧹 Housekeeping Status</h3>
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">Room</th>
            <th class="border p-2">Housekeeper</th>
            <th class="border p-2">Scheduled</th>
            <th class="border p-2">Status</th>
            <th class="border p-2">Notes</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in housekeeping" :key="task.id" class="hover:bg-gray-50">
            <td class="border p-2 font-semibold">{{ task.roomNumber }}</td>
            <td class="border p-2">{{ task.housekeeperName }}</td>
            <td class="border p-2">{{ formatDate(task.scheduledTime) }}</td>
            <td class="border p-2">
              <span :class="statusBadge(task.status)">{{ task.status }}</span>
            </td>
            <td class="border p-2">{{ task.notes || '—' }}</td>
            <td class="border p-2 space-x-2">
              <button v-if="task.status === 'assigned'" @click="claimTask(task)"
                      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Claim
              </button>
              <button @click="updateStatus(task.id, 'in_progress')"
                      class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Start
              </button>
              <button @click="updateStatus(task.id, 'completed')"
                      class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Done
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const housekeeping = ref([]);
const rooms = ref([]);
const form = ref({
  roomId: "",
  housekeeperName: "",
  scheduledTime: "",
});

// Fetch rooms
const fetchRooms = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/hotel-owners/rooms?include=RoomCategory");
    rooms.value = res.data.map(r => ({
      ...r,
      amenities: Array.isArray(r.amenities) ? r.amenities : JSON.parse(r.amenities || "[]"),
      images: Array.isArray(r.images) ? r.images : JSON.parse(r.images || "[]"),
    }));
  } catch (err) {
    console.error("Error fetching rooms:", err.response?.data || err.message);
  }
};

// Fetch housekeeping tasks
const fetchHousekeeping = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/hotel-owners/housekeeping");
    const data = res.data.data || [];
    housekeeping.value = data.flatMap(room =>
      (room.Housekeepings || []).map(task => ({
        ...task,
        roomNumber: room.roomNumber,
      }))
    );
  } catch (err) {
    console.error("Error fetching housekeeping:", err.response?.data || err.message);
  }
};

// Assign new housekeeper
const assignHousekeeper = async () => {
  if (!form.value.roomId || !form.value.housekeeperName || !form.value.scheduledTime) {
    alert("Please fill all fields");
    return;
  }
  try {
    await axios.post("http://localhost:5000/api/hotel-owners/housekeeping/assign", form.value);
    form.value = { roomId: "", housekeeperName: "", scheduledTime: "" };
    fetchHousekeeping();
  } catch (err) {
    console.error("Error assigning housekeeper:", err.response?.data || err.message);
  }
};

// Update task status
const updateStatus = async (id, status) => {
  try {
    await axios.put(`http://localhost:5000/api/hotel-owners/housekeeping/${id}`, { status });
    fetchHousekeeping();
  } catch (err) {
    console.error("Error updating status:", err.response?.data || err.message);
  }
};

// Claim task
const claimTask = async (task) => {
  const name = prompt("Enter your name to claim this task:");
  if (!name) return;
  try {
    await axios.put(`http://localhost:5000/api/hotel-owners/housekeeping/${task.id}`, {
      status: "in_progress",
      housekeeperName: name
    });
    fetchHousekeeping();
  } catch (err) {
    console.error("Error claiming task:", err.response?.data || err.message);
  }
};

// Format date
const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

// Badge styles
const statusBadge = (status) => {
  switch (status) {
    case "assigned": return "px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm font-medium";
    case "in_progress": return "px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-sm font-medium";
    case "completed": return "px-2 py-1 rounded bg-green-100 text-green-700 text-sm font-medium";
    default: return "";
  }
};

onMounted(() => {
  fetchRooms();
  fetchHousekeeping();
});
</script>

<style scoped>
table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>