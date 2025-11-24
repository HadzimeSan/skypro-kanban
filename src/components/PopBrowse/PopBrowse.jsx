import Calendar from '../Calendar/Calendar'
import Categories from '../Categories/Categories'
import Status from '../Status/Status'

function PopBrowse({ title = "Название задачи", category = "Web Design", description = "", date = "09.09.23", status = "Нужно сделать" }) {
  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{title}</h3>
              <div className={`categories__theme theme-top _orange _active-category`}>
                <p className="_orange">{category}</p>
              </div>
            </div>
            <Status activeStatus={status} />
            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">Описание задачи</label>
                  <textarea className="form-browse__area" name="text" id="textArea01" readOnly placeholder="Введите описание задачи...">{description}</textarea>
                </div>
              </form>
              <Calendar mode="browse" selectedDate={date} />
            </div>
            <Categories mode="display" activeCategory={category} />
            <div className="pop-browse__btn-browse ">
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03"><a href="#">Редактировать задачу</a></button>
                <button className="btn-browse__delete _btn-bor _hover03"><a href="#">Удалить задачу</a></button>
              </div>
              <button className="btn-browse__close _btn-bg _hover01"><a href="#">Закрыть</a></button>
            </div>
            <div className="pop-browse__btn-edit _hide">
              <div className="btn-group">
                <button className="btn-edit__edit _btn-bg _hover01"><a href="#">Сохранить</a></button>
                <button className="btn-edit__edit _btn-bor _hover03"><a href="#">Отменить</a></button>
                <button className="btn-edit__delete _btn-bor _hover03" id="btnDelete"><a href="#">Удалить задачу</a></button>
              </div>
              <button className="btn-edit__close _btn-bg _hover01"><a href="#">Закрыть</a></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopBrowse

