import { useState } from 'react'
import { Link, useNavigate } from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import '../styles/auth.css'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    register(name || 'New User', email, password)
    navigate('/dashboard')
  }

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" size="lg" style={{ width: '100%', marginTop: '8px' }}>
          Create Account
        </Button>
      </form>
      <div className="auth-footer-text">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  )
}
