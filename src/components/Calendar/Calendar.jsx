import { useState, useEffect } from 'react'
import { formatDateFull } from '../../utils/dateFormat'

function Calendar({ selectedDate, mode = 'create', onDateChange }) {
  const [currentDate, setCurrentDate] = useState(() => {
    if (selectedDate) {
      const date = new Date(selectedDate)
      if (!isNaN(date.getTime())) {
        return date
      }
    }
    return new Date()
  })

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate)
      if (!isNaN(date.getTime())) {
        setCurrentDate(date)
      }
    }
  }, [selectedDate])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDateClick = (day) => {
    if (mode === 'create' && onDateChange) {
      const clickedDate = new Date(year, month, day)
      onDateChange(clickedDate.toISOString())
    }
  }

  const isSelectedDate = (day) => {
    if (!selectedDate) return false
    const selected = new Date(selectedDate)
    return (
      selected.getDate() === day &&
      selected.getMonth() === month &&
      selected.getFullYear() === year
    )
  }

  const isToday = (day) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    )
  }

  const isWeekend = (dayIndex) => {
    const dayOfWeek = (adjustedFirstDay + dayIndex) % 7
    return dayOfWeek === 5 || dayOfWeek === 6
  }

  const renderCalendarCells = () => {
    const cells = []
    const prevMonthDays = new Date(year, month, 0).getDate()

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i
      cells.push(
        <div key={`prev-${day}`} className="calendar__cell _other-month">
          {day}
        </div>
      )
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayIndex = adjustedFirstDay + day - 1
      const classes = ['calendar__cell', '_cell-day']
      if (isWeekend(dayIndex)) classes.push('_weekend')
      if (isToday(day)) classes.push('_current')
      if (isSelectedDate(day)) classes.push('_active-day')
      if (mode === 'create' && onDateChange) {
        classes.push('_clickable')
      }

      cells.push(
        <div
          key={day}
          className={classes.join(' ')}
          onClick={() => mode === 'create' && onDateChange && handleDateClick(day)}
          style={mode === 'create' && onDateChange ? { cursor: 'pointer' } : {}}
        >
          {day}
        </div>
      )
    }

    const remainingCells = 42 - cells.length
    for (let day = 1; day <= remainingCells; day++) {
      const dayIndex = (adjustedFirstDay + daysInMonth + day - 1) % 7
      const isWeekendDay = dayIndex === 5 || dayIndex === 6
      cells.push(
        <div
          key={`next-${day}`}
          className={`calendar__cell _other-month ${isWeekendDay ? '_weekend' : ''}`}
        >
          {day}
        </div>
      )
    }

    return cells
  }

  const displayDate = selectedDate
    ? formatDateFull(selectedDate)
    : mode === 'create'
      ? ''
      : '09.09.23'

  return (
    <div className="pop-new-card__calendar calendar">
      <p className="calendar__ttl subttl">Даты</p>
      <div className="calendar__block">
        <div className="calendar__nav">
          <div className="calendar__month">
            {monthNames[month]} {year}
          </div>
          {mode === 'create' && (
            <div className="nav__actions">
              <div className="nav__action" onClick={handlePrevMonth} style={{ cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                  <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                </svg>
              </div>
              <div className="nav__action" onClick={handleNextMonth} style={{ cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                  <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="calendar__content">
          <div className="calendar__days-names">
            <div className="calendar__day-name">пн</div>
            <div className="calendar__day-name">вт</div>
            <div className="calendar__day-name">ср</div>
            <div className="calendar__day-name">чт</div>
            <div className="calendar__day-name">пт</div>
            <div className="calendar__day-name -weekend-">сб</div>
            <div className="calendar__day-name -weekend-">вс</div>
          </div>
          <div className="calendar__cells">{renderCalendarCells()}</div>
        </div>
        <div className="calendar__period">
          {mode === 'create' ? (
            <p className="calendar__p date-end">
              Выберите срок исполнения{' '}
              {displayDate && <span className="date-control">{displayDate}</span>}.
            </p>
          ) : (
            <p className="calendar__p date-end">
              Срок исполнения: <span className="date-control">{displayDate}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calendar
