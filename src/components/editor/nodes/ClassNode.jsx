import { Handle, Position } from '@xyflow/react'
import './nodes.css'

export function ClassNode({ data, selected }) {
  const { name = 'ClassName', stereotype, attributes = [], methods = [] } = data

  return (
    <div className={`uml-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />

      <div className="class-header">
        {stereotype && <div className="class-stereotype">{stereotype}</div>}
        <div className="class-name">{name}</div>
      </div>

      {attributes.length > 0 && (
        <div className="class-section">
          {attributes.map((attr, idx) => (
            <div key={idx} className="class-item">
              {attr.visibility} {attr.name}: {attr.type}
            </div>
          ))}
        </div>
      )}

      {methods.length > 0 && (
        <div className="class-section">
          {methods.map((method, idx) => (
            <div key={idx} className="class-item">
              {method.visibility} {method.name}({method.params}): {method.returnType}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
