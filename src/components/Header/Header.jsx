import { useState } from 'react'
import { Container } from '../App.styled'
import {
  HeaderStyled,
  HeaderBlock,
  Logo,
  Nav,
  ButtonNew,
  UserLink,
} from './Header.styled'

function Header({ userName = 'Ivan Ivanov', userEmail = 'ivan.ivanov@gmail.com' }) {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false)

  const handleUserClick = (event) => {
    event.preventDefault()
    setIsUserPopupOpen((prev) => !prev)
  }

  return (
    <HeaderStyled>
      <Container>
        <HeaderBlock>
          <Logo className="_show _light">
            <a href="" target="_self">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </Logo>
          <Logo className="_dark">
            <a href="" target="_self">
              <img src="/images/logo_dark.png" alt="logo" />
            </a>
          </Logo>
          <Nav>
            <ButtonNew id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
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
              <button type="button" className="_hover03">
                <a href="#popExit">Выйти</a>
              </button>
            </div>
          </Nav>
        </HeaderBlock>
      </Container>
    </HeaderStyled>
  )
}

export default Header

