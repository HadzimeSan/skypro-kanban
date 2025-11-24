import Card from '../Card/Card'

function Column({ title, cards = [] }) {
  const getCategoryClass = (category) => {
    const classes = {
      "Web Design": "_orange",
      "Research": "_green",
      "Copywriting": "_purple"
    }
    return classes[category] || "_orange"
  }

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              date={card.date}
              category={card.category}
              categoryClass={getCategoryClass(card.category)}
            />
          ))
        ) : (
          <Card
            title="Название задачи"
            date="30.10.23"
            category="Web Design"
            categoryClass="_orange"
          />
        )}
      </div>
    </div>
  )
}

export default Column

