import { Handle, Position } from '@xyflow/react'
import './nodes.css'

export function UseCaseNode({ data, selected }) {
  return (
    <div className={`usecase-ellipse ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <span>{data.name || 'Use Case'}</span>
    </div>
  )
}

export function ActorNode({ data, selected }) {
  return (
    <div className={`actor-box ${selected ? 'selected' : ''}`} style={{ padding: '4px' }}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
        <circle cx="18" cy="10" r="7" stroke="#2C3E50" strokeWidth="2" fill="white" />
        <line x1="18" y1="17" x2="18" y2="33" stroke="#2C3E50" strokeWidth="2" />
        <line x1="4" y1="24" x2="32" y2="24" stroke="#2C3E50" strokeWidth="2" />
        <line x1="18" y1="33" x2="6" y2="46" stroke="#2C3E50" strokeWidth="2" />
        <line x1="18" y1="33" x2="30" y2="46" stroke="#2C3E50" strokeWidth="2" />
      </svg>
      <span className="actor-name">{data.name || 'Actor'}</span>
    </div>
  )
}

export function SystemBoundaryNode({ data, selected }) {
  return (
    <div
      style={{
        width: data.width || 360,
        height: data.height || 260,
        border: '1.5px dashed #2C3E50',
        borderRadius: '4px',
        background: 'rgba(248, 249, 250, 0.4)',
        padding: '8px 12px',
        boxSizing: 'border-box'
      }}
      className={selected ? 'selected' : ''}
    >
      <div style={{ fontWeight: 700, fontSize: '12px', color: '#2C3E50', textAlign: 'center' }}>
        {data.name || 'System Boundary'}
      </div>
    </div>
  )
}
