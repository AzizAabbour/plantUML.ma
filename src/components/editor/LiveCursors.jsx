import { useState, useEffect } from 'react'

export function LiveCursors() {
  const [collabPos, setCollabPos] = useState({ x: 380, y: 190 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCollabPos(prev => ({
        x: 350 + Math.sin(Date.now() / 1000) * 80,
        y: 180 + Math.cos(Date.now() / 1200) * 40
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${collabPos.x}px`,
          top: `${collabPos.y}px`,
          transition: 'all 0.1s linear',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path
            d="M 1 1 L 1 18 L 6 13 L 11 20 L 14 18 L 9 11 L 17 10 Z"
            fill="#F39C12"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>
        <div
          style={{
            background: '#F39C12',
            color: '#FFFFFF',
            fontSize: '10px',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '4px',
            marginTop: '-2px',
            marginLeft: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap'
          }}
        >
          Sara Benali
        </div>
      </div>
    </div>
  )
}
