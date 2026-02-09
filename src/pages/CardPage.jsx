import { useParams } from 'react-router-dom'
import PopBrowse from '../components/PopBrowse/PopBrowse'
import { PageWrapper, PageTitle, PageText } from './Pages.styled'

function CardPage() {
  const { id } = useParams()

  return (
    <PageWrapper>
      <PageTitle>Просмотр и редактирование карточки</PageTitle>
      <PageText>ID карточки: {id}</PageText>
      <PopBrowse title={`Задача #${id}`} />
    </PageWrapper>
  )
}

export default CardPage


