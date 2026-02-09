import styled from 'styled-components'

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const PageTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
`

export const PageText = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  gap: 12px;
`

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(148, 166, 190, 0.6);
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`

export const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #565eef;
  color: #ffffff;
  font-weight: 500;

  &:hover {
    background-color: #33399b;
  }
`


