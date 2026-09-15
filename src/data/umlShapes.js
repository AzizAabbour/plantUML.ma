/* UML shape library definitions for all 7 diagram types */

export const UML_SHAPES = {
  class: {
    label: 'Class Diagram',
    shapes: [
      { type: 'classNode', label: 'Class', icon: 'LayoutGrid', defaultData: { name: 'ClassName', stereotype: '', attributes: [{ visibility: '+', name: 'attribute', type: 'String' }], methods: [{ visibility: '+', name: 'method', params: '', returnType: 'void' }] } },
      { type: 'interfaceNode', label: 'Interface', icon: 'FileCode', defaultData: { name: 'InterfaceName', stereotype: '<<interface>>', attributes: [], methods: [{ visibility: '+', name: 'method', params: '', returnType: 'void' }] } },
      { type: 'abstractNode', label: 'Abstract Class', icon: 'FileType', defaultData: { name: 'AbstractClass', stereotype: '<<abstract>>', attributes: [], methods: [] } },
      { type: 'enumNode', label: 'Enumeration', icon: 'List', defaultData: { name: 'EnumName', stereotype: '<<enumeration>>', attributes: [{ visibility: '', name: 'VALUE_ONE', type: '' }, { visibility: '', name: 'VALUE_TWO', type: '' }], methods: [] } }
    ],
    edges: [
      { type: 'association', label: 'Association', style: 'solid' },
      { type: 'inheritance', label: 'Inheritance', style: 'solid-triangle' },
      { type: 'implementation', label: 'Implementation', style: 'dashed-triangle' },
      { type: 'aggregation', label: 'Aggregation', style: 'solid-diamond-hollow' },
      { type: 'composition', label: 'Composition', style: 'solid-diamond-filled' },
      { type: 'dependency', label: 'Dependency', style: 'dashed-arrow' }
    ]
  },
  usecase: {
    label: 'Use Case Diagram',
    shapes: [
      { type: 'actorNode', label: 'Actor', icon: 'User', defaultData: { name: 'Actor' } },
      { type: 'useCaseNode', label: 'Use Case', icon: 'Circle', defaultData: { name: 'Use Case' } },
      { type: 'systemBoundaryNode', label: 'System Boundary', icon: 'Square', defaultData: { name: 'System', width: 400, height: 300 } }
    ],
    edges: [
      { type: 'association', label: 'Association', style: 'solid' },
      { type: 'include', label: 'Include', style: 'dashed-arrow' },
      { type: 'extend', label: 'Extend', style: 'dashed-arrow' },
      { type: 'generalization', label: 'Generalization', style: 'solid-triangle' }
    ]
  },
  activity: {
    label: 'Activity Diagram',
    shapes: [
      { type: 'actionNode', label: 'Action', icon: 'RectangleHorizontal', defaultData: { name: 'Action' } },
      { type: 'decisionNode', label: 'Decision', icon: 'Diamond', defaultData: { name: '' } },
      { type: 'initialNode', label: 'Initial Node', icon: 'CircleDot', defaultData: {} },
      { type: 'finalNode', label: 'Final Node', icon: 'StopCircle', defaultData: {} },
      { type: 'forkNode', label: 'Fork/Join', icon: 'Minus', defaultData: {} },
      { type: 'noteNode', label: 'Note', icon: 'StickyNote', defaultData: { name: 'Note text' } }
    ],
    edges: [
      { type: 'controlFlow', label: 'Control Flow', style: 'solid-arrow' }
    ]
  },
  sequence: {
    label: 'Sequence Diagram',
    shapes: [
      { type: 'lifeline', label: 'Lifeline', icon: 'ArrowDownUp', defaultData: { name: 'Object', type: 'object' } },
      { type: 'actorLifeline', label: 'Actor', icon: 'User', defaultData: { name: 'Actor', type: 'actor' } }
    ],
    edges: [
      { type: 'syncMessage', label: 'Sync Message', style: 'solid-arrow' },
      { type: 'asyncMessage', label: 'Async Message', style: 'solid-open-arrow' },
      { type: 'returnMessage', label: 'Return', style: 'dashed-arrow' }
    ]
  },
  state: {
    label: 'State Machine Diagram',
    shapes: [
      { type: 'stateNode', label: 'State', icon: 'RectangleHorizontal', defaultData: { name: 'State', entry: '', exit: '', do: '' } },
      { type: 'initialStateNode', label: 'Initial State', icon: 'CircleDot', defaultData: {} },
      { type: 'finalStateNode', label: 'Final State', icon: 'StopCircle', defaultData: {} },
      { type: 'compositeStateNode', label: 'Composite State', icon: 'Layers', defaultData: { name: 'Composite', width: 300, height: 200 } }
    ],
    edges: [
      { type: 'transition', label: 'Transition', style: 'solid-arrow' }
    ]
  },
  component: {
    label: 'Component Diagram',
    shapes: [
      { type: 'componentNode', label: 'Component', icon: 'Box', defaultData: { name: 'Component', stereotype: '<<component>>' } },
      { type: 'interfaceCircleNode', label: 'Interface', icon: 'Circle', defaultData: { name: 'Interface' } },
      { type: 'packageNode', label: 'Package', icon: 'FolderOpen', defaultData: { name: 'Package', width: 300, height: 200 } }
    ],
    edges: [
      { type: 'dependency', label: 'Dependency', style: 'dashed-arrow' },
      { type: 'realization', label: 'Realization', style: 'dashed-triangle' },
      { type: 'association', label: 'Association', style: 'solid' }
    ]
  },
  deployment: {
    label: 'Deployment Diagram',
    shapes: [
      { type: 'deploymentNode', label: 'Node', icon: 'Server', defaultData: { name: 'Server', stereotype: '<<device>>' } },
      { type: 'artifactNode', label: 'Artifact', icon: 'File', defaultData: { name: 'artifact.jar', stereotype: '<<artifact>>' } },
      { type: 'executionEnvNode', label: 'Execution Environment', icon: 'Monitor', defaultData: { name: 'JVM', stereotype: '<<executionEnvironment>>' } }
    ],
    edges: [
      { type: 'deployment', label: 'Deploy', style: 'dashed-arrow' },
      { type: 'communication', label: 'Communication', style: 'solid' },
      { type: 'dependency', label: 'Dependency', style: 'dashed-arrow' }
    ]
  }
}

export const DEFAULT_NODE_STYLE = {
  fill: '#FFFFFF',
  stroke: '#2C3E50',
  strokeWidth: 1.5,
  fontSize: 13,
  fontColor: '#2C3E50',
  fontFamily: 'Inter, sans-serif'
}

export const SELECTED_NODE_STYLE = {
  stroke: '#F39C12',
  strokeWidth: 2,
  shadow: '0 0 0 3px rgba(243, 156, 18, 0.2)'
}
