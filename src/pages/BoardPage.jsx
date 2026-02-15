import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import PopBrowse from '../components/PopBrowse/PopBrowse'
import PopNewCard from '../components/PopNewCard/PopNewCard'
import PopExit from '../components/PopExit/PopExit'
import { Wrapper } from '../components/App.styled'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'

function BoardPage() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { getTaskById, fetchTaskById } = useTasks()
  const [currentTask, setCurrentTask] = useState(null)
  const [isLoadingTask, setIsLoadingTask] = useState(false)

  const showCardModal = location.pathname.startsWith('/card/') && params.id
  const showNewCardModal = location.pathname === '/new-card'
  const showExitModal = location.pathname === '/exit'

  useEffect(() => {
    if (showCardModal && params.id) {
      const taskFromState = getTaskById(params.id)
      if (taskFromState) {
        setCurrentTask(taskFromState)
      } else {
        setIsLoadingTask(true)
        fetchTaskById(params.id)
          .then((task) => {
            setCurrentTask(task)
          })
          .catch((e) => {
            console.error('Ошибка загрузки задачи:', e)
            setCurrentTask(null)
          })
          .finally(() => {
            setIsLoadingTask(false)
          })
      }
    } else {
      setCurrentTask(null)
    }
  }, [showCardModal, params.id, getTaskById, fetchTaskById])

  const handleCloseCard = () => {
    navigate('/')
  }

  const handleCloseNewCard = () => {
    navigate('/')
  }

  const handleExit = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleCancelExit = () => {
    navigate('/')
  }

  return (
    <Wrapper>
      <Header />
      <Main />
      {showCardModal && (currentTask || isLoadingTask) && (
        <PopBrowse
          id={params.id}
          title={currentTask?.title || (isLoadingTask ? 'Загрузка...' : `Задача #${params.id}`)}
          category={currentTask?.topic || "Web Design"}
          description={currentTask?.description || ""}
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


