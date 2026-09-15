import './Avatar.css'

export default function Avatar({ name, initials, color = '#F39C12', size = 'md', online, showPresence = false }) {
  const initial = initials || (name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?')

  return (
    <div
      className={`avatar avatar-${size}`}
      style={{ backgroundColor: color }}
      title={name}
    >
      {initial}
      {showPresence && (
        <span className={`avatar-presence ${online ? 'online' : 'offline'}`} />
      )}
    </div>
  )
}

export function AvatarGroup({ users, size = 'sm', max = 3 }) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

  return (
    <div className="avatar-group">
      {visible.map(user => (
        <Avatar
          key={user.id}
          name={user.name}
          initials={user.initials}
          color={user.color}
          size={size}
          online={user.online !== false}
          showPresence
        />
      ))}
      {overflow > 0 && (
        <div className={`avatar avatar-${size}`} style={{ backgroundColor: '#95A5A6' }}>
          +{overflow}
        </div>
      )}
    </div>
  )
}
