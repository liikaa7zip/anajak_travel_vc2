import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import PublicLayout from '../layouts/PublicLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Public Views
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import BlogPage from '../views/BlogPage.vue'
import TravelingGuide from '../views/TravelingGuide.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import UserChat from '../views/UserChat.vue'

// Admin Views
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import AdminChat from '../views/admin/AdminChat.vue'

// Other
import CreateUser from '../components/CreateUser.vue'

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
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'users', component: AdminUsers },
      { path: 'chat', component: AdminChat },
    ],
  },
  // Redirect /dashboard to /admin/dashboard to avoid "no match" warning
  {
    path: '/dashboard',
    redirect: '/admin/dashboard',
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: CreateUser,
  },
  // Fallback route for 404 Not Found (optional)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',  // or a 404 page if you create one
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
