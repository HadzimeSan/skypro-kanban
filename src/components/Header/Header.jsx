import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../App.styled'
import {
  HeaderStyled,
  HeaderBlock,
  Logo,
  Nav,
  ButtonNew,
  UserLink,
} from './Header.styled'
import { useAuth } from '../../context/AuthContext'

function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const userName = user?.name || 'Пользователь'
  const userEmail = user?.login || ''

  const handleUserClick = (event) => {
    event.preventDefault()
    setIsUserPopupOpen((prev) => !prev)
  }

  const handleExit = () => {
    setIsUserPopupOpen(false)
    navigate('/exit')
  }

  return (
    <HeaderStyled>
      <Container>
        <HeaderBlock>
          <Logo className="_show _light">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </Logo>
          <Logo className="_dark">
            <Link to="/">
              <img src="/images/logo_dark.png" alt="logo" />
            </Link>
          </Logo>
          <Nav>
            <ButtonNew id="btnMainNew">
              <Link to="/new-card">Создать новую задачу</Link>
            </ButtonNew>
            <UserLink href="#user-set-target" onClick={handleUserClick}>
              {userName}
            </UserLink>
            <div
              className="header__pop-user-set pop-user-set"
              id="user-set-target"
              style={{ display: isUserPopupOpen ? 'block' : 'none' }}
            >
              <p className="pop-user-set__name">{userName}</p>
              <p className="pop-user-set__mail">{userEmail}</p>
              <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
              </div>
              <button type="button" className="_hover03" onClick={handleExit}>
                <Link to="/exit">Выйти</Link>
              </button>
            </div>
          </Nav>
        </HeaderBlock>
      </Container>
    </HeaderStyled>
  )
}

export default Header

