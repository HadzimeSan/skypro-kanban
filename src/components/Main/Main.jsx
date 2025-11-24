import Column from '../Column/Column'

function Main({ columns = [] }) {
  const defaultColumns = [
    {
      title: "Без статуса",
      cards: [
        { title: "Название задачи", date: "30.10.23", category: "Web Design" },
        { title: "Название задачи", date: "30.10.23", category: "Research" }
      ]
    },
    {
      title: "Нужно сделать",
      cards: [
        { title: "Название задачи", date: "30.10.23", category: "Web Design" }
      ]
    },
    {
      title: "В работе",
      cards: [
        { title: "Название задачи", date: "30.10.23", category: "Web Design" },
        { title: "Название задачи", date: "30.10.23", category: "Web Design" }
      ]
    },
    {
      title: "Тестирование",
      cards: [
        { title: "Название задачи", date: "30.10.23", category: "Research" }
      ]
    },
    {
      title: "Готово",
      cards: [
        { title: "Название задачи", date: "30.10.23", category: "Research" }
      ]
    }
  ]

  const columnsToRender = columns.length > 0 ? columns : defaultColumns

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columnsToRender.map((column, index) => (
              <Column
                key={index}
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

