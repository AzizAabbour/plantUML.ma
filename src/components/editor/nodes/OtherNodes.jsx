import { Handle, Position } from '@xyflow/react'
import './nodes.css'

export function ActionNode({ data, selected }) {
  return (
    <div className={`action-box ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      {data.name || 'Action'}
    </div>
  )
}

export function DecisionNode({ data, selected }) {
  return (
    <div className={`decision-box ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" style={{ transform: 'rotate(-45deg)' }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ transform: 'rotate(-45deg)' }} />
      <Handle type="source" position={Position.Right} id="right" style={{ transform: 'rotate(-45deg)' }} />
    </div>
  )
}

export function InitialNode({ selected }) {
  return (
    <div className={`initial-node ${selected ? 'selected' : ''}`}>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  )
}

export function FinalNode({ selected }) {
  return (
    <div className={`final-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" />
      <div className="final-node-inner" />
    </div>
  )
}

export function StateNode({ data, selected }) {
  return (
    <div className={`state-box ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <div style={{ fontWeight: 600 }}>{data.name || 'State'}</div>
      {data.entry && <div style={{ fontSize: '10px', color: '#7F8C8D' }}>entry/ {data.entry}</div>}
      {data.exit && <div style={{ fontSize: '10px', color: '#7F8C8D' }}>exit/ {data.exit}</div>}
    </div>
  )
}

export function ComponentNode({ data, selected }) {
  return (
    <div className={`component-box ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <div className="component-icon-badge">
        <div style={{ width: 8, height: 4, background: '#2C3E50' }} />
        <div style={{ width: 8, height: 4, background: '#2C3E50' }} />
      </div>
      <div style={{ fontSize: '10px', color: '#7F8C8D', textAlign: 'center' }}>{data.stereotype || '<<component>>'}</div>
      <div style={{ fontWeight: 600, textAlign: 'center' }}>{data.name || 'Component'}</div>
    </div>
  )
}

export function DeploymentNode({ data, selected }) {
  return (
    <div className={`deployment-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <div style={{ fontSize: '10px', color: '#7F8C8D' }}>{data.stereotype || '<<device>>'}</div>
      <div style={{ fontWeight: 700 }}>{data.name || 'Server Node'}</div>
    </div>
  )
}

export function LifelineNode({ data, selected }) {
  return (
    <div className={`sequence-lifeline ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <div className="lifeline-header">{data.name || 'Object'}</div>
      <div className="lifeline-line" />
    </div>
  )
}
