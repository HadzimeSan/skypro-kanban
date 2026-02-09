import { Link } from 'react-router-dom'
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

function RegisterPage() {
  return (
    <AuthWrapper>
      <AuthContainer>
        <Modal>
          <ModalBlock>
            <ModalTitle>Регистрация</ModalTitle>
            <ModalForm>
              <ModalInput type="text" placeholder="Имя" />
              <ModalInput type="email" placeholder="Email" />
              <ModalInput type="password" placeholder="Пароль" />
              <ModalButton type="button">Создать аккаунт</ModalButton>
            </ModalForm>
            <ModalFormGroup>
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


