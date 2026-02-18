import Column from '../Column/Column'
import { Container } from '../App.styled'
import { MainStyled, MainBlock, MainContent } from './Main.styled'
import Loader from '../Loader/Loader'
import { useTasks } from '../../context/TaskContext'

function Main() {
  const { tasks, isLoading, error } = useTasks()

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
    cards: tasks.filter((card) => card.status === column.status),
  }))

  return (
    <MainStyled>
      <Container>
        <MainBlock>
          <MainContent>
            {columnsToRender.map((column) => (
              <Column key={column.title} title={column.title} cards={column.cards} />
            ))}
          </MainContent>
        </MainBlock>
      </Container>
    </MainStyled>
  )
}

export default Main
