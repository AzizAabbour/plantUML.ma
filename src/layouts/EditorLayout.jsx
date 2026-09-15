import { Outlet } from 'react-router'
import { ToastProvider } from '../components/common/Toast'
import '../styles/layouts.css'

export default function EditorLayout() {
  return (
    <ToastProvider>
      <div className="editor-layout">
        <Outlet />
      </div>
    </ToastProvider>
  )
}
