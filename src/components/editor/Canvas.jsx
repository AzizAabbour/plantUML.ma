import { useCallback, useRef, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useEditor } from '../../context/EditorContext'
import { ClassNode } from './nodes/ClassNode'
import { UseCaseNode, ActorNode, SystemBoundaryNode } from './nodes/UseCaseNodes'
import { ActionNode, DecisionNode, InitialNode, FinalNode, StateNode, ComponentNode, DeploymentNode, LifelineNode } from './nodes/OtherNodes'
import { CustomUmlEdge } from './edges/CustomUmlEdge'

export default function Canvas({ onMouseMove, setZoom }) {
  const {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    onConnect, handleSelectionChange, saveSnapshot
  } = useEditor()

  const reactFlowWrapper = useRef(null)

  const nodeTypes = useMemo(() => ({
    classNode: ClassNode,
    useCaseNode: UseCaseNode,
    actorNode: ActorNode,
    systemBoundaryNode: SystemBoundaryNode,
    actionNode: ActionNode,
    decisionNode: DecisionNode,
    initialNode: InitialNode,
    finalNode: FinalNode,
    stateNode: StateNode,
    componentNode: ComponentNode,
    deploymentNode: DeploymentNode,
    lifeline: LifelineNode
  }), [])

  const edgeTypes = useMemo(() => ({
    customUml: CustomUmlEdge,
    association: CustomUmlEdge,
    inheritance: CustomUmlEdge,
    implementation: CustomUmlEdge,
    composition: CustomUmlEdge,
    aggregation: CustomUmlEdge,
    dependency: CustomUmlEdge,
    include: CustomUmlEdge,
    extend: CustomUmlEdge
  }), [])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow/type')
      const rawData = event.dataTransfer.getData('application/reactflow/data')

      if (!type) return

      const data = rawData ? JSON.parse(rawData) : { name: 'New Shape' }

      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = {
        x: event.clientX - bounds.left - 50,
        y: event.clientY - bounds.top - 20
      }

      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data
      }

      setNodes((nds) => {
        const next = nds.concat(newNode)
        saveSnapshot(next, edges)
        return next
      })
    },
    [setNodes, edges, saveSnapshot]
  )

  const handlePointerMove = (e) => {
    if (reactFlowWrapper.current && onMouseMove) {
      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      onMouseMove({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top
      })
    }
  }

  return (
    <div className="canvas-wrapper" ref={reactFlowWrapper} onPointerMove={handlePointerMove}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={handleSelectionChange}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={[20, 20]}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#CBD5E1" />
        <Controls showInteractive={false} style={{ bottom: 40, left: 16 }} />
        <MiniMap
          nodeColor={(node) => (node.type === 'classNode' ? '#F39C12' : '#3498DB')}
          maskColor="rgba(248, 249, 250, 0.7)"
          style={{ bottom: 40, right: 16, border: '1px solid #E0E0E0', borderRadius: 8 }}
        />
      </ReactFlow>
    </div>
  )
}
