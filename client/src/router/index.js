import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import BlogPage from '../views/BlogPage.vue'
import TravelingGuide from '../views/TravelingGuide.vue'



const routes = [
  { path: '/', redirect: '/home' },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/home', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/blog', component: BlogPage },
  { path: '/guide', component: TravelingGuide }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router