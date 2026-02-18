import { createContext, useContext, useState, useEffect } from 'react'
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getStoredToken,
} from '../services/auth'

const AuthContext = createContext(null)

const USER_STORAGE_KEY = 'kanbanUser'

function getStoredUser() {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function saveUser(user) {
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  } catch {
    // ignore storage errors
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = getStoredToken()
    if (token) {
      return getStoredUser()
    }
    return null
  })
  const [isAuth, setIsAuth] = useState(() => Boolean(getStoredToken()))

  useEffect(() => {
    const token = getStoredToken()
    if (token && !user) {
      const storedUser = getStoredUser()
      if (storedUser) {
        setUser(storedUser)
        setIsAuth(true)
      }
    }
  }, [])

  const login = async ({ login, password }) => {
    const loggedInUser = await apiLogin({ login, password })
    setUser(loggedInUser)
    saveUser(loggedInUser)
    setIsAuth(true)
    return loggedInUser
  }

  const register = async ({ login, name, password }) => {
    const newUser = await apiRegister({ login, name, password })
    return newUser
  }

  const logout = () => {
    apiLogout()
    setUser(null)
    saveUser(null)
    setIsAuth(false)
  }

  const value = {
    user,
    isAuth,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
