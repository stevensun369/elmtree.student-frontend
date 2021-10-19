import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/studentActions'

import styles from '../css/LoginScreen.module.css'

const StudentLoginScreen = ({ history }) => {
  const [cnp, setCNP] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const studentLogin = useSelector((state) => state.studentLogin)
  const { loading, error } = studentLogin

  useEffect(() => {
    if (studentLogin.studentInfo) {
      history.push('/elev')
    }
  }, [history, studentLogin.studentInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(cnp, password))
  }

  return (
    <>
      <div className={styles.logo}>
        <img src='/img/tree.green.webp' alt='logo' className={styles.logoImg} />
        <span className={styles.logoText}>elmtree</span>
      </div>

      <div className={styles.mainCard}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <input
                type='number'
                className={styles.input}
                placeholder='CNP'
                value={cnp}
                onChange={(e) => setCNP(e.target.value)}
              />
              <input
                type='password'
                className={styles.input}
                placeholder='Parola'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div
                  className={styles.messageContainer}
                  style={{ marginTop: '2vh' }}
                >
                  <Message variant='danger'>{error}</Message>
                </div>
              )}

              {cnp.length > 13 && (
                <div
                  className={styles.messageContainer}
                  style={{ marginTop: '2vh' }}
                >
                  <Message variant='danger'>
                    CNP-ul are prea multe cifre
                  </Message>
                </div>
              )}

              {cnp.length < 13 && cnp.length !== 0 && (
                <div
                  className={styles.messageContainer}
                  style={{ marginTop: '2vh' }}
                >
                  <Message variant='danger'>
                    CNP-ul nu are îndeajunse de multe cifre
                  </Message>
                </div>
              )}
              <input
                type='submit'
                className={styles.submitButton}
                value='Conectare'
                disabled={cnp.length > 13 || cnp.lentgh < 13}
              />
            </Form>
          </>
        )}
      </div>
    </>
  )
}

export default StudentLoginScreen
