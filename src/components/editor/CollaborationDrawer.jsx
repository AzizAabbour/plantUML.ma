import { useState, useEffect } from 'react'
import { X, Send, MessageSquare, Clock, UserCheck, Play, Pause } from 'lucide-react'
import { useEditor } from '../../context/EditorContext'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../common/Avatar'
import Button from '../common/Button'

export default function CollaborationDrawer() {
  const { isCollabOpen, setIsCollabOpen, setNodes, saveSnapshot, nodes, edges } = useEditor()
  const { currentUser, mockUsers } = useAuth()

  const [simulating, setSimulating] = useState(true)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sara Benali', text: 'Hey Aziz, I added the Order and Product class relationships.', time: '10:42 AM' },
    { id: 2, sender: 'Aziz Aabbour', text: 'Awesome! I will update the OrderItem multiplicities.', time: '10:45 AM' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [comments, setComments] = useState([
    { id: 101, author: 'Sara Benali', text: 'Should we make `stock` private in Product class?', element: 'Product', resolved: false }
  ])

  // Simulated live actions from second user
  useEffect(() => {
    if (!simulating) return

    const interval = setInterval(() => {
      // Periodically simulate second user updating or adding a note/node
      setNodes(nds => {
        const hasSimNode = nds.some(n => n.id === 'sim_node')
        if (!hasSimNode) {
          const simNode = {
            id: 'sim_node',
            type: 'classNode',
            position: { x: 300, y: 280 },
            data: {
              name: 'PaymentProcessor',
              stereotype: '<<service>>',
              attributes: [{ visibility: '+', name: 'apiKey', type: 'String' }],
              methods: [{ visibility: '+', name: 'processPayment', params: 'amount: double', returnType: 'boolean' }]
            }
          }
          saveSnapshot([...nds, simNode], edges)
          return [...nds, simNode]
        }
        return nds
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [simulating, setNodes, edges, saveSnapshot])

  if (!isCollabOpen) return null

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: currentUser?.name || 'You',
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
    setChatInput('')
  }

  return (
    <div className="collab-drawer">
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>Real-Time Collaboration</span>
        <button className="btn-ghost" onClick={() => setIsCollabOpen(false)} style={{ padding: '4px' }}>
          <X size={16} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Collaborators List */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Active Collaborators (2)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockUsers.map(u => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--color-surface)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar name={u.name} initials={u.initials} color={u.color} size="sm" showPresence online />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Editing canvas</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Simulation Control */}
        <div style={{ padding: '10px 12px', background: 'var(--color-primary-lighter)', border: '1px solid var(--color-primary-alpha-strong)', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary-dark)' }}>Collaborator Simulation</span>
            <Button size="sm" variant="ghost" icon={simulating ? Pause : Play} onClick={() => setSimulating(!simulating)}>
              {simulating ? 'Pause' : 'Start'}
            </Button>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>
            {simulating ? 'Simulating Sara Benali making live canvas additions every few seconds...' : 'Simulation paused.'}
          </p>
        </div>

        {/* Element Comments */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Diagram Comments ({comments.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {comments.map(c => (
              <div key={c.id} style={{ padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: '6px', background: 'white' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '2px' }}>
                  On: {c.element}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text)' }}>{c.text}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>— {c.author}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Project Chat
          </div>
          <div style={{ flex: 1, minHeight: '120px', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', background: 'white' }}>
            {messages.map(m => (
              <div key={m.id} style={{ fontSize: '12px' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{m.sender}: </span>
                <span>{m.text}</span>
                <span style={{ fontSize: '9px', color: 'var(--color-text-tertiary)', marginLeft: '6px' }}>{m.time}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            <input
              type="text"
              className="form-input"
              style={{ fontSize: '12px', height: '32px' }}
              placeholder="Type message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
            />
            <Button type="submit" size="sm" iconOnly icon={Send} />
          </form>
        </div>
      </div>
    </div>
  )
}
