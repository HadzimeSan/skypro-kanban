import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import GlobalStyle from '../GlobalStyles'
import { lightTheme, darkTheme } from '../theme'
import { ToastContainer } from 'react-toastify'

const ThemeContext = createContext(null)

const THEME_STORAGE_KEY = 'kanbanTheme'

function getInitialThemeName() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // ignore storage errors
  }

  return 'light'
}

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(getInitialThemeName)

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName)
    } catch {
      // ignore
    }
  }, [themeName])

  const toggleTheme = () => {
    setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = themeName === 'dark' ? darkTheme : lightTheme

  const value = {
    themeName,
    isDark: themeName === 'dark',
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={themeName === 'dark' ? 'dark' : 'light'}
        />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider')
  }
  return context
}


