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
import AdminChat from '@/views/admin/AdminChat.vue'

// Auth guard
const requireAuth = (to, from, next) => {
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    user = null
  }

  if (!user) return next('/login')
  next()
}

const requireAdmin = (to, from, next) => {
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    user = null
  }

  if (!user || user.role !== 'admin') return next('/home')
  next()
}

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: PublicLayout,
    children: [
      // Auth
      { path: 'register', component: Register },
      { path: 'login', component: Login },

      // Main Pages
      { path: 'home', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'blog', component: BlogPage },
      { path: 'guide', component: TravelingGuide },
      { path: 'chat', component: UserChat },
      {path: 'booking-history', component: BookingHistory },

      // Hotels
      { path: 'hotel', component: HotelList },
      { path: 'hotels/:id', component: HotelDetail },
      { path: 'book/:id', component: HotelBookingForm },
      { path: 'confirmation', component: BookingConfirmation },

      // Travel Booking
      { path: 'Boatickets', component: BoatTickets },
      { path: 'Bustickets', component: BusTickets },
      { path: 'CarRental', component: CarRental },
      { path: 'FlightReservation', component: FlightReservation },

      // User Profile
      { path: 'profile', component: UserProfile, beforeEnter: requireAuth },
      { path: 'settings', component: UserSettings, beforeEnter: requireAuth },

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
    ]
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
      { path: 'blog', component: AdminBlog },
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
