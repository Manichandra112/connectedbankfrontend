import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* Stub routes for sidebar navigation */}
        <Route path="accounts" element={<Dashboard />} />
        <Route path="payments" element={<Dashboard />} />
        <Route path="collections" element={<Dashboard />} />
        <Route path="accounting" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
