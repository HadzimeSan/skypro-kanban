import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Calendar from '../Calendar/Calendar'
import Categories from '../Categories/Categories'
import Status from '../Status/Status'
import { useTasks } from '../../context/TaskContext'
import { formatDate } from '../../utils/dateFormat'

function PopBrowse({
  id,
  title: initialTitle = 'Название задачи',
  category: initialCategory = 'Web Design',
  description: initialDescription = '',
  date: initialDate = '',
  status: initialStatus = 'Нужно сделать',
  onClose,
}) {
  const navigate = useNavigate()
  const { updateTask, deleteTask } = useTasks()
  
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [category, setCategory] = useState(initialCategory)
  const [date, setDate] = useState(initialDate || new Date().toISOString())
  const [status, setStatus] = useState(initialStatus)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setTitle(initialTitle)
    setDescription(initialDescription)
    setCategory(initialCategory)
    setDate(initialDate || new Date().toISOString())
    setStatus(initialStatus)
  }, [initialTitle, initialDescription, initialCategory, initialDate, initialStatus])

  const categoryClasses = {
    'Web Design': '_orange',
    Research: '_green',
    Copywriting: '_purple',
  }

  const categoryClass = categoryClasses[category] || '_orange'

  const handleClose = (e) => {
    e.preventDefault()
    if (onClose) {
      onClose()
    } else {
      navigate('/')
    }
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setIsEditing(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setTitle(initialTitle)
    setDescription(initialDescription)
    setCategory(initialCategory)
    setDate(initialDate || new Date().toISOString())
    setStatus(initialStatus)
    setError('')
    setIsEditing(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) {
      setError('Название задачи обязательно')
      return
    }

    if (!id) {
      setError('ID задачи не найден')
      return
    }

    setIsSubmitting(true)

    try {
      await updateTask(id, {
        title: trimmedTitle,
        description: trimmedDescription,
        topic: category || 'Research',
        status: status || 'Без статуса',
        date: date || new Date().toISOString(),
      })
      setIsEditing(false)
      toast.success('Изменения успешно сохранены')
    } catch (e) {
      setError(e.message || 'Не удалось обновить задачу')
      toast.error(e.message || 'Не удалось обновить задачу')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    if (!id) {
      setError('ID задачи не найден')
      return
    }

    if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      return
    }

    setIsSubmitting(true)

    try {
      await deleteTask(id)
      toast.success('Задача успешно удалена')
      if (onClose) {
        onClose()
      } else {
        navigate('/')
      }
    } catch (e) {
      setError(e.message || 'Не удалось удалить задачу')
      toast.error(e.message || 'Не удалось удалить задачу')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory)
  }

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
  }

  return (
    <div className="pop-browse" id="popBrowse" style={{ display: 'block' }}>
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            {error && (
              <p style={{ color: '#f44336', marginBottom: '10px', fontSize: '14px' }}>{error}</p>
            )}
            <div className="pop-browse__top-block">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pop-browse__ttl"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D4DBE5',
                    borderRadius: '4px',
                  }}
                />
              ) : (
              <h3 className="pop-browse__ttl">{title}</h3>
              )}
              {!isEditing && (
                <div className={`categories__theme theme-top ${categoryClass} _active-category`}>
                  <p className={categoryClass}>{category}</p>
              </div>
              )}
            </div>
            {isEditing ? (
              <Status activeStatus={status} onStatusChange={handleStatusChange} />
            ) : (
            <Status activeStatus={status} />
            )}
            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    name="text"
                    id="textArea01"
                    readOnly={!isEditing}
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
              {isEditing ? (
                <Calendar mode="create" selectedDate={date} onDateChange={setDate} />
              ) : (
              <Calendar mode="browse" selectedDate={date ? formatDate(date) : '09.09.23'} />
              )}
            </div>
            {isEditing ? (
              <Categories
                mode="select"
                activeCategory={category}
                onCategoryClick={handleCategoryClick}
              />
            ) : (
            <Categories mode="display" activeCategory={category} />
            )}
            <div
              className="pop-browse__btn-browse"
              style={{ display: isEditing ? 'none' : 'block' }}
            >
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03" onClick={handleEdit}>
                  Редактировать задачу
                </button>
                <button
                  className="btn-browse__delete _btn-bor _hover03"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Удаление...' : 'Удалить задачу'}
                </button>
              </div>
              <button className="btn-browse__close _btn-bg _hover01" onClick={handleClose}>
                Закрыть
              </button>
            </div>
            <div className="pop-browse__btn-edit" style={{ display: isEditing ? 'block' : 'none' }}>
              <div className="btn-group">
                <button
                  className="btn-edit__edit _btn-bg _hover01"
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button
                  className="btn-edit__edit _btn-bor _hover03"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Отменить
                </button>
                <button
                  className="btn-edit__delete _btn-bor _hover03"
                  id="btnDelete"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Удаление...' : 'Удалить задачу'}
                </button>
              </div>
              <button
                className="btn-edit__close _btn-bg _hover01"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopBrowse
