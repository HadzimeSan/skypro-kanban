import { useNavigate } from 'react-router-dom'
import PopExit from '../components/PopExit/PopExit'

function ExitPage({ setIsAuth }) {
  const navigate = useNavigate()

  const handleExit = () => {
    setIsAuth(false)
    navigate('/login', { replace: true })
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <>
      <PopExit onExit={handleExit} onCancel={handleCancel} />
    </>
  )
}

export default ExitPage


