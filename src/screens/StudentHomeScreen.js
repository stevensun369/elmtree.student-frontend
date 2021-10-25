import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  deleteMarksAndTruancys,
  studentGetAverageMarks,
  studentGetTermMarks,
} from '../actions/studentActions'

import styles from '../css/TeacherHomeroomStudentScreen.module.css'

import HeaderFull from '../components/HeaderFull'
import SubjectItem from '../components/SubjectItem'
import { sortAverageMarks } from '../utils/studentSort'

const StudentHomeScreen = ({ history }) => {
  const dispatch = useDispatch()

  const studentLogin = useSelector((state) => state.studentLogin)
  const { studentInfo, subjectList } = studentLogin

  // student averageMarks
  const studentAverageMarks = useSelector(
    (state) => state.studentAverageMarks
  )
  const { averageMarks } = studentAverageMarks

  // subject average marks
  var subjectAverageMarks = sortAverageMarks(averageMarks)

  // sorting the term marks
  const studentTermMarks = useSelector(
    (state) => state.studentTermMarks
  )
  let { termMarks } = studentTermMarks
  let termMarkTermOne = 0
  let termMarkTermTwo = 0

  useEffect(() => {
    dispatch(deleteMarksAndTruancys())
    if (termMarks.length === 0) {
      dispatch(studentGetTermMarks())
    }

    if (Object.keys(averageMarks).length === 0) {
      dispatch(studentGetAverageMarks())
    }
    termMarkTermOne = studentTermMarks.termMarks[0]
    termMarkTermTwo = studentTermMarks.termMarks[1]
  }, [dispatch])

  return (
    <>
      {studentInfo && (
        <>
          <HeaderFull />
          <div className='header-margin-bottom'></div>
          <div className='main-container'>
            <span className={styles.termMarksTitle}>
              Mediile Semestriale:
            </span>
            <div
              className={styles.termMarks}
              style={{ marginBottom: '3vh', width: '98%' }}
            >
              <div className={styles.termMarksTermContainer}>
                <div className={styles.termMarksTerm}>
                  <div className={styles.termMarksTermSpan}>
                    Sem. I:
                  </div>
                  <div className={styles.termMark}>
                    <span className={styles.termMarkSpan}>
                      {termMarkTermOne !== 0 && termMarkTermOne ? (
                        <>{termMarkTermOne}</>
                      ) : (
                        <>-</>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.termMarksTermContainer}>
                <div className={styles.termMarksTerm}>
                  <div className={styles.termMarksTermSpan}>
                    Sem. II:
                  </div>
                  <div className={styles.termMark}>
                    <span className={styles.termMarkSpan}>
                      {termMarkTermTwo !== 0 && termMarkTermTwo ? (
                        <>{termMarkTermTwo}</>
                      ) : (
                        <>-</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {studentInfo.studentID && (
              <>
                <div className='list-divider'></div>
                {subjectList.map((item) => (
                  <>
                    {subjectAverageMarks[item.subjectID] && (
                      <SubjectItem
                        linkTo={`/elev/${item.subjectID}`}
                        key={item.subjectID}
                        averageMarkTermOne={
                          subjectAverageMarks[item.subjectID][0]
                        }
                        averageMarkTermTwo={
                          subjectAverageMarks[item.subjectID][1]
                        }
                      >{`${item.name}`}</SubjectItem>
                    )}
                  </>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default StudentHomeScreen
