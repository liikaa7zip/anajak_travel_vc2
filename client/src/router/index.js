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
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.role === 'admin') {
      next()
    } else {
      next('/home')
    }
  },

  children: [
    { path: '', redirect: 'dashboard' },
    { path: 'dashboard', component: AdminDashboard }
  ]
},
// Add a direct route for /admin-dashboard
{
  path: '/admin-dashboard',
  component: AdminDashboard
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
