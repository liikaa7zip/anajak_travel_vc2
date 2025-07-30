import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Auth
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

// Pages
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import BlogPage from '../views/BlogPage.vue'
import TravelingGuide from '../views/TravelingGuide.vue'
import UserChat from '../views/UserChat.vue'

// Travel Booking
import BusTickets from '../views/Travelingbooking/BusTickets.vue'
import BoatTickets from '../views/Travelingbooking/BoatTickets.vue'
import CarRental from '../views/Travelingbooking/CarRental.vue'
import FlightReservation from '../views/Travelingbooking/FlightReservation.vue'

// Hotels
import HotelList from '../views/Travelingbooking/HoteLlist.vue'
import HotelDetail from '../views/HotelDetail.vue'
import HotelBookingForm from '../views/BookingForm.vue'
import BookingConfirmation from '../components/BookingConfirmation.vue'

// Profile
import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'

// Admin
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import CreateUser from '../components/CreateUser.vue'
import AdminBlog from '../views/admin/AdminBlog.vue'

// Provinces
import BattamBang from '../views/provinces/Battambang.vue'
import BanteayMeanchey from '../views/provinces/BanteayMeanchey.vue'
import StungTreng from '../views/provinces/StungTreng.vue'
import PreahVihear from '../views/provinces/PreahVihear.vue'
import KampongChhnang from '../views/provinces/KampongChhnang.vue'
import KohKong from '../views/provinces/KohKong.vue'
import Sihanoukville from '../views/provinces/Sihanoukville.vue'
import Pailin from '../views/provinces/Pailin.vue'
import KampongCham from '../views/provinces/KampongCham.vue'
import Kep from '../views/provinces/Kep.vue'
import KampongThom from '../views/provinces/KampongThom.vue'
import SiemReap from '../views/provinces/SiemReap.vue'
import OddarMeanchey from '../views/provinces/OddarMeanchey.vue'
import Kandal from '../views/provinces/Kandal.vue'
import Takeo from '../views/provinces/Takeo.vue'
import Rattanakiri from '../views/provinces/Rattanakiri.vue'
import Mondulkiri from '../views/provinces/Mondulkiri.vue'
import PhnomPenh from '../views/provinces/PhnomPenh.vue'
import Kampot from '../views/provinces/Kampot.vue'
import SvayRieng from '../views/provinces/SvayRieng.vue'
import Pursat from '../views/provinces/Pursat.vue'
import Kratie from '../views/provinces/Kratie.vue'
import TbongKhmum from '../views/provinces/TbongKhmum.vue'
import KampongSpeu from '../views/provinces/KampongSpeu.vue'
import PreyVeng from '../views/provinces/PreyVeng.vue'

import BookingHistory from '@/views/BookingHistory.vue'

// Food
import FoodListView from '../views/User/FoodList.vue'

import ProvinceList from '../views/User/ProvinceList.vue'
import FoodByProvince from '../components/FoodByProvince.vue'
import FoodDetail from '../views/User/FoodDetail.vue'
import BookingflightHistory from '@/views/BookingflightHistory.vue'

import AdminChat from '@/views/admin/AdminChat.vue'
// Auth guard helper functions
const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

const routes = [
  { path: '/', redirect: '/home' },

  {
    path: '/',
    component: PublicLayout,
    children: [
      // Auth
      { path: 'register', component: Register, name: 'Register' },
      { path: 'login', component: Login, name: 'Login' },

      // Main Pages
      { path: 'home', component: HomePage, name: 'Home' },
      { path: 'about', component: AboutPage, name: 'About' },
      { path: 'blog', component: BlogPage, name: 'Blog' },
      { path: 'guide', component: TravelingGuide, name: 'TravelingGuide' },
      { path: 'chat', component: UserChat, name: 'UserChat' },
      { path: 'booking-history', component: BookingHistory, name: 'BookingHistory' },
      {path: 'bookingflight-history', component: BookingflightHistory},


      // Hotels
      { path: 'hotel', component: HotelList, name: 'HotelList' },
      { path: 'hotels/:id', component: HotelDetail, name: 'HotelDetail', props: true },
      { path: 'book/:id', component: HotelBookingForm, name: 'HotelBookingForm', props: true },
      { path: 'confirmation', component: BookingConfirmation, name: 'BookingConfirmation' },

      // Travel Booking (paths normalized to lowercase with hyphens)
      { path: 'boat-tickets', component: BoatTickets, name: 'BoatTickets' },
      { path: 'bus-tickets', component: BusTickets, name: 'BusTickets' },
      { path: 'car-rental', component: CarRental, name: 'CarRental' },
      { path: 'flight-reservation', component: FlightReservation, name: 'FlightReservation' },

      // User Profile (requires auth)
      { path: 'profile', component: UserProfile, name: 'UserProfile', meta: { requiresAuth: true } },
      { path: 'settings', component: UserSettings, name: 'UserSettings', meta: { requiresAuth: true } },

      // Provinces
      { path: 'guide/battambang', name: 'BattamBang', component: BattamBang },
      { path: 'guide/banteay-meanchey', name: 'BanteayMeanchey', component: BanteayMeanchey },
      { path: 'guide/stung-treng', name: 'StungTreng', component: StungTreng },
      { path: 'guide/preah-vihear', name: 'PreahVihear', component: PreahVihear },
      { path: 'guide/kampong-chhnang', name: 'KampongChhnang', component: KampongChhnang },
      { path: 'guide/koh-kong', name: 'KohKong', component: KohKong },
      { path: 'guide/sihanoukville', name: 'Sihanoukville', component: Sihanoukville },
      { path: 'guide/pailin', name: 'Pailin', component: Pailin },
      { path: 'guide/kampong-cham', name: 'KampongCham', component: KampongCham },
      { path: 'guide/kep', name: 'Kep', component: Kep },
      { path: 'guide/kampong-thom', name: 'KampongThom', component: KampongThom },
      { path: 'guide/siem-reap', name: 'SiemReap', component: SiemReap },
      { path: 'guide/oddar-meanchey', name: 'OddarMeanchey', component: OddarMeanchey },
      { path: 'guide/kandal', name: 'Kandal', component: Kandal },
      { path: 'guide/takeo', name: 'Takeo', component: Takeo },
      { path: 'guide/rattanakiri', name: 'Rattanakiri', component: Rattanakiri },
      { path: 'guide/mondulkiri', name: 'Mondulkiri', component: Mondulkiri },
      { path: 'guide/phnom-penh', name: 'PhnomPenh', component: PhnomPenh },
      { path: 'guide/kampot', name: 'Kampot', component: Kampot },
      { path: 'guide/svay-rieng', name: 'SvayRieng', component: SvayRieng },
      { path: 'guide/pursat', name: 'Pursat', component: Pursat },
      { path: 'guide/kratie', name: 'Kratie', component: Kratie },
      { path: 'guide/tbong-khmum', name: 'TbongKhmum', component: TbongKhmum },
      { path: 'guide/kampong-speu', name: 'KampongSpeu', component: KampongSpeu },
      { path: 'guide/prey-veng', name: 'PreyVeng', component: PreyVeng },

      // Food routes
      { path: 'foods', component: FoodListView, name: 'FoodList' },
      
      { path: 'province', name: 'ProvinceList', component: ProvinceList },
      {
        path: 'province/:locationId',
        name: 'FoodsByProvince',
        component: FoodByProvince,
        props: route => ({
          locationId: Number(route.params.locationId),
          locationName: route.query.name || ''
        })
      },
      { path: '/foods/:id', name: 'FoodDetail', component: FoodDetail },

    ]
  },

  // Admin routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', component: AdminDashboard, name: 'AdminDashboard' },
      { path: 'users', component: AdminUsers, name: 'AdminUsers' },
      { path: 'chat', component: AdminChat },
      { path: 'blog', component: AdminBlog },
    ]
  },

  // Separate route for creating user under /users/create (not nested in admin for now)
  { path: '/users/create', name: 'CreateUser', component: CreateUser },

  // Redirect old /dashboard to admin dashboard
  { path: '/dashboard', redirect: '/admin/dashboard' },

  // Catch-all 404 redirect
  { path: '/:pathMatch(.*)*', redirect: '/home' }
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard for auth and admin
router.beforeEach((to, from, next) => {
  const user = getUserFromStorage()

  if (to.meta.requiresAuth && !user) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  if (to.meta.requiresAdmin) {
    if (!user || user.role !== 'admin') {
      return next('/home')
    }
  }

  next()
})

export default router
