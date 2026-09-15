import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/common/Avatar'
import Button from '../components/common/Button'
import { useToast } from '../components/common/Toast'

export default function ProfilePage() {
  const { currentUser } = useAuth()
  const { addToast } = useToast()

  const [name, setName] = useState(currentUser?.name || 'Aziz Aabbour')
  const [email, setEmail] = useState(currentUser?.email || 'aziz@umlcollab.com')
  const [snapGrid, setSnapGrid] = useState('20')
  const [autoSaveInterval, setAutoSaveInterval] = useState('30')

  const handleSave = (e) => {
    e.preventDefault()
    addToast('Profile & preferences updated', 'success')
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '640px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>User Profile & Settings</h1>

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Avatar name={name} initials={currentUser?.initials} color={currentUser?.color} size="xl" />
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{name}</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-light)', margin: '8px 0' }} />

          <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Canvas Preferences</h3>

          <div className="form-group">
            <label>Snap-to-Grid Distance</label>
            <select className="filter-select" value={snapGrid} onChange={e => setSnapGrid(e.target.value)}>
              <option value="10">10px</option>
              <option value="20">20px (Default)</option>
              <option value="30">30px</option>
            </select>
          </div>

          <div className="form-group">
            <label>Auto-Save Frequency</label>
            <select className="filter-select" value={autoSaveInterval} onChange={e => setAutoSaveInterval(e.target.value)}>
              <option value="10">Every 10 seconds</option>
              <option value="30">Every 30 seconds (Default)</option>
              <option value="60">Every 60 seconds</option>
            </select>
          </div>

          <Button type="submit" style={{ marginTop: '12px' }}>Save Changes</Button>
        </form>
      </div>
    </div>
  )
}
