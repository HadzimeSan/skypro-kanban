import Card from '../Card/Card'
import { ColumnStyled, ColumnTitle, CardsContainer } from './Column.styled'

function Column({ title, cards = [] }) {
  return (
    <ColumnStyled>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              date={card.date}
              category={card.topic}
            />
          ))
        ) : (
          <p>Нет задач</p>
        )}
      </CardsContainer>
    </ColumnStyled>
  )
}

export default Column

