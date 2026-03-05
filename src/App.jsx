import AppRoutes from './pages/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { TasksProvider } from './context/TaskContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TasksProvider>
          <AppRoutes />
        </TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
