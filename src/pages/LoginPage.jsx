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
  ErrorText,
} from './AuthPages.styled'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { isAuth, login } = useAuth()

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true })
    }
  }, [isAuth, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login({ login: email, password })
      navigate('/', { replace: true })
    } catch (e) {
      setError(e.message || 'Не удалось выполнить вход')
    } finally {
      setIsSubmitting(false)
    }
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
              <ModalButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Входим...' : 'Войти'}
              </ModalButton>
            </ModalForm>
            <ModalFormGroup>
              {error && <ErrorText>{error}</ErrorText>}
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


