import { useParams, useNavigate } from 'react-router-dom'
import PopBrowse from '../components/PopBrowse/PopBrowse'
import { cardsData } from '../../data.js'

function CardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const card = cardsData.find(c => c.id === parseInt(id))

  const handleClose = () => {
    navigate('/')
  }

  return (
    <>
      <PopBrowse
        title={card?.title || `Задача #${id}`}
        category={card?.topic || "Web Design"}
        description=""
        date={card?.date || "09.09.23"}
        status={card?.status || "Нужно сделать"}
        onClose={handleClose}
      />
    </>
  )
}

export default CardPage


