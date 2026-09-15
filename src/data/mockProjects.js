export const mockProjects = [
  {
    id: 'proj-demo-1',
    name: 'E-Commerce System',
    description: 'Class diagram for the online shopping platform architecture',
    diagramType: 'class',
    owner: 'user-1',
    collaborators: ['user-1', 'user-2'],
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-15T08:30:00Z',
    thumbnail: null,
    nodes: [
      {
        id: 'n1',
        type: 'classNode',
        position: { x: 100, y: 100 },
        data: {
          name: 'User',
          stereotype: '',
          attributes: [
            { visibility: '+', name: 'id', type: 'int' },
            { visibility: '+', name: 'username', type: 'String' },
            { visibility: '-', name: 'password', type: 'String' },
            { visibility: '+', name: 'email', type: 'String' }
          ],
          methods: [
            { visibility: '+', name: 'login', params: 'credentials', returnType: 'boolean' },
            { visibility: '+', name: 'register', params: '', returnType: 'void' }
          ]
        }
      },
      {
        id: 'n2',
        type: 'classNode',
        position: { x: 450, y: 100 },
        data: {
          name: 'Product',
          stereotype: '',
          attributes: [
            { visibility: '+', name: 'id', type: 'int' },
            { visibility: '+', name: 'name', type: 'String' },
            { visibility: '+', name: 'price', type: 'double' },
            { visibility: '+', name: 'stock', type: 'int' }
          ],
          methods: [
            { visibility: '+', name: 'getDetails', params: '', returnType: 'ProductDTO' },
            { visibility: '+', name: 'updateStock', params: 'qty: int', returnType: 'void' }
          ]
        }
      },
      {
        id: 'n3',
        type: 'classNode',
        position: { x: 100, y: 400 },
        data: {
          name: 'Order',
          stereotype: '',
          attributes: [
            { visibility: '+', name: 'id', type: 'int' },
            { visibility: '+', name: 'date', type: 'Date' },
            { visibility: '+', name: 'total', type: 'double' },
            { visibility: '+', name: 'status', type: 'OrderStatus' }
          ],
          methods: [
            { visibility: '+', name: 'calculateTotal', params: '', returnType: 'double' },
            { visibility: '+', name: 'cancel', params: '', returnType: 'void' }
          ]
        }
      },
      {
        id: 'n4',
        type: 'classNode',
        position: { x: 450, y: 400 },
        data: {
          name: 'OrderItem',
          stereotype: '',
          attributes: [
            { visibility: '+', name: 'quantity', type: 'int' },
            { visibility: '+', name: 'unitPrice', type: 'double' }
          ],
          methods: [
            { visibility: '+', name: 'getSubtotal', params: '', returnType: 'double' }
          ]
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n3', type: 'association', data: { label: 'places', sourceMultiplicity: '1', targetMultiplicity: '*' } },
      { id: 'e2', source: 'n3', target: 'n4', type: 'composition', data: { label: 'contains', sourceMultiplicity: '1', targetMultiplicity: '1..*' } },
      { id: 'e3', source: 'n4', target: 'n2', type: 'association', data: { label: 'references', sourceMultiplicity: '*', targetMultiplicity: '1' } }
    ],
    viewport: { x: 0, y: 0, zoom: 1 }
  },
  {
    id: 'proj-demo-2',
    name: 'Authentication Flow',
    description: 'Use case diagram for user authentication scenarios',
    diagramType: 'usecase',
    owner: 'user-1',
    collaborators: ['user-1'],
    createdAt: '2026-09-08T14:00:00Z',
    updatedAt: '2026-09-14T16:45:00Z',
    thumbnail: null,
    nodes: [
      { id: 'uc1', type: 'actorNode', position: { x: 50, y: 200 }, data: { name: 'User' } },
      { id: 'uc2', type: 'useCaseNode', position: { x: 300, y: 100 }, data: { name: 'Login' } },
      { id: 'uc3', type: 'useCaseNode', position: { x: 300, y: 250 }, data: { name: 'Register' } },
      { id: 'uc4', type: 'useCaseNode', position: { x: 550, y: 100 }, data: { name: 'Validate Credentials' } },
      { id: 'uc5', type: 'useCaseNode', position: { x: 550, y: 250 }, data: { name: 'Send Verification Email' } }
    ],
    edges: [
      { id: 'ue1', source: 'uc1', target: 'uc2', type: 'association', data: {} },
      { id: 'ue2', source: 'uc1', target: 'uc3', type: 'association', data: {} },
      { id: 'ue3', source: 'uc2', target: 'uc4', type: 'include', data: { label: '<<include>>' } },
      { id: 'ue4', source: 'uc3', target: 'uc5', type: 'include', data: { label: '<<include>>' } }
    ],
    viewport: { x: 0, y: 0, zoom: 1 }
  },
  {
    id: 'proj-demo-3',
    name: 'Payment Processing',
    description: 'Activity diagram for the payment workflow',
    diagramType: 'activity',
    owner: 'user-2',
    collaborators: ['user-1', 'user-2'],
    createdAt: '2026-09-12T09:00:00Z',
    updatedAt: '2026-09-15T11:20:00Z',
    thumbnail: null,
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 }
  },
  {
    id: 'proj-demo-4',
    name: 'Microservices Deployment',
    description: 'Deployment diagram for cloud infrastructure',
    diagramType: 'deployment',
    owner: 'user-1',
    collaborators: ['user-1'],
    createdAt: '2026-09-05T11:00:00Z',
    updatedAt: '2026-09-13T09:15:00Z',
    thumbnail: null,
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 }
  },
  {
    id: 'proj-demo-5',
    name: 'User Session States',
    description: 'State machine diagram for user session lifecycle',
    diagramType: 'state',
    owner: 'user-1',
    collaborators: ['user-1', 'user-2'],
    createdAt: '2026-09-01T08:00:00Z',
    updatedAt: '2026-09-10T14:30:00Z',
    thumbnail: null,
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 }
  }
]

export const DIAGRAM_TYPES = {
  class: { label: 'Class Diagram', icon: 'LayoutGrid', color: '#F39C12' },
  sequence: { label: 'Sequence Diagram', icon: 'ArrowDownUp', color: '#3498DB' },
  usecase: { label: 'Use Case Diagram', icon: 'Users', color: '#2ECC71' },
  activity: { label: 'Activity Diagram', icon: 'GitBranch', color: '#9B59B6' },
  state: { label: 'State Machine Diagram', icon: 'Circle', color: '#E74C3C' },
  component: { label: 'Component Diagram', icon: 'Box', color: '#1ABC9C' },
  deployment: { label: 'Deployment Diagram', icon: 'Server', color: '#34495E' }
}

export const mockTemplates = [
  { id: 'tpl-1', name: 'MVC Architecture', type: 'class', description: 'Model-View-Controller class structure', nodes: 3, preview: null },
  { id: 'tpl-2', name: 'REST API Flow', type: 'sequence', description: 'Client-Server REST API interaction', nodes: 4, preview: null },
  { id: 'tpl-3', name: 'User Management', type: 'usecase', description: 'CRUD operations for user accounts', nodes: 6, preview: null },
  { id: 'tpl-4', name: 'Order Processing', type: 'activity', description: 'E-commerce order workflow', nodes: 8, preview: null },
  { id: 'tpl-5', name: 'Connection Lifecycle', type: 'state', description: 'TCP-like connection states', nodes: 5, preview: null },
  { id: 'tpl-6', name: 'Plugin System', type: 'component', description: 'Extensible plugin architecture', nodes: 4, preview: null },
  { id: 'tpl-7', name: 'Cloud Deployment', type: 'deployment', description: 'AWS-style cloud infrastructure', nodes: 6, preview: null },
  { id: 'tpl-8', name: 'Singleton Pattern', type: 'class', description: 'Singleton design pattern', nodes: 2, preview: null },
  { id: 'tpl-9', name: 'Observer Pattern', type: 'class', description: 'Observer/Subscriber pattern', nodes: 4, preview: null },
  { id: 'tpl-10', name: 'Login Sequence', type: 'sequence', description: 'Authentication sequence flow', nodes: 3, preview: null },
  { id: 'tpl-11', name: 'Shopping Cart', type: 'usecase', description: 'E-commerce cart use cases', nodes: 5, preview: null },
  { id: 'tpl-12', name: 'CI/CD Pipeline', type: 'activity', description: 'Continuous integration workflow', nodes: 7, preview: null }
]
