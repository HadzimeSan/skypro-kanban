import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../Calendar/Calendar'
import Categories from '../Categories/Categories'
import { useTasks } from '../../context/TaskContext'

function PopNewCard({ onClose }) {
  const navigate = useNavigate()
  const { createTask, loadTasks } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('Web Design')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('Без статуса')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = (e) => {
    e.preventDefault()
    if (onClose) {
      onClose()
    } else {
      navigate('/')
    }
  }

  const handleCategoryClick = (category) => {
    setTopic(category)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Название задачи обязательно')
      return
    }

    setIsSubmitting(true)

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        topic: topic || 'Research',
        status: status || 'Без статуса',
        date: date || new Date().toISOString(),
      }

      await createTask(taskData)
      await loadTasks()
      if (onClose) {
        onClose()
      } else {
        navigate('/')
      }
    } catch (e) {
      setError(e.message || 'Не удалось создать задачу')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pop-new-card" id="popNewCard" style={{ display: 'block' }}>
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <button
              className="pop-new-card__close"
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#94A6BE',
              }}
            >
              ×
            </button>
            {error && (
              <p style={{ color: '#f44336', marginBottom: '10px', fontSize: '14px' }}>{error}</p>
            )}
            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                onSubmit={handleSubmit}
              >
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
              <Calendar mode="create" selectedDate={date} onDateChange={setDate} />
            </div>
            <Categories
              mode="select"
              activeCategory={topic}
              onCategoryClick={handleCategoryClick}
            />
            <button
              className="form-new__create _hover01"
              id="btnCreate"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Создание...' : 'Создать задачу'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopNewCard
