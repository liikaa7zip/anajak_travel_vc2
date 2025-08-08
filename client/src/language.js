import { createI18n } from 'vue-i18n'

// Translation messages
const messages = {
  en: {
    logo: 'Anajak Travel',
    home: 'Home',
    about: 'About Us',
    guide: 'Traveling Guide',
    travelBookings: 'Travel Bookings',
    transportations: 'TRANSPORTATIONS',
    hotelsDining: 'HOTELS & DINING',
    moreServices: 'MORE SERVICES',
    flight: '✈️ Flight Reservation',
    car: '🚗 Car Rental',
    bus: '🚌 Bus Tickets',
    boat: '⛴️ Boat Tickets',
    hotel: '🏨 Hotel Booking',
    restaurant: '🍽️ Restaurant Reservations',
    plan: '🗺️ User Plan',
    itinerary: '📅 Travel Itinerary',
    blog: 'Blog Page',
    login: 'Login',
    signup: 'Sign Up',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    adminDashboard: 'Admin Dashboard',
    hotelDashboard: 'Hotel Dashboard',
    restaurantDashboard: 'Restaurant Dashboard',
  },
  km: {
    logo: 'អាណាចក្រធ្វើដំណើរ',
    home: 'ទំព័រដើម',
    about: 'អំពីពួកយើង',
    guide: 'មគ្គុទ្ទេសក៍ដំណើរកំសាន្ត',
    travelBookings: 'ការកក់ដំណើរកំសាន្ត',
    transportations: 'ការដឹកជញ្ជូន',
    hotelsDining: 'សណ្ឋាគារ និងភោជនីយដ្ឋាន',
    moreServices: 'សេវាកម្មបន្ថែម',
    flight: '✈️ កក់សំបុត្រយន្តហោះ',
    car: '🚗 ជួលឡាន',
    bus: '🚌 សំបុត្រឡានក្រុង',
    boat: '⛴️ សំបុត្រកប៉ាល់',
    hotel: '🏨 កក់សណ្ឋាគារ',
    restaurant: '🍽️ កក់ភោជនីយដ្ឋាន',
    plan: '🗺️ ផែនការរបស់អ្នក',
    itinerary: '📅 ផែនការធ្វើដំណើរ',
    blog: 'ទំព័រប្លុក',
    login: 'ចូលគណនី',
    signup: 'ចុះឈ្មោះ',
    profile: 'ព័ត៌មានផ្ទាល់ខ្លួន',
    settings: 'ការកំណត់',
    logout: 'ចាកចេញ',
    adminDashboard: 'ផ្ទាំងគ្រប់គ្រង',
    hotelDashboard: 'ផ្ទាំងគ្រប់គ្រងសណ្ឋាគារ',
    restaurantDashboard: 'ផ្ទាំងគ្រប់គ្រងភោជនីយដ្ឋាន',
  },
}

// Get saved locale or fallback to 'en'
const savedLocale = localStorage.getItem('locale') || 'en'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages,
})

export default i18n
