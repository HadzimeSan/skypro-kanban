import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BoardPage from './BoardPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import NotFoundPage from './NotFoundPage'

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppRoutes({ isAuth, setIsAuth }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <BoardPage setIsAuth={setIsAuth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <BoardPage setIsAuth={setIsAuth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-card"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <BoardPage setIsAuth={setIsAuth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exit"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <BoardPage setIsAuth={setIsAuth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<LoginPage isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes


