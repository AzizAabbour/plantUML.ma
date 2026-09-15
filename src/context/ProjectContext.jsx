import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { mockProjects } from '../data/mockProjects'

const ProjectContext = createContext(null)

const STORAGE_KEY = 'umlcollab_projects'

function loadProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : mockProjects
  } catch {
    return mockProjects
  }
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(loadProjects)

  useEffect(() => {
    saveProjects(projects)
  }, [projects])

  const createProject = useCallback((data) => {
    const newProject = {
      id: 'proj-' + Date.now(),
      name: data.name || 'Untitled Project',
      description: data.description || '',
      diagramType: data.diagramType || 'class',
      owner: 'user-1',
      collaborators: ['user-1'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      thumbnail: null,
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 }
    }
    setProjects(prev => [newProject, ...prev])
    return newProject
  }, [])

  const updateProject = useCallback((id, updates) => {
    setProjects(prev => prev.map(p =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    ))
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }, [])

  const duplicateProject = useCallback((id) => {
    setProjects(prev => {
      const source = prev.find(p => p.id === id)
      if (!source) return prev
      const dup = {
        ...source,
        id: 'proj-' + Date.now(),
        name: source.name + ' (Copy)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return [dup, ...prev]
    })
  }, [])

  const getProject = useCallback((id) => {
    return projects.find(p => p.id === id) || null
  }, [projects])

  return (
    <ProjectContext.Provider value={{
      projects, createProject, updateProject, deleteProject, duplicateProject, getProject
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider')
  return ctx
}
