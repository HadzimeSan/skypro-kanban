import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import PopBrowse from '../components/PopBrowse/PopBrowse'
import PopNewCard from '../components/PopNewCard/PopNewCard'
import PopExit from '../components/PopExit/PopExit'
import { Wrapper } from '../components/App.styled'
import { cardsData } from '../../data.js'

function BoardPage({ setIsAuth }) {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()

  const showCardModal = location.pathname.startsWith('/card/') && params.id
  const showNewCardModal = location.pathname === '/new-card'
  const showExitModal = location.pathname === '/exit'

  const card = showCardModal ? cardsData.find(c => c.id === parseInt(params.id)) : null

  const handleCloseCard = () => {
    navigate('/')
  }

  const handleCloseNewCard = () => {
    navigate('/')
  }

  const handleExit = () => {
    setIsAuth(false)
    navigate('/login', { replace: true })
  }

  const handleCancelExit = () => {
    navigate('/')
  }

  return (
    <Wrapper>
      <Header />
      <Main />
      {showCardModal && card && (
        <PopBrowse
          title={card.title || `Задача #${params.id}`}
          category={card.topic || "Web Design"}
          description=""
          date={card.date || "09.09.23"}
          status={card.status || "Нужно сделать"}
          onClose={handleCloseCard}
        />
      )}
      {showNewCardModal && (
        <PopNewCard onClose={handleCloseNewCard} />
      )}
      {showExitModal && (
        <PopExit onExit={handleExit} onCancel={handleCancelExit} />
      )}
    </Wrapper>
  )
}

export default BoardPage


