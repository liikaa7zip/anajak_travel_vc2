import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const apiBase = "http://localhost:5000"

  // Fetch all orders (owner view or user view)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(`${apiBase}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      orders.value = res.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (err) {
      console.error(err)
    }
  }

  // Pending orders count (reactive)
  const pendingCount = () => orders.value.filter(o => o.status === 'pending').length

  // Update order status in store (real-time update)
  const updateOrderStatus = (orderId, status) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) order.status = status
  }

  // Add a new order to store
  const addOrder = (order) => {
    orders.value.unshift(order)
  }

  return { orders, fetchOrders, pendingCount, updateOrderStatus, addOrder }
})
