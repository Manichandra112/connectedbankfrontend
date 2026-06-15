import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cb_token') || null)
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('cb_user') || 'null') } catch { return null }
  })
  const [validating, setValidating] = useState(true) // true until token is verified

  // On every app load: ping the backend to verify the saved token is still valid.
  // If backend is down OR token is expired/invalid → clear session.
  useEffect(() => {
    const savedToken = localStorage.getItem('cb_token')
    if (!savedToken) {
      setValidating(false)
      return
    }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${savedToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token')
        return res.json()
      })
      .then((data) => {
        // Token valid — refresh user data from backend response
        const freshUser = {
          name:    data.name,
          company: data.company,
          gstin:   data.gstin,
          email:   data.email,
        }
        localStorage.setItem('cb_user', JSON.stringify(freshUser))
        setUser(freshUser)
      })
      .catch(() => {
        // Backend unreachable or token invalid → clear everything
        localStorage.removeItem('cb_token')
        localStorage.removeItem('cb_user')
        setToken(null)
        setUser(null)
      })
      .finally(() => setValidating(false))
  }, [])

  const login = useCallback((authResponse) => {
    localStorage.setItem('cb_token', authResponse.token)
    localStorage.setItem('cb_user', JSON.stringify({
      name:    authResponse.name,
      company: authResponse.company,
      gstin:   authResponse.gstin,
      email:   authResponse.email,
    }))
    setToken(authResponse.token)
    setUser({
      name:    authResponse.name,
      company: authResponse.company,
      gstin:   authResponse.gstin,
      email:   authResponse.email,
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('cb_token')
    localStorage.removeItem('cb_user')
    setToken(null)
    setUser(null)
  }, [])

  // Don't render children until token validation is complete.
  // This prevents stale localStorage data from briefly flashing on screen.
  if (validating) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontFamily: 'Inter, sans-serif', color: '#6b7280', fontSize: 14,
      }}>
        Connecting...
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
