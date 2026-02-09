import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  AuthWrapper,
  AuthContainer,
  Modal,
  ModalBlock,
  ModalTitle,
  ModalForm,
  ModalInput,
  ModalButton,
  ModalFormGroup,
} from './AuthPages.styled'

function LoginPage({ isAuth, setIsAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true })
    }
  }, [isAuth, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsAuth(true)
    navigate('/', { replace: true })
  }

  return (
    <AuthWrapper>
      <AuthContainer>
        <Modal>
          <ModalBlock>
            <ModalTitle>Вход</ModalTitle>
            <ModalForm onSubmit={handleSubmit}>
              <ModalInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <ModalInput
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ModalButton type="submit">Войти</ModalButton>
            </ModalForm>
            <ModalFormGroup>
              <p>
                Нужно зарегистрироваться? <Link to="/register">Регистрация</Link>
              </p>
            </ModalFormGroup>
          </ModalBlock>
        </Modal>
      </AuthContainer>
    </AuthWrapper>
  )
}

export default LoginPage


