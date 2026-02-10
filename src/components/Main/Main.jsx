import { useEffect, useState } from 'react'
import Column from '../Column/Column'
import { Container } from '../App.styled'
import { MainStyled, MainBlock, MainContent } from './Main.styled'
import Loader from '../Loader/Loader'
import { getTasks } from '../../services/tasks'

function Main() {
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTasks() {
      try {
        setIsLoading(true)
        setError('')
        const tasks = await getTasks()
        if (isMounted) {
          setCards(tasks)
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message || 'Не удалось загрузить задачи')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTasks()

    return () => {
      isMounted = false
    }
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

  if (error) {
    return (
      <MainStyled>
        <Container>
          <p>{error}</p>
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

