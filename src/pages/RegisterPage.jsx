import { PageWrapper, PageTitle, PageText, Form, Input, Button } from './Pages.styled'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <PageWrapper>
      <PageTitle>Регистрация</PageTitle>
      <PageText>Просто страница-заглушка для регистрации пользователя.</PageText>
      <Form>
        <Input type="text" placeholder="Имя" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Пароль" />
        <Button type="button">Создать аккаунт</Button>
      </Form>
      <PageText>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </PageText>
    </PageWrapper>
  )
}

export default RegisterPage


