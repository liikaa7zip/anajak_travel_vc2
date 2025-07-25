// import { createRouter, createWebHistory } from 'vue-router'
// import PublicLayout from '../layouts/PublicLayout.vue'
// import AdminLayout from '../layouts/AdminLayout.vue'
// import Register from '../views/Register.vue'
// import Login from '../views/Login.vue'
// import HomePage from '../views/HomePage.vue'
// import AboutPage from '../views/AboutPage.vue'
// import BlogPage from '../views/BlogPage.vue'
// import TravelingGuide from '../views/TravelingGuide.vue'
// import AdminDashboard from '../views/admin/AdminDashboard.vue'
// import AdminUsers from '../views/admin/AdminUsers.vue'
// import CreateUser from '../components/CreateUser.vue'
// import HotelBooking from '../views/Travelingbooking/HotelBooking.vue'
// import resturant from '../views/Travelingbooking/Resturant.vue'
// import BoatTickets from '../views/Travelingbooking/BoatTickets.vue'
// import BusTickets from '../views/Travelingbooking/BusTickets.vue'
// import CarRental from '../views/Travelingbooking/CarRental.vue'
// import FlightReservation from '../views/Travelingbooking/FlightReservation.vue'
// // Add new imports for profile and settings
// import UserProfile from '../views/UserProfile.vue'
// import UserSettings from '../views/UserSettings.vue'

// // Helper function to check authentication
// const requireAuth = (to, from, next) => {
//   let user = null
//   try {
//     user = JSON.parse(localStorage.getItem('user'))
//   } catch (e) {
//     user = null
//   }
  
//   if (!user) {
//     next('/login')
//     return
//   }
//   next()
// }
// // import CreateUser from '../components/CreateUser.vue' 

// import BookingConfirmation from '../components/BookingConfirmation.vue'
// // import BusTickets from '@/views/Travelingbooking/BusTickets.vue'

// const routes = [
//   {
//     path: '/',
//     redirect: '/home',
//   },
//   {
//     path: '/',
//     component: PublicLayout,
//     children: [
//       { path: 'home', component: HomePage },
//       { path: 'about', component: AboutPage },
//       { path: 'blog', component: BlogPage },
//       { path: 'guide', component: TravelingGuide },
//       { path: 'register', component: Register },
//       { path: 'login', component: Login },
//       { path: 'chat', component: UserChat },
//     ],
//       { path: 'hotel', component: HotelBooking },
//       { path: 'resturant', component: resturant },
//       { path: 'Boatickets', component: BoatTickets },
//       { path: 'Bustickets', component: BusTickets },
//       { path: 'CarRental', component: CarRental },
//       { path: 'FlightReservation', component: FlightReservation },
//       // Add protected profile routes
//       { 
//         path: 'profile', 
//         component: UserProfile,
//         beforeEnter: requireAuth
//       },
//       { 
//         path: 'settings', 
//         component: UserSettings,
//         beforeEnter: requireAuth
//       },
//       { path: 'guide', component: TravelingGuide }
//     ]
//   },
//   {
//     path: '/admin',
//     component: AdminLayout,
//     children: [
//       { path: '', redirect: 'dashboard' },
//       { path: 'dashboard', component: AdminDashboard },
//       { path: 'users', component: AdminUsers },
//       { path: 'chat', component: AdminChat },
//     ],
//   },
//   // Redirect /dashboard to /admin/dashboard to avoid "no match" warning
//     beforeEnter: (to, from, next) => {
//       let user = null
//       try {
//         user = JSON.parse(localStorage.getItem('user'))
//       } catch (e) {
//         user = null
//       }
      
//       if (!user) {
//         next('/login')
//         return
//       }
      
//       if (user.role !== 'admin') {
//         next('/home')
//         return
//       }
//       next()
//     },
//     children: [
//       { path: '', redirect: 'dashboard' },
//       { path: 'dashboard', component: AdminDashboard },
//       { path: 'users', component: AdminUsers }
//     ]
//   },
//   {
//     path: '/dashboard',
//     redirect: '/admin/dashboard',
//   },
//   {
//     path: '/users/create',
//     name: 'CreateUser',
//     component: CreateUser,
//   },
//   // Fallback route for 404 Not Found (optional)
//   {
//     path: '/:pathMatch(.*)*',
//     redirect: '/home',  // or a 404 page if you create one
//   },
//     {
//     path: '/Bustickets',   
//     name: 'BusTicket',
//     component: BusTickets
//   },
//     {
//     path: '/confirmation',
//     name: 'BookingConfirmation',
//     component: BookingConfirmation
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// export default router


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

import HotelBooking from '../views/Travelingbooking/HotelBooking.vue'
import resturant from '../views/Travelingbooking/Resturant.vue'
import BoatTickets from '../views/Travelingbooking/BoatTickets.vue'
import BusTickets from '../views/Travelingbooking/BusTickets.vue'
import CarRental from '../views/Travelingbooking/CarRental.vue'
import FlightReservation from '../views/Travelingbooking/FlightReservation.vue'

import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'

import BookingConfirmation from '../components/BookingConfirmation.vue'

// Make sure you import these components, since they are used in routes:
import UserChat from '../views/UserChat.vue'
import AdminChat from '../views/admin/AdminChat.vue'


// Auth guard
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

// Admin role guard
const requireAdmin = (to, from, next) => {
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
  if (user.role !== 'admin') {
    next('/home')
    return
  }
  next()
}

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: 'home', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'blog', component: BlogPage },
      { path: 'guide', component: TravelingGuide },
      { path: 'register', component: Register },
      { path: 'login', component: Login },
      { path: 'chat', component: UserChat },
      { path: 'hotel', component: HotelBooking },
      { path: 'resturant', component: resturant },
      { path: 'Boatickets', component: BoatTickets },
      { path: 'Bustickets', component: BusTickets },
      { path: 'CarRental', component: CarRental },
      { path: 'FlightReservation', component: FlightReservation },
      {
        path: 'profile',
        component: UserProfile,
        beforeEnter: requireAuth,
      },
      {
        path: 'settings',
        component: UserSettings,
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAdmin,
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'users', component: AdminUsers },
      { path: 'chat', component: AdminChat },
    ],
  },
  {
    path: '/dashboard',
    redirect: '/admin/dashboard',
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: CreateUser,
  },
  {
    path: '/confirmation',
    name: 'BookingConfirmation',
    component: BookingConfirmation,
  },
  // Fallback route for 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
