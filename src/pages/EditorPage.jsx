import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react'
import { useProjects } from '../context/ProjectContext'
import { EditorProvider, useEditor } from '../context/EditorContext'
import Toolbar from '../components/editor/Toolbar'
import LeftSidebar from '../components/editor/LeftSidebar'
import Canvas from '../components/editor/Canvas'
import RightPropertiesPanel from '../components/editor/RightPropertiesPanel'
import StatusBar from '../components/editor/StatusBar'
import CollaborationDrawer from '../components/editor/CollaborationDrawer'
import { exportToJSON, exportToSVG, exportToPNG } from '../services/exportService'
import { useToast } from '../components/common/Toast'

function InnerEditor({ project }) {
  const { updateProject } = useProjects()
  const { nodes, edges, activeDiagramType } = useEditor()
  const { addToast } = useToast()

  const [projectName, setProjectName] = useState(project?.name || 'Untitled Diagram')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    if (project?.name) setProjectName(project.name)
  }, [project])

  const handleSave = (data) => {
    if (project?.id) {
      updateProject(project.id, {
        name: projectName,
        nodes: data.nodes,
        edges: data.edges,
        diagramType: data.diagramType
      })
    }
  }

  const handleExport = (format) => {
    if (format === 'json') {
      exportToJSON(project, nodes, edges)
      addToast('Exported diagram as JSON', 'success')
    } else if (format === 'svg') {
      exportToSVG(projectName)
      addToast('Exported diagram as SVG', 'success')
    } else if (format === 'png') {
      exportToPNG(projectName)
      addToast('Exported diagram as PNG', 'success')
    }
  }

  return (
    <div className="editor-container">
      <Toolbar
        projectName={projectName}
        onProjectNameChange={(name) => {
          setProjectName(name)
          if (project?.id) updateProject(project.id, { name })
        }}
        onExport={handleExport}
      />
      <div className="editor-main">
        <LeftSidebar />
        <Canvas onMouseMove={setCursorPos} setZoom={setZoom} />
        <RightPropertiesPanel />
        <CollaborationDrawer />
      </div>
      <StatusBar cursorPos={cursorPos} zoom={zoom} />
    </div>
  )
}

export default function EditorPage() {
  const { projectId } = useParams()
  const { getProject } = useProjects()
  const project = getProject(projectId)

  if (!project) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Project not found</h2>
      </div>
    )
  }

  return (
    <EditorProvider project={project} onSave={(data) => {}}>
      <InnerEditor project={project} />
    </EditorProvider>
  )
}
