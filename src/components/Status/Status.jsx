function Status({ statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"], activeStatus = "Нужно сделать" }) {
  return (
    <div className="pop-browse__status status">
      <p className="status__p subttl">Статус</p>
      <div className="status__themes">
        {statuses.map((status) => (
          <div key={status} className={`status__theme ${status === activeStatus ? "_gray" : "_hide"}`}>
            <p className={status === activeStatus ? "_gray" : ""}>{status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Status

