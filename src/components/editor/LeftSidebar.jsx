import { useState } from 'react'
import {
  LayoutGrid, ArrowDownUp, Users, GitBranch, Circle, Box, Server, Layers, HelpCircle
} from 'lucide-react'
import { useEditor } from '../../context/EditorContext'
import { DIAGRAM_TYPES, mockTemplates } from '../../data/mockProjects'
import { UML_SHAPES } from '../../data/umlShapes'

const ICON_MAP = {
  LayoutGrid, ArrowDownUp, Users, GitBranch, Circle, Box, Server
}

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState('shapes') // 'shapes', 'types', 'layers'
  const { activeDiagramType, setActiveDiagramType, nodes } = useEditor()

  const currentShapes = UML_SHAPES[activeDiagramType] || UML_SHAPES.class

  const onDragStart = (event, nodeType, defaultData) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType)
    event.dataTransfer.setData('application/reactflow/data', JSON.stringify(defaultData))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="editor-sidebar">
      <div className="sidebar-tabs">
        <div
          className={`sidebar-tab ${activeTab === 'shapes' ? 'active' : ''}`}
          onClick={() => setActiveTab('shapes')}
        >
          Shapes
        </div>
        <div
          className={`sidebar-tab ${activeTab === 'types' ? 'active' : ''}`}
          onClick={() => setActiveTab('types')}
        >
          Diagram Types
        </div>
        <div
          className={`sidebar-tab ${activeTab === 'layers' ? 'active' : ''}`}
          onClick={() => setActiveTab('layers')}
        >
          Layers ({nodes.length})
        </div>
      </div>

      <div className="sidebar-content">
        {activeTab === 'shapes' && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '12px' }}>
              {currentShapes.label} Library
            </div>
            {currentShapes.shapes.map((shape, idx) => (
              <div
                key={idx}
                className="shape-palette-item"
                draggable
                onDragStart={(e) => onDragStart(e, shape.type, shape.defaultData)}
              >
                <div style={{ width: 16, height: 16, borderRadius: 2, background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  +
                </div>
                <span>{shape.label}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'types' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Select Diagram Mode
            </div>
            {Object.entries(DIAGRAM_TYPES).map(([key, item]) => (
              <div
                key={key}
                className={`shape-palette-item ${activeDiagramType === key ? 'active' : ''}`}
                style={{
                  borderColor: activeDiagramType === key ? 'var(--color-primary)' : 'var(--color-border)',
                  background: activeDiagramType === key ? 'var(--color-primary-lighter)' : 'var(--color-bg)'
                }}
                onClick={() => setActiveDiagramType(key)}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'layers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Canvas Elements
            </div>
            {nodes.length === 0 ? (
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                No elements on canvas. Drag shapes to begin.
              </div>
            ) : (
              nodes.map((n, i) => (
                <div
                  key={n.id}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justify-content: 'space-between'
                  }}
                >
                  <span>{n.data?.name || n.type || `Node ${i+1}`}</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{n.type}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
