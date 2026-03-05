import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError('Имя, email и пароль не могут быть пустыми или состоять только из пробелов')
      return
    }

    setIsSubmitting(true)

    try {
      await register({ login: trimmedEmail, name: trimmedName, password: trimmedPassword })
      toast.success('Регистрация прошла успешно, теперь можно войти')
      navigate('/login', { replace: true })
    } catch (e) {
      setError(e.message || 'Не удалось зарегистрироваться')
      toast.error(e.message || 'Не удалось зарегистрироваться')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthWrapper>
      <AuthContainer>
        <Modal>
          <ModalBlock>
            <ModalTitle>Регистрация</ModalTitle>
            <ModalForm onSubmit={handleSubmit}>
              <ModalInput
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                {isSubmitting ? 'Создаём...' : 'Создать аккаунт'}
              </ModalButton>
            </ModalForm>
            <ModalFormGroup>
              {error && <ErrorText>{error}</ErrorText>}
              <p>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
              </p>
            </ModalFormGroup>
          </ModalBlock>
        </Modal>
      </AuthContainer>
    </AuthWrapper>
  )
}

export default RegisterPage
