import GlobalStyle from './GlobalStyles'
import AppRoutes from './pages/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { TasksProvider } from './context/TaskContext'

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <TasksProvider>
          <AppRoutes />
        </TasksProvider>
      </AuthProvider>
    </>
  )
}

export default App
