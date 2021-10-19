import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form } from 'react-bootstrap'

import HeaderBack from '../components/HeaderBack'

import { studentLogout } from '../actions/studentActions'

import styles from '../css/ProfileScreen.module.css'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  // student
  const studentLogin = useSelector((state) => state.studentLogin)
  const { studentInfo } = studentLogin

  if (!studentInfo) {
    history.push('/')
  }
  const submitHandler = (e) => {
    e.preventDefault()

    // student
    if (studentInfo) {
      dispatch(studentLogout())
    }
  }

  return (
    <>
      <HeaderBack backTo='/'>Profil</HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div className={styles.fields}>
          {/* elev */}
          {studentInfo && (
            <>
              {/* nume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Nume:</span>
                {studentInfo.lastName}
              </div>

              {/* initiale tata*/}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  Inițialele Tatălui:
                </span>{' '}
                {studentInfo.dadInitials}
              </div>

              {/* prenume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Prenume:</span>{' '}
                {studentInfo.firstName}
              </div>

              {/* clasa */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Clasa:</span>
                {studentLogin.grade.gradeNumber}
                {studentLogin.grade.gradeLetter}
              </div>
            </>
          )}
        </div>

        <Form onSubmit={submitHandler}>
          <input
            type='submit'
            className={styles.logoutButton}
            value='Deconectare'
          />
        </Form>
      </div>
    </>
  )
}

export default ProfileScreen
