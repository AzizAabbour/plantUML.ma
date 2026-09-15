import { getBezierPath, EdgeLabelRenderer, BaseEdge } from '@xyflow/react'

export function CustomUmlEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = {}
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  const { label = '', sourceMultiplicity = '', targetMultiplicity = '' } = data

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        {label && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#ffffff',
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: 500,
              color: '#2C3E50',
              border: '1px solid #E0E0E0',
              pointerEvents: 'all'
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        )}
        {sourceMultiplicity && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(${sourceX + 10}px, ${sourceY - 15}px)`,
              fontSize: '10px',
              fontWeight: 600,
              color: '#7F8C8D'
            }}
          >
            {sourceMultiplicity}
          </div>
        )}
        {targetMultiplicity && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(${targetX - 20}px, ${targetY - 15}px)`,
              fontSize: '10px',
              fontWeight: 600,
              color: '#7F8C8D'
            }}
          >
            {targetMultiplicity}
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  )
}
