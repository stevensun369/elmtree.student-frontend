import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFinalMarks,
  getStudentSubjectMarks,
  getStudentSubjectTruancys,
  studentGetAverageMarks,
} from '../actions/studentActions'
import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'

import { Col } from 'react-bootstrap'
import MarksTitle from '../components/MarksTitle'
import TruancysTitle from '../components/TruancysTitle'

import Mark from '../components/Mark'
import Truancy from '../components/Truancy'
import FinalMark from '../components/FinalMark'

import styles from '../css/TeacherSubjectStudentScreen.module.css'

import { protectStudent } from '../utils/studentProtect'
import NotAuthorized from '../components/NotAuthorized'
import {
  sortMarksByTerm,
  sortTruancysByTerm,
  sortAverageMarksByTerm,
  sortSubjectInfo,
} from '../utils/studentSort'

const StudentSubjectScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  // authorization
  const studentLogin = useSelector((state) => state.studentLogin)
  if (!studentLogin.studentInfo) {
    history.push('/')
  } else {
    var authorized = protectStudent(
      match.params.subjectID,
      studentLogin.subjectList
    )
  }

  // final marks
  const { finalMarks } = useSelector(
    (state) => state.studentFinalMarks
  )

  // student average marks
  const studentAverageMarks = useSelector(
    (state) => state.studentAverageMarks
  )
  const { averageMarks } = studentAverageMarks

  var subjectAverageMarks = averageMarks[match.params.subjectID]

  // student subject marks
  const studentSubjectMarks = useSelector(
    (state) => state.studentSubjectMarks
  )
  const { subjectMarksList } = studentSubjectMarks

  // student subject truancys
  const studentSubjectTruancys = useSelector(
    (state) => state.studentSubjectTruancys
  )
  const { subjectTruancysList } = studentSubjectTruancys

  // subject info
  var subjectInfo = sortSubjectInfo(
    studentLogin.subjectList,
    match.params.subjectID
  )

  // condition
  var loadingCondition

  if (authorized) {
    // averageMarks
    var { averageMarkTermOne, averageMarkTermTwo } =
      sortAverageMarksByTerm(subjectAverageMarks)

    // marks based on terms
    var { marksTermOne, marksTermTwo } =
      sortMarksByTerm(subjectMarksList)

    // truancys based on terms
    var { truancysTermOne, truancysTermTwo } = sortTruancysByTerm(
      subjectTruancysList
    )

    // condition
    loadingCondition =
      studentSubjectMarks.loading && studentSubjectTruancys.loading
  }

  useEffect(() => {
    dispatch(getStudentSubjectMarks(match.params.subjectID))
    dispatch(getStudentSubjectTruancys(match.params.subjectID))
    dispatch(getFinalMarks(match.params.subjectID))
  }, [dispatch, match.params.subjectID])

  const averageMarksLength = Object.keys(averageMarks).length
  useEffect(() => {
    if (averageMarksLength === 0) {
      dispatch(studentGetAverageMarks())
    }
  }, [dispatch, averageMarksLength])

  if (authorized) {
    return (
      <>
        <HeaderBack backTo={`/elev`}>{subjectInfo.name}</HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          {loadingCondition ? (
            <Loader />
          ) : (
            <>
              <Col
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                style={{
                  float: 'left',
                  display: 'inline-block',
                  marginBottom: '2vh',
                }}
              >
                <MarksTitle
                  toAverageMark=''
                  averageMark={averageMarkTermOne}
                >
                  Note - Semestrul I
                </MarksTitle>
                {marksTermOne.length > 0 ? (
                  <>
                    {marksTermOne.map((item) => (
                      <Mark
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.markID}
                      >
                        {item.value}
                      </Mark>
                    ))}

                    {finalMarks[1] && (
                      <FinalMark term={1} finalMarks={finalMarks} />
                    )}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există note incă
                  </span>
                )}

                <br></br>

                <TruancysTitle>Absențe - Semestrul I</TruancysTitle>
                {truancysTermOne.length > 0 ? (
                  <>
                    {truancysTermOne.map((item) => (
                      <Truancy
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.truancyID}
                        motivated={item.motivated}
                      />
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există absențe incă
                  </span>
                )}
              </Col>

              <Col
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                style={{
                  float: 'left',
                  display: 'inline-block',
                  marginBottom: '2vh',
                }}
              >
                <MarksTitle
                  toAverageMark=''
                  averageMark={averageMarkTermTwo}
                >
                  Note - Semestrul II
                </MarksTitle>
                {marksTermTwo.length > 0 ? (
                  <>
                    {marksTermTwo.map((item) => (
                      <Mark
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.markID}
                      >
                        {item.value}
                      </Mark>
                    ))}

                    {finalMarks[2] && (
                      <FinalMark term={2} finalMarks={finalMarks} />
                    )}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există note incă
                  </span>
                )}
                <br></br>

                <TruancysTitle>Absențe - Semestrul II</TruancysTitle>
                {truancysTermTwo.length > 0 ? (
                  <>
                    {truancysTermTwo.map((item) => (
                      <Truancy
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.truancyID}
                        motivated={item.motivated}
                      />
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există absențe incă
                  </span>
                )}
              </Col>
            </>
          )}
        </div>
      </>
    )
  } else if (!authorized) {
    return <NotAuthorized />
  }
}

export default StudentSubjectScreen
