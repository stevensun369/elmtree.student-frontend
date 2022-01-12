import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimetable } from '../actions/studentActions'
import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import styles from '../css/TimetableScreen.module.css'

const TimetableScreen = () => {
  const dispatch = useDispatch()

  const studentTimetable = useSelector(
    (state) => state.studentTimetable
  )

  const days = [1, 2, 3, 4, 5]
  // const intervals = ['pm1', 'pm2', 'pm3', 'pm4', 'pm5', 'pm6', 'pm7']

  const daysNames = ['', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri']

  // state
  const [selectedPeriodID, setSelectedPeriodID] = useState('')
  const [room, setRoom] = useState('')
  // const [name, setName] = useState('')
  const [teacherName, setTeacherName] = useState('')

  const onChangeValue = (e) => {
    const value = e.target.value.split(',')
    setSelectedPeriodID(value[0])
    if (value[1] === 'undefined') {
      setRoom('')
    } else {
      setRoom(value[1])
    }

    // if (value[2] === 'undefined') {
    //   setName('')
    // } else {
    //   setName(value[2])
    // }

    if (value[3] === 'undefined') {
      setTeacherName('')
    } else {
      setTeacherName(value[3])
    }
  }

  useEffect(() => {
    dispatch(getTimetable())
  }, [dispatch])

  return (
    <>
      <HeaderBack backTo={`/elev`}>Orar</HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div class='row'>
          {studentTimetable.periods[1] && (
            <>
              {days.map((day) => (
                <div
                  class='col-6 col-sm-6 col-md-6 col-lg-4 col-xl'
                  style={{
                    float: 'left',
                  }}
                >
                  <table>
                    <thead>
                      <th scope='col' className={styles.thFirst}>
                        <span className={styles.thSpan}>Ora</span>
                      </th>
                      <th scope='col' className={styles.thLast}>
                        <span className={styles.thSpan}>
                          {daysNames[day]}
                        </span>
                      </th>
                    </thead>
                    <tbody onChange={onChangeValue}>
                      {Object.keys(studentTimetable.periods[day]).map(
                        (interval) => (
                          <>
                            {studentTimetable.periods[day][
                              interval
                            ].map((period) => (
                              <tr>
                                <th scope='row'>
                                  <span className={styles.thSpan}>
                                    {interval}
                                  </span>
                                </th>
                                <td
                                  className={
                                    selectedPeriodID ===
                                    period.periodID
                                      ? styles.tableCellSelected
                                      : styles.tableCell
                                  }
                                >
                                  <input
                                    type='radio'
                                    id={period.periodID}
                                    name='period'
                                    value={
                                      period.periodID +
                                      ',' +
                                      period.room +
                                      ',' +
                                      period.subject.name +
                                      ',' +
                                      period.teacher.firstName +
                                      ' ' +
                                      period.teacher.lastName
                                    }
                                  />
                                  <label
                                    for={period.periodID}
                                    className={styles.label}
                                  >
                                    <span
                                      className={styles.labelSpan}
                                    >
                                      {period.subject.name
                                        ? period.subject.name
                                        : '-'}
                                    </span>
                                  </label>
                                </td>
                              </tr>
                            ))}
                          </>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          )}

          <div style={{ marginTop: '2vh' }}></div>

          {studentTimetable.loading && <Loader></Loader>}
          {selectedPeriodID && !studentTimetable.loading && (
            <>
              <input
                type='text'
                className={styles.inputValue}
                name='nume'
                placeholder='Numele materiei'
                value={teacherName}
              />

              <input
                type='text'
                className={styles.inputValue}
                name='room'
                placeholder='Sala'
                value={room}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default TimetableScreen
