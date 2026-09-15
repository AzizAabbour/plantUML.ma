import { useState, useEffect } from 'react'
import { Trash2, Plus, Edit2, Sliders } from 'lucide-react'
import { useEditor } from '../../context/EditorContext'
import Button from '../common/Button'

export default function RightPropertiesPanel() {
  const { selectedElement, updateSelectedData, setNodes, setEdges, saveSnapshot, nodes, edges } = useEditor()

  if (!selectedElement) {
    return (
      <div className="properties-panel">
        <div className="properties-header">Properties</div>
        <div className="properties-content" style={{ alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '32px 16px' }}>
          <Sliders size={32} style={{ marginBottom: '12px', opacity: 0.4 }} />
          <p style={{ fontSize: '13px', fontWeight: 500 }}>No Element Selected</p>
          <p style={{ fontSize: '11px', marginTop: '4px' }}>Click any node or connection on the canvas to inspect & edit properties.</p>
        </div>
      </div>
    )
  }

  const { type, data: elemData } = selectedElement
  const isNode = type === 'node'
  const nodeData = isNode ? elemData.data || {} : {}
  const edgeData = !isNode ? elemData.data || {} : {}

  const handleDelete = () => {
    if (isNode) {
      const nextNodes = nodes.filter(n => n.id !== elemData.id)
      const nextEdges = edges.filter(e => e.source !== elemData.id && e.target !== elemData.id)
      setNodes(nextNodes)
      setEdges(nextEdges)
      saveSnapshot(nextNodes, nextEdges)
    } else {
      const nextEdges = edges.filter(e => e.id !== elemData.id)
      setEdges(nextEdges)
      saveSnapshot(nodes, nextEdges)
    }
  }

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <span>{isNode ? `Node: ${elemData.type}` : 'Connection Edge'}</span>
        <Button variant="ghost" iconOnly icon={Trash2} onClick={handleDelete} title="Delete Element" />
      </div>

      <div className="properties-content">
        {/* Node Properties */}
        {isNode && (
          <>
            <div className="property-group">
              <label>Name / Label</label>
              <input
                type="text"
                className="form-input"
                value={nodeData.name || ''}
                onChange={e => updateSelectedData({ name: e.target.value })}
              />
            </div>

            {elemData.type === 'classNode' && (
              <>
                <div className="property-group">
                  <label>Stereotype</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. <<interface>>"
                    value={nodeData.stereotype || ''}
                    onChange={e => updateSelectedData({ stereotype: e.target.value })}
                  />
                </div>

                <div className="property-group">
                  <label>Attributes</label>
                  {(nodeData.attributes || []).map((attr, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                      <select
                        style={{ width: '40px', padding: '2px' }}
                        value={attr.visibility}
                        onChange={e => {
                          const next = [...(nodeData.attributes || [])]
                          next[idx].visibility = e.target.value
                          updateSelectedData({ attributes: next })
                        }}
                      >
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="#">#</option>
                        <option value="~">~</option>
                      </select>
                      <input
                        type="text"
                        style={{ flex: 1, padding: '2px 6px', fontSize: '11px' }}
                        value={attr.name}
                        onChange={e => {
                          const next = [...(nodeData.attributes || [])]
                          next[idx].name = e.target.value
                          updateSelectedData({ attributes: next })
                        }}
                      />
                      <input
                        type="text"
                        style={{ width: '60px', padding: '2px 6px', fontSize: '11px' }}
                        value={attr.type}
                        onChange={e => {
                          const next = [...(nodeData.attributes || [])]
                          next[idx].type = e.target.value
                          updateSelectedData({ attributes: next })
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={Plus}
                    onClick={() => {
                      const next = [...(nodeData.attributes || []), { visibility: '+', name: 'newAttr', type: 'String' }]
                      updateSelectedData({ attributes: next })
                    }}
                  >
                    Add Attribute
                  </Button>
                </div>

                <div className="property-group">
                  <label>Methods</label>
                  {(nodeData.methods || []).map((method, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                      <input
                        type="text"
                        style={{ flex: 1, padding: '2px 6px', fontSize: '11px' }}
                        value={method.name}
                        onChange={e => {
                          const next = [...(nodeData.methods || [])]
                          next[idx].name = e.target.value
                          updateSelectedData({ methods: next })
                        }}
                      />
                      <input
                        type="text"
                        style={{ width: '60px', padding: '2px 6px', fontSize: '11px' }}
                        value={method.returnType}
                        onChange={e => {
                          const next = [...(nodeData.methods || [])]
                          next[idx].returnType = e.target.value
                          updateSelectedData({ methods: next })
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={Plus}
                    onClick={() => {
                      const next = [...(nodeData.methods || []), { visibility: '+', name: 'newMethod', params: '', returnType: 'void' }]
                      updateSelectedData({ methods: next })
                    }}
                  >
                    Add Method
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* Edge Properties */}
        {!isNode && (
          <>
            <div className="property-group">
              <label>Relationship Label</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. includes, extends, places"
                value={edgeData.label || ''}
                onChange={e => updateSelectedData({ label: e.target.value })}
              />
            </div>
            <div className="property-group">
              <label>Source Multiplicity</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 1, 0..1, *"
                value={edgeData.sourceMultiplicity || ''}
                onChange={e => updateSelectedData({ sourceMultiplicity: e.target.value })}
              />
            </div>
            <div className="property-group">
              <label>Target Multiplicity</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 1..*, *"
                value={edgeData.targetMultiplicity || ''}
                onChange={e => updateSelectedData({ targetMultiplicity: e.target.value })}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
