import Calendar from '../Calendar/Calendar'
import Categories from '../Categories/Categories'

function PopNewCard() {
  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="#" className="pop-new-card__close">×</a>
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

