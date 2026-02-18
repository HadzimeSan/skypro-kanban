function PopExit({ onExit, onCancel }) {
  const handleExit = (e) => {
    e.preventDefault()
    if (onExit) {
      onExit()
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div className="pop-exit" id="popExit" style={{ display: 'block' }}>
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="formExit" action="#">
            <div className="pop-exit__form-group">
              <button className="pop-exit__exit-yes _hover01" id="exitYes" onClick={handleExit}>
                Да, выйти
              </button>
              <button className="pop-exit__exit-no _hover03" id="exitNo" onClick={handleCancel}>
                Нет, остаться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopExit
