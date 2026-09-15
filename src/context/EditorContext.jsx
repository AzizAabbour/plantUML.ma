import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react'

const EditorContext = createContext(null)

export function EditorProvider({ project, onSave, children }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(project?.nodes || [])
  const [edges, setEdges, onEdgesChange] = useEdgesState(project?.edges || [])
  const [selectedElement, setSelectedElement] = useState(null)
  const [activeDiagramType, setActiveDiagramType] = useState(project?.diagramType || 'class')

  // History stack for undo/redo
  const [history, setHistory] = useState([{ nodes: project?.nodes || [], edges: project?.edges || [] }])
  const [historyIdx, setHistoryIdx] = useState(0)

  // Save status
  const [saveStatus, setSaveStatus] = useState('saved') // 'saved', 'saving', 'unsaved'

  // Collaboration Panel open
  const [isCollabOpen, setIsCollabOpen] = useState(false)

  // Push to history on significant changes
  const saveSnapshot = useCallback((newNodes, newEdges) => {
    setHistory(prev => {
      const sliced = prev.slice(0, historyIdx + 1)
      return [...sliced, { nodes: newNodes, edges: newEdges }]
    })
    setHistoryIdx(prev => prev + 1)
    setSaveStatus('unsaved')
  }, [historyIdx])

  // Handle node selection
  const handleSelectionChange = useCallback(({ nodes: selectedNodes, edges: selectedEdges }) => {
    if (selectedNodes.length === 1) {
      setSelectedElement({ type: 'node', data: selectedNodes[0] })
    } else if (selectedEdges.length === 1) {
      setSelectedElement({ type: 'edge', data: selectedEdges[0] })
    } else {
      setSelectedElement(null)
    }
  }, [])

  // On Edge Connect
  const onConnect = useCallback((connection) => {
    setEdges((eds) => {
      const nextEdges = addEdge({ ...connection, type: 'customUml', data: { label: '' } }, eds)
      saveSnapshot(nodes, nextEdges)
      return nextEdges
    })
  }, [nodes, setEdges, saveSnapshot])

  // Auto-save timer
  useEffect(() => {
    if (saveStatus === 'unsaved') {
      const timer = setTimeout(() => {
        setSaveStatus('saving')
        if (onSave) onSave({ nodes, edges, diagramType: activeDiagramType })
        setTimeout(() => setSaveStatus('saved'), 500)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [saveStatus, nodes, edges, activeDiagramType, onSave])

  // Undo
  const undo = useCallback(() => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1]
      setNodes(prev.nodes)
      setEdges(prev.edges)
      setHistoryIdx(historyIdx - 1)
      setSaveStatus('unsaved')
    }
  }, [historyIdx, history, setNodes, setEdges])

  // Redo
  const redo = useCallback(() => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1]
      setNodes(next.nodes)
      setEdges(next.edges)
      setHistoryIdx(historyIdx + 1)
      setSaveStatus('unsaved')
    }
  }, [historyIdx, history, setNodes, setEdges])

  // Update selected element data
  const updateSelectedData = useCallback((updates) => {
    if (!selectedElement) return
    if (selectedElement.type === 'node') {
      setNodes(nds => {
        const next = nds.map(n => {
          if (n.id === selectedElement.data.id) {
            return { ...n, data: { ...n.data, ...updates } }
          }
          return n
        })
        saveSnapshot(next, edges)
        return next
      })
    } else if (selectedElement.type === 'edge') {
      setEdges(eds => {
        const next = eds.map(e => {
          if (e.id === selectedElement.data.id) {
            return { ...e, data: { ...e.data, ...updates } }
          }
          return e
        })
        saveSnapshot(nodes, next)
        return next
      })
    }
  }, [selectedElement, setNodes, setEdges, nodes, edges, saveSnapshot])

  return (
    <EditorContext.Provider value={{
      nodes, setNodes, onNodesChange,
      edges, setEdges, onEdgesChange,
      onConnect,
      selectedElement, setSelectedElement,
      handleSelectionChange,
      activeDiagramType, setActiveDiagramType,
      saveStatus, setSaveStatus,
      undo, redo,
      canUndo: historyIdx > 0,
      canRedo: historyIdx < history.length - 1,
      updateSelectedData,
      isCollabOpen, setIsCollabOpen,
      saveSnapshot
    }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used within EditorProvider')
  return ctx
}
