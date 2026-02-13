import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BoardPage from './BoardPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import NotFoundPage from './NotFoundPage'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-card"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exit"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes


