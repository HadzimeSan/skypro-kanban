import { useEffect, useState } from 'react'
import Column from '../Column/Column'
import { cardsData } from '../../../data.js'
import { Container } from '../App.styled'
import { MainStyled, MainBlock, MainContent } from './Main.styled'
import Loader from '../Loader/Loader'

function Main() {
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(cardsData)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <MainStyled>
        <Container>
          <Loader />
        </Container>
      </MainStyled>
    )
  }

  const columnsConfig = [
    { title: 'Без статуса', status: 'Без статуса' },
    { title: 'Нужно сделать', status: 'Нужно сделать' },
    { title: 'В работе', status: 'В работе' },
    { title: 'Тестирование', status: 'Тестирование' },
    { title: 'Готово', status: 'Готово' },
  ]

  const columnsToRender = columnsConfig.map((column) => ({
    title: column.title,
    cards: cards.filter((card) => card.status === column.status),
  }))

  return (
    <MainStyled>
      <Container>
        <MainBlock>
          <MainContent>
            {columnsToRender.map((column) => (
              <Column
                key={column.title}
                title={column.title}
                cards={column.cards}
              />
            ))}
          </MainContent>
        </MainBlock>
      </Container>
    </MainStyled>
  )
}

export default Main

