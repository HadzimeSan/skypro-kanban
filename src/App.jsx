import { useState } from 'react'
import GlobalStyle from './GlobalStyles'
import AppRoutes from './pages/AppRoutes'
import { getStoredToken } from './services/auth'

function App() {
  const [isAuth, setIsAuth] = useState(() => Boolean(getStoredToken()))

  return (
    <>
      <GlobalStyle />
      <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
    </>
  )
}

export default App
