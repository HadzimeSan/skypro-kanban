import { useState } from 'react'
import GlobalStyle from './GlobalStyles'
import AppRoutes from './pages/AppRoutes'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <>
      <GlobalStyle />
      <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
    </>
  )
}

export default App
