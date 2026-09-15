import { useState, useRef, useEffect } from 'react'
import './Dropdown.css'

export default function Dropdown({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="dropdown-wrapper" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className={`dropdown-menu ${align}`} onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownItem({ icon: Icon, children, onClick, danger }) {
  return (
    <button className={`dropdown-item${danger ? ' danger' : ''}`} onClick={onClick}>
      {Icon && <Icon size={15} />}
      {children}
    </button>
  )
}

export function DropdownSeparator() {
  return <div className="dropdown-separator" />
}
