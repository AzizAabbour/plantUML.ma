import { useNavigate } from 'react'
import {
  Undo, Redo, ZoomIn, ZoomOut, Maximize2, Download, Users, Share2, Save, Check, ArrowLeft, Image, FileCode, FileJson
} from 'lucide-react'
import { useEditor } from '../context/EditorContext'
import Button from '../components/common/Button'
import Dropdown, { DropdownItem } from '../components/common/Dropdown'
import { useToast } from '../components/common/Toast'
import Avatar, { AvatarGroup } from '../components/common/Avatar'
import { useAuth } from '../context/AuthContext'

export default function Toolbar({ projectName, onProjectNameChange, onExport }) {
  const navigate = useNavigate()
  const { undo, redo, canUndo, canRedo, saveStatus, isCollabOpen, setIsCollabOpen } = useEditor()
  const { mockUsers } = useAuth()
  const { addToast } = useToast()

  return (
    <div className="editor-toolbar">
      {/* Left: Back & Project Title */}
      <div className="toolbar-group">
        <Button variant="ghost" iconOnly icon={ArrowLeft} onClick={() => navigate('/dashboard')} title="Back to Dashboard" />
        <div className="toolbar-divider" />
        <input
          type="text"
          className="project-name-input"
          value={projectName || 'Untitled Project'}
          onChange={e => onProjectNameChange(e.target.value)}
        />
        <div className={`save-indicator ${saveStatus}`}>
          {saveStatus === 'saved' && <><Check size={12} /> Auto-saved</>}
          {saveStatus === 'saving' && <><Save size={12} /> Saving...</>}
          {saveStatus === 'unsaved' && <>Unsaved changes</>}
        </div>
      </div>

      {/* Middle: Undo / Redo */}
      <div className="toolbar-group">
        <Button variant="ghost" iconOnly icon={Undo} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)" />
        <Button variant="ghost" iconOnly icon={Redo} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)" />
      </div>

      {/* Right: Export & Collaboration */}
      <div className="toolbar-group">
        <Dropdown
          trigger={
            <Button variant="secondary" icon={Download} size="sm">
              Export
            </Button>
          }
        >
          <DropdownItem icon={Image} onClick={() => onExport('png')}>Export as PNG</DropdownItem>
          <DropdownItem icon={FileCode} onClick={() => onExport('svg')}>Export as SVG</DropdownItem>
          <DropdownItem icon={FileJson} onClick={() => onExport('json')}>Export as JSON</DropdownItem>
        </Dropdown>

        <Button
          variant="secondary"
          icon={Share2}
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            addToast('Invite link copied!', 'success')
          }}
        >
          Share
        </Button>

        <div className="toolbar-divider" />

        <Button
          variant={isCollabOpen ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setIsCollabOpen(!isCollabOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Users size={15} />
          <span>Live Collab (2)</span>
        </Button>
      </div>
    </div>
  )
}
