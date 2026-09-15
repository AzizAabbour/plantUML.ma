export function exportToJSON(project, nodes, edges) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ project, nodes, edges }, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute("href", dataStr)
  downloadAnchor.setAttribute("download", `${project?.name || 'uml_diagram'}.json`)
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}

export function exportToSVG(projectName = 'uml_diagram') {
  const svgElem = document.querySelector('.react-flow__viewport') || document.querySelector('.react-flow__renderer svg')
  if (!svgElem) return

  const serializer = new XMLSerializer()
  const svgStr = serializer.serializeToString(svgElem)
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute("href", url)
  downloadAnchor.setAttribute("download", `${projectName}.svg`)
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
  URL.revokeObjectURL(url)
}

export function exportToPNG(projectName = 'uml_diagram') {
  // Mock SVG rasterization fallback to PNG download
  const svgElem = document.querySelector('.react-flow__viewport')
  if (!svgElem) return

  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 800
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 1200, 800)

  ctx.fillStyle = '#2C3E50'
  ctx.font = 'bold 20px Inter, sans-serif'
  ctx.fillText(projectName, 40, 50)
  ctx.font = '14px Inter, sans-serif'
  ctx.fillText('Exported from UML Collab', 40, 80)

  const image = canvas.toDataURL('image/png')
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', image)
  downloadAnchor.setAttribute('download', `${projectName}.png`)
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}
