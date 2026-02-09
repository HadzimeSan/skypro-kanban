import { useNavigate } from 'react-router-dom'
import { PageWrapper, PageTitle, PageText, ButtonRow, Button } from './Pages.styled'

function ExitPage({ setIsAuth }) {
  const navigate = useNavigate()

  const handleExit = () => {
    setIsAuth(false)
    navigate('/login', { replace: true })
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <PageWrapper>
      <PageTitle>Выход из аккаунта</PageTitle>
      <PageText>Вы действительно хотите выйти?</PageText>
      <ButtonRow>
        <Button type="button" onClick={handleExit}>
          Выйти
        </Button>
        <Button type="button" onClick={handleCancel}>
          Отмена
        </Button>
      </ButtonRow>
    </PageWrapper>
  )
}

export default ExitPage


