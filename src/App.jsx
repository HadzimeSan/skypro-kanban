import PopExit from './components/PopExit/PopExit'
import PopNewCard from './components/PopNewCard/PopNewCard'
import PopBrowse from './components/PopBrowse/PopBrowse'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { Wrapper } from './components/App.styled'
import GlobalStyle from './GlobalStyles'

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
      {/* pop-up start*/}
      <PopExit />
      <PopNewCard />
      <PopBrowse />
      {/* pop-up end*/}

      <Header />
      <Main />
    </Wrapper>
    </>
  )
}

export default App
