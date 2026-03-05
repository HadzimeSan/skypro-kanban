import { Link } from 'react-router-dom'
import { PageWrapper, PageTitle, PageText, Button } from './Pages.styled'

function NotFoundPage() {
  return (
    <PageWrapper>
      <PageTitle>404</PageTitle>
      <PageText>Страница не найдена.</PageText>
      <Link to="/">
        <Button type="button">На главную</Button>
      </Link>
    </PageWrapper>
  )
}

export default NotFoundPage
