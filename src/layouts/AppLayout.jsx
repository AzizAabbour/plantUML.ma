import { Outlet, Link, NavLink, useNavigate } from 'react-router'
import { LayoutGrid, User, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/common/Avatar'
import Dropdown, { DropdownItem, DropdownSeparator } from '../components/common/Dropdown'
import { ToastProvider } from '../components/common/Toast'
import '../styles/layouts.css'

export default function AppLayout() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <ToastProvider>
      <div className="app-layout">
        <header className="app-header">
          <div className="header-left">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <LayoutGrid size={16} />
              </div>
              UML<span>Collab</span>
            </Link>
            {currentUser && (
              <nav className="header-nav">
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
                <NavLink to="/templates" className={({ isActive }) => isActive ? 'active' : ''}>Templates</NavLink>
              </nav>
            )}
          </div>
          <div className="header-right">
            {currentUser ? (
              <Dropdown
                trigger={
                  <Avatar
                    name={currentUser.name}
                    initials={currentUser.initials}
                    color={currentUser.color}
                    size="sm"
                  />
                }
              >
                <DropdownItem icon={User} onClick={() => navigate('/profile')}>Profile</DropdownItem>
                <DropdownSeparator />
                <DropdownItem icon={LogOut} onClick={() => { logout(); navigate('/'); }} danger>
                  Sign Out
                </DropdownItem>
              </Dropdown>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                <LogIn size={15} /> Sign In
              </Link>
            )}
          </div>
        </header>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </ToastProvider>
  )
}
