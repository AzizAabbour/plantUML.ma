import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = [
  {
    id: 'user-1',
    name: 'Aziz Aabbour',
    email: 'aziz@umlcollab.com',
    avatar: null,
    initials: 'AA',
    color: '#F39C12'
  },
  {
    id: 'user-2',
    name: 'Sara Benali',
    email: 'sara@umlcollab.com',
    avatar: null,
    initials: 'SB',
    color: '#3498DB'
  }
]

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('umlcollab_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback((email, password) => {
    const user = MOCK_USERS.find(u => u.email === email) || MOCK_USERS[0]
    setCurrentUser(user)
    localStorage.setItem('umlcollab_user', JSON.stringify(user))
    return user
  }, [])

  const register = useCallback((name, email, password) => {
    const user = {
      id: 'user-' + Date.now(),
      name,
      email,
      avatar: null,
      initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      color: '#F39C12'
    }
    setCurrentUser(user)
    localStorage.setItem('umlcollab_user', JSON.stringify(user))
    return user
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    localStorage.removeItem('umlcollab_user')
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, mockUsers: MOCK_USERS }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
