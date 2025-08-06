<template>
    <div class="p-6 max-w-screen-xl mx-auto min-h-screen ">
        <h1 class="text-4xl font-extrabold mb-6 text-gray-900 flex items-center justify-between">
            <span>📦 Order History</span>

            <div class="flex items-center gap-4 relative">
                <!-- Filter Button (as plain text) -->
                <div class="relative">
                    <button @click="toggleFilterDropdown"
                        class="text-gray-700 font-semibold text-base px-4 py-2 rounded-md flex items-center gap-2 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition">
                        Filter:
                        <span class="capitalize">{{ filterStatus || 'all' }}</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>


                    <div v-if="filterDropdownOpen"
                        class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                        <ul class="divide-y divide-gray-200">
                            <li @click="applyFilter('')" :class="[
                                'px-4 py-2 hover:bg-blue-50 text-sm capitalize cursor-pointer transition duration-150 ease-in-out',
                                filterStatus === '' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                            ]">
                                All
                            </li>
                            <li v-for="status in statuses" :key="status" @click="applyFilter(status)" :class="[
                                'px-4 py-2 hover:bg-blue-50 text-sm capitalize cursor-pointer transition duration-150 ease-in-out',
                                filterStatus === status ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                            ]">
                                {{ status }}
                            </li>
                        </ul>
                    </div>

                </div>

                <!-- Notification Bell Icon -->
                <button @click="handleNotificationClick"
                    class="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none" title="Refresh orders"
                    aria-label="Refresh orders">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span v-if="newOrdersCount > 0"
                        class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {{ newOrdersCount }}
                    </span>
                </button>
            </div>
        </h1>




        <div v-if="loading" class="text-center py-20 text-gray-500">Loading orders...</div>

        <div v-else-if="filteredOrders.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="order in filteredOrders" :key="order.id"
                class="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <!-- Header -->
                <div class="flex justify-between items-start mb-5">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-800 mb-1">Order #{{ order.id }}</h2>
                        <p class="text-sm text-gray-600 mb-1">
                            By: <span class="font-medium">{{ order.customerName }}</span>
                        </p>
                        <p class="text-xs text-gray-400">{{ formatDateTime(order.createdAt) }}</p>
                    </div>
                    <span class="px-3 py-1 text-xs rounded-full font-semibold whitespace-nowrap capitalize" :class="{
                        'bg-green-100 text-green-700': order.status === 'confirmed',
                        'bg-red-100 text-red-600': order.status === 'rejected',
                        'bg-yellow-100 text-yellow-700': order.status === 'pending',
                        'bg-gray-200 text-gray-500': !['confirmed', 'rejected', 'pending'].includes(order.status)
                    }">
                        {{ order.status }}
                    </span>
                </div>

                <!-- Food Items -->
                <div class="space-y-4 flex-grow" v-if="order.Food && order.Food.length">
                    <div v-for="food in order.Food" :key="food.id"
                        class="flex items-center gap-4 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                        <img :src="food.image" alt="food image" class="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                            loading="lazy" />
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-gray-900 truncate">{{ food.name }}</p>
                            <p class="text-sm text-gray-500">${{ food.price.toFixed(2) }}</p>
                        </div>
                        <div class="text-sm text-gray-700 font-medium whitespace-nowrap">
                            Qty: {{ food.OrderFoodItem.quantity }}
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-gray-500 py-4">No items available</div>

                <!-- Total Price -->
                <div class="mt-6 pt-4 border-t border-gray-200 text-right text-gray-800 font-semibold">
                    Total: ${{ order.totalPrice.toFixed(2) }}
                </div>
            </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-20 text-lg">No orders found.</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RestaurantOrder',
    data() {
        return {
            orders: [],
            filterStatus: '',
            filterDropdownOpen: false,
            newOrdersCount: 0,
            lastOrderCount: 0,
            loading: false,
            statuses: ['pending', 'confirmed', 'rejected'],
            showNewOrderAlert: false,
            alertTimeout: null
        }
    },
    computed: {
        filteredOrders() {
            if (!this.filterStatus) {
                return this.orders
            }
            return this.orders.filter(order => order.status === this.filterStatus)
        }
    },
    methods: {
        async fetchOrders() {
            this.loading = true
            try {
                const response = await axios.get('http://localhost:5000/api/orders')
                if (response.data && Array.isArray(response.data)) {
                    const currentCount = response.data.length
                    if (currentCount > this.lastOrderCount) {
                        // New orders received
                        const diff = currentCount - this.lastOrderCount
                        this.newOrdersCount += diff
                        this.showNewOrderAlert = true
                        this.setAlertTimeout()
                    }
                    this.lastOrderCount = currentCount
                    this.orders = response.data
                } else {
                    this.orders = []
                    this.lastOrderCount = 0
                    this.newOrdersCount = 0
                    this.showNewOrderAlert = false
                    this.clearAlertTimeout()
                }
            } catch (error) {
                console.error('Error fetching orders:', error)
                this.orders = []
                this.lastOrderCount = 0
                this.newOrdersCount = 0
                this.showNewOrderAlert = false
                this.clearAlertTimeout()
            } finally {
                this.loading = false
            }
        },
        formatDateTime(dateStr) {
            const date = new Date(dateStr)
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        },
        toggleFilterDropdown() {
            this.filterDropdownOpen = !this.filterDropdownOpen
            if (this.newOrdersCount > 0) {
                this.clearNotifications()
            }
        },
        applyFilter(status) {
            this.filterStatus = status
            this.filterDropdownOpen = false
            if (this.newOrdersCount > 0) {
                this.clearNotifications()
            }
        },
        handleNotificationClick() {
            this.fetchOrders()
            if (this.newOrdersCount > 0) {
                this.clearNotifications()
            }
        },
        clearNotifications() {
            this.newOrdersCount = 0
            this.showNewOrderAlert = false
            this.clearAlertTimeout()
        },
        setAlertTimeout() {
            if (this.alertTimeout) clearTimeout(this.alertTimeout)
            this.alertTimeout = setTimeout(() => {
                this.showNewOrderAlert = false
            }, 8000) // auto hide alert after 8 seconds
        },
        clearAlertTimeout() {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout)
                this.alertTimeout = null
            }
        }
    },
    mounted() {
        this.fetchOrders()
        this.pollInterval = setInterval(() => {
            this.fetchOrders()
        }, 30000) // Poll every 30 seconds
    },
    beforeUnmount() {
        clearInterval(this.pollInterval)
        this.clearAlertTimeout()
    }
}
</script>

<style scoped>
ul li {
    cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>