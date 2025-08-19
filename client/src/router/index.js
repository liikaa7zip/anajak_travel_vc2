import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import ReturantLayout from '../layouts/Food_OwnerLayout.vue'
import HotelLayout from '../layouts/Hotel_OwnerLayout .vue'
// Auth
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

// Pages
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import BlogPage from '../views/BlogPage.vue'
import TravelingGuide from '../views/TravelingGuide.vue'
import UserChat from '../views/UserChat.vue'
import favorite from '@/views/favorite.vue'


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
import HotelBookinghistory from '../views/Travelingbooking/HotelBookigHistory.vue'

// Profile
import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'

// Admin
import AdminUsers from '../views/admin/AdminUsers.vue'
import CreateUser from '../views/admin/CreateUser.vue'
// import AdminBlog from '../views/admin/AdminBlog.vue'


// Provinces
import Battambang from '../views/provinces/Battambang.vue'
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
import BookBoatPage from '@/views/BookBoatPage.vue'
import BookingboatHistory from '@/views/BookingboatHistory.vue'
import BookingflightHistory from '@/views/BookingflightHistory.vue'

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




// Food
import FoodListView from '../views/User/FoodList.vue'

import ProvinceList from '../views/User/ProvinceList.vue'
import FoodByProvince from '../components/FoodByProvince.vue'
import FoodDetail from '../views/User/FoodDetail.vue'

// ResturantDashboard
import ResturantDashboard from '../views/resturantOwner/Resturantdashboard.vue'
import FoodOrder from '../views/resturantOwner/ResturantOrder.vue'
import CustomerInResturant from '../views/resturantOwner/CustomerInResturant.vue'
import ProductsInResturant from '../views/resturantOwner/ProductsInResturant.vue'
// Hoteldashboard
import HotelDashboard from '../views/HotelOwner/HotelOwnerdashboard.vue'
import AdminChat from '@/views/admin/AdminChat.vue'
import BookingOverview from '@/views/HotelOwner/BookingOverview.vue'
import HouseKeeping from '@/views/HotelOwner/HouseKeeping.vue'
import Reversations  from '@/views/HotelOwner/Reversations.vue'
import Rooms from '@/views/HotelOwner/Rooms.vue'

import AdminBlog from '@/views/admin/AdminBlog.vue'
// Auth guard helper functions

import UserPlan from '@/views/UserPlan.vue'
import AdminFlightBooking from '@/views/admin/AdminFlightBooking.vue'
import AdminBoatBooking from '@/views/admin/AdminBoatBooking.vue'
import AdminBusBooking from '@/views/admin/AdminBusBooking.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import Payment from '@/components/Payment.vue'
import AdminHotelBooking from '@/views/admin/AdminHotelBooking.vue'
import CreateHotel from '@/views/admin/CreateHotel.vue'
import TransportDashbord from '@/views/TransportOwner/TransportDashbord.vue'
import TransportLayout from '@/layouts/TransportLayout.vue'
import TransportUser from '@/views/TransportOwner/TransportUser.vue'
import TransportBus from '@/views/TransportOwner/TransportBus.vue'
import TransportBoat from '@/views/TransportOwner/TransportBoat.vue'
import TransportOwnerChat from '@/views/TransportOwner/TransportOwnerChat.vue'
import AdminReport from '@/views/admin/AdminReport.vue'
import BookingTable from '@/components/AdminReport/BookingTable.vue'
import HotelChat from '@/views/HotelOwner/HotelChat.vue'
import CreateRoom from '@/views/HotelOwner/CreateRoom.vue'
import Review from '@/views/Review.vue'
import HotelBookings from '@/views/HotelOwner/HotelBookings.vue'
// Auth guard

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
      { path: 'register', component: Register },
      { path: 'login', component: Login },

      // Main Pages
      { path: 'home', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'blog', component: BlogPage },
      { path: 'guide', component: TravelingGuide },
      { path: 'chat', component: UserChat },
      { path: 'booking-history', component: BookingHistory },
      { path: "review", name: "Review", component: Review },

      // Hotels
      { path: 'hotel', component: HotelList },
      { path: 'hotels/:id', component: HotelDetail },
      { path: 'book/:id', component: HotelBookingForm },
      { path: 'confirmation', component: BookingConfirmation },
      {path:'Hotel_history',component: HotelBookinghistory},

      // favorite 
      { path: 'favorites', component: favorite },

      // Travel Booking
      { path: 'Boatickets', component: BoatTickets },
      { path: 'Bustickets', component: BusTickets },
      { path: 'CarRental', component: CarRental },
      { path: 'FlightReservation', component: FlightReservation },
      { path: 'FlightBookHistory', component: BookingflightHistory },
      { path: 'BookBoatPage', component: BookBoatPage },
      { path: 'BookBoatHistory', component: BookingboatHistory },
      { path: 'user-plan', component: UserPlan },
      { path: 'payment', component: Payment},


      // User Profile
      { path: 'profile', component: UserProfile, beforeEnter: requireAuth },
      { path: 'settings', component: UserSettings, beforeEnter: requireAuth },

      //favorite
      { path: 'favorite', component: favorite, beforeEnter: requireAuth },

      // Provinces
      { path: 'guide/battambang', name: 'Battambang', component: Battambang },
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

      //link to bus tickets with province name
      { path: 'guide/:province/BusTickets', name: 'ProvinceBusTickets', component: BusTickets, props: true },
      { path: 'guide/:province/CarRental', name: 'ProvinceCarRental', component: CarRental, props: true },
      { path: 'guide/:province/FlightReservation', name: 'ProvinceFlightReservation', component: FlightReservation, props: true },
      { path: 'guide/:province/ProvinceList', name: 'ProvinceProvinceList', component: ProvinceList, props: true },
      { path: 'guide/:view/favorite', name: 'Provincefavorite', component: favorite, props: true },

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
      { path: 'dashboard', component: Dashboard, name: 'Dashboard' },
      { path: 'users', component: AdminUsers, name: 'AdminUsers' },
      { path: 'chat', component: AdminChat },
      { path: 'blog', component: AdminBlog },
      { path: 'admin-hotel', component: AdminHotelBooking },
      { path: 'flight', component: AdminFlightBooking },
      { path: 'boat', component: AdminBoatBooking },
      { path: 'bus', component: AdminBusBooking},
      { path: 'admin-hotel', component: AdminHotelBooking },
      { path : 'create-hotel', component: CreateHotel },
      { path: 'report', component: AdminReport },
      { path: 'report/booking-table', component: BookingTable},
      { path: 'add-user', component: CreateUser },
    ]
  },
  {
    path: '/restaurant_owner',
    component: ReturantLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: 'fooddashboard' },
      { path: 'fooddashboard', component: ResturantDashboard, name: 'foodOwnerdashboard' },
      {path: 'foodOrder',component: FoodOrder, name: 'foodOrder' },
      {path: 'CustomersInResturant',component: CustomerInResturant, name: 'CustomersInResturant' },
      {path: 'ProductsInResturant',component: ProductsInResturant, name: 'ProductsInResturant' },

    ]
  },
  {
    path: '/hotel_owner',
    component: HotelLayout,
    meta: { requiresAuth: true, role: 'hotel_owner' },
    children: [
      { path: '', redirect: 'hoteldashboard' },
      { path: 'hoteldashboard', component: HotelDashboard, name: 'HotelOwnerdashboard' },
      {path: 'bookingoverview',component:BookingOverview},
      {path: 'housekeeping',component:HouseKeeping},
      {path: 'reversations',component:Reversations},
      {path: 'rooms',component:Rooms},
      { path: 'chat', component: HotelChat, name: 'HotelChat' },
      { path: 'create-room', component: CreateRoom, name: 'CreateRoom' },
      { path: 'hotel-bookings', component: HotelBookings, name: 'HotelBookings' },

    ]
  },
  {
    path: '/transport_owner',
    component: TransportLayout,
    meta: { requiresAuth: true, role: 'transport_owner' },
    children: [
      { path: '', redirect: 'transportdashboard' },
      { path: 'transportdashboard', component: TransportDashbord, name: 'TransportOwnerDashboard' },
      { path: 'transportuser', component: TransportUser, name: 'TransportUser'},
      { path: 'transportbus', component: TransportBus, name: 'TransportBus' },
      { path: 'transportboat', component: TransportBoat, name: 'TransportBoat' },
      { path: 'transportownerchat', component: TransportOwnerChat, name: 'TransportOwnerChat' }
    ]
  },

  // Separate route for creating user under /users/create (not nested in admin for now)
  

  // Redirect old /dashboard to admin dashboard
  { path: '/dashboard', redirect: '/admin/dashboard' },

  // Catch-all 404 redirect
  { path: '/:pathMatch(.*)*', redirect: '/home' },


  
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard for auth and admin
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }

  if (to.meta.role && user?.role !== to.meta.role) {
    return next('/home') // <== This line could be the issue
  }

  next()
})


export default router
