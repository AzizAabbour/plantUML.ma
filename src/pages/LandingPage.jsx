import { Link } from 'react-router'
import { Users, Zap, Share2, LayoutGrid, Shield, Download, ArrowRight, Sparkles } from 'lucide-react'
import Button from '../components/common/Button'
import '../styles/landing.css'

const FEATURES = [
  { icon: LayoutGrid, title: '7 UML Diagram Types', desc: 'Class, Sequence, Use Case, Activity, State Machine, Component, and Deployment diagrams — all in one tool.' },
  { icon: Users, title: 'Real-Time Collaboration', desc: 'Work together with your team on the same canvas. See live cursors, comments, and changes in real time.' },
  { icon: Zap, title: 'Drag & Drop Editor', desc: 'Intuitive canvas with snap-to-grid, alignment guides, and a shape palette for rapid diagram creation.' },
  { icon: Share2, title: 'Easy Sharing', desc: 'Share projects via invitation links. Manage permissions and collaborate with anyone, anywhere.' },
  { icon: Download, title: 'Export Anywhere', desc: 'Export your diagrams as SVG, PNG, or JSON. Import and continue editing anytime.' },
  { icon: Shield, title: 'Built for Teams', desc: 'Organize diagrams in project folders, track changes, and manage your software architecture together.' }
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <Sparkles size={14} />
          Collaborative UML Modeling
        </div>
        <h1>
          Design Software Architecture <span className="highlight">Together</span>
        </h1>
        <p className="hero-subtitle">
          A professional collaborative platform for creating, editing, and sharing UML diagrams in real time. Built for software teams.
        </p>
        <div className="hero-actions">
          <Link to="/register">
            <Button size="xl" icon={ArrowRight}>Get Started Free</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="xl">View Demo</Button>
          </Link>
        </div>

        {/* Preview Window */}
        <div className="hero-preview">
          <div className="hero-preview-bar">
            <div className="hero-preview-dot" />
            <div className="hero-preview-dot" />
            <div className="hero-preview-dot" />
          </div>
          <div className="hero-preview-content">
            <svg viewBox="0 0 800 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Class: User */}
              <rect x="40" y="30" width="200" height="130" rx="4" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
              <rect x="40" y="30" width="200" height="32" rx="4" fill="#FFF3E0" stroke="#2C3E50" strokeWidth="1.5"/>
              <text x="140" y="52" textAnchor="middle" fontSize="14" fontWeight="600" fill="#2C3E50">User</text>
              <line x1="40" y1="62" x2="240" y2="62" stroke="#2C3E50" strokeWidth="1"/>
              <text x="52" y="80" fontSize="11" fill="#2C3E50">+ id: int</text>
              <text x="52" y="96" fontSize="11" fill="#2C3E50">+ username: String</text>
              <text x="52" y="112" fontSize="11" fill="#2C3E50">- password: String</text>
              <line x1="40" y1="120" x2="240" y2="120" stroke="#2C3E50" strokeWidth="1"/>
              <text x="52" y="140" fontSize="11" fill="#2C3E50">+ login(): boolean</text>
              <text x="52" y="156" fontSize="11" fill="#2C3E50">+ register(): void</text>

              {/* Class: Order */}
              <rect x="320" y="30" width="200" height="130" rx="4" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
              <rect x="320" y="30" width="200" height="32" rx="4" fill="#FFF3E0" stroke="#2C3E50" strokeWidth="1.5"/>
              <text x="420" y="52" textAnchor="middle" fontSize="14" fontWeight="600" fill="#2C3E50">Order</text>
              <line x1="320" y1="62" x2="520" y2="62" stroke="#2C3E50" strokeWidth="1"/>
              <text x="332" y="80" fontSize="11" fill="#2C3E50">+ id: int</text>
              <text x="332" y="96" fontSize="11" fill="#2C3E50">+ date: Date</text>
              <text x="332" y="112" fontSize="11" fill="#2C3E50">+ total: double</text>
              <line x1="320" y1="120" x2="520" y2="120" stroke="#2C3E50" strokeWidth="1"/>
              <text x="332" y="140" fontSize="11" fill="#2C3E50">+ calculateTotal(): double</text>

              {/* Class: Product */}
              <rect x="600" y="30" width="180" height="120" rx="4" fill="white" stroke="#F39C12" strokeWidth="2"/>
              <rect x="600" y="30" width="180" height="32" rx="4" fill="#FFF3E0" stroke="#F39C12" strokeWidth="2"/>
              <text x="690" y="52" textAnchor="middle" fontSize="14" fontWeight="600" fill="#2C3E50">Product</text>
              <line x1="600" y1="62" x2="780" y2="62" stroke="#F39C12" strokeWidth="1"/>
              <text x="612" y="80" fontSize="11" fill="#2C3E50">+ name: String</text>
              <text x="612" y="96" fontSize="11" fill="#2C3E50">+ price: double</text>
              <line x1="600" y1="108" x2="780" y2="108" stroke="#F39C12" strokeWidth="1"/>
              <text x="612" y="126" fontSize="11" fill="#2C3E50">+ getDetails(): DTO</text>

              {/* Association lines */}
              <line x1="240" y1="95" x2="320" y2="95" stroke="#2C3E50" strokeWidth="1.5"/>
              <text x="275" y="88" textAnchor="middle" fontSize="10" fill="#7F8C8D">1</text>
              <text x="310" y="88" textAnchor="middle" fontSize="10" fill="#7F8C8D">*</text>
              <polygon points="316,91 316,99 320,95" fill="#2C3E50"/>

              <line x1="520" y1="95" x2="600" y2="95" stroke="#2C3E50" strokeWidth="1.5"/>
              <text x="555" y="88" textAnchor="middle" fontSize="10" fill="#7F8C8D">*</text>
              <text x="590" y="88" textAnchor="middle" fontSize="10" fill="#7F8C8D">1</text>

              {/* Cursor indicator */}
              <g transform="translate(650, 85)">
                <path d="M0 0 L0 16 L4 12 L9 18 L12 16 L7 10 L12 8 Z" fill="#3498DB" stroke="white" strokeWidth="1"/>
                <rect x="8" y="20" width="32" height="14" rx="3" fill="#3498DB"/>
                <text x="24" y="31" textAnchor="middle" fontSize="8" fill="white">Sara</text>
              </g>

              {/* Grid dots */}
              {[...Array(20)].map((_, i) => [...Array(8)].map((_, j) => (
                <circle key={`${i}-${j}`} cx={i * 42 + 10} cy={j * 36 + 200} r="0.8" fill="#E0E0E0" />
              )))}
            </svg>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Everything You Need for UML</h2>
        <p className="features-subtitle">
          Professional diagramming tools designed for modern software engineering workflows.
        </p>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon"><f.icon size={22} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <h2>Get Started in Minutes</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-number">1</div>
            <h3>Create a Project</h3>
            <p>Choose a diagram type and start with a blank canvas or a pre-built template.</p>
          </div>
          <div className="how-step">
            <div className="how-step-number">2</div>
            <h3>Design Your Diagram</h3>
            <p>Drag and drop UML shapes, connect them, and customize every detail.</p>
          </div>
          <div className="how-step">
            <div className="how-step-number">3</div>
            <h3>Collaborate & Share</h3>
            <p>Invite teammates, work together in real time, and export your diagrams.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Build Better Software?</h2>
          <p>Join teams using UML Collab to design, document, and collaborate on software architecture.</p>
          <Link to="/register" className="cta-btn">
            Start Diagramming <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 UML Collab. Built for software engineers and teams.</p>
      </footer>
    </div>
  )
}
