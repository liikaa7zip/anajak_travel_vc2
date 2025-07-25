import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'  // <-- Add this!
import AdminLayout from '../layouts/AdminLayout.vue'

import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import BlogPage from '../views/BlogPage.vue'
import TravelingGuide from '../views/TravelingGuide.vue'

import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import CreateUser from '../components/CreateUser.vue' 

import BookingConfirmation from '../components/BookingConfirmation.vue'
import BusTickets from '@/views/Travelingbooking/BusTickets.vue'
import BookingHistory from '@/components/BookingHistory.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: 'register', component: Register },
      { path: 'login', component: Login },
      { path: 'home', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'blog', component: BlogPage },
      { path: 'guide', component: TravelingGuide }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: (to, from, next) => {
      // Fix: Check if user exists and handle JSON parse errors
      let user = null
      try {
        user = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        user = null
      }
      // If not logged in, redirect to login
      if (!user) {
        next('/login')
        return
      }
      // If not admin, redirect to home
      if (user.role !== 'admin') {
        next('/home')
        return
      }
      next()
    },
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'users', component: AdminUsers } // <-- Add this line for /admin/users
    ]
  },
  // Redirect /dashboard to /admin/dashboard
  {
    path: '/dashboard',
    redirect: '/admin/dashboard'
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: CreateUser,
  },
    {
    path: '/Bustickets',   
    name: 'BusTicket',
    component: BusTickets
  },
    {
    path: '/confirmation',
    name: 'BookingConfirmation',
    component: BookingConfirmation
  },
  {
    path: '/booking-history',
    name: 'BookingHistory',
    component: BookingHistory
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
