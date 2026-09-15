import { useEditor } from '../../context/EditorContext'

export default function StatusBar({ cursorPos = { x: 0, y: 0 }, zoom = 100 }) {
  const { nodes, edges } = useEditor()

  return (
    <div className="editor-statusbar">
      <div style={{ display: 'flex', gap: '16px' }}>
        <span>Cursor: X: {Math.round(cursorPos.x)}px, Y: {Math.round(cursorPos.y)}px</span>
        <span>Elements: {nodes.length} nodes, {edges.length} connections</span>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <span>Snap to Grid: 20px</span>
        <span>Zoom: {Math.round(zoom)}%</span>
        <span>Status: Connected</span>
      </div>
    </div>
  )
}
