import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import '../styles/auth.css'

export default function LoginPage() {
  const [email, setEmail] = useState('aziz@umlcollab.com')
  const [password, setPassword] = useState('password123')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    navigate('/dashboard')
  }

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
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
          Sign In
        </Button>
      </form>
      <div className="auth-footer-text">
        Don't have an account? <Link to="/register">Create an account</Link>
      </div>
    </div>
  )
}
