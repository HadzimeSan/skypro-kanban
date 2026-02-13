import { createContext, useContext, useState } from 'react'
import { login as apiLogin, register as apiRegister, logout as apiLogout, getStoredToken } from '../services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(() => Boolean(getStoredToken()))

  const login = async ({ login, password }) => {
    const loggedInUser = await apiLogin({ login, password })
    setUser(loggedInUser)
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


