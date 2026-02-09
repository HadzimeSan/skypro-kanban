import PopNewCard from '../components/PopNewCard/PopNewCard'
import { PageWrapper, PageTitle, PageText } from './Pages.styled'

function NewCardPage() {
  return (
    <PageWrapper>
      <PageTitle>Добавление новой задачи</PageTitle>
      <PageText>Заполните форму ниже, чтобы создать новую задачу.</PageText>
      <PopNewCard />
    </PageWrapper>
  )
}

export default NewCardPage


