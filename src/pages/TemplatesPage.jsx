import { useState } from 'react'
import { useNavigate } from 'react-router'
import { LayoutGrid, ArrowRight, Sparkles } from 'lucide-react'
import { mockTemplates, DIAGRAM_TYPES } from '../data/mockProjects'
import { useProjects } from '../context/ProjectContext'
import Button from '../components/common/Button'
import { useToast } from '../components/common/Toast'

export default function TemplatesPage() {
  const [selectedType, setSelectedType] = useState('all')
  const { createProject } = useProjects()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const filtered = selectedType === 'all'
    ? mockTemplates
    : mockTemplates.filter(t => t.type === selectedType)

  const handleUseTemplate = (template) => {
    const proj = createProject({
      name: template.name,
      description: template.description,
      diagramType: template.type
    })
    addToast(`Project created from "${template.name}" template`, 'success')
    navigate(`/project/${proj.id}`)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>UML Templates Gallery</h1>
          <p>Jumpstart your software architecture design with ready-to-use UML diagram templates</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <Button
          variant={selectedType === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedType('all')}
        >
          All Templates
        </Button>
        {Object.entries(DIAGRAM_TYPES).map(([key, item]) => (
          <Button
            key={key}
            variant={selectedType === key ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedType(key)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map(tpl => {
          const typeMeta = DIAGRAM_TYPES[tpl.type] || DIAGRAM_TYPES.class

          return (
            <div key={tpl.id} className="project-card">
              <div className="project-thumbnail" style={{ height: 120 }}>
                <span className="project-type-badge" style={{ color: typeMeta.color }}>
                  {typeMeta.label}
                </span>
                <Sparkles size={32} style={{ opacity: 0.2, color: typeMeta.color }} />
              </div>
              <div className="project-body">
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{tpl.name}</h3>
                <p className="project-desc">{tpl.description}</p>
                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <Button size="sm" style={{ width: '100%' }} icon={ArrowRight} onClick={() => handleUseTemplate(tpl)}>
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
