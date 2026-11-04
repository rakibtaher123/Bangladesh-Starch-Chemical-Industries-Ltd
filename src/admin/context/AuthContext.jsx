import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { adminApi } from '../services/adminApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await adminApi.getMe()
        setUser(data.admin)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    const data = await adminApi.login(email, password)
    setUser(data.admin)
    return data
  }

  const logout = async () => {
    try {
      await adminApi.logout()
    } finally {
      setUser(null)
    }
  }

  const value = useMemo(() => ({ user, loading, login, logout, setUser }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
