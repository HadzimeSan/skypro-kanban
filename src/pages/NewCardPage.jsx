import { useNavigate } from 'react-router-dom'
import PopNewCard from '../components/PopNewCard/PopNewCard'

function NewCardPage() {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  return (
    <>
      <PopNewCard onClose={handleClose} />
    </>
  )
}

export default NewCardPage


