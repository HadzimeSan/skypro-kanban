import { useEffect, useState } from 'react'
import Column from '../Column/Column'
import { cardsData } from '../../../data.js'

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
      <main className="main">
        <div className="container">
          <div className="loader">Данные загружаются…</div>
        </div>
      </main>
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
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columnsToRender.map((column) => (
              <Column
                key={column.title}
                title={column.title}
                cards={column.cards}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main

