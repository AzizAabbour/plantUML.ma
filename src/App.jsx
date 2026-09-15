import { BrowserRouter, Routes, Route } from 'react-router'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import EditorLayout from './layouts/EditorLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import EditorPage from './pages/EditorPage'
import TemplatesPage from './pages/TemplatesPage'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider } from './context/AuthContext'
import { ProjectProvider } from './context/ProjectContext'

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="project/:projectId" element={<EditorLayout />}>
              <Route index element={<EditorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  )
}
