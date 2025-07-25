import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '../layouts/PublicLayout.vue'
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

// import Resturant from '../views/Travelingbooking/Resturant.vue'
import BoatTickets from '../views/Travelingbooking/BoatTickets.vue'
import BusTickets from '../views/Travelingbooking/BusTickets.vue'
import CarRental from '../views/Travelingbooking/CarRental.vue'
import FlightReservation from '../views/Travelingbooking/FlightReservation.vue'

import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'

// Hotel views
import HotelList from '../views/Travelingbooking/HoteLlist.vue'
import HotelDetail from '../views/HotelDetail.vue'
import HotelBookingForm from '../views/BookingForm.vue'

import BookingConfirmation from '../components/BookingConfirmation.vue'

// ✅ Auth Guard
const requireAuth = (to, from, next) => {
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    user = null
  }

  if (!user) {
    next('/login')
    return
  }
  next()
}

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
      { path: 'guide', component: TravelingGuide },

      // ✅ Hotel Routes
      { path: 'hotel', component: HotelList },
      { path: 'hotels/:id', component: HotelDetail },
      { path: 'book/:id', component: HotelBookingForm },
      { path: 'confirmation', component: BookingConfirmation },

      // ✅ Transport/Travel Routes
      // { path: 'resturant', component: Resturant },
      { path: 'Boatickets', component: BoatTickets },
      { path: 'Bustickets', component: BusTickets },
      { path: 'CarRental', component: CarRental },
      { path: 'FlightReservation', component: FlightReservation },

      // ✅ Profile Routes
      {
        path: 'profile',
        component: UserProfile,
        beforeEnter: requireAuth
      },
      {
        path: 'settings',
        component: UserSettings,
        beforeEnter: requireAuth
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: (to, from, next) => {
      let user = null
      try {
        user = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        user = null
      }

      if (!user || user.role !== 'admin') {
        return next('/home')
      }
      next()
    },
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'users', component: AdminUsers }
    ]
  },
  { path: '/dashboard', redirect: '/admin/dashboard' },
  { path: '/users/create', name: 'CreateUser', component: CreateUser }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
