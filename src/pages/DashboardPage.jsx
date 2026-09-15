import { useState } from 'react'
import { Link, useNavigate } from 'react'
import { Plus, Search, MoreVertical, Copy, Trash2, Edit3, Share2, FolderPlus, Clock } from 'lucide-react'
import { useProjects } from '../context/ProjectContext'
import { useAuth } from '../context/AuthContext'
import { DIAGRAM_TYPES } from '../data/mockProjects'
import Button from '../components/common/Button'
import Avatar, { AvatarGroup } from '../components/common/Avatar'
import Modal from '../components/common/Modal'
import Dropdown, { DropdownItem, DropdownSeparator } from '../components/common/Dropdown'
import { useToast } from '../components/common/Toast'
import '../styles/dashboard.css'

export default function DashboardPage() {
  const { projects, createProject, deleteProject, duplicateProject, updateProject } = useProjects()
  const { mockUsers } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')
  const [newDiagramType, setNewDiagramType] = useState('class')

  // Share modal state
  const [shareModalProject, setShareModalProject] = useState(null)

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newProjectName.trim()) return
    const proj = createProject({
      name: newProjectName,
      description: newProjectDesc,
      diagramType: newDiagramType
    })
    setIsCreateOpen(false)
    setNewProjectName('')
    setNewProjectDesc('')
    addToast('Project created successfully', 'success')
    navigate(`/project/${proj.id}`)
  }

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === 'all' || p.diagramType === filterType
    return matchesSearch && matchesType
  })

  const getCollaboratorUsers = (ids) => {
    return (ids || []).map(id => mockUsers.find(u => u.id === id) || { id, name: 'User', initials: 'U', color: '#95A5A6' })
  }

  const copyShareLink = (id) => {
    const link = `${window.location.origin}/project/${id}`
    navigator.clipboard.writeText(link)
    addToast('Invitation link copied to clipboard!', 'success')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Projects</h1>
          <p>Create, manage, and collaborate on software architecture diagrams</p>
        </div>
        <Button icon={Plus} size="lg" onClick={() => setIsCreateOpen(true)}>
          New Project
        </Button>
      </div>

      <div className="dashboard-controls">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="all">All Diagram Types</option>
          {Object.entries(DIAGRAM_TYPES).map(([key, item]) => (
            <option key={key} value={key}>{item.label}</option>
          ))}
        </select>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => {
          const typeMeta = DIAGRAM_TYPES[project.diagramType] || DIAGRAM_TYPES.class
          const collaborators = getCollaboratorUsers(project.collaborators)

          return (
            <div key={project.id} className="project-card">
              <div className="project-thumbnail">
                <span className="project-type-badge" style={{ color: typeMeta.color }}>
                  {typeMeta.label}
                </span>
                <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                  <rect x="10" y="10" width="35" height="40" rx="3" fill="#FFF3E0" stroke="#F39C12" strokeWidth="1.5"/>
                  <rect x="55" y="15" width="35" height="30" rx="3" fill="#EBF5FB" stroke="#3498DB" strokeWidth="1.5"/>
                  <path d="M 45 30 L 55 30" stroke="#2C3E50" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
              </div>

              <div className="project-body">
                <div className="project-title-row">
                  <Link to={`/project/${project.id}`} className="project-title">
                    {project.name}
                  </Link>
                  <Dropdown
                    trigger={
                      <button className="btn-ghost" style={{ padding: '4px' }}>
                        <MoreVertical size={16} />
                      </button>
                    }
                  >
                    <DropdownItem icon={Edit3} onClick={() => navigate(`/project/${project.id}`)}>Open</DropdownItem>
                    <DropdownItem icon={Share2} onClick={() => setShareModalProject(project)}>Invite Collaborator</DropdownItem>
                    <DropdownItem icon={Copy} onClick={() => { duplicateProject(project.id); addToast('Project duplicated', 'info'); }}>Duplicate</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem icon={Trash2} onClick={() => { deleteProject(project.id); addToast('Project deleted', 'error'); }} danger>
                      Delete
                    </DropdownItem>
                  </Dropdown>
                </div>
                <p className="project-desc">{project.description || 'No description provided'}</p>

                <div className="project-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <AvatarGroup users={collaborators} size="sm" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New UML Project"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Project</Button>
          </>
        }
      >
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              className="form-input"
              value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              placeholder="e.g. Payment Gateway Service"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Diagram Type</label>
            <select
              className="filter-select"
              style={{ width: '100%' }}
              value={newDiagramType}
              onChange={e => setNewDiagramType(e.target.value)}
            >
              {Object.entries(DIAGRAM_TYPES).map(([key, item]) => (
                <option key={key} value={key}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description (optional)</label>
            <textarea
              className="form-input"
              style={{ height: '70px', padding: '8px 12px' }}
              value={newProjectDesc}
              onChange={e => setNewProjectDesc(e.target.value)}
              placeholder="Brief summary of the architecture..."
            />
          </div>
        </form>
      </Modal>

      {/* Share Modal */}
      {shareModalProject && (
        <Modal
          isOpen={!!shareModalProject}
          onClose={() => setShareModalProject(null)}
          title={`Invite Collaborators to "${shareModalProject.name}"`}
          footer={
            <Button onClick={() => setShareModalProject(null)}>Done</Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Anyone with this invitation link can view and edit this UML diagram in real time.
            </p>
            <div className="form-group">
              <label>Invitation Link</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  readOnly
                  value={`${window.location.origin}/project/${shareModalProject.id}`}
                />
                <Button variant="secondary" onClick={() => copyShareLink(shareModalProject.id)}>
                  Copy
                </Button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                Active Collaborators
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {getCollaboratorUsers(shareModalProject.collaborators).map(u => (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar name={u.name} initials={u.initials} color={u.color} size="sm" showPresence online />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '500' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{u.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
