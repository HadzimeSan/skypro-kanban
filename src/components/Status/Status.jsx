function Status({
  statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'],
  activeStatus = 'Нужно сделать',
  onStatusChange,
}) {
  const handleStatusClick = (status) => {
    if (onStatusChange) {
      onStatusChange(status)
    }
  }

  return (
    <div className="pop-browse__status status">
      <p className="status__p subttl">Статус</p>
      <div className="status__themes">
        {onStatusChange
          ? statuses.map((status) => (
              <div
                key={status}
                className={`status__theme ${status === activeStatus ? '_gray' : ''}`}
                onClick={() => handleStatusClick(status)}
                style={{ cursor: 'pointer', display: 'block', marginBottom: '5px' }}
              >
                <p className={status === activeStatus ? '_gray' : ''}>{status}</p>
              </div>
            ))
          : statuses.map((status) => (
              <div
                key={status}
                className={`status__theme ${status === activeStatus ? '_gray' : '_hide'}`}
              >
                <p className={status === activeStatus ? '_gray' : ''}>{status}</p>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Status
