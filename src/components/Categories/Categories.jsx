function Categories({
  categories = ['Web Design', 'Research', 'Copywriting'],
  activeCategory = 'Web Design',
  mode = 'select',
  onCategoryClick,
}) {
  const categoryClasses = {
    'Web Design': '_orange',
    Research: '_green',
    Copywriting: '_purple',
  }

  const handleCategoryClick = (category) => {
    if (onCategoryClick && mode === 'select') {
      onCategoryClick(category)
    }
  }

  return (
    <div
      className={
        mode === 'select'
          ? 'pop-new-card__categories categories'
          : 'theme-down__categories theme-down'
      }
    >
      <p className="categories__p subttl">Категория</p>
      <div className="categories__themes">
        {mode === 'select' ? (
          categories.map((category) => (
            <div
              key={category}
              className={`categories__theme ${categoryClasses[category]} ${activeCategory === category ? '_active-category' : ''}`}
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: 'pointer' }}
            >
              <p className={categoryClasses[category]}>{category}</p>
            </div>
          ))
        ) : (
          <div className={`categories__theme ${categoryClasses[activeCategory]} _active-category`}>
            <p className={categoryClasses[activeCategory]}>{activeCategory}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
