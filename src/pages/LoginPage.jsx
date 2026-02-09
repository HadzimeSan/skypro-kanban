import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PageWrapper, PageTitle, PageText, Form, Input, ButtonRow, Button } from './Pages.styled'

function LoginPage({ isAuth, setIsAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // имитация успешного логина
    setIsAuth(true)
    navigate('/', { replace: true })
  }

  if (isAuth) {
    navigate('/', { replace: true })
  }

  return (
    <PageWrapper>
      <PageTitle>Вход</PageTitle>
      <PageText>Введите данные для входа в доску задач.</PageText>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ButtonRow>
          <Button type="submit">Войти</Button>
          <Link to="/register">Регистрация</Link>
        </ButtonRow>
      </Form>
    </PageWrapper>
  )
}

export default LoginPage


