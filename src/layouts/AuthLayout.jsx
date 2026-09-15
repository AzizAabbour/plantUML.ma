import { Outlet, Link } from 'react-router'
import { LayoutGrid } from 'lucide-react'
import '../styles/layouts.css'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="logo" style={{ justifyContent: 'center', marginBottom: '16px' }}>
            <div className="logo-icon"><LayoutGrid size={16} /></div>
            UML<span>Collab</span>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
