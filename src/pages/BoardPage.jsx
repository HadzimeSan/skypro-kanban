import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import PopBrowse from '../components/PopBrowse/PopBrowse'
import PopNewCard from '../components/PopNewCard/PopNewCard'
import PopExit from '../components/PopExit/PopExit'
import { Wrapper } from '../components/App.styled'
import { logout } from '../services/auth'
import { getTaskById } from '../services/tasks'

function BoardPage({ setIsAuth }) {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()

  const [currentTask, setCurrentTask] = useState(null)
  const [taskError, setTaskError] = useState('')
  const [isTaskLoading, setIsTaskLoading] = useState(false)

  const showCardModal = location.pathname.startsWith('/card/') && params.id
  const showNewCardModal = location.pathname === '/new-card'
  const showExitModal = location.pathname === '/exit'

  useEffect(() => {
    if (!showCardModal || !params.id) {
      setCurrentTask(null)
      setTaskError('')
      return
    }

    let isMounted = true

    async function loadTask() {
      try {
        setIsTaskLoading(true)
        setTaskError('')
        const task = await getTaskById(params.id)
        if (isMounted) {
          setCurrentTask(task)
        }
      } catch (e) {
        if (isMounted) {
          setTaskError(e.message || 'Не удалось загрузить задачу')
        }
      } finally {
        if (isMounted) {
          setIsTaskLoading(false)
        }
      }
    }

    loadTask()

    return () => {
      isMounted = false
    }
  }, [showCardModal, params.id])

  const handleCloseCard = () => {
    navigate('/')
  }

  const handleCloseNewCard = () => {
    navigate('/')
  }

  const handleExit = () => {
    logout()
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
      {showCardModal && (currentTask || taskError) && (
        <PopBrowse
          title={currentTask?.title || `Задача #${params.id}`}
          category={currentTask?.topic || "Web Design"}
          description={taskError || currentTask?.description || ""}
          date={currentTask?.date || "09.09.23"}
          status={currentTask?.status || "Нужно сделать"}
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


