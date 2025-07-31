"use client"

import { ref, computed } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

// Global reactive state (shared across components)
const isLoggedIn = ref(false)
const userProfile = ref({})
const loading = ref(false)
const isInitialized = ref(false)
const user = ref(null)
const API_BASE = "http://localhost:5000/api/users"

// Immediately restore auth state when module loads (BEFORE any Vue components)
const restoreAuthStateImmediately = () => {
  try {
    console.log("[IMMEDIATE] Checking localStorage...")

    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    console.log("[IMMEDIATE] Found token:", !!token)
    console.log("[IMMEDIATE] Found user:", !!storedUser)

    if (token && storedUser) {
      const user = JSON.parse(storedUser)

      // Set state immediately
      userProfile.value = user
      isLoggedIn.value = true

      // Set axios header immediately
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      console.log("[IMMEDIATE] Auth state restored:", {
        username: user.username,
        email: user.email,
        role: user.role,
      })

      return true
    } else {
      console.log("[IMMEDIATE] No auth data found")
    }
  } catch (error) {
    console.error("[IMMEDIATE] Error restoring auth:", error)
    // Clear corrupted data
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    delete axios.defaults.headers.common["Authorization"]
  }

  return false
}

// Execute immediately when module loads
const hasAuthData = restoreAuthStateImmediately()
console.log("[MODULE] Auth data restored on load:", hasAuthData)

export function useAuth() {
  const router = useRouter()

  // Computed properties
  const userInitials = computed(() => {
    if (!userProfile.value || !userProfile.value.username) return "U"
    const name = userProfile.value.fullName || userProfile.value.username || "U"
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
  })

  const displayName = computed(() => {
    if (!userProfile.value) return "User"
    return userProfile.value.fullName || userProfile.value.username || "User"
  })

  const isAdmin = computed(() => {
    return userProfile.value && userProfile.value.role === "admin"
  })
 const isHotelowner = computed(() => userProfile.value?.role === 'hotel_owner')
const isReturantowner = computed(() => userProfile.value?.role === 'restaurant_owner')


  // Clear all auth data
  const clearAuthData = () => {
    console.log("[CLEAR] Clearing all auth data...")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    delete axios.defaults.headers.common["Authorization"]
    isLoggedIn.value = false
    userProfile.value = {}
  }

  // Verify token with server (background check)
  const verifyTokenWithServer = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.log("[VERIFY] No token to verify")
      return false
    }

    try {
      console.log("[VERIFY] Verifying token with server...")
      const response = await axios.get(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Update user data if it changed
      const serverUser = response.data
      userProfile.value = serverUser
      localStorage.setItem("user", JSON.stringify(serverUser))

      console.log("[VERIFY] Token valid, user data updated:", {
        username: serverUser.username,
        email: serverUser.email,
        role: serverUser.role,
      })

      return true
    } catch (error) {
      console.error("[VERIFY] Token verification failed:", error.response?.status, error.response?.data)

      // Only clear auth if it's actually invalid (not network error)
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("[VERIFY] Token invalid, clearing auth data")
        clearAuthData()
      } else {
        console.log("[VERIFY] Network error, keeping auth data")
      }

      return false
    }
  }

  // Initialize auth (called by components)
  const initAuth = async () => {
    if (isInitialized.value) {
      console.log("[INIT] Already initialized, skipping...")
      return
    }

    console.log("[INIT] Starting auth initialization...")
    console.log("[INIT] Current state:", {
      isLoggedIn: isLoggedIn.value,
      hasUserProfile: !!userProfile.value.username,
      userProfile: userProfile.value,
    })

    // If we already have auth data from module load, just verify in background
    if (isLoggedIn.value && userProfile.value.username) {
      console.log("[INIT] Auth already restored, verifying in background...")

      // Mark as initialized immediately
      isInitialized.value = true

      // Verify token in background (don't wait)
      verifyTokenWithServer().catch((error) => {
        console.error("[INIT] Background verification failed:", error)
      })
    } else {
      console.log("[INIT] No auth data found, user not logged in")
      isLoggedIn.value = false
      userProfile.value = {}
      isInitialized.value = true
    }

    console.log("[INIT] Initialization complete:", {
      isInitialized: isInitialized.value,
      isLoggedIn: isLoggedIn.value,
      userProfile: userProfile.value,
    })
  }

  // Login function
  const login = async (email, password) => {
    loading.value = true
    try {
      console.log("[LOGIN] Attempting login for:", email)

      const response = await axios.post(`${API_BASE}/login`, {
        email,
        password,
      })

      const token = response.data.token
      const user = response.data.user

      // Store in localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Set axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      // Update reactive state
      userProfile.value = user
      isLoggedIn.value = true

      console.log("[LOGIN] Login successful:", {
        username: user.username,
        email: user.email,
        role: user.role,
      })

      return {
        success: true,
        message: "Login successful!",
        user,
      }
    } catch (error) {
      console.error("[LOGIN] Login failed:", error.response?.data)
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      }
    } finally {
      loading.value = false
    }
  }

  // Register function
  const register = async (userData) => {
    loading.value = true
    try {
      console.log("[REGISTER] Attempting registration for:", userData.email)

      await axios.post(`${API_BASE}/register`, userData)

      // Auto-login after registration
      const loginResult = await login(userData.email, userData.password)

      return {
        success: true,
        message: "Registration successful!",
        user: loginResult.user,
      }
    } catch (error) {
      console.error("[REGISTER] Registration failed:", error.response?.data)
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again.",
      }
    } finally {
      loading.value = false
    }
  }

  // Logout function (only when explicitly called)
  const logout = () => {
    console.log("[LOGOUT] User explicitly logging out...")
    clearAuthData()
    router.push("/home")
  }

  // Get redirect path based on user role
 const getRedirectPath = (user) => {
  if (!user) return '/home'

  if (user.role === 'admin') {
    return '/admin/dashboard'
  }

  if (user.role === 'restaurant_owner') {
  return '/restaurant_owner/fooddashboard'
}
if (user.role === 'hotel_owner') {
  return '/hotel_owner/hoteldashboard'
}
  

  return '/home'
}


  // Force refresh auth state (for debugging)
  const refreshAuth = async () => {
    console.log("[REFRESH] Force refreshing auth state...")
    isInitialized.value = false
    await initAuth()
  }

  return {
    // State
    isLoggedIn: computed(() => isLoggedIn.value),
    userProfile: computed(() => userProfile.value),
    loading: computed(() => loading.value),
    isInitialized: computed(() => isInitialized.value),
    isAdmin,
    userInitials,
    displayName,
    isHotelowner,
    isReturantowner,
    // Methods
    login,
    register,
    logout,
    initAuth,
    refreshAuth,
    getRedirectPath,
  }
}
