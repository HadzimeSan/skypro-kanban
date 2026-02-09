import { useNavigate } from 'react-router-dom'
import Calendar from '../Calendar/Calendar'
import Categories from '../Categories/Categories'

function PopNewCard({ onClose }) {
  const navigate = useNavigate()

  const handleClose = (e) => {
    e.preventDefault()
    if (onClose) {
      onClose()
    } else {
      navigate('/')
    }
  }

  return (
    <div className="pop-new-card" id="popNewCard" style={{ display: 'block' }}>
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <button className="pop-new-card__close" onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#94A6BE' }}>×</button>
            <div className="pop-new-card__wrap">
              <form className="pop-new-card__form form-new" id="formNewCard" action="#">
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">Название задачи</label>
                  <input className="form-new__input" type="text" name="name" id="formTitle" placeholder="Введите название задачи..." autoFocus />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">Описание задачи</label>
                  <textarea className="form-new__area" name="text" id="textArea" placeholder="Введите описание задачи..."></textarea>
                </div>
              </form>
              <Calendar mode="create" />
            </div>
            <Categories mode="select" activeCategory="Web Design" />
            <button className="form-new__create _hover01" id="btnCreate">Создать задачу</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopNewCard

